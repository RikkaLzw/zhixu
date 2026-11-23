import assert from 'node:assert/strict';
import test from 'node:test';
import { createInitialData } from '../src/data/seed';
import { reviewDigest, reviewedIds } from '../tools/review-coverage';

test('a changed or missing card cannot remain counted as reviewed', () => {
  const card = createInitialData().cards.find((item) => item.id === 'math-001');
  assert.ok(card);
  const batch = { id: 'test', date: '2026-11-20', cards: [{ id: card.id, sha256: reviewDigest(card) }] };
  assert.equal(reviewedIds([card], [batch]).ids.size, 1);
  const changed = reviewedIds([{ ...card, answer: '修改后的答案。' }], [batch]);
  assert.equal(changed.ids.size, 0);
  assert.match(changed.errors[0], /内容已变化/);
  assert.match(reviewedIds([], [batch]).errors[0], /不存在/);
  assert.match(reviewedIds([card], [batch, batch]).errors[0], /重复登记/);
});

test('a newer review can supersede an older content digest', () => {
  const card = createInitialData().cards.find((item) => item.id === 'math-001');
  assert.ok(card);
  const oldBatch = { id: 'old', date: '2026-11-20', cards: [{ id: card.id, sha256: reviewDigest(card) }] };
  const changed = { ...card, answer: '复核后更新的答案。' };
  const newBatch = { id: 'new', date: '2026-11-23', cards: [{ id: card.id, sha256: reviewDigest(changed) }] };
  const result = reviewedIds([changed], [newBatch, oldBatch]);
  assert.equal(result.ids.has(card.id), true);
  assert.deepEqual(result.errors, []);
});
