import assert from 'node:assert/strict';
import test from 'node:test';
import research from '../question-banks/interview-research-cards.json';
import previous from '../question-banks/retired-v237.json';
import { contentRevision } from '../src/data/contentRevision';
import { migrateStudyData } from '../src/data/migration';
import { isResearchCard } from '../src/data/researchCards';
import { createInitialData } from '../src/data/seed';
import { getNextDue, getStudyQueue, matchesScope } from '../src/lib/scheduler';
import { StudyCard } from '../src/types';

test('research classification follows reviewed card text and preserves core concepts', () => {
  const data = createInitialData();
  const byId = new Map(data.cards.map((card) => [card.id, card]));
  assert.equal(new Set(research.cards.map((card) => card.id)).size, research.cards.length);
  for (const entry of research.cards) {
    const card = byId.get(entry.id);
    assert.ok(card, entry.id);
    assert.equal(isResearchCard(card), true, entry.id);
    assert.ok(entry.reason in research.reasons, entry.id);
  }
  for (const id of ['lora-001', 'lora-004', 'tcpbase-007', 'mteb-001']) {
    const card = byId.get(id);
    assert.ok(card, id);
    assert.equal(isResearchCard(card), false, id);
  }
  const original = byId.get('deepcase-025');
  assert.ok(original);
  assert.equal(isResearchCard({ ...original, answer: '我自己的笔记' }), false);
});

test('default study excludes research cards while explicit scopes retain progress and access', () => {
  const all = createInitialData();
  const core = all.cards.find((card) => card.id === 'lora-001');
  const researchCard = all.cards.find((card) => card.id === 'deepcase-025');
  assert.ok(core && researchCard);
  const now = 1_000_000;
  const progress = { stage: 'review' as const, dueAt: now - 1, intervalDays: 1, ease: 2.5, reviews: 1, lapses: 0, introducedAt: 1, lastReviewedAt: 1 };
  const data = { ...all, cards: [researchCard, core], progress: { [researchCard.id]: progress }, history: [], settings: { dailyNewLimit: 10 } };
  assert.deepEqual(getStudyQueue(data, now).map((card) => card.id), [core.id]);
  assert.deepEqual(getStudyQueue(data, now, undefined, { studySet: 'research' }).map((card) => card.id), [researchCard.id]);
  assert.deepEqual(getStudyQueue(data, now, undefined, { studySet: 'all' }).map((card) => card.id), [researchCard.id, core.id]);
  const sourceId = researchCard.sources?.[0]?.id;
  assert.ok(sourceId);
  assert.deepEqual(getStudyQueue(data, now, undefined, { sourceId }).map((card) => card.id), [researchCard.id]);
  assert.deepEqual(getStudyQueue(data, now, undefined, { sourceId, studySet: 'regular' }), []);
  assert.ok(matchesScope(researchCard, { studySet: 'research', query: 'Lastline' }));
  assert.ok(!matchesScope(researchCard, { studySet: 'regular' }));
  assert.equal(data.progress[researchCard.id], progress);
  const future = { ...data, progress: { [researchCard.id]: { ...progress, dueAt: now + 1000 } } };
  assert.equal(getNextDue(future, now), null);
  assert.equal(getNextDue(future, now, undefined, { studySet: 'research' }), now + 1000);
});

test('migration updates unedited cards, preserves edits and progress, and installs the previous batch', () => {
  const initial = createInitialData();
  const oldForeignKey = previous.cards.find((card) => card.id === 'dbbase-014') as StudyCard;
  const oldLora = previous.cards.find((card) => card.id === 'lora-004') as StudyCard;
  const oldCic = previous.cards.find((card) => card.id === 'cic-007') as StudyCard;
  assert.ok(oldForeignKey && oldLora && oldCic);
  const edited = { ...oldLora, answer: '我的 LoRA 笔记' };
  const progress = { stage: 'review' as const, dueAt: 42, intervalDays: 1, ease: 2.5, reviews: 1, lapses: 0, introducedAt: 1, lastReviewedAt: 1 };
  const migrated = migrateStudyData({ ...initial, contentRevision: 236, cards: [oldForeignKey, edited, oldCic],
    progress: { [oldForeignKey.id]: progress, [edited.id]: progress }, deletedCardIds: ['sdp2-002'] });
  assert.equal(migrated.contentRevision, contentRevision);
  assert.match(migrated.cards.find((card) => card.id === oldForeignKey.id)?.answer ?? '', /NULL/);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.match(migrated.cards.find((card) => card.id === oldCic.id)?.explanation ?? '', /预测时已经可获得/);
  assert.deepEqual(migrated.progress, { [oldForeignKey.id]: progress, [edited.id]: progress });
  assert.ok(migrated.archivedBundledCards?.some((card) => card.id === oldForeignKey.id && card.answer === oldForeignKey.answer));
  assert.ok(migrated.cards.some((card) => card.id === 'sdp2-001'));
  assert.ok(!migrated.cards.some((card) => card.id === 'sdp2-002'));
  assert.equal(migrateStudyData(migrated), migrated);
  const editedCic = { ...oldCic, explanation: '我自己的特征时间说明。' };
  const preserved = migrateStudyData({ ...initial, contentRevision: 237, cards: [editedCic] });
  assert.equal(preserved.cards.find((card) => card.id === editedCic.id)?.explanation, editedCic.explanation);
});
