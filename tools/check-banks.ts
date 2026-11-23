import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import similarityReviews from '../question-banks/similarity-reviews.json';
import researchCards from '../question-banks/interview-research-cards.json';
import { aliases, questionBanks, splits } from '../src/data/banks';
import { createInitialData, createLegacyCards } from '../src/data/seed';
import { knowledgeAreas } from '../src/knowledgeAreas';
import { CategoryId } from '../src/types';

const categories = new Set<CategoryId>(['foundations', 'detection', 'vulnerabilities', 'operations']);
const levels = new Set(['入门', '进阶', '实践']);
const areas = new Set<string>(knowledgeAreas.map(([id]) => id));
const thresholdArg = process.argv.find((argument) => argument.startsWith('--threshold='));
const threshold = thresholdArg ? Number(thresholdArg.slice('--threshold='.length)) : 0.7;
if (!Number.isFinite(threshold) || threshold < 0 || threshold > 1) throw new Error('threshold must be between 0 and 1');
const aliasMap = new Map(aliases.map((alias) => [alias.source, alias.canonical]));
const normalized = createInitialData().cards;
const legacy = createLegacyCards();
const raw = [
  ...legacy.map((card) => ({ id: card.id, category: card.category, question: card.question })),
  ...questionBanks.flatMap((bank) => bank.cards),
];
const errors: string[] = [];
const ids = new Set<string>();
const sourceIds = new Set<string>();

const bankRoot = join(__dirname, '..', 'question-banks');
const diskSourceIds = new Set<string>();
for (const entry of readdirSync(bankRoot, { withFileTypes: true })) {
  if (!entry.isDirectory() || entry.name === 'normalized') continue;
  const cardFile = join(bankRoot, entry.name, 'cards.json');
  if (!existsSync(cardFile)) {
    errors.push(`来源目录缺少 cards.json：${entry.name}`);
    continue;
  }
  try {
    const parsed = JSON.parse(readFileSync(cardFile, 'utf8'));
    if (typeof parsed.source?.id !== 'string') throw new Error('Missing source.id');
    if (diskSourceIds.has(parsed.source.id)) errors.push(`目录中的来源编号重复：${parsed.source.id}`);
    diskSourceIds.add(parsed.source.id);
  } catch {
    errors.push(`来源文件无法解析：${entry.name}`);
  }
}

for (const bank of questionBanks) {
  if (sourceIds.has(bank.source.id)) errors.push(`来源编号重复：${bank.source.id}`);
  sourceIds.add(bank.source.id);
  if (bank.source.knowledgeArea && !areas.has(bank.source.knowledgeArea)) errors.push(`知识范围无效：${bank.source.id}`);
  try {
    if (new URL(bank.source.url).protocol !== 'https:') throw new Error('HTTPS required');
  } catch {
    errors.push(`来源链接无效：${bank.source.id}`);
  }
  for (const card of bank.cards) {
    if (!categories.has(card.category)) errors.push(`分类无效：${card.id}`);
    if (!levels.has(card.level)) errors.push(`难度无效：${card.id}`);
    if (card.knowledgeArea && !areas.has(card.knowledgeArea)) errors.push(`卡片知识范围无效：${card.id}`);
    if (!card.question.trim() || !card.answer.trim() || !card.explanation.trim() ||
        !card.example.trim() || card.tags.length === 0) errors.push(`内容不完整：${card.id}`);
    if (!['source', 'application'].includes(card.evidence)) errors.push(`依据类型无效：${card.id}`);
    if ((card.knowledgeArea ?? bank.source.knowledgeArea) && (!card.subtopic?.trim() || !card.knowledgePoint?.trim() ||
        !card.questionType?.trim() || card.origin !== '自行整理' || !card.reference)) errors.push(`新卡知识点、整理方式或单题依据不完整：${card.id}`);
    if (card.reference) {
      try {
        if (new URL(card.reference).protocol !== 'https:') throw new Error('HTTPS required');
      } catch {
        errors.push(`卡片链接无效：${card.id}`);
      }
    }
    if (card.referenceId !== undefined && !card.referenceId.trim()) errors.push(`卡片来源编号无效：${card.id}`);
    const referenceIds = new Set([card.referenceId ?? bank.source.id]);
    for (const reference of card.supportingReferences ?? []) {
      if (!reference.id.trim() || referenceIds.has(reference.id) || !reference.title.trim() || !reference.type.trim() ||
          !['source', 'application'].includes(reference.evidence)) errors.push(`补充依据不完整或编号重复：${card.id}`);
      referenceIds.add(reference.id);
      try {
        if (new URL(reference.url).protocol !== 'https:') throw new Error('HTTPS required');
      } catch {
        errors.push(`补充依据链接无效：${card.id}`);
      }
    }
  }
}
for (const card of normalized) {
  if (!card.knowledgeArea || !areas.has(card.knowledgeArea)) errors.push(`标准卡片缺少知识范围：${card.id}`);
}
for (const sourceId of diskSourceIds) {
  if (!sourceIds.has(sourceId)) errors.push(`来源尚未注册到应用：${sourceId}`);
}
for (const sourceId of sourceIds) {
  if (!diskSourceIds.has(sourceId)) errors.push(`已注册来源缺少目录：${sourceId}`);
}

