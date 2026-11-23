import assert from 'node:assert/strict';
import test from 'node:test';
import { aliases, questionBanks, splits } from '../src/data/banks';
import { createInitialData } from '../src/data/seed';
import { getStudyQueue, matchesScope, publicInterviewScope } from '../src/lib/scheduler';

test('new statistics, planning and security cards retain topics and sources', () => {
  const data = createInitialData();
  for (const [id, sourceId, area, topic, query, reference] of [
    ['mlecore-006', 'maximum-likelihood-foundations', '01', 'math-statistics', 'k 次成功', 'statlect.com/fundamentals-of-statistics/maximum-likelihood'],
    ['limitstat-001', 'sample-mean-limit-theorems', '01', 'math-statistics', '大数定律和中心极限定理', 'central_limit_theorem.php'],
    ['graphplan-006', 'graphplan-planning-graphs', '08', 'agent-design', '没有被 Graphplan 的规则标记', 'graphplan.pdf'],
    ['zeekdns-005', 'zeek-dns-transaction-fields', '10', 'security-telemetry', 'TTLs 如何与 answers 对应', 'zeek/blob/v7.2.1/scripts/base/protocols/dns/main.zeek'],
    ['winproc-005', 'windows-4688-process-audit', '10', 'security-telemetry', '引入 Target Subject 的目的', 'event-4688'],
    ['tram-002', 'mitre-tram-attack-mapping', '15', 'threat-intelligence', '是否覆盖 ATT&CK 的全部技术', 'f29793d8d665f7f552898696e00065ef24a29a20'],
    ['caldera-004', 'caldera-emulation-fundamentals', '16', 'security-operations', 'planner 的主要职责', '/5.0.0/Basic-Usage.html'],
    ['honeynist-002', 'nist-honeypot-detection', '11', 'network-threats', '能否替代入侵检测和防御系统', 'nistspecialpublication800-94.pdf'],
    ['aflnet-005', 'aflnet-protocol-state-fuzzing', '14', 'fuzzing', '未启用 -E 状态感知模式', '96032f86d0005dfeeb41ea7b31103f1d1ff8f168'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.knowledgeArea, area, id);
    assert.equal(card.topic, topic, id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
  assert.ok(data.cards.find((item) => item.id === 'limitstat-001')?.sources?.some((source) => source.id === 'probabilitycourse-lln'));
});

test('new retrieval, evaluation and traffic cards keep their topics and evidence', () => {
  const data = createInitialData();
  for (const [id, sourceId, area, topic, query, reference] of [
    ['qdrant-005', 'qdrant-client-retrieval-practice', '07', 'rag-basics', '同一层未指定的 payload 键', 'qdrant-client/blob/v1.15.1'],
    ['cbpe-003', 'cbpe-unlabeled-performance', '17', 'data-evaluation', '对预估真阳性数贡献多少', 'nannyml/blob/v0.13.1'],
    ['geval-004', 'geval-llm-evaluation', '09', 'agent-engineering', '离散评分的概率得到更细的分数', '2303.16634v3'],
    ['alce-003', 'alce-citation-evaluation', '07', 'rag-basics', '没有任何引用的陈述', '2305.14627v2'],
    ['ares-004', 'ares-rag-evaluation', '07', 'rag-basics', '结合了哪两类评估数据', '2311.09476v2'],
    ['dinov2-004', 'dinov2-visual-self-supervision', '18', 'computer-vision', '学生和教师的输入掩码', '2304.07193v2'],
    ['vpn2016-003', 'iscxvpn2016-traffic-dataset', '10', 'security-telemetry', '哪种连接方式', 'unb.ca/cic/datasets/vpn.html'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.knowledgeArea, area, id);
    assert.equal(card.topic, topic, id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
});

test('new computing and Python cards retain searchable sources and topics', () => {
  const data = createInitialData();
  for (const [id, sourceId, area, topic, query, reference] of [
    ['lcsdp-006', 'lcs-dynamic-programming', '19', 'data-structures', '贪心匹配第二个字符串', 'Longest_common_subsequence'],
    ['mstcs-003', 'mst-graph-fundamentals', '19', 'data-structures', '起点到所有顶点的最短路径', 'algs4.cs.princeton.edu/43mst'],
    ['clockcs-004', 'linux-clock-measurement', '19', 'operating-systems', '系统挂起期间', 'clock_gettime.2.html'],
    ['pymock-001', 'python-unittest-mock-practice', '02', 'python-data', '补丁哪个命名空间', 'unittest.mock.html#where-to-patch'],
    ['pgsave-001', 'postgresql-savepoint-recovery', '19', 'database-fundamentals', '语句错误进入中止状态', 'postgresql.org/docs/17/tutorial-transactions'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.knowledgeArea, area, id);
    assert.equal(card.topic, topic, id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
});

test('new agent, interpretation and security cards preserve source filters', () => {
  const data = createInitialData();
  for (const [id, sourceId, area, topic, query, reference] of [
    ['gamesearch-004', 'agent-adversarial-game-search', '08', 'agent-design', '祖先 MAX 已有下界', 'cs188/textbook/games/minimax'],
    ['rltd-004', 'sarsa-expected-double-q', '18', 'reinforcement-learning', 'Sarsa 与 Q-learning 的一步目标', '10-703/textbook/BartoSutton'],
    ['skpdp-004', 'sklearn-pdp-ice-inspection', '03', 'ml-basics', '特征高度相关时', 'scikit-learn.org/1.7/modules/partial_dependence'],
    ['tau2-001', 'tau2-dual-control-evaluation', '09', 'agent-engineering', '双控制”指哪两方', '2506.07982v1'],
    ['certinsider-001', 'cert-synthetic-insider-dataset', '10', 'security-telemetry', '背景活动与恶意行为记录', 'sei.cmu.edu/library/insider-threat-test-dataset'],
    ['fuzzgpt-003', 'fuzzgpt-history-guided-generation', '14', 'fuzzing', '只研究必须提供历史缺陷代码', '2304.02014v1'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.knowledgeArea, area, id);
    assert.equal(card.topic, topic, id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
  const sarsa = data.cards.find((card) => card.id === 'rltd-004');
  assert.ok(sarsa && matchesScope(sarsa, { sourceId: 'company-baidu' }));
  assert.ok(matchesScope(sarsa, { sourceId: publicInterviewScope }));
  assert.ok(sarsa.sources?.some((source) => source.id === 'company-baidu' && source.title.includes('主题延伸，非原题')));
});

test('new model engineering and security data cards retain searchable evidence', () => {
  const data = createInitialData();
  for (const [id, sourceId, area, topic, query, reference] of [
    ['hftoken-009', 'transformers-tokenizer-batching', '05', 'nlp-transformer', 'overflow_to_sample_mapping', 'v4.51.3/en/main_classes/tokenizer'],
    ['hftrainer-007', 'transformers-trainer-evaluation', '06', 'llm-training', '会立即因为该选项断言失败', 'v4.51.3/src/transformers/trainer_callback'],
    ['ptembed-004', 'pytorch-embedding-cosine-contracts', '04', 'deep-learning', '前向查表怎样处理超限', 'docs/2.7/generated/torch.nn.Embedding'],
    ['matryoshka-004', 'matryoshka-variable-embeddings', '07', 'rag-basics', '利用不同维度降低搜索成本', '2205.13147v2'],
    ['rslora-001', 'rslora-rank-stability', '06', 'llm-training', '固定 α 的原始 LoRA 缩放', '2312.03732v1'],
    ['malnet-005', 'malnet-function-call-graphs', '12', 'malware-analysis', '是否所有样本都属于恶意软件', '2011.07682v3'],
    ['vtbehavior-005', 'virustotal-file-behaviour-fields', '10', 'security-telemetry', 'hosts_file 字段在什么情况下填充', 'reference/file-behaviour-summary'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.knowledgeArea, area, id);
    assert.equal(card.topic, topic, id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
});

test('new general computer cards retain source, topic and searchable evidence', () => {
  const data = createInitialData();
  for (const [id, sourceId, topic, query, reference] of [
    ['gitignore-006', 'git-ignore-patterns-practice', 'version-control', '先忽略 cache/', 'v2.53.0/Documentation/gitignore'],
    ['scpbase-007', 'openssh-scp-sftp-practice', 'linux-systems', '9.0 及之后的 scp', 'OpenBSD-7.7/scp.1'],
    ['grpcbase-008', 'grpc-service-fundamentals', 'computer-network', '写操作返回 DEADLINE_EXCEEDED', 'grpc.io/docs/guides/status-codes'],
    ['pgtime-008', 'postgresql-datetime-timezone', 'database-fundamentals', '跨夏令时切换时', 'postgresql.org/docs/17/functions-datetime'],
    ['dbpool-008', 'sqlalchemy-connection-pool', 'database-fundamentals', '事务执行过程中网络断开', 'sqlalchemy.org/en/20/core/pooling'],
    ['hashprobe-006', 'hash-table-collision-practice', 'data-structures', '直接把一个已占用槽清空', 'LinearProbingHashST.java'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.knowledgeArea, '19', id);
    assert.equal(card.topic, topic, id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
});

test('new numerical, model and systems cards retain searchable sources', () => {
  const data = createInitialData();
  for (const [id, sourceId, area, topic, query, reference] of [
    ['splog-004', 'scipy-logsumexp-softmax', '01', 'math-statistics', '负数和零分别如何表示', 'scipy-1.15.3'],
    ['ptpool-002', 'pytorch-maxpool2d-practice', '04', 'deep-learning', '隐式填充值怎样处理', 'torch.nn.MaxPool2d.html'],
    ['hfcoll-008', 'transformers-language-model-collation', '05', 'nlp-transformer', 'MLM 整理器将 seed=0', 'v4.51.3/src/transformers/data/data_collator.py'],
    ['lccache-003', 'langchain-embedding-cache', '07', 'rag-basics', '查询与文档使用什么缓存', 'langchain%3D%3D0.3.27'],
    ['simclr-004', 'simclr-visual-contrastive', '18', 'computer-vision', '每个锚点通常有多少批内负例', '2002.05709v3'],
    ['deepsad-002', 'deep-sad-semisupervised-anomaly', '11', 'anomaly-detection', '已标注正常样本和已标注异常样本', '1906.02694v2'],
    ['flock-003', 'linux-flock-file-locking', '19', 'linux-systems', 'LOCK_NB 与 flock 命令的 -n', 'flock.2.html'],
    ['hsts-006', 'http-hsts-protocol', '19', 'computer-network', '端口与其他显式端口', 'rfc6797.txt'],
    ['covpy-007', 'coverage-py-branch-analysis', '19', 'software-testing', 'fail-under=90', 'coverage.readthedocs.io/en/7.6.1'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.knowledgeArea, area, id);
    assert.equal(card.topic, topic, id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
  const simclr = data.cards.find((card) => card.id === 'simclr-004');
  assert.ok(simclr && matchesScope(simclr, { sourceId: publicInterviewScope }));
  assert.ok(matchesScope(simclr, { sourceId: 'company-bytedance' }));
  assert.ok(simclr.sources?.some((source) => source.title.includes('主题延伸，非原题')));
  assert.ok(data.cards.find((card) => card.id === 'flock-003')?.sources?.some((source) => source.id === 'flock-command-man'));
});

test('new Python, clustering, systems and interview cards retain searchable references', () => {
  const data = createInitialData();
  for (const [id, sourceId, area, topic, query, reference] of [
    ['inotify-004', 'linux-inotify-file-events', '19', 'linux-systems', 'IN_Q_OVERFLOW', 'inotify.7.html'],
    ['psqlcli-004', 'postgresql-psql-cli-practice', '19', 'database-fundamentals', '服务器端 COPY 使用文件', 'docs/17/app-psql.html'],
    ['pyenv-003', 'python-venv-pip-practice', '02', 'python-data', '解释器是否运行在 venv', 'python.org/3.14/library/venv'],
    ['pyjson-006', 'python-json-serialization', '02', 'python-data', '默认解析含重复名称', 'python.org/3.14/library/json'],
    ['pdmerge-001', 'pandas-merge-key-practice', '02', 'python-data', '左右连接键都为缺失值', 'version/2.2.3/reference/api/pandas.merge'],
    ['pydv2-007', 'pydantic-v2-validation', '02', 'python-data', '对字段默认值运行自定义', 'pydantic.dev/2.12/concepts/validators'],
    ['skevalcl-004', 'sklearn-clustering-evaluation', '03', 'ml-basics', 'silhouette_score 对标签数', 'scikit-learn.org/1.7/'],
    ['lorafa-002', 'lora-fa-fixed-matrix', '06', 'llm-training', '降低低秩适配器的激活内存', '2308.03303v3'],
    ['ciciot-003', 'ciciot2023-security-dataset', '10', 'security-telemetry', 'PCAP 与 CSV 分别', 'iotdataset-2023.html'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.knowledgeArea, area, id);
    assert.equal(card.topic, topic, id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
  const lora = data.cards.find((card) => card.id === 'lorafa-002');
  assert.ok(lora && matchesScope(lora, { sourceId: publicInterviewScope }));
  assert.ok(matchesScope(lora, { sourceId: 'company-kuaishou' }));
  assert.ok(lora.sources?.some((source) => source.title.includes('主题延伸，非原题')));
});

test('new computer and AI cards are searchable with their topic and reference', () => {
  const data = createInitialData();
  for (const [id, sourceId, area, topic, query, reference] of [
    ['pyreq-001', 'python-requests-http-practice', '02', 'python-data', 'Response.json() 成功', 'requests/v2.32.5'],
    ['gitsub-006', 'git-submodule-fundamentals', '19', 'version-control', 'update --remote 与默认更新', 'git-submodule/2.46.0'],
    ['gitwt-002', 'git-worktree-practice', '19', 'version-control', '多个关联工作树共享', 'git-worktree/2.46.0'],
    ['laudit-001', 'linux-audit-log-analysis', '16', 'security-operations', '同一事件的多条记录怎样关联', 'auditing-the-system_security-hardening'],
    ['pycopod-003', 'pyod-copod-usage', '11', 'anomaly-detection', '同批查询样本变化', 'pyod/v2.0.5'],
    ['vul4j-002', 'vul4j-java-vulnerability-benchmark', '13', 'code-vulnerability', '是否全部有 PoV 测试', 'bca934d14bad4743'],
    ['phiusiil-002', 'phiusiil-phishing-dataset', '12', 'phishing-detection', '标签 1 和 0 分别代表', 'phiusiil+phishing+url+dataset'],
    ['plansolve-002', 'plan-and-solve-prompting', '08', 'agent-design', 'PS+ 相比基本 PS', '2305.04091v3'],
    ['mtjudge-002', 'mt-bench-llm-judge', '09', 'agent-engineering', '成对比较与单答案评分', '2306.05685v3'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.knowledgeArea, area, id);
    assert.equal(card.topic, topic, id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
});

test('new statistics, data and model cards retain sources and interview context', () => {
  const data = createInitialData();
  for (const [id, sourceId, area, topic, query, reference] of [
    ['scipytest-008', 'scipy-independent-paired-t-tests', '01', 'math-statistics', '某一对只有一个值为 NaN', 'scipy.stats.ttest_rel.html'],
    ['shapiro-002', 'scipy-shapiro-normality', '01', 'math-statistics', '超过 5000 个样本的 Shapiro', 'scipy.stats.shapiro.html'],
    ['pdasof-008', 'pandas-asof-time-alignment', '02', 'python-data', '小心 direction="nearest"', 'pandas.merge_asof.html'],
    ['pddate-003', 'pandas-datetime-parsing', '02', 'python-data', 'utc=True) 如何处理无时区', 'pandas.to_datetime.html'],
    ['skknn-006', 'sklearn-knn-classification', '03', 'ml-basics', 'kneighbors(X=None)', 'KNeighborsClassifier.html'],
    ['adamw-006', 'pytorch-adamw-optimizer', '04', 'deep-learning', '改变参数组内参数顺序', 'torch.optim.AdamW.html'],
    ['loraplus-001', 'lora-plus-learning-rates', '06', 'llm-training', 'LoRA+ 相对使用同一学习率', '2402.12354v2'],
    ['lcstruct-004', 'langchain-model-structured-output', '09', 'agent-engineering', 'include_raw=True 与 False', 'language_models/chat_models.py'],
    ['procinfo-006', 'linux-proc-process-inspection', '19', 'linux-systems', '实时反映进程后来对环境变量', 'proc_pid_environ.5.html'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.knowledgeArea, area, id);
    assert.equal(card.topic, topic, id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
  const lora = data.cards.find((card) => card.id === 'loraplus-001');
  assert.ok(lora && matchesScope(lora, { sourceId: publicInterviewScope }));
  assert.ok(matchesScope(lora, { sourceId: 'company-kuaishou' }));
  assert.ok(lora.sources?.some((source) => source.title.includes('主题延伸，非原题')));
});

test('new language, security and systems sources are searchable with their references', () => {
  const data = createInitialData();
  for (const [id, sourceId, area, topic, query, reference] of [
    ['xlnetpaper-002', 'xlnet-permutation-pretraining', '05', 'nlp-transformer', '排列语言建模会把输入文本', '1906.08237v2'],
    ['hotpot-006', 'hotpotqa-multihop-evaluation', '07', 'rag-basics', 'full wiki 设置与 distractor', '1809.09600v1'],
    ['rapplan-003', 'rap-world-model-planning', '08', 'agent-design', '内部轨迹模拟是否等于', '2305.14992v2'],
    ['revealvul-005', 'reveal-code-graph-detection', '13', 'code-vulnerability', '把 GGNN 更新后的节点表示', '2009.07235v1'],
    ['fuzzilli-004', 'fuzzilli-javascript-intermediate', '14', 'fuzzing', 'InputMutator 与 OperationMutator', 'fuzzilli/3f902407232d'],
    ['yaracond-002', 'yara-condition-operators', '12', 'malware-analysis', 'uint16 与 uint16be', 'v4.4.0/writingrules.html'],
    ['tfox-003', 'threatfox-ioc-api', '15', 'threat-intelligence', 'search_ioc 中 exact_match=true', 'threatfox-api.abuse.ch'],
    ['vol3-004', 'volatility3-linux-memory', '16', 'security-operations', 'linux.pslist 主要通过', 'v2.26.2/getting-started-linux'],
    ['astpaper-006', 'audio-spectrogram-transformer', '18', 'speech-audio', '三通道 patch 投影', '2104.01778v1'],
    ['textmerge-004', 'gnu-text-join-compare', '19', 'linux-systems', 'join -v 1 和 join -a 1', 'join.1.html'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.knowledgeArea, area, id);
    assert.equal(card.topic, topic, id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
});

test('new computing and model sources are searchable with their references', () => {
  const data = createInitialData();
  for (const [id, sourceId, area, topic, query, reference] of [
    ['cronjob-005', 'linux-cron-scheduling', '19', 'linux-systems', '日期与星期字段都被限制', 'crontab.5.html'],
    ['linuxid-009', 'linux-user-identity', '19', 'linux-systems', '成员列表是否一定列出', 'group.5.html'],
    ['linenv-007', 'linux-environment-resource-limits', '19', 'linux-systems', '文件描述符限制，精确定义', 'getrlimit.2.html'],
    ['iowait-008', 'linux-select-poll-io', '19', 'operating-systems', '报告管道或流套接字 POLLHUP', 'poll.2.html'],
    ['diffpatch-002', 'gnu-diff-patch-practice', '19', 'linux-systems', 'diff 的退出状态 0、1 和 2', 'diff.1.html'],
    ['skhash-003', 'sklearn-hashing-vectorizer', '03', 'ml-basics', 'HashingVectorizer 的哈希碰撞', 'HashingVectorizer.html'],
    ['skhist-004', 'sklearn-hist-gradient-boosting', '03', 'ml-basics', '1.7.2 的 HistGradientBoostingClassifier 实现', 'gradient_boosting.py'],
    ['ptinit-005', 'pytorch-parameter-initialization', '04', 'deep-learning', '计算线性层 fan 时', 'nn.init.html'],
    ['ia3-004', 'ia3-activation-adaptation', '06', 'llm-training', '与 LoRA 在适配机制', '2205.05638v2'],
    ['lchistory-001', 'langchain-runnable-message-history', '09', 'agent-engineering', '构造时对使用者发出', 'runnables/history.py'],
    ['lats-003', 'lats-search-reflection', '08', 'agent-design', '节点价值估计结合哪两类信息', '2310.04406v3'],
    ['hdfsdata-003', 'loghub-hdfs-data-variants', '10', 'security-telemetry', 'HDFS_v1 与 HDFS_v2 在异常标签', 'logpai/loghub'],
    ['eif-003', 'extended-isolation-forest', '11', 'anomaly-detection', '轴平行切分可能造成', '1811.02141v3'],
    ['mlflow-007', 'mlflow-experiment-tracking', '17', 'model-monitoring', '按指标查找实验中的运行', 'mlflow.org/docs/3.1.0/ml/tracking'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.knowledgeArea, area, id);
    assert.equal(card.topic, topic, id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
  assert.match(data.cards.find((card) => card.id === 'lchistory-001')?.answer ?? '', /弃用/);
  assert.match(data.cards.find((card) => card.id === 'skhist-004')?.explanation ?? '', /文档/);
});

test('new statistics, systems and research sources are searchable with references', () => {
  const data = createInitialData();
  for (const [id, sourceId, area, topic, query, reference] of [
    ['mannu-006', 'scipy-mann-whitney-u', '01', 'math-statistics', 'mannwhitneyu(method="auto")', 'scipy-1.15.3'],
    ['pymproc-008', 'python-multiprocessing-practice', '02', 'python-data', 'value.value += 1', 'docs.python.org/3.14/library/multiprocessing.html'],
    ['bartpaper-003', 'bart-denoising-architecture', '05', 'nlp-transformer', '编码器输入与目标文本必须逐位置', '1910.13461v1'],
    ['alfworld-008', 'alfworld-agent-transfer', '09', 'agent-engineering', 'seen 与 unseen 验证场景', '2010.03768v2'],
    ['msrvul-003', 'msr20-code-vulnerability-dataset', '13', 'code-vulnerability', '根据补丁中修改的行划分函数标签', '6022ca320b2204'],
    ['aflgo-005', 'aflgo-directed-greybox', '14', 'fuzzing', '模拟退火式能量调度', 'CCS17.pdf'],
    ['octi-008', 'opencti-knowledge-ingestion', '15', 'threat-intelligence', '内容的最大标记与导出文件标记', 'docs.opencti.io/latest/usage/export/'],
    ['ecsfield-006', 'elastic-ecs-event-analysis', '16', 'security-operations', 'event.ingested 与 @timestamp', 'ecs/8.17/ecs-event.html'],
    ['clappaper-006', 'clap-audio-text-contrastive', '18', 'multimodal-learning', '长音频特征融合', '2211.06687v2'],
    ['redisstream-003', 'redis-streams-consumer-groups', '19', 'message-queues', '与该流的 last-generated-id', 'redis/redis/7.2.7/src/t_stream.c'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.knowledgeArea, area, id);
    assert.equal(card.topic, topic, id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
  assert.ok(data.cards.find((card) => card.id === 'redisstream-003')?.sources?.some((source) => source.id === 'redis-xadd-doc'));
});

test('computing and model additions retain searchable topics and references', () => {
  const data = createInitialData();
  for (const [id, sourceId, area, topic, query, reference] of [
    ['mysqllog-002', 'mysql-logging-recovery', '19', 'database-fundamentals', 'redo log 与 undo log', 'innodb-undo-logs.html'],
    ['tcpdetail-004', 'tcp-keepalive-small-packets', '19', 'computer-network', 'TCP_KEEPIDLE、TCP_KEEPINTVL', 'tcp.7.html'],
    ['bashadv-007', 'bash-expansion-array-practice', '19', 'linux-systems', '展开数组时如何处理包含空格', 'bash.1.html'],
    ['outcmd-004', 'gnu-output-command-practice', '19', 'linux-systems', 'tee 命令在管道中', 'tee.1.html'],
    ['pgnlogic-003', 'postgresql-null-logic-patterns', '19', 'database-fundamentals', 'FALSE AND NULL 与 TRUE OR NULL', 'functions-logical.html'],
    ['lgbtree-003', 'lightgbm-tree-learning', '03', 'ml-basics', '直方图减法减少兄弟叶子', 'lightgbm.readthedocs.io'],
    ['lgbapi-007', 'lightgbm-classifier-practice', '03', 'ml-basics', '指定为类别特征后，负值', 'LGBMClassifier.html'],
    ['ptce-003', 'pytorch-cross-entropy-shapes', '04', 'deep-learning', '使用概率目标和 reduction', 'CrossEntropyLoss.html'],
    ['pissa-001', 'pissa-low-rank-initialization', '06', 'llm-training', 'PiSSA 原论文怎样初始化', '2404.02948v2'],
    ['bnbcfg-004', 'bitsandbytes-quantization-config', '06', 'llm-training', 'bnb_4bit_compute_dtype 与 4 位', 'quantization_config.py'],
    ['e5embed-002', 'e5-embedding-pretraining', '07', 'rag-basics', 'E5 原论文的一致性过滤', '2212.03533v2'],
    ['minhash-008', 'minhash-jaccard-retrieval', '07', 'rag-basics', 'MinHashLSH.query 返回结果', 'datasketch/lsh.py'],
    ['ja3base-004', 'ja3-client-fingerprint', '10', 'security-telemetry', 'JA3 生成时为什么忽略 GREASE', 'salesforce/ja3'],
    ['usadcode-002', 'usad-reference-model', '11', 'anomaly-detection', 'USAD 作者实现的 w3', 'manigalati/usad'],
    ['capabase-003', 'capa-capability-analysis', '12', 'malware-analysis', 'capa 的 -vv 选项', 'mandiant/capa'],
    ['hellinger-002', 'hellinger-drift-distance', '17', 'model-monitoring', 'Hellinger 距离的 0 与 1', 'nannyml.readthedocs.io'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.knowledgeArea, area, id);
    assert.equal(card.topic, topic, id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
  assert.ok(data.cards.find((card) => card.id === 'mysqllog-002')?.sources?.some((source) => source.id === 'mysql84-redo'));
});

test('database, agents and security additions retain searchable sources and topics', () => {
  const data = createInitialData();
  for (const [id, sourceId, category, area, topic, query, reference] of [
    ['pysqlite-012', 'python-sqlite3-database', 'foundations', '02', 'python-data', '已有待提交事务怎样处理', 'docs.python.org/3.14/library/sqlite3.html'],
    ['mteb-004', 'mteb-embedding-evaluation', 'foundations', '07', 'rag-basics', 'bitext mining 任务要解决', 'arxiv.org/pdf/2210.07316v2'],
    ['metagpt-002', 'metagpt-role-collaboration', 'foundations', '08', 'agent-design', '输出 schema 与 instruct content', 'arxiv.org/pdf/2308.00352v2'],
    ['mind2web-005', 'mind2web-offline-evaluation', 'foundations', '09', 'agent-engineering', '逐步离线评测向模型提供', 'arxiv.org/pdf/2306.06070v2'],
    ['chatafl-007', 'chatafl-protocol-fuzzing', 'vulnerabilities', '14', 'fuzzing', '覆盖率进入停滞期', 'ndss-symposium.org/wp-content/uploads/2024-556-paper.pdf'],
    ['mispwarn-007', 'misp-warninglist-triage', 'operations', '15', 'threat-intelligence', 'enforceWarninglist 有什么作用', 'circl.lu/doc/misp/warninglists/'],
    ['elasticth-004', 'elastic-threshold-rule-practice', 'operations', '16', 'security-operations', '告警为什么不包含所有来源事件字段', 'elastic.co/guide/en/security/8.17/'],
    ['detr-004', 'detr-object-detection', 'foundations', '18', 'computer-vision', '未匹配真实目标的预测槽位', 'arxiv.org/pdf/2005.12872v3'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.category, category, id);
    assert.equal(card.knowledgeArea, area, id);
    assert.equal(card.topic, topic, id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
});

test('model and security data additions retain searchable sources and topics', () => {
  const data = createInitialData();
  for (const [id, sourceId, category, area, topic, query, reference] of [
    ['tempcal-003', 'temperature-scaling-calibration', 'foundations', '03', 'ml-basics', '正温度缩放不会改变', 'arxiv.org/pdf/1706.04599v2'],
    ['focalloss-004', 'focal-loss-training-details', 'foundations', '04', 'deep-learning', '接收概率还是 logits', 'githubusercontent.com/pytorch/vision/v0.22.0/'],
    ['ptinterp-003', 'pytorch-interpolate-practice', 'foundations', '04', 'deep-learning', 'align_corners=True 会怎样', 'pytorch.org/docs/2.7/generated/'],
    ['longformer-003', 'longformer-attention-foundations', 'foundations', '05', 'nlp-transformer', '全局 token 数为 g', 'arxiv.org/pdf/2004.05150v2'],
    ['deberta-004', 'deberta-disentangled-attention', 'foundations', '05', 'nlp-transformer', '增强掩码解码器何时', 'arxiv.org/pdf/2006.03654v6'],
    ['dpopaper-005', 'dpo-preference-objective', 'foundations', '06', 'llm-training', '配分函数来比较', 'arxiv.org/pdf/2305.18290v3'],
    ['vpcflow-003', 'aws-vpc-flow-log-fields', 'detection', '10', 'security-telemetry', '只有单独 ACK 标志', 'docs.aws.amazon.com/vpc/'],
    ['tranad-002', 'tranad-self-conditioning', 'detection', '11', 'anomaly-detection', '进行自条件化', 'arxiv.org/pdf/2201.07284v6'],
    ['pefile-002', 'pefile-static-parsing', 'vulnerabilities', '12', 'malware-analysis', '如何解析指定的数据目录', 'pefile.readthedocs.io/'],
    ['vulberta-004', 'vulberta-code-pretraining', 'vulnerabilities', '13', 'code-vulnerability', '在使用预训练模型方面', 'arxiv.org/pdf/2205.12424v1'],
    ['unetpaper-003', 'unet-biomedical-segmentation', 'foundations', '18', 'computer-vision', '裁剪收缩路径的特征图', 'arxiv.org/pdf/1505.04597v1'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.category, category, id);
    assert.equal(card.knowledgeArea, area, id);
    assert.equal(card.topic, topic, id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
});

test('general computing practice additions retain searchable sources and topics', () => {
  const data = createInitialData();
  for (const [id, sourceId, topic, query, reference] of [
    ['coreord-002', 'gnu-sort-uniq-practice', 'linux-systems', '指定的排序键一起使用时', 'man7.org/linux/man-pages/man1/sort.1.html'],
    ['awkops-003', 'posix-awk-processing', 'linux-systems', '为什么适合给 BEGIN 代码传值', 'man7.org/linux/man-pages/man1/awk.1p.html'],
    ['sedops-003', 'gnu-sed-substitution', 'linux-systems', '替换部分的未转义', 'man7.org/linux/man-pages/man1/sed.1.html'],
    ['sshops-006', 'openssh-client-practice', 'linux-systems', '本地端口转发怎样传递连接', 'man.openbsd.org/ssh.1'],
    ['rsyncops-001', 'rsync-file-sync', 'linux-systems', '源路径 dir/ 与 dir', 'download.samba.org/pub/rsync/rsync.1'],
    ['pgjson-009', 'postgresql-jsonb-practice', 'database-fundamentals', 'jsonb_path_ops GIN 索引', 'postgresql.org/docs/17/datatype-json.html'],
    ['redispersist-004', 'redis-persistence-practice', 'caching-systems', '多部分 AOF 如何组织', 'redis.io/docs/latest/operate/'],
    ['vmcore-003', 'qemu-virtualization-foundations', 'operating-systems', 'TCG 和 KVM', 'qemu.org/docs/master/system/'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.category, 'foundations', id);
    assert.equal(card.knowledgeArea, '19', id);
    assert.equal(card.topic, topic, id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
});

test('statistical, agent and security additions retain searchable sources and topics', () => {
  const data = createInitialData();
  for (const [id, sourceId, category, area, topic, query, reference] of [
    ['expwait-004', 'exponential-waiting-times', 'foundations', '01', 'math-statistics', '指数等待时间的无记忆性', 'probabilitycourse.com/chapter4/'],
    ['wilcpair-005', 'scipy-wilcoxon-paired-test', 'foundations', '01', 'math-statistics', 'wilcox、pratt 和 zsplit', 'docs.scipy.org/doc/scipy-1.15.3/'],
    ['saycan-004', 'saycan-grounded-agent', 'foundations', '08', 'agent-design', '组合候选技能的语言分数', 'arxiv.org/pdf/2204.01691v2'],
    ['dspypaper-005', 'dspy-program-compilation', 'foundations', '09', 'agent-engineering', 'BootstrapFewShot 如何获得候选示例', 'arxiv.org/pdf/2310.03714v1'],
    ['aflfast-005', 'aflfast-power-schedules', 'vulnerabilities', '14', 'fuzzing', '指数调度如何随种子反复被选择', 'mboehme.github.io/paper/CCS16.pdf'],
    ['fairfuzz-004', 'fairfuzz-rare-branch', 'vulnerabilities', '14', 'fuzzing', '如何估计某些位置能否变异', 'arxiv.org/pdf/1709.07101v1'],
    ['asimsoc-006', 'sentinel-asim-normalization', 'operations', '16', 'security-operations', 'pack=true 时，额外数据', 'learn.microsoft.com/en-us/azure/sentinel/'],
    ['affileval-004', 'affiliation-anomaly-evaluation', 'foundations', '17', 'data-evaluation', '关联区域没有任何预测时', 'arxiv.org/pdf/2206.13167v1'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.category, category, id);
    assert.equal(card.knowledgeArea, area, id);
    assert.equal(card.topic, topic, id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
});

test('debugging and Python tooling cards retain searchable sources and topics', () => {
  const data = createInitialData();
  for (const [id, sourceId, area, topic, query, reference] of [
    ['gdbbase-006', 'gdb-debugging-foundations', '19', 'software-build', 'step 与 next 遇到函数调用', 'sourceware.org/gdb/current/onlinedocs/'],
    ['pyarg-009', 'python-argparse-cli', '02', 'python-data', 'parse_known_args 与 parse_args', 'docs.python.org/3.14/library/argparse.html'],
    ['pyprof-009', 'python-profiling-timeit', '02', 'python-data', 'timeit 默认会在计时期间怎样处理垃圾回收', 'docs.python.org/3.14/library/timeit.html'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.category, 'foundations', id);
    assert.equal(card.knowledgeArea, area, id);
    assert.equal(card.topic, topic, id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
});

test('development and retrieval cards retain searchable sources and topics', () => {
  const data = createInitialData();
  for (const [id, sourceId, area, topic, query, reference] of [
    ['curlhttp-005', 'curl-http-debug-practice', '19', 'linux-systems', '读取 HTTP 数据时，-d 和 --data-binary', 'curl.se/docs/manpage.html'],
    ['composebase-006', 'docker-compose-development', '19', 'containers', 'condition: service_healthy 要求什么', 'docs.docker.com/compose/how-tos/startup-order/'],
    ['pypath-007', 'python-pathlib-practice', '02', 'python-data', '写入已有普通文件时默认追加还是覆盖', 'docs.python.org/3.14/library/pathlib.html'],
    ['lcsplit-005', 'langchain-text-splitting-practice', '07', 'rag-basics', '能保证每对相邻片段恰好重叠', 'githubusercontent.com/langchain-ai/langchain/'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.category, 'foundations', id);
    assert.equal(card.knowledgeArea, area, id);
    assert.equal(card.topic, topic, id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
});

test('general computing additions retain searchable sources and topics', () => {
  const data = createInitialData();
  for (const [id, sourceId, topic, query, reference] of [
    ['jqjson-008', 'jq-json-command-practice', 'linux-systems', '.enabled // true 遇到', 'jqlang.org/manual/v1.8/'],
    ['httpneg-007', 'http-content-negotiation', 'computer-network', 'text/*;q=0.3, text/plain;q=0.7', 'rfc-editor.org/rfc/rfc9110.html'],
    ['pgwrite-004', 'postgresql-upsert-set-operations', 'database-fundamentals', '条件为假时，该冲突行', 'postgresql.org/docs/17/sql-insert.html'],
    ['testdesign-005', 'istqb-test-design-fundamentals', 'software-testing', 'Each Choice 覆盖', 'istqb.org/'],
    ['makebuild-005', 'gnu-make-incremental-build', 'software-build', 'target: source | directory', 'githubusercontent.com/mirror/make/4.4.1/'],
    ['lisalg-006', 'lis-algorithm-foundations', 'data-structures', '最终 tails 数组', 'cp-algorithms.com/dynamic_programming/'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.category, 'foundations', id);
    assert.equal(card.knowledgeArea, '19', id);
    assert.equal(card.topic, topic, id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
});

test('model, data and security additions retain searchable sources and topics', () => {
  const data = createInitialData();
  for (const [id, sourceId, category, area, topic, query, reference] of [
    ['mvnscipy-002', 'scipy-multivariate-normal', 'foundations', '01', 'math-statistics', '标量和一维数组形式的 cov', 'docs.scipy.org/doc/scipy-1.15.3/'],
    ['skrand-005', 'sklearn-randomized-search', 'foundations', '03', 'ml-basics', '使用参数字典列表且其中至少一个参数为分布', 'github.com/scikit-learn/scikit-learn/blob/1.7.2/'],
    ['albertpre-005', 'albert-parameter-sharing', 'foundations', '05', 'nlp-transformer', 'SOP 与 BERT 的 NSP', 'arxiv.org/pdf/1909.11942v6'],
    ['spanbertpre-004', 'spanbert-span-boundaries', 'foundations', '05', 'nlp-transformer', 'span boundary objective 用什么', 'arxiv.org/pdf/1907.10529v3'],
    ['llmlingua-004', 'llmlingua-prompt-compression', 'foundations', '08', 'agent-design', 'token 级压缩时分段迭代', 'arxiv.org/pdf/2310.05736v1'],
    ['dqnbase-005', 'dqn-experience-replay', 'foundations', '18', 'reinforcement-learning', '用单独的目标网络计算', 'storage.googleapis.com/deepmind-media/dqn/'],
    ['hypfuzz-003', 'hypothesis-property-fuzzing', 'vulnerabilities', '14', 'fuzzing', '找到失败输入后，shrinking', 'github.com/HypothesisWorks/hypothesis/blob/hypothesis-python-6.100.0/'],
    ['vqlinvest-005', 'velociraptor-vql-investigation', 'operations', '16', 'security-operations', 'foreach 插件如何组合外层', 'github.com/Velocidex/velociraptor-docs/blob/c434e83b'],
    ['phishgpt-002', 'chatgpt-phishing-website-study', 'detection', '12', 'phishing-detection', 'HTML 之外加入截图的 OCR', 'arxiv.org/pdf/2306.05816v1'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.category, category, id);
    assert.equal(card.knowledgeArea, area, id);
    assert.equal(card.topic, topic, id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
});

test('foundation, retrieval and security additions retain their topics and references', () => {
  const data = createInitialData();
  for (const [id, sourceId, category, area, topic, query, reference] of [
    ['condexp-007', 'conditional-expectation-variance', 'foundations', '01', 'math-statistics', '全方差公式怎样分解', 'probabilitycourse.com/chapter5/'],
    ['ptconv-004', 'pytorch-conv2d-practice', 'foundations', '04', 'deep-learning', '属于 depthwise convolution', 'pytorch.org/docs/2.7/generated/'],
    ['ragpaper-002', 'rag-original-latent-documents', 'foundations', '07', 'rag-basics', '对文档边缘化有什么区别', 'arxiv.org/pdf/2005.11401v4'],
    ['cic18-004', 'cse-cic-ids2018-dataset', 'detection', '10', 'security-telemetry', 'B-profile 与 M-profile 分别描述什么', 'unb.ca/cic/datasets/ids-2018.html'],
    ['treesit-004', 'tree-sitter-code-parsing', 'vulnerabilities', '13', 'code-vulnerability', 'start_byte 和 end_byte', 'github.com/tree-sitter/py-tree-sitter/blob/v0.24.0/'],
    ['attacklayer-006', 'attack-navigator-layer-format', 'operations', '15', 'threat-intelligence', '省略 score 与 score=0', 'github.com/mitre-attack/attack-navigator/blob/v5.1.0/'],
    ['zeekweird-004', 'zeek-weird-analysis', 'operations', '16', 'security-operations', 'Weird::Info 的 notice 字段', 'docs.zeek.org/en/v6.0.9/'],
    ['selrisk-003', 'selective-classification-risk-coverage', 'foundations', '17', 'data-evaluation', '0-1 损失评价时，选择性风险', 'arxiv.org/pdf/1705.08500v2'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.category, category, id);
    assert.equal(card.knowledgeArea, area, id);
    assert.equal(card.topic, topic, id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
});

test('new AI and security cards retain searchable sources and scopes', () => {
  const data = createInitialData();
  for (const [id, sourceId, category, area, topic, query, reference] of [
    ['skthresh-005', 'sklearn-decision-threshold-tuning', 'foundations', '03', 'ml-basics', '设置 cv="prefit"', 'github.com/scikit-learn/scikit-learn/blob/1.7.2/'],
    ['robertapre-002', 'roberta-pretraining-details', 'foundations', '05', 'nlp-transformer', '动态掩码如何处理同一文本', 'arxiv.org/pdf/1907.11692v1'],
    ['sagepaper-003', 'graphsage-inductive-sampling', 'foundations', '18', 'graph-learning', 'GraphSAGE 原论文为什么按层采样', 'arxiv.org/pdf/1706.02216v4'],
    ['gotpaper-002', 'graph-of-thoughts-reasoning', 'foundations', '08', 'agent-design', 'aggregation 操作做什么', 'arxiv.org/pdf/2308.09687v2'],
    ['hfpipegen-007', 'hf-text-generation-pipeline', 'foundations', '06', 'llm-training', 'handle_long_generation="hole" 如何', 'github.com/huggingface/transformers/blob/v4.51.3/'],
    ['smoothq-004', 'smoothquant-activation-quantization', 'foundations', '06', 'llm-training', '线性层中按通道同时缩放', 'arxiv.org/pdf/2211.10438v3'],
    ['sanrun-007', 'clang-asan-ubsan-fuzzing', 'vulnerabilities', '14', 'fuzzing', '-fsanitize-trap=alignment', 'releases.llvm.org/20.1.0/'],
    ['rrcfpaper-005', 'robust-random-cut-forest', 'detection', '11', 'anomaly-detection', 'outlier masking 为什么', 'proceedings.mlr.press/v48/guha16.pdf'],
    ['yarapy-004', 'yara-python-scanning', 'vulnerabilities', '12', 'malware-analysis', '规则使用外部变量时', 'yara.readthedocs.io/en/v4.4.0/'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.category, category, id);
    assert.equal(card.knowledgeArea, area, id);
    assert.equal(card.topic, topic, id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
});

test('general computing additions are searchable and keep their reference and topic', () => {
  const data = createInitialData();
  for (const [id, sourceId, topic, query, reference] of [
    ['grepops-007', 'gnu-grep-search-practice', 'linux-systems', 'grep -q 返回 0', 'man7.org/linux/man-pages/man1/grep.1.html'],
    ['pktcap-010', 'tcpdump-packet-capture-practice', 'linux-systems', 'TCP 或 UDP 端口过滤', 'man7.org/linux/man-pages/man7/pcap-filter.7.html'],
    ['udpicmp-004', 'udp-icmp-protocol-practice', 'computer-network', 'UDP 首部中传输的校验和字段全为 0', 'rfc-editor.org/rfc/rfc768.html'],
    ['dnsneg-004', 'dns-negative-cache-practice', 'computer-network', '权威负答案的 SOA TTL', 'rfc-editor.org/rfc/rfc2308.html'],
    ['pgpage-006', 'postgresql-keyset-pagination', 'database-fundamentals', '排序为 created_at DESC、id ASC', 'postgresql.org/docs/17/functions-comparisons.html'],
    ['redisscan-004', 'redis-scan-pipelining-practice', 'caching-systems', 'SCAN 完整遍历过程中', 'redis.io/docs/latest/commands/scan/'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.category, 'foundations', id);
    assert.equal(card.knowledgeArea, '19', id);
    assert.equal(card.topic, topic, id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
});

test('tokenization, agent, threat intelligence and monitoring cards retain sources and topics', () => {
  const data = createInitialData();
  for (const [id, sourceId, category, area, topic, query, reference] of [
    ['unigram-003', 'unigram-subword-segmentation', 'foundations', '05', 'nlp-transformer', 'Unigram 训练方法与常见 BPE', 'arxiv.org/pdf/1804.10959v1'],
    ['memgpt-007', 'memgpt-context-management', 'foundations', '08', 'agent-design', 'request_heartbeat=true', 'arxiv.org/pdf/2310.08560v2'],
    ['tldsec-005', 'tldextract-public-suffix-analysis', 'detection', '12', 'phishing-detection', '启用私有后缀时', 'github.com/john-kurkowski/tldextract/'],
    ['llmseceval-003', 'llmseceval-secure-code-benchmark', 'vulnerabilities', '13', 'code-vulnerability', 'Vulnerable 字段或 CWE 标签', 'github.com/tuhh-softsec/LLMSecEval/'],
    ['capec-005', 'capec-attack-pattern-schema', 'operations', '15', 'threat-intelligence', '攻击模式关联多个 CWE', 'capec.mitre.org/data/xsd/'],
    ['promql-005', 'prometheus-promql-monitoring', 'foundations', '17', 'model-monitoring', '为什么通常先 rate 再 sum', 'github.com/prometheus/prometheus/blob/v3.5.0/'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.category, category, id);
    assert.equal(card.knowledgeArea, area, id);
    assert.equal(card.topic, topic, id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
});

test('resampling, dataset, explanation and security cards retain sources and topics', () => {
  const data = createInitialData();
  for (const [id, sourceId, category, area, topic, query, reference] of [
    ['bootapi-006', 'scipy-bootstrap-intervals', 'foundations', '01', 'math-statistics', 'BCa bootstrap 遇到退化分布', 'docs.scipy.org/doc/scipy-1.15.3/'],
    ['hfdata-003', 'hf-datasets-transform-practice', 'foundations', '02', 'python-data', '不同数量的输出行', 'huggingface.co/docs/datasets/v3.6.0/'],
    ['skcurve-002', 'sklearn-learning-curves', 'foundations', '03', 'ml-basics', 'train_sizes 用浮点数和整数', 'github.com/scikit-learn/scikit-learn/blob/1.7.2/'],
    ['intgrad-004', 'captum-integrated-gradients', 'foundations', '04', 'deep-learning', '积分梯度的完整性性质', 'arxiv.org/pdf/1703.01365v2'],
    ['lcselfq-006', 'langchain-self-query-retrieval', 'foundations', '07', 'rag-basics', '合并静态 search_kwargs', 'github.com/langchain-ai/langchain/'],
    ['suriflow-002', 'suricata-flow-state-rules', 'detection', '11', 'network-threats', 'flowbits 的 set 与 isset', 'docs.suricata.io/en/suricata-8.0.1/'],
    ['fuzzdict-004', 'libfuzzer-dictionary-feedback', 'vulnerabilities', '14', 'fuzzing', '字典文件中，怎样表示', 'releases.llvm.org/20.1.0/'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.category, category, id);
    assert.equal(card.knowledgeArea, area, id);
    assert.equal(card.topic, topic, id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
});

test('math, learning, retrieval and multimodal practice cards retain searchable sources', () => {
  const data = createInitialData();
  for (const [id, sourceId, area, topic, query, reference] of [
    ['jsdist-003', 'jensen-shannon-distance', '01', 'math-statistics', '返回 JS 散度还是 JS 距离', 'docs.scipy.org/doc/scipy-1.15.3/'],
    ['torchfunc-008', 'pytorch-func-differentiation', '04', 'deep-learning', 'vmap 默认遇到 PyTorch 随机操作', 'pytorch.org/docs/2.7/generated/torch.vmap.html'],
    ['coltrans-003', 'sklearn-column-transformer-practice', '03', 'ml-basics', 'transform 时新增列会自动进入', 'scikit-learn.org/1.7/modules/generated/'],
    ['crossrank-006', 'cross-encoder-reranking-practice', '07', 'rag-basics', '单标签 CrossEncoder.predict 使用 apply_softmax', 'github.com/UKPLab/sentence-transformers/blob/v5.1.2/'],
    ['gymapi-005', 'gymnasium-episode-boundaries', '18', 'reinforcement-learning', 'terminated 和 truncated 一定互斥', 'github.com/Farama-Foundation/Gymnasium/blob/v1.1.1/'],
    ['whisperbase-005', 'whisper-speech-training-inference', '18', 'speech-audio', '前文转写作为解码上下文', 'arxiv.org/pdf/2212.04356v1'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.category, 'foundations', id);
    assert.equal(card.knowledgeArea, area, id);
    assert.equal(card.topic, topic, id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
});

test('security data, fuzzing, intelligence and evaluation cards retain searchable sources', () => {
  const data = createInitialData();
  for (const [id, sourceId, category, area, topic, query, reference] of [
    ['zeektls-006', 'zeek-tls-telemetry-fields', 'detection', '10', 'security-telemetry', '客户端未发送 SNI 时一定为 false', 'docs.zeek.org/en/v6.0.9/'],
    ['omniad-006', 'omnianomaly-model-evaluation', 'detection', '11', 'anomaly-detection', 'pot_eval 只用训练分数', 'github.com/NetManAIOps/OmniAnomaly/blob/7fb0e0ac'],
    ['fuzzcorp-001', 'libfuzzer-corpus-management', 'vulnerabilities', '14', 'fuzzing', '-merge=1 常用于', 'releases.llvm.org/20.1.0/docs/LibFuzzer.html'],
    ['purlsec-004', 'package-url-vulnerability-identity', 'operations', '15', 'threat-intelligence', '所有 version 都按语义化版本', 'github.com/package-url/purl-spec/blob/v1.1.1/'],
    ['kustojoin-001', 'kusto-security-event-joins', 'operations', '16', 'security-operations', 'join 未指定 kind', 'learn.microsoft.com/en-us/kusto/query/join-operator'],
    ['paeval-007', 'point-adjust-anomaly-evaluation', 'foundations', '17', 'data-evaluation', 'PA%K 在什么情况下', 'arxiv.org/pdf/2109.05257v2'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.category, category, id);
    assert.equal(card.knowledgeArea, area, id);
    assert.equal(card.topic, topic, id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
});

test('model, agent and security research cards retain their topics and sources', () => {
  const data = createInitialData();
  for (const [id, sourceId, category, area, topic, query, reference] of [
    ['ptsdp-002', 'pytorch-sdpa-attention-practice', 'foundations', '04', 'deep-learning', '非方阵查询与键', 'pytorch.org/docs/2.7/generated/'],
    ['electra-004', 'electra-pretraining-foundations', 'foundations', '05', 'nlp-transformer', '不是普通 GAN 式对抗训练', 'arxiv.org/pdf/2003.10555v1'],
    ['codeact-002', 'codeact-agent-framework', 'foundations', '08', 'agent-design', '单次代码动作可以组合', 'arxiv.org/pdf/2402.01030v2'],
    ['m3eval-001', 'm3-tooleval-agent-benchmark', 'foundations', '09', 'agent-engineering', 'M3 ToolEval 主要考查', 'arxiv.org/pdf/2402.01030v2'],
    ['minteval-009', 'mint-multiturn-agent-evaluation', 'foundations', '09', 'agent-engineering', '不能直接代表原始数据集的整体难度', 'arxiv.org/pdf/2309.10691v3'],
    ['phishpedia-006', 'phishpedia-visual-identification', 'detection', '12', 'phishing-detection', '检测输入框在结果中', 'usenix.org/system/files/sec21-lin.pdf'],
    ['linevul-009', 'linevul-function-line-evaluation', 'vulnerabilities', '13', 'code-vulnerability', '所有已标注缺陷行都未能匹配', 'github.com/awsm-research/LineVul/blob/9401ec6e'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.category, category, id);
    assert.equal(card.knowledgeArea, area, id);
    assert.equal(card.topic, topic, id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
});

test('new general computing cards can be searched and filtered by their topics and sources', () => {
  const data = createInitialData();
  for (const [id, sourceId, topic, query, reference] of [
    ['natcs-006', 'network-address-translation', 'computer-network', '配置静态端口映射', 'rfc-editor.org/rfc/rfc3022.html'],
    ['httpproxy-003', 'http-proxy-gateway-fundamentals', 'computer-network', 'HTTP CONNECT 收到成功', 'rfc-editor.org/rfc/rfc9110.html'],
    ['linuxtrace-009', 'linux-strace-lsof-troubleshooting', 'linux-systems', 'lsof +L1', 'man7.org/linux/man-pages/man8/lsof.8.html'],
    ['diskdiag-001', 'linux-disk-mount-diagnostics', 'linux-systems', 'GNU df -i', 'man7.org/linux/man-pages/man1/df.1.html'],
    ['monocs-002', 'monotonic-stack-window-algorithms', 'data-structures', '求右侧第一个严格更大值', 'oi-wiki.org/ds/monotonic-stack/'],
    ['pgsubq-002', 'postgresql-subquery-interview', 'database-fundamentals', '标量子查询返回零行', 'postgresql.org/docs/17/sql-expressions.html'],
    ['subnetcalc-007', 'ipv4-subnet-practice', 'computer-network', 'RFC 3021 的 /31', 'rfc-editor.org/rfc/rfc3021.html'],
    ['listalgo-005', 'linked-list-interview-practice', 'data-structures', '如何定位环入口', 'cp-algorithms.com/others/tortoise_and_hare.html'],
    ['kmpbase-004', 'kmp-string-matching-foundations', 'data-structures', '在文本 ababa 中查找模式 aba', 'cp-algorithms.com/string/prefix-function.html'],
    ['pgagg-007', 'postgresql-aggregate-interview', 'database-fundamentals', '2 个订单和 3 张优惠券', 'postgresql.org/docs/17/queries-table-expressions.html'],
    ['testfund-009', 'software-testing-foundations', 'software-testing', '行覆盖率达到 100%', 'coverage.readthedocs.io/en/7.6.12/branch.html'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.category, 'foundations', id);
    assert.equal(card.knowledgeArea, '19', id);
    assert.equal(card.topic, topic, id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
});

test('quantization, retrieval and evaluation cards retain searchable sources', () => {
  const data = createInitialData();
  for (const [id, sourceId, area, topic, query, reference] of [
    ['llmquant-003', 'awq-gptq-weight-quantization', '06', 'llm-training', '最终采用什么方法保护', 'arxiv.org/pdf/2306.00978v2'],
    ['lcmulticomp-011', 'langchain-query-compression', '07', 'rag-basics', '构造 EmbeddingsFilter 并传入 k=None', 'document_compressors/embeddings_filter.py'],
    ['bfcl-008', 'berkeley-function-calling-evaluation', '09', 'agent-engineering', '多轮任务如何综合状态检查', 'gorilla.cs.berkeley.edu/blogs/13_'],
    ['livecode-006', 'livecodebench-evaluation', '17', 'data-evaluation', '最终 pass@1 是否只统计', 'arxiv.org/pdf/2403.07974v2'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.category, 'foundations', id);
    assert.equal(card.knowledgeArea, area, id);
    assert.equal(card.topic, topic, id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
});

test('sampling, assessment, detection and exploration cards retain searchable sources', () => {
  const data = createInitialData();
  for (const [id, sourceId, category, area, topic, query, reference] of [
    ['ptsampler-011', 'pytorch-sampling-practice', 'foundations', '02', 'python-data', 'num_samples 大于数据集长度', 'pytorch/pytorch/blob/v2.7.1'],
    ['skperm-008', 'sklearn-permutation-score', 'foundations', '03', 'ml-basics', '使用 GroupKFold 并启用元数据路由', 'scikit-learn/scikit-learn/blob/1.7.2'],
    ['surith-010', 'suricata-rule-thresholding', 'detection', '11', 'network-threats', 'drop 或 reject', 'docs.suricata.io/en/suricata-8.0.1'],
    ['sancov-008', 'clang-sanitizer-coverage', 'vulnerabilities', '14', 'fuzzing', '所有基本块都执行过', 'releases.llvm.org/20.1.0'],
    ['bandit-004', 'bandit-exploration-foundations', 'foundations', '18', 'reinforcement-learning', '标准 ε-greedy 如何', 'andrew.cmu.edu/course/10-703'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.category, category, id);
    assert.equal(card.knowledgeArea, area, id);
    assert.equal(card.topic, topic, id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
});

test('general computing cards retain searchable topics and sources', () => {
  const data = createInitialData();
  for (const [id, sourceId, area, topic, query, reference] of [
    ['findxargs-005', 'gnu-find-xargs-practice', '19', 'linux-systems', '-prune 用于控制', 'man7.org/linux/man-pages/man1/find.1.html'],
    ['dockbuild-003', 'dockerfile-build-foundations', '19', 'containers', 'ENTRYPOINT 和 CMD 时', 'docs.docker.com/reference/dockerfile/'],
    ['pgplan-008', 'postgresql-explain-practice', '19', 'database-fundamentals', '节点 loops 大于 1', 'postgresql.org/docs/17/using-explain.html'],
    ['tcpretx-006', 'tcp-sack-retransmission', '19', 'computer-network', 'Karn 算法', 'rfc-editor.org/rfc/rfc6298.html'],
    ['pysubproc-006', 'python-subprocess-foundations', '02', 'python-data', 'Popen.communicate 超时后', 'docs.python.org/3.12/library/subprocess.html'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.category, 'foundations', id);
    assert.equal(card.knowledgeArea, area, id);
    assert.equal(card.topic, topic, id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
});

test('agent, log, malware and text evaluation cards retain searchable sources', () => {
  const data = createInitialData();
  for (const [id, sourceId, category, area, topic, query, reference] of [
    ['huggpt-005', 'hugginggpt-model-orchestration', 'foundations', '08', 'agent-design', '候选专家模型集合', 'arxiv.org/pdf/2303.17580v1'],
    ['webshop-006', 'webshop-agent-benchmark', 'foundations', '09', 'agent-engineering', '原始目标商品', 'arxiv.org/pdf/2207.01206v1'],
    ['osworld-005', 'osworld-desktop-agent-benchmark', 'foundations', '09', 'agent-engineering', 'WAIT、FAIL 和 DONE', 'arxiv.org/pdf/2404.07972v1'],
    ['neurallog-008', 'neurallog-semantic-anomaly', 'detection', '11', 'anomaly-detection', 'HDFS 与 BGL', 'arxiv.org/pdf/2108.01955v1'],
    ['avclass-009', 'avclass-malware-label-normalization', 'vulnerabilities', '12', 'malware-analysis', 'SINGLETON:样本标识', 'malicialab/avclass/blob/35b0c154'],
    ['bertscore-008', 'bertscore-text-generation-evaluation', 'foundations', '05', 'nlp-transformer', '多个参考分别求分', 'Tiiiger/bert_score/blob/v0.3.13'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.category, category, id);
    assert.equal(card.knowledgeArea, area, id);
    assert.equal(card.topic, topic, id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
});

test('evaluation, inference and security cards retain searchable topics and sources', () => {
  const data = createInitialData();
  for (const [id, sourceId, category, area, topic, query, reference] of [
    ['vllmapc-004', 'vllm-prefix-cache', 'foundations', '06', 'llm-training', '尚未填满的 KV 块', 'vllm-project/vllm/blob/v0.9.2'],
    ['truthqa-008', 'truthfulqa-benchmark', 'foundations', '06', 'llm-training', 'GPT-judge 对未见模型家族', 'arxiv.org/pdf/2109.07958v1'],
    ['cocoeval-008', 'coco-detection-evaluation', 'foundations', '18', 'computer-vision', 'iscrowd 标注计算重叠', 'cocodataset/cocoapi/blob/8c9bcc'],
    ['openvex-006', 'openvex-vulnerability-status', 'operations', '15', 'threat-intelligence', 'justification 和 impact_statement', 'openvex/spec/blob/v0.2.0'],
    ['sarif-007', 'sarif-static-analysis-results', 'vulnerabilities', '13', 'code-vulnerability', 'baselineState 的 new 与 absent', 'sarif-v2.1.0-os.html'],
    ['aflpersist-001', 'afl-persistent-harness', 'vulnerabilities', '14', 'fuzzing', '__AFL_LOOP(n) 中 n', 'AFLplusplus/AFLplusplus/blob/d7986778'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.category, category, id);
    assert.equal(card.knowledgeArea, area, id);
    assert.equal(card.topic, topic, id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
});

test('computing foundation cards retain searchable topics and verifiable sources', () => {
  const data = createInitialData();
  for (const [id, sourceId, topic, query, reference] of [
    ['linuxres-004', 'linux-resource-monitoring', 'linux-systems', 'free 和 available', 'man7.org/linux/man-pages/man1/free'],
    ['dbnorm-008', 'relational-database-normalization', 'database-fundamentals', '学生姓名只由学生编号', 'ibm.com/think/topics/database-normalization'],
    ['complexity-003', 'algorithm-complexity-foundations', 'data-structures', '时间复杂度 Θ', 'courses.csail.mit.edu/6.006'],
    ['dnsresolve-003', 'dns-resolution-delegation', 'computer-network', '没有相关缓存时', 'rfc-editor.org/rfc/rfc1034'],
    ['httpcache-005', 'http-cache-validation-fundamentals', 'computer-network', 's-maxage 和 max-age', 'rfc-editor.org/rfc/rfc9111'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.category, 'foundations', id);
    assert.equal(card.knowledgeArea, '19', id);
    assert.equal(card.topic, topic, id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
});

test('Python, calibration, loss, IoT and metric cards retain searchable sources', () => {
  const data = createInitialData();
  for (const [id, sourceId, category, area, topic, query, reference] of [
    ['futurespy-009', 'python-futures-executors', 'foundations', '02', 'python-data', '输入迭代器是惰性收集', 'docs.python.org/3.12/'],
    ['calapi-005', 'sklearn-probability-calibration', 'foundations', '03', 'ml-basics', 'ensemble=True 与 False', 'scikit-learn.org/1.7/'],
    ['torchloss-007', 'pytorch-common-loss-functions', 'foundations', '04', 'deep-learning', 'KLDivLoss 中 batchmean', 'pytorch.org/docs/2.7/'],
    ['iot23-003', 'iot23-network-dataset', 'detection', '10', 'security-telemetry', '恶意场景与良性场景在设备来源', 'stratosphereips.org/datasets-iot23'],
    ['otelmetric-009', 'opentelemetry-metrics-monitoring', 'foundations', '17', 'model-monitoring', 'Sum 的 delta 与 cumulative', 'opentelemetry-specification/blob/v1.40.0'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.category, category, id);
    assert.equal(card.knowledgeArea, area, id);
    assert.equal(card.topic, topic, id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
});

test('parent retrieval, DoRA and evaluation cards retain searchable sources', () => {
  const data = createInitialData();
  for (const [id, sourceId, category, area, topic, query, reference] of [
    ['lcparent-005', 'langchain-parent-document-retrieval', 'foundations', '07', 'rag-basics', '显式传入 ids', 'bdf1cd383ce3'],
    ['dorafund-006', 'dora-weight-decomposition', 'foundations', '06', 'llm-training', '归一化范数的梯度', '2402.09353v2'],
    ['selfask-003', 'self-ask-compositional-reasoning', 'foundations', '08', 'agent-design', '用什么标记确定追问', '2210.03350v2'],
    ['mcnemar-004', 'mcnemar-paired-classification', 'foundations', '01', 'math-statistics', 'exact=True 和 exact=False', 'v0.14.4'],
    ['seqmetric-005', 'seqeval-entity-metrics', 'foundations', '05', 'nlp-transformer', '实体位置区间', '354c576ca2b3'],
    ['attackdet-003', 'mitre-attack-detection-strategies', 'operations', '16', 'security-operations', 'Detection Strategy 与 Analytic', 'attack.mitre.org/analytics/'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.category, category, id);
    assert.equal(card.knowledgeArea, area, id);
    assert.equal(card.topic, topic, id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
});

test('computer fundamentals cards retain searchable topics and references', () => {
  const data = createInitialData();
  for (const [id, sourceId, topic, query, reference] of [
    ['cmembase-007', 'c-memory-pointer-fundamentals', 'c-programming', '调用 realloc 失败', 'n1570.pdf'],
    ['httpstatus-013', 'http-status-range-fundamentals', 'computer-network', 'If-Match 常用于', 'rfc9110.html'],
    ['archivecmd-008', 'gnu-tar-gzip-commands', 'linux-systems', 'strip-components=N', 'tar.1.html'],
    ['bintree-004', 'binary-tree-traversal-fundamentals', 'data-structures', '二叉树的先序遍历', 'cornell.edu'],
    ['pgcte-007', 'postgresql-views-cte-foundations', 'database-fundamentals', 'UNION 而非 UNION ALL', 'postgresql.org/docs/17/'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.category, 'foundations', id);
    assert.equal(card.knowledgeArea, '19', id);
    assert.equal(card.topic, topic, id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
});

test('Falco, SMOTE, SQuAD and security research cards retain searchable sources', () => {
  const data = createInitialData();
  for (const [id, sourceId, category, area, topic, query, reference] of [
    ['falcobase-012', 'falco-rule-authoring', 'operations', '16', 'security-operations', 'skip-if-unknown-filter=true 后', 'a16386978afd'],
    ['smotepractice-004', 'smote-oversampling-practice', 'foundations', '03', 'ml-basics', '多分类问题中使用浮点', 'imblearn.over_sampling.SMOTE.html'],
    ['squad2-007', 'squad-v2-evaluation', 'foundations', '05', 'nlp-transformer', '官方脚本何时按无答案预测处理', '09eac9971f46'],
    ['ephish-004', 'ephishgen-dataset-evaluation', 'detection', '12', 'phishing-detection', '检测器评测是否覆盖', '2509.01791v1'],
    ['loggpt-005', 'loggpt-sequence-detection', 'detection', '11', 'anomaly-detection', 'Top-K 奖励怎样', '2309.14482v1'],
    ['megavul-003', 'megavul-dataset-construction', 'vulnerabilities', '13', 'code-vulnerability', '临时移除部分宏', '2406.12415v1'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.category, category, id);
    assert.equal(card.knowledgeArea, area, id);
    assert.equal(card.topic, topic, id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
});

test('exception groups, statistics, NVD, fuzzing and speech cards retain searchable scopes', () => {
  const data = createInitialData();
  for (const [id, sourceId, category, area, topic, query, reference] of [
    ['pygroup-005', 'python-exception-groups', 'foundations', '02', 'python-data', '同一异常组可以让多个', 'compound_stmts.html#except-star'],
    ['contingency-009', 'contingency-statistical-tests', 'foundations', '01', 'math-statistics', '重采样方法下，statistic', 'fisher_exact.html'],
    ['nvdapi-005', 'nvd-cve-api-practice', 'operations', '15', 'threat-intelligence', 'lastMod 日期范围和 pub', '/developers/vulnerabilities'],
    ['cflite-007', 'clusterfuzzlite-ci-fuzzing', 'vulnerabilities', '14', 'fuzzing', 'continuous builds 任务为何', '52ecc61cb587'],
    ['w2vpre-004', 'wav2vec2-pretraining-detail', 'foundations', '18', 'speech-audio', '量化模块的输入也使用同一遮盖吗', '2006.11477v3'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.category, category, id);
    assert.equal(card.knowledgeArea, area, id);
    assert.equal(card.topic, topic, id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
  assert.ok(data.cards.find((card) => card.id === 'nvdapi-009')?.sources?.some((source) => source.id === 'nvd-response-schema-224'));
});

test('clustering, preference, benchmark, vision and fingerprint cards retain searchable sources', () => {
  const data = createInitialData();
  for (const [id, sourceId, category, area, topic, query, reference] of [
    ['hdbscan-008', 'sklearn-hdbscan-foundations', 'foundations', '03', 'ml-basics', 'HDBSCAN 标签 -2 和 -3', 'sklearn.cluster.HDBSCAN.html'],
    ['simpopref-003', 'simpo-preference-optimization', 'foundations', '06', 'llm-training', 'SimPO 与标准 DPO', '2405.14734v1'],
    ['gaiabench-005', 'gaia-agent-benchmark', 'foundations', '09', 'agent-engineering', '任务难度分级的近似依据', '2311.12983v1'],
    ['visionweight-004', 'torchvision-model-weights', 'foundations', '18', 'computer-vision', '权重对象的 transforms()', 'vision/0.22/models.html'],
    ['ja4tls-011', 'ja4-tls-fingerprint', 'detection', '10', 'security-telemetry', '扩展哈希输入也包含它们吗', '820ec301a930'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.category, category, id);
    assert.equal(card.knowledgeArea, area, id);
    assert.equal(card.topic, topic, id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
});

test('Git, systemd and pytest cards retain sources and searchable scopes', () => {
  const data = createInitialData();
  for (const [id, sourceId, area, topic, query, reference] of [
    ['githistory-006', 'git-history-debugging', '19', 'version-control', 'git reflog 主要记录什么', 'git-reflog'],
    ['sysservice-004', 'systemd-service-operations', '19', 'linux-systems', 'daemon-reload 重载的内容', 'systemctl.html'],
    ['pytestbase-010', 'pytest-testing-fundamentals', '02', 'python-data', '参数化传入的列表或字典', 'parametrize.html'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.category, 'foundations', id);
    assert.equal(card.knowledgeArea, area, id);
    assert.equal(card.topic, topic, id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
});

test('streaming, checkpoint and AI research cards retain scope and source filters', () => {
  const data = createInitialData();
  for (const [id, sourceId, category, area, topic, query, reference] of [
    ['webstream-016', 'websocket-sse-protocol-foundations', 'foundations', '19', 'computer-network', 'SSE 重连时 Last-Event-ID', 'server-sent-events.html'],
    ['ptsave-006', 'pytorch-checkpoint-serialization', 'foundations', '02', 'python-data', 'map_location="cpu" 常用于', 'torch.load.html'],
    ['codet5-003', 'codet5-identifier-pretraining', 'vulnerabilities', '13', 'code-vulnerability', '同一标识符的多次出现', '2109.00859v1'],
    ['adalora-005', 'adalora-rank-allocation', 'foundations', '06', 'llm-training', '同时保留恢复机会', '2303.10512v1'],
    ['mctsbase-006', 'monte-carlo-tree-search-foundations', 'foundations', '08', 'agent-design', '未访问动作通常如何处理', '2103.04931v1'],
    ['assocanom-005', 'anomaly-transformer-association', 'detection', '11', 'anomaly-detection', '两个阶段分别怎样调整关联', '2110.02642v1'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.category, category, id);
    assert.equal(card.knowledgeArea, area, id);
    assert.equal(card.topic, topic, id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
  assert.ok(data.cards.find((card) => card.id === 'webstream-001')?.sources?.some((source) => source.id === 'whatwg-sse'));
});

test('Kubernetes, permissions, vision and retrieval cards retain source and scope', () => {
  const data = createInitialData();
  for (const [id, sourceId, category, area, topic, query, reference] of [
    ['k8sbase-017', 'kubernetes-workload-service-foundations', 'foundations', '19', 'containers', '配置 startupProbe 后', 'liveness-readiness-startup-probes'],
    ['linuxperm-003', 'linux-file-permissions-fundamentals', 'foundations', '19', 'linux-systems', 'umask 怎样影响请求的权限位', 'umask.2.html'],
    ['maevision-006', 'masked-autoencoder-vision-foundations', 'foundations', '18', 'computer-vision', '像素重建损失在哪些图像块', '2111.06377v3'],
    ['diversevul-008', 'diversevul-code-dataset', 'vulnerabilities', '13', 'code-vulnerability', '各类的 FPR 相同', '2304.00409v2'],
    ['stencode-007', 'sentence-transformers-encode-practice', 'foundations', '07', 'rag-basics', 'precision="int8"', 'v5.1.2'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.category, category, id);
    assert.equal(card.knowledgeArea, area, id);
    assert.equal(card.topic, topic, id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
});

test('computer fundamentals and AI additions retain scope and searchable references', () => {
  const data = createInitialData();
  for (const [id, sourceId, category, area, topic, query, reference] of [
    ['ethvlan-001', 'ethernet-switching-vlan-foundations', 'foundations', '19', 'computer-network', '动态学习的以太网交换机', '/networking/bridge.html'],
    ['mmapbase-004', 'linux-memory-mapping-fundamentals', 'foundations', '19', 'operating-systems', '立即关闭原文件描述符', 'mmap.2.html'],
    ['bstbase-005', 'binary-search-trees-foundations', 'foundations', '19', 'data-structures', 'floor(key) 与 ceiling(key)', '/32bst/'],
    ['ropebase-005', 'rope-rotation-foundations', 'foundations', '05', 'nlp-transformer', 'R(m)ᵀR(n)', '2104.09864v5'],
    ['rmsgate-010', 'rmsnorm-swiglu-foundations', 'foundations', '04', 'deep-learning', '三矩阵 SwiGLU', '2002.05202v1'],
    ['pathsec-007', 'path-traversal-code-analysis', 'vulnerabilities', '13', 'code-vulnerability', 'RESOLVE_NO_SYMLINKS 与 O_NOFOLLOW', 'openat2.2.html'],
    ['humaneval-002', 'humaneval-code-evaluation', 'foundations', '17', 'data-evaluation', 'HumanEval 每题采样', '2107.03374v2'],
    ['htnbase-005', 'hierarchical-task-network-planning', 'foundations', '08', 'agent-design', '复合任务本身直接定义状态效果', '1911.05499v1'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.category, category, id);
    assert.equal(card.knowledgeArea, area, id);
    assert.equal(card.topic, topic, id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
});

test('statistics, embedding, malware and OCR additions keep their categories and sources', () => {
  const data = createInitialData();
  for (const [id, sourceId, category, area, topic, query, reference] of [
    ['corrstat-007', 'correlation-statistical-foundations', 'foundations', '01', 'math-statistics', '遇到常量输入时相关系数', 'pearsonr.html'],
    ['distshift-004', 'distribution-drift-statistics', 'foundations', '17', 'data-evaluation', 'statistic_sign 为 +1', 'ks_2samp.html'],
    ['embedbag-005', 'pytorch-embeddingbag-practice', 'foundations', '04', 'deep-learning', 'padding_idx 对袋内聚合', 'EmbeddingBag.html'],
    ['yarape-009', 'yara-pe-rule-practice', 'vulnerabilities', '12', 'malware-analysis', '对未定义值取 not', 'writingrules.html'],
    ['ocrpractice-005', 'tesseract-ocr-document-practice', 'foundations', '18', 'document-understanding', 'TSV 与 hOCR', 'Command-Line-Usage.html'],
    ['selfrefine-002', 'self-refine-agent-feedback', 'foundations', '08', 'agent-design', '具体反馈与可执行反馈', '2303.17651v2'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.category, category, id);
    assert.equal(card.knowledgeArea, area, id);
    assert.equal(card.topic, topic, id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
  assert.ok(data.cards.find((card) => card.id === 'distshift-011')?.sources?.some((source) => source.url.includes('ks_2samp.html')));
});

test('text vectorization and security analysis cards remain searchable with their evidence', () => {
  const data = createInitialData();
  for (const [id, sourceId, category, area, topic, query, reference] of [
    ['sktext-016', 'sklearn-text-vectorization', 'foundations', '03', 'ml-basics', 'binary=True 是否保证最终输出', 'TfidfVectorizer.html'],
    ['trailsec-010', 'cloudtrail-security-telemetry', 'detection', '10', 'security-telemetry', 'eventID 与 sharedEventID', 'cloudtrail-event-reference-record-contents.html'],
    ['kerbaudit-004', 'windows-kerberos-audit', 'detection', '10', 'security-telemetry', '不要求 Kerberos 预身份验证', 'event-4771'],
    ['guardsec-006', 'guardduty-threat-findings', 'detection', '11', 'network-threats', '更多相关活动时', 'finding-aggregation.html'],
    ['splunkops-005', 'splunk-spl-security-analysis', 'operations', '16', 'security-operations', 'stats 和 eventstats', 'eventstats'],
    ['planmodel-006', 'classical-agent-planning', 'foundations', '08', 'agent-design', '封闭世界假设下', '/pddl/problem'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.category, category, id);
    assert.equal(card.knowledgeArea, area, id);
    assert.equal(card.topic, topic, id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
  assert.ok(data.cards.find((card) => card.id === 'kerbaudit-001')?.sources?.some((source) => source.url.includes('event-4769')));
});

test('MySQL, command-line and distributed systems cards retain scope and references', () => {
  const data = createInitialData();
  for (const [id, sourceId, topic, query, reference] of [
    ['mysqlidx-004', 'mysql-innodb-index-foundations', 'database-fundamentals', '二级索引找到记录后', 'innodb-index-types.html'],
    ['mysqltx-007', 'mysql-innodb-transactions', 'database-fundamentals', 'next-key lock 由哪两部分', 'innodb-locking.html'],
    ['textcli-004', 'linux-text-processing-commands', 'linux-systems', 'NR 与 FNR', 'awk.1p.html'],
    ['overload-006', 'distributed-overload-reliability', 'distributed-systems', '健康检查失败可能放大故障', 'addressing-cascading-failures/'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.knowledgeArea, '19', id);
    assert.equal(card.topic, topic, id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
  assert.ok(data.cards.find((card) => card.id === 'mysqlidx-007')?.sources?.some((source) => source.url.includes('range-access-skip-scan')));
});

test('distillation, agent interfaces, fuzzing and evaluation cards remain searchable', () => {
  const data = createInitialData();
  for (const [id, sourceId, area, topic, query, reference] of [
    ['distillbert-009', 'distillation-distilbert', '05', 'nlp-transformer', '余弦嵌入损失主要希望', '1910.01108v4'],
    ['sweaci-006', 'swe-agent-interface', '09', 'agent-engineering', '编辑检查发现指定代码错误', '2405.15793v3'],
    ['agentbench-002', 'agentbench-interactive-evaluation', '09', 'agent-engineering', 'Invalid Format 与 Invalid Action', '2308.03688v3'],
    ['autogenbase-002', 'autogen-conversation-basics', '08', 'agent-design', 'AssistantAgent 与 UserProxyAgent', '2308.08155v2'],
    ['hydecore-003', 'hyde-retrieval-details', '07', 'rag-basics', '采样多个假设文档时', '2212.10496v1'],
    ['syzbase-003', 'syzkaller-syscall-fuzzing', '14', 'fuzzing', '利用资源类型安排', 'b2c694599a95'],
    ['kcovbase-005', 'linux-kcov-fuzzing', '14', 'fuzzing', 'KCOV 程序位置采集', '/v6.12/dev-tools/kcov.html'],
    ['otelbase-005', 'opentelemetry-agent-tracing', '09', 'agent-engineering', 'span link 主要解决', '/concepts/signals/traces/'],
    ['binomeval-006', 'binomial-security-evaluation', '17', 'data-evaluation', 'alternative="less" 后', 'scipy-1.15.3'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.knowledgeArea, area, id);
    assert.equal(card.topic, topic, id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
});

test('statistics, agent and security additions retain their scope and references', () => {
  const data = createInitialData();
  for (const [id, sourceId, area, topic, query, reference] of [
    ['fdrstudy-001', 'multiple-testing-fdr', '01', 'math-statistics', '假发现率（FDR）衡量什么', 'scipy-1.15.3'],
    ['eqlsec-006', 'eql-security-event-sequences', '16', 'security-operations', '受限时间内缺少某类事件', '/8.17/eql-syntax.html'],
    ['nbaiot-005', 'nbaiot-botnet-detection', '11', 'network-threats', '正常优化集的重构误差', '1805.03409v1'],
    ['ecodstudy-007', 'ecod-outlier-detection', '11', 'anomaly-detection', '尾部聚合使用特征分布', '2201.00382v3'],
    ['scot-002', 'self-consistency-reasoning', '06', 'llm-training', '投票前为什么常需要统一答案格式', '2203.11171v4'],
    ['leastmost-001', 'least-to-most-reasoning', '08', 'agent-design', '顺序求解阶段如何利用已解决', '2205.10625v3'],
    ['fuzzall-003', 'fuzz4all-generation-oracles', '14', 'fuzzing', '目标系统必须支持代码插桩', '2308.04748v3'],
    ['unicorn-005', 'unicorn-provenance-detection', '11', 'threat-behavior', '近期活动没有因果关联', '2001.01525v1'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.knowledgeArea, area, id);
    assert.equal(card.topic, topic, id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
  assert.equal(data.cards.find((card) => card.id === 'scot-002')?.sources?.[0]?.evidence, 'application');
});

test('general computer additions are searchable with their individual sources', () => {
  const data = createInitialData();
  for (const [id, sourceId, topic, query, reference] of [
    ['ngxlb-004', 'nginx-load-balancing', 'computer-network', '权重分别为 3、1、1', 'nginx.org/en/docs/http/load_balancing.html'],
    ['appcache-004', 'application-cache-patterns', 'caching-systems', '先删缓存再更新数据库', 'aws.amazon.com/caching/best-practices/'],
    ['bloomcs-004', 'bloom-filter-foundations', 'data-structures', '位置 2、5', 'redis.io/docs/'],
    ['chashcs-003', 'consistent-hashing-foundations', 'distributed-systems', '键的位置为 95', 'amazon-dynamo-sosp2007.pdf'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.knowledgeArea, '19', id);
    assert.equal(card.topic, topic, id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
  assert.equal(data.cards.find((card) => card.id === 'appcache-004')?.sources?.[0]?.evidence, 'application');
});

test('threat feeds and incident analysis cards keep searchable sources and inference labels', () => {
  const data = createInitialData();
  for (const [id, sourceId, topic, area, query, reference] of [
    ['urlfeed-001', 'urlhaus-threat-feed', 'threat-intelligence', '15', 'URLhaus 社区情报主要收录', 'urlhaus.abuse.ch/api/'],
    ['phishfeed-001', 'phishtank-feed-boundaries', 'phishing-detection', '12', 'verified 和 online 字段', 'phishtank.org/developer_info.php'],
    ['mbfeed-001', 'malwarebazaar-community-data', 'malware-analysis', '12', '社区提交策略主要接收', 'bazaar.abuse.ch/api/'],
    ['toniot-001', 'ton-iot-multisource-dataset', 'security-telemetry', '10', '官方说明中包含哪几类', 'projects/toniot-datasets'],
    ['trancoeval-001', 'tranco-ranking-evaluation', 'data-evaluation', '17', '榜单主要对什么对象', 'tranco-list.eu/'],
    ['nistir-003', 'nist-incident-analysis-communication', 'security-operations', '16', '已知受影响资产之外', 'NIST.SP.800-61r3.pdf'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.topic, topic, id);
    assert.equal(card.knowledgeArea, area, id);
    assert.equal(card.origin, '自行整理', id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
  for (const id of ['toniot-006', 'toniot-007', 'trancoeval-004', 'trancoeval-005']) {
    assert.ok(data.cards.find((card) => card.id === id)?.sources?.some((source) => source.evidence === 'application'), id);
  }
});

test('RL, Bayesian and security evaluation cards preserve evidence and source filtering', () => {
  const data = createInitialData();
  for (const [id, sourceId, topic, area, query, reference] of [
    ['pgbase-001', 'policy-gradient-gae', 'reinforcement-learning', '18', '策略梯度方法要对什么量', 'spinningup.openai.com/'],
    ['ppoclip-001', 'ppo-clipped-objective', 'reinforcement-learning', '18', '每个采样动作的新旧策略比率', '/algorithms/ppo.html'],
    ['instructrl-001', 'instructgpt-rlhf-training', 'llm-training', '06', 'SFT、奖励模型和 PPO 分别', '2203.02155v1'],
    ['bayesup-001', 'bayesian-updating-foundations', 'math-statistics', '01', '有限且互斥完备的假设集合', 'ThinkBayes2/chap02.html'],
    ['botiot-001', 'bot-iot-dataset', 'security-telemetry', '10', '来自什么类型的网络环境', 'research.unsw.edu.au/projects/bot-iot-dataset'],
    ['fbench-001', 'fuzzbench-evaluation-methods', 'fuzzing', '14', 'FuzzBench 主要比较什么', 'pubtools/6318.pdf'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.topic, topic, id);
    assert.equal(card.knowledgeArea, area, id);
    assert.equal(card.origin, '自行整理', id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
  const inference = data.cards.find((card) => card.id === 'botiot-007');
  assert.ok(inference?.sources?.some((source) => source.evidence === 'application'));
});

test('browser, database and IPv6 cards retain their references and source filters', () => {
  const data = createInitialData();
  for (const [id, sourceId, topic, query, reference] of [
    ['weborigin-001', 'browser-origin-cors-cookies', 'computer-network', '两个普通 HTTP(S) URL 是否同源', 'developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy'],
    ['pgconstr-001', 'postgresql-constraints-design', 'database-fundamentals', 'CHECK (price > 0)', 'postgresql.org/docs/17/ddl-constraints.html'],
    ['ipv6net-001', 'ipv6-dhcp-fundamentals', 'computer-network', 'IPv6 的基础首部长度', 'rfc-editor.org/rfc/rfc8200.html'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.topic, topic, id);
    assert.equal(card.knowledgeArea, '19', id);
    assert.equal(card.origin, '自行整理', id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
});

test('computer fundamentals are searchable by their source and topic with individual evidence', () => {
  const data = createInitialData();
  for (const [id, sourceId, topic, query, reference] of [
    ['ipcbase-001', 'linux-ipc-fundamentals', 'operating-systems', 'pipe 调用成功', 'man7.org/linux/man-pages/man7/pipe.7.html'],
    ['epollbase-001', 'linux-io-multiplexing', 'operating-systems', 'epoll 主要解决', 'man7.org/linux/man-pages/man7/epoll.7.html'],
    ['graphalg-001', 'graph-algorithms-fundamentals', 'data-structures', '节点入队时就标记', 'cp-algorithms.com/graph/breadth-first-search.html'],
    ['dockbase-001', 'docker-container-fundamentals', 'containers', '镜像与容器的基本关系', 'docs.docker.com/'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.topic, topic, id);
    assert.equal(card.knowledgeArea, '19', id);
    assert.equal(card.origin, '自行整理', id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
});

test('phishing, neural fuzzing and intrusion analysis cards retain evidence and scope', () => {
  const data = createInitialData();
  const phishing = data.cards.find((card) => card.id === 'phishmm-020');
  const debate = data.cards.find((card) => card.id === 'neuzz-018');
  const diamond = data.cards.find((card) => card.id === 'diamond-016');
  assert.equal(phishing?.knowledgeArea, '12');
  assert.equal(debate?.knowledgeArea, '14');
  assert.equal(diamond?.knowledgeArea, '15');
  assert.ok(phishing?.sources?.some((source) => source.url.includes('2408.05941v1')));
  assert.ok(debate?.sources?.some((source) => source.url.includes('2309.16618v1')));
  assert.ok(debate?.sources?.some((source) => source.url.includes('2409.04504v1')));
  assert.ok(debate?.sources?.some((source) => source.url.includes('1807.05620v4')));
  assert.ok(diamond && matchesScope(diamond, { sourceId: 'diamond-intrusion-analysis' }));
  assert.deepEqual(getStudyQueue(data, Date.now(), undefined,
    { sourceId: 'neuzz-neural-fuzzing', query: '输入梯度的绝对值' }).map((card) => card.id), ['neuzz-009']);
});

test('malware and vulnerability research cards retain the correct scope and individual evidence', () => {
  const data = createInitialData();
  const challenge = data.cards.find((card) => card.id === 'malbench-013');
  const sandbox = data.cards.find((card) => card.id === 'sandbox-009');
  const conformal = data.cards.find((card) => card.id === 'conformal-010');
  const kev = data.cards.find((card) => card.id === 'kevdata-006');
  assert.equal(challenge?.knowledgeArea, '12');
  assert.equal(sandbox?.topic, 'malware-analysis');
  assert.equal(conformal?.knowledgeArea, '17');
  assert.equal(kev?.knowledgeArea, '15');
  assert.ok(challenge?.sources?.some((source) => source.url.includes('2506.05074v1')));
  assert.ok(sandbox?.sources?.some((source) => source.url.includes('/2.0.7/usage/results/')));
  assert.ok(conformal?.sources?.some((source) => source.url.includes('transcend_ext.pdf')));
  assert.ok(kev?.sources?.some((source) => source.url.includes('known_exploited_vulnerabilities_schema.json')));
  assert.ok(kev && matchesScope(kev, { sourceId: 'cisa-kev-schema' }));
  assert.deepEqual(getStudyQueue(data, Date.now(), undefined,
    { sourceId: 'modern-malware-benchmarks', query: '挑战集是否全部来自主训练期之后' }).map((card) => card.id), ['malbench-013']);
});

test('search planning and security triage cards retain scope and original sources', () => {
  const data = createInitialData();
  const search = data.cards.find((card) => card.id === 'agentplan-021');
  const triage = data.cards.find((card) => card.id === 'deepcase-020');
  const identity = data.cards.find((card) => card.id === 'identitydetect-001');
  assert.equal(search?.knowledgeArea, '08');
  assert.equal(search?.topic, 'agent-design');
  assert.equal(triage?.knowledgeArea, '16');
  assert.equal(identity?.knowledgeArea, '11');
  assert.ok(search?.sources?.some((source) => source.url.includes('cs188/textbook/search/informed')));
  assert.ok(triage?.sources?.some((source) => source.url.includes('/papers/deepcase.pdf')));
  assert.ok(identity?.sources?.some((source) => source.url.includes('/versions/v20/techniques/T1621/')));
  assert.ok(triage && matchesScope(triage, { sourceId: 'deepcase-contextual-triage' }));
  assert.deepEqual(getStudyQueue(data, Date.now(), undefined,
    { sourceId: 'agent-classical-search', query: '多个非负可采纳启发值取最大值' }).map((card) => card.id), ['agentplan-027']);
});

test('language evaluation and vision foundation cards remain searchable with their sources', () => {
  const data = createInitialData();
  const bleu = data.cards.find((card) => card.id === 'nlpeval-011');
  const vit = data.cards.find((card) => card.id === 'clipvit-010');
  assert.equal(bleu?.knowledgeArea, '05');
  assert.equal(vit?.knowledgeArea, '18');
  assert.equal(vit?.topic, 'multimodal-learning');
  assert.ok(bleu?.sources?.some((source) => source.url.includes('aclanthology.org/P02-1040')));
  assert.ok(vit?.sources?.some((source) => source.url.includes('2010.11929')));
  assert.ok(vit && matchesScope(vit, { sourceId: 'clip-vit-foundations' }));
  assert.deepEqual(getStudyQueue(data, Date.now(), undefined,
    { sourceId: 'nlp-generation-evaluation', query: 'ROUGE-L 使用的最长公共子序列' }).map((card) => card.id), ['nlpeval-020']);
});

test('vulnerability audit composites are split into independent evidence, validation and cost cards', () => {
  const data = createInitialData();
  for (const id of ['ai4sec-023', 'ai4sec-030', 'llmv-004', 'llmv-010']) {
    assert.ok(!data.cards.some((card) => card.id === id));
  }
  assert.ok(data.cards.find((card) => card.id === 'llmvstudy-017')?.sources?.some((source) => source.sourceCardId === 'ai4sec-030'));
  assert.ok(data.cards.find((card) => card.id === 'cflow-008')?.sources?.some((source) => source.sourceCardId === 'llmv-004'));
  assert.ok(data.cards.find((card) => card.id === 'llmvstudy-020')?.sources?.some((source) => source.sourceCardId === 'llmv-010'));
});

test('vulnerability reasoning cards retain fixed research and reporting sources', () => {
  const data = createInitialData();
  const knowledge = data.cards.find((card) => card.id === 'llmvstudy-004');
  const report = data.cards.find((card) => card.id === 'llmvstudy-017');
  assert.equal(knowledge?.knowledgeArea, '13');
  assert.equal(report?.topic, 'code-vulnerability');
  assert.ok(knowledge?.sources?.some((source) => source.url.includes('2401.16185v4')));
  assert.ok(report?.sources?.some((source) => source.url.includes('dd33419e10edb22b78d89325a6c2aad9f184e3a2')));
  assert.ok(report && matchesScope(report, { sourceId: 'llm4vuln-study' }));
  assert.deepEqual(getStudyQueue(data, Date.now(), undefined,
    { sourceId: 'llm4vuln-study', query: '报告中写清复现步骤' }).map((card) => card.id), ['llmvstudy-017']);
});

test('composite interview questions map to independent cards with clearly labeled inspiration', () => {
  const data = createInitialData();
  for (const id of ['interview-001', 'interview-002', 'interview-003']) {
    assert.ok(!data.cards.some((card) => card.id === id));
  }
  for (const id of ['copilot-001', 'code-012', 'ai4sec-033', 'rag-001', 'copilot-008', 'ai4sec-040']) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card?.sources?.some((source) => source.id === 'github-ai4sec-interview' &&
      source.title.includes('主题启发') && source.title.includes('非逐题原文') && source.evidence === 'application'));
    assert.ok(card && matchesScope(card, { sourceId: 'github-ai4sec-interview' }));
  }
});

test('feature-selection cards retain their versioned references and searchable source', () => {
  const data = createInitialData();
  const selector = data.cards.find((card) => card.id === 'skselect-011');
  const importance = data.cards.find((card) => card.id === 'skselect-030');
  assert.equal(selector?.knowledgeArea, '03');
  assert.equal(importance?.topic, 'ml-basics');
  assert.ok(selector?.sources?.some((source) => source.url.includes('/1.7/modules/generated/sklearn.feature_selection.SelectKBest')));
  assert.ok(importance && matchesScope(importance, { sourceId: 'sklearn-feature-selection' }));
  assert.deepEqual(getStudyQueue(data, Date.now(), undefined,
    { sourceId: 'sklearn-feature-selection', query: '平均置换重要性为负数' }).map((card) => card.id), ['skselect-032']);
});

test('Python typing and dataclass cards retain versioned evidence and source filtering', () => {
  const data = createInitialData();
  const typed = data.cards.find((card) => card.id === 'pytypes-004');
  const factory = data.cards.find((card) => card.id === 'pytypes-019');
  assert.equal(typed?.knowledgeArea, '02');
  assert.equal(factory?.topic, 'python-data');
  assert.ok(typed?.sources?.some((source) => source.url.includes('/3.12/library/typing.html#typing.TypedDict')));
  assert.ok(factory?.sources?.some((source) => source.url.includes('/3.12/library/dataclasses.html')));
  assert.ok(typed && matchesScope(typed, { sourceId: 'python-typing-dataclasses' }));
  assert.deepEqual(getStudyQueue(data, Date.now(), undefined,
    { sourceId: 'python-typing-dataclasses', query: 'Optional[int] 是否意味着' }).map((card) => card.id), ['pytypes-001']);
});

test('temporal evaluation cards retain their sources and can be found by topic and source', () => {
  const data = createInitialData();
  const time = data.cards.find((card) => card.id === 'tessdetail-003');
  const recall = data.cards.find((card) => card.id === 'tessdetail-011');
  assert.equal(time?.knowledgeArea, '17');
  assert.equal(time?.topic, 'data-evaluation');
  assert.ok(time?.sources?.some((source) => source.url.includes('sec19-pendlebury.pdf')));
  assert.ok(recall?.sources?.some((source) => source.url.includes('/1.7/modules/generated/sklearn.metrics.recall_score')));
  assert.ok(time && matchesScope(time, { sourceId: 'tesseract-evaluation-detail' }));
  assert.deepEqual(getStudyQueue(data, Date.now(), undefined,
    { sourceId: 'tesseract-evaluation-detail', query: '最晚训练样本' }).map((card) => card.id), ['tessdetail-003']);
});

test('LangChain practical cards retain versioned sources and support source filtering', () => {
  const data = createInitialData();
  const tool = data.cards.find((card) => card.id === 'lcpractice-002');
  const mmr = data.cards.find((card) => card.id === 'lcragapi-004');
  assert.equal(tool?.knowledgeArea, '09');
  assert.equal(mmr?.knowledgeArea, '07');
  assert.equal(tool?.topic, 'agent-engineering');
  assert.equal(mmr?.topic, 'rag-basics');
  assert.ok(tool?.sources?.some((source) => source.url.includes('langchain-core%3D%3D1.8.4')));
  assert.ok(mmr && matchesScope(mmr, { sourceId: 'langchain-rag-apis' }));
  assert.deepEqual(getStudyQueue(data, Date.now(), undefined,
    { sourceId: 'langchain-core-practice', query: 'tool_call_id' }).map((card) => card.id), ['lcpractice-002']);
});

test('Python syntax and scikit-learn API cards retain their scope and technical references', () => {
  const data = createInitialData();
  const signature = data.cards.find((card) => card.id === 'pysyntax-001');
  const split = data.cards.find((card) => card.id === 'skapi-004');
  const decorator = data.cards.find((card) => card.id === 'pysyntax-026');
  assert.equal(signature?.knowledgeArea, '02');
  assert.equal(split?.knowledgeArea, '03');
  assert.ok(signature?.sources?.some((source) => source.url.includes('/3.13/')));
  assert.ok(split?.sources?.some((source) => source.url.includes('/1.7/')));
  assert.ok(decorator?.sources?.some((source) => source.id === 'company-bytedance' && source.title.includes('主题启发')));
  assert.ok(signature && matchesScope(signature, { sourceId: 'python-syntax-foundations' }));
  assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId: 'sklearn-common-apis', query: '同时接收 X 和 y' }).map((card) => card.id), ['skapi-004']);
});

test('security operating-point cards retain research, interview and corrected legacy evidence', () => {
  const data = createInitialData();
  const confidence = data.cards.find((card) => card.id === 'opseval-005');
  const legacy = data.cards.find((card) => card.id === 'suri-006');
  assert.equal(confidence?.knowledgeArea, '17');
  assert.ok(confidence?.sources?.some((source) => source.id === 'company-tencent' && source.title.includes('主题启发')));
  assert.ok(confidence?.sources?.some((source) => source.id === 'binomial-confidence-ref'));
  assert.ok(legacy?.sources?.some((source) => source.id === 'security-eval-paper'));
  assert.ok(confidence && matchesScope(confidence, { sourceId: publicInterviewScope }));
  assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId: 'security-operating-point-evaluation', query: '最小非零经验假正例率' }).map((card) => card.id), ['opseval-004']);
});

test('NumPy foundations preserve versioned evidence and Python interview themes', () => {
  const data = createInitialData();
  const indexing = data.cards.find((card) => card.id === 'npstudy-009');
  const wrapper = data.cards.find((card) => card.id === 'npstudy-033');
  assert.equal(indexing?.knowledgeArea, '02');
  assert.equal(indexing?.topic, 'python-data');
  assert.ok(indexing?.sources?.some((source) => source.url.includes('/doc/2.2/')));
  assert.ok(wrapper?.sources?.some((source) => source.id === 'company-bytedance' && source.title.includes('主题启发')));
  assert.ok(wrapper && matchesScope(wrapper, { sourceId: publicInterviewScope }));
  assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId: 'numpy-data-fundamentals', query: '重复索引有何区别' }).map((card) => card.id), ['npstudy-009']);
});

test('speech foundations retain their research sources and are searchable in their topic', () => {
  const data = createInitialData();
  const ctc = data.cards.find((card) => card.id === 'speechfund-021');
  const w2v = data.cards.find((card) => card.id === 'speechfund-029');
  assert.equal(ctc?.knowledgeArea, '18');
  assert.equal(ctc?.topic, 'speech-audio');
  assert.ok(ctc?.sources?.some((source) => source.url.includes('distill.pub/2017/ctc/')));
  assert.ok(w2v?.sources?.some((source) => source.url.includes('2006.11477v3')));
  assert.ok(ctc && matchesScope(ctc, { sourceId: 'speech-recognition-foundations' }));
  assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId: 'speech-recognition-foundations', query: 'CTC 怎样计算一个目标文本的概率' }).map((card) => card.id), ['speechfund-021']);
});

test('SFT cards retain technical sources and interview theme provenance', () => {
  const data = createInitialData();
  const mask = data.cards.find((card) => card.id === 'sftdialogue-012');
  const format = data.cards.find((card) => card.id === 'sftdialogue-009');
  assert.equal(mask?.knowledgeArea, '06');
  assert.equal(mask?.topic, 'llm-training');
  assert.ok(mask?.sources?.some((source) => source.url.includes('/trl/blob/v0.23.0/')));
  assert.ok(mask?.sources?.some((source) => source.id === 'company-bytedance' && source.title.includes('主题启发')));
  assert.ok(format?.sources?.some((source) => source.id === 'company-tencent' && source.title.includes('主题启发')));
  assert.ok(mask && matchesScope(mask, { sourceId: publicInterviewScope }));
  assert.ok(format && matchesScope(format, { sourceId: 'company-tencent' }));
  assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId: 'sft-dialogue-foundations', query: '损失掩码与注意力掩码分别' }).map((card) => card.id), ['sftdialogue-012']);
});

test('neural fundamentals retain technical evidence and reported interview themes', () => {
  const data = createInitialData();
  const residual = data.cards.find((card) => card.id === 'nncore-008');
  const softmax = data.cards.find((card) => card.id === 'nnloss-008');
  const relu = data.cards.find((card) => card.id === 'nncore-002');
  assert.equal(residual?.knowledgeArea, '04');
  assert.equal(softmax?.topic, 'deep-learning');
  assert.ok(residual?.sources?.some((source) => source.url.includes('1603.05027v3')));
  assert.ok(residual?.sources?.some((source) => source.id === 'company-deepglint' && source.title.includes('主题启发')));
  assert.ok(softmax?.sources?.some((source) => source.id === 'company-horizon' && source.title.includes('主题启发')));
  assert.ok(residual && matchesScope(residual, { sourceId: 'company-deepglint' }));
  assert.ok(softmax && matchesScope(softmax, { sourceId: publicInterviewScope }));
  assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId: 'neural-network-foundations', query: 'ReLU 对正数和负数' }).map((card) => card.id), [relu?.id]);
});

test('AI foundations and DNS research retain their scope and interview provenance', () => {
  const data = createInitialData();
  const pca = data.cards.find((card) => card.id === 'pcastudy-003');
  const tunnel = data.cards.find((card) => card.id === 'dnstunnel-008');
  const doh = data.cards.find((card) => card.id === 'dohdata-003');
  const existing = data.cards.find((card) => card.id === 'zeek-008');
  assert.equal(pca?.knowledgeArea, '03');
  assert.equal(tunnel?.knowledgeArea, '11');
  assert.equal(doh?.knowledgeArea, '10');
  assert.ok(pca?.sources?.some((source) => source.url.includes('scikit-learn.org/1.9/')));
  assert.ok(tunnel?.sources?.some((source) => source.url.includes('2505.22220v1')));
  assert.ok(tunnel?.sources?.some((source) => source.id === 'company-ant' && source.title.includes('主题启发')));
  assert.ok(doh?.sources?.some((source) => source.url.includes('dohbrw-2020')));
  assert.ok(existing?.sources?.some((source) => source.sourceCardId === 'dnstunnel-002'));
  assert.ok(!data.cards.some((card) => card.id === 'dnstunnel-002'));
  assert.ok(pca && matchesScope(pca, { sourceId: 'pca-manifold-basics' }));
  assert.ok(tunnel && matchesScope(tunnel, { sourceId: 'company-ant' }));
  assert.ok(tunnel && matchesScope(tunnel, { sourceId: publicInterviewScope }));
  assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId: 'pca-manifold-basics', query: '自动标准化每个特征的方差' }).map((card) => card.id), ['pcastudy-003']);
});

test('retrieval and agent benchmark cards retain research sources and scope', () => {
  const data = createInitialData();
  const beir = data.cards.find((card) => card.id === 'beir-003');
  const voyager = data.cards.find((card) => card.id === 'voyager-003');
  const webarena = data.cards.find((card) => card.id === 'webarena-006');
  const legacy = data.cards.find((card) => card.id === 'ai4sec-026');
  assert.equal(beir?.knowledgeArea, '07');
  assert.equal(voyager?.knowledgeArea, '08');
  assert.equal(webarena?.knowledgeArea, '09');
  assert.ok(beir?.sources?.some((source) => source.url.includes('2104.08663v3')));
  assert.ok(voyager?.sources?.some((source) => source.url.includes('2305.16291v1')));
  assert.ok(webarena?.sources?.some((source) => source.url.includes('2307.13854v1')));
  assert.ok(legacy?.sources?.some((source) => source.sourceCardId === 'legacy25-007'));
  assert.ok(!data.cards.some((card) => card.id === 'legacy25-007'));
  assert.ok(beir && matchesScope(beir, { sourceId: 'beir-retrieval-evaluation' }));
  assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId: 'beir-retrieval-evaluation', query: '没有相关性标注' }).map((card) => card.id), ['beir-003']);
});

test('sequence pretraining cards retain sources and the reviewed drift card merges its reference', () => {
  const data = createInitialData();
  const t5 = data.cards.find((card) => card.id === 'seq2seq-018');
  const bart = data.cards.find((card) => card.id === 'seq2seq-014');
  const teacher = data.cards.find((card) => card.id === 'seq2seq-001');
  const mask = data.cards.find((card) => card.id === 'seq2seq-011');
  const drift = data.cards.find((card) => card.id === 'ai4sec-015');
  assert.equal(t5?.knowledgeArea, '05');
  assert.equal(mask?.topic, 'nlp-transformer');
  assert.ok(t5?.sources?.some((source) => source.url.includes('1910.10683v4')));
  assert.ok(bart?.sources?.some((source) => source.url.includes('1910.13461v1')));
  assert.ok(teacher?.sources?.some((source) => source.sourceCardId === 'seq2seq-003'));
  assert.ok(!data.cards.some((card) => card.id === 'seq2seq-003'));
  assert.ok(drift?.sources?.some((source) => source.sourceCardId === 'production-009'));
  assert.ok(!data.cards.some((card) => card.id === 'production-009'));
  assert.ok(mask && matchesScope(mask, { sourceId: 'seq2seq-pretraining' }));
  const queue = getStudyQueue(data, Date.now(), undefined, { sourceId: 'seq2seq-pretraining', query: 'key_padding_mask 会保证' });
  assert.deepEqual(queue.map((card) => card.id), ['seq2seq-011']);
});

test('security interview additions retain independent evidence and company filters', () => {
  const data = createInitialData();
  const blind = data.cards.find((card) => card.id === 'secnew-001');
  const ssrf = data.cards.find((card) => card.id === 'weakness-008');
  const baseline = data.cards.find((card) => card.id === 'ai4sec-014');
  assert.equal(blind?.knowledgeArea, '13');
  assert.ok(blind?.sources?.some((source) => source.id === 'portswigger-blind-sql-ref'));
  assert.ok(blind && matchesScope(blind, { sourceId: 'company-pingcap' }));
  assert.ok(blind && matchesScope(blind, { sourceId: publicInterviewScope }));
  assert.ok(ssrf?.sources?.some((source) => source.id === 'company-pingcap' && source.sourceCardId === 'secnew-002'));
  assert.ok(baseline?.sources?.some((source) => source.id === 'company-bytedance' && source.sourceCardId === 'secnew-004'));
  assert.ok(!data.cards.some((card) => card.id === 'secnew-002'));
  assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId: 'company-pingcap', query: '布尔盲注' }).map((card) => card.id), ['secnew-001']);
});

test('SOC investigation cards retain their source and independent review scope', () => {
  const data = createInitialData();
  const question = data.cards.find((card) => card.id === 'socstudy-001');
  const metrics = data.cards.find((card) => card.id === 'socstudy-015');
  const summary = data.cards.find((card) => card.id === 'copilot-006');
  assert.equal(question?.knowledgeArea, '16');
  assert.equal(metrics?.topic, 'security-operations');
  assert.ok(question?.sources?.some((source) => source.url.includes('2603.06422v1')));
  assert.ok(metrics?.sources?.some((source) => source.url.includes('2411.03116v2')));
  assert.ok(summary?.sources?.some((source) => source.id === 'summeval-quality-ref'));
  assert.ok(question && matchesScope(question, { sourceId: 'soc-investigation-evaluation' }));
  const queue = getStudyQueue(data, Date.now(), undefined, { sourceId: 'soc-investigation-evaluation', query: '避免在问题中预设未经证实' });
  assert.deepEqual(queue.map((card) => card.id), ['socstudy-001']);
});

test('LLM fuzzing cards retain their research source and study scope', () => {
  const data = createInitialData();
  const oracle = data.cards.find((card) => card.id === 'llmfuzz-013');
  const gradients = data.cards.find((card) => card.id === 'llmfuzz-015');
  const cost = data.cards.find((card) => card.id === 'fuzz-009');
  assert.equal(oracle?.knowledgeArea, '14');
  assert.equal(gradients?.topic, 'fuzzing');
  assert.ok(oracle?.sources?.some((source) => source.url.includes('2304.02014v1')));
  assert.ok(gradients?.sources?.some((source) => source.url.includes('pytorch/pytorch/blob/v2.7.0')));
  assert.ok(cost?.sources?.some((source) => source.id === 'fuzz4all-eval-ref'));
  assert.ok(oracle && matchesScope(oracle, { sourceId: 'llm-fuzzing-methods' }));
  const queue = getStudyQueue(data, Date.now(), undefined, { sourceId: 'llm-fuzzing-methods', query: 'CPU 和 GPU 上的数值输出' });
  assert.deepEqual(queue.map((card) => card.id), ['llmfuzz-013']);
});

test('log-sequence detection cards retain their paper and detection scope', () => {
  const data = createInitialData();
  const deepLog = data.cards.find((card) => card.id === 'logseq-004');
  const logBert = data.cards.find((card) => card.id === 'logseq-014');
  assert.equal(deepLog?.knowledgeArea, '11');
  assert.equal(logBert?.topic, 'anomaly-detection');
  assert.ok(deepLog?.sources?.some((source) => source.url.includes('deeplog.pdf')));
  assert.ok(logBert?.sources?.some((source) => source.url.includes('2103.04475')));
  assert.ok(logBert && matchesScope(logBert, { sourceId: 'log-sequence-anomaly' }));
  const queue = getStudyQueue(data, Date.now(), undefined, { sourceId: 'log-sequence-anomaly', query: '前 g 个日志键' });
  assert.deepEqual(queue.map((card) => card.id), ['logseq-004']);
});

test('known duplicate concepts become one card while retaining all source references', () => {
  const cards = createInitialData().cards;
  const leakage = cards.find((card) => card.id === 'ai4sec-002');
  assert.ok(leakage);
  assert.deepEqual(
    new Set(leakage.sources?.map((source) => source.id)),
    new Set(['original', 'cic-ids2017', 'ml-monitor-ref', 'unsw-nb15']),
  );
  assert.ok(!cards.some((card) => card.id === 'cic-010' || card.id === 'unsw-004'));
  assert.ok(leakage.alternateQuestions?.some((question) => question.includes('UNSW')));
  assert.ok(matchesScope(leakage, { query: 'attack_cat' }));
  assert.equal(new Set(cards.map((card) => card.id)).size, cards.length);
  assert.equal(cards.length, 40 + questionBanks.reduce((count, bank) => count + bank.cards.length, 0) - aliases.length - splits.length);
});

test('a composite metric question is split into two independently answerable sourced cards', () => {
  const cards = createInitialData().cards;
  const precision = cards.find((card) => card.id === 'ai4sec-006');
  const recall = cards.find((card) => card.id === 'ai4sec-007');
  assert.ok(precision && recall);
  for (const card of [precision, recall]) {
    assert.ok(card.sources?.some((source) => source.sourceCardId === 'eval-004' && source.url.includes('model_evaluation')));
    assert.ok(!card.alternateQuestions?.some((question) => question.includes('分别回答')));
    assert.ok(card.tags?.length);
  }
  assert.ok(!cards.some((card) => card.id === 'eval-004' || card.id === 'eval-007' || card.id === 'ai4sec-020'));
  assert.ok(cards.find((card) => card.id === 'ai4sec-008')?.sources?.some((source) => source.sourceCardId === 'eval-007'));
  assert.ok(cards.find((card) => card.id === 'ai4sec-003')?.sources?.some((source) => source.sourceCardId === 'ember-009'));
  assert.ok(!cards.some((card) => card.id === 'ember-009'));
  assert.ok(!cards.find((card) => card.id === 'ai4sec-028')?.question.includes('时间'));
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

test('newly organized cards retain their scope, authorship and individual source through normalization', () => {
  const cards = createInitialData().cards;
  const math = cards.find((card) => card.id === 'math-014');
  assert.ok(math);
  assert.equal(math.knowledgeArea, '01');
  assert.equal(math.subtopic, '概率');
  assert.equal(math.knowledgePoint, '贝叶斯公式');
  assert.equal(math.origin, '自行整理');
  assert.equal(math.sources?.[0].url, 'https://d2l.ai/chapter_preliminaries/probability.html');
  assert.ok(matchesScope(math, { query: '数学与统计基础' }));

  const rag = cards.find((card) => card.id === 'rag-001');
  assert.ok(rag?.sources?.some((source) => source.sourceCardId === 'retrieve-005'));
  assert.ok(!cards.some((card) => card.id === 'retrieve-005'));
});

test('new sources merge with existing knowledge points and retain their own references', () => {
  const cards = createInitialData().cards;
  const versions = cards.find((card) => card.id === 'copilot-010');
  const unlabeled = cards.find((card) => card.id === 'isof-004');
  assert.ok(versions?.sources?.some((source) => source.sourceCardId === 'production-005'));
  assert.ok(unlabeled?.sources?.some((source) => source.sourceCardId === 'production-006'));
  assert.ok(!cards.some((card) => card.id === 'production-005' || card.id === 'production-006'));
  const target = cards.find((card) => card.id === 'fuzz-002');
  assert.equal(target?.sources?.[0].title, 'LLVM libFuzzer：测试入口');
  assert.equal(target?.sources?.[0].url, 'https://llvm.org/docs/LibFuzzer.html#fuzz-target');
});

test('an interview-derived card retains both the self-reported question source and technical evidence', () => {
  const card = createInitialData().cards.find((item) => item.id === 'byte-interview-001');
  assert.ok(card);
  assert.ok(card.sources?.some((source) => source.id === 'company-bytedance' && source.url.includes('nowcoder.com')));
  assert.ok(card.sources?.some((source) => source.id === 'agent-skills-ref' && source.url.includes('agentskills.io')));
  assert.ok(card.sources?.some((source) => source.id === 'mcp-agent' && source.url.includes('modelcontextprotocol.io')));
  assert.ok(matchesScope(card, { sourceId: 'company-bytedance' }));
  assert.ok(matchesScope(card, { sourceId: 'agent-skills-ref' }));
});

test('new interviews are filterable by company and retain technical sources', () => {
  const data = createInitialData();
  const expected = [
    ['longctxint-001', 'company-bytedance', '2405.04434'],
    ['longctxint-001', 'company-baidu', '2405.04434'],
    ['longctxint-005', 'company-tencent', '2305.13245'],
    ['authint-001', 'company-alibaba', 'Forgot_Password'],
    ['authint-003', 'company-ant', 'Multifactor_Authentication'],
    ['websec-017', 'company-baidu', 'Server_Side_Request_Forgery'],
    ['weakness-009', 'company-baidu', 'Server_Side_Request_Forgery'],
    ['transdetail-004', 'company-tencent', '2305.13245'],
    ['llmmem-005', 'company-tencent', '2309.06180'],
  ];
  for (const [id, company, technicalSource] of expected) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card && matchesScope(card, { sourceId: company }));
    assert.ok(matchesScope(card, { sourceId: publicInterviewScope }));
    assert.ok(card.sources?.some((source) => source.type.includes('公开面经')));
    assert.ok(card.sources?.some((source) => source.url.includes(technicalSource)));
  }
  const queue = getStudyQueue(data, Date.now(), undefined, { sourceId: 'company-tencent', query: '512 字节' });
  assert.deepEqual(queue.map((card) => card.id), ['longctxint-005']);
  assert.ok(data.cards.find((item) => item.id === 'authint-002')?.sources?.some((source) => source.title.includes('主题启发')));
});

test('RAG interview cards are filterable by the company reported in each source', () => {
  const cards = createInitialData().cards;
  const byte = cards.find((card) => card.id === 'companyrag-001');
  const tencent = cards.find((card) => card.id === 'companyrag-002');
  assert.ok(byte && tencent);
  assert.ok(matchesScope(byte, { sourceId: 'company-bytedance' }));
  assert.ok(!matchesScope(byte, { sourceId: 'company-tencent' }));
  assert.ok(matchesScope(tencent, { sourceId: 'company-tencent' }));
  assert.ok(!matchesScope(tencent, { sourceId: 'company-bytedance' }));
  assert.ok(byte.sources?.some((source) => source.id === 'ragas-faithfulness'));
  assert.ok(tencent.sources?.some((source) => source.id === 'langsmith-rag-eval'));
});

test('the public interview scope includes primary and supplementary interview sources', () => {
  const data = createInitialData();
  const primary = data.cards.find((card) => card.id === 'finetuneint-003');
  const supplementary = data.cards.find((card) => card.id === 'lora-004');
  const unrelated = data.cards.find((card) => card.id === 'math-001');
  assert.ok(primary && supplementary && unrelated);
  assert.ok(matchesScope(primary, { sourceId: publicInterviewScope }));
  assert.ok(matchesScope(supplementary, { sourceId: publicInterviewScope }));
  assert.ok(matchesScope(supplementary, { sourceId: 'company-ant' }));
  assert.ok(!matchesScope(unrelated, { sourceId: publicInterviewScope }));
  const queue = getStudyQueue(data, Date.now(), undefined, { sourceId: publicInterviewScope, query: 'FP32 主权重' });
  assert.deepEqual(queue.map((card) => card.id), ['finetuneint-003']);
  assert.ok(primary.sources?.some((source) => source.id === 'training-paper-ref'));
});

test('interview-inspired judge questions retain both the interview and independent research', () => {
  const cards = createInitialData().cards;
  for (const id of ['agentjudge-005', 'agentjudge-006', 'agentjudge-007']) {
    const card = cards.find((item) => item.id === id);
    assert.ok(card && matchesScope(card, { sourceId: 'company-ant' }));
    assert.ok(matchesScope(card, { sourceId: publicInterviewScope }));
    assert.ok(card.sources?.some((source) => source.id === 'company-ant' && source.title.includes('主题启发')));
    assert.ok(card.sources?.some((source) => source.id === 'judge-bias-paper' && source.url === 'https://arxiv.org/abs/2306.05685'));
  }
});

test('contrastive learning and distributed interview themes retain their independent evidence', () => {
  const cards = createInitialData().cards;
  for (const [id, company, evidence] of [
    ['companycontrast-004', 'company-bytedance', 'simcse-paper'],
    ['companyddp-001', 'company-baidu', 'pytorch-distributed-doc'],
  ]) {
    const card = cards.find((item) => item.id === id);
    assert.ok(card && matchesScope(card, { sourceId: company }));
    assert.ok(card.sources?.some((source) => source.id === company && source.title.includes('主题启发')));
    assert.ok(card.sources?.some((source) => source.id === evidence));
  }
});

test('additional company accounts enrich existing cards without duplicating the concepts', () => {
  const cards = createInitialData().cards;
  for (const [id, company, alias] of [
    ['weakness-001', 'company-bilibili', 'company27-001'],
    ['weakness-008', 'company-bilibili', 'company27-002'],
    ['weakness-004', 'company-sensetime', 'company27-003'],
    ['secint-ops-001', 'company-360', 'company27-004'],
    ['sysmon-002', 'company-didi', 'company27-005'],
  ]) {
    const card = cards.find((item) => item.id === id);
    assert.ok(card && matchesScope(card, { sourceId: company }));
    assert.ok(card.sources?.some((source) => source.id === company && source.sourceCardId === alias));
    assert.ok(card.sources?.some((source) => !source.type.includes('公开面经') && source.url.startsWith('https://')));
    assert.ok(!cards.some((item) => item.id === alias));
  }
});

test('DNS cards retain their standards and mark interview themes separately', () => {
  const cards = createInitialData().cards;
  const negative = cards.find((card) => card.id === 'dnsdeep-007');
  const protocols = cards.find((card) => card.id === 'dnsdeep-017');
  assert.ok(negative && matchesScope(negative, { sourceId: 'company-tencent' }));
  assert.ok(negative.sources?.some((source) => source.url.endsWith('rfc2308.html')));
  assert.ok(negative.sources?.some((source) => source.id === 'company-tencent' && source.title.includes('主题启发')));
  assert.ok(protocols?.sources?.some((source) => source.url.endsWith('rfc8484.html')));
  assert.ok(protocols?.sources?.some((source) => source.url.endsWith('rfc7858.html')));
});

test('fuzzing concepts retain their tutorials and interview attribution', () => {
  const cards = createInitialData().cards;
  const coverage = cards.find((card) => card.id === 'fuzzstudy-003');
  const minimize = cards.find((card) => card.id === 'fuzzstudy-014');
  assert.ok(coverage && matchesScope(coverage, { sourceId: 'company-ant' }));
  assert.ok(coverage.sources?.some((source) => source.url.includes('fuzzingbook.org/html/Coverage.html')));
  assert.ok(coverage.sources?.some((source) => source.id === 'company-ant' && source.title.includes('主题启发')));
  assert.ok(minimize?.sources?.some((source) => source.url.includes('fuzzingbook.org/html/Reducer.html')));
});

test('agent search cards retain research and any interview inspiration', () => {
  const cards = createInitialData().cards;
  const search = cards.find((card) => card.id === 'agentsearch-008');
  const vote = cards.find((card) => card.id === 'agentsearch-011');
  assert.ok(search && matchesScope(search, { sourceId: 'company-kuaishou' }));
  assert.ok(search.sources?.some((source) => source.url === 'https://arxiv.org/abs/2305.10601'));
  assert.ok(search.sources?.some((source) => source.id === 'company-kuaishou' && source.title.includes('主题启发')));
  assert.ok(vote?.sources?.some((source) => source.url === 'https://arxiv.org/abs/2203.11171'));
});

test('review sources augment legacy cards without creating duplicate questions', () => {
  const cards = createInitialData().cards;
  const pairs = [
    ['legacy25-001', 'ai4sec-021'], ['legacy25-002', 'ai4sec-022'],
    ['legacy25-003', 'ai4sec-025'], ['legacy25-004', 'ai4sec-033'],
    ['legacy25-005', 'ai4sec-036'], ['legacy25-006', 'ai4sec-031'],
  ];
  for (const [source, target] of pairs) {
    assert.ok(!cards.some((card) => card.id === source));
    assert.ok(cards.find((card) => card.id === target)?.sources?.some((reference) => reference.sourceCardId === source));
  }
});

test('Python interview cards retain the reported company and Python documentation', () => {
  const card = createInitialData().cards.find((item) => item.id === 'companypy-005');
  assert.ok(card);
  assert.equal(card.knowledgeArea, '02');
  assert.ok(matchesScope(card, { sourceId: 'company-bytedance' }));
  assert.ok(card.sources?.some((source) => source.id === 'company-bytedance' && source.url.includes('nowcoder.com')));
  assert.ok(card.sources?.some((source) => source.id === 'python-interview-doc' && source.url.includes('docs.python.org/3.13/')));
});

test('reposted LLM interview questions retain their reported companies and research references', () => {
  const cards = createInitialData().cards;
  for (const [id, company] of [
    ['llmint-001', 'company-bytedance'], ['llmint-002', 'company-baidu'],
    ['llmint-003', 'company-alibaba'], ['llmint-004', 'company-tencent'],
  ]) {
    const card = cards.find((item) => item.id === id);
    assert.ok(card && matchesScope(card, { sourceId: company }));
    assert.ok(card.sources?.some((source) => source.id === company && source.type === '公开面经合集' && source.url.includes('github.com/jingtian11/EasyOffer')));
    assert.ok(card.sources?.some((source) => source.id === 'llm-paper-ref' && source.url.includes('arxiv.org')));
  }
  const rope = cards.find((item) => item.id === 'llmarch-001');
  assert.ok(rope && matchesScope(rope, { sourceId: 'company-tencent' }) && matchesScope(rope, { sourceId: 'company-alibaba' }));
});

test('new company interview cards remain filterable and retain independent technical evidence', () => {
  const cards = createInitialData().cards;
  for (const [id, company] of [
    ['opt-001', 'company-kuaishou'], ['grpo-001', 'company-xiaomi'],
    ['opt-002', 'company-tencent'], ['info-006', 'company-bytedance'],
  ]) {
    const card = cards.find((item) => item.id === id);
    assert.ok(card && matchesScope(card, { sourceId: company }));
    assert.ok(card.sources?.some((source) => source.id === company && source.type === '公开面经合集' && source.url.includes('github.com/jingtian11/EasyOffer')));
    assert.ok(card.sources?.some((source) => source.id === 'technical-ref' && source.url.startsWith('https://')));
  }
});

test('shared interview sources and duplicate flow questions remain attached to one card', () => {
  const cards = createInitialData().cards;
  const zero = cards.find((card) => card.id === 'distint-001');
  assert.ok(zero && matchesScope(zero, { sourceId: 'company-ant' }) && matchesScope(zero, { sourceId: 'company-tencent' }));
  assert.ok(zero.sources?.some((source) => source.id === 'training-paper-ref' && source.url.includes('deepspeed.ai')));
  const kl = cards.find((card) => card.id === 'info-006');
  assert.ok(kl && matchesScope(kl, { sourceId: 'company-bytedance' }) && matchesScope(kl, { sourceId: 'company-iflytek' }));
  const flow = cards.find((card) => card.id === 'cic-007');
  assert.ok(flow);
  assert.ok(flow?.alternateQuestions?.some((question) => question.includes('Zeek')));
  assert.ok(flow.sources?.some((source) => source.sourceCardId === 'zeek-006'));
  assert.ok(!cards.some((card) => card.id === 'zeek-006'));
  assert.ok(cards.some((card) => card.id === 'cic-001'));
  assert.ok(cards.some((card) => card.id === 'unsw-002'));
});

test('security interviews retain the reported company, technical evidence and existing cards', () => {
  const cards = createInitialData().cards;
  for (const [id, company, area] of [
    ['secint-detect-001', 'company-tencent', '11'],
    ['secint-ops-001', 'company-ant', '16'],
    ['secint-code-001', 'company-alibaba', '13'],
    ['secint-code-003', 'company-meituan', '13'],
    ['secint-dist-001', 'company-baidu', '06'],
    ['secint-dist-004', 'company-iflytek', '06'],
  ]) {
    const card = cards.find((item) => item.id === id);
    assert.ok(card && matchesScope(card, { sourceId: company }));
    assert.equal(card.knowledgeArea, area);
    assert.ok(matchesScope(card, { sourceId: publicInterviewScope }));
    assert.ok(card.sources?.some((source) => source.id === company && source.type.includes('公开面经')));
    assert.ok(card.sources?.some((source) => source.id !== company && source.evidence === 'source'));
  }
  const association = cards.find((card) => card.id === 'sysmon-002');
  assert.ok(association && matchesScope(association, { sourceId: 'company-tencent' }));
  assert.ok(association.sources?.some((source) => source.id === 'windows-sysmon'));
  assert.equal(cards.filter((card) => card.id === 'sysmon-002').length, 1);
  const storedSql = cards.find((card) => card.id === 'secint-code-002');
  assert.ok(storedSql && matchesScope(storedSql, { sourceId: 'company-jd' }));
  assert.ok(matchesScope(storedSql, { sourceId: 'company-tencent' }));
  assert.ok(storedSql.sources?.some((source) => source.id === 'stored-sqli-ref'));
});

test('new company interview cards keep their reported source, technical evidence and study scope', () => {
  const data = createInitialData();
  const cases = [
    ['companypractice-py-001', 'company-kuaishou', 'python-copy-interview', '02'],
    ['companypractice-code-001', 'company-xiaomi', 'owasp-iast-interview', '13'],
    ['companypractice-net-001', 'company-meituan', 'http-proxy-interview', '10'],
    ['companypractice-llm-002', 'company-iflytek', 'adam-paper-interview', '06'],
    ['companypractice-llm-004', 'company-bytedance', 'reward-overoptimization-interview', '06'],
    ['companypractice-llm-005', 'company-tencent', 'deepspeed-zero-interview', '06'],
    ['companypractice-agent-002', 'company-kuaishou', 'owasp-prompt-injection-interview', '08'],
    ['companypractice-eval-001', 'company-meituan', 'adversarial-robustness-interview', '17'],
  ];
  for (const [id, company, evidence, area] of cases) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.knowledgeArea, area);
    assert.ok(matchesScope(card, { sourceId: company }));
    assert.ok(matchesScope(card, { sourceId: publicInterviewScope }));
    assert.ok(card.sources?.some((source) => source.id === company && source.type.includes('公开面经')));
    assert.ok(card.sources?.some((source) => source.id === evidence && source.evidence === 'source'));
  }
  const inspired = data.cards.find((card) => card.id === 'companypractice-agent-002');
  assert.ok(inspired?.sources?.some((source) => source.id === 'company-kuaishou' && source.title.includes('主题启发')));
  const copy = data.cards.find((card) => card.id === 'companypractice-py-001');
  assert.ok(copy && matchesScope(copy, { sourceId: 'company-horizon' }));
  assert.ok(copy.sources?.some((source) => source.id === 'company-horizon' && source.type.includes('公开面经')));
  const queue = getStudyQueue(data, Date.now(), undefined, { sourceId: 'company-xiaomi', query: 'SAST、DAST 和 IAST' });
  assert.deepEqual(queue.map((card) => card.id), ['companypractice-code-001']);
});

test('foundational cards preserve their knowledge areas and individual technical references', () => {
  const cards = createInitialData().cards;
  for (const [id, area, sourceFragment] of [
    ['cnnbase-008', '04', 'channels.html'],
    ['rnnbase-004', '04', 'bptt.html'],
    ['deepbase-006', '04', 'LayerNorm.html'],
    ['tokpipe-005', '05', 'question_answering'],
    ['nlpinput-003', '05', 'scaled_dot_product_attention'],
    ['agentmem-004', '08', 'concepts/memory'],
    ['mathcore-006', '01', 'covariance_correlation'],
    ['calibrate-004', '03', 'calibration.html'],
    ['evalcv-001', '17', 'nested_cross_validation'],
  ]) {
    const card = cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.knowledgeArea, area);
    assert.equal(card.origin, '自行整理');
    assert.ok(card.sources?.some((source) => source.url.includes(sourceFragment)));
  }
  assert.ok(cards.find((card) => card.id === 'unsw-006')?.sources?.some((source) => source.id === 'cv-comparison-ref'));
  assert.ok(!cards.some((card) => card.id === 'evalcv-006'));
});

test('duplicate security scenarios retain their sources on the reviewed concepts', () => {
  const cards = createInitialData().cards;
  const grouped = cards.find((card) => card.id === 'eval-010');
  const mistakes = cards.find((card) => card.id === 'eval-013');
  const leakage = cards.find((card) => card.id === 'prime-007');
  assert.ok(grouped && mistakes && leakage);
  for (const id of ['phish-004', 'phish-009', 'code-010']) {
    assert.ok(grouped.sources?.some((source) => source.sourceCardId === id));
    assert.ok(!cards.some((card) => card.id === id));
  }
  for (const id of ['phish-012', 'ember-010']) {
    assert.ok(mistakes.sources?.some((source) => source.sourceCardId === id));
    assert.ok(!cards.some((card) => card.id === id));
  }
  assert.ok(leakage.sources?.some((source) => source.sourceCardId === 'code-006'));
  assert.ok(leakage.sources?.some((source) => source.sourceCardId === 'llmv-005'));
  assert.ok(!cards.some((card) => card.id === 'code-006'));
  const evidence = cards.find((card) => card.id === 'ai4sec-032');
  assert.ok(evidence?.sources?.some((source) => source.sourceCardId === 'copilot-004'));
  assert.ok(!cards.some((card) => card.id === 'copilot-004'));
});

test('flow interview inspiration keeps its technical source and composite RAG topics stay separate', () => {
  const cards = createInitialData().cards;
  const flow = cards.find((card) => card.id === 'secint-flow-003');
  assert.ok(flow && matchesScope(flow, { sourceId: 'company-tencent' }));
  assert.ok(matchesScope(flow, { sourceId: publicInterviewScope }));
  assert.ok(flow.sources?.some((source) => source.id === 'company-tencent' && source.title.includes('非原帖逐题')));
  assert.ok(flow.sources?.some((source) => source.id === 'community-id-spec' && source.evidence === 'source'));
  assert.ok(!cards.some((card) => card.id === 'ai4sec-034' || card.id === 'isof-012'));
  for (const id of ['rag-002', 'rag-009', 'ai4sec-039']) {
    const card = cards.find((item) => item.id === id);
    assert.ok(card);
    assert.ok(card.sources?.some((source) => source.sourceCardId === 'ai4sec-034'));
    assert.ok(!card.alternateQuestions?.some((question) => question.includes('安全知识库问答如何检查答案可靠性')));
  }
  assert.ok(cards.find((card) => card.id === 'eval-016')?.sources?.some((source) => source.sourceCardId === 'isof-012'));
});

test('tokenization interview inspiration keeps its scope and independent research reference', () => {
  const card = createInitialData().cards.find((item) => item.id === 'tokint-001');
  assert.ok(card && matchesScope(card, { sourceId: 'company-bytedance' }));
  assert.equal(card.knowledgeArea, '05');
  assert.ok(card.sources?.some((source) => source.id === 'company-bytedance' && source.title.includes('非原帖逐题')));
  assert.ok(card.sources?.some((source) => source.id === 'sentencepiece-reference' && source.url.includes('1808.06226')));
});

test('fuzzing interview cards retain company provenance and the split experiment retains sources', () => {
  const cards = createInitialData().cards;
  const interview = cards.find((card) => card.id === 'aflint-001');
  assert.ok(interview && matchesScope(interview, { sourceId: 'company-ant' }));
  assert.equal(interview.knowledgeArea, '14');
  assert.ok(interview.sources?.some((source) => source.id === 'company-ant' && source.title.includes('主题启发')));
  assert.ok(interview.sources?.some((source) => source.id === 'aflpp-tech-ref'));
  for (const [source, targets] of [
    ['fuzz-012', ['fuzz-004', 'fuzz-006', 'fuzz-007']],
    ['fuzz-010', ['fuzz-005', 'lfuzz-005', 'lfuzz-006']],
  ] as const) {
    assert.ok(!cards.some((card) => card.id === source));
    for (const id of targets) {
      const card = cards.find((item) => item.id === id);
      assert.ok(card?.sources?.some((reference) => reference.sourceCardId === source));
    }
  }
});

test('memory interview cards keep the interview attribution and technical references', () => {
  const cards = createInitialData().cards;
  for (const [id, company, urlPart] of [
    ['vllmpage-001', 'company-alibaba', '2309.06180'],
    ['hwmem-001', 'company-huawei', 'cwe.mitre.org/data/definitions/416'],
    ['weakness-014', 'company-huawei', 'cwe.mitre.org/data/definitions/416'],
  ] as const) {
    const card = cards.find((item) => item.id === id);
    assert.ok(card && matchesScope(card, { sourceId: company }));
    assert.ok(card.sources?.some((source) => source.id === company && source.title.includes('主题启发')));
    assert.ok(card.sources?.some((source) => source.url.includes(urlPart) && source.evidence === 'source'));
  }
  const prime = cards.find((card) => card.id === 'prime-009');
  assert.ok(prime?.sources?.some((source) => source.id === 'code-contamination-research' && source.title.includes('仅为线索')));
});

test('DJI salt question enriches the existing card and remains filterable', () => {
  const cards = createInitialData().cards;
  const card = cards.find((item) => item.id === 'passstore-002');
  assert.ok(card && matchesScope(card, { sourceId: 'company-dji' }));
  assert.ok(card.sources?.some((source) => source.id === 'company-dji' && source.title.includes('主题启发')));
  assert.ok(card.sources?.some((source) => source.url.includes('Password_Storage_Cheat_Sheet')));
  assert.equal(cards.filter((item) => item.question === card.question).length, 1);
});

test('multimodal interview cards preserve the reported companies and research sources', () => {
  const cards = createInitialData().cards;
  const comparison = cards.find((card) => card.id === 'blipstudy-001');
  const loss = cards.find((card) => card.id === 'blipstudy-002');
  const clip = cards.find((card) => card.id === 'vl-001');
  const tools = cards.find((card) => card.id === 'toolformer-001');
  assert.ok(comparison && matchesScope(comparison, { sourceId: 'company-baidu' }));
  assert.ok(comparison.sources?.some((source) => source.url.includes('2301.12597')));
  assert.ok(loss && matchesScope(loss, { sourceId: 'company-kuaishou' }));
  assert.ok(clip && matchesScope(clip, { sourceId: 'company-baidu' }) && matchesScope(clip, { sourceId: 'company-kuaishou' }));
  assert.ok(tools?.sources?.some((source) => source.id === 'company-bytedance' && source.title.includes('主题启发')));
});

test('general computer foundations and research cards retain their topic and reference', () => {
  const cards = createInitialData().cards;
  const cases = [
    ['tcpbase-007', '19', 'computer-network', 'tcp-ip-fundamentals'],
    ['linuxbase-019', '19', 'linux-systems', 'linux-command-foundations'],
    ['osbase-007', '19', 'operating-systems', 'os-fundamentals'],
    ['dbbase-017', '19', 'database-fundamentals', 'postgresql-database-foundations'],
    ['dsbase-001', '19', 'data-structures', 'data-structures-foundations'],
    ['juliet-003', '13', 'code-vulnerability', 'juliet-code-benchmark'],
    ['devignstudy-002', '13', 'code-vulnerability', 'devign-graph-vulnerability'],
    ['vuldeep-003', '13', 'code-vulnerability', 'vuldeepecker-code-gadgets'],
    ['splade-002', '07', 'rag-basics', 'splade-sparse-retrieval'],
    ['reflex-002', '08', 'agent-design', 'reflexion-agent-feedback'],
  ];
  for (const [id, area, topic, source] of cases) {
    const card = cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.knowledgeArea, area);
    assert.equal(card.topic, topic);
    assert.ok(matchesScope(card, { sourceId: source }));
    assert.ok(card.sources?.some((item) => item.id === source && item.url));
  }
  const tcp = cards.find((card) => card.id === 'tcpbase-001');
  assert.ok(tcp?.sources?.some((source) => source.id === 'udp-rfc768'));
  const juliet = cards.find((card) => card.id === 'juliet-003');
  assert.ok(juliet?.sources?.some((source) => source.url.includes('/test-cases/77913')));
});


test('common computer and evaluation sources are searchable with their references', () => {
  const cards = createInitialData().cards;
  const cases = [
    ['httpver-001', '19', 'computer-network', 'http-versions-quic', 'rfc9114'],
    ['cpucache-001', '19', 'computer-architecture', 'cpu-cache-foundations', 'caches'],
    ['sqlwin-001', '19', 'database-fundamentals', 'postgresql-window-functions', 'tutorial-window'],
    ['tries-001', '19', 'data-structures', 'trie-string-search', '52trie'],
    ['reprbase-001', '19', 'computer-architecture', 'text-number-representation', 'unicode'],
    ['taubench-001', '09', 'agent-engineering', 'tau-bench-agent-reliability', '2406.12045v1'],
    ['toolsbx-001', '09', 'agent-engineering', 'toolsandbox-agent-evaluation', '2408.04682v2'],
    ['agentdojo-001', '09', 'agent-engineering', 'agentdojo-tool-boundaries', '2406.13352v2'],
    ['svdd-001', '11', 'anomaly-detection', 'deep-svdd-anomaly-detection', 'ruff18a'],
    ['mccmetric-001', '03', 'ml-basics', 'matthews-correlation-evaluation', 'matthews'],
    ['cicflow-001', '10', 'security-telemetry', 'cicflowmeter-feature-contracts', '98a5ebad'],
  ];
  for (const [id, area, topic, sourceId, reference] of cases) {
    const card = cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.knowledgeArea, area, id);
    assert.equal(card.topic, topic, id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
  }
});


test('model engineering and security data additions retain their reference and source scope', () => {
  const cards = createInitialData().cards;
  const cases = [
    ['gqastudy-001', '05', 'nlp-transformer', 'gqa-attention-uptraining', '2305.13245v1'],
    ['moeswitch-001', '06', 'llm-training', 'switch-moe-foundations', '2101.03961v1'],
    ['hnswstudy-001', '07', 'rag-basics', 'hnsw-graph-search', '1603.09320v4'],
    ['lrsched-001', '04', 'deep-learning', 'pytorch-lr-schedulers', 'docs.pytorch.org'],
    ['ocsfbase-001', '10', 'security-telemetry', 'ocsf-security-event-schema', 'v1.2.0'],
    ['cvefmt-001', '15', 'threat-intelligence', 'cve-record-schema', 'v5.2.0'],
    ['segbase-002', '18', 'computer-vision', 'semantic-segmentation-foundations', '1411.4038v2'],
    ['semflow-001', '13', 'code-vulnerability', 'semgrep-taint-analysis-details', 'semgrep.dev'],
  ];
  for (const [id, area, topic, sourceId, reference] of cases) {
    const card = cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.knowledgeArea, area, id);
    assert.equal(card.topic, topic, id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
  }
  assert.ok(!cards.some((card) => card.id === 'segbase-003' || card.id === 'moeswitch-004'));
});


test('Bayesian, Agent, Python and operational sources retain searchable provenance', () => {
  const cards = createInitialData().cards;
  const cases = [
    ['betabayes-001', '01', 'math-statistics', 'beta-binomial-inference', 'ThinkBayes2/chap18'],
    ['rewoo-001', '08', 'agent-design', 'rewoo-agent-planning', '2305.18323v1'],
    ['grpobase-001', '06', 'llm-training', 'grpo-training-foundations', '2402.03300v1'],
    ['fpnstudy-001', '18', 'computer-vision', 'fpn-multiscale-vision', '1612.03144v2'],
    ['pylogging-001', '02', 'python-data', 'python-logging-foundations', 'python.org/3.14'],
    ['rrfstudy-001', '07', 'rag-basics', 'rrf-ranking-fusion', 'elasticsearch/reference/8.17'],
    ['canarystudy-001', '17', 'model-monitoring', 'canary-release-evaluation', 'sre.google'],
    ['noticebase-001', '16', 'security-operations', 'zeek-notice-workflow', 'docs.zeek.org'],
    ['aflins-001', '14', 'fuzzing', 'afl-instrumentation-feedback', 'd798677805de'],
  ];
  for (const [id, area, topic, sourceId, reference] of cases) {
    const card = cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.knowledgeArea, area, id);
    assert.equal(card.topic, topic, id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
  }
  const fpn = cards.find((card) => card.id === 'fpnstudy-001');
  assert.ok(fpn && matchesScope(fpn, { sourceId: 'company-58' }) && matchesScope(fpn, { sourceId: publicInterviewScope }));
  assert.ok(fpn.sources?.some((source) => source.id === 'company-58' && source.title.includes('主题启发')));
  assert.equal(cards.find((card) => card.id === 'faissdeep-002')?.question, 'Faiss HNSW 的 efConstruction 参数主要控制什么？');
});

test('new computer fundamentals and Agent evaluation retain searchable sources', () => {
  const cards = createInitialData().cards;
  const cases = [
    ['digcmd-006', '19', 'computer-network', 'dns-dig-query-practice', 'v9.20.16'],
    ['bitops-004', '19', 'data-structures', 'bitwise-interview-fundamentals', 'python.org/3.14'],
    ['gtimeout-003', '19', 'linux-systems', 'gnu-timeout-command-practice', 'timeout-invocation'],
    ['basherr-002', '19', 'linux-systems', 'bash-errexit-nounset-practice', 'bashref.html'],
    ['sclient-002', '19', 'computer-network', 'openssl-s-client-tls-diagnostics', 'openssl.org/3.5'],
    ['agentboard-001', '09', 'agent-engineering', 'agentboard-progress-evaluation', '2401.13178v2'],
  ];
  for (const [id, area, topic, sourceId, reference] of cases) {
    const card = cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.knowledgeArea, area, id);
    assert.equal(card.topic, topic, id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
  }
  const agentboard = cards.find((card) => card.id === 'agentboard-001');
  assert.ok(agentboard && matchesScope(agentboard, { sourceId: 'company-ant' }));
  assert.ok(agentboard.sources?.some((source) => source.id === 'company-ant' && source.title.includes('主题延伸，非原题')));
});

test('new data processing and security evaluation cards retain their references', () => {
  const data = createInitialData();
  for (const [id, sourceId, area, topic, query, reference] of [
    ['pycsv-003', 'python-csv-dictionary-practice', '02', 'python-data', '多余和缺少的字段', 'python.org/3.14/library/csv'],
    ['npchoice-006', 'numpy-generator-choice-practice', '02', 'python-data', '显式传入均匀概率', 'numpy.org/doc/2.2'],
    ['robuststat-003', 'scipy-robust-dispersion-practice', '01', 'math-statistics', '少量极端值的数据', 'scipy-1.15.3'],
    ['peakapi-004', 'scipy-signal-peak-detection', '11', 'anomaly-detection', '间距过近的峰', 'scipy.signal.find_peaks'],
    ['pilimage-004', 'pillow-image-preprocessing', '18', 'computer-vision', 'resize 和 thumbnail', 'Pillow/12.1.1'],
    ['syslog-002', 'rfc5424-syslog-telemetry', '10', 'security-telemetry', 'Facility 和 Severity 计算', 'rfc5424'],
    ['toolemu-002', 'toolemu-agent-risk-evaluation', '09', 'agent-engineering', '基准重点考查哪类用户指令', '2309.15817v2'],
    ['ssvc-005', 'cisa-ssvc-vulnerability-triage', '16', 'security-operations', 'Technical Impact 如何区分', 'cisa-ssvc-guide'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.knowledgeArea, area, id);
    assert.equal(card.topic, topic, id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
  const robust = data.cards.find((card) => card.id === 'robuststat-003');
  assert.ok(robust?.sources?.some((source) => source.id === 'scipy-iqr-1-15-reference'));
});

test('new Agent, security and system cards retain provenance and source filters', () => {
  const data = createInitialData();
  for (const [id, sourceId, area, topic, query, reference] of [
    ['pdstring-006', 'pandas-string-extraction-practice', '02', 'python-data', 'extractall 与 extract', 'version/2.3.3'],
    ['optcritic-004', 'option-critic-temporal-abstraction', '08', 'agent-design', 'call-and-return 模式', '1609.05140v2'],
    ['gorilla-002', 'gorilla-api-retrieval-agent', '08', 'agent-design', 'API 调用任务中结合文档检索', '2305.15334v1'],
    ['energyood-005', 'energy-ood-detection-evaluation', '17', 'data-evaluation', '所有 logits 同时增加常数', '2010.03759v2'],
    ['vulrepair-004', 'vulrepair-data-quality-study', '13', 'code-vulnerability', '基准训练集与测试集', 'dd5fc245dee85'],
    ['aflmut-006', 'afl-custom-mutator-lifecycle', '14', 'fuzzing', 'init_trim、trim 和 post_trim', 'v4.21c'],
    ['taxiipage-004', 'taxii-collection-pagination', '15', 'threat-intelligence', 'more=true 时', 'taxii-v2.1-os'],
    ['linuxacl-002', 'linux-acl-permission-practice', '19', 'linux-systems', 'mask 项限制哪些条目', 'acl.5.html'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.knowledgeArea, area, id);
    assert.equal(card.topic, topic, id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
  const gorilla = data.cards.find((card) => card.id === 'gorilla-002');
  assert.ok(gorilla && matchesScope(gorilla, { sourceId: 'company-bytedance' }));
  assert.ok(matchesScope(gorilla, { sourceId: publicInterviewScope }));
  assert.ok(gorilla.sources?.some((source) => source.title.includes('主题延伸，非原题')));
});

test('common system and build cards remain searchable by source and reference', () => {
  const data = createInitialData();
  for (const [id, sourceId, topic, query, reference] of [
    ['aptpkg-003', 'debian-apt-dpkg-practice', 'linux-systems', 'apt-get -s install', 'apt-get.8.html'],
    ['sshkey-006', 'openssh-key-agent-practice', 'linux-systems', 'ssh-agent 与 ssh-add', 'ssh-add.1'],
    ['psquery-003', 'linux-process-query-practice', 'linux-systems', '最近一秒的瞬时占用率', 'ps.1.html'],
    ['cmakebase-006', 'cmake-build-foundations', 'software-build', '如何分配包含目录', 'target_include_directories.html'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.knowledgeArea, '19', id);
    assert.equal(card.topic, topic, id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
});

test('new Agent, anomaly and security cards retain their sources and search filters', () => {
  const data = createInitialData();
  for (const [id, sourceId, area, topic, query, reference] of [
    ['lgnode-003', 'langgraph-toolnode-practice', '09', 'agent-engineering', '工具参数校验错误和普通执行异常', 'langgraph_prebuilt-1.0.13.tar.gz'],
    ['pyodknn-004', 'pyod-knn-anomaly-practice', '11', 'anomaly-detection', '不同的 decision_scores_', 'pyod/blob/v2.0.5'],
    ['wazrule-002', 'wazuh-rule-correlation-practice', '16', 'security-operations', 'if_matched_sid 与 if_sid', 'wazuh.com/4.12'],
    ['ctv1-005', 'certificate-transparency-v1', '19', 'computer-network', 'Merkle 审计路径', 'rfc6962'],
    ['pulearn-004', 'positive-unlabeled-learning', '03', 'ml-basics', '正例标注状态为 s', 'elkan/posonly.pdf'],
    ['brierapi-004', 'sklearn-brier-score-practice', '03', 'ml-basics', 'scale_by_half="auto"', 'scikit-learn.org/1.7'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.knowledgeArea, area, id);
    assert.equal(card.topic, topic, id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
});

test('new Python, labeling and security cards retain provenance and source filters', () => {
  const data = createInitialData();
  for (const [id, sourceId, area, topic, query, reference] of [
    ['pyheap-003', 'python-heapq-practice', '02', 'python-data', 'heappushpop 与 heapreplace', 'python.org/3.14/library/heapq'],
    ['pythread-006', 'python-threading-sync-practice', '02', 'python-data', 'notify() 会自动释放', 'python.org/3.14/library/threading'],
    ['kappa-006', 'sklearn-cohen-kappa-practice', '17', 'data-evaluation', '两位标注者都只给所有样本', 'scikit-learn.org/1.7'],
    ['gofuzz-006', 'go-native-fuzzing-practice', '14', 'fuzzing', '保存到 testdata/fuzz', 'go.dev/doc/tutorial/fuzz'],
    ['elfcli-005', 'gnu-elf-inspection-practice', '19', 'software-build', '反汇编范围有什么区别', 'binutils/docs-2.45'],
    ['ghidra-006', 'ghidra-reverse-engineering-basics', '12', 'malware-analysis', 'P-code 在反编译分析', 'Ghidra_11.4.2_build'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.knowledgeArea, area, id);
    assert.equal(card.topic, topic, id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
});

test('new computer fundamentals and model cards retain searchable sources and classification', () => {
  const data = createInitialData();
  for (const [id, sourceId, area, topic, query, reference] of [
    ['twos-001', 'integer-twos-complement', '19', 'computer-architecture', '表示范围分别是什么', 'computationstructures.org/notes/information'],
    ['huff-003', 'huffman-coding-foundations', '19', 'data-structures', '哪两个节点合并', 'TARGET_3.2.2.2'],
    ['gcb-002', 'garbage-collection-foundations', '19', 'operating-systems', '仅靠引用计数', 'docs.python.org/3.14/faq/design'],
    ['httpmethod-003', 'http-method-semantics', '19', 'computer-network', '一个 PATCH 文档中的变更', 'rfc5789.html'],
    ['ptmha-003', 'pytorch-multihead-attention-practice', '04', 'deep-learning', '分别限制什么', 'torch.nn.MultiheadAttention'],
    ['hftokencls-007', 'transformers-token-classification-pipeline', '05', 'nlp-transformer', '能同时设置 stride', 'v4.55.4'],
    ['safeio-002', 'safetensors-model-storage', '06', 'llm-training', '单独证明模型权重可信', 'safetensors/blob/v0.6.2'],
    ['catboost-003', 'catboost-categorical-foundations', '03', 'ml-basics', '直接使用自己的标签', '1706.09516v5'],
    ['trecmap-004', 'trec-map-ranking-evaluation', '07', 'rag-basics', '多个相关结果的关注', 'v9.0.8/m_map.c'],
    ['tvaug-007', 'torchvision-random-image-augmentation', '18', 'computer-vision', '含负像素值', 'torchvision.transforms.ColorJitter'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.knowledgeArea, area, id);
    assert.equal(card.topic, topic, id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
  const interview = data.cards.find((card) => card.id === 'ptmha-003');
  assert.ok(interview && matchesScope(interview, { sourceId: publicInterviewScope }));
  assert.ok(matchesScope(interview, { sourceId: 'company-baidu' }));
  assert.ok(interview.sources?.some((source) => source.title.includes('主题延伸，非原题')));
  assert.ok(data.cards.find((card) => card.id === 'trecmap-004')?.sources?.some((source) => source.id === 'treceval-reciprocal-rank-v908'));
});

test('new trees, concurrency, database and protocol cards retain searchable evidence', () => {
  const data = createInitialData();
  for (const [id, sourceId, topic, query, reference] of [
    ['avl-003', 'avl-tree-foundations', 'data-structures', '左左失衡或右右失衡', 'AVLTreeST.java.html'],
    ['rwcs-004', 'posix-rwlock-foundations', 'operating-systems', '直接调用 pthread_rwlock_wrlock', 'pthread_rwlock_trywrlock.3p.html'],
    ['sqlver-004', 'sqlalchemy-optimistic-versioning', 'database-fundamentals', 'Query.update() 的多行批量更新', 'sqlalchemy.org/en/20/orm/versioning'],
    ['httplimit-002', 'http-rate-limit-status-codes', 'computer-network', '429 Too Many Requests', 'rfc6585.html'],
    ['floatsys-001', 'floating-point-special-values', 'computer-architecture', '浮点 NaN 与自身', 'docs.python.org/3.14/library/math'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.knowledgeArea, '19', id);
    assert.equal(card.topic, topic, id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
});

test('new AI and security cards preserve source, topic and search scope', () => {
  const data = createInitialData();
  for (const [id, sourceId, area, topic, query, reference] of [
    ['fimpaper-007', 'fill-in-the-middle-training', '06', 'llm-training', '后缀放在前缀之前', '2207.14255v1'],
    ['skpoly-003', 'sklearn-polynomial-features', '03', 'ml-basics', 'interaction_only=True', 'PolynomialFeatures.html'],
    ['pybag-004', 'pyod-feature-bagging-anomaly', '11', 'anomaly-detection', '是否每个基检测器都使用全部特征', 'v2.0.5/pyod/models/feature_bagging.py'],
    ['yramath-006', 'yara-math-malware-features', '12', 'malware-analysis', '有效非空范围计算哪种偏差', 'v4.4.0/libyara/modules/math/math.c'],
    ['zeekhttp-004', 'zeek-http-transaction-fields', '10', 'security-telemetry', '一定是原样请求 URI', 'v7.2.1/scripts/base/protocols/http/main.zeek'],
    ['mlreg-003', 'mlflow-model-registry-practice', '17', 'model-monitoring', '模型别名与固定版本号', 'v2.22.0/docs/docs/model-registry/index.mdx'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.knowledgeArea, area, id);
    assert.equal(card.topic, topic, id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
});

test('agent, prefix tuning, GAN and security evidence stays searchable', () => {
  const data = createInitialData();
  for (const [id, sourceId, area, topic, query, reference] of [
    ['agverse-004', 'agentverse-multiagent-collaboration', '08', 'agent-design', 'solver 与 reviewer', '2308.10848v3'],
    ['apibank-005', 'apibank-tool-evaluation', '09', 'agent-engineering', '人工标注调用的正确性', '2304.08244v2'],
    ['prefixtune-007', 'prefix-tuning-peft-foundations', '06', 'llm-training', '开启 prefix_projection', 'v0.17.1/src/peft/tuners/prefix_tuning/model.py'],
    ['ganbase-006', 'gan-generative-foundations', '04', 'deep-learning', '最大化 log D(G(z))', '1406.2661v1'],
    ['ghsaapi-006', 'github-global-advisory-api', '15', 'threat-intelligence', '是否能据此认定不存在任何修复', 'apiVersion=2022-11-28'],
    ['owbench-002', 'owasp-benchmark-java-evaluation', '13', 'code-vulnerability', 'real vulnerability 列', 'expectedresults-1.2.csv'],
  ]) {
    const card = data.cards.find((item) => item.id === id);
    assert.ok(card, id);
    assert.equal(card.knowledgeArea, area, id);
    assert.equal(card.topic, topic, id);
    assert.ok(card.sources?.some((source) => source.url.includes(reference)), id);
    assert.ok(matchesScope(card, { sourceId }), id);
    assert.deepEqual(getStudyQueue(data, Date.now(), undefined, { sourceId, query }).map((item) => item.id), [id]);
  }
});
