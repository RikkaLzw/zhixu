import assert from 'node:assert/strict';
import test from 'node:test';
import retired from '../question-banks/retired-v237.json';
import retiredV238 from '../question-banks/retired-v238.json';
import { migrateStudyData } from '../src/data/migration';
import { createInitialData } from '../src/data/seed';
import { hydrateStudyData, isCompactStudyData, serializeStudyData } from '../src/data/storage';
import { StudyCard, StudyData } from '../src/types';

test('compact storage preserves edits, custom cards, progress, deletions and archives', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'lora-004');
  assert.ok(original);
  const edited = { ...original, answer: '我的 LoRA 笔记。' };
  const custom: StudyCard = { id: 'custom-storage-check', category: 'foundations', question: '我的问题？', answer: '我的答案。', createdAt: 1 };
  const progress = { stage: 'review' as const, dueAt: 42, intervalDays: 1, ease: 2.5, reviews: 1, lapses: 0, introducedAt: 1, lastReviewedAt: 1 };
  const data: StudyData = { ...initial,
    cards: [...initial.cards.filter((card) => card.id !== 'sdp2-002').map((card) => card.id === edited.id ? edited : card), custom],
    progress: { [edited.id]: progress }, deletedCardIds: ['sdp2-002'], archivedBundledCards: [original],
    history: [{ id: 'event', cardId: edited.id, category: 'foundations', rating: 'good', reviewedAt: 1, wasNew: true }],
    settings: { dailyNewLimit: 25, userSetLimit: true, enabledLevels: ['入门', '实践'] },
  };
  const serialized = serializeStudyData(data);
  assert.ok(serialized.length < 250_000, `Unexpectedly large compact save: ${serialized.length}`);
  const raw: unknown = JSON.parse(serialized);
  assert.equal(isCompactStudyData(raw), true);
  const restored = hydrateStudyData(raw) as StudyData;
  assert.equal(restored.cards.length, data.cards.length);
  assert.deepEqual(restored.cards.find((card) => card.id === edited.id), edited);
  assert.deepEqual(restored.cards.find((card) => card.id === custom.id), custom);
  assert.ok(!restored.cards.some((card) => card.id === 'sdp2-002'));
  assert.deepEqual(restored.progress, data.progress);
  assert.deepEqual(restored.history, data.history);
  assert.deepEqual(restored.deletedCardIds, data.deletedCardIds);
  assert.deepEqual(restored.archivedBundledCards, data.archivedBundledCards);
  assert.deepEqual(restored.settings, data.settings);
});

test('older compact saves use snapshots for revised cards before migration', () => {
  const initial = createInitialData();
  const previous = retired.cards.find((card) => card.id === 'dbbase-014');
  assert.ok(previous);
  const raw = { ...initial, storageFormat: 2, contentRevision: 237, cards: ['dbbase-014'] };
  const restored = hydrateStudyData(raw) as StudyData;
  assert.equal(restored.cards[0].answer, previous.answer);
  const migrated = migrateStudyData(restored);
  assert.match(migrated.cards.find((card) => card.id === previous.id)?.answer ?? '', /NULL/);
  assert.ok(migrated.archivedBundledCards?.some((card) => card.id === previous.id));
});

test('stage calibration migrates old compact and full saves without losing edits or progress', () => {
  const initial = createInitialData();
  const snapshots = retiredV238.cards as StudyCard[];
  const oldLora = snapshots.find((card) => card.id === 'lora-004');
  const olderLora = retired.cards.find((card) => card.id === 'lora-004');
  const oldClassification = snapshots.find((card) => card.id === 'ai4sec-001');
  assert.ok(oldLora && olderLora && oldClassification);
  const progress = { stage: 'review' as const, dueAt: 42, intervalDays: 1, ease: 2.5, reviews: 3, lapses: 0, introducedAt: 1, lastReviewedAt: 1 };
  const settings = { dailyNewLimit: 25, enabledLevels: [] };
  const raw = { ...initial, storageFormat: 2, contentRevision: 238,
    cards: snapshots.map((card) => card.id), progress: { [oldLora.id]: progress }, settings };
  const restored = hydrateStudyData(raw) as StudyData;
  assert.deepEqual(restored.cards.find((card) => card.id === oldLora.id), oldLora);
  const migrated = migrateStudyData(restored);
  for (const old of snapshots) {
    assert.equal(old.level, '进阶');
    assert.equal(migrated.cards.find((card) => card.id === old.id)?.level, '入门');
    assert.ok(migrated.archivedBundledCards?.some((card) => card.id === old.id));
  }
  assert.deepEqual(migrated.progress[oldLora.id], progress);
  assert.deepEqual(migrated.settings, settings);

  const edited: StudyCard = { ...oldClassification, level: '实践', explanation: '我自己的解析。' };
  const preserved = migrateStudyData({ ...initial, contentRevision: 238, cards: [edited],
    progress: { [edited.id]: progress }, settings });
  assert.equal(preserved.cards.find((card) => card.id === edited.id)?.level, '实践');
  assert.equal(preserved.cards.find((card) => card.id === edited.id)?.explanation, '我自己的解析。');
  assert.deepEqual(preserved.progress[edited.id], progress);
  assert.deepEqual(preserved.settings, settings);

  // This card changed in both revisions; use the snapshot matching the saved revision.
  const older = hydrateStudyData({ ...raw, contentRevision: 237, cards: [oldLora.id] }) as StudyData;
  assert.deepEqual(older.cards[0], olderLora);
  const migratedOlder = migrateStudyData(older);
  assert.equal(migratedOlder.cards.find((card) => card.id === oldLora.id)?.level, '入门');
  assert.deepEqual(migratedOlder.progress[oldLora.id], progress);
});

test('legacy full saves pass through, and unknown compact IDs fail without discarding data', () => {
  const legacy = createInitialData();
  assert.equal(hydrateStudyData(legacy), legacy);
  assert.throws(() => hydrateStudyData({ storageFormat: 2, contentRevision: 238, cards: ['unknown-card-id'] }), /Missing bundled card snapshot/);
});
