import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { aliases, questionBanks } from '../src/data/banks';
import { StudyCard, StudyLevel } from '../src/types';

const root = join(__dirname, '..');
const bankRoot = join(root, 'question-banks');
const normalizedPath = join(bankRoot, 'normalized', 'cards.json');
const dryRun = process.argv.includes('--dry-run');
const normalized = JSON.parse(readFileSync(normalizedPath, 'utf8')).cards as StudyCard[];
const byId = new Map(normalized.map((card) => [card.id, card]));

const basicIds = new Set([
  'supervised-008', 'supervised-011', 'info-009', 'statdeep-006', 'boosting-001', 'impute-005',
  'pcastudy-006', 'npstudy-006', 'pysyntax-020', 'skapi-016', 'mathopt-008', 'mathopt-013',
  'nbayes-001', 'linproj-001', 'complexity-008', 'complexity-009', 'sortalg-013', 'graphalg-017',
  'dbbase-009', 'filefd-001', 'linuxbase-013', 'oscon-001', 'oscon-002', 'oscon-009', 'oscon-010',
  'httpbase-013', 'httpbase-019', 'httpbase-020', 'ipbase-007', 'ipbase-008', 'ipbase-010',
  'dnsdeep-001', 'dnsdeep-009', 'dnsdeep-011', 'dnsdeep-013', 'dnsdeep-014', 'ipv6net-005',
  'ipv6net-012', 'ipv6net-013', 'ipv6net-014', 'httpstatus-005', 'httpstatus-009', 'httpstatus-011',
  'httpcache-009', 'bashcore-006', 'bashcore-020', 'fsintern-009', 'netcmd-009', 'netcmd-010',
  'netcmd-012', 'netcmd-017', 'ngxlb-006', 'ethvlan-007', 'complexity-013', 'pyimport-014',
  'pyimport-018', 'pyregex-010', 'pyregex-022', 'pytestbase-003', 'pytestbase-008', 'pytestbase-015',
  'pyprof-008', 'loader-004', 'hashprobe-002', 'bitops-003', 'bitops-005', 'vmpolicy-012',
  'transdetail-002', 'nlpseq-003', 'nlpseq-009', 'rnnbase-001', 'tokint-003', 'companyddp-004',
  'archbase-011', 'jsbase-009', 'jsbase-018', 'jsbase-028', 'gitbase-013', 'gitbase-014',
  'gitbase-016', 'gitbase-021', 'gitbase-023', 'buildbase-007', 'buildbase-008', 'dockbase-009',
  'dockbase-010', 'dockbase-015', 'dockbuild-004', 'dockbuild-009', 'k8sbase-011', 'k8sf-011',
  'csc-076', 'csc-080', 'csc-091', 'csc-093', 'csc-128', 'csc-154', 'csc-175', 'csc-179',
  'csc-213', 'csc-263', 'csc-288', 'csc-360', 'csc-380', 'csc-387', 'csc-396', 'csc-422',
  'nncore-003', 'pipebase-006', 'pipebase-007',
  'ai4sec-002', 'ai4sec-021', 'ai4sec-025', 'ai4sec-033', 'companypractice-py-002',
  'textcli-008', 'honeynist-003', 'lcpractice-011', 'lcpractice-012', 'phish-003', 'pytypes-028',
]);

const practiceConceptKeepIds = new Set([
  'ai4sec-031', 'ai4sec-032', 'ai4sec-036', 'ai4sec-039', 'ai4sec-040', 'eval-013', 'zeek-010',
  'prime-006', 'prime-008', 'prime-011', 'attack-004', 'attack-006', 'attack-009', 'copilot-009',
  'rag-005', 'rag-009', 'phish-006', 'phish-008', 'companypractice-agent-001', 'companypractice-agent-002',
  'companypractice-eval-001', 'sentinelops-002', 'sentinelops-003', 'sentinelops-004', 'sentinelops-010',
  'sentinelops-011', 'sentinelops-012', 'sentinelops-013', 'sentinelops-014', 'sentinelops-015',
  'sentinelops-018', 'sentinelops-020', 'sentinelops-021', 'sentinelops-022', 'lcpractice-006',
  'lcpractice-007', 'lcpractice-008', 'lcpractice-013', 'lcpractice-014', 'lcpractice-015',
  'lcpractice-016', 'lcragapi-004', 'lcragapi-006', 'loradetail-001', 'loradetail-003',
  'loradetail-004', 'loradetail-007', 'loradetail-008', 'loradetail-009', 'loradetail-011',
  'loradetail-013', 'loradetail-014', 'aflnet-006', 'epssuse-015', 'epssuse-017', 'epssuse-018',
]);

const practiceIds = new Set([
  'production-008', 'graphagent-005', 'reliable-007', 'docai-002', 'ctxprep-002', 'irprio-001',
  'authint-001', 'pgpage-007', 'jcore-013', 'lperf-006', 'rockstore-015', 'perfmodel-015',
  'perfmodel-016', 'osbug-002', 'osbug-006', 'osbug-009', 'virtmech-018', 'virtmech-020',
  'virtmech-023', 'rabbitmq-011', 'rabbitmq-012', 'rabbitmq-023', 'backtrack-022', 'j26g1-001',
]);

