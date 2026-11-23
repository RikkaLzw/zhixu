import assert from 'node:assert/strict';
import test from 'node:test';
import { createInitialData } from '../src/data/seed';
import { cardLevel, enabledStudyLevels, studyLevelLabel, studyLevels } from '../src/levels';
import { getNextDue, getStudyQueue, matchesScope } from '../src/lib/scheduler';
import { StudyCard, StudyLevel } from '../src/types';

test('bundled cards have a stage and older custom cards remain available as basic', () => {
  const data = createInitialData();
  const allowed = new Set(studyLevels.map((level) => level.id));
  assert.ok(data.cards.every((card) => card.level && allowed.has(card.level)));
  assert.equal(studyLevelLabel('入门'), '基础');
  const custom: StudyCard = { id: 'custom', category: 'foundations', question: '问题', answer: '答案', createdAt: 1 };
  assert.equal(cardLevel(custom), '入门');
  assert.ok(matchesScope(custom, { level: '入门' }));
  assert.ok(!matchesScope(custom, { level: '进阶' }));
});

test('enabled stages control new cards and due reviews in every study scope', () => {
  const original = createInitialData();
  const basic = original.cards.find((card) => card.id === 'tcpbase-007');
  const advanced = original.cards.find((card) => card.id === 'agentsearch-003');
  const practice = original.cards.find((card) => card.id === 'ai4sec-002');
  const research = original.cards.find((card) => card.id === 'deepcase-025');
  assert.ok(basic && advanced && practice && research);
  const custom: StudyCard = { id: 'custom', category: 'foundations', question: '我的问题', answer: '答案', createdAt: 1 };
  const now = 1_000_000;
  const progress = { stage: 'review' as const, dueAt: now - 1, intervalDays: 1, ease: 2.5, reviews: 1, lapses: 0, introducedAt: 1, lastReviewedAt: 1 };
  const data = { ...original, cards: [advanced, basic, practice, research, custom],
    progress: { [advanced.id]: progress, [practice.id]: { ...progress, dueAt: now + 1000 } }, history: [],
    settings: { dailyNewLimit: 10, enabledLevels: ['入门' as const] } };
  assert.deepEqual(getStudyQueue(data, now).map((card) => card.id), [basic.id, custom.id]);
  assert.equal(getNextDue(data, now), null);
  assert.deepEqual(getStudyQueue(data, now, undefined, { level: '进阶' }), []);
  assert.deepEqual(getStudyQueue(data, now, undefined, { studySet: 'research' }), []);
  const sourceId = advanced.sources?.[0]?.id;
  assert.ok(sourceId);
  assert.deepEqual(getStudyQueue(data, now, undefined, { sourceId }), []);

  const resumed = { ...data, settings: { ...data.settings, enabledLevels: ['入门', '进阶', '实践'] as StudyLevel[] } };
  assert.deepEqual(getStudyQueue(resumed, now).map((card) => card.id), [advanced.id, basic.id, custom.id]);
  assert.equal(getNextDue(resumed, now), now + 1000);
  assert.deepEqual(getStudyQueue(resumed, now, undefined, { studySet: 'research' }).map((card) => card.id), [research.id]);
  assert.equal(resumed.progress[advanced.id], progress);
  const paused = { ...data, settings: { ...data.settings, enabledLevels: [] } };
  assert.deepEqual(getStudyQueue(paused, now), []);
  assert.equal(getNextDue(paused, now), null);
});

test('common Linux, Python, networking and AI fundamentals are in the basic stage', () => {
  const cards = new Map(createInitialData().cards.map((card) => [card.id, card]));
  for (const id of ['linuxbase-008', 'linuxbase-011', 'pysyntax-014', 'tcpbase-007', 'dbbase-020', 'lora-004', 'lcbase-018']) {
    const card = cards.get(id);
    assert.ok(card, `Missing ${id}`);
    assert.equal(cardLevel(card), '入门', `Unexpected stage for ${id}`);
    assert.ok(matchesScope(card, { studySet: 'regular', level: '入门' }));
  }
});

test('an absent stage preference keeps all stages enabled for existing users', () => {
  assert.deepEqual(enabledStudyLevels({ dailyNewLimit: 10 }), ['入门', '进阶', '实践']);
  assert.deepEqual(enabledStudyLevels({ dailyNewLimit: 10, enabledLevels: [] }), []);
  assert.deepEqual(enabledStudyLevels({ dailyNewLimit: 10, enabledLevels: ['实践', '入门'] }), ['入门', '实践']);
});