for (const card of raw) {
  if (ids.has(card.id)) errors.push(`卡片编号重复：${card.id}`);
  ids.add(card.id);
}
if (aliasMap.size !== aliases.length) errors.push('同一来源卡片存在多条合并规则。');
for (const alias of aliases) {
  if (!ids.has(alias.source) || !ids.has(alias.canonical)) errors.push(`合并规则引用未知编号：${alias.source} -> ${alias.canonical}`);
  if (aliasMap.has(alias.canonical)) errors.push(`合并目标不能是另一条别名：${alias.canonical}`);
  if (!alias.reason.trim()) errors.push(`合并规则缺少理由：${alias.source}`);
}
const splitSources = new Set<string>();
for (const split of splits) {
  if (splitSources.has(split.source)) errors.push(`组合题存在多条拆分规则：${split.source}`);
  splitSources.add(split.source);
  if (!ids.has(split.source) || aliasMap.has(split.source)) errors.push(`拆分源无效或已作为别名：${split.source}`);
  if (!split.reason.trim() || split.targets.length < 2) errors.push(`拆分规则不完整：${split.source}`);
  const targets = new Set<string>();
  for (const target of split.targets) {
    if (!ids.has(target.id) || aliasMap.has(target.id) || target.id === split.source || targets.has(target.id)) {
      errors.push(`拆分目标无效：${split.source} -> ${target.id}`);
    }
    targets.add(target.id);
  }
}

function fingerprint(question: string): string {
  return question.normalize('NFKC').toLowerCase().replace(/[\s\p{P}\p{S}]/gu, '');
}

const exact = new Map<string, string>();
for (const card of raw) {
  const key = fingerprint(card.question);
  const canonical = aliasMap.get(card.id) ?? card.id;
  const previous = exact.get(key);
  if (previous && previous !== canonical) errors.push(`完全重复的问题未合并：${previous} / ${canonical}`);
  else exact.set(key, canonical);
}

function bigrams(text: string): Set<string> {
  const chars = Array.from(fingerprint(text));
  return new Set(chars.slice(0, -1).map((character, index) => character + chars[index + 1]));
}

function similarity(left: Set<string>, right: Set<string>): number {
  const total = left.size + right.size;
  if (total === 0 || 2 * Math.min(left.size, right.size) < threshold * total) return 0;
  const smaller = left.size <= right.size ? left : right;
  const larger = smaller === left ? right : left;
  let overlap = 0;
  let remaining = smaller.size;
  for (const item of smaller) {
    if (larger.has(item)) overlap += 1;
    remaining -= 1;
    if (2 * (overlap + remaining) < threshold * total) return 0;
  }
  return (2 * overlap) / total;
}