const practiceTypes = new Set([
  '故障排查', '实践与排障', '实践与诊断', '实践', '实践题', '配置与实践', '日志诊断',
  '故障恢复', '优化与诊断', '安全场景', '简短场景', '场景判断',
]);

function targetLevel(card: StudyCard): StudyLevel | undefined {
  if (basicIds.has(card.id)) return '入门';
  if (card.level === '实践' && card.questionType === '概念与原理' && !practiceConceptKeepIds.has(card.id)) {
    return '进阶';
  }
  if (practiceTypes.has(card.questionType ?? '') && card.level === '进阶') return '实践';
  if (card.id.startsWith('sysdesign-') && card.level === '进阶') return '实践';
  if (practiceIds.has(card.id) && card.level === '进阶') return '实践';
  return undefined;
}

const changes = normalized.flatMap((card) => {
  const to = targetLevel(card);
  return to && to !== card.level ? [{ id: card.id, from: card.level!, to }] : [];
});
const changeById = new Map(changes.map((change) => [change.id, change]));
const changeCounts = changes.reduce<Record<string, number>>((counts, change) => {
  const key = `${change.from} -> ${change.to}`;
  counts[key] = (counts[key] ?? 0) + 1;
  return counts;
}, {});

const unknownIds = [...basicIds, ...practiceConceptKeepIds, ...practiceIds].filter((id) => !byId.has(id));
if (unknownIds.length) throw new Error(`校准清单含未知卡片编号：${unknownIds.join(', ')}`);

const aliasMap = new Map(aliases.map((alias) => [alias.source, alias.canonical]));
const targetsBySourceId = new Map<string, StudyLevel>();
for (const bank of questionBanks) {
  for (const card of bank.cards) {
    const canonicalId = aliasMap.get(card.id) ?? card.id;
    const change = changeById.get(canonicalId);
    if (change) targetsBySourceId.set(card.id, change.to);
  }
}

const missingSourceIds = changes.filter((change) =>
  !questionBanks.some((bank) => bank.cards.some((card) => (aliasMap.get(card.id) ?? card.id) === change.id))
).map((change) => change.id);
if (missingSourceIds.length) throw new Error(`缺少来源卡片，无法更新阶段：${missingSourceIds.join(', ')}`);

console.log(JSON.stringify({
  mode: dryRun ? 'dry-run' : 'apply',
  reviewedCards: normalized.length,
  changeCounts,
  totalChanges: changes.length,
  missingSourceIds,
}, null, 2));
if (process.argv.includes('--list')) {
  const listed = process.argv.includes('--from-practice')
    ? changes.filter((change) => change.from === '实践')
    : changes;
  console.log(JSON.stringify(listed, null, 2));
}

if (dryRun) process.exit(0);

const retiredPath = join(bankRoot, 'retired-v239.json');
if (existsSync(retiredPath)) throw new Error('retired-v239.json 已存在；拒绝覆盖迁移快照。');
const retiredCards = normalized.filter((card) => changeById.has(card.id));
writeFileSync(retiredPath, `${JSON.stringify({
  version: 239,
  note: '全库阶段校准前的主卡快照，用于保留用户自定义内容与学习进度。',
  cards: retiredCards,
}, null, 2)}\n`, 'utf8');

const changedSourceFiles: string[] = [];
const changedSourceIds = new Set<string>();
for (const entry of readdirSync(bankRoot, { withFileTypes: true })) {
  if (!entry.isDirectory() || entry.name === 'normalized') continue;
  const file = join(bankRoot, entry.name, 'cards.json');
  if (!existsSync(file)) continue;
  const parsed = JSON.parse(readFileSync(file, 'utf8')) as { cards?: { id: string; level?: StudyLevel }[] };
  if (!Array.isArray(parsed.cards)) continue;
  let changed = false;
  for (const card of parsed.cards) {
    const level = targetsBySourceId.get(card.id);
    if (!level) continue;
    card.level = level;
    changedSourceIds.add(card.id);
    changed = true;
  }
  if (changed) {
    writeFileSync(file, `${JSON.stringify(parsed, null, 2)}\n`, 'utf8');
    changedSourceFiles.push(file);
  }
}

const sourceIdsNotWritten = [...targetsBySourceId.keys()].filter((id) => !changedSourceIds.has(id));
if (sourceIdsNotWritten.length) throw new Error(`以下来源卡片未写入：${sourceIdsNotWritten.join(', ')}`);

const manifest = {
  version: 1,
  batchId: '2026-11-23-study-stage-calibration-259',
  date: '2026-11-23',
  reviewedCards: normalized.length,
  rubric: {
    basic: '核心术语、常见语法/API 和直接的基础辨析。',
    advanced: '机制、适用边界、复杂配置、推导及特定库的细节。',
    practice: '需要实际使用工具或代码、诊断故障、完成场景计算或应用方案取舍。',
  },
  changes: changes.map((change) => ({
    ...change,
    reason: change.to === '实践'
      ? '题目要求在工具、代码、故障或具体场景中应用知识。'
      : change.to === '入门'
        ? '题目考查核心定义、常用语法/API 或直接基础概念。'
        : '题目考查机制、边界或特定实现细节，不要求实践操作。',
  })),
};
writeFileSync(join(bankRoot, 'stage-calibration-v240.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
console.log(`已更新 ${changedSourceIds.size} 张来源卡片、${changedSourceFiles.length} 个题库文件，并保存 v239 快照。`);
