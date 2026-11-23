import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createInitialData } from './data/seed';
import { migrateStudyData } from './data/migration';
import { hydrateStudyData, isCompactStudyData, serializeStudyData } from './data/storage';
import { scheduleCard } from './lib/scheduler';
import { studyLevels } from './levels';
import { Rating, StudyCard, StudyCardDraft, StudyData, StudyLevel } from './types';

const storageKey = '@ai4sec-memory/v1';
const categoryIds = new Set(['foundations', 'detection', 'vulnerabilities', 'operations']);
const ratings = new Set(['again', 'hard', 'good', 'easy']);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isStudyData(value: unknown): value is StudyData {
  if (!isRecord(value) || value.version !== 1 || !Array.isArray(value.cards) ||
      !isRecord(value.progress) || !Array.isArray(value.history) || !isRecord(value.settings)) {
    return false;
  }
  if (!Number.isInteger(value.settings.dailyNewLimit) ||
      (value.settings.dailyNewLimit as number) < 0 ||
      (value.settings.dailyNewLimit as number) > 5000) {
    return false;
  }
  const cardsValid = value.cards.every((card) => isRecord(card) &&
    typeof card.id === 'string' && typeof card.category === 'string' && categoryIds.has(card.category) &&
    typeof card.question === 'string' && typeof card.answer === 'string' && typeof card.createdAt === 'number');
  const progressValid = Object.values(value.progress).every((progress) => isRecord(progress) &&
    (progress.stage === 'learning' || progress.stage === 'review') &&
    ['dueAt', 'intervalDays', 'ease', 'reviews', 'lapses', 'introducedAt', 'lastReviewedAt']
      .every((key) => typeof progress[key] === 'number' && Number.isFinite(progress[key])));
  const historyValid = value.history.every((event) => isRecord(event) &&
    typeof event.id === 'string' && typeof event.cardId === 'string' &&
    typeof event.category === 'string' && categoryIds.has(event.category) &&
    typeof event.rating === 'string' && ratings.has(event.rating) &&
    typeof event.reviewedAt === 'number' && typeof event.wasNew === 'boolean');
  return cardsValid && progressValid && historyValid;
}

function makeId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export function useStudyData() {
  const [data, setData] = useState<StudyData | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const current = useRef<StudyData | null>(null);
  const writes = useRef<Promise<void>>(Promise.resolve());

  const load = useCallback(async () => {
    setLoadError(false);
    try {
      const stored = await AsyncStorage.getItem(storageKey);
      const raw: unknown = stored === null ? null : JSON.parse(stored);
      const parsed: unknown = stored === null ? createInitialData() : hydrateStudyData(raw);
      if (!isStudyData(parsed)) throw new Error('Invalid study data');
      const migrated = migrateStudyData(parsed);
      if (migrated !== parsed || (stored !== null && !isCompactStudyData(raw))) {
        try {
          await AsyncStorage.setItem(storageKey, serializeStudyData(migrated));
        } catch {
          setSaveError(true);
        }
      }
      current.current = migrated;
      setData(migrated);
    } catch {
      setLoadError(true);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const persist = useCallback((next: StudyData) => {
    const serialized = serializeStudyData(next);
    writes.current = writes.current
      .catch(() => undefined)
      .then(() => AsyncStorage.setItem(storageKey, serialized))
      .then(() => setSaveError(false))
      .catch(() => setSaveError(true));
  }, []);

  const update = useCallback((change: (previous: StudyData) => StudyData) => {
    if (!current.current) return;
    const next = change(current.current);
    current.current = next;
    setData(next);
    persist(next);
  }, [persist]);

  const review = useCallback((card: StudyCard, rating: Rating, now: number) => {
    update((previous) => {
      const prior = previous.progress[card.id];
      return {
        ...previous,
        progress: { ...previous.progress, [card.id]: scheduleCard(prior, rating, now) },
        history: [...previous.history, {
          id: makeId(),
          cardId: card.id,
          category: card.category,
          rating,
          reviewedAt: now,
          wasNew: !prior,
        }],
      };
    });
  }, [update]);

  const saveCard = useCallback((card: StudyCardDraft) => {
    update((previous) => {
      const existing = card.id ? previous.cards.find((item) => item.id === card.id) : undefined;
      const changedText = existing && (existing.question !== card.question.trim() ||
        existing.answer !== card.answer.trim() || existing.explanation !== card.explanation || existing.example !== card.example);
      const changedClassification = existing && (existing.category !== card.category || existing.topic !== card.topic);
      const next: StudyCard = {
        ...existing,
        id: existing?.id ?? makeId(),
        category: card.category,
        topic: card.topic,
        level: card.level,
        question: card.question.trim(),
        answer: card.answer.trim(),
        explanation: card.explanation,
        example: card.example,
        tags: card.tags,
        createdAt: existing?.createdAt ?? Date.now(),
        ...(changedText ? { sources: undefined, alternateQuestions: undefined, otherExplanations: undefined, otherExamples: undefined } : {}),
        ...(changedText || changedClassification ? { knowledgeArea: undefined, subtopic: undefined, knowledgePoint: undefined, questionType: undefined, origin: undefined } : {}),
      };
      return {
        ...previous,
        cards: existing
          ? previous.cards.map((item) => item.id === existing.id ? next : item)
          : [...previous.cards, next],
      };
    });
  }, [update]);

  const deleteCard = useCallback((id: string) => {
    update((previous) => {
      const progress = { ...previous.progress };
      delete progress[id];
      return {
        ...previous,
        cards: previous.cards.filter((card) => card.id !== id),
        progress,
        deletedCardIds: Array.from(new Set([...(previous.deletedCardIds ?? []), id])),
      };
    });
  }, [update]);

  const setDailyLimit = useCallback((limit: number) => {
    update((previous) => ({
      ...previous,
      settings: { ...previous.settings, dailyNewLimit: Math.max(0, Math.min(5000, Math.round(limit))), userSetLimit: true },
    }));
  }, [update]);

  const setEnabledLevels = useCallback((levels: StudyLevel[]) => {
    const enabledLevels = studyLevels.filter((level) => levels.includes(level.id)).map((level) => level.id);
    update((previous) => ({
      ...previous,
      settings: { ...previous.settings, enabledLevels },
    }));
  }, [update]);

  const retrySave = useCallback(() => {
    if (current.current) persist(current.current);
  }, [persist]);

  return { data, loadError, saveError, load, retrySave, review, saveCard, deleteCard, setDailyLimit, setEnabledLevels };
}
