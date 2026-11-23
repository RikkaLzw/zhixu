import { CardProgress, CategoryId, Rating, StudyCard, StudyData, StudyLevel, TopicId } from '../types';
import { getCategory } from '../categories';
import { topicLabel } from '../topics';
import { knowledgeAreaLabel } from '../knowledgeAreas';
import { normalizeTag } from '../tags';
import { isResearchCard } from '../data/researchCards';
import { cardLevel, enabledStudyLevels, studyLevelLabel } from '../levels';

const minute = 60_000;
const day = 24 * 60 * minute;

export function localDayKey(time: number): string {
  const date = new Date(time);
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('-');
}

export function scheduleCard(previous: CardProgress | undefined, rating: Rating, now: number): CardProgress {
  const ease = previous?.ease ?? 2.5;
  const base = {
    reviews: (previous?.reviews ?? 0) + 1,
    lapses: (previous?.lapses ?? 0) + (rating === 'again' && previous ? 1 : 0),
    introducedAt: previous?.introducedAt ?? now,
    lastReviewedAt: now,
  };

  if (rating === 'again') {
    return {
      ...base,
      stage: 'learning',
      dueAt: now + minute,
      intervalDays: 0,
      ease: Math.max(1.3, ease - 0.2),
    };
  }

  if (rating === 'hard') {
    return {
      ...base,
      stage: 'learning',
      dueAt: now + 10 * minute,
      intervalDays: 0,
      ease: Math.max(1.3, ease - 0.15),
    };
  }

  let intervalDays: number;
  let nextEase = ease;
  if (rating === 'good') {
    intervalDays = previous?.stage === 'review'
      ? Math.max(previous.intervalDays + 1, Math.round(previous.intervalDays * ease))
      : 1;
  } else {
    intervalDays = previous?.stage === 'review'
      ? Math.max(previous.intervalDays + 2, Math.round(previous.intervalDays * (ease + 0.15) * 1.3))
      : 4;
    nextEase = Math.min(3.5, ease + 0.15);
  }

  return {
    ...base,
    stage: 'review',
    dueAt: now + intervalDays * day,
    intervalDays,
    ease: nextEase,
  };
}

export function getTodayNewCount(data: StudyData, now: number): number {
  const today = localDayKey(now);
  return data.history.filter((event) => event.wasNew && localDayKey(event.reviewedAt) === today).length;
}

export interface StudyScope {
  category?: CategoryId;
  topic?: TopicId;
  sourceId?: string;
  query?: string;
  studySet?: 'regular' | 'research' | 'all';
  level?: StudyLevel;
}

export const publicInterviewScope = '__public_interviews__';

export function matchesScope(card: StudyCard, scope: StudyScope = {}): boolean {
  const query = scope.query?.trim().toLocaleLowerCase();
  if (scope.studySet === 'regular' && isResearchCard(card)) return false;
  if (scope.studySet === 'research' && !isResearchCard(card)) return false;
  if (scope.level && cardLevel(card) !== scope.level) return false;
  if (scope.category && card.category !== scope.category) return false;
  if (scope.topic && card.topic !== scope.topic) return false;
  if (scope.sourceId === 'custom' && card.sources?.length) return false;
  if (scope.sourceId === publicInterviewScope &&
      !card.sources?.some((source) => source.type.includes('公开面经'))) return false;
  if (scope.sourceId && scope.sourceId !== 'custom' && scope.sourceId !== publicInterviewScope &&
      !card.sources?.some((source) => source.id === scope.sourceId)) return false;
  if (!query) return true;
  const searchable = [
    card.question, card.answer, card.explanation, card.example, card.level, studyLevelLabel(cardLevel(card)), getCategory(card.category).label, topicLabel(card.topic),
    knowledgeAreaLabel(card.knowledgeArea), card.subtopic, card.knowledgePoint, card.questionType,
    ...(card.alternateQuestions ?? []), ...(card.otherExplanations ?? []), ...(card.otherExamples ?? []),
    ...(card.tags ?? []), ...(card.sources ?? []).flatMap((source) => [source.id, source.title]),
  ].filter(Boolean).join('\n').toLocaleLowerCase();
  const normalizedQuery = normalizeTag(query).toLocaleLowerCase();
  return searchable.includes(query) || searchable.includes(normalizedQuery);
}

export function getStudyQueue(data: StudyData, now: number, category?: CategoryId, scope: StudyScope = {}): StudyCard[] {
  // An explicit source can be studied in full; the library also passes its selected study set.
  const studySet = scope.studySet ?? (scope.sourceId ? 'all' : 'regular');
  const enabledLevels = new Set(enabledStudyLevels(data.settings));
  const relevant = data.cards.filter((card) => enabledLevels.has(cardLevel(card)) &&
    matchesScope(card, { ...scope, studySet, category: category ?? scope.category }));
  const due = relevant
    .filter((card) => data.progress[card.id] && data.progress[card.id].dueAt <= now)
    .sort((first, second) => data.progress[first.id].dueAt - data.progress[second.id].dueAt);
  const remainingNew = Math.max(0, data.settings.dailyNewLimit - getTodayNewCount(data, now));
  const newCards = relevant.filter((card) => !data.progress[card.id]).slice(0, remainingNew);
  return [...due, ...newCards];
}

export function getNextDue(data: StudyData, now: number, category?: CategoryId, scope: StudyScope = {}): number | null {
  const studySet = scope.studySet ?? (scope.sourceId ? 'all' : 'regular');
  const enabledLevels = new Set(enabledStudyLevels(data.settings));
  const times = data.cards
    .filter((card) => enabledLevels.has(cardLevel(card)) && matchesScope(card, { ...scope, studySet, category: category ?? scope.category }))
    .map((card) => data.progress[card.id]?.dueAt)
    .filter((dueAt): dueAt is number => typeof dueAt === 'number' && dueAt > now);
  return times.length ? Math.min(...times) : null;
}

export function formatInterval(milliseconds: number): string {
  if (milliseconds < 60 * minute) return `${Math.max(1, Math.ceil(milliseconds / minute))} 分钟`;
  if (milliseconds < day) return `${Math.ceil(milliseconds / (60 * minute))} 小时`;
  return `${Math.max(1, Math.round(milliseconds / day))} 天`;
}

export function getStreak(data: StudyData, now: number): number {
  const days = new Set(data.history.map((event) => localDayKey(event.reviewedAt)));
  const cursor = new Date(now);
  cursor.setHours(12, 0, 0, 0);
  if (!days.has(localDayKey(cursor.getTime()))) cursor.setDate(cursor.getDate() - 1);
  let streak = 0;
  while (days.has(localDayKey(cursor.getTime()))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}
