import assert from 'node:assert/strict';
import test from 'node:test';
import { migrateStudyData } from '../src/data/migration';
import { createInitialData } from '../src/data/seed';
import { scheduleCard } from '../src/lib/scheduler';

test('upgrading a legacy library adds new cards without restoring deleted old cards or losing progress', () => {
  const initial = createInitialData();
  const oldCards = initial.cards.filter((card) => card.id.startsWith('ai4sec-'));
  const keptCard = oldCards[0];
  const removedCard = oldCards[1];
  const now = new Date(2026, 10, 20, 12).getTime();
  const progress = scheduleCard(undefined, 'good', now);
  const legacy = {
    ...initial,
    contentRevision: undefined,
    cards: oldCards.filter((card) => card.id !== removedCard.id),
    progress: { [keptCard.id]: progress },
    settings: { dailyNewLimit: 10 },
  };
  const upgraded = migrateStudyData(legacy);
  assert.equal(upgraded.settings.dailyNewLimit, 500);
  assert.deepEqual(upgraded.progress[keptCard.id], progress);
  assert.ok(!upgraded.cards.some((card) => card.id === removedCard.id));
  assert.ok(upgraded.cards.some((card) => card.id === 'cic-001'));
  assert.equal(migrateStudyData(upgraded), upgraded);
});

test('upgrading preserves customized limits, edited cards and deleted bundled cards', () => {
  const initial = createInitialData();
  const edited = { ...initial.cards[0], question: '我自己的问题？', answer: '我自己的答案。', sources: undefined };
  const legacy = {
    ...initial,
    contentRevision: undefined,
    cards: [edited],
    deletedCardIds: ['cic-001'],
    settings: { dailyNewLimit: 120 },
  };
  const upgraded = migrateStudyData(legacy);
  assert.equal(upgraded.settings.dailyNewLimit, 120);
  assert.equal(upgraded.cards[0].question, '我自己的问题？');
  assert.equal(upgraded.cards[0].sources, undefined);
  assert.ok(!upgraded.cards.some((card) => card.id === 'cic-001'));
});

test('upgrading adds new references to an unchanged existing card', () => {
  const initial = createInitialData();
  const labelLeakage = initial.cards.find((card) => card.id === 'ai4sec-002');
  assert.ok(labelLeakage);
  const legacy = {
    ...initial,
    contentRevision: undefined,
    cards: [{ ...labelLeakage, sources: labelLeakage.sources?.filter((source) => source.id === 'original') }],
  };
  const upgraded = migrateStudyData(legacy);
  const upgradedCard = upgraded.cards.find((card) => card.id === labelLeakage.id);
  assert.deepEqual(
    new Set(upgradedCard?.sources?.map((source) => source.id)),
    new Set(['original', 'cic-ids2017', 'unsw-nb15']),
  );
});
