import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { aliases, questionBanks } from '../src/data/banks';
import { createInitialData } from '../src/data/seed';
import { CategoryId, StudyCard } from '../src/types';

const categories = new Set<CategoryId>(['foundations', 'detection', 'vulnerabilities', 'operations']);
const levels = new Set(['入门', '进阶', '实践']);
const thresholdArg = process.argv.find((argument) => argument.startsWith('--threshold='));
const threshold = thresholdArg ? Number(thresholdArg.slice('--threshold='.length)) : 0.7;
if (!Number.isFinite(threshold) || threshold < 0 || threshold > 1) throw new Error('threshold must be between 0 and 1');
const aliasMap = new Map(aliases.map((alias) => [alias.source, alias.canonical]));
const normalized = createInitialData().cards;
const legacy = normalized.filter((card) => card.id.startsWith('ai4sec-'));
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
  try {
    if (new URL(bank.source.url).protocol !== 'https:') throw new Error('HTTPS required');
  } catch {
    errors.push(`来源链接无效：${bank.source.id}`);
  }
  for (const card of bank.cards) {
    if (!categories.has(card.category)) errors.push(`分类无效：${card.id}`);
    if (!levels.has(card.level)) errors.push(`难度无效：${card.id}`);
    if (!card.question.trim() || !card.answer.trim() || !card.explanation.trim() ||
        !card.example.trim() || card.tags.length === 0) errors.push(`内容不完整：${card.id}`);
    if (!['source', 'application'].includes(card.evidence)) errors.push(`依据类型无效：${card.id}`);
    if (card.reference) {
      try {
        if (new URL(card.reference).protocol !== 'https:') throw new Error('HTTPS required');
      } catch {
        errors.push(`卡片链接无效：${card.id}`);
      }
    }
  }
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

function similarity(first: StudyCard, second: StudyCard): number {
  const left = bigrams(first.question);
  const right = bigrams(second.question);
  const overlap = [...left].filter((item) => right.has(item)).length;
  return left.size + right.size === 0 ? 0 : (2 * overlap) / (left.size + right.size);
}

const candidates: { first: string; second: string; score: number }[] = [];
for (let index = 0; index < normalized.length; index += 1) {
  for (let other = index + 1; other < normalized.length; other += 1) {
    const first = normalized[index];
    const second = normalized[other];
    if (first.category !== second.category) continue;
    const score = similarity(first, second);
    if (score >= threshold) candidates.push({ first: first.id, second: second.id, score });
  }
}
candidates.sort((first, second) => second.score - first.score);

if (errors.length) {
  for (const error of errors) console.error(error);
  process.exitCode = 1;
} else {
  console.log(`${questionBanks.length} 个外部来源，${raw.length} 条原始题目，${normalized.length} 张去重卡片；${aliases.length} 条合并规则。`);
  console.log(`问题文本相似候选（阈值 ${threshold}）：${candidates.length} 组，需人工判断，不会自动删除。`);
  if (process.argv.includes('--candidates')) {
    for (const candidate of candidates) {
      console.log(`${candidate.score.toFixed(2)}  ${candidate.first}  ${candidate.second}`);
    }
  }
}
