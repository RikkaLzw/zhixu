import { createHash } from 'node:crypto';
import { StudyCard } from '../src/types';

export interface ReviewedCard {
  id: string;
  sha256: string;
}

export interface ReviewBatch {
  id: string;
  date: string;
  cards: ReviewedCard[];
}

// Any change to a card's learning content, classification or references requires a new review.
export function reviewDigest(card: StudyCard): string {
  const content = {
    id: card.id,
    category: card.category,
    topic: card.topic,
    knowledgeArea: card.knowledgeArea,
    subtopic: card.subtopic,
    knowledgePoint: card.knowledgePoint,
    questionType: card.questionType,
    origin: card.origin,
    level: card.level,
    question: card.question,
    answer: card.answer,
    explanation: card.explanation,
    example: card.example,
    tags: card.tags,
    sources: card.sources,
    alternateQuestions: card.alternateQuestions,
    otherExplanations: card.otherExplanations,
    otherExamples: card.otherExamples,
  };
  return createHash('sha256').update(JSON.stringify(content)).digest('hex');
}

export function reviewedIds(cards: StudyCard[], batches: ReviewBatch[]): { ids: Set<string>; errors: string[] } {
  const byId = new Map(cards.map((card) => [card.id, card]));
  const latest = new Map<string, ReviewedCard>();
  const ids = new Set<string>();
  const errors: string[] = [];
  // Review batches are stored newest first, so older records are applied first.
  for (const batch of [...batches].reverse()) {
    const batchSeen = new Set<string>();
    for (const entry of batch.cards) {
      if (batchSeen.has(entry.id)) {
        errors.push(`同一批次重复登记复核：${entry.id}`);
        continue;
      }
      batchSeen.add(entry.id);
      if (latest.get(entry.id)?.sha256 === entry.sha256) errors.push(`重复登记相同内容的复核：${entry.id}`);
      latest.set(entry.id, entry);
    }
  }
  for (const [id, entry] of latest) {
    const card = byId.get(id);
    if (!card) errors.push(`复核记录引用不存在的卡片：${id}`);
    else if (reviewDigest(card) !== entry.sha256) errors.push(`复核后内容已变化：${id}`);
    else ids.add(id);
  }
  return { ids, errors };
}
