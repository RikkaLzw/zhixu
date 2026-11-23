import assert from 'node:assert/strict';
import test from 'node:test';
import { migrateStudyData } from '../src/data/migration';
import { createInitialData } from '../src/data/seed';
import { scheduleCard } from '../src/lib/scheduler';
import retired from '../question-banks/retired-v4.json';
import retiredV6 from '../question-banks/retired-v6.json';
import retiredV8 from '../question-banks/retired-v8.json';
import retiredV9 from '../question-banks/retired-v9.json';
import retiredV11 from '../question-banks/retired-v11.json';
import retiredV17 from '../question-banks/retired-v17.json';
import retiredV18 from '../question-banks/retired-v18.json';
import retiredV19 from '../question-banks/retired-v19.json';
import retiredV20 from '../question-banks/retired-v20.json';
import retiredV21 from '../question-banks/retired-v21.json';
import retiredV22 from '../question-banks/retired-v22.json';
import retiredV23 from '../question-banks/retired-v23.json';
import retiredV25 from '../question-banks/retired-v25.json';
import retiredV38 from '../question-banks/retired-v38.json';
import retiredV49 from '../question-banks/retired-v49.json';
import retiredV52 from '../question-banks/retired-v52.json';
import retiredV54 from '../question-banks/retired-v54.json';
import retiredV55 from '../question-banks/retired-v55.json';
import retiredV62 from '../question-banks/retired-v62.json';
import retiredV82 from '../question-banks/retired-v82.json';
import retiredV83 from '../question-banks/retired-v83.json';
import retiredV118 from '../question-banks/retired-v118.json';
import { StudyCard } from '../src/types';