const candidates: { first: string; second: string; score: number }[] = [];
const questionGrams = normalized.map((card) => bigrams(card.question));
for (let index = 0; index < normalized.length; index += 1) {
  for (let other = index + 1; other < normalized.length; other += 1) {
    const first = normalized[index];
    const second = normalized[other];
    const score = similarity(questionGrams[index], questionGrams[other]);
    if (score >= threshold) candidates.push({ first: first.id, second: second.id, score });
  }
}
candidates.sort((first, second) => second.score - first.score);

function pairKey(first: string, second: string): string {
  return [first, second].sort().join('\0');
}

const currentCandidates = new Map(candidates.map((candidate) => [pairKey(candidate.first, candidate.second), candidate]));
const reviewedPairs = new Map<string, (typeof similarityReviews.pairs)[number]>();
const normalizedIds = new Set(normalized.map((card) => card.id));
const normalizedById = new Map(normalized.map((card) => [card.id, card]));
const researchIds = new Set<string>();
for (const reviewed of researchCards.cards) {
  const card = normalizedById.get(reviewed.id);
  if (researchIds.has(reviewed.id)) errors.push(`研究拓展卡片重复登记：${reviewed.id}`);
  researchIds.add(reviewed.id);
  if (!card || card.question !== reviewed.question || card.answer !== reviewed.answer) {
    errors.push(`研究拓展卡片已变化，需重新审核：${reviewed.id}`);
  }
  if (!(reviewed.reason in researchCards.reasons)) errors.push(`研究拓展原因无效：${reviewed.id}`);
}
for (const pair of similarityReviews.pairs) {
  const key = pairKey(pair.first, pair.second);
  if (!normalizedIds.has(pair.first) || !normalizedIds.has(pair.second) || pair.first === pair.second) {
    errors.push(`相似度复核记录引用无效卡片：${pair.first} / ${pair.second}`);
  }
  if (pair.decision !== 'distinct') errors.push(`相似度复核记录结论无效：${pair.first} / ${pair.second}`);
  if (reviewedPairs.has(key)) errors.push(`相似度候选重复登记复核：${pair.first} / ${pair.second}`);
  reviewedPairs.set(key, pair);
}

const unresolvedCandidates = candidates.filter((candidate) =>
  !reviewedPairs.has(pairKey(candidate.first, candidate.second))
);
if (unresolvedCandidates.length && threshold === similarityReviews.threshold) {
  errors.push(`相似度候选有 ${unresolvedCandidates.length} 组尚未登记人工复核。`);
}
if (threshold === similarityReviews.threshold) {
  for (const [key, pair] of reviewedPairs) {
    const candidate = currentCandidates.get(key);
    if (!candidate) errors.push(`相似度复核记录已不再是当前候选：${pair.first} / ${pair.second}`);
    else if (Number(candidate.score.toFixed(2)) !== pair.score) {
      errors.push(`相似度复核记录分数已变化：${pair.first} / ${pair.second}`);
    }
  }
}

if (errors.length) {
  for (const error of errors) console.error(error);
  process.exitCode = 1;
} else {
  console.log(`${questionBanks.length} 个外部来源，${raw.length} 条原始题目，${normalized.length} 张标准化卡片；${aliases.length} 条合并规则，${splits.length} 条拆分规则。`);
  console.log(`问题文本相似候选（阈值 ${threshold}）：${candidates.length} 组，已登记复核 ${candidates.length - unresolvedCandidates.length} 组，未决 ${unresolvedCandidates.length} 组。`);
}
if (process.argv.includes('--candidates')) {
  for (const candidate of candidates) {
    console.log(`${candidate.score.toFixed(2)}  ${candidate.first}  ${candidate.second}`);
  }
}
