import { StudyData } from '../types';
import { defaultTopic } from '../topics';
import { createInitialData } from './seed';

const contentRevision = 2;

export function migrateStudyData(data: StudyData): StudyData {
  if ((data.contentRevision ?? 0) >= contentRevision) return data;

  const bundled = createInitialData().cards;
  const bundledById = new Map(bundled.map((card) => [card.id, card]));
  const existingIds = new Set(data.cards.map((card) => card.id));
  const deletedIds = new Set(data.deletedCardIds ?? []);

  const existing = data.cards.map((card) => {
    const reference = bundledById.get(card.id);
    if (!reference || reference.question !== card.question || reference.answer !== card.answer) return card;
    const sources = new Map(
      [...(card.sources ?? []), ...(reference.sources ?? [])]
        .map((source) => [`${source.id}:${source.sourceCardId}`, source])
    );
    return {
      ...card,
      topic: card.topic ?? (card.category === reference.category ? reference.topic : defaultTopic(card.category)),
      level: card.level ?? reference.level,
      tags: Array.from(new Set([...(card.tags ?? []), ...(reference.tags ?? [])])),
      explanation: card.explanation ?? reference.explanation,
      example: card.example ?? reference.example,
      alternateQuestions: Array.from(new Set([...(card.alternateQuestions ?? []), ...(reference.alternateQuestions ?? [])])),
      otherExplanations: Array.from(new Set([...(card.otherExplanations ?? []), ...(reference.otherExplanations ?? [])])),
      otherExamples: Array.from(new Set([...(card.otherExamples ?? []), ...(reference.otherExamples ?? [])])),
      sources: Array.from(sources.values()),
    };
  });
  const additions = bundled.filter((card) =>
    !card.id.startsWith('ai4sec-') && !existingIds.has(card.id) && !deletedIds.has(card.id)
  );

  const oldDefault = data.settings.dailyNewLimit === 10 && data.settings.userSetLimit !== true;
  return {
    ...data,
    contentRevision,
    cards: [...existing, ...additions],
    deletedCardIds: data.deletedCardIds ?? [],
    settings: {
      ...data.settings,
      dailyNewLimit: oldDefault ? 500 : data.settings.dailyNewLimit,
    },
  };
}
