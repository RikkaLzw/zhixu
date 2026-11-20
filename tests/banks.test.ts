import assert from 'node:assert/strict';
import test from 'node:test';
import { aliases, questionBanks } from '../src/data/banks';
import { createInitialData } from '../src/data/seed';
import { getStudyQueue, matchesScope } from '../src/lib/scheduler';

test('known duplicate concepts become one card while retaining all source references', () => {
  const cards = createInitialData().cards;
  const leakage = cards.find((card) => card.id === 'ai4sec-002');
  assert.ok(leakage);
  assert.deepEqual(
    new Set(leakage.sources?.map((source) => source.id)),
    new Set(['original', 'cic-ids2017', 'unsw-nb15']),
  );
  assert.ok(!cards.some((card) => card.id === 'cic-010' || card.id === 'unsw-004'));
  assert.ok(leakage.alternateQuestions?.some((question) => question.includes('UNSW')));
  assert.ok(matchesScope(leakage, { query: 'attack_cat' }));
  assert.equal(new Set(cards.map((card) => card.id)).size, cards.length);
  assert.equal(cards.length, 40 + questionBanks.reduce((count, bank) => count + bank.cards.length, 0) - aliases.length);
});

test('source, topic and keyword filters apply to study queues as well as search', () => {
  const data = createInitialData();
  const now = Date.now();
  const scope = { sourceId: 'cic-ids2017', query: '标签泄漏' };
  const matches = data.cards.filter((card) => matchesScope(card, scope));
  const queue = getStudyQueue(data, now, undefined, scope);
  assert.ok(matches.length > 0);
  assert.deepEqual(queue.map((card) => card.id), matches.map((card) => card.id));
  assert.ok(queue.every((card) => card.sources?.some((source) => source.id === 'cic-ids2017')));
  assert.ok(!matchesScope(queue[0], { sourceId: 'custom' }));
  const modelCard = data.cards.find((card) => card.tags?.includes('大模型'));
  assert.ok(modelCard);
  assert.ok(matchesScope(modelCard, { query: 'LLM' }));
});