test('revision 183 adds planning, statistics and security cards while preserving local data', () => {
  const initial = createInitialData();
  const saved = initial.cards.find((card) => card.id === 'qdrant-005');
  assert.ok(saved);
  const edited = { ...saved, answer: '我自己的向量库笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const prefixes = ['mlecore-', 'limitstat-', 'graphplan-', 'zeekdns-', 'winproc-', 'tram-', 'caldera-', 'honeynist-', 'aflnet-'];
  const previousCards = initial.cards.filter((card) => !prefixes.some((prefix) => card.id.startsWith(prefix)))
    .map((card) => card.id === edited.id ? edited : card);
  const migrated = migrateStudyData({ ...initial, contentRevision: 182, cards: previousCards,
    progress: { [edited.id]: progress }, deletedCardIds: ['aflnet-007'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'aflnet-007'));
  for (const id of ['mlecore-006', 'limitstat-001', 'graphplan-006', 'zeekdns-005', 'winproc-005', 'tram-002', 'caldera-004', 'honeynist-002', 'aflnet-005']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
});

test('revision 182 adds retrieval and evaluation cards without losing local study data', () => {
  const initial = createInitialData();
  const saved = initial.cards.find((card) => card.id === 'pymock-001');
  assert.ok(saved);
  const edited = { ...saved, answer: '我自己的测试替身笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const prefixes = ['qdrant-', 'cbpe-', 'geval-', 'alce-', 'ares-', 'dinov2-', 'vpn2016-'];
  const previousCards = initial.cards.filter((card) => !prefixes.some((prefix) => card.id.startsWith(prefix)))
    .map((card) => card.id === edited.id ? edited : card);
  const migrated = migrateStudyData({ ...initial, contentRevision: 181, cards: previousCards,
    progress: { [edited.id]: progress }, deletedCardIds: ['qdrant-012'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'qdrant-012'));
  for (const id of ['qdrant-005', 'cbpe-003', 'geval-004', 'alce-003', 'ares-004', 'dinov2-004', 'vpn2016-003']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
});

test('revision 181 adds computing and Python cards while retaining local changes', () => {
  const initial = createInitialData();
  const saved = initial.cards.find((card) => card.id === 'tcpbase-001');
  assert.ok(saved);
  const edited = { ...saved, answer: '我自己的 TCP 笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const prefixes = ['lcsdp-', 'mstcs-', 'clockcs-', 'pymock-', 'pgsave-'];
  const previousCards = initial.cards.filter((card) => !prefixes.some((prefix) => card.id.startsWith(prefix)))
    .map((card) => card.id === edited.id ? edited : card);
  const migrated = migrateStudyData({ ...initial, contentRevision: 180, cards: previousCards,
    progress: { [edited.id]: progress }, deletedCardIds: ['pymock-010'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'pymock-010'));
  for (const id of ['lcsdp-006', 'mstcs-003', 'clockcs-004', 'pymock-001', 'pgsave-001']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
});

test('revision 180 adds agent, model and security sources without losing study data', () => {
  const initial = createInitialData();
  const saved = initial.cards.find((card) => card.id === 'fimpaper-002');
  assert.ok(saved);
  const edited = { ...saved, answer: '我自己的填空训练笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const prefixes = ['agverse-', 'apibank-', 'prefixtune-', 'ganbase-', 'ghsaapi-', 'owbench-'];
  const previousCards = initial.cards.filter((card) => !prefixes.some((prefix) => card.id.startsWith(prefix)))
    .map((card) => card.id === edited.id ? edited : card);
  const migrated = migrateStudyData({ ...initial, contentRevision: 179, cards: previousCards,
    progress: { [edited.id]: progress }, deletedCardIds: ['owbench-007'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'owbench-007'));
  for (const id of ['agverse-003', 'apibank-005', 'prefixtune-007', 'ganbase-006', 'ghsaapi-006', 'owbench-002']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
});

test('revision 179 adds model and security sources while preserving study data', () => {
  const initial = createInitialData();
  const saved = initial.cards.find((card) => card.id === 'zeek-002');
  assert.ok(saved);
  const edited = { ...saved, answer: '我自己的日志关联笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const prefixes = ['fimpaper-', 'skpoly-', 'pybag-', 'yramath-', 'zeekhttp-', 'mlreg-'];
  const previousCards = initial.cards.filter((card) => !prefixes.some((prefix) => card.id.startsWith(prefix)))
    .map((card) => card.id === edited.id ? edited : card);
  const migrated = migrateStudyData({ ...initial, contentRevision: 178, cards: previousCards,
    progress: { [edited.id]: progress }, deletedCardIds: ['yramath-008'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'yramath-008'));
  for (const id of ['fimpaper-002', 'skpoly-003', 'pybag-004', 'yramath-006', 'zeekhttp-004', 'mlreg-003']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
});

test('revision 178 adds common computing topics and preserves study state', () => {
  const initial = createInitialData();
  const saved = initial.cards.find((card) => card.id === 'twos-001');
  assert.ok(saved);
  const edited = { ...saved, answer: '我自己的数值表示笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const prefixes = ['avl-', 'rwcs-', 'sqlver-', 'httplimit-', 'floatsys-'];
  const previousCards = initial.cards.filter((card) => !prefixes.some((prefix) => card.id.startsWith(prefix)))
    .map((card) => card.id === edited.id ? edited : card);
  const migrated = migrateStudyData({ ...initial, contentRevision: 177, cards: previousCards,
    progress: { [edited.id]: progress }, deletedCardIds: ['rwcs-005'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'rwcs-005'));
  for (const id of ['avl-003', 'rwcs-004', 'sqlver-004', 'httplimit-002', 'floatsys-001']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
});

test('revision 177 adds systems and AI cards without losing edits, progress or deletions', () => {
  const initial = createInitialData();
  const saved = initial.cards.find((card) => card.id === 'httpbase-002');
  assert.ok(saved);
  const edited = { ...saved, answer: '我自己的幂等笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const prefixes = ['ptmha-', 'hftokencls-', 'safeio-', 'catboost-', 'trecmap-', 'tvaug-', 'twos-', 'huff-', 'gcb-', 'httpmethod-'];
  const previousCards = initial.cards.filter((card) => !prefixes.some((prefix) => card.id.startsWith(prefix)))
    .map((card) => card.id === edited.id ? edited : card);
  const migrated = migrateStudyData({ ...initial, contentRevision: 176, cards: previousCards,
    progress: { [edited.id]: progress }, deletedCardIds: ['gcb-008'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'gcb-008'));
  for (const id of ['twos-001', 'huff-003', 'gcb-002', 'httpmethod-003', 'ptmha-003', 'hftokencls-007', 'safeio-002', 'catboost-003', 'trecmap-004', 'tvaug-007']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
});

test('revision 176 adds Python and security cards without losing study data', () => {
  const initial = createInitialData();
  const saved = initial.cards.find((card) => card.id === 'pulearn-004');
  assert.ok(saved);
  const edited = { ...saved, answer: '我自己的概率笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const prefixes = ['pyheap-', 'pythread-', 'kappa-', 'gofuzz-', 'elfcli-', 'ghidra-'];
  const previousCards = initial.cards
    .filter((card) => !prefixes.some((prefix) => card.id.startsWith(prefix)))
    .map((card) => card.id === edited.id ? edited : card);
  const migrated = migrateStudyData({ ...initial, contentRevision: 175, cards: previousCards,
    progress: { [edited.id]: progress }, deletedCardIds: ['pyheap-009'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'pyheap-009'));
  for (const id of ['pyheap-003', 'pythread-006', 'kappa-006', 'gofuzz-006', 'elfcli-005', 'ghidra-006']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
});

test('revision 175 adds Agent, evaluation and security cards while preserving study state', () => {
  const initial = createInitialData();
  const saved = initial.cards.find((card) => card.id === 'aptpkg-003');
  assert.ok(saved);
  const edited = { ...saved, answer: '我的软件包管理笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const prefixes = ['lgnode-', 'pyodknn-', 'wazrule-', 'ctv1-', 'pulearn-', 'brierapi-'];
  const previousCards = initial.cards
    .filter((card) => !prefixes.some((prefix) => card.id.startsWith(prefix)))
    .map((card) => card.id === edited.id ? edited : card);
  const migrated = migrateStudyData({ ...initial, contentRevision: 174, cards: previousCards,
    progress: { [edited.id]: progress }, deletedCardIds: ['lgnode-008'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'lgnode-008'));
  for (const id of ['lgnode-003', 'pyodknn-004', 'wazrule-002', 'ctv1-005', 'pulearn-004', 'brierapi-004']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
});

test('revision 174 adds common computer cards and preserves local study data', () => {
  const initial = createInitialData();
  const saved = initial.cards.find((card) => card.id === 'linuxbase-001');
  assert.ok(saved);
  const edited = { ...saved, answer: '我自己的 Linux 复习笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const prefixes = ['aptpkg-', 'sshkey-', 'psquery-', 'cmakebase-'];
  const previousCards = initial.cards
    .filter((card) => !prefixes.some((prefix) => card.id.startsWith(prefix)))
    .map((card) => card.id === edited.id ? edited : card);
  const migrated = migrateStudyData({ ...initial, contentRevision: 173, cards: previousCards,
    progress: { [edited.id]: progress }, deletedCardIds: ['aptpkg-011'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'aptpkg-011'));
  for (const id of ['aptpkg-001', 'sshkey-006', 'psquery-003', 'cmakebase-006']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
});

test('revision 173 adds agent and security cards while retaining study data', () => {
  const initial = createInitialData();
  const saved = initial.cards.find((card) => card.id === 'hftoken-009');
  assert.ok(saved);
  const edited = { ...saved, answer: '我的分词窗口笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const prefixes = ['gamesearch-', 'rltd-', 'skpdp-', 'tau2-', 'certinsider-', 'fuzzgpt-'];
  const previousCards = initial.cards
    .filter((card) => !prefixes.some((prefix) => card.id.startsWith(prefix)))
    .map((card) => card.id === edited.id ? edited : card);
  const migrated = migrateStudyData({ ...initial, contentRevision: 172, cards: previousCards,
    progress: { [edited.id]: progress }, deletedCardIds: ['gamesearch-009'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'gamesearch-009'));
  for (const id of ['gamesearch-004', 'rltd-004', 'skpdp-004', 'tau2-001', 'certinsider-001', 'fuzzgpt-003']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
});

test('revision 172 adds model and security cards without losing local study state', () => {
  const initial = createInitialData();
  const saved = initial.cards.find((card) => card.id === 'grpcbase-008');
  assert.ok(saved);
  const edited = { ...saved, answer: '我的服务超时笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const prefixes = ['hftoken-', 'hftrainer-', 'ptembed-', 'matryoshka-', 'rslora-', 'malnet-', 'vtbehavior-'];
  const previousCards = initial.cards
    .filter((card) => !prefixes.some((prefix) => card.id.startsWith(prefix)))
    .map((card) => card.id === edited.id ? edited : card);
  const migrated = migrateStudyData({ ...initial, contentRevision: 171, cards: previousCards,
    progress: { [edited.id]: progress }, deletedCardIds: ['hftoken-011'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'hftoken-011'));
  for (const id of ['hftoken-009', 'hftrainer-007', 'ptembed-004', 'matryoshka-004', 'rslora-001', 'malnet-005', 'vtbehavior-005']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
});

test('revision 171 adds computer cards while preserving learning and edits', () => {
  const initial = createInitialData();
  const saved = initial.cards.find((card) => card.id === 'linuxbase-001');
  assert.ok(saved);
  const edited = { ...saved, answer: '我的 Linux 学习笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const prefixes = ['gitignore-', 'scpbase-', 'grpcbase-', 'pgtime-', 'dbpool-', 'hashprobe-'];
  const previousCards = initial.cards
    .filter((card) => !prefixes.some((prefix) => card.id.startsWith(prefix)))
    .map((card) => card.id === edited.id ? edited : card);
  const migrated = migrateStudyData({ ...initial, contentRevision: 170, cards: previousCards,
    progress: { [edited.id]: progress }, deletedCardIds: ['gitignore-011'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'gitignore-011'));
  for (const id of ['gitignore-006', 'scpbase-007', 'grpcbase-008', 'pgtime-008', 'dbpool-008', 'hashprobe-006']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
});

test('revision 170 adds Agent and security sources without losing study state', () => {
  const initial = createInitialData();
  const saved = initial.cards.find((card) => card.id === 'syslog-002');
  assert.ok(saved);
  const edited = { ...saved, answer: '我的日志优先级笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const prefixes = ['pdstring-', 'optcritic-', 'gorilla-', 'energyood-', 'vulrepair-', 'aflmut-', 'taxiipage-', 'linuxacl-'];
  const previousCards = initial.cards
    .filter((card) => !prefixes.some((prefix) => card.id.startsWith(prefix)))
    .map((card) => card.id === edited.id ? edited : card);
  const migrated = migrateStudyData({ ...initial, contentRevision: 169, cards: previousCards,
    progress: { [edited.id]: progress }, deletedCardIds: ['linuxacl-008'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'linuxacl-008'));
  for (const id of ['pdstring-001', 'optcritic-002', 'gorilla-002', 'energyood-005',
    'vulrepair-004', 'aflmut-006', 'taxiipage-004', 'linuxacl-002']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
});

test('revision 169 adds data and security cards without losing local state', () => {
  const initial = createInitialData();
  const existing = initial.cards.find((card) => card.id === 'digcmd-006');
  assert.ok(existing);
  const edited = { ...existing, answer: '我的 DNS 排查笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const prefixes = ['pycsv-', 'npchoice-', 'robuststat-', 'peakapi-', 'pilimage-', 'syslog-', 'toolemu-', 'ssvc-'];
  const previousCards = initial.cards
    .filter((card) => !prefixes.some((prefix) => card.id.startsWith(prefix)))
    .map((card) => card.id === edited.id ? edited : card);
  const migrated = migrateStudyData({ ...initial, contentRevision: 168, cards: previousCards,
    progress: { [edited.id]: progress }, deletedCardIds: ['syslog-008'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'syslog-008'));
  for (const id of ['pycsv-001', 'npchoice-006', 'robuststat-001', 'peakapi-004',
    'pilimage-004', 'syslog-002', 'toolemu-003', 'ssvc-005']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
});

test('revision 168 adds computer and research cards while preserving study data', () => {
  const initial = createInitialData();
  const saved = initial.cards.find((card) => card.id === 'bashcore-009');
  assert.ok(saved);
  const edited = { ...saved, answer: '我的管道笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const prefixes = ['sktimes-', 'pyhash-', 'sclient-', 'pyhbos-', 'd2astudy-', 'androzoo-',
    'agentboard-', 'ddpm-', 'angora-', 'mispgal-', 'digcmd-', 'bitops-', 'gtimeout-', 'basherr-'];
  const previousCards = initial.cards
    .filter((card) => !prefixes.some((prefix) => card.id.startsWith(prefix)))
    .map((card) => card.id === edited.id ? edited : card);
  const migrated = migrateStudyData({ ...initial, contentRevision: 167, cards: previousCards,
    progress: { [edited.id]: progress }, deletedCardIds: ['digcmd-008'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'digcmd-008'));
  for (const id of ['sktimes-001', 'pyhash-005', 'sclient-002', 'pyhbos-001', 'd2astudy-003',
    'androzoo-003', 'agentboard-001', 'ddpm-002', 'angora-001', 'mispgal-001',
    'digcmd-006', 'bitops-004', 'gtimeout-003', 'basherr-002']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
});

test('revision 167 adds model and computing cards while preserving local state', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'inotify-004');
  assert.ok(original);
  const edited = { ...original, answer: '我自己的文件事件笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const prefixes = ['splog-', 'ptpool-', 'hfcoll-', 'lccache-', 'simclr-', 'deepsad-', 'flock-', 'hsts-', 'covpy-'];
  const previousCards = initial.cards
    .filter((card) => card.id !== 'tcpdetail-004' && !prefixes.some((prefix) => card.id.startsWith(prefix)))
    .map((card) => card.id === edited.id ? edited : card);
  const migrated = migrateStudyData({ ...initial, contentRevision: 166, cards: previousCards,
    progress: { [edited.id]: progress }, deletedCardIds: ['tcpdetail-004', 'hsts-007'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'tcpdetail-004' || card.id === 'hsts-007'));
  for (const id of ['splog-004', 'ptpool-002', 'hfcoll-008', 'lccache-003', 'simclr-004',
    'deepsad-002', 'flock-003', 'hsts-006', 'covpy-007']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
});

test('revision 166 adds systems and model cards while retaining local state', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'gitsub-006');
  assert.ok(original);
  const edited = { ...original, answer: '我自己的子模块更新笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const prefixes = ['inotify-', 'psqlcli-', 'pyenv-', 'pyjson-', 'pdmerge-', 'pydv2-', 'skevalcl-', 'lorafa-', 'ciciot-'];
  const previousCards = initial.cards
    .filter((card) => card.id !== 'tcpdetail-004' && !prefixes.some((prefix) => card.id.startsWith(prefix)))
    .map((card) => card.id === edited.id ? edited : card);
  const migrated = migrateStudyData({ ...initial, contentRevision: 165, cards: previousCards,
    progress: { [edited.id]: progress }, deletedCardIds: ['tcpdetail-004', 'inotify-007'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'tcpdetail-004' || card.id === 'inotify-007'));
  for (const id of ['inotify-004', 'psqlcli-004', 'pyenv-003', 'pyjson-006', 'pdmerge-001', 'pydv2-007',
    'skevalcl-004', 'lorafa-002', 'ciciot-003']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
});

test('revision 165 adds computer and AI cards while preserving edits, progress and deletions', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'procinfo-006');
  assert.ok(original);
  const edited = { ...original, answer: '我自己整理的进程环境笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const prefixes = ['pyreq-', 'gitsub-', 'gitwt-', 'laudit-', 'pycopod-', 'vul4j-', 'phiusiil-', 'plansolve-', 'mtjudge-'];
  const previousCards = initial.cards
    .filter((card) => card.id !== 'tcpdetail-004' && !prefixes.some((prefix) => card.id.startsWith(prefix)))
    .map((card) => card.id === edited.id ? edited : card);
  const migrated = migrateStudyData({ ...initial, contentRevision: 164, cards: previousCards,
    progress: { [edited.id]: progress }, deletedCardIds: ['tcpdetail-004', 'gitsub-008'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'tcpdetail-004' || card.id === 'gitsub-008'));
  for (const id of ['pyreq-001', 'gitsub-006', 'gitwt-002', 'laudit-001', 'pycopod-003',
    'vul4j-002', 'phiusiil-002', 'plansolve-002', 'mtjudge-002']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
});

test('revision 164 adds data, model and systems cards while preserving local state', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'textmerge-004');
  assert.ok(original);
  const edited = { ...original, answer: '我自己的 join 笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const prefixes = ['scipytest-', 'shapiro-', 'pdasof-', 'pddate-', 'skknn-', 'adamw-', 'loraplus-', 'lcstruct-', 'procinfo-'];
  const previousCards = initial.cards
    .filter((card) => card.id !== 'tcpdetail-004' && !prefixes.some((prefix) => card.id.startsWith(prefix)))
    .map((card) => card.id === edited.id ? edited : card);
  const migrated = migrateStudyData({ ...initial, contentRevision: 163, cards: previousCards,
    progress: { [edited.id]: progress }, deletedCardIds: ['tcpdetail-004', 'procinfo-008'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'tcpdetail-004' || card.id === 'procinfo-008'));
  for (const id of ['scipytest-008', 'shapiro-002', 'pdasof-008', 'pddate-003', 'skknn-006',
    'adamw-006', 'loraplus-001', 'lcstruct-004', 'procinfo-006']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
});

test('revision 163 adds research and systems cards while preserving local state', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'cronjob-005');
  assert.ok(original);
  const edited = { ...original, answer: '我自己的定时任务笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const prefixes = ['xlnetpaper-', 'hotpot-', 'rapplan-', 'revealvul-', 'fuzzilli-', 'yaracond-',
    'tfox-', 'vol3-', 'astpaper-', 'textmerge-'];
  const previousCards = initial.cards
    .filter((card) => card.id !== 'tcpdetail-004' && !prefixes.some((prefix) => card.id.startsWith(prefix)))
    .map((card) => card.id === edited.id ? edited : card);
  const migrated = migrateStudyData({ ...initial, contentRevision: 162, cards: previousCards,
    progress: { [edited.id]: progress }, deletedCardIds: ['tcpdetail-004', 'textmerge-002'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'tcpdetail-004' || card.id === 'textmerge-002'));
  for (const id of ['xlnetpaper-002', 'hotpot-006', 'rapplan-003', 'revealvul-005', 'fuzzilli-004',
    'yaracond-002', 'tfox-003', 'vol3-004', 'astpaper-006', 'textmerge-004']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
});

test('revision 162 adds computing and model cards while retaining edits, progress and deletions', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'tcpbase-007');
  assert.ok(original);
  const edited = { ...original, answer: '我自己的 TCP 握手笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const prefixes = ['skhash-', 'skhist-', 'ptinit-', 'ia3-', 'lchistory-', 'lats-', 'hdfsdata-', 'eif-',
    'mlflow-', 'cronjob-', 'linuxid-', 'linenv-', 'iowait-', 'diffpatch-'];
  const previousCards = initial.cards
    .filter((card) => card.id !== 'tcpdetail-004' && !prefixes.some((prefix) => card.id.startsWith(prefix)))
    .map((card) => card.id === edited.id ? edited : card);
  const migrated = migrateStudyData({ ...initial, contentRevision: 161, cards: previousCards,
    progress: { [edited.id]: progress }, deletedCardIds: ['tcpdetail-004', 'cronjob-006'] });

  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'tcpdetail-004' || card.id === 'cronjob-006'));
  for (const id of ['skhash-003', 'skhist-004', 'ptinit-005', 'ia3-004', 'lchistory-001', 'lats-003',
    'hdfsdata-003', 'eif-003', 'mlflow-007', 'cronjob-005', 'linuxid-009', 'linenv-007', 'iowait-008', 'diffpatch-002']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
});

test('revision 161 adds reviewed sources while retaining edits, progress and deletions', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'mysqllog-002');
  assert.ok(original);
  const edited = { ...original, answer: '我自己的日志与恢复笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const prefixes = ['mannu-', 'pymproc-', 'bartpaper-', 'alfworld-', 'msrvul-',
    'aflgo-', 'octi-', 'ecsfield-', 'clappaper-', 'redisstream-'];
  const previousCards = initial.cards
    .filter((card) => card.id !== 'tcpdetail-004' && !prefixes.some((prefix) => card.id.startsWith(prefix)))
    .map((card) => card.id === edited.id ? edited : card);
  const migrated = migrateStudyData({ ...initial, contentRevision: 160, cards: previousCards,
    progress: { [edited.id]: progress }, deletedCardIds: ['tcpdetail-004', 'redisstream-004'] });

  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'tcpdetail-004' || card.id === 'redisstream-004'));
  for (const id of ['mannu-006', 'pymproc-008', 'bartpaper-003', 'alfworld-008', 'msrvul-003',
    'aflgo-005', 'octi-008', 'ecsfield-006', 'clappaper-006', 'redisstream-003']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
});

test('revision 160 adds computing and model cards without losing edits, progress or deletions', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'tcpbase-007');
  assert.ok(original);
  const edited = { ...original, answer: '我自己的 TCP 握手笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const prefixes = ['mysqllog-', 'tcpdetail-', 'bashadv-', 'outcmd-', 'pgnlogic-', 'lgbtree-', 'lgbapi-',
    'ptce-', 'pissa-', 'bnbcfg-', 'e5embed-', 'minhash-', 'ja3base-', 'usadcode-', 'capabase-', 'hellinger-'];
  const previousCards = initial.cards
    .filter((card) => card.id !== 'tcpbase-008' && !prefixes.some((prefix) => card.id.startsWith(prefix)))
    .map((card) => card.id === edited.id ? edited : card);
  const migrated = migrateStudyData({ ...initial, contentRevision: 159, cards: previousCards,
    progress: { [edited.id]: progress }, deletedCardIds: ['tcpbase-008', 'mysqllog-003'] });

  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'tcpbase-008' || card.id === 'mysqllog-003'));
  for (const id of ['mysqllog-002', 'tcpdetail-004', 'bashadv-007', 'outcmd-004', 'pgnlogic-003',
    'lgbtree-003', 'lgbapi-007', 'ptce-003', 'pissa-001', 'bnbcfg-004', 'e5embed-002',
    'minhash-008', 'ja3base-004', 'usadcode-002', 'capabase-003', 'hellinger-002']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
});

test('revision 159 adds database, agent and security cards while preserving study data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'longformer-003');
  assert.ok(original);
  const edited = { ...original, answer: '我的长文本学习笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const prefixes = ['pysqlite-', 'mteb-', 'metagpt-', 'mind2web-', 'chatafl-', 'mispwarn-', 'elasticth-', 'detr-'];
  const previousCards = initial.cards
    .filter((card) => card.id !== 'longformer-004' && !prefixes.some((prefix) => card.id.startsWith(prefix)))
    .map((card) => card.id === edited.id ? edited : card);
  const migrated = migrateStudyData({ ...initial, contentRevision: 158, cards: previousCards,
    progress: { [edited.id]: progress }, deletedCardIds: ['longformer-004'] });

  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'longformer-004'));
  for (const id of ['pysqlite-012', 'mteb-004', 'metagpt-002', 'mind2web-005',
    'chatafl-007', 'mispwarn-007', 'elasticth-004', 'detr-004']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
});

test('revision 158 adds model and security cards while preserving study data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'sshops-006');
  assert.ok(original);
  const edited = { ...original, answer: '我的 SSH 学习笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const prefixes = ['tempcal-', 'focalloss-', 'ptinterp-', 'longformer-', 'deberta-',
    'dpopaper-', 'vpcflow-', 'tranad-', 'pefile-', 'vulberta-', 'unetpaper-'];
  const previousCards = initial.cards
    .filter((card) => card.id !== 'sshops-007' && !prefixes.some((prefix) => card.id.startsWith(prefix)))
    .map((card) => card.id === edited.id ? edited : card);
  const migrated = migrateStudyData({ ...initial, contentRevision: 157, cards: previousCards,
    progress: { [edited.id]: progress }, deletedCardIds: ['sshops-007'] });

  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'sshops-007'));
  for (const id of ['tempcal-003', 'focalloss-004', 'ptinterp-003', 'longformer-003', 'deberta-004',
    'dpopaper-005', 'vpcflow-003', 'tranad-002', 'pefile-002', 'vulberta-004', 'unetpaper-003']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
});

test('revision 157 adds computing cards while preserving study data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'gdbbase-006');
  assert.ok(original);
  const edited = { ...original, answer: '我的调试笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const prefixes = ['coreord-', 'awkops-', 'sedops-', 'sshops-', 'rsyncops-', 'pgjson-', 'redispersist-', 'vmcore-'];
  const previousCards = initial.cards
    .filter((card) => card.id !== 'gdbbase-007' && !prefixes.some((prefix) => card.id.startsWith(prefix)))
    .map((card) => card.id === edited.id ? edited : card);
  const migrated = migrateStudyData({ ...initial, contentRevision: 156, cards: previousCards,
    progress: { [edited.id]: progress }, deletedCardIds: ['gdbbase-007'] });

  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'gdbbase-007'));
  for (const id of ['coreord-002', 'awkops-003', 'sedops-003', 'sshops-006', 'rsyncops-001',
    'pgjson-009', 'redispersist-004', 'vmcore-003']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
});

test('revision 156 adds statistical, agent and security cards while preserving study data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'gdbbase-006');
  assert.ok(original);
  const edited = { ...original, answer: '我的 GDB 学习笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const prefixes = ['expwait-', 'wilcpair-', 'saycan-', 'dspypaper-', 'aflfast-', 'fairfuzz-', 'asimsoc-', 'affileval-'];
  const previousCards = initial.cards
    .filter((card) => card.id !== 'gdbbase-007' && !prefixes.some((prefix) => card.id.startsWith(prefix)))
    .map((card) => card.id === edited.id ? edited : card);
  const migrated = migrateStudyData({ ...initial, contentRevision: 155, cards: previousCards,
    progress: { [edited.id]: progress }, deletedCardIds: ['gdbbase-007'] });

  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'gdbbase-007'));
  for (const id of ['expwait-004', 'wilcpair-005', 'saycan-004', 'dspypaper-005',
    'aflfast-005', 'fairfuzz-004', 'asimsoc-006', 'affileval-004']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
});

test('revision 155 adds debugging and Python tooling cards while preserving study data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'curlhttp-005');
  assert.ok(original);
  const edited = { ...original, answer: '我的 curl 学习笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const prefixes = ['gdbbase-', 'pyarg-', 'pyprof-'];
  const previousCards = initial.cards
    .filter((card) => card.id !== 'curlhttp-006' && !prefixes.some((prefix) => card.id.startsWith(prefix)))
    .map((card) => card.id === edited.id ? edited : card);
  const migrated = migrateStudyData({ ...initial, contentRevision: 154, cards: previousCards,
    progress: { [edited.id]: progress }, deletedCardIds: ['curlhttp-006'] });

  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'curlhttp-006'));
  for (const id of ['gdbbase-006', 'pyarg-009', 'pyprof-009']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
});

test('revision 154 adds development and retrieval cards while preserving study data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'jqjson-008');
  assert.ok(original);
  const edited = { ...original, answer: '我的 jq 学习笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const prefixes = ['curlhttp-', 'composebase-', 'pypath-', 'lcsplit-'];
  const previousCards = initial.cards
    .filter((card) => card.id !== 'jqjson-009' && !prefixes.some((prefix) => card.id.startsWith(prefix)))
    .map((card) => card.id === edited.id ? edited : card);
  const migrated = migrateStudyData({ ...initial, contentRevision: 153, cards: previousCards,
    progress: { [edited.id]: progress }, deletedCardIds: ['jqjson-009'] });

  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'jqjson-009'));
  for (const id of ['curlhttp-005', 'composebase-006', 'pypath-007', 'lcsplit-005']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
});

test('revision 153 adds general computing cards while preserving study data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'grepops-004');
  assert.ok(original);
  const edited = { ...original, answer: '我的搜索命令笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const prefixes = ['jqjson-', 'httpneg-', 'pgwrite-', 'testdesign-', 'makebuild-', 'lisalg-'];
  const previousCards = initial.cards
    .filter((card) => card.id !== 'grepops-005' && !prefixes.some((prefix) => card.id.startsWith(prefix)))
    .map((card) => card.id === edited.id ? edited : card);
  const migrated = migrateStudyData({ ...initial, contentRevision: 152, cards: previousCards,
    progress: { [edited.id]: progress }, deletedCardIds: ['grepops-005'] });

  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'grepops-005'));
  for (const id of ['jqjson-008', 'httpneg-007', 'pgwrite-004', 'testdesign-005', 'makebuild-005', 'lisalg-006']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
});

test('revision 152 adds model, testing and investigation cards while preserving study data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'ragpaper-002');
  assert.ok(original);
  const edited = { ...original, answer: '我的 RAG 学习笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const prefixes = ['mvnscipy-', 'skrand-', 'albertpre-', 'spanbertpre-', 'llmlingua-',
    'dqnbase-', 'hypfuzz-', 'vqlinvest-', 'phishgpt-'];
  const previousCards = initial.cards
    .filter((card) => card.id !== 'ragpaper-004' && !prefixes.some((prefix) => card.id.startsWith(prefix)))
    .map((card) => card.id === edited.id ? edited : card);
  const migrated = migrateStudyData({ ...initial, contentRevision: 151, cards: previousCards,
    progress: { [edited.id]: progress }, deletedCardIds: ['ragpaper-004'] });

  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'ragpaper-004'));
  for (const id of ['mvnscipy-002', 'skrand-005', 'albertpre-005', 'spanbertpre-004', 'llmlingua-004',
    'dqnbase-005', 'hypfuzz-003', 'vqlinvest-005', 'phishgpt-002']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
});

test('revision 151 adds broad foundation and security cards while preserving study data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'skthresh-005');
  assert.ok(original);
  const edited = { ...original, answer: '我的阈值验证笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const prefixes = ['condexp-', 'ptconv-', 'ragpaper-', 'cic18-', 'treesit-', 'attacklayer-', 'zeekweird-', 'selrisk-'];
  const previousCards = initial.cards
    .filter((card) => card.id !== 'skthresh-006' && !prefixes.some((prefix) => card.id.startsWith(prefix)))
    .map((card) => card.id === edited.id ? edited : card);
  const migrated = migrateStudyData({ ...initial, contentRevision: 150, cards: previousCards,
    progress: { [edited.id]: progress }, deletedCardIds: ['skthresh-006'] });

  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'skthresh-006'));
  for (const id of ['condexp-007', 'ptconv-004', 'ragpaper-002', 'cic18-004', 'treesit-004',
    'attacklayer-006', 'zeekweird-004', 'selrisk-003']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
});

test('revision 150 adds reviewed AI and security cards while preserving study data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'grepops-004');
  assert.ok(original);
  const edited = { ...original, answer: '我的搜索命令笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const prefixes = ['skthresh-', 'robertapre-', 'sagepaper-', 'gotpaper-', 'hfpipegen-',
    'smoothq-', 'sanrun-', 'rrcfpaper-', 'yarapy-'];
  const previousCards = initial.cards
    .filter((card) => card.id !== 'grepops-005' && !prefixes.some((prefix) => card.id.startsWith(prefix)))
    .map((card) => card.id === edited.id ? edited : card);
  const migrated = migrateStudyData({ ...initial, contentRevision: 149, cards: previousCards,
    progress: { [edited.id]: progress }, deletedCardIds: ['grepops-005'] });

  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'grepops-005'));
  for (const id of ['skthresh-005', 'robertapre-002', 'sagepaper-003', 'gotpaper-002', 'hfpipegen-007',
    'smoothq-004', 'sanrun-007', 'rrcfpaper-005', 'yarapy-004']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
});

test('revision 149 adds general computing cards while preserving study data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'tcpbase-001');
  assert.ok(original);
  const edited = { ...original, answer: '我的网络学习笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const prefixes = ['grepops-', 'pktcap-', 'udpicmp-', 'dnsneg-', 'pgpage-', 'redisscan-'];
  const previousCards = initial.cards
    .filter((card) => card.id !== 'tcpbase-002' && !prefixes.some((prefix) => card.id.startsWith(prefix)))
    .map((card) => card.id === edited.id ? edited : card);
  const migrated = migrateStudyData({ ...initial, contentRevision: 148, cards: previousCards,
    progress: { [edited.id]: progress }, deletedCardIds: ['tcpbase-002'] });

  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'tcpbase-002'));
  for (const id of ['grepops-004', 'pktcap-003', 'udpicmp-004', 'dnsneg-004', 'pgpage-004', 'redisscan-004']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
});

test('revision 148 adds research and security cards while preserving existing study data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'lcselfq-006');
  assert.ok(original);
  const edited = { ...original, answer: '我的检索配置笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const prefixes = ['unigram-', 'memgpt-', 'tldsec-', 'llmseceval-', 'capec-', 'promql-'];
  const previousCards = initial.cards
    .filter((card) => card.id !== 'lcselfq-001' && !prefixes.some((prefix) => card.id.startsWith(prefix)))
    .map((card) => card.id === edited.id ? edited : card);
  const migrated = migrateStudyData({ ...initial, contentRevision: 147, cards: previousCards,
    progress: { [edited.id]: progress }, deletedCardIds: ['lcselfq-001'] });

  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'lcselfq-001'));
  for (const id of ['unigram-003', 'memgpt-007', 'tldsec-005', 'llmseceval-003', 'capec-005', 'promql-005']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
});

test('revision 147 adds foundation and security cards without losing prior study data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'natcs-006');
  assert.ok(original);
  const edited = { ...original, answer: '我的端口映射笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const prefixes = ['bootapi-', 'hfdata-', 'skcurve-', 'intgrad-', 'lcselfq-', 'suriflow-', 'fuzzdict-'];
  const previousCards = initial.cards
    .filter((card) => card.id !== 'natcs-001' && !prefixes.some((prefix) => card.id.startsWith(prefix)))
    .map((card) => card.id === edited.id ? edited : card);
  const migrated = migrateStudyData({ ...initial, contentRevision: 146, cards: previousCards,
    progress: { [edited.id]: progress }, deletedCardIds: ['natcs-001'] });

  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'natcs-001'));
  for (const id of ['bootapi-006', 'hfdata-003', 'skcurve-002', 'intgrad-004', 'lcselfq-006', 'suriflow-002', 'fuzzdict-004']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
});

test('revision 146 adds general computing cards and preserves existing study data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'tcpbase-001');
  assert.ok(original);
  const edited = { ...original, answer: '我的网络学习笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const prefixes = ['natcs-', 'httpproxy-', 'linuxtrace-', 'diskdiag-', 'monocs-', 'pgsubq-'];
  const previousCards = initial.cards
    .filter((card) => card.id !== 'tcpbase-002' && !prefixes.some((prefix) => card.id.startsWith(prefix)))
    .map((card) => card.id === edited.id ? edited : card);
  const migrated = migrateStudyData({ ...initial, contentRevision: 145, cards: previousCards,
    progress: { [edited.id]: progress }, deletedCardIds: ['tcpbase-002'] });

  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'tcpbase-002'));
  for (const id of ['natcs-006', 'httpproxy-003', 'linuxtrace-009', 'diskdiag-001', 'monocs-002', 'pgsubq-002']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
});

test('revision 145 adds foundation cards while preserving security study data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'purlsec-004');
  assert.ok(original);
  const edited = { ...original, answer: '我的软件包版本笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const prefixes = ['jsdist-', 'torchfunc-', 'coltrans-', 'crossrank-', 'gymapi-', 'whisperbase-'];
  const previousCards = initial.cards
    .filter((card) => card.id !== 'paeval-001' && !prefixes.some((prefix) => card.id.startsWith(prefix)))
    .map((card) => card.id === edited.id ? edited : card);
  const migrated = migrateStudyData({ ...initial, contentRevision: 144, cards: previousCards,
    progress: { [edited.id]: progress }, deletedCardIds: ['paeval-001'] });

  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'paeval-001'));
  for (const id of ['jsdist-003', 'torchfunc-008', 'coltrans-003', 'crossrank-006', 'gymapi-005', 'whisperbase-005']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
});

test('revision 144 adds security cards while preserving prior edits, deletions and progress', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'minteval-009');
  assert.ok(original);
  const edited = { ...original, answer: '我的多轮评测笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const prefixes = ['zeektls-', 'omniad-', 'fuzzcorp-', 'purlsec-', 'kustojoin-', 'paeval-'];
  const previousCards = initial.cards
    .filter((card) => card.id !== 'linevul-004' && !prefixes.some((prefix) => card.id.startsWith(prefix)))
    .map((card) => card.id === edited.id ? edited : card);
  const migrated = migrateStudyData({ ...initial, contentRevision: 143, cards: previousCards,
    progress: { [edited.id]: progress }, deletedCardIds: ['linevul-004'] });

  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'linevul-004'));
  for (const id of ['zeektls-006', 'omniad-006', 'fuzzcorp-001', 'purlsec-004', 'kustojoin-001', 'paeval-007']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
});

test('revision 143 adds research cards while preserving general computing study data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'subnetcalc-007');
  assert.ok(original);
  const edited = { ...original, answer: '我的点对点子网笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const prefixes = ['ptsdp-', 'electra-', 'codeact-', 'm3eval-', 'minteval-', 'phishpedia-', 'linevul-'];
  const previousCards = initial.cards
    .filter((card) => card.id !== 'testfund-001' && !prefixes.some((prefix) => card.id.startsWith(prefix)))
    .map((card) => card.id === edited.id ? edited : card);
  const migrated = migrateStudyData({ ...initial, contentRevision: 142, cards: previousCards,
    progress: { [edited.id]: progress }, deletedCardIds: ['testfund-001'] });

  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'testfund-001'));
  for (const id of ['ptsdp-002', 'electra-004', 'codeact-002', 'm3eval-001', 'minteval-009', 'phishpedia-006', 'linevul-009']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
});

test('revision 142 adds general computing cards without losing existing edits or progress', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'tcpbase-001');
  assert.ok(original);
  const edited = { ...original, answer: '我的 TCP 笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const newPrefixes = ['subnetcalc-', 'listalgo-', 'kmpbase-', 'pgagg-', 'testfund-'];
  const previousCards = initial.cards
    .filter((card) => card.id !== 'tcpbase-002' && !newPrefixes.some((prefix) => card.id.startsWith(prefix)))
    .map((card) => card.id === edited.id ? edited : card);
  const migrated = migrateStudyData({ ...initial, contentRevision: 141, cards: previousCards,
    progress: { [edited.id]: progress }, deletedCardIds: ['tcpbase-002'] });

  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'tcpbase-002'));
  for (const id of ['subnetcalc-007', 'listalgo-005', 'kmpbase-004', 'pgagg-007', 'testfund-009']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
});

test('revision 141 adds quantization, retrieval and evaluation cards while preserving study data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'ptsampler-011');
  assert.ok(original);
  const edited = { ...original, answer: '我的数据采样笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 140, cards: [edited],
    progress: { [edited.id]: progress }, deletedCardIds: ['ptsampler-001'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'ptsampler-001'));
  for (const id of ['llmquant-003', 'lcmulticomp-011', 'bfcl-008', 'livecode-006']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
});

test('revision 140 adds sampling, assessment and security cards while preserving study data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'findxargs-005');
  assert.ok(original);
  const edited = { ...original, answer: '我的目录搜索笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 139, cards: [edited],
    progress: { [edited.id]: progress }, deletedCardIds: ['findxargs-006'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'findxargs-006'));
  for (const id of ['ptsampler-011', 'skperm-008', 'surith-010', 'sancov-008', 'bandit-004']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
});

test('revision 139 adds general computing cards while preserving study data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'huggpt-005');
  assert.ok(original);
  const edited = { ...original, answer: '我的智能体学习笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 138, cards: [edited],
    progress: { [edited.id]: progress }, deletedCardIds: ['huggpt-001'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'huggpt-001'));
  for (const id of ['findxargs-005', 'dockbuild-003', 'pgplan-008', 'tcpretx-006', 'pysubproc-006']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
});

test('revision 138 adds agent and security-model cards while preserving study data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'cocoeval-008');
  assert.ok(original);
  const edited = { ...original, answer: '我的检测评估笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 137, cards: [edited],
    progress: { [edited.id]: progress }, deletedCardIds: ['cocoeval-009'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'cocoeval-009'));
  for (const id of ['huggpt-005', 'webshop-006', 'osworld-005', 'neurallog-008', 'avclass-009', 'bertscore-008']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
});

test('revision 137 adds evaluation and security cards while preserving study data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'linuxres-004');
  assert.ok(original);
  const edited = { ...original, answer: '我的系统监控笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 136, cards: [edited],
    progress: { [edited.id]: progress }, deletedCardIds: ['linuxres-006'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'linuxres-006'));
  for (const id of ['vllmapc-004', 'truthqa-008', 'cocoeval-008', 'openvex-006', 'sarif-007', 'aflpersist-001']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
});

test('revision 136 adds computing foundations while preserving study data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'linuxbase-001');
  assert.ok(original);
  const edited = { ...original, answer: '我的 Linux 学习笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 135, cards: [edited],
    progress: { [edited.id]: progress }, deletedCardIds: ['linuxbase-002'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'linuxbase-002'));
  for (const id of ['linuxres-004', 'dbnorm-008', 'complexity-003', 'dnsresolve-003', 'httpcache-005']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
});

test('revision 135 adds Python, calibration and monitoring cards while preserving study data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'lcparent-001');
  assert.ok(original);
  const edited = { ...original, answer: '我的检索笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 134, cards: [edited],
    progress: { [edited.id]: progress }, deletedCardIds: ['lcparent-002'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'lcparent-002'));
  for (const id of ['futurespy-001', 'calapi-001', 'torchloss-001', 'iot23-001', 'otelmetric-001']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
});

test('revision 134 adds retrieval, evaluation and detection cards while preserving study data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'cmembase-001');
  assert.ok(original);
  const edited = { ...original, answer: '我的内存管理笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 133, cards: [edited],
    progress: { [edited.id]: progress }, deletedCardIds: ['cmembase-002'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'cmembase-002'));
  for (const id of ['lcparent-001', 'dorafund-001', 'selfask-001', 'mcnemar-001', 'seqmetric-001', 'attackdet-001']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
});

test('revision 133 adds computer fundamentals while preserving study data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'tcpbase-007');
  assert.ok(original);
  const edited = { ...original, answer: '我的 TCP 笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 132, cards: [edited],
    progress: { [edited.id]: progress }, deletedCardIds: ['tcpbase-008'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'tcpbase-008'));
  for (const id of ['cmembase-001', 'httpstatus-001', 'archivecmd-001', 'bintree-001', 'pgcte-002']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
});

test('revision 132 adds evaluation and security cards while preserving study data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'nvdapi-001');
  assert.ok(original);
  const edited = { ...original, answer: '我的漏洞情报笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 131, cards: [edited],
    progress: { [edited.id]: progress }, deletedCardIds: ['nvdapi-003'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'nvdapi-003'));
  for (const id of ['falcobase-001', 'smotepractice-001', 'squad2-001', 'ephish-001', 'loggpt-003', 'megavul-002']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
});

test('revision 131 adds test, intelligence and speech cards while preserving study data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'ja4tls-001');
  assert.ok(original);
  const edited = { ...original, answer: '我的 TLS 指纹笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 130, cards: [edited],
    progress: { [edited.id]: progress }, deletedCardIds: ['ja4tls-002'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'ja4tls-002'));
  for (const id of ['pygroup-001', 'contingency-001', 'nvdapi-001', 'cflite-001', 'w2vpre-001']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
});

test('revision 130 adds clustering, evaluation and fingerprint cards while preserving study data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'sysservice-001');
  assert.ok(original);
  const edited = { ...original, answer: '我的服务管理笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 129, cards: [edited],
    progress: { [edited.id]: progress }, deletedCardIds: ['sysservice-003'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'sysservice-003'));
  for (const id of ['hdbscan-001', 'simpopref-002', 'gaiabench-001', 'visionweight-001', 'ja4tls-001']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
});

test('revision 129 adds general engineering cards while preserving study data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'webstream-001');
  assert.ok(original);
  const edited = { ...original, answer: '我的协议复习笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 128, cards: [edited],
    progress: { [edited.id]: progress }, deletedCardIds: ['webstream-002'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'webstream-002'));
  for (const id of ['githistory-001', 'sysservice-001', 'pytestbase-001']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
});

test('revision 128 adds streaming and AI cards while preserving study data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'k8sbase-001');
  assert.ok(original);
  const edited = { ...original, answer: '我的 Pod 复习笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 127, cards: [edited],
    progress: { [edited.id]: progress }, deletedCardIds: ['k8sbase-002'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'k8sbase-002'));
  for (const id of ['webstream-001', 'ptsave-001', 'codet5-001', 'adalora-001', 'mctsbase-001', 'assocanom-001']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
});

test('revision 127 adds systems and research cards while retaining existing study data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'ethvlan-001');
  assert.ok(original);
  const edited = { ...original, answer: '我的交换网络笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 126, cards: [edited],
    progress: { [edited.id]: progress }, deletedCardIds: ['ethvlan-002'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'ethvlan-002'));
  for (const id of ['k8sbase-001', 'linuxperm-002', 'maevision-001', 'diversevul-001', 'stencode-001']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
});

test('revision 126 adds general computer and AI cards while retaining study data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'corrstat-001');
  assert.ok(original);
  const edited = { ...original, answer: '我的相关系数笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 125, cards: [edited],
    progress: { [edited.id]: progress }, deletedCardIds: ['corrstat-002'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'corrstat-002'));
  for (const id of ['ethvlan-001', 'mmapbase-001', 'bstbase-001', 'ropebase-001', 'rmsgate-001', 'pathsec-001', 'humaneval-001', 'htnbase-001']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
});

test('revision 125 adds new cards and preserves edits, progress and deletions', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'sktext-001');
  assert.ok(original);
  const edited = { ...original, answer: '我的词袋复习笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 124, cards: [edited],
    progress: { [edited.id]: progress }, deletedCardIds: ['sktext-002'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'sktext-002'));
  for (const id of ['corrstat-001', 'distshift-001', 'embedbag-001', 'yarape-001', 'ocrpractice-001', 'selfrefine-002']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
});

test('revision 124 adds text and security cards while preserving study data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'mysqlidx-001');
  assert.ok(original);
  const edited = { ...original, answer: '我的索引复习笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 123, cards: [edited],
    progress: { [edited.id]: progress }, deletedCardIds: ['mysqlidx-002'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'mysqlidx-002'));
  for (const id of ['sktext-001', 'trailsec-001', 'kerbaudit-001', 'guardsec-001', 'splunkops-001', 'planmodel-001']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
});

test('revision 123 adds general computer cards and preserves edits, progress and deletions', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'distillbert-001');
  assert.ok(original);
  const edited = { ...original, answer: '我的复习笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 122, cards: [edited],
    progress: { [edited.id]: progress }, deletedCardIds: ['distillbert-003'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'distillbert-003'));
  for (const id of ['mysqlidx-001', 'mysqltx-001', 'textcli-001', 'overload-001']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
});

test('revision 122 adds new sources without losing study data or deleted cards', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'fdrstudy-001');
  assert.ok(original);
  const edited = { ...original, answer: '我自己的统计笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 121, cards: [edited],
    progress: { [edited.id]: progress }, deletedCardIds: ['fdrstudy-002'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'fdrstudy-002'));
  for (const id of ['distillbert-001', 'sweaci-001', 'agentbench-001', 'autogenbase-002', 'hydecore-001', 'syzbase-001', 'kcovbase-001', 'otelbase-001', 'binomeval-001']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
});

test('revision 121 adds statistics and security cards without losing edits, progress or deletions', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'bloomcs-001');
  assert.ok(original);
  const edited = { ...original, answer: '我自己的布隆过滤器笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const previous = { ...initial, contentRevision: 120, cards: [edited],
    progress: { [edited.id]: progress }, deletedCardIds: ['bloomcs-002'] };
  const migrated = migrateStudyData(previous);
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'bloomcs-002'));
  for (const id of ['fdrstudy-001', 'eqlsec-001', 'nbaiot-001', 'ecodstudy-001', 'scot-001', 'leastmost-001', 'fuzzall-001', 'unicorn-001']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
});

test('revision 120 adds computer systems cards while preserving personal study data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'tcpbase-001');
  assert.ok(original);
  const edited = { ...original, answer: '我的 TCP 学习笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const previous = { ...initial, contentRevision: 119, cards: [edited],
    progress: { [edited.id]: progress }, deletedCardIds: ['tcpbase-002'] };
  const migrated = migrateStudyData(previous);
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'tcpbase-002'));
  for (const id of ['ngxlb-001', 'appcache-001', 'bloomcs-001', 'chashcs-001']) {
    assert.equal(migrated.cards.find((card) => card.id === id)?.knowledgeArea, '19', id);
  }
});

test('revision 119 refines the duplicate HNSW question without losing user data', () => {
  const initial = createInitialData();
  const previous = retiredV118.cards.find((card) => card.id === 'faissdeep-002') as StudyCard;
  assert.ok(previous);
  const extra = { id: 'personal-hnsw', title: '我的资料', url: 'https://example.com/hnsw',
    type: '个人资料', evidence: 'application' as const, sourceCardId: previous.id };
  const saved = { ...previous, sources: [...(previous.sources ?? []), extra] };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const legacy = { ...initial, contentRevision: 118, cards: [saved],
    progress: { [previous.id]: progress }, deletedCardIds: ['fpnstudy-002'] };
  const migrated = migrateStudyData(legacy);
  const current = migrated.cards.find((card) => card.id === previous.id);
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(current?.question, 'Faiss HNSW 的 efConstruction 参数主要控制什么？');
  assert.deepEqual(migrated.progress[previous.id], progress);
  assert.ok(current?.sources?.some((source) => source.id === extra.id));
  assert.ok(migrated.archivedBundledCards?.some((card) => card.id === previous.id && card.question === previous.question));
  assert.ok(!migrated.cards.some((card) => card.id === 'fpnstudy-002'));
  assert.ok(migrated.cards.some((card) => card.id === 'betabayes-001'));
  const edited = { ...saved, answer: '我自己整理的检索笔记。' };
  const kept = migrateStudyData({ ...legacy, cards: [edited] });
  assert.equal(kept.cards.find((card) => card.id === previous.id)?.answer, edited.answer);
});

test('revision 118 adds model and security data sources without losing personal study data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'httpver-001');
  assert.ok(original);
  const edited = { ...original, answer: '我的 HTTP 笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 117, cards: [edited],
    progress: { [edited.id]: progress }, deletedCardIds: ['hnswstudy-002'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'hnswstudy-002'));
  for (const [id, area, topic] of [
    ['gqastudy-001', '05', 'nlp-transformer'],
    ['moeswitch-001', '06', 'llm-training'],
    ['hnswstudy-001', '07', 'rag-basics'],
    ['lrsched-001', '04', 'deep-learning'],
    ['ocsfbase-001', '10', 'security-telemetry'],
    ['cvefmt-001', '15', 'threat-intelligence'],
    ['segbase-002', '18', 'computer-vision'],
    ['semflow-001', '13', 'code-vulnerability'],
  ]) {
    const card = migrated.cards.find((item) => item.id === id);
    assert.equal(card?.knowledgeArea, area, id);
    assert.equal(card?.topic, topic, id);
    assert.ok(card?.sources?.[0]?.url, id);
  }
});

test('revision 117 adds common computer and agent cards while preserving progress and deletions', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'tcpbase-001');
  assert.ok(original);
  const edited = { ...original, answer: '我的 TCP 笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 116, cards: [edited],
    progress: { [edited.id]: progress }, deletedCardIds: ['sqlwin-002'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'sqlwin-002'));
  for (const [id, area, topic] of [
    ['httpver-001', '19', 'computer-network'],
    ['cpucache-001', '19', 'computer-architecture'],
    ['sqlwin-001', '19', 'database-fundamentals'],
    ['tries-001', '19', 'data-structures'],
    ['reprbase-001', '19', 'computer-architecture'],
    ['taubench-006', '09', 'agent-engineering'],
    ['svdd-001', '11', 'anomaly-detection'],
  ]) {
    const card = migrated.cards.find((item) => item.id === id);
    assert.equal(card?.knowledgeArea, area, id);
    assert.equal(card?.topic, topic, id);
    assert.ok(card?.sources?.[0]?.url, id);
  }
});

test('revision 116 adds threat sources and incident analysis while preserving study data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'pgbase-001');
  assert.ok(original);
  const edited = { ...original, answer: '我的策略梯度笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 115, cards: [edited],
    progress: { [edited.id]: progress }, deletedCardIds: ['lorause-001'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  for (const [id, topic, area] of [
    ['urlfeed-001', 'threat-intelligence', '15'],
    ['phishfeed-001', 'phishing-detection', '12'],
    ['mbfeed-001', 'malware-analysis', '12'],
    ['toniot-001', 'security-telemetry', '10'],
    ['trancoeval-001', 'data-evaluation', '17'],
    ['nistir-003', 'security-operations', '16'],
  ]) {
    const card = migrated.cards.find((item) => item.id === id);
    assert.equal(card?.topic, topic, id);
    assert.equal(card?.knowledgeArea, area, id);
    assert.ok(card?.sources?.[0]?.url, id);
  }
  assert.ok(!migrated.cards.some((card) => card.id === 'lorause-001'));
});

test('revision 115 adds RL, Bayesian and security research cards without losing study data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'weborigin-001');
  assert.ok(original);
  const edited = { ...original, answer: '我的同源策略笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 114, cards: [edited],
    progress: { [edited.id]: progress }, deletedCardIds: ['lorause-001'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  for (const [id, topic, area] of [
    ['pgbase-001', 'reinforcement-learning', '18'],
    ['ppoclip-001', 'reinforcement-learning', '18'],
    ['instructrl-001', 'llm-training', '06'],
    ['bayesup-001', 'math-statistics', '01'],
    ['botiot-001', 'security-telemetry', '10'],
    ['fbench-001', 'fuzzing', '14'],
  ]) {
    const card = migrated.cards.find((item) => item.id === id);
    assert.equal(card?.topic, topic, id);
    assert.equal(card?.knowledgeArea, area, id);
    assert.ok(card?.sources?.[0]?.url, id);
  }
  assert.ok(!migrated.cards.some((card) => card.id === 'lorause-001'));
});

test('revision 114 adds browser, database and IPv6 cards without losing study data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'dockbase-001');
  assert.ok(original);
  const edited = { ...original, answer: '我的容器笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 113, cards: [edited],
    progress: { [edited.id]: progress }, deletedCardIds: ['lorause-001'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  for (const [id, topic] of [
    ['weborigin-001', 'computer-network'],
    ['pgconstr-001', 'database-fundamentals'],
    ['ipv6net-001', 'computer-network'],
  ]) {
    const card = migrated.cards.find((item) => item.id === id);
    assert.equal(card?.topic, topic, id);
    assert.equal(card?.knowledgeArea, '19', id);
    assert.ok(card?.sources?.[0]?.url, id);
  }
  assert.ok(!migrated.cards.some((card) => card.id === 'lorause-001'));
});

test('revision 113 adds computer fundamentals while preserving edits and progress', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'sockbase-001');
  assert.ok(original);
  const edited = { ...original, answer: '我的套接字笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 112, cards: [edited],
    progress: { [edited.id]: progress }, deletedCardIds: ['lorause-001'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  for (const [id, topic] of [
    ['ipcbase-001', 'operating-systems'],
    ['epollbase-001', 'operating-systems'],
    ['graphalg-001', 'data-structures'],
    ['dockbase-001', 'containers'],
  ]) {
    const card = migrated.cards.find((item) => item.id === id);
    assert.equal(card?.topic, topic, id);
    assert.equal(card?.knowledgeArea, '19', id);
    assert.ok(card?.sources?.[0]?.url, id);
  }
  assert.ok(!migrated.cards.some((card) => card.id === 'lorause-001'));
});

test('revision 112 adds autoencoders, position methods and tokenization without losing study data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'ptnorm-001');
  assert.ok(original);
  const edited = { ...original, answer: '我的归一化学习笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 111, cards: [edited],
    progress: { [edited.id]: progress }, deletedCardIds: ['lorause-001'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  for (const [id, topic, area] of [
    ['aebase-001', 'deep-learning', '04'],
    ['aedetect-001', 'anomaly-detection', '11'],
    ['alibibase-001', 'nlp-transformer', '05'],
    ['txlbase-001', 'llm-training', '06'],
    ['tokenc-001', 'nlp-transformer', '05'],
  ]) {
    const card = migrated.cards.find((item) => item.id === id);
    assert.equal(card?.topic, topic, id);
    assert.equal(card?.knowledgeArea, area, id);
    assert.ok(card?.sources?.[0]?.url, id);
  }
  assert.ok(!migrated.cards.some((card) => card.id === 'lorause-001'));
});

test('revision 111 adds normalization, incremental learning, retrieval and code security cards', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'algdesign-001');
  assert.ok(original);
  const edited = { ...original, answer: '我的算法学习笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 110, cards: [edited],
    progress: { [edited.id]: progress }, deletedCardIds: ['lorause-001'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  for (const [id, topic, area] of [
    ['ptnorm-001', 'deep-learning', '04'],
    ['sgdinc-001', 'ml-basics', '03'],
    ['codepre-001', 'code-vulnerability', '13'],
    ['dprbase-001', 'rag-basics', '07'],
    ['cvefix-001', 'code-vulnerability', '13'],
  ]) {
    const card = migrated.cards.find((item) => item.id === id);
    assert.equal(card?.topic, topic, id);
    assert.equal(card?.knowledgeArea, area, id);
    assert.ok(card?.sources?.[0]?.url, id);
  }
  assert.ok(!migrated.cards.some((card) => card.id === 'lorause-001'));
});

test('revision 110 adds algorithms and socket fundamentals while preserving study data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'procsg-001');
  assert.ok(original);
  const edited = { ...original, answer: '我的 Linux 学习笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 109, cards: [edited],
    progress: { [edited.id]: progress }, deletedCardIds: ['lorause-001'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  for (const [id, topic] of [['algdesign-001', 'data-structures'], ['sockbase-001', 'computer-network']]) {
    const card = migrated.cards.find((item) => item.id === id);
    assert.equal(card?.topic, topic, id);
    assert.equal(card?.knowledgeArea, '19', id);
    assert.ok(card?.sources?.[0]?.url, id);
  }
  assert.ok(!migrated.cards.some((card) => card.id === 'lorause-001'));
});

test('revision 109 adds process, Python, log and agent cards while preserving study data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'linuxbase-031');
  assert.ok(original);
  const edited = { ...original, answer: '我的信号学习笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 108, cards: [edited],
    progress: { [edited.id]: progress }, deletedCardIds: ['lorause-001'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  for (const [id, topic, area] of [
    ['procsg-001', 'linux-systems', '19'],
    ['pyimport-001', 'python-data', '02'],
    ['kqlbase-001', 'security-operations', '16'],
    ['loganom-001', 'anomaly-detection', '11'],
    ['toolbench-001', 'agent-design', '08'],
  ]) {
    const card = migrated.cards.find((item) => item.id === id);
    assert.equal(card?.topic, topic, id);
    assert.equal(card?.knowledgeArea, area, id);
    assert.ok(card?.sources?.[0]?.url, id);
  }
  assert.ok(!migrated.cards.some((card) => card.id === 'lorause-001'));
});

test('revision 108 adds retrieval, agent, fuzzing and computer foundation cards without losing user data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'raftbase-001');
  assert.ok(original);
  const edited = { ...original, answer: '我的分布式系统笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 107, cards: [edited],
    progress: { [edited.id]: progress }, deletedCardIds: ['lorause-001'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  for (const id of ['markovbase-001', 'pipebase-001', 'swebase-001', 'dlfuzz-001', 'colbert2-001']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
  assert.ok(!migrated.cards.some((card) => card.id === 'lorause-001'));
});

test('revision 107 adds consensus, language and security study cards while retaining user data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'rediscache-001');
  assert.ok(original);
  const edited = { ...original, answer: '我的缓存学习笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 106, cards: [edited],
    progress: { [edited.id]: progress }, deletedCardIds: ['lorause-001'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  for (const id of ['raftbase-001', 'crfbase-001', 'genconfig-001', 'socfield-001', 'socbench-001']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
  assert.ok(!migrated.cards.some((card) => card.id === 'lorause-001'));
});

test('revision 106 adds caching, messaging and build cards while retaining study data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'netcmd-001');
  assert.ok(original);
  const edited = { ...original, answer: '我的网络排查笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 105, cards: [edited],
    progress: { [edited.id]: progress }, deletedCardIds: ['lorause-001'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  for (const id of ['rediscache-001', 'kafkabase-001', 'buildbase-001']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
  assert.ok(!migrated.cards.some((card) => card.id === 'lorause-001'));
});

test('revision 105 adds malware, vulnerability, agent and network cards while retaining study data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'linuxbase-032');
  assert.ok(original);
  const edited = { ...original, answer: '我的网络排查笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 104, cards: [edited],
    progress: { [edited.id]: progress }, deletedCardIds: ['lorause-001'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  for (const id of ['drebin-001', 'linevd-001', 'llmcomp-001', 'tsabase-001', 'netcmd-001']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
  assert.ok(!migrated.cards.some((card) => card.id === 'lorause-001'));
});

test('revision 104 adds database, regex, retrieval and OSV cards while retaining study data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'dbbase-018');
  assert.ok(original);
  const edited = { ...original, answer: '我的数据库学习笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 103, cards: [edited],
    progress: { [edited.id]: progress }, deletedCardIds: ['lorause-001'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  for (const id of ['pglocks-001', 'pyregex-001', 'eslex-001', 'osvfmt-001']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
  assert.ok(!migrated.cards.some((card) => card.id === 'lorause-001'));
});

test('revision 103 adds filesystem, TLS, CVSS and drift cards while retaining study data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'tcpbase-007');
  assert.ok(original);
  const edited = { ...original, answer: '我的网络学习笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 102, cards: [edited],
    progress: { [edited.id]: progress }, deletedCardIds: ['lorause-001'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  for (const id of ['fsintern-001', 'tlsbase-001', 'cvss4-001', 'driftkit-001']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
  assert.ok(!migrated.cards.some((card) => card.id === 'lorause-001'));
});

test('revision 102 adds SQL, shell and sorting cards while retaining study data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'dbbase-018');
  assert.ok(original);
  const edited = { ...original, answer: '我的连接查询笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 101, cards: [edited],
    progress: { [edited.id]: progress }, deletedCardIds: ['lorause-001'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  for (const id of ['sortalg-001', 'sqlquery-001', 'bashcore-001']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
  assert.ok(!migrated.cards.some((card) => card.id === 'lorause-001'));
});

test('revision 101 adds MISP, active learning and image preprocessing while retaining study data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'weaklabel-001');
  assert.ok(original);
  const edited = { ...original, answer: '我的弱监督笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 100, cards: [edited],
    progress: { [edited.id]: progress }, deletedCardIds: ['lorause-001'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  for (const id of ['mispfmt-001', 'activelearn-001', 'visprep-001']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
  assert.ok(!migrated.cards.some((card) => card.id === 'lorause-001'));
});

test('revision 100 adds scheduling, weak supervision, log parsing and explanations without losing study data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'gitbase-003');
  assert.ok(original);
  const edited = { ...original, answer: '我的 Git 学习笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 99, cards: [edited],
    progress: { [edited.id]: progress }, deletedCardIds: ['lorause-001'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  for (const id of ['cpusched-001', 'weaklabel-001', 'drainlog-002', 'xaimodel-001']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
  assert.ok(!migrated.cards.some((card) => card.id === 'lorause-001'));
});

test('revision 99 adds Git, IP routing and memory cards while retaining study data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'httpbase-001');
  assert.ok(original);
  const edited = { ...original, answer: '我的 HTTP 笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 98, cards: [edited],
    progress: { [edited.id]: progress }, deletedCardIds: ['lorause-001'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  for (const id of ['gitbase-001', 'ipbase-001', 'vmpolicy-001']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
  assert.ok(!migrated.cards.some((card) => card.id === 'lorause-001'));
});

test('revision 98 adds computer and model foundations while retaining study data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'tcpbase-001');
  assert.ok(original);
  const edited = { ...original, answer: '我的网络笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 97, cards: [edited],
    progress: { [edited.id]: progress }, deletedCardIds: ['lorause-001'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  for (const id of ['archbase-001', 'oscon-001', 'filefd-001', 'httpbase-001', 'specdec-001', 'oneclass-002']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
  assert.ok(!migrated.cards.some((card) => card.id === 'lorause-001'));
});

test('revision 97 adds general computer foundations and research cards while retaining study data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'pysyntax-001');
  assert.ok(original);
  const edited = { ...original, answer: '我的学习笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 96, cards: [edited],
    progress: { [edited.id]: progress }, deletedCardIds: ['lorause-001'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  for (const id of ['tcpbase-001', 'linuxbase-001', 'osbase-001', 'dbbase-001', 'dsbase-001',
    'juliet-001', 'devignstudy-001', 'vuldeep-001', 'splade-001', 'reflex-001']) {
    assert.ok(migrated.cards.some((card) => card.id === id), id);
  }
  assert.ok(!migrated.cards.some((card) => card.id === 'lorause-001'));
});

test('revision 96 adds Python, regression metrics and Atheris cards while preserving study data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'pysyntax-001');
  assert.ok(original);
  const edited = { ...original, answer: '我的 Python 语法笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 95, cards: [edited],
    progress: { [edited.id]: progress }, deletedCardIds: ['lorause-001'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  for (const id of ['pyobject-001', 'skreg-001', 'atheris-001']) {
    assert.ok(migrated.cards.some((card) => card.id === id));
  }
  assert.ok(!migrated.cards.some((card) => card.id === 'lorause-001'));
});

test('revision 95 adds linear algebra, checkpointing, FlashAttention and GNN cards without losing study data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'math-001');
  assert.ok(original);
  const edited = { ...original, answer: '我的线性代数笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 94, cards: [edited],
    progress: { [edited.id]: progress }, deletedCardIds: ['lorause-001'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  for (const id of ['linproj-001', 'ptcheck-001', 'flashalg-001', 'gnnmodels-001']) {
    assert.ok(migrated.cards.some((card) => card.id === id));
  }
  assert.ok(!migrated.cards.some((card) => card.id === 'lorause-001'));
});

test('revision 94 adds naive Bayes, sequence labeling and host threat cards while preserving study data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'nlpseq-003');
  assert.ok(original);
  const edited = { ...original, answer: '我的序列标注笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 93, cards: [edited],
    progress: { [edited.id]: progress }, deletedCardIds: ['lorause-001'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  for (const id of ['nbayes-001', 'ner-001', 'hmm-002', 'hostthreat-001']) {
    assert.ok(migrated.cards.some((card) => card.id === id));
  }
  assert.ok(!migrated.cards.some((card) => card.id === 'lorause-001'));
});

test('revision 93 adds asyncio, LangChain parsing and NAB cards while preserving study data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'pysyntax-001');
  assert.ok(original);
  const edited = { ...original, answer: '我的 Python 语法笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 92, cards: [edited],
    progress: { [edited.id]: progress }, deletedCardIds: ['lorause-001'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  for (const id of ['pyasync-001', 'lcparse-001', 'nab-001']) {
    assert.ok(migrated.cards.some((card) => card.id === id));
  }
  assert.ok(!migrated.cards.some((card) => card.id === 'lorause-001'));
});

test('revision 92 adds reinforcement learning, Faiss and security dataset cards while preserving study data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'rl-001');
  assert.ok(original);
  const edited = { ...original, answer: '我的强化学习笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 91, cards: [edited],
    progress: { [edited.id]: progress }, deletedCardIds: ['lorause-001'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  for (const id of ['rlmethod-001', 'faissapi-001', 'ctu13-001', 'lanlset-001']) {
    assert.ok(migrated.cards.some((card) => card.id === id));
  }
  assert.ok(!migrated.cards.some((card) => card.id === 'lorause-001'));
});

test('revision 91 adds phishing, fuzzing and threat-intelligence cards without losing study data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'visphish-001');
  assert.ok(original);
  const edited = { ...original, answer: '我的钓鱼分析笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 90, cards: [edited],
    progress: { [edited.id]: progress }, deletedCardIds: ['lorause-001'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  for (const id of ['phishmm-001', 'neuzz-001', 'diamond-001']) {
    assert.ok(migrated.cards.some((card) => card.id === id));
  }
  assert.ok(!migrated.cards.some((card) => card.id === 'lorause-001'));
});

test('revision 90 adds malware research and KEV cards while preserving study data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'ember-001');
  assert.ok(original);
  const edited = { ...original, answer: '我的恶意软件研究笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 89, cards: [edited],
    progress: { [edited.id]: progress }, deletedCardIds: ['lorause-001'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  for (const id of ['malbench-001', 'sandbox-001', 'conformal-001', 'kevdata-001']) {
    assert.ok(migrated.cards.some((card) => card.id === id));
  }
  assert.ok(!migrated.cards.some((card) => card.id === 'lorause-001'));
});

test('revision 89 adds search and security research without losing personal study data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'agents-001');
  assert.ok(original);
  const edited = { ...original, answer: '我的 Agent 规划笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 88, cards: [edited],
    progress: { [edited.id]: progress }, deletedCardIds: ['lorause-001'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  for (const id of ['agentplan-001', 'deepcase-001', 'identitydetect-001']) {
    assert.ok(migrated.cards.some((card) => card.id === id));
  }
  assert.ok(!migrated.cards.some((card) => card.id === 'lorause-001'));
});

test('revision 88 adds language evaluation and vision foundations while preserving study data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'lcbase-001');
  assert.ok(original);
  const edited = { ...original, answer: '我的 LangChain 学习笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 87, cards: [edited],
    progress: { [edited.id]: progress }, deletedCardIds: ['lorause-001'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(migrated.cards.some((card) => card.id === 'nlpeval-001'));
  assert.ok(migrated.cards.some((card) => card.id === 'clipvit-001'));
  assert.ok(!migrated.cards.some((card) => card.id === 'lorause-001'));
});

test('revision 87 adds graph and EPSS cards while preserving edits and progress', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'math-001');
  assert.ok(original);
  const edited = { ...original, answer: '我的数学学习笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 86, cards: [edited],
    progress: { [edited.id]: progress }, deletedCardIds: ['vulnintel-003'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(migrated.cards.some((card) => card.id === 'graphmath-001'));
  assert.ok(migrated.cards.some((card) => card.id === 'epssuse-016'));
  assert.ok(!migrated.cards.some((card) => card.id === 'vulnintel-003'));
});

test('revision 86 adds fuzzing and model-shift cards without losing learning data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'fuzz-002');
  assert.ok(original);
  const edited = { ...original, answer: '我的模糊测试笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 85, cards: [edited],
    progress: { [edited.id]: progress }, deletedCardIds: ['lfuzz-003'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(migrated.cards.some((card) => card.id === 'magmaeval-004'));
  assert.ok(migrated.cards.some((card) => card.id === 'shiftsec-001'));
  assert.ok(!migrated.cards.some((card) => card.id === 'lfuzz-003'));
});

test('revision 85 adds agent and operations cards while preserving personal learning data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'agents-001');
  assert.ok(original);
  const edited = { ...original, answer: '我的智能体学习笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 84, cards: [edited],
    progress: { [edited.id]: progress }, deletedCardIds: ['incident-001'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(migrated.cards.some((card) => card.id === 'obsagent-012'));
  assert.ok(migrated.cards.some((card) => card.id === 'sentinelops-016'));
  assert.ok(!migrated.cards.some((card) => card.id === 'incident-001'));
});

test('revision 84 adds LangChain and LoRA cards while preserving study data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'lcbase-001');
  assert.ok(original);
  const edited = { ...original, answer: '我的 LangChain 学习笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 83, cards: [edited],
    progress: { [edited.id]: progress }, deletedCardIds: ['lorause-001'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(migrated.cards.some((card) => card.id === 'lcstream-001'));
  assert.ok(migrated.cards.some((card) => card.id === 'loradetail-001'));
  assert.ok(!migrated.cards.some((card) => card.id === 'lorause-001'));
});

test('revision 83 splits vulnerability cards while adding new targets and preserving personal sources', () => {
  const initial = createInitialData();
  const old = retiredV83.cards as StudyCard[];
  const targetIds = ['code-012', 'llmv-007', 'cflow-008', 'prime-010'];
  const targets = initial.cards.filter((card) => targetIds.includes(card.id));
  assert.equal(targets.length, targetIds.length);
  const progress = scheduleCard(undefined, 'good', Date.now());
  const first = old.find((card) => card.id === 'ai4sec-023');
  assert.ok(first);
  const personalSource = { id: 'personal-audit-note', title: '个人资料', url: 'https://example.com/audit',
    type: '个人资料', evidence: 'application' as const, sourceCardId: first.id };
  const annotated = { ...first, sources: [...(first.sources ?? []), personalSource] };
  const previous = { ...initial, contentRevision: 82,
    cards: [...targets, annotated, ...old.filter((card) => card.id !== first.id)],
    progress: Object.fromEntries(old.map((card) => [card.id, progress])) };
  const migrated = migrateStudyData(previous);
  assert.equal(migrated.contentRevision, initial.contentRevision);
  for (const card of old) {
    assert.ok(!migrated.cards.some((item) => item.id === card.id));
    assert.ok(migrated.archivedBundledCards?.some((item) => item.id === card.id));
    assert.deepEqual(migrated.progress[card.id], progress);
  }
  for (const id of ['code-012', 'llmv-007', 'llmvstudy-017']) {
    assert.ok(migrated.cards.find((card) => card.id === id)?.sources?.some((source) => source.id === personalSource.id));
  }
  assert.ok(migrated.cards.some((card) => card.id === 'llmvstudy-019'));
  assert.ok(migrated.cards.some((card) => card.id === 'llmvstudy-020'));
  const edited = { ...annotated, answer: '我自己的漏洞评估笔记。' };
  const preserved = migrateStudyData({ ...previous, cards: [...targets, edited] });
  assert.equal(preserved.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  const missing = migrateStudyData({ ...previous, deletedCardIds: ['llmvstudy-017'] });
  assert.ok(missing.cards.some((card) => card.id === first.id));
  assert.ok(!missing.cards.some((card) => card.id === 'llmvstudy-017'));
});

test('revision 83 adds vulnerability reasoning cards without losing study data', () => {
  const initial = createInitialData();
  const old = initial.cards.find((card) => card.id === 'llmv-007');
  assert.ok(old);
  const edited = { ...old, answer: '我的漏洞审计笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 82, cards: [edited],
    progress: { [old.id]: progress }, deletedCardIds: ['llmvstudy-002'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === old.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[old.id], progress);
  assert.ok(migrated.cards.some((card) => card.id === 'llmvstudy-001'));
  assert.ok(!migrated.cards.some((card) => card.id === 'llmvstudy-002'));
});

test('revision 82 archives composite interview cards only when all targets remain available', () => {
  const initial = createInitialData();
  const old = retiredV82.cards as StudyCard[];
  const targetIds = ['copilot-001', 'code-012', 'ai4sec-033', 'rag-001', 'copilot-008', 'ai4sec-040'];
  const targets = initial.cards.filter((card) => targetIds.includes(card.id));
  assert.equal(targets.length, targetIds.length);
  const progress = scheduleCard(undefined, 'good', Date.now());
  const personalSource = { id: 'personal-interview-note', title: '个人资料', url: 'https://example.com/notes',
    type: '个人资料', evidence: 'application' as const, sourceCardId: 'interview-001' };
  const first = old.find((card) => card.id === 'interview-001');
  assert.ok(first);
  const annotated = { ...first, sources: [...(first.sources ?? []), personalSource] };
  const previous = { ...initial, contentRevision: 81,
    cards: [...targets, annotated, ...old.filter((card) => card.id !== first.id)],
    progress: Object.fromEntries(old.map((card) => [card.id, progress])) };
  const migrated = migrateStudyData(previous);
  assert.equal(migrated.contentRevision, initial.contentRevision);
  for (const card of old) {
    assert.ok(!migrated.cards.some((item) => item.id === card.id));
    assert.ok(migrated.archivedBundledCards?.some((item) => item.id === card.id));
    assert.deepEqual(migrated.progress[card.id], progress);
  }
  for (const id of ['copilot-001', 'code-012', 'ai4sec-033']) {
    assert.ok(migrated.cards.find((card) => card.id === id)?.sources?.some((source) => source.id === personalSource.id));
  }
  const edited = { ...annotated, answer: '我自己的面试复习笔记。' };
  const preserved = migrateStudyData({ ...previous, cards: [...targets, edited] });
  assert.equal(preserved.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  const missing = migrateStudyData({ ...previous,
    cards: [annotated, ...targets.filter((card) => card.id !== 'code-012')], deletedCardIds: ['code-012'] });
  assert.ok(missing.cards.some((card) => card.id === annotated.id));
  assert.ok(!missing.cards.some((card) => card.id === 'code-012'));
});

test('revision 81 adds feature-selection cards and preserves edits, progress and deletions', () => {
  const initial = createInitialData();
  const old = initial.cards.find((card) => card.id === 'skapi-017');
  assert.ok(old);
  const edited = { ...old, answer: '我的特征处理笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 80, cards: [edited],
    progress: { [old.id]: progress }, deletedCardIds: ['skselect-002'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === old.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[old.id], progress);
  assert.ok(migrated.cards.some((card) => card.id === 'skselect-001'));
  assert.ok(!migrated.cards.some((card) => card.id === 'skselect-002'));
});

test('revision 80 adds Python type and dataclass cards without losing user data', () => {
  const initial = createInitialData();
  const old = initial.cards.find((card) => card.id === 'pysyntax-019');
  assert.ok(old);
  const edited = { ...old, answer: '我的 Python 注解笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 79, cards: [edited],
    progress: { [old.id]: progress }, deletedCardIds: ['pytypes-002'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === old.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[old.id], progress);
  assert.ok(migrated.cards.some((card) => card.id === 'pytypes-001'));
  assert.ok(!migrated.cards.some((card) => card.id === 'pytypes-002'));
});

test('revision 79 adds temporal evaluation cards without losing edits, progress or deletions', () => {
  const initial = createInitialData();
  const old = initial.cards.find((card) => card.id === 'lcpractice-001');
  assert.ok(old);
  const edited = { ...old, answer: '我的工具调用笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 78, cards: [edited],
    progress: { [old.id]: progress }, deletedCardIds: ['tessdetail-002'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === old.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[old.id], progress);
  assert.ok(migrated.cards.some((card) => card.id === 'tessdetail-001'));
  assert.ok(!migrated.cards.some((card) => card.id === 'tessdetail-002'));
});

test('revision 78 adds LangChain cards without losing edits, progress or deletions', () => {
  const initial = createInitialData();
  const old = initial.cards.find((card) => card.id === 'lcbase-001');
  assert.ok(old);
  const edited = { ...old, answer: '我的 LangChain 学习笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const personal: StudyCard = { id: 'personal-langchain', category: 'foundations',
    question: '个人问题？', answer: '个人答案。', createdAt: 1 };
  const migrated = migrateStudyData({ ...initial, contentRevision: 77, cards: [edited, personal],
    progress: { [old.id]: progress }, deletedCardIds: ['lcpractice-002', 'lcragapi-002'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === old.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[old.id], progress);
  assert.deepEqual(migrated.cards.find((card) => card.id === personal.id), personal);
  assert.ok(migrated.cards.some((card) => card.id === 'lcpractice-001'));
  assert.ok(migrated.cards.some((card) => card.id === 'lcragapi-001'));
  assert.ok(!migrated.cards.some((card) => card.id === 'lcpractice-002'));
  assert.ok(!migrated.cards.some((card) => card.id === 'lcragapi-002'));
});

test('revision 77 adds Kitsune cards without losing user data', () => {
  const initial = createInitialData();
  const old = initial.cards.find((card) => card.id === 'grag-002');
  assert.ok(old);
  const edited = { ...old, answer: '我的图检索笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 76, cards: [edited],
    progress: { [old.id]: progress }, deletedCardIds: ['kitsune-002'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === old.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[old.id], progress);
  assert.ok(migrated.cards.some((card) => card.id === 'kitsune-001'));
  assert.ok(!migrated.cards.some((card) => card.id === 'kitsune-002'));
});

test('revision 76 adds GraphRAG cards without losing user data', () => {
  const initial = createInitialData();
  const old = initial.cards.find((card) => card.id === 'sigmamod-001');
  assert.ok(old);
  const edited = { ...old, answer: '我的规则条件笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 75, cards: [edited],
    progress: { [old.id]: progress }, deletedCardIds: ['grag-003'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === old.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[old.id], progress);
  assert.ok(migrated.cards.some((card) => card.id === 'grag-002'));
  assert.ok(!migrated.cards.some((card) => card.id === 'grag-003'));
});

test('revision 75 adds Sigma modifier cards without losing user data', () => {
  const initial = createInitialData();
  const old = initial.cards.find((card) => card.id === 'skmetric-001');
  assert.ok(old);
  const edited = { ...old, answer: '我的评估笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 74, cards: [edited],
    progress: { [old.id]: progress }, deletedCardIds: ['sigmamod-002'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === old.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[old.id], progress);
  assert.ok(migrated.cards.some((card) => card.id === 'sigmamod-001'));
  assert.ok(!migrated.cards.some((card) => card.id === 'sigmamod-002'));
});

test('revision 74 adds evaluation cards without losing user data', () => {
  const initial = createInitialData();
  const old = initial.cards.find((card) => card.id === 'malbyte-001');
  assert.ok(old);
  const edited = { ...old, answer: '我的字节模型笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 73, cards: [edited],
    progress: { [old.id]: progress }, deletedCardIds: ['skmetric-003'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === old.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[old.id], progress);
  assert.ok(migrated.cards.some((card) => card.id === 'skmetric-001'));
  assert.ok(!migrated.cards.some((card) => card.id === 'skmetric-003'));
});

test('revision 73 adds malware-byte model cards while preserving user data', () => {
  const initial = createInitialData();
  const old = initial.cards.find((card) => card.id === 'ptops-001');
  assert.ok(old);
  const edited = { ...old, answer: '我的张量索引笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 72, cards: [edited],
    progress: { [old.id]: progress }, deletedCardIds: ['malbyte-002'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === old.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[old.id], progress);
  assert.ok(migrated.cards.some((card) => card.id === 'malbyte-001'));
  assert.ok(!migrated.cards.some((card) => card.id === 'malbyte-002'));
});

test('revision 72 adds PyTorch operations without losing user data', () => {
  const initial = createInitialData();
  const old = initial.cards.find((card) => card.id === 'stixpat-001');
  assert.ok(old);
  const edited = { ...old, answer: '我的 STIX 笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 71, cards: [edited],
    progress: { [old.id]: progress }, deletedCardIds: ['ptops-002'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === old.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[old.id], progress);
  assert.ok(migrated.cards.some((card) => card.id === 'ptops-001'));
  assert.ok(!migrated.cards.some((card) => card.id === 'ptops-002'));
});

test('revision 71 adds STIX pattern cards while preserving user data', () => {
  const initial = createInitialData();
  const old = initial.cards.find((card) => card.id === 'wordvec-001');
  assert.ok(old);
  const edited = { ...old, answer: '我的词向量笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 70, cards: [edited],
    progress: { [old.id]: progress }, deletedCardIds: ['stixpat-002'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === old.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[old.id], progress);
  assert.ok(migrated.cards.some((card) => card.id === 'stixpat-001'));
  assert.ok(!migrated.cards.some((card) => card.id === 'stixpat-002'));
});

test('revision 70 adds word-vector cards without losing user data', () => {
  const initial = createInitialData();
  const old = initial.cards.find((card) => card.id === 'pystdlib-001');
  assert.ok(old);
  const edited = { ...old, answer: '我的迭代器笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 69, cards: [edited],
    progress: { [old.id]: progress }, deletedCardIds: ['wordvec-002'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === old.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[old.id], progress);
  assert.ok(migrated.cards.some((card) => card.id === 'wordvec-001'));
  assert.ok(!migrated.cards.some((card) => card.id === 'wordvec-002'));
});

test('revision 69 adds Python standard-library cards without losing user data', () => {
  const initial = createInitialData();
  const old = initial.cards.find((card) => card.id === 'lcbase-001');
  assert.ok(old);
  const edited = { ...old, answer: '我的框架笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 68, cards: [edited],
    progress: { [old.id]: progress }, deletedCardIds: ['pystdlib-002'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === old.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[old.id], progress);
  assert.ok(migrated.cards.some((card) => card.id === 'pystdlib-001'));
  assert.ok(!migrated.cards.some((card) => card.id === 'pystdlib-002'));
});

test('revision 68 adds LangChain and PEFT cards without losing user data', () => {
  const initial = createInitialData();
  const old = initial.cards.find((card) => card.id === 'lora-001');
  assert.ok(old);
  const edited = { ...old, answer: '我的 LoRA 笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const personal: StudyCard = { id: 'personal-lora', category: 'foundations', question: '个人问题？',
    answer: '个人答案。', createdAt: 1 };
  const migrated = migrateStudyData({ ...initial, contentRevision: 67, cards: [edited, personal],
    progress: { [old.id]: progress }, deletedCardIds: ['lcbase-002', 'lorause-002'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === old.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[old.id], progress);
  assert.deepEqual(migrated.cards.find((card) => card.id === personal.id), personal);
  assert.ok(migrated.cards.some((card) => card.id === 'lcbase-001'));
  assert.ok(migrated.cards.some((card) => card.id === 'lorause-001'));
  assert.ok(!migrated.cards.some((card) => card.id === 'lcbase-002'));
  assert.ok(!migrated.cards.some((card) => card.id === 'lorause-002'));
});

test('revision 67 adds agent and grammar fuzzing cards without losing study data', () => {
  const initial = createInitialData();
  const old = initial.cards.find((card) => card.id === 'graphstate-001');
  assert.ok(old);
  const edited = { ...old, answer: '我的状态图笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 66, cards: [edited],
    progress: { [old.id]: progress }, deletedCardIds: ['gramfuzz-002'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === old.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[old.id], progress);
  assert.ok(migrated.cards.some((card) => card.id === 'genagent-001'));
  assert.ok(migrated.cards.some((card) => card.id === 'gramfuzz-001'));
  assert.ok(!migrated.cards.some((card) => card.id === 'gramfuzz-002'));
});

test('revision 66 adds RAG and graph cards and preserves reviewed legacy records', () => {
  const initial = createInitialData();
  const cic = initial.cards.find((card) => card.id === 'cic-008');
  const ember = initial.cards.find((card) => card.id === 'ember-011');
  assert.ok(cic && ember);
  const prior = (card: StudyCard) => ({ ...card, origin: undefined, knowledgePoint: undefined,
    sources: card.sources?.filter((source) => source.id !== 'security-eval-pitfalls') });
  const personal = { id: 'personal-baseline', title: '个人基线笔记', url: 'https://example.com/baseline',
    type: '个人资料', evidence: 'application' as const, sourceCardId: cic.id };
  const savedCic = prior(cic);
  savedCic.sources = [...(savedCic.sources ?? []), personal];
  const progress = scheduleCard(undefined, 'good', Date.now());
  const previous = { ...initial, contentRevision: 65, cards: [savedCic, prior(ember)],
    progress: { [cic.id]: progress, [ember.id]: progress }, deletedCardIds: ['ragadv-002'] };
  const migrated = migrateStudyData(previous);
  assert.equal(migrated.contentRevision, initial.contentRevision);
  for (const id of [cic.id, ember.id]) {
    assert.ok(migrated.cards.find((card) => card.id === id)?.sources?.some((source) => source.id === 'security-eval-pitfalls'));
    assert.deepEqual(migrated.progress[id], progress);
  }
  assert.ok(migrated.cards.find((card) => card.id === cic.id)?.sources?.some((source) => source.id === personal.id));
  assert.ok(migrated.cards.some((card) => card.id === 'ragadv-001'));
  assert.ok(migrated.cards.some((card) => card.id === 'graphstate-001'));
  assert.ok(!migrated.cards.some((card) => card.id === 'ragadv-002'));
  const edited = { ...prior(ember), answer: '我的恶意软件数据笔记。' };
  assert.equal(migrateStudyData({ ...previous, cards: [edited] }).cards.find((card) => card.id === ember.id)?.answer, edited.answer);
});

test('revision 65 adds math and training cards while preserving user data', () => {
  const initial = createInitialData();
  const old = initial.cards.find((card) => card.id === 'pysyntax-027');
  assert.ok(old);
  const edited = { ...old, answer: '我的代码块笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 64, cards: [edited],
    progress: { [old.id]: progress }, deletedCardIds: ['ptcommon-002'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === old.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[old.id], progress);
  assert.ok(migrated.cards.some((card) => card.id === 'mathopt-001'));
  assert.ok(migrated.cards.some((card) => card.id === 'ptcommon-001'));
  assert.ok(!migrated.cards.some((card) => card.id === 'ptcommon-002'));
  const phish = initial.cards.find((card) => card.id === 'phish-007');
  assert.ok(phish);
  const priorPhish = { ...phish, origin: undefined, knowledgePoint: undefined,
    sources: phish.sources?.filter((source) => source.id !== 'urlnet-ref') };
  const reviewed = migrateStudyData({ ...initial, contentRevision: 64, cards: [priorPhish],
    progress: { [phish.id]: progress } });
  assert.ok(reviewed.cards.find((card) => card.id === phish.id)?.sources?.some((source) => source.id === 'urlnet-ref'));
  assert.deepEqual(reviewed.progress[phish.id], progress);
});

test('revision 64 adds beginner Python cards while preserving notes, progress and deletions', () => {
  const initial = createInitialData();
  const old = initial.cards.find((card) => card.id === 'pysyntax-001');
  assert.ok(old);
  const edited = { ...old, answer: '我的函数参数笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 63, cards: [edited],
    progress: { [old.id]: progress }, deletedCardIds: ['pysyntax-028'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === old.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[old.id], progress);
  assert.ok(migrated.cards.some((card) => card.id === 'pysyntax-027'));
  assert.ok(!migrated.cards.some((card) => card.id === 'pysyntax-028'));
});

test('revision 63 clarifies a rule-derived label card while preserving edits and progress', () => {
  const initial = createInitialData();
  const old = retiredV62.cards.find((card) => card.id === 'suri-006') as StudyCard | undefined;
  assert.ok(old);
  const personal = { id: 'personal-alert', title: '个人告警笔记', url: 'https://example.com/alert',
    type: '个人资料', evidence: 'application' as const, sourceCardId: old.id };
  const saved = { ...old, sources: [...(old.sources ?? []), personal] };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const previous = { ...initial, contentRevision: 62, cards: [saved], progress: { [old.id]: progress },
    deletedCardIds: ['opseval-002', 'pysyntax-002'] };
  const migrated = migrateStudyData(previous);
  const updated = migrated.cards.find((card) => card.id === old.id);
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.ok(updated?.question.includes('标签主要由规则决定'));
  assert.ok(updated?.sources?.some((source) => source.id === 'security-eval-paper'));
  assert.ok(updated?.sources?.some((source) => source.id === personal.id));
  assert.ok(migrated.archivedBundledCards?.some((card) => card.id === old.id && card.question === old.question));
  assert.deepEqual(migrated.progress[old.id], progress);
  assert.ok(migrated.cards.some((card) => card.id === 'opseval-001'));
  assert.ok(migrated.cards.some((card) => card.id === 'pysyntax-001'));
  assert.ok(migrated.cards.some((card) => card.id === 'skapi-001'));
  assert.ok(!migrated.cards.some((card) => card.id === 'opseval-002'));
  assert.ok(!migrated.cards.some((card) => card.id === 'pysyntax-002'));
  const edited = { ...saved, answer: '我自己的告警排序笔记。' };
  const preserved = migrateStudyData({ ...previous, cards: [edited] });
  assert.equal(preserved.cards.find((card) => card.id === old.id)?.answer, edited.answer);
  assert.deepEqual(preserved.progress[old.id], progress);
  const deleted = migrateStudyData({ ...previous, cards: [], deletedCardIds: [old.id] });
  assert.ok(!deleted.cards.some((card) => card.id === old.id));
});

test('revision 62 adds NumPy foundations while preserving notes, progress and deletions', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'speechfund-001');
  assert.ok(original);
  const edited = { ...original, answer: '我的采样率笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 61, cards: [edited], progress: { [edited.id]: progress },
    deletedCardIds: ['npstudy-002'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(migrated.cards.some((card) => card.id === 'npstudy-001'));
  assert.ok(!migrated.cards.some((card) => card.id === 'npstudy-002'));
});

test('revision 61 adds speech foundations while preserving notes, progress and deletions', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'sftdialogue-001');
  assert.ok(original);
  const edited = { ...original, answer: '我的对话模板笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 60, cards: [edited], progress: { [edited.id]: progress },
    deletedCardIds: ['speechfund-002'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(migrated.cards.some((card) => card.id === 'speechfund-001'));
  assert.ok(!migrated.cards.some((card) => card.id === 'speechfund-002'));
});

test('revision 60 adds SFT foundations while preserving notes, progress and deletions', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'nncore-001');
  assert.ok(original);
  const edited = { ...original, answer: '我的激活函数笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 59, cards: [edited], progress: { [edited.id]: progress },
    deletedCardIds: ['sftdialogue-002'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(migrated.cards.some((card) => card.id === 'sftdialogue-001'));
  assert.ok(!migrated.cards.some((card) => card.id === 'sftdialogue-002'));
});

test('revision 59 adds neural foundations without overwriting personal study data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'pcastudy-001');
  assert.ok(original);
  const edited = { ...original, answer: '我的 PCA 学习笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 58, cards: [edited], progress: { [edited.id]: progress },
    deletedCardIds: ['nncore-002'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.ok(migrated.cards.some((card) => card.id === 'nnloss-008'));
  assert.ok(migrated.cards.some((card) => card.id === 'nncore-008'));
  assert.ok(!migrated.cards.some((card) => card.id === 'nncore-002'));
});

test('revision 58 adds AI foundations and security cards without losing existing study data', () => {
  const initial = createInitialData();
  const original = initial.cards.find((card) => card.id === 'seq2seq-001');
  const existingDns = initial.cards.find((card) => card.id === 'zeek-008');
  assert.ok(original);
  assert.ok(existingDns);
  const edited = { ...original, answer: '我的教师强制笔记。' };
  const savedDns = { ...existingDns, sources: (existingDns.sources ?? []).filter((source) => source.sourceCardId !== 'dnstunnel-002') };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 57, cards: [edited, savedDns], progress: { [edited.id]: progress, [savedDns.id]: progress },
    deletedCardIds: ['pcastudy-002'] });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[edited.id], progress);
  assert.deepEqual(migrated.progress[savedDns.id], progress);
  assert.ok(migrated.cards.find((card) => card.id === savedDns.id)?.sources?.some((source) => source.sourceCardId === 'dnstunnel-002'));
  assert.ok(migrated.cards.some((card) => card.id === 'pcastudy-001'));
  assert.ok(migrated.cards.some((card) => card.id === 'dnstunnel-001'));
  assert.ok(!migrated.cards.some((card) => card.id === 'pcastudy-002'));
});

test('revision 57 adds research cards and a legacy reference while preserving progress', () => {
  const initial = createInitialData();
  const current = initial.cards.find((card) => card.id === 'ai4sec-026');
  assert.ok(current);
  const personal = { id: 'personal-localization', title: '个人定位笔记', url: 'https://example.com/localization',
    type: '个人资料', evidence: 'application' as const, sourceCardId: current.id };
  const old = { ...current, sources: [...(current.sources ?? []).filter((source) => source.sourceCardId !== 'legacy25-007'), personal] };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const previous = { ...initial, contentRevision: 56, cards: [old], progress: { [old.id]: progress },
    deletedCardIds: ['voyager-002'] };
  const migrated = migrateStudyData(previous);
  const updated = migrated.cards.find((card) => card.id === old.id);
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.ok(updated?.sources?.some((source) => source.sourceCardId === 'legacy25-007'));
  assert.ok(updated?.sources?.some((source) => source.id === personal.id));
  assert.deepEqual(migrated.progress[old.id], progress);
  assert.ok(migrated.cards.some((card) => card.id === 'beir-003'));
  assert.ok(!migrated.cards.some((card) => card.id === 'voyager-002'));
  const edited = { ...old, answer: '我自己的漏洞定位说明。' };
  const preserved = migrateStudyData({ ...previous, cards: [edited] });
  assert.equal(preserved.cards.find((card) => card.id === old.id)?.answer, edited.answer);
  assert.deepEqual(preserved.progress[old.id], progress);
});

test('revision 56 clarifies model drift while preserving edits and progress', () => {
  const initial = createInitialData();
  const old = retiredV55.cards.find((item) => item.id === 'ai4sec-015') as StudyCard | undefined;
  assert.ok(old);
  const personal = { id: 'personal-drift', title: '个人漂移笔记', url: 'https://example.com/drift',
    type: '个人资料', evidence: 'application' as const, sourceCardId: old.id };
  const saved = { ...old, sources: [...(old.sources ?? []), personal] };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const previous = { ...initial, contentRevision: 55, cards: [saved], progress: { [old.id]: progress },
    deletedCardIds: ['seq2seq-002'] };
  const migrated = migrateStudyData(previous);
  const updated = migrated.cards.find((item) => item.id === old.id);
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.ok(updated?.question.includes('Evidently'));
  assert.ok(updated?.sources?.some((source) => source.id === personal.id));
  assert.ok(updated?.sources?.some((source) => source.sourceCardId === 'production-009'));
  assert.ok(migrated.archivedBundledCards?.some((item) => item.id === old.id && item.question === old.question));
  assert.deepEqual(migrated.progress[old.id], progress);
  assert.ok(migrated.cards.some((item) => item.id === 'seq2seq-001'));
  assert.ok(!migrated.cards.some((item) => item.id === 'seq2seq-002'));
  const edited = { ...saved, answer: '我自己的模型漂移笔记。' };
  const preserved = migrateStudyData({ ...previous, cards: [edited] });
  assert.equal(preserved.cards.find((item) => item.id === old.id)?.answer, edited.answer);
  assert.deepEqual(preserved.progress[old.id], progress);
  const deleted = migrateStudyData({ ...previous, cards: [], deletedCardIds: [old.id] });
  assert.ok(!deleted.cards.some((item) => item.id === old.id));
});

test('revision 56 adds interview references to existing cards without losing user data', () => {
  const initial = createInitialData();
  const current = initial.cards.find((card) => card.id === 'ai4sec-014');
  assert.ok(current);
  const personal = { id: 'personal-baseline', title: '个人基线笔记', url: 'https://example.com/baseline',
    type: '个人资料', evidence: 'application' as const, sourceCardId: current.id };
  const old = { ...current, sources: [...(current.sources ?? []).filter((source) => source.sourceCardId !== 'secnew-004'), personal] };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 55, cards: [old], progress: { [old.id]: progress },
    deletedCardIds: ['secnew-001'] });
  const updated = migrated.cards.find((card) => card.id === old.id);
  assert.ok(updated?.sources?.some((source) => source.sourceCardId === 'secnew-004'));
  assert.ok(updated?.sources?.some((source) => source.id === personal.id));
  assert.deepEqual(migrated.progress[old.id], progress);
  assert.ok(!migrated.cards.some((card) => card.id === 'secnew-001'));
  const edited = { ...old, answer: '我自己的基线笔记。' };
  const preserved = migrateStudyData({ ...initial, contentRevision: 55, cards: [edited], progress: { [old.id]: progress } });
  assert.equal(preserved.cards.find((card) => card.id === old.id)?.answer, edited.answer);
  assert.deepEqual(preserved.progress[old.id], progress);
});

test('revision 55 updates summary evaluation and preserves user data', () => {
  const initial = createInitialData();
  const old = retiredV54.cards.find((item) => item.id === 'copilot-006') as StudyCard | undefined;
  const time = initial.cards.find((item) => item.id === 'copilot-008');
  assert.ok(old && time);
  const personal = { id: 'personal-summary', title: '个人摘要笔记', url: 'https://example.com/summary',
    type: '个人资料', evidence: 'application' as const, sourceCardId: old.id };
  const saved = { ...old, sources: [...(old.sources ?? []), personal] };
  const oldTime = { ...time, sources: (time.sources ?? []).filter((source) => !['soc-productivity-ref', 'soc-human-study-ref'].includes(source.id)) };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const previous = { ...initial, contentRevision: 54, cards: [saved, oldTime],
    progress: { [old.id]: progress }, deletedCardIds: ['socstudy-002'] };
  const migrated = migrateStudyData(previous);
  const updated = migrated.cards.find((item) => item.id === old.id);
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.ok(updated?.question.includes('事实一致性与关键事实覆盖'));
  assert.ok(updated?.sources?.some((source) => source.id === personal.id));
  assert.ok(updated?.sources?.some((source) => source.id === 'summeval-quality-ref'));
  assert.ok(migrated.cards.find((item) => item.id === time.id)?.sources?.some((source) => source.id === 'soc-productivity-ref'));
  assert.ok(migrated.archivedBundledCards?.some((item) => item.id === old.id && item.question === old.question));
  assert.deepEqual(migrated.progress[old.id], progress);
  assert.ok(migrated.cards.some((item) => item.id === 'socstudy-001'));
  assert.ok(!migrated.cards.some((item) => item.id === 'socstudy-002'));
  const edited = { ...saved, answer: '我自己的事件摘要评估笔记。' };
  const preserved = migrateStudyData({ ...previous, cards: [edited] });
  assert.equal(preserved.cards.find((item) => item.id === old.id)?.answer, edited.answer);
  assert.deepEqual(preserved.progress[old.id], progress);
  const deleted = migrateStudyData({ ...previous, cards: [], deletedCardIds: [old.id] });
  assert.ok(!deleted.cards.some((item) => item.id === old.id));
});

test('revision 54 adds fuzzing references and cards while retaining personal data', () => {
  const initial = createInitialData();
  const card = initial.cards.find((item) => item.id === 'fuzz-009');
  const editedCard = initial.cards.find((item) => item.id === 'fuzz-003');
  assert.ok(card && editedCard);
  const personal = { id: 'personal-fuzz-cost', title: '个人测试成本笔记', url: 'https://example.com/fuzz-cost',
    type: '个人资料', evidence: 'application' as const, sourceCardId: card.id };
  const saved = { ...card, sources: [...(card.sources ?? []).filter((source) => !['fuzz4all-eval-ref', 'fuzzgpt-cost-ref'].includes(source.id)), personal] };
  const edited = { ...editedCard, answer: '我自己的 harness 检查笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 53, cards: [saved, edited],
    progress: { [card.id]: progress }, deletedCardIds: ['llmfuzz-002'] });
  const updated = migrated.cards.find((item) => item.id === card.id);
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.ok(updated?.sources?.some((source) => source.id === 'fuzz4all-eval-ref'));
  assert.ok(updated?.sources?.some((source) => source.id === personal.id));
  assert.equal(migrated.cards.find((item) => item.id === edited.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[card.id], progress);
  assert.ok(migrated.cards.some((item) => item.id === 'llmfuzz-001'));
  assert.ok(!migrated.cards.some((item) => item.id === 'llmfuzz-002'));
});

test('revision 53 clarifies the Zeek model score while preserving edits and progress', () => {
  const initial = createInitialData();
  const old = retiredV52.cards.find((item) => item.id === 'zeek-012') as StudyCard | undefined;
  assert.ok(old);
  const personal = { id: 'personal-zeek', title: '个人网络日志笔记', url: 'https://example.com/zeek',
    type: '个人资料', evidence: 'application' as const, sourceCardId: old.id };
  const saved = { ...old, sources: [...(old.sources ?? []), personal] };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const previous = { ...initial, contentRevision: 52, cards: [saved], progress: { [old.id]: progress }, deletedCardIds: ['logseq-003'] };
  const migrated = migrateStudyData(previous);
  const updated = migrated.cards.find((item) => item.id === old.id);
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.ok(updated?.question.includes('模型给出高风险分数'));
  assert.ok(updated?.sources?.some((source) => source.id === personal.id));
  assert.ok(updated?.sources?.some((source) => source.id === 'nist-ids-review-ref'));
  assert.ok(migrated.archivedBundledCards?.some((item) => item.id === old.id && item.question === old.question));
  assert.deepEqual(migrated.progress[old.id], progress);
  assert.ok(migrated.cards.some((item) => item.id === 'logseq-001'));
  assert.ok(!migrated.cards.some((item) => item.id === 'logseq-003'));
  const edited = { ...saved, answer: '我自己的模型分数核查笔记。' };
  const preserved = migrateStudyData({ ...previous, cards: [edited] });
  assert.equal(preserved.cards.find((item) => item.id === old.id)?.answer, edited.answer);
  assert.deepEqual(preserved.progress[old.id], progress);
  const deleted = migrateStudyData({ ...previous, cards: [], deletedCardIds: [old.id] });
  assert.ok(!deleted.cards.some((item) => item.id === old.id));
});

test('revision 52 adds interview sources and cards while retaining personal data', () => {
  const initial = createInitialData();
  const card = initial.cards.find((item) => item.id === 'transdetail-004');
  const edited = initial.cards.find((item) => item.id === 'websec-017');
  assert.ok(card && edited);
  const personal = { id: 'personal-gqa', title: '个人笔记', url: 'https://example.com/gqa',
    type: '个人资料', evidence: 'application' as const, sourceCardId: card.id };
  const saved = { ...card, sources: [...(card.sources ?? []).filter((source) => source.id !== 'company-tencent'), personal] };
  const personalEdit = { ...edited, answer: '我自己的 SSRF 笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 51, cards: [saved, personalEdit],
    deletedCardIds: ['authint-002'], progress: { [card.id]: progress } });
  const updated = migrated.cards.find((item) => item.id === card.id);
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.ok(updated?.sources?.some((source) => source.id === 'company-tencent'));
  assert.ok(updated?.sources?.some((source) => source.id === personal.id));
  assert.equal(migrated.cards.find((item) => item.id === edited.id)?.answer, personalEdit.answer);
  assert.deepEqual(migrated.progress[card.id], progress);
  assert.ok(migrated.cards.some((item) => item.id === 'longctxint-001'));
  assert.ok(!migrated.cards.some((item) => item.id === 'authint-002'));
});

test('revision 49 clarifies event grouping without losing personal edits or study progress', () => {
  const initial = createInitialData();
  const old = retiredV49.cards.find((item) => item.id === 'eval-014') as StudyCard | undefined;
  assert.ok(old);
  const personal = { id: 'personal-events', title: '个人事件笔记', url: 'https://example.com/events',
    type: '个人资料', evidence: 'application' as const, sourceCardId: old.id };
  const saved = { ...old, sources: [...(old.sources ?? []), personal] };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const previous = { ...initial, contentRevision: 49, cards: [saved], progress: { [old.id]: progress }, deletedCardIds: [] };
  const migrated = migrateStudyData(previous);
  const updated = migrated.cards.find((item) => item.id === old.id);
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.ok(updated?.question.includes('同一攻击活动'));
  assert.ok(updated?.explanation?.includes('不能仅凭相似流量'));
  assert.ok(updated?.sources?.some((source) => source.id === personal.id));
  assert.ok(updated?.sources?.some((source) => source.id === 'range-anomaly-evaluation'));
  assert.ok(migrated.archivedBundledCards?.some((item) => item.id === old.id && item.answer === old.answer));
  assert.deepEqual(migrated.progress[old.id], progress);
  const edited = { ...saved, answer: '这是我自己的事件评估笔记。' };
  const preserved = migrateStudyData({ ...previous, cards: [edited] });
  assert.equal(preserved.cards.find((item) => item.id === old.id)?.answer, edited.answer);
  assert.deepEqual(preserved.progress[old.id], progress);
  const deleted = migrateStudyData({ ...previous, cards: [], deletedCardIds: [old.id] });
  assert.ok(!deleted.cards.some((item) => item.id === old.id));
});

test('revision 46 adds interview provenance to an existing card without losing personal data', () => {
  const initial = createInitialData();
  const clip = initial.cards.find((item) => item.id === 'vl-001');
  const agent = initial.cards.find((item) => item.id === 'agents-002');
  assert.ok(clip && agent);
  const personal = { id: 'personal-clip', title: '个人 CLIP 笔记', url: 'https://example.com/clip',
    type: '个人资料', evidence: 'application' as const, sourceCardId: clip.id };
  const saved = { ...clip, sources: [...(clip.sources ?? []).filter((source) => !source.id.startsWith('company-')), personal] };
  const edited = { ...agent, answer: '我自己的工具使用说明。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 46, cards: [saved, edited],
    deletedCardIds: ['blipstudy-002'], progress: { [clip.id]: progress } });
  const updated = migrated.cards.find((item) => item.id === clip.id);
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.ok(updated?.sources?.some((source) => source.id === 'company-baidu'));
  assert.ok(updated?.sources?.some((source) => source.id === 'company-kuaishou'));
  assert.ok(updated?.sources?.some((source) => source.id === personal.id));
  assert.equal(migrated.cards.find((item) => item.id === agent.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[clip.id], progress);
  assert.ok(migrated.cards.some((item) => item.id === 'blipstudy-001'));
  assert.ok(!migrated.cards.some((item) => item.id === 'blipstudy-002'));
});

test('revision 44 adds the DJI interview source to an existing card and preserves study data', () => {
  const initial = createInitialData();
  const card = initial.cards.find((item) => item.id === 'passstore-002');
  assert.ok(card);
  const saved = { ...card, sources: (card.sources ?? []).filter((source) => source.id !== 'company-dji') };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 44, cards: [saved],
    deletedCardIds: ['urlnet-003'], progress: { [card.id]: progress } });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.ok(migrated.cards.find((item) => item.id === card.id)?.sources?.some((source) => source.id === 'company-dji'));
  assert.deepEqual(migrated.progress[card.id], progress);
  assert.ok(migrated.cards.some((item) => item.id === 'urlnet-001'));
  assert.ok(!migrated.cards.some((item) => item.id === 'urlnet-003'));
});

test('revision 43 adds interview sources without losing personal sources, edits or progress', () => {
  const initial = createInitialData();
  const card = initial.cards.find((item) => item.id === 'llmmem-005');
  const memory = initial.cards.find((item) => item.id === 'weakness-014');
  assert.ok(card && memory);
  const personal = { id: 'personal-kv-note', title: '个人笔记', url: 'https://example.com/kv',
    type: '个人资料', evidence: 'application' as const, sourceCardId: card.id };
  const saved = { ...card, sources: [...(card.sources ?? []).filter((source) => source.id !== 'company-alibaba'), personal] };
  const edited = { ...memory, answer: '这是我自己的内存安全笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 43, cards: [saved, edited],
    deletedCardIds: ['vllmpage-002'], progress: { [card.id]: progress } });
  const updated = migrated.cards.find((item) => item.id === card.id);
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.ok(updated?.sources?.some((source) => source.id === 'company-alibaba'));
  assert.ok(updated?.sources?.some((source) => source.id === personal.id));
  assert.equal(migrated.cards.find((item) => item.id === memory.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[card.id], progress);
  assert.ok(migrated.cards.some((item) => item.id === 'vllmpage-001'));
  assert.ok(!migrated.cards.some((item) => item.id === 'vllmpage-002'));
});

test('revision 42 adds concurrency cards while retaining edits, deletions and progress', () => {
  const initial = createInitialData();
  const card = initial.cards.find((item) => item.id === 'detector-001');
  assert.ok(card);
  const edited = { ...card, answer: '我自己的目标检测笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 42, cards: [edited],
    deletedCardIds: ['pyconcurrent-004'], progress: { [card.id]: progress } });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((item) => item.id === card.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[card.id], progress);
  assert.ok(migrated.cards.some((item) => item.id === 'pyconcurrent-001'));
  assert.ok(!migrated.cards.some((item) => item.id === 'pyconcurrent-004'));
});

test('revision 41 adds detector cards while retaining edits, deletions and progress', () => {
  const initial = createInitialData();
  const card = initial.cards.find((item) => item.id === 'webinterview-001');
  assert.ok(card);
  const edited = { ...card, answer: '我自己的 XSS 笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 41, cards: [edited],
    deletedCardIds: ['detector-003'], progress: { [card.id]: progress } });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((item) => item.id === card.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[card.id], progress);
  assert.ok(migrated.cards.some((item) => item.id === 'detector-001'));
  assert.ok(!migrated.cards.some((item) => item.id === 'detector-003'));
});

test('revision 40 corrects interview provenance while retaining personal sources and progress', () => {
  const initial = createInitialData();
  const card = initial.cards.find((item) => item.id === 'webinterview-001');
  assert.ok(card);
  const personal = { id: 'personal-interview-note', title: '个人笔记', url: 'https://example.com/note',
    type: '个人资料', evidence: 'application' as const, sourceCardId: card.id };
  const previous = { ...card, sources: [...(card.sources ?? []).map((source) => source.id === 'company-hikvision'
    ? { ...source, title: '海康威视安全岗位公开面经（合集收录，经历为分享者自述）' } : source), personal] };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 40, cards: [previous],
    progress: { [card.id]: progress }, deletedCardIds: [] });
  const updated = migrated.cards.find((item) => item.id === card.id);
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.ok(updated?.sources?.some((source) => source.id === 'company-hikvision' && source.title.includes('岗位未注明')));
  assert.ok(updated?.sources?.some((source) => source.id === personal.id));
  assert.deepEqual(migrated.progress[card.id], progress);
});

test('revision 39 adds company interview cards without losing user data', () => {
  const initial = createInitialData();
  const card = initial.cards.find((item) => item.id === 'suri-008');
  assert.ok(card);
  const edited = { ...card, answer: '我自己的时间窗口说明。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 39, cards: [edited],
    deletedCardIds: ['webinterview-002'], progress: { [card.id]: progress } });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((item) => item.id === card.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[card.id], progress);
  assert.ok(migrated.cards.some((item) => item.id === 'webinterview-003'));
  assert.ok(!migrated.cards.some((item) => item.id === 'webinterview-002'));
});

test('revision 38 updates an unedited timestamp card while preserving personal changes and progress', () => {
  const initial = createInitialData();
  const old = retiredV38.cards.find((item) => item.id === 'suri-008') as StudyCard | undefined;
  assert.ok(old);
  const personal = { id: 'personal-time-note', title: '个人时间笔记', url: 'https://example.com/time',
    type: '个人资料', evidence: 'application' as const, sourceCardId: old.id };
  const saved = { ...old, sources: [...(old.sources ?? []), personal] };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const previous = { ...initial, contentRevision: 38, cards: [saved], progress: { [old.id]: progress }, deletedCardIds: [] };
  const migrated = migrateStudyData(previous);
  const updated = migrated.cards.find((item) => item.id === old.id);
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.ok(updated);
  assert.ok(updated.answer.includes('实时预测'));
  assert.ok(updated.sources?.some((source) => source.id === personal.id));
  assert.ok(updated.sources?.some((source) => source.id === 'ecs-event-time-ref'));
  assert.ok(migrated.archivedBundledCards?.some((item) => item.id === old.id && item.answer === old.answer));
  assert.deepEqual(migrated.progress[old.id], progress);
  const edited = { ...saved, answer: '这是我修改过的窗口说明。' };
  const preserved = migrateStudyData({ ...previous, cards: [edited] });
  assert.equal(preserved.cards.find((item) => item.id === old.id)?.answer, edited.answer);
  assert.deepEqual(preserved.progress[old.id], progress);
  const deleted = migrateStudyData({ ...previous, cards: [], deletedCardIds: [old.id] });
  assert.ok(!deleted.cards.some((item) => item.id === old.id));
});

test('revision 37 adds SVM cards without losing user data', () => {
  const initial = createInitialData();
  const card = initial.cards.find((item) => item.id === 'agentcoord-001');
  assert.ok(card);
  const edited = { ...card, answer: '我自己的协作笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 37, cards: [edited],
    deletedCardIds: ['svmdeep-002'], progress: { [card.id]: progress } });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((item) => item.id === card.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[card.id], progress);
  assert.ok(migrated.cards.some((item) => item.id === 'svmdeep-001'));
  assert.ok(!migrated.cards.some((item) => item.id === 'svmdeep-002'));
});

test('revision 36 adds agent coordination cards without losing user data', () => {
  const initial = createInitialData();
  const card = initial.cards.find((item) => item.id === 'retrievalmethods-003');
  assert.ok(card);
  const edited = { ...card, answer: '我自己的检索笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 36, cards: [edited],
    deletedCardIds: ['agentcoord-002'], progress: { [card.id]: progress } });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((item) => item.id === card.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[card.id], progress);
  assert.ok(migrated.cards.some((item) => item.id === 'agentcoord-001'));
  assert.ok(!migrated.cards.some((item) => item.id === 'agentcoord-002'));
});

test('revision 35 adds retrieval cards while retaining edits, deletions and progress', () => {
  const initial = createInitialData();
  const card = initial.cards.find((item) => item.id === 'boosting-001');
  assert.ok(card);
  const edited = { ...card, answer: '我自己的提升树笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 35, cards: [edited],
    deletedCardIds: ['retrievalmethods-004'], progress: { [card.id]: progress } });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((item) => item.id === card.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[card.id], progress);
  assert.ok(migrated.cards.some((item) => item.id === 'retrievalmethods-003'));
  assert.ok(!migrated.cards.some((item) => item.id === 'retrievalmethods-004'));
});

test('revision 34 adds boosting cards while preserving edits, deletions and progress', () => {
  const initial = createInitialData();
  const card = initial.cards.find((item) => item.id === 'ctripproc-001');
  assert.ok(card);
  const edited = { ...card, answer: '我自己的进程树笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 34, cards: [edited],
    deletedCardIds: ['boosting-002'], progress: { [card.id]: progress } });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((item) => item.id === card.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[card.id], progress);
  assert.ok(migrated.cards.some((item) => item.id === 'boosting-001'));
  assert.ok(!migrated.cards.some((item) => item.id === 'boosting-002'));
});

test('revision 33 adds company interview cards while preserving edits, deletions and progress', () => {
  const initial = createInitialData();
  const card = initial.cards.find((item) => item.id === 'statresample-001');
  assert.ok(card);
  const edited = { ...card, answer: '我自己的重采样笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 33, cards: [edited],
    deletedCardIds: ['ctripshell-001'], progress: { [card.id]: progress } });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((item) => item.id === card.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[card.id], progress);
  assert.ok(migrated.cards.some((item) => item.id === 'ctripproc-001'));
  assert.ok(!migrated.cards.some((item) => item.id === 'ctripshell-001'));
});

test('revision 32 adds statistics cards while retaining edits, progress and deletions', () => {
  const initial = createInitialData();
  const card = initial.cards.find((item) => item.id === 'agentsearch-003');
  assert.ok(card);
  const edited = { ...card, answer: '我自己的搜索笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 32, cards: [edited],
    deletedCardIds: ['statresample-002'], progress: { [card.id]: progress } });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((item) => item.id === card.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[card.id], progress);
  assert.ok(migrated.cards.some((item) => item.id === 'statresample-003'));
  assert.ok(!migrated.cards.some((item) => item.id === 'statresample-002'));
});

test('revision 31 adds agent search cards while retaining edits, progress and deletions', () => {
  const initial = createInitialData();
  const card = initial.cards.find((item) => item.id === 'fuzzstudy-003');
  assert.ok(card);
  const edited = { ...card, answer: '我自己的覆盖率笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 31, cards: [edited],
    deletedCardIds: ['agentsearch-002'], progress: { [card.id]: progress } });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((item) => item.id === card.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[card.id], progress);
  assert.ok(migrated.cards.some((item) => item.id === 'agentsearch-008'));
  assert.ok(!migrated.cards.some((item) => item.id === 'agentsearch-002'));
});

test('revision 30 adds fuzzing cards while preserving progress, edits and deleted cards', () => {
  const initial = createInitialData();
  const card = initial.cards.find((item) => item.id === 'dnsdeep-007');
  assert.ok(card);
  const edited = { ...card, answer: '这是我自己的 DNS 笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 30, cards: [edited],
    deletedCardIds: ['fuzzstudy-006'], progress: { [card.id]: progress } });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((item) => item.id === card.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[card.id], progress);
  assert.ok(migrated.cards.some((item) => item.id === 'fuzzstudy-003'));
  assert.ok(!migrated.cards.some((item) => item.id === 'fuzzstudy-006'));
});

test('revision 29 adds DNS cards without overwriting edited questions or restoring deletions', () => {
  const initial = createInitialData();
  const old = initial.cards.find((card) => card.id === 'weakness-004');
  assert.ok(old);
  const edited = { ...old, answer: '我自己的上下文编码笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 29, cards: [edited],
    deletedCardIds: ['dnsdeep-002'], progress: { [old.id]: progress } });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === old.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[old.id], progress);
  assert.ok(migrated.cards.some((card) => card.id === 'dnsdeep-007'));
  assert.ok(!migrated.cards.some((card) => card.id === 'dnsdeep-002'));
});

test('revision 28 merges new company sources into unchanged cards and preserves user data', () => {
  const initial = createInitialData();
  const card = initial.cards.find((item) => item.id === 'weakness-004');
  assert.ok(card);
  const old = { ...card, sources: card.sources?.filter((source) => source.id !== 'company-sensetime') };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const legacy = { ...initial, contentRevision: 28, cards: [old], progress: { [old.id]: progress }, deletedCardIds: ['weakness-001'] };
  const migrated = migrateStudyData(legacy);
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.deepEqual(migrated.progress[old.id], progress);
  assert.ok(migrated.cards.find((item) => item.id === old.id)?.sources?.some((source) => source.id === 'company-sensetime'));
  assert.ok(!migrated.cards.some((item) => item.id === 'weakness-001'));
  const edited = { ...old, answer: '我自己整理的答案。' };
  const preserved = migrateStudyData({ ...legacy, cards: [edited] });
  assert.equal(preserved.cards.find((item) => item.id === old.id)?.answer, edited.answer);
  assert.ok(!preserved.cards.find((item) => item.id === old.id)?.sources?.some((source) => source.id === 'company-sensetime'));
});

test('revision 27 adds the interview themes without restoring deleted cards or losing progress', () => {
  const initial = createInitialData();
  const old = initial.cards.find((card) => card.id === 'agentjudge-005');
  assert.ok(old);
  const edited = { ...old, answer: '这是我的评审笔记。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 27, cards: [edited],
    deletedCardIds: ['companyddp-002'], progress: { [old.id]: progress } });
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.equal(migrated.cards.find((card) => card.id === old.id)?.answer, edited.answer);
  assert.deepEqual(migrated.progress[old.id], progress);
  assert.ok(migrated.cards.some((card) => card.id === 'companycontrast-004'));
  assert.ok(!migrated.cards.some((card) => card.id === 'companyddp-002'));
});

test('revision 26 adds reviewed references while preserving edits, deletions and learning progress', () => {
  const initial = createInitialData();
  const sourceCard = initial.cards.find((card) => card.id === 'ai4sec-021');
  const editedCard = initial.cards.find((card) => card.id === 'ai4sec-022');
  assert.ok(sourceCard && editedCard);
  const personalSource = {
    id: 'personal-legacy', title: '个人笔记', url: 'https://example.com/note', type: '个人资料',
    evidence: 'application' as const, sourceCardId: sourceCard.id,
  };
  const old = { ...sourceCard, sources: [...(sourceCard.sources ?? []).filter((source) => source.id === 'original'), personalSource] };
  const edited = { ...editedCard, answer: '我自己整理的答案。', sources: editedCard.sources?.filter((source) => source.id === 'original') };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const migrated = migrateStudyData({ ...initial, contentRevision: 26, cards: [old, edited],
    deletedCardIds: ['ai4sec-025', 'mcpflow-003'], progress: { [old.id]: progress } });
  const updated = migrated.cards.find((card) => card.id === old.id);
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.deepEqual(migrated.progress[old.id], progress);
  assert.ok(updated?.sources?.some((source) => source.id === 'personal-legacy'));
  assert.ok(updated?.sources?.some((source) => source.sourceCardId === 'legacy25-001'));
  assert.equal(migrated.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.ok(!migrated.cards.find((card) => card.id === edited.id)?.sources?.some((source) => source.sourceCardId === 'legacy25-002'));
  assert.ok(!migrated.cards.some((card) => card.id === 'ai4sec-025' || card.id === 'mcpflow-003'));
  assert.ok(migrated.cards.some((card) => card.id === 'agentjudge-005'));
});

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
    new Set(['original', 'cic-ids2017', 'ml-monitor-ref', 'unsw-nb15']),
  );
});

test('revision 24 adds interview cards and references without losing edits, progress or deletions', () => {
  const initial = createInitialData();
  const old = initial.cards.find((card) => card.id === 'code-009');
  assert.ok(old);
  const previous = { ...old, subtopic: undefined, knowledgePoint: undefined, questionType: undefined,
    origin: undefined, sources: old.sources?.filter((source) => source.id === 'codexglue-defects') };
  const edited = { ...initial.cards[0], question: '我的自定义问题' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const upgraded = migrateStudyData({ ...initial, contentRevision: 24, cards: [previous, edited],
    progress: { [old.id]: progress }, deletedCardIds: ['companypractice-py-002'] });
  assert.equal(upgraded.contentRevision, initial.contentRevision);
  assert.deepEqual(upgraded.progress[old.id], progress);
  assert.equal(upgraded.cards.find((card) => card.id === edited.id)?.question, edited.question);
  assert.ok(upgraded.cards.find((card) => card.id === old.id)?.sources?.some((source) => source.id === 'llm4vuln-context-review'));
  assert.ok(upgraded.cards.some((card) => card.id === 'companypractice-py-001'));
  assert.ok(!upgraded.cards.some((card) => card.id === 'companypractice-py-002'));
});

test('revision 25 corrects an unedited code review card while preserving edits and progress', () => {
  const initial = createInitialData();
  const old = retiredV25.cards.find((card) => card.id === 'code-011') as StudyCard;
  assert.ok(old);
  const progress = scheduleCard(undefined, 'good', Date.now());
  const personal = { id: 'personal-note', title: '个人笔记', url: 'https://example.com/note',
    type: '个人资料', evidence: 'application' as const, sourceCardId: old.id };
  const saved = { ...old, sources: [...(old.sources ?? []), personal] };
  const legacy = { ...initial, contentRevision: 25, cards: [saved], progress: { [old.id]: progress },
    deletedCardIds: ['cnnbase-002'] };
  const upgraded = migrateStudyData(legacy);
  const corrected = upgraded.cards.find((card) => card.id === old.id);
  assert.equal(upgraded.contentRevision, initial.contentRevision);
  assert.ok(corrected?.explanation?.includes('保持作用域'));
  assert.ok(corrected?.sources?.some((source) => source.id === 'personal-note'));
  assert.ok(corrected?.sources?.some((source) => source.id === 'codexglue-defects' && source.url.includes('CodeXGLUE')));
  assert.ok(corrected?.sources?.some((source) => source.id === 'diversevul-shortcut-ref'));
  assert.deepEqual(upgraded.progress[old.id], progress);
  assert.ok(upgraded.archivedBundledCards?.some((card) => card.id === old.id));
  assert.ok(upgraded.cards.some((card) => card.id === 'cnnbase-001'));
  assert.ok(!upgraded.cards.some((card) => card.id === 'cnnbase-002'));
  const edited = { ...saved, explanation: '我自己修改的解释。' };
  const preserved = migrateStudyData({ ...legacy, cards: [edited] });
  assert.equal(preserved.cards.find((card) => card.id === old.id)?.explanation, edited.explanation);
});

test('revision 2 libraries gain the new batch and classification without restoring deleted cards', () => {
  const initial = createInitialData();
  const existing = initial.cards.find((card) => card.id === 'rag-001');
  assert.ok(existing);
  const oldCard = { ...existing, knowledgeArea: undefined, origin: undefined,
    sources: existing.sources?.filter((source) => source.id === 'security-rag') };
  const legacy = { ...initial, contentRevision: 2, cards: [oldCard], deletedCardIds: ['math-002'] };
  const upgraded = migrateStudyData(legacy);
  const rag = upgraded.cards.find((card) => card.id === 'rag-001');
  assert.equal(rag?.knowledgeArea, '07');
  assert.ok(rag?.sources?.some((source) => source.id === 'langchain-retrieval'));
  assert.ok(upgraded.cards.some((card) => card.id === 'math-001'));
  assert.ok(!upgraded.cards.some((card) => card.id === 'math-002'));
  assert.equal(upgraded.contentRevision, initial.contentRevision);
});

test('revision 4 merges unchanged cards while preserving their records and split progress', () => {
  const initial = createInitialData();
  const old = retired.cards as StudyCard[];
  const prerequisites = initial.cards.filter((card) => ['ai4sec-003', 'ai4sec-006', 'ai4sec-007', 'ai4sec-008'].includes(card.id));
  const progress = scheduleCard(undefined, 'good', Date.now());
  const legacy = { ...initial, contentRevision: 4, cards: [...prerequisites, ...old],
    progress: { 'eval-004': progress, 'eval-007': progress } };
  const upgraded = migrateStudyData(legacy);
  for (const id of ['eval-004', 'eval-007', 'ai4sec-020', 'phish-005']) {
    assert.ok(!upgraded.cards.some((card) => card.id === id));
    assert.ok(upgraded.archivedBundledCards?.some((card) => card.id === id));
  }
  assert.deepEqual(upgraded.progress['eval-004'], progress);
  assert.deepEqual(upgraded.progress['eval-007'], progress);
  assert.deepEqual(upgraded.progress['ai4sec-008'], progress);
  assert.ok(upgraded.archivedBundledCards?.some((card) => card.id === 'ai4sec-028'));
  assert.ok(!upgraded.cards.find((card) => card.id === 'ai4sec-028')?.question.includes('时间'));
  assert.ok(!upgraded.cards.some((card) => card.id === 'ember-009'));
});

test('revision 4 preserves edited or irreplaceable old cards', () => {
  const initial = createInitialData();
  const old = retired.cards as StudyCard[];
  const composite = old.find((card) => card.id === 'eval-004');
  const family = old.find((card) => card.id === 'ai4sec-028');
  assert.ok(composite && family);
  const changed = { ...family, answer: '我自己编辑的答案。' };
  const legacy = { ...initial, contentRevision: 4, cards: [composite, changed], deletedCardIds: ['ai4sec-006'] };
  const upgraded = migrateStudyData(legacy);
  assert.ok(upgraded.cards.some((card) => card.id === 'eval-004'));
  assert.equal(upgraded.cards.find((card) => card.id === family.id)?.answer, changed.answer);
  assert.ok(!upgraded.cards.some((card) => card.id === 'ai4sec-006'));
  assert.ok(!upgraded.archivedBundledCards?.some((card) => card.id === family.id));
});

test('revision 3 libraries gain reviewed provenance and the next batch while keeping progress', () => {
  const initial = createInitialData();
  const target = initial.cards.find((card) => card.id === 'fuzz-002');
  assert.ok(target);
  const oldCard = { ...target, origin: undefined, subtopic: undefined, knowledgePoint: undefined,
    questionType: undefined, sources: target.sources?.map((source) => ({
      ...source, title: 'Google OSS-Fuzz-gen 大模型生成模糊测试目标', url: 'https://github.com/google/oss-fuzz-gen',
    })) };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const legacy = { ...initial, contentRevision: 3, cards: [oldCard], deletedCardIds: ['cti-001'],
    progress: { [oldCard.id]: progress } };
  const upgraded = migrateStudyData(legacy);
  const updated = upgraded.cards.find((card) => card.id === oldCard.id);
  assert.deepEqual(upgraded.progress[oldCard.id], progress);
  assert.equal(updated?.origin, '自行整理');
  assert.equal(updated?.sources?.[0].title, 'LLVM libFuzzer：测试入口');
  assert.ok(upgraded.cards.some((card) => card.id === 'cti-002'));
  assert.ok(!upgraded.cards.some((card) => card.id === 'cti-001'));
});

test('revision 5 libraries add interview cards and keep deletions and learning progress', () => {
  const initial = createInitialData();
  const existing = initial.cards.find((card) => card.id === 'agentp-001');
  assert.ok(existing);
  const progress = scheduleCard(undefined, 'good', Date.now());
  const legacy = { ...initial, contentRevision: 5, cards: [existing],
    deletedCardIds: ['byte-interview-002'], progress: { [existing.id]: progress } };
  const upgraded = migrateStudyData(legacy);
  assert.equal(upgraded.contentRevision, initial.contentRevision);
  assert.deepEqual(upgraded.progress[existing.id], progress);
  assert.ok(upgraded.cards.some((card) => card.id === 'byte-interview-001'));
  assert.ok(!upgraded.cards.some((card) => card.id === 'byte-interview-002'));
  assert.ok(upgraded.cards.find((card) => card.id === 'byte-interview-001')?.sources?.some((source) => source.id === 'agent-skills-ref'));
});

test('revision 6 updates the unedited label question while preserving progress and user edits', () => {
  const initial = createInitialData();
  const old = retiredV6.cards.find((card) => card.id === 'ember-007') as StudyCard;
  const oldPrediction = retiredV6.cards.find((card) => card.id === 'isof-008') as StudyCard;
  assert.ok(old && oldPrediction);
  const progress = scheduleCard(undefined, 'good', Date.now());
  const legacy = { ...initial, contentRevision: 6, cards: [old, oldPrediction],
    deletedCardIds: ['sysmon-002'], progress: { [old.id]: progress } };
  const upgraded = migrateStudyData(legacy);
  assert.equal(upgraded.cards.find((card) => card.id === old.id)?.question, '为什么标签未知的文件样本不能当作良性样本？');
  assert.ok(upgraded.archivedBundledCards?.some((card) => card.id === old.id && card.question === old.question));
  assert.match(upgraded.cards.find((card) => card.id === oldPrediction.id)?.answer ?? '', /内点（inlier）/);
  assert.ok(upgraded.archivedBundledCards?.some((card) => card.id === oldPrediction.id && card.answer === oldPrediction.answer));
  assert.deepEqual(upgraded.progress[old.id], progress);
  assert.ok(upgraded.cards.some((card) => card.id === 'sysmon-001'));
  assert.ok(!upgraded.cards.some((card) => card.id === 'sysmon-002'));

  const customized = { ...old, answer: '我修改过的答案。' };
  const edited = migrateStudyData({ ...legacy, cards: [customized] });
  assert.equal(edited.cards.find((card) => card.id === old.id)?.answer, customized.answer);
  assert.ok(!edited.archivedBundledCards?.some((card) => card.id === old.id));
});

test('revision 7 adds reviewed cards and references without changing user edits or progress', () => {
  const initial = createInitialData();
  const rag = initial.cards.find((card) => card.id === 'rag-002');
  const existing = initial.cards.find((card) => card.id === 'cic-009');
  assert.ok(rag && existing);
  const oldRag = { ...rag, origin: undefined, subtopic: undefined, knowledgePoint: undefined,
    questionType: undefined, sources: rag.sources?.filter((source) => source.id !== 'rag-review-doc') };
  const edited = { ...existing, answer: '我编辑过的答案。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const legacy = { ...initial, contentRevision: 7, cards: [oldRag, edited],
    deletedCardIds: ['sigma-002'], progress: { [rag.id]: progress } };
  const upgraded = migrateStudyData(legacy);
  assert.equal(upgraded.contentRevision, initial.contentRevision);
  assert.deepEqual(upgraded.progress[rag.id], progress);
  assert.ok(upgraded.cards.find((card) => card.id === rag.id)?.sources?.some((source) => source.id === 'rag-review-doc'));
  assert.equal(upgraded.cards.find((card) => card.id === existing.id)?.answer, edited.answer);
  assert.ok(upgraded.cards.some((card) => card.id === 'sigma-001'));
  assert.ok(!upgraded.cards.some((card) => card.id === 'sigma-002'));
  assert.ok(upgraded.cards.some((card) => card.id === 'companyrag-001'));
});

test('revision 8 merges unedited duplicates while preserving progress and customized cards', () => {
  const initial = createInitialData();
  const retiredCards = retiredV8.cards as StudyCard[];
  const unit = retiredCards.find((card) => card.id === 'isof-005');
  const baseline = retiredCards.find((card) => card.id === 'isof-009');
  const targets = initial.cards.filter((card) => ['ai4sec-011', 'ai4sec-014'].includes(card.id));
  assert.ok(unit && baseline && targets.length === 2);
  const progress = scheduleCard(undefined, 'good', Date.now());
  const legacy = { ...initial, contentRevision: 8, cards: [...targets, unit, baseline],
    progress: { [unit.id]: progress } };
  const upgraded = migrateStudyData(legacy);
  assert.equal(upgraded.contentRevision, initial.contentRevision);
  for (const card of [unit, baseline]) {
    assert.ok(!upgraded.cards.some((item) => item.id === card.id));
    assert.ok(upgraded.archivedBundledCards?.some((item) => item.id === card.id));
  }
  assert.deepEqual(upgraded.progress['ai4sec-011'], progress);
  assert.deepEqual(upgraded.progress[unit.id], progress);
  assert.ok(upgraded.cards.find((card) => card.id === 'ai4sec-011')?.sources?.some((source) => source.sourceCardId === unit.id));

  const edited = { ...unit, answer: '我编辑过的答案。' };
  const customized = migrateStudyData({ ...legacy, cards: [...targets, edited] });
  assert.equal(customized.cards.find((card) => card.id === unit.id)?.answer, edited.answer);
  assert.ok(!customized.archivedBundledCards?.some((card) => card.id === unit.id));

  const missingTarget = migrateStudyData({ ...legacy, cards: [unit], deletedCardIds: ['ai4sec-011'] });
  assert.ok(missingTarget.cards.some((card) => card.id === unit.id));
  assert.ok(!missingTarget.cards.some((card) => card.id === 'ai4sec-011'));
});

test('revision 9 merges paired evaluation cards only when the target is unchanged and present', () => {
  const initial = createInitialData();
  const old = retiredV9.cards.find((card) => card.id === 'prime-005') as StudyCard;
  const target = initial.cards.find((card) => card.id === 'prime-004');
  assert.ok(old && target);
  const progress = scheduleCard(undefined, 'good', Date.now());
  const legacy = { ...initial, contentRevision: 9, cards: [old, target], progress: { [old.id]: progress } };
  const upgraded = migrateStudyData(legacy);
  assert.equal(upgraded.contentRevision, initial.contentRevision);
  assert.ok(!upgraded.cards.some((card) => card.id === old.id));
  assert.ok(upgraded.archivedBundledCards?.some((card) => card.id === old.id));
  assert.deepEqual(upgraded.progress[target.id], progress);
  assert.deepEqual(upgraded.progress[old.id], progress);
  assert.ok(upgraded.cards.find((card) => card.id === target.id)?.sources?.some((source) => source.sourceCardId === old.id));

  const edited = { ...old, answer: '我自己的成对评估答案。' };
  const withEdit = migrateStudyData({ ...legacy, cards: [edited, target] });
  assert.equal(withEdit.cards.find((card) => card.id === old.id)?.answer, edited.answer);
  const withMissingTarget = migrateStudyData({ ...legacy, cards: [old], deletedCardIds: [target.id] });
  assert.ok(withMissingTarget.cards.some((card) => card.id === old.id));
  assert.ok(!withMissingTarget.cards.some((card) => card.id === target.id));
});

test('revision 10 adds the new batch and reviewed references while preserving edits and progress', () => {
  const initial = createInitialData();
  const evaluation = initial.cards.find((card) => card.id === 'eval-002');
  const other = initial.cards.find((card) => card.id === 'eval-015');
  assert.ok(evaluation && other);
  const oldEvaluation = { ...evaluation, origin: undefined, subtopic: undefined, knowledgePoint: undefined,
    questionType: undefined, sources: evaluation.sources?.map((source) => ({
      ...source, url: 'https://scikit-learn.org/stable/common_pitfalls.html',
    })) };
  const edited = { ...other, answer: '我编辑过的答案。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const legacy = { ...initial, contentRevision: 10, cards: [oldEvaluation, edited],
    deletedCardIds: ['faiss-002'], progress: { [evaluation.id]: progress } };
  const upgraded = migrateStudyData(legacy);
  assert.equal(upgraded.contentRevision, initial.contentRevision);
  assert.deepEqual(upgraded.progress[evaluation.id], progress);
  assert.equal(upgraded.cards.find((card) => card.id === evaluation.id)?.knowledgePoint, '交叉验证流水线');
  assert.ok(upgraded.cards.find((card) => card.id === evaluation.id)?.sources?.some((source) => source.url.endsWith('#data-leakage')));
  assert.equal(upgraded.cards.find((card) => card.id === other.id)?.answer, edited.answer);
  assert.ok(upgraded.cards.some((card) => card.id === 'faiss-001'));
  assert.ok(!upgraded.cards.some((card) => card.id === 'faiss-002'));
});

test('revision 11 merges unedited duplicate flow cards without losing user work', () => {
  const initial = createInitialData();
  const old = retiredV11.cards.find((card) => card.id === 'zeek-006') as StudyCard;
  const target = initial.cards.find((card) => card.id === 'cic-007');
  assert.ok(old && target);
  const progress = scheduleCard(undefined, 'good', Date.now());
  const legacy = { ...initial, contentRevision: 11, cards: [old, target], progress: { [old.id]: progress } };
  const upgraded = migrateStudyData(legacy);
  assert.equal(upgraded.contentRevision, initial.contentRevision);
  assert.ok(!upgraded.cards.some((card) => card.id === old.id));
  assert.ok(upgraded.archivedBundledCards?.some((card) => card.id === old.id));
  assert.deepEqual(upgraded.progress[target.id], progress);
  assert.deepEqual(upgraded.progress[old.id], progress);
  assert.ok(upgraded.cards.find((card) => card.id === target.id)?.sources?.some((source) => source.sourceCardId === old.id));

  const edited = { ...old, answer: '我自己修改过的答案。' };
  const customized = migrateStudyData({ ...legacy, cards: [edited, target] });
  assert.equal(customized.cards.find((card) => card.id === old.id)?.answer, edited.answer);
  const missingTarget = migrateStudyData({ ...legacy, cards: [old], deletedCardIds: [target.id] });
  assert.ok(missingTarget.cards.some((card) => card.id === old.id));
  assert.ok(!missingTarget.cards.some((card) => card.id === target.id));
  const editedTarget = { ...target, answer: '我修改过的完整流统计答案。' };
  assert.ok(migrateStudyData({ ...legacy, cards: [old, editedTarget] }).cards.some((card) => card.id === old.id));
});

test('revision 12 adds new sources and cards while preserving edits, deletions, and progress', () => {
  const initial = createInitialData();
  const lora = initial.cards.find((card) => card.id === 'lora-001');
  const phishing = initial.cards.find((card) => card.id === 'phish-003');
  assert.ok(lora && phishing);
  const oldLora = { ...lora, tags: lora.tags?.filter((tag) => !['公开面经', '旷视', '腾讯'].includes(tag)),
    sources: lora.sources?.filter((source) => !['company-megvii', 'company-tencent'].includes(source.id)) };
  const edited = { ...phishing, answer: '我自己修改过的网址特征答案。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const legacy = { ...initial, contentRevision: 12, cards: [oldLora, edited],
    deletedCardIds: ['audio-002'], progress: { [lora.id]: progress } };
  const upgraded = migrateStudyData(legacy);
  assert.equal(upgraded.contentRevision, initial.contentRevision);
  assert.deepEqual(upgraded.progress[lora.id], progress);
  assert.equal(upgraded.cards.find((card) => card.id === phishing.id)?.answer, edited.answer);
  assert.ok(upgraded.cards.find((card) => card.id === lora.id)?.sources?.some((source) => source.id === 'company-megvii'));
  assert.ok(upgraded.cards.some((card) => card.id === 'audio-001'));
  assert.ok(!upgraded.cards.some((card) => card.id === 'audio-002'));
});

test('revision 13 adds the next batch and reviewed provenance without losing user data', () => {
  const initial = createInitialData();
  const norm = initial.cards.find((card) => card.id === 'opt-002');
  const code = initial.cards.find((card) => card.id === 'code-003');
  assert.ok(norm && code);
  const oldCode = { ...code, origin: undefined, subtopic: undefined, knowledgePoint: undefined,
    questionType: undefined, sources: code.sources?.filter((source) => source.id !== 'llm4vuln-paper-ref') };
  const editedNorm = { ...norm, answer: '我自己修改过的归一化答案。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const legacy = { ...initial, contentRevision: 13, cards: [oldCode, editedNorm],
    deletedCardIds: ['attnint-002'], progress: { [code.id]: progress } };
  const upgraded = migrateStudyData(legacy);
  assert.equal(upgraded.contentRevision, initial.contentRevision);
  assert.deepEqual(upgraded.progress[code.id], progress);
  assert.equal(upgraded.cards.find((card) => card.id === norm.id)?.answer, editedNorm.answer);
  assert.ok(upgraded.cards.find((card) => card.id === code.id)?.sources?.some((source) => source.id === 'llm4vuln-paper-ref'));
  assert.ok(upgraded.cards.some((card) => card.id === 'attnint-001'));
  assert.ok(!upgraded.cards.some((card) => card.id === 'attnint-002'));
});

test('revision 14 adds vision interview references and preserves existing study data', () => {
  const initial = createInitialData();
  const metric = initial.cards.find((card) => card.id === 'metric-002');
  const nms = initial.cards.find((card) => card.id === 'viseval-002');
  assert.ok(metric && nms);
  const oldMetric = { ...metric, tags: metric.tags?.filter((tag) => !['公开面经', '字节'].includes(tag)),
    sources: metric.sources?.filter((source) => source.id !== 'company-bytedance') };
  const editedNms = { ...nms, answer: '我自己修改过的 NMS 答案。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const legacy = { ...initial, contentRevision: 14, cards: [oldMetric, editedNms],
    deletedCardIds: ['cvint-005'], progress: { [metric.id]: progress } };
  const upgraded = migrateStudyData(legacy);
  assert.equal(upgraded.contentRevision, initial.contentRevision);
  assert.deepEqual(upgraded.progress[metric.id], progress);
  assert.equal(upgraded.cards.find((card) => card.id === nms.id)?.answer, editedNms.answer);
  assert.ok(upgraded.cards.find((card) => card.id === metric.id)?.sources?.some((source) => source.id === 'company-bytedance'));
  assert.ok(upgraded.cards.find((card) => card.id === 'cvint-001')?.sources?.some((source) => source.id === 'company-horizon'));
  assert.ok(!upgraded.cards.some((card) => card.id === 'cvint-005'));
});

test('revision 15 adds retrieval material and interview sources without overwriting user changes', () => {
  const initial = createInitialData();
  const retrieval = initial.cards.find((card) => card.id === 'retrieve-007');
  const metric = initial.cards.find((card) => card.id === 'metric-007');
  assert.ok(retrieval && metric);
  const oldRetrieval = { ...retrieval, tags: retrieval.tags?.filter((tag) => !['公开面经', '阿里'].includes(tag)),
    sources: retrieval.sources?.filter((source) => source.id !== 'company-alibaba') };
  const editedMetric = { ...metric, answer: '我自己修改过的 ROC 答案。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const legacy = { ...initial, contentRevision: 15, cards: [oldRetrieval, editedMetric],
    deletedCardIds: ['faissdeep-001'], progress: { [retrieval.id]: progress } };
  const upgraded = migrateStudyData(legacy);
  assert.equal(upgraded.contentRevision, initial.contentRevision);
  assert.deepEqual(upgraded.progress[retrieval.id], progress);
  assert.equal(upgraded.cards.find((card) => card.id === metric.id)?.answer, editedMetric.answer);
  assert.ok(upgraded.cards.find((card) => card.id === retrieval.id)?.sources?.some((source) => source.id === 'company-alibaba'));
  assert.ok(upgraded.cards.some((card) => card.id === 'lexrank-001'));
  assert.ok(!upgraded.cards.some((card) => card.id === 'faissdeep-001'));
});

test('revision 16 adds interview sources and new cards while preserving learning data', () => {
  const initial = createInitialData();
  const lora = initial.cards.find((card) => card.id === 'lora-004');
  const newCard = initial.cards.find((card) => card.id === 'finetuneint-003');
  assert.ok(lora && newCard);
  const oldLora = { ...lora, sources: lora.sources?.filter((source) => source.id !== 'company-ant') };
  const edited = { ...initial.cards[0], answer: '我编辑过的答案。' };
  const progress = scheduleCard(undefined, 'good', Date.now());
  const legacy = { ...initial, contentRevision: 16, cards: [oldLora, edited],
    deletedCardIds: ['finetuneint-002'], progress: { [lora.id]: progress } };
  const upgraded = migrateStudyData(legacy);
  assert.equal(upgraded.contentRevision, initial.contentRevision);
  assert.deepEqual(upgraded.progress[lora.id], progress);
  assert.equal(upgraded.cards.find((card) => card.id === edited.id)?.answer, edited.answer);
  assert.ok(upgraded.cards.find((card) => card.id === lora.id)?.sources?.some((source) => source.id === 'company-ant'));
  assert.ok(upgraded.cards.some((card) => card.id === newCard.id));
  assert.ok(!upgraded.cards.some((card) => card.id === 'finetuneint-002'));
});

test('revision 17 updates an unedited question while preserving progress and user edits', () => {
  const initial = createInitialData();
  const old = retiredV17.cards.find((card) => card.id === 'prime-007') as StudyCard;
  const oldTaint = retiredV17.cards.find((card) => card.id === 'semtaint-006') as StudyCard;
  assert.ok(old && oldTaint);
  const progress = scheduleCard(undefined, 'good', Date.now());
  const savedTaint = { ...oldTaint, sources: [...(oldTaint.sources ?? []), {
    id: 'personal-reference', title: '个人资料', url: 'https://example.com/notes', type: '个人资料',
    evidence: 'application' as const, sourceCardId: oldTaint.id,
  }] };
  const legacy = { ...initial, contentRevision: 17, cards: [old, savedTaint], progress: { [old.id]: progress },
    deletedCardIds: ['cfg-002'] };
  const upgraded = migrateStudyData(legacy);
  assert.equal(upgraded.contentRevision, initial.contentRevision);
  assert.deepEqual(upgraded.progress[old.id], progress);
  assert.match(upgraded.cards.find((card) => card.id === old.id)?.question ?? '', /预测时无法获得/);
  assert.ok(upgraded.archivedBundledCards?.some((card) => card.id === old.id && card.question === old.question));
  assert.match(upgraded.cards.find((card) => card.id === oldTaint.id)?.explanation ?? '', /净化器/);
  assert.ok(upgraded.cards.find((card) => card.id === oldTaint.id)?.sources?.some((source) => source.id === 'personal-reference'));
  assert.ok(upgraded.cards.some((card) => card.id === 'cfg-001'));
  assert.ok(!upgraded.cards.some((card) => card.id === 'cfg-002'));

  const edited = { ...old, answer: '我自己的答案。' };
  const preserved = migrateStudyData({ ...legacy, cards: [edited] });
  assert.equal(preserved.cards.find((card) => card.id === old.id)?.answer, edited.answer);
  assert.equal(preserved.cards.find((card) => card.id === old.id)?.question, old.question);
  assert.ok(!preserved.archivedBundledCards?.some((card) => card.id === old.id));
});

test('revision 18 merges the duplicate only when both cards can be preserved safely', () => {
  const initial = createInitialData();
  const old = retiredV18.cards.find((card) => card.id === 'ai4sec-004') as StudyCard;
  const target = initial.cards.find((card) => card.id === 'eval-010');
  assert.ok(old && target);
  const prior = scheduleCard(undefined, 'good', Date.now());
  const saved = { ...old, sources: [...(old.sources ?? []), {
    id: 'personal-reference', title: '个人资料', url: 'https://example.com/notes', type: '个人资料',
    evidence: 'application' as const, sourceCardId: old.id,
  }] };
  const legacy = { ...initial, contentRevision: 18, cards: [saved, target], progress: { [old.id]: prior },
    deletedCardIds: ['mlinear-001'] };
  const upgraded = migrateStudyData(legacy);
  assert.equal(upgraded.contentRevision, initial.contentRevision);
  assert.ok(!upgraded.cards.some((card) => card.id === old.id));
  assert.ok(upgraded.archivedBundledCards?.some((card) => card.id === old.id));
  assert.deepEqual(upgraded.progress[target.id], prior);
  assert.ok(upgraded.cards.find((card) => card.id === target.id)?.sources?.some((source) => source.id === 'personal-reference'));
  assert.ok(upgraded.cards.find((card) => card.id === target.id)?.alternateQuestions?.includes(old.question));
  assert.ok(upgraded.cards.some((card) => card.id === 'nlpseq-001'));
  assert.ok(!upgraded.cards.some((card) => card.id === 'mlinear-001'));

  const edited = { ...saved, answer: '我自己的答案。' };
  const preserved = migrateStudyData({ ...legacy, cards: [edited, target] });
  assert.equal(preserved.cards.find((card) => card.id === old.id)?.answer, edited.answer);
  const missingTarget = migrateStudyData({ ...legacy, cards: [saved], deletedCardIds: [target.id] });
  assert.ok(missingTarget.cards.some((card) => card.id === old.id));
  assert.ok(!missingTarget.cards.some((card) => card.id === target.id));
});

test('revision 19 adds interviews and sources while preserving edits, deletions and progress', () => {
  const initial = createInitialData();
  const existing = initial.cards.find((card) => card.id === 'sysmon-002');
  const editable = initial.cards.find((card) => card.id === 'weakness-002');
  assert.ok(existing && editable);
  const saved = { ...existing, sources: existing.sources?.filter((source) => source.id !== 'company-tencent') };
  const edited = { ...editable, answer: '我自己修改过的答案。' };
  const oldMalware = retiredV19.cards.find((card) => card.id === 'ai4sec-029') as StudyCard;
  assert.ok(oldMalware);
  const progress = scheduleCard(undefined, 'good', Date.now());
  const legacy = { ...initial, contentRevision: 19, cards: [saved, edited, oldMalware],
    progress: { [existing.id]: progress, [oldMalware.id]: progress }, deletedCardIds: ['secint-code-001'] };
  const upgraded = migrateStudyData(legacy);
  assert.equal(upgraded.contentRevision, initial.contentRevision);
  assert.deepEqual(upgraded.progress[existing.id], progress);
  assert.equal(upgraded.cards.find((card) => card.id === editable.id)?.answer, edited.answer);
  assert.ok(upgraded.cards.find((card) => card.id === existing.id)?.sources?.some((source) => source.id === 'company-tencent'));
  assert.ok(upgraded.cards.find((card) => card.id === existing.id)?.sources?.some((source) => source.id === 'windows-sysmon'));
  assert.ok(upgraded.cards.some((card) => card.id === 'secint-code-002'));
  assert.ok(!upgraded.cards.some((card) => card.id === 'secint-code-001'));
  const updatedMalware = upgraded.cards.find((card) => card.id === oldMalware.id);
  assert.match(updatedMalware?.answer ?? '', /常在隔离环境/);
  assert.deepEqual(upgraded.progress[oldMalware.id], progress);
  assert.ok(upgraded.archivedBundledCards?.some((card) => card.id === oldMalware.id && card.answer === oldMalware.answer));
  assert.ok(updatedMalware?.sources?.some((source) => source.id === 'nist-malware-analysis'));
  const customMalware = { ...oldMalware, answer: '我对动态分析的笔记。' };
  const preserved = migrateStudyData({ ...legacy, cards: [customMalware] });
  assert.equal(preserved.cards.find((card) => card.id === oldMalware.id)?.answer, customMalware.answer);
});

test('revision 20 merges duplicate scenarios only when targets and user edits are safe', () => {
  const initial = createInitialData();
  const retired = retiredV20.cards as StudyCard[];
  const targets = initial.cards.filter((card) => ['eval-010', 'eval-009', 'eval-013', 'prime-007', 'ai4sec-005', 'ai4sec-032'].includes(card.id));
  assert.equal(targets.length, 6);
  const first = retired.find((card) => card.id === 'phish-004');
  const second = retired.find((card) => card.id === 'phish-009');
  assert.ok(first && second);
  const progress = scheduleCard(undefined, 'good', Date.now());
  const secondProgress = scheduleCard(undefined, 'hard', Date.now());
  const withPersonalSource = { ...first, sources: [...(first.sources ?? []), {
    id: 'personal-reference', title: '个人资料', url: 'https://example.com/notes', type: '个人资料',
    evidence: 'application' as const, sourceCardId: first.id,
  }] };
  const saved = retired.map((card) => card.id === first.id ? withPersonalSource : card);
  const legacy = { ...initial, contentRevision: 20, cards: [...targets, ...saved],
    progress: { [first.id]: progress, [second.id]: secondProgress }, deletedCardIds: ['visphish-002'] };
  const upgraded = migrateStudyData(legacy);
  assert.equal(upgraded.contentRevision, initial.contentRevision);
  for (const card of retired) {
    assert.ok(!upgraded.cards.some((item) => item.id === card.id));
    assert.ok(upgraded.archivedBundledCards?.some((item) => item.id === card.id));
  }
  assert.deepEqual(upgraded.progress[first.id], progress);
  assert.deepEqual(upgraded.progress[second.id], secondProgress);
  assert.deepEqual(upgraded.progress['eval-010'], progress);
  assert.ok(upgraded.cards.find((card) => card.id === 'eval-010')?.sources?.some((source) => source.id === 'personal-reference'));
  assert.ok(upgraded.cards.some((card) => card.id === 'visphish-001'));
  assert.ok(!upgraded.cards.some((card) => card.id === 'visphish-002'));

  const edited = { ...first, answer: '我自己修改的分组说明。' };
  const preserved = migrateStudyData({ ...legacy, cards: [...targets, edited] });
  assert.equal(preserved.cards.find((card) => card.id === first.id)?.answer, edited.answer);
  const reclassified: StudyCard = { ...first, knowledgeArea: '07' };
  const preservedClassification = migrateStudyData({ ...legacy, cards: [...targets, reclassified] });
  assert.equal(preservedClassification.cards.find((card) => card.id === first.id)?.knowledgeArea, '07');
  const annotated = { ...first, alternateQuestions: ['我补充的问法'] };
  const preservedAnnotation = migrateStudyData({ ...legacy, cards: [...targets, annotated] });
  assert.deepEqual(preservedAnnotation.cards.find((card) => card.id === first.id)?.alternateQuestions, ['我补充的问法']);
  const missing = migrateStudyData({ ...legacy, cards: [withPersonalSource], deletedCardIds: ['eval-010'] });
  assert.ok(missing.cards.some((card) => card.id === first.id));
  assert.ok(!missing.cards.some((card) => card.id === 'eval-010'));
});

test('revision 21 preserves records and personal sources when splitting and merging cards', () => {
  const initial = createInitialData();
  const composite = retiredV21.cards.find((card) => card.id === 'ai4sec-034') as StudyCard;
  const duplicate = retiredV21.cards.find((card) => card.id === 'isof-012') as StudyCard;
  assert.ok(composite && duplicate);
  const targets = initial.cards.filter((card) =>
    ['rag-002', 'rag-009', 'ai4sec-039', 'eval-016'].includes(card.id));
  assert.equal(targets.length, 4);
  const progress = scheduleCard(undefined, 'good', Date.now());
  const personalSource = {
    id: 'personal-rag-note', title: '个人资料', url: 'https://example.com/notes', type: '个人资料',
    evidence: 'application' as const, sourceCardId: composite.id,
  };
  const oldComposite = { ...composite, sources: [...(composite.sources ?? []), personalSource] };
  const legacy = { ...initial, contentRevision: 21, cards: [...targets, oldComposite, duplicate],
    progress: { [composite.id]: progress, [duplicate.id]: progress }, deletedCardIds: ['osq-002'] };
  const migrated = migrateStudyData(legacy);
  assert.equal(migrated.contentRevision, initial.contentRevision);
  for (const old of [composite, duplicate]) {
    assert.ok(!migrated.cards.some((card) => card.id === old.id));
    assert.ok(migrated.archivedBundledCards?.some((card) => card.id === old.id));
    assert.deepEqual(migrated.progress[old.id], progress);
  }
  assert.deepEqual(migrated.progress['eval-016'], progress);
  for (const id of ['rag-002', 'rag-009', 'ai4sec-039']) {
    assert.ok(migrated.cards.find((card) => card.id === id)?.sources?.some((source) => source.id === personalSource.id));
  }
  assert.ok(migrated.cards.some((card) => card.id === 'osq-001'));
  assert.ok(!migrated.cards.some((card) => card.id === 'osq-002'));

  const edited = { ...oldComposite, answer: '我自己写的复习笔记。' };
  const preserved = migrateStudyData({ ...legacy, cards: [...targets, edited] });
  assert.equal(preserved.cards.find((card) => card.id === composite.id)?.answer, edited.answer);
  const missing = migrateStudyData({ ...legacy, cards: [oldComposite, ...targets.filter((card) => card.id !== 'rag-009')],
    deletedCardIds: ['rag-009'] });
  assert.ok(missing.cards.some((card) => card.id === composite.id));
  assert.ok(!missing.cards.some((card) => card.id === 'rag-009'));
});

test('revision 22 updates unedited definitions and merges preprocessing without losing study data', () => {
  const initial = createInitialData();
  const old = retiredV22.cards as StudyCard[];
  const preprocessing = old.find((card) => card.id === 'ai4sec-010');
  const first = old.find((card) => card.id === 'ai4sec-001');
  const target = initial.cards.find((card) => card.id === 'eval-002');
  assert.ok(preprocessing && first && target);
  const progress = scheduleCard(undefined, 'good', Date.now());
  const personalSource = {
    id: 'personal-preprocessing', title: '我的资料', url: 'https://example.com/preprocessing', type: '个人资料',
    evidence: 'application' as const, sourceCardId: preprocessing.id,
  };
  const saved = old.map((card) => card.id === preprocessing.id
    ? { ...card, sources: [...(card.sources ?? []), personalSource] } : card);
  const legacy = { ...initial, contentRevision: 22, cards: [target, ...saved],
    progress: { [preprocessing.id]: progress, [first.id]: progress }, deletedCardIds: ['loader-002'] };
  const migrated = migrateStudyData(legacy);
  assert.equal(migrated.contentRevision, initial.contentRevision);
  for (const id of ['ai4sec-001', 'ai4sec-009', 'ai4sec-013']) {
    assert.ok(migrated.archivedBundledCards?.some((card) => card.id === id));
    assert.equal(migrated.cards.find((card) => card.id === id)?.question,
      initial.cards.find((card) => card.id === id)?.question);
  }
  assert.ok(!migrated.cards.some((card) => card.id === preprocessing.id));
  assert.ok(migrated.archivedBundledCards?.some((card) => card.id === preprocessing.id));
  assert.deepEqual(migrated.progress[preprocessing.id], progress);
  assert.deepEqual(migrated.progress[target.id], progress);
  assert.deepEqual(migrated.progress[first.id], progress);
  assert.ok(migrated.cards.find((card) => card.id === target.id)?.sources?.some((source) => source.id === personalSource.id));
  assert.ok(migrated.cards.some((card) => card.id === 'loader-001'));
  assert.ok(!migrated.cards.some((card) => card.id === 'loader-002'));

  const edited = { ...first, answer: '我自己修改的定义。' };
  const preserved = migrateStudyData({ ...legacy, cards: [target, edited] });
  assert.equal(preserved.cards.find((card) => card.id === first.id)?.answer, edited.answer);
  const missing = migrateStudyData({ ...legacy, cards: [preprocessing], deletedCardIds: ['eval-002'] });
  assert.ok(missing.cards.some((card) => card.id === preprocessing.id));
  assert.ok(!missing.cards.some((card) => card.id === target.id));
});

test('revision 23 preserves progress and sources when splitting the fuzzing experiment question', () => {
  const initial = createInitialData();
  const composite = retiredV23.cards.find((card) => card.id === 'fuzz-012') as StudyCard;
  assert.ok(composite);
  const ids = ['fuzz-004', 'fuzz-006', 'fuzz-007'];
  const targets = initial.cards.filter((card) => ids.includes(card.id)).map((card) => ({
    ...card, sources: card.sources?.filter((source) => source.sourceCardId !== composite.id),
  }));
  assert.equal(targets.length, 3);
  const progress = scheduleCard(undefined, 'good', Date.now());
  const personalSource = {
    id: 'personal-fuzz-note', title: '个人笔记', url: 'https://example.com/fuzzing', type: '个人资料',
    evidence: 'application' as const, sourceCardId: composite.id,
  };
  const saved = { ...composite, sources: [...(composite.sources ?? []), personalSource] };
  const legacy = { ...initial, contentRevision: 23, cards: [...targets, saved],
    progress: { [composite.id]: progress }, deletedCardIds: ['aflint-002'] };
  const migrated = migrateStudyData(legacy);
  assert.equal(migrated.contentRevision, initial.contentRevision);
  assert.ok(!migrated.cards.some((card) => card.id === composite.id));
  assert.ok(migrated.archivedBundledCards?.some((card) => card.id === composite.id));
  assert.deepEqual(migrated.progress[composite.id], progress);
  for (const id of ids) {
    assert.ok(migrated.cards.find((card) => card.id === id)?.sources?.some((source) => source.id === personalSource.id));
    assert.equal(migrated.progress[id], undefined);
  }
  assert.ok(migrated.cards.some((card) => card.id === 'aflint-001'));
  assert.ok(!migrated.cards.some((card) => card.id === 'aflint-002'));

  const edited = { ...saved, answer: '我自己整理的流程。' };
  const preserved = migrateStudyData({ ...legacy, cards: [...targets, edited] });
  assert.equal(preserved.cards.find((card) => card.id === composite.id)?.answer, edited.answer);
  const missing = migrateStudyData({ ...legacy, cards: [saved, ...targets.filter((card) => card.id !== 'fuzz-006')],
    deletedCardIds: ['fuzz-006'] });
  assert.ok(missing.cards.some((card) => card.id === composite.id));
  assert.ok(!missing.cards.some((card) => card.id === 'fuzz-006'));

  const review = retiredV23.cards.find((card) => card.id === 'fuzz-010') as StudyCard;
  assert.ok(review);
  const reviewIds = ['fuzz-005', 'lfuzz-005', 'lfuzz-006'];
  const reviewTargets = initial.cards.filter((card) => reviewIds.includes(card.id)).map((card) => ({
    ...card, sources: card.sources?.filter((source) => source.sourceCardId !== review.id),
  }));
  assert.equal(reviewTargets.length, 3);
  const migratedReview = migrateStudyData({ ...legacy, cards: [...reviewTargets, review],
    progress: { [review.id]: progress }, deletedCardIds: [] });
  assert.ok(!migratedReview.cards.some((card) => card.id === review.id));
  assert.ok(migratedReview.archivedBundledCards?.some((card) => card.id === review.id));
  assert.deepEqual(migratedReview.progress[review.id], progress);
  const changedTarget = { ...reviewTargets[0], answer: '我的修改。' };
  const preservedReview = migrateStudyData({ ...legacy, cards: [review, changedTarget, ...reviewTargets.slice(1)] });
  assert.ok(preservedReview.cards.some((card) => card.id === review.id));
});
