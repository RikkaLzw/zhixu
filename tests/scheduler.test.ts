import assert from 'node:assert/strict';
import test from 'node:test';
import { createInitialData } from '../src/data/seed';
import { getStreak, getStudyQueue, getTodayNewCount, scheduleCard } from '../src/lib/scheduler';
import { ReviewEvent } from '../src/types';

const now = new Date(2026, 10, 20, 12).getTime();
const minute = 60_000;
const day = 24 * 60 * minute;

test('new cards move from short consolidation into longer review', () => {
  const forgotten = scheduleCard(undefined, 'again', now);
  assert.equal(forgotten.stage, 'learning');
  assert.equal(forgotten.dueAt, now + minute);
  assert.equal(scheduleCard(undefined, 'hard', now).dueAt, now + 10 * minute);
  const remembered = scheduleCard(forgotten, 'good', now + minute);
  assert.equal(remembered.stage, 'review');
  assert.equal(remembered.intervalDays, 1);
  assert.equal(scheduleCard(undefined, 'easy', now).dueAt, now + 4 * day);
});

test('remembered reviews grow and a lapse returns the card to consolidation', () => {
  const first = scheduleCard(undefined, 'good', now);
  const second = scheduleCard(first, 'good', first.dueAt);
  assert.ok(second.intervalDays > first.intervalDays);
  const fuzzy = scheduleCard(second, 'hard', second.dueAt);
  assert.equal(fuzzy.stage, 'learning');
  assert.equal(fuzzy.dueAt, second.dueAt + 10 * minute);
  const forgotten = scheduleCard(second, 'again', second.dueAt);
  assert.equal(forgotten.stage, 'learning');
  assert.equal(forgotten.dueAt, second.dueAt + minute);
  assert.equal(forgotten.lapses, 1);
  assert.ok(forgotten.ease < second.ease);
  assert.equal(scheduleCard(forgotten, 'good', forgotten.dueAt).intervalDays, 1);
});

test('due cards come first and the daily new limit applies across categories', () => {
  const data = createInitialData();
  const review = data.cards[11];
  data.progress[review.id] = { ...scheduleCard(undefined, 'good', now - 2 * day), dueAt: now - day };
  data.settings.dailyNewLimit = 2;
  const firstNew = data.cards[0];
  data.progress[firstNew.id] = scheduleCard(undefined, 'good', now);
  data.history.push({
    id: 'event',
    cardId: firstNew.id,
    category: firstNew.category,
    rating: 'good',
    reviewedAt: now,
    wasNew: true,
  });
  const queue = getStudyQueue(data, now);
  assert.equal(queue[0].id, review.id);
  assert.equal(queue.length, 2);
  assert.equal(getStudyQueue(data, now, 'vulnerabilities').length, 1);
  assert.equal(getTodayNewCount(data, now + day), 0);
});

test('consecutive days include yesterday when nothing was studied today', () => {
  const data = createInitialData();
  const event = (id: string, reviewedAt: number): ReviewEvent => ({
    id,
    cardId: data.cards[0].id,
    category: 'foundations',
    rating: 'good',
    reviewedAt,
    wasNew: false,
  });
  data.history = [event('yesterday', now - day), event('two-days-ago', now - 2 * day)];
  assert.equal(getStreak(data, now), 2);
  data.history.push(event('today', now));
  assert.equal(getStreak(data, now), 3);
});
