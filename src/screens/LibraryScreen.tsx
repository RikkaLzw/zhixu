import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { FlatList, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { categories, getCategory } from '../categories';
import { ActionButton, IconButton } from '../components/ui';
import { formatInterval, getStudyQueue, matchesScope, publicInterviewScope, StudyScope } from '../lib/scheduler';
import { cardLevel, enabledStudyLevels, studyLevelLabel, studyLevels } from '../levels';
import { colors } from '../theme';
import { topicLabel, topics } from '../topics';
import { CategoryId, StudyCard, StudyData, StudyLevel, TopicId } from '../types';

const shortSourceNames: Record<string, string> = {
  [publicInterviewScope]: '全部公开面经',
  'pegasus-gap-sentences': 'PEGASUS 摘要预训练',
  'performance-models-foundations': 'Amdahl 与 Roofline 性能模型',
  'cpu-out-of-order-branch-prediction': 'CPU 乱序执行与分支预测',
  'xlmr-crosslingual-representation': 'XLM-R 跨语言表示',
  'vulrag-knowledge-vulnerability': 'Vul-RAG 漏洞知识',
  'codeql-path-query-evidence': 'CodeQL 路径查询',
  'deepdga-adversarial-detection': 'DeepDGA 对抗域名',
  'yara-base64-string-modifiers': 'YARA Base64 与 XOR',
  'population-stability-index-monitoring': 'PSI 分布监测',
  'java-threadpool-foundations': 'Java 线程池',
  'postgresql-partial-index-foundations': 'PostgreSQL 部分索引',
  'tcp-congestion-control-rfc5681': 'TCP 拥塞控制',
  'linux-waitpid-selection': 'Linux waitpid',
  'java-concurrency-foundations': 'Java 并发与内存模型',
  'maximum-likelihood-foundations': '最大似然估计',
  'sample-mean-limit-theorems': '样本均值与极限定理',
  'probabilitycourse-lln': 'ProbabilityCourse 大数定律',
  'graphplan-planning-graphs': 'Graphplan 规划图',
  'zeek-dns-transaction-fields': 'Zeek DNS 事务字段',
  'windows-4688-process-audit': 'Windows 4688 进程审核',
  'mitre-tram-attack-mapping': 'TRAM 威胁报告映射',
  'caldera-emulation-fundamentals': 'CALDERA 安全模拟',
  'nist-honeypot-detection': '蜜罐与威胁观测',
  'aflnet-protocol-state-fuzzing': 'AFLNet 协议模糊测试',
  'aflnet-region-header': 'AFLNet 区域数据结构',
  'qdrant-client-retrieval-practice': 'Qdrant 向量检索',
  'cbpe-unlabeled-performance': 'CBPE 无标签性能估计',
  'geval-llm-evaluation': 'G-Eval 模型评审',
  'alce-citation-evaluation': 'ALCE 引用评估',
  'ares-rag-evaluation': 'ARES RAG 评估',
  'dinov2-visual-self-supervision': 'DINOv2 视觉自监督',
  'iscxvpn2016-traffic-dataset': 'ISCXVPN2016 流量数据',
  'lcs-dynamic-programming': '最长公共子序列',
  'mst-graph-fundamentals': '最小生成树',
  'linux-clock-measurement': 'Linux 时钟与耗时',
  'python-unittest-mock-practice': 'Python mock 测试替身',
  'postgresql-savepoint-recovery': 'PostgreSQL 保存点与恢复',
  'nist-lcs': 'NIST 最长公共子序列',
  'agentverse-multiagent-collaboration': 'AgentVerse 多智能体协作',
  'apibank-tool-evaluation': 'API-Bank 工具评估',
  'prefix-tuning-peft-foundations': 'Prefix-Tuning 前缀微调',
  'gan-generative-foundations': '生成对抗网络基础',
  'github-global-advisory-api': 'GitHub 安全公告接口',
  'owasp-benchmark-java-evaluation': 'OWASP 漏洞检测基准',
  'fill-in-the-middle-training': 'FIM 填空训练',
  'sklearn-polynomial-features': '多项式与交互特征',
  'pyod-feature-bagging-anomaly': '特征袋装异常检测',
  'yara-math-malware-features': 'YARA 数学文件特征',
  'zeek-http-transaction-fields': 'Zeek HTTP 事务日志',
  'mlflow-model-registry-practice': 'MLflow 模型注册',
  'avl-tree-foundations': 'AVL 平衡搜索树',
  'posix-rwlock-foundations': 'POSIX 读写锁',
  'sqlalchemy-optimistic-versioning': '数据库版本冲突',
  'http-rate-limit-status-codes': 'HTTP 限流与状态码',
  'floating-point-special-values': '浮点特殊值',
  'pytorch-multihead-attention-practice': 'PyTorch 多头注意力',
  'transformers-token-classification-pipeline': 'Transformers 序列标注',
  'safetensors-model-storage': 'Safetensors 张量存储',
  'catboost-categorical-foundations': 'CatBoost 类别特征',
  'trec-map-ranking-evaluation': '检索 MAP 指标',
  'torchvision-random-image-augmentation': '随机图像增强',
  'integer-twos-complement': '补码与整数表示',
  'huffman-coding-foundations': '哈夫曼编码',
  'garbage-collection-foundations': '垃圾回收基础',
  'http-method-semantics': 'HTTP 方法语义',
  'python-heapq-practice': 'Python heapq 优先队列',
  'python-threading-sync-practice': 'Python 线程同步',
  'sklearn-cohen-kappa-practice': 'Cohen 标注一致性',
  'go-native-fuzzing-practice': 'Go 原生模糊测试',
  'gnu-elf-inspection-practice': 'ELF 命令行检查',
  'ghidra-reverse-engineering-basics': 'Ghidra 静态分析',
  'langgraph-toolnode-practice': 'LangGraph 工具节点',
  'pyod-knn-anomaly-practice': 'PyOD KNN 异常检测',
  'wazuh-rule-correlation-practice': 'Wazuh 规则关联',
  'certificate-transparency-v1': '证书透明度 v1',
  'positive-unlabeled-learning': '正例与未标注样本学习',
  'sklearn-brier-score-practice': 'Brier 分数接口',
  'debian-apt-dpkg-practice': 'APT 与 dpkg 软件包管理',
  'openssh-key-agent-practice': 'SSH 密钥与代理',
  'linux-process-query-practice': 'Linux 进程查询',
  'cmake-build-foundations': 'CMake 配置与构建',
  'gnu-grep-search-practice': 'GNU grep 搜索',
  'tcpdump-packet-capture-practice': 'tcpdump 抓包',
  'udp-icmp-protocol-practice': 'UDP 与 ICMP',
  'dns-negative-cache-practice': 'DNS 负缓存',
  'postgresql-keyset-pagination': 'PostgreSQL 分页',
  'redis-scan-pipelining-practice': 'Redis 扫描与管线',
  'sklearn-decision-threshold-tuning': '分类阈值调优',
  'roberta-pretraining-details': 'RoBERTa 预训练',
  'graphsage-inductive-sampling': 'GraphSAGE 采样与聚合',
  'graph-of-thoughts-reasoning': 'Graph of Thoughts',
  'hf-text-generation-pipeline': '文本生成 Pipeline',
  'smoothquant-activation-quantization': 'SmoothQuant 激活量化',
  'clang-asan-ubsan-fuzzing': 'ASan 与 UBSan',
  'robust-random-cut-forest': '鲁棒随机切分森林',
  'yara-python-scanning': 'YARA Python 扫描',
  'conditional-expectation-variance': '条件期望与方差',
  'pytorch-conv2d-practice': 'PyTorch 二维卷积',
  'rag-original-latent-documents': '原始 RAG 潜在文档',
  'cse-cic-ids2018-dataset': 'CSE-CIC-IDS2018',
  'tree-sitter-code-parsing': 'Tree-sitter 代码解析',
  'attack-navigator-layer-format': 'ATT&CK Navigator 图层',
  'zeek-weird-analysis': 'Zeek Weird 协议异常',
  'selective-classification-risk-coverage': '拒判与风险覆盖',
  'scipy-multivariate-normal': '多元正态分布',
  'sklearn-randomized-search': '随机参数搜索',
  'albert-parameter-sharing': 'ALBERT 预训练',
  'spanbert-span-boundaries': 'SpanBERT 片段预训练',
  'llmlingua-prompt-compression': 'LLMLingua 提示压缩',
  'dqn-experience-replay': 'DQN 与经验回放',
  'hypothesis-property-fuzzing': 'Hypothesis 性质测试',
  'velociraptor-vql-investigation': 'Velociraptor VQL 调查',
  'chatgpt-phishing-website-study': '语言模型钓鱼网页分析',
  'jq-json-command-practice': 'jq JSON 处理',
  'http-content-negotiation': 'HTTP 内容协商',
  'postgresql-upsert-set-operations': 'PostgreSQL 写入与集合查询',
  'istqb-test-design-fundamentals': '软件测试设计',
  'gnu-make-incremental-build': 'GNU Make 增量构建',
  'lis-algorithm-foundations': '最长递增子序列',
  'curl-http-debug-practice': 'curl HTTP 调试',
  'docker-compose-development': 'Docker Compose',
  'python-pathlib-practice': 'Python 路径处理',
  'langchain-text-splitting-practice': 'LangChain 文档切分',
  'gdb-debugging-foundations': 'GDB 调试基础',
  'python-argparse-cli': 'Python 命令行参数',
  'python-profiling-timeit': 'Python 性能分析',
  'exponential-waiting-times': '指数分布与等待时间',
  'scipy-wilcoxon-paired-test': 'Wilcoxon 配对检验',
  'saycan-grounded-agent': 'SayCan 技能规划',
  'dspy-program-compilation': 'DSPy 模块与优化',
  'aflfast-power-schedules': 'AFLFast 能量调度',
  'fairfuzz-rare-branch': 'FairFuzz 稀有分支',
  'sentinel-asim-normalization': 'ASIM 安全日志归一化',
  'affiliation-anomaly-evaluation': '异常事件关联评估',
  'gnu-sort-uniq-practice': 'GNU 排序与去重',
  'posix-awk-processing': 'awk 记录处理',
  'gnu-sed-substitution': 'sed 过滤与替换',
  'openssh-client-practice': 'SSH 远程连接',
  'rsync-file-sync': 'rsync 文件同步',
  'postgresql-jsonb-practice': 'PostgreSQL JSON 数据',
  'redis-persistence-practice': 'Redis 持久化实践',
  'qemu-virtualization-foundations': '虚拟机与 QEMU',
  'temperature-scaling-calibration': '温度缩放与校准',
  'focal-loss-training-details': 'Focal Loss 训练细节',
  'pytorch-interpolate-practice': 'PyTorch 插值接口',
  'longformer-attention-foundations': 'Longformer 长文本注意力',
  'deberta-disentangled-attention': 'DeBERTa 解耦注意力',
  'dpo-preference-objective': 'DPO 偏好优化细节',
  'aws-vpc-flow-log-fields': 'VPC Flow Logs 字段',
  'tranad-self-conditioning': 'TranAD 时序异常检测',
  'pefile-static-parsing': 'pefile 静态解析',
  'vulberta-code-pretraining': 'VulBERTa 代码漏洞检测',
  'unet-biomedical-segmentation': 'U-Net 图像分割',
  'python-sqlite3-database': 'Python SQLite 接口',
  'mteb-embedding-evaluation': 'MTEB 嵌入评估',
  'metagpt-role-collaboration': 'MetaGPT 多智能体协作',
  'mind2web-offline-evaluation': 'Mind2Web 网页操作评测',
  'chatafl-protocol-fuzzing': 'ChatAFL 协议模糊测试',
  'misp-warninglist-triage': 'MISP 警告列表',
  'elastic-threshold-rule-practice': 'Elastic 安全检测规则',
  'detr-object-detection': 'DETR 目标检测',
  'mysql-logging-recovery': 'MySQL 日志与恢复',
  'tcp-keepalive-small-packets': 'TCP 保活与小包',
  'bash-expansion-array-practice': 'Bash 参数与数组',
  'gnu-output-command-practice': 'Linux 输出与统计命令',
  'postgresql-null-logic-patterns': 'SQL 空值与匹配',
  'lightgbm-tree-learning': 'LightGBM 树学习',
  'lightgbm-classifier-practice': 'LightGBM 分类器接口',
  'pytorch-cross-entropy-shapes': 'PyTorch 交叉熵形状与归约',
  'pissa-low-rank-initialization': 'PiSSA 低秩初始化',
  'bitsandbytes-quantization-config': 'bitsandbytes 量化配置',
  'e5-embedding-pretraining': 'E5 文本嵌入',
  'minhash-jaccard-retrieval': 'MinHash 相似集合检索',
  'ja3-client-fingerprint': 'JA3 客户端指纹',
  'usad-reference-model': 'USAD 重建异常检测',
  'capa-capability-analysis': 'capa 程序能力分析',
  'hellinger-drift-distance': 'Hellinger 分布距离',
  'scipy-mann-whitney-u': 'Mann–Whitney U 检验',
  'python-multiprocessing-practice': 'Python 多进程实践',
  'bart-denoising-architecture': 'BART 去噪结构',
  'alfworld-agent-transfer': 'ALFWorld 智能体环境',
  'msr20-code-vulnerability-dataset': 'MSR C/C++ 漏洞数据',
  'aflgo-directed-greybox': 'AFLGo 定向模糊测试',
  'opencti-knowledge-ingestion': 'OpenCTI 情报图谱',
  'elastic-ecs-event-analysis': 'ECS 事件字段',
  'clap-audio-text-contrastive': 'CLAP 音频文本表示',
  'redis-streams-consumer-groups': 'Redis Streams 消费组',
  'sklearn-hashing-vectorizer': 'HashingVectorizer 文本特征',
  'sklearn-hist-gradient-boosting': '直方图梯度提升',
  'pytorch-parameter-initialization': 'PyTorch 参数初始化',
  'ia3-activation-adaptation': 'IA³ 激活缩放',
  'langchain-runnable-message-history': 'LangChain 历史消息',
  'lats-search-reflection': 'LATS 搜索与反思',
  'loghub-hdfs-data-variants': 'Loghub HDFS 数据',
  'extended-isolation-forest': '扩展孤立森林',
  'mlflow-experiment-tracking': 'MLflow 实验跟踪',
  'linux-cron-scheduling': 'Linux 定时任务',
  'linux-user-identity': 'Linux 用户与进程身份',
  'linux-environment-resource-limits': '进程环境与资源限制',
  'linux-select-poll-io': 'select 与 poll 多路复用',
  'gnu-diff-patch-practice': 'diff 与 patch 命令',
  'xlnet-permutation-pretraining': 'XLNet 排列语言建模',
  'hotpotqa-multihop-evaluation': 'HotpotQA 多跳问答',
  'rap-world-model-planning': 'RAP 世界模型规划',
  'reveal-code-graph-detection': 'ReVeal 代码漏洞检测',
  'fuzzilli-javascript-intermediate': 'Fuzzilli 引擎模糊测试',
  'yara-condition-operators': 'YARA 条件表达式',
  'threatfox-ioc-api': 'ThreatFox 威胁指标',
  'volatility3-linux-memory': 'Volatility Linux 内存调查',
  'audio-spectrogram-transformer': '音频频谱 Transformer',
  'gnu-text-join-compare': 'Linux 文本合并与比较',
  'scipy-independent-paired-t-tests': '独立与配对 t 检验',
  'scipy-shapiro-normality': 'Shapiro 正态性检验',
  'pandas-asof-time-alignment': 'Pandas 时间近邻合并',
  'pandas-datetime-parsing': 'Pandas 日期时间解析',
  'sklearn-knn-classification': 'K 近邻分类接口',
  'pytorch-adamw-optimizer': 'PyTorch AdamW 优化器',
  'lora-plus-learning-rates': 'LoRA+ 学习率',
  'langchain-model-structured-output': 'LangChain 结构化输出',
  'linux-proc-process-inspection': 'Linux proc 进程信息',
  'python-requests-http-practice': 'Python Requests 请求',
  'git-submodule-fundamentals': 'Git 子模块',
  'git-worktree-practice': 'Git 多工作树',
  'linux-audit-log-analysis': 'Linux Audit 日志',
  'pyod-copod-usage': 'PyOD COPOD 异常评分',
  'vul4j-java-vulnerability-benchmark': 'Vul4J 漏洞基准',
  'phiusiil-phishing-dataset': 'PhiUSIIL 钓鱼数据',
  'plan-and-solve-prompting': 'Plan-and-Solve 提示',
  'mt-bench-llm-judge': 'MT-Bench 与模型评审',
  'linux-inotify-file-events': 'Linux 文件事件通知',
  'postgresql-psql-cli-practice': 'PostgreSQL psql 命令行',
  'python-venv-pip-practice': 'Python 虚拟环境与 pip',
  'python-json-serialization': 'Python JSON 编解码',
  'pandas-merge-key-practice': 'Pandas 合并键',
  'pydantic-v2-validation': 'Pydantic 模型校验',
  'sklearn-clustering-evaluation': '聚类评估指标',
  'lora-fa-fixed-matrix': 'LoRA-FA 参数高效微调',
  'ciciot2023-security-dataset': 'CICIoT2023 安全数据',
  'scipy-logsumexp-softmax': 'LogSumExp 数值计算',
  'pytorch-maxpool2d-practice': 'PyTorch 二维池化',
  'transformers-language-model-collation': '语言模型批次整理',
  'langchain-embedding-cache': 'LangChain 嵌入缓存',
  'simclr-visual-contrastive': 'SimCLR 视觉表示',
  'deep-sad-semisupervised-anomaly': 'Deep SAD 异常检测',
  'linux-flock-file-locking': 'Linux 文件锁',
  'http-hsts-protocol': 'HTTP HSTS 策略',
  'coverage-py-branch-analysis': 'Python 测试覆盖率',
  'sklearn-time-series-split': '时间序列交叉验证',
  'python-hashlib-hmac': 'Python 摘要与 HMAC',
  'openssl-s-client-tls-diagnostics': 'OpenSSL TLS 诊断',
  'pyod-hbos-outlier-detection': 'HBOS 异常检测',
  'd2a-differential-vulnerability-dataset': 'D2A 差分漏洞数据',
  'androzoo-android-app-dataset': 'AndroZoo Android 数据',
  'agentboard-progress-evaluation': 'AgentBoard 进度评估',
  'ddpm-diffusion-foundations': 'DDPM 扩散模型',
  'angora-taint-guided-fuzzing': 'Angora 污点引导模糊测试',
  'misp-galaxy-schema-practice': 'MISP Galaxy 数据格式',
  'dns-dig-query-practice': 'dig DNS 查询',
  'bitwise-interview-fundamentals': '整数位运算',
  'gnu-timeout-command-practice': 'GNU timeout 超时控制',
  'bash-errexit-nounset-practice': 'Bash 错误处理',
  'python-csv-dictionary-practice': 'Python CSV 字典读写',
  'numpy-generator-choice-practice': 'NumPy 随机抽样',
  'scipy-robust-dispersion-practice': '稳健离散程度',
  'scipy-signal-peak-detection': '时序峰值检测',
  'pillow-image-preprocessing': 'Pillow 图像预处理',
  'rfc5424-syslog-telemetry': 'Syslog 安全日志',
  'toolemu-agent-risk-evaluation': 'ToolEmu 风险评估',
  'cisa-ssvc-vulnerability-triage': 'SSVC 漏洞处置',
  'pandas-string-extraction-practice': 'Pandas 字符串处理',
  'option-critic-temporal-abstraction': 'Agent 时间抽象与技能',
  'gorilla-api-retrieval-agent': 'Gorilla 工具调用',
  'energy-ood-detection-evaluation': '分布外能量评分',
  'vulrepair-data-quality-study': 'VulRepair 数据质量',
  'afl-custom-mutator-lifecycle': 'AFL++ 自定义变异器',
  'taxii-collection-pagination': 'TAXII 集合获取',
  'linux-acl-permission-practice': 'Linux ACL 权限',
  'git-ignore-patterns-practice': 'Git 忽略规则',
  'openssh-scp-sftp-practice': 'SCP 与 SFTP 传输',
  'grpc-service-fundamentals': 'gRPC 服务调用',
  'postgresql-datetime-timezone': 'PostgreSQL 时间与时区',
  'sqlalchemy-connection-pool': '数据库连接池',
  'hash-table-collision-practice': '哈希表冲突处理',
  'transformers-tokenizer-batching': 'Transformers 分词批次',
  'transformers-trainer-evaluation': 'Trainer 评估与保存',
  'pytorch-embedding-cosine-contracts': 'PyTorch 嵌入与相似度',
  'matryoshka-variable-embeddings': 'Matryoshka 可变维度表示',
  'rslora-rank-stability': 'rsLoRA 秩稳定性',
  'malnet-function-call-graphs': 'MalNet 图数据集',
  'virustotal-file-behaviour-fields': 'VirusTotal 文件行为',
  'agent-adversarial-game-search': '智能体博弈搜索',
  'sarsa-expected-double-q': 'Sarsa 与双重 Q 学习',
  'sklearn-pdp-ice-inspection': '部分依赖与个体效应',
  'tau2-dual-control-evaluation': 'τ²-bench 双控制评测',
  'cert-synthetic-insider-dataset': 'CERT 合成内部威胁数据',
  'fuzzgpt-history-guided-generation': 'FuzzGPT 历史缺陷引导',
  original: '自编起步题',
  'cic-ids2017': 'CIC-IDS2017',
  'unsw-nb15': 'UNSW-NB15',
  'sklearn-evaluation': 'sklearn 评估',
  'zeek-logs': 'Zeek',
  'suricata-eve': 'Suricata',
  'codexglue-defects': 'CodeXGLUE',
  primevul: 'PrimeVul',
  'ember-malware': 'EMBER',
  llm4vuln: 'LLM4Vuln',
  'mitre-attack': 'MITRE ATT&CK',
  'security-copilot': 'Security Copilot',
  'security-rag': '安全 RAG',
  'github-ai4sec-interview': 'GitHub 面试题',
  'isolation-forest': 'Isolation Forest',
  openphish: 'OpenPhish',
  'oss-fuzz-gen': 'OSS-Fuzz-gen',
  'd2l-math': '动手学深度学习',
  'python-numpy': 'Python / NumPy',
  'sklearn-clustering': 'sklearn 聚类',
  'pytorch-training': 'PyTorch 训练',
  'hf-transformer': 'HF Transformer',
  'hf-generation': 'HF 生成',
  'langchain-retrieval': '检索与重排',
  'langchain-fundamentals': 'LangChain 基础',
  'ms-agents': 'Agent 入门',
  'langgraph-engineering': 'LangGraph',
  'rl-intro': '强化学习',
  'happy-attention': 'Happy-LLM',
  'zeek-telemetry': 'Zeek / EVE 字段',
  'stix-taxii': 'STIX / TAXII',
  'codeql-flow': 'CodeQL 数据流',
  'libfuzzer-basics': 'libFuzzer',
  'pandas-data': 'pandas',
  'd2l-generalization': '模型泛化',
  'pyg-graphs': '图神经网络',
  'lora-adaptation': 'LoRA',
  'lora-peft-practice': 'LoRA 与 PEFT',
  'vision-detection': '视觉检测',
  'ml-production': '生产监控',
  'nist-incident': '事件响应',
  'agent-patterns': 'Agent 范式',
  'mcp-agent': 'MCP',
  'langgraph-resume': 'LangGraph 恢复',
  'rag-indexing': '检索索引',
  'lof-detection': 'LOF',
  'password-spray': '密码喷洒',
  'pe-structure': 'PE 格式',
  'company-bytedance': '字节面经',
  'company-alibaba': '阿里面经',
  'company-tencent': '腾讯面经',
  'company-baidu': '百度面经',
  'company-kuaishou': '快手面经',
  'company-xiaomi': '小米面经',
  'company-ant': '蚂蚁面经',
  'company-iflytek': '科大讯飞面经',
  'company-megvii': '旷视面经',
  'company-horizon': '地平线面经',
  'company-huawei': '华为面经',
  'company-58': '58 同城面经',
  'company-meituan': '美团面经',
  'company-jd': '京东面经',
  'company-360': '360 面经',
  'company-bilibili': '哔哩哔哩面经',
  'company-sensetime': '商汤面经',
  'company-didi': '滴滴面经',
  'company-ctrip': '携程面经',
  'company-hikvision': '海康威视面经',
  'company-sf': '顺丰面经',
  'company-dji': '大疆面经',
  'company-pingcap': 'PingCAP 面经',
  'company-deepglint': '格灵深瞳面经',
  'python-copy-interview': 'Python 拷贝',
  'python-ip-interview': 'Python IP 地址',
  'owasp-sast-interview': 'OWASP 静态测试',
  'owasp-dast-interview': 'OWASP 动态测试',
  'owasp-iast-interview': 'OWASP 交互式测试',
  'dependency-graph-interview': '软件依赖图',
  'codeql-path-interview': 'CodeQL 路径查询',
  'http-proxy-interview': 'HTTP 代理',
  'policy-baseline-interview': '策略梯度基线',
  'adam-paper-interview': 'Adam 论文',
  'dpo-paper-interview': 'DPO 论文',
  'preference-format-interview': '偏好数据格式',
  'reward-overoptimization-interview': '奖励模型过度优化',
  'deepspeed-zero-interview': 'DeepSpeed ZeRO',
  'agent-context-interview': 'Agent 上下文',
  'owasp-prompt-injection-interview': '提示注入',
  'adversarial-robustness-interview': '对抗稳健性',
  'cnn-foundations': '卷积与池化基础',
  'recurrent-foundations': '循环网络与门控',
  'deep-init-normalization': '初始化与归一化',
  'tokenization-pipeline-details': '分词流水线',
  'transformer-input-qa': 'Transformer 输入与问答',
  'agent-memory-context': 'Agent 记忆与上下文',
  'probability-matrix-identities': '概率与矩阵性质',
  'ml-probability-calibration': '概率校准',
  'evaluation-cross-validation': '模型评估与交叉验证',
  'mcp-advanced-interactions': 'MCP 协议交互',
  'agent-evaluation-reliability': 'Agent 评测可靠性',
  'cti-entity-linking': '情报实体链接',
  'threat-indicator-lifecycle': '威胁指标与时效',
  'security-dataset-documentation': '安全数据集说明',
  'model-card-security-evaluation': '模型评估报告',
  'security-deployment-evaluation': '安全模型上线验证',
  'legacy-review-sources-25': '旧题技术依据',
  'company-contrastive-learning': '公开面经：对比学习',
  'company-ddp-interviews': '公开面经：分布式训练',
  'company-security-experiences-27': '安全岗位面经补充',
  'company-long-context-interviews': '长上下文与注意力面经',
  'company-authentication-interviews': '身份认证面经',
  'log-sequence-anomaly': '日志序列异常检测',
  'llm-fuzzing-methods': '大模型模糊测试方法',
  'soc-investigation-evaluation': '安全事件调查与评估',
  'seq2seq-pretraining': '序列生成与预训练',
  'company-security-ai-interviews-53': '安全与智能安全面经',
  'voyager-agent-skills': 'Voyager 技能与探索',
  'webarena-agent-evaluation': 'WebArena 智能体评测',
  'beir-retrieval-evaluation': 'BEIR 检索评测',
  'pca-manifold-basics': 'PCA 与可视化降维',
  'dns-tunnel-detection': 'DNS 隧道检测',
  'cic-dohbrw-dataset': 'DoH 流量数据集',
  'neural-network-foundations': '神经网络基础',
  'loss-regularization-foundations': '损失与正则化',
  'sft-dialogue-foundations': '监督微调与对话数据',
  'speech-recognition-foundations': '语音识别与音频基础',
  'numpy-data-fundamentals': 'NumPy 与 Python 数据处理',
  'security-operating-point-evaluation': '安全模型工作点与标签质量',
  'python-syntax-foundations': 'Python 基础与进阶语法',
  'python-stdlib-iterators': 'Python 标准库',
  'word-vector-foundations': '词向量基础',
  'stix-pattern-fundamentals': 'STIX 模式基础',
  'pytorch-tensor-operations': 'PyTorch 常用张量接口',
  'malconv-byte-models': 'MalConv 字节检测',
  'sklearn-metrics-validation': 'scikit-learn 评估接口',
  'sigma-modifier-fundamentals': 'Sigma 条件与修饰符',
  'graphrag-foundations': 'GraphRAG 基础',
  'kitsune-online-detection': 'Kitsune 网络异常检测',
  'langchain-core-practice': 'LangChain 实用接口',
  'langchain-rag-apis': 'LangChain 检索接口',
  'tesseract-evaluation-detail': 'TESSERACT 时间评估',
  'python-typing-dataclasses': 'Python 类型提示与数据类',
  'sklearn-feature-selection': 'scikit-learn 特征筛选',
  'llm4vuln-study': '漏洞推理与审计验证',
  'langchain-stream-context': 'LangChain 流式与上下文',
  'lora-training-details': 'LoRA 训练与部署',
  'agent-observation-belief': 'Agent 观测与信念状态',
  'sentinel-rule-operations': 'Sentinel 定时检测运营',
  'magma-fuzz-evaluation': 'Magma 模糊测试评估',
  'security-distribution-shift': '安全模型分布偏移',
  'graph-theory-foundations': '图论基础',
  'epss-evidence-usage': 'EPSS 情报与数据',
  'nlp-generation-evaluation': '文本生成与语言模型评估',
  'clip-vit-foundations': 'CLIP 与 ViT 基础',
  'agent-classical-search': 'Agent 规划与搜索',
  'deepcase-contextual-triage': 'DeepCASE 事件关联',
  'identity-lateral-detection': '身份与远程访问威胁',
  'modern-malware-benchmarks': '现代恶意软件基准',
  'cuckoo-dynamic-analysis': 'Cuckoo 动态分析',
  'conformal-malware-evaluation': '共形评估与恶意软件漂移',
  'cisa-kev-schema': 'CISA KEV 情报字段',
  'phishing-multimodal-methods': '多模态钓鱼页面分析',
  'neuzz-neural-fuzzing': 'NEUZZ 神经模糊测试',
  'diamond-intrusion-analysis': '入侵分析钻石模型',
  'rl-learning-methods': '强化学习方法',
  'faiss-index-contracts': 'Faiss 索引接口',
  'ctu13-botnet-dataset': 'CTU-13 僵尸网络数据',
  'lanl-host-network-dataset': 'LANL 主机与网络数据',
  'python-asyncio-practice': 'Python 异步编程',
  'langchain-output-parsing': 'LangChain 输出解析',
  'nab-anomaly-benchmark': 'NAB 流式异常评估',
  'naive-bayes-foundations': '朴素贝叶斯',
  'ner-token-labeling': '实体标注与评估',
  'hmm-sequence-models': '隐马尔可夫模型',
  'host-threat-behavior': '主机凭据与威胁行为',
  'linear-projection-least-squares': '正交投影与最小二乘',
  'pytorch-activation-checkpoint': 'PyTorch 激活检查点',
  'flash-attention-algorithms': 'FlashAttention 算法',
  'gnn-convolution-models': '图神经网络模型',
  'python-object-protocols': 'Python 对象与异常',
  'sklearn-regression-metrics': '回归评估函数',
  'atheris-python-fuzzing': 'Atheris Python 模糊测试',
  'juliet-code-benchmark': 'Juliet 漏洞基准',
  'devign-graph-vulnerability': 'Devign 程序图检测',
  'vuldeepecker-code-gadgets': 'VulDeePecker 代码切片',
  'splade-sparse-retrieval': 'SPLADE 稀疏检索',
  'reflexion-agent-feedback': 'Reflexion 智能体反思',
  'tcp-ip-fundamentals': 'TCP/IP 基础',
  'linux-command-foundations': 'Linux 常用命令',
  'os-fundamentals': '操作系统基础',
  'postgresql-database-foundations': '数据库与 SQL 基础',
  'data-structures-foundations': '数据结构与算法',
  'computer-architecture-foundations': '计算机组成与表示',
  'os-concurrency-fundamentals': '操作系统并发',
  'linux-file-descriptor-fundamentals': 'Linux 文件描述符',
  'http-web-fundamentals': 'HTTP 与 Web 基础',
  'speculative-decoding-foundations': '投机解码与采样',
  'one-class-anomaly-methods': '单类异常检测',
  'git-version-control-foundations': 'Git 与版本控制',
  'ip-routing-fundamentals': 'IP 寻址与转发',
  'os-memory-replacement-foundations': '内存局部性与页面替换',
  'os-cpu-scheduling-fundamentals': 'CPU 调度',
  'weak-supervision-labeling': '弱监督与标签函数',
  'log-template-parsing': '日志模板解析',
  'model-explanations-lime-shap': 'LIME 与 SHAP',
  'misp-threat-intelligence-format': 'MISP 情报格式',
  'active-learning-security-evaluation': '主动学习与安全标注',
  'torchvision-image-preprocessing': 'torchvision 图像预处理',
  'sorting-heap-algorithms': '排序与二叉堆',
  'postgresql-query-index': 'SQL 查询与索引',
  'bash-shell-practice': 'Shell 与命令实践',
  'file-system-internals': '文件系统与持久化',
  'log-structured-file-system': '日志结构文件系统',
  'memory-free-space-management': '堆内存与空闲空间管理',
  'tls-protocol-foundations': 'TLS 与服务身份',
  'cvss-v4-foundations': 'CVSS v4.0 漏洞评分',
  'river-drift-detection': 'River 流式漂移检测',
  'river-pagehinkley-0212': 'River Page-Hinkley',
  'postgresql-mvcc-locks': '数据库并发与锁',
  'python-regex-practice': 'Python 正则表达式',
  'elasticsearch-text-retrieval': 'Elasticsearch 全文检索',
  'elasticsearch-term-817': 'Elasticsearch term 查询',
  'osv-schema-v192': 'OSV 漏洞数据格式',
  'drebin-android-malware': 'DREBIN 恶意软件检测',
  'linevd-statement-detection': 'LineVD 语句级漏洞检测',
  'llmcompiler-parallel-tools': 'LLMCompiler 并行工具调用',
  'time-series-anomaly-basics': '时间序列与异常基线',
  'linux-network-troubleshooting': 'Linux 网络排查',
  'redis-cache-foundations': 'Redis 缓存基础',
  'kafka-messaging-foundations': 'Kafka 消息队列',
  'compiler-build-foundations': '编译与构建基础',
  'raft-consensus-foundations': 'Raft 分布式共识',
  'bilstm-crf-foundations': 'BiLSTM 与 CRF',
  'transformers-generation-parameters': '生成与解码配置',
  'soc-companion-field-study': 'SOC AI 现场研究',
  'soc-benchmark-design': 'SOC-bench 评测设计',
  'markov-chain-fundamentals': '马尔可夫链基础',
  'cpu-pipeline-fundamentals': 'CPU 指令流水线',
  'swe-bench-agent-evaluation': 'SWE-bench 工程评测',
  'llmfuzz-dl-library': 'LLMFuzz 深度学习库测试',
  'colbertv2-compression': 'ColBERTv2 检索压缩',
  'linux-process-signals': 'Linux 进程与信号',
  'python-import-mechanics': 'Python 导入与缓存',
  'kibana-kql-investigation': 'Kibana KQL 日志筛选',
  'loganomaly-sequence-count': 'LogAnomaly 日志异常',
  'toolllm-toolbench-foundations': 'ToolLLM 工具使用',
  'algorithm-design-foundations': '常见算法思路',
  'linux-socket-programming': 'Linux 套接字编程',
  'pytorch-normalization-contracts': 'PyTorch 归一化层',
  'sklearn-sgd-incremental': 'SGD 与增量训练',
  'codebert-graphcodebert': 'CodeBERT 代码预训练',
  'dpr-dense-passage-retrieval': 'DPR 稠密段落检索',
  'cvefixes-vulnerability-data': 'CVEfixes 漏洞修复数据',
  'autoencoder-foundations': '自编码器基础',
  'autoencoder-anomaly-detection': '自编码器异常检测',
  'alibi-position-bias': 'ALiBi 位置偏置',
  'transformer-xl-recurrence': 'Transformer-XL 片段记忆',
  'tokenizers-encoding-contracts': '分词编码与对齐',
  'linux-ipc-fundamentals': 'Linux 进程间通信',
  'linux-io-multiplexing': 'Linux I/O 多路复用',
  'graph-algorithms-fundamentals': '图算法与并查集',
  'docker-container-fundamentals': '容器与 Docker 基础',
  'linux-namespaces-cgroups-foundations': 'Linux 命名空间与 cgroups',
  'browser-origin-cors-cookies': '浏览器同源与跨域',
  'postgresql-constraints-design': '数据库约束与设计',
  'ipv6-dhcp-fundamentals': 'IPv6 与 DHCP 基础',
  'policy-gradient-gae': '策略梯度与优势估计',
  'ppo-clipped-objective': 'PPO 裁剪与更新',
  'instructgpt-rlhf-training': 'RLHF 奖励模型与 PPO',
  'bayesian-updating-foundations': '贝叶斯更新与赔率',
  'bot-iot-dataset': 'BoT-IoT 流量数据',
  'fuzzbench-evaluation-methods': 'FuzzBench 评估方法',
  'urlhaus-threat-feed': 'URLhaus 恶意 URL 情报',
  'phishtank-feed-boundaries': 'PhishTank 钓鱼数据',
  'malwarebazaar-community-data': 'MalwareBazaar 样本情报',
  'ton-iot-multisource-dataset': 'ToN_IoT 多源数据',
  'tranco-ranking-evaluation': 'Tranco 域名排名',
  'nist-incident-analysis-communication': '事件分析与沟通',
  'tau-bench-agent-reliability': 'τ-bench 可靠性评测',
  'toolsandbox-agent-evaluation': 'ToolSandbox 工具评测',
  'agentdojo-tool-boundaries': 'AgentDojo 工具信任边界',
  'deep-svdd-anomaly-detection': 'Deep SVDD 异常检测',
  'matthews-correlation-evaluation': 'MCC 分类评估',
  'cicflowmeter-feature-contracts': 'CICFlowMeter 流量特征',
  'http-versions-quic': 'HTTP 版本与 QUIC',
  'cpu-cache-foundations': 'CPU 缓存与存储层次',
  'postgresql-window-functions': 'SQL 窗口函数',
  'trie-string-search': '字典树与字符串检索',
  'text-number-representation': '文本编码与数值表示',
  'gqa-attention-uptraining': 'GQA 分组查询注意力',
  'switch-moe-foundations': 'Switch 稀疏专家模型',
  'hnsw-graph-search': 'HNSW 分层近邻图',
  'pytorch-lr-schedulers': 'PyTorch 学习率调度',
  'ocsf-security-event-schema': 'OCSF 安全事件规范',
  'cve-record-schema': 'CVE 记录与版本范围',
  'semantic-segmentation-foundations': '语义分割基础',
  'semgrep-taint-analysis-details': 'Semgrep 污点分析范围',
  'beta-binomial-inference': 'Beta 与二项贝叶斯更新',
  'rewoo-agent-planning': 'ReWOO 工具规划',
  'grpo-training-foundations': 'GRPO 训练基础',
  'fpn-multiscale-vision': 'FPN 多尺度视觉特征',
  'python-logging-foundations': 'Python 日志实践',
  'rrf-ranking-fusion': 'RRF 检索排序融合',
  'canary-release-evaluation': '金丝雀发布评估',
  'zeek-notice-workflow': 'Zeek 通知与关联',
  'afl-instrumentation-feedback': 'AFL++ 比较反馈与插桩',
  'nginx-load-balancing': 'Nginx 负载均衡',
  'application-cache-patterns': '应用缓存策略',
  'bloom-filter-foundations': '布隆过滤器',
  'consistent-hashing-foundations': '一致性哈希',
  'multiple-testing-fdr': '多重检验与假发现率',
  'eql-security-event-sequences': 'EQL 安全事件关联',
  'nbaiot-botnet-detection': 'N-BaIoT 僵尸网络检测',
  'ecod-outlier-detection': 'ECOD 异常检测',
  'self-consistency-reasoning': '自一致性推理',
  'least-to-most-reasoning': 'Least-to-Most 子问题求解',
  'fuzz4all-generation-oracles': 'Fuzz4All 生成与预言机',
  'unicorn-provenance-detection': 'UNICORN 溯源检测',
  'distillation-distilbert': '知识蒸馏与 DistilBERT',
  'swe-agent-interface': 'SWE-agent 计算机接口',
  'agentbench-interactive-evaluation': 'AgentBench 交互评测',
  'autogen-conversation-basics': 'AutoGen 多智能体',
  'hyde-retrieval-details': 'HyDE 检索细节',
  'syzkaller-syscall-fuzzing': 'syzkaller 系统调用测试',
  'linux-kcov-fuzzing': 'Linux KCOV 覆盖采集',
  'opentelemetry-agent-tracing': 'OpenTelemetry 追踪',
  'binomial-security-evaluation': '二项比例与安全评估',
  'mysql-innodb-index-foundations': 'MySQL InnoDB 索引',
  'mysql-innodb-transactions': 'MySQL InnoDB 事务与锁',
  'linux-text-processing-commands': 'Linux 文本处理命令',
  'distributed-overload-reliability': '分布式服务过载与可靠性',
  'sklearn-text-vectorization': '文本计数与 TF-IDF',
  'cloudtrail-security-telemetry': 'CloudTrail 云审计数据',
  'windows-kerberos-audit': 'Windows Kerberos 审核',
  'guardduty-threat-findings': 'GuardDuty 威胁检测',
  'splunk-spl-security-analysis': 'Splunk SPL 日志查询',
  'classical-agent-planning': '智能体经典规划建模',
  'correlation-statistical-foundations': '相关系数与秩相关',
  'distribution-drift-statistics': '分布差异与漂移检测',
  'pytorch-embeddingbag-practice': 'EmbeddingBag 文本嵌入',
  'yara-pe-rule-practice': 'YARA PE 与规则条件',
  'tesseract-ocr-document-practice': 'Tesseract 文档 OCR',
  'self-refine-agent-feedback': 'Self-Refine 反馈与修订',
  'ethernet-switching-vlan-foundations': '以太网交换与 VLAN',
  'linux-memory-mapping-fundamentals': 'Linux 内存映射',
  'binary-search-trees-foundations': '二叉搜索树与平衡树',
  'rope-rotation-foundations': 'RoPE 旋转位置编码',
  'rmsnorm-swiglu-foundations': 'RMSNorm 与 SwiGLU',
  'path-traversal-code-analysis': '路径穿越与文件访问',
  'humaneval-code-evaluation': 'HumanEval 代码生成评估',
  'hierarchical-task-network-planning': '层级任务网络规划',
  'kubernetes-workload-service-foundations': 'Kubernetes 工作负载与服务',
  'linux-file-permissions-fundamentals': 'Linux 文件与目录权限',
  'masked-autoencoder-vision-foundations': '图像掩码自编码',
  'diversevul-code-dataset': 'DiverseVul 漏洞代码数据',
  'sentence-transformers-encode-practice': 'Sentence Transformers 编码实践',
  'websocket-sse-protocol-foundations': 'WebSocket 与服务端事件',
  'pytorch-checkpoint-serialization': 'PyTorch 检查点序列化',
  'codet5-identifier-pretraining': 'CodeT5 代码预训练',
  'adalora-rank-allocation': 'AdaLoRA 自适应秩',
  'monte-carlo-tree-search-foundations': '蒙特卡洛树搜索',
  'anomaly-transformer-association': '时序异常关联差异',
  'git-history-debugging': 'Git 历史与排查',
  'systemd-service-operations': 'Linux 服务与日志',
  'pytest-testing-fundamentals': 'Python 自动化测试',
  'sklearn-hdbscan-foundations': 'HDBSCAN 密度聚类',
  'simpo-preference-optimization': 'SimPO 偏好优化',
  'gaia-agent-benchmark': 'GAIA 助手评测',
  'torchvision-model-weights': '视觉模型权重接口',
  'ja4-tls-fingerprint': 'JA4 TLS 客户端指纹',
  'python-exception-groups': 'Python 异常组',
  'contingency-statistical-tests': '列联表统计检验',
  'nvd-cve-api-practice': 'NVD 漏洞情报接口',
  'clusterfuzzlite-ci-fuzzing': 'CI 模糊测试',
  'wav2vec2-pretraining-detail': 'wav2vec 2.0 预训练',
  'falco-rule-authoring': 'Falco 安全规则',
  'smote-oversampling-practice': 'SMOTE 过采样',
  'squad-v2-evaluation': 'SQuAD 问答评测',
  'ephishgen-dataset-evaluation': '合成钓鱼邮件评测',
  'loggpt-sequence-detection': 'LogGPT 日志异常检测',
  'megavul-dataset-construction': 'MegaVul 漏洞代码数据',
  'c-memory-pointer-fundamentals': 'C 指针与内存',
  'c11-language-semantics': 'C11 语言语义',
  'compiler-fundamentals': '编译器基础',
  'http-status-range-fundamentals': 'HTTP 状态码与范围请求',
  'gnu-tar-gzip-commands': 'Linux 归档与压缩',
  'binary-tree-traversal-fundamentals': '二叉树遍历',
  'postgresql-views-cte-foundations': 'SQL 视图与 CTE',
  'langchain-parent-document-retrieval': 'LangChain 父文档检索',
  'dora-weight-decomposition': 'DoRA 权重分解',
  'self-ask-compositional-reasoning': 'Self-Ask 组合推理',
  'mcnemar-paired-classification': 'McNemar 成对检验',
  'seqeval-entity-metrics': 'seqeval 实体指标',
  'mitre-attack-detection-strategies': 'ATT&CK 检测策略',
  'python-futures-executors': 'Python 线程池与 Future',
  'sklearn-probability-calibration': 'scikit-learn 概率校准',
  'pytorch-common-loss-functions': 'PyTorch 常用损失函数',
  'iot23-network-dataset': 'IoT-23 安全流量',
  'opentelemetry-metrics-monitoring': 'OpenTelemetry 指标监控',
  'linux-resource-monitoring': 'Linux 资源监控',
  'relational-database-normalization': '关系数据库范式与设计',
  'algorithm-complexity-foundations': '算法复杂度基础',
  'segment-tree-fenwick-foundations': '线段树与树状数组',
  'dns-resolution-delegation': 'DNS 分层解析',
  'http-cache-validation-fundamentals': 'HTTP 缓存与条件请求',
  'vllm-prefix-cache': 'vLLM 前缀缓存',
  'truthfulqa-benchmark': 'TruthfulQA 模型评测',
  'coco-detection-evaluation': 'COCO 目标检测评估',
  'openvex-vulnerability-status': 'OpenVEX 漏洞影响状态',
  'sarif-static-analysis-results': 'SARIF 静态分析结果',
  'afl-persistent-harness': 'AFL++ 持久化测试入口',
  'hugginggpt-model-orchestration': 'HuggingGPT 模型协作',
  'webshop-agent-benchmark': 'WebShop 网页智能体评测',
  'osworld-desktop-agent-benchmark': 'OSWorld 计算机操作评测',
  'neurallog-semantic-anomaly': 'NeuralLog 日志语义检测',
  'avclass-malware-label-normalization': 'AVclass2 恶意软件标签',
  'bertscore-text-generation-evaluation': 'BERTScore 文本生成评估',
  'gnu-find-xargs-practice': 'Linux 文件查找与批处理',
  'dockerfile-build-foundations': 'Dockerfile 构建基础',
  'postgresql-explain-practice': 'PostgreSQL 查询执行计划',
  'tcp-sack-retransmission': 'TCP 确认与重传计时',
  'python-subprocess-foundations': 'Python 子进程与命令执行',
  'pytorch-sampling-practice': 'PyTorch 数据采样',
  'sklearn-permutation-score': '交叉验证置换检验',
  'suricata-rule-thresholding': 'Suricata 告警阈值',
  'clang-sanitizer-coverage': '覆盖插桩与反馈',
  'bandit-exploration-foundations': '多臂老虎机与探索',
  'awq-gptq-weight-quantization': 'AWQ 与 GPTQ 权重量化',
  'langchain-query-compression': '多查询与上下文压缩',
  'berkeley-function-calling-evaluation': '函数调用评测',
  'livecodebench-evaluation': '代码模型持续评估',
  'ipv4-subnet-practice': 'IPv4 子网计算',
  'linked-list-interview-practice': '链表常见算法',
  'kmp-string-matching-foundations': 'KMP 字符串匹配',
  'postgresql-aggregate-interview': 'SQL 分组与聚合',
  'software-testing-foundations': '软件测试与质量',
  'pytorch-sdpa-attention-practice': 'PyTorch 注意力接口',
  'electra-pretraining-foundations': 'ELECTRA 预训练',
  'codeact-agent-framework': 'CodeAct 智能体',
  'm3-tooleval-agent-benchmark': 'M3 ToolEval 评测',
  'mint-multiturn-agent-evaluation': 'MINT 多轮评测',
  'phishpedia-visual-identification': 'Phishpedia 视觉识别',
  'linevul-function-line-evaluation': 'LineVul 行级定位',
  'zeek-tls-telemetry-fields': 'Zeek TLS 遥测字段',
  'omnianomaly-model-evaluation': 'OmniAnomaly 异常检测',
  'libfuzzer-corpus-management': 'libFuzzer 语料管理',
  'package-url-vulnerability-identity': 'Package-URL 软件包标识',
  'kusto-security-event-joins': 'Kusto 安全事件关联',
  'point-adjust-anomaly-evaluation': '时序异常点调整评估',
  'jensen-shannon-distance': 'Jensen-Shannon 分布距离',
  'pytorch-func-differentiation': 'PyTorch 函数微分',
  'sklearn-column-transformer-practice': '表格特征列变换',
  'cross-encoder-reranking-practice': 'CrossEncoder 重排实践',
  'gymnasium-episode-boundaries': 'Gymnasium 环境交互',
  'whisper-speech-training-inference': 'Whisper 语音识别实践',
  'network-address-translation': 'NAT 与端口映射',
  'http-proxy-gateway-fundamentals': 'HTTP 代理与网关',
  'linux-strace-lsof-troubleshooting': 'Linux 进程与文件排障',
  'linux-disk-mount-diagnostics': 'Linux 磁盘与挂载排查',
  'monotonic-stack-window-algorithms': '单调栈与滑动窗口',
  'postgresql-subquery-interview': 'SQL 子查询与存在性判断',
  'scipy-bootstrap-intervals': 'Bootstrap 置信区间',
  'hf-datasets-transform-practice': 'Hugging Face 数据集处理',
  'sklearn-learning-curves': '学习曲线与模型诊断',
  'captum-integrated-gradients': '积分梯度模型解释',
  'langchain-self-query-retrieval': 'LangChain 自查询检索',
  'suricata-flow-state-rules': 'Suricata 流状态关联',
  'libfuzzer-dictionary-feedback': 'libFuzzer 字典与执行反馈',
  'unigram-subword-segmentation': 'Unigram 子词分词',
  'memgpt-context-management': 'MemGPT 上下文与记忆',
  'tldextract-public-suffix-analysis': '公共后缀与网址特征',
  'llmseceval-secure-code-benchmark': 'LLMSecEval 安全代码评测',
  'capec-attack-pattern-schema': 'CAPEC 攻击模式结构',
  'prometheus-promql-monitoring': 'PromQL 服务与模型监控',
  'scipy-spearman-115': 'SciPy 1.15.3 秩相关',
  'scipy-ks2-115': 'SciPy 1.15.3 双样本 KS',
  'windows-4768': 'Windows 4768 审核事件',
  'windows-4769': 'Windows 4769 审核事件',
  'windows-4771': 'Windows 4771 审核事件',
  'pddl-domain-ref': 'PDDL 领域定义',
  'mysql-range-optimization-84': 'MySQL 8.4 范围优化',
  'linux-waitpid-man': 'Linux waitpid 手册',
  'bash-job-control-man': 'Bash 作业控制手册',
  'ip-address-man': 'Linux ip-address 手册',
  'udp-rfc768': 'UDP 标准',
  'linux-less-man': 'Linux less 手册',
  'linux-top-man': 'Linux top 手册',
  'gnu-head': 'GNU head 手册',
  'gnu-du': 'GNU du 手册',
  'fncbook-qr': '数值计算 QR 分解',
  'pytorch-save-checkpoint': 'PyTorch 训练检查点',
  'sklearn-naive-bayes-source-172': 'scikit-learn 朴素贝叶斯源码',
  'attack-v20-ntds': 'ATT&CK NTDS',
  'attack-v20-encrypt-impact': 'ATT&CK 数据加密影响',
  'langchain-core-json-parser-184': 'LangChain JSON 解析源码',
  'nab-readme-fixed': 'NAB 基准说明',
  'gymnasium-handling-time-limits': 'Gymnasium 终止与截断',
  'numpy-20-release': 'NumPy 2.0 发布说明',
  'graphrag-global-v33': 'GraphRAG 全局检索',
  'sklearn-recall-17': 'scikit-learn 召回率',
  'sklearn-scoring-17': 'scikit-learn 评分参数',
  'sklearn-groupkfold-17': 'scikit-learn 分组交叉验证',
  'pytorch-source-27': 'PyTorch 2.7 源码',
  'glove-wordvec-ref': 'GloVe 论文',
  'sklearn-common-apis': 'scikit-learn 常用接口',
  'python-ranges-ref': 'Python range 文档',
  'security-eval-paper': '安全模型评估论文',
  'binomial-confidence-ref': '二项比例置信区间',
  'dns-observation-fundamentals': 'DNS 解析与观测',
  'fuzz-coverage-and-oracles': '模糊测试反馈与判定',
  'agent-search-strategies': 'Agent 推理与搜索',
  'statistics-resampling-inference': '重采样与统计推断',
  'gradient-boosting-foundations': '梯度提升与树模型',
  'retrieval-query-embeddings': '检索查询与多向量表示',
  'agent-coordination-search': '智能体协调与搜索',
  'svm-principles': '支持向量机',
  'vision-detector-architectures': '目标检测架构',
  'python-concurrency-fundamentals': 'Python 并发',
  'cv-comparison-ref': '数据集评估依据',
  'ml-experiment-ref': '实验复现依据',
  'generation-variance-ref': '生成配置依据',
  'diversevul-shortcut-ref': '漏洞模型鲁棒性资料',
  'llm4vuln-context-review': '漏洞推理上下文',
  'truncation-review': '文本截断',
  'agent-skills-ref': 'Agent Skills',
  'graph-knowledge-ref': '知识图谱',
  'langsmith-evals-ref': 'Agent 评测',
  'github-reviews-ref': '代码审批',
  'windows-sysmon': 'Sysmon',
  'security-metrics': '分类评估',
  'malware-yara': 'YARA',
  'cwe-fundamentals': 'CWE 漏洞',
  'dga-communications': 'DGA 与 DNS',
  'elf-malware': 'ELF 格式',
  'malware-analysis-limits': '恶意软件分析',
  'ir-evaluation': '检索评估',
  'sigma-detection': 'Sigma 规则',
  'windows-audit': 'Windows 审核',
  'windows-audit-4625': 'Windows 登录失败',
  'incident-forensics': '事件取证',
  'ml-observability': '模型与服务监控',
  'company-rag-interviews': '大厂面经与 RAG',
  'ragas-faithfulness': 'RAG 忠实度',
  'langsmith-rag-eval': 'RAG 评测',
  'rag-review-doc': 'RAG 复核依据',
  'sklearn-supervised': '监督学习',
  'fuzzing-engine': 'Fuzz 测试工程',
  'stix-object-semantics': 'STIX 对象',
  'semgrep-taint': 'Semgrep 污点分析',
  'auth-attacks': '身份攻击',
  'mitre-spray-ref': 'ATT&CK 密码喷洒',
  'nist-ids-basics': '入侵检测基础',
  'company-python-interviews': 'Python 面经',
  'python-interview-doc': 'Python 官方文档',
  'transformer-details': 'Transformer 结构',
  'llm-memory': '大模型推理内存',
  'email-authentication': '邮件认证',
  'pe-import-analysis': 'PE 导入与导出',
  'phishing-behavior': '钓鱼行为',
  'company-llm-preference': '大模型面经',
  'company-transformer-positions': 'Transformer 面经',
  'information-theory': '信息论与统计',
  'training-optimization': '训练优化',
  'company-grpo': 'GRPO 面经',
  'faiss-retrieval': 'Faiss 索引',
  'agent-reliability': 'Agent 容错',
  'network-protocol-logs': '网络协议日志',
  'threat-behavior': '威胁行为',
  'web-vulnerability-analysis': 'Web 漏洞审计',
  'security-evaluation-practice': '安全评估实践',
  'company-distributed-training': '分布式训练面经',
  'virustotal-analysis': 'VirusTotal 分析',
  'phishing-url-parsing': '网址与域名解析',
  'stix-analysis-objects': 'STIX 情报对象',
  'cvss-v31': 'CVSS v3.1',
  'vision-language-basics': '图文与视觉模型',
  'vision-evaluation': '目标检测评估',
  'document-understanding': 'OCR 与文档理解',
  'speech-audio-basics': '语音与音频',
  'company-memory-interviews': '模型训练面经',
  'company-training-reference': '模型训练资料',
  'vision-instance-ref': '实例分割',
  'urlnet-paper-ref': 'URLNet 论文',
  'mitre-attack-faq-ref': 'ATT&CK FAQ',
  'agent-design-patterns': 'Agent 协作模式',
  'code-lifetime-credentials': '资源与凭据安全',
  'password-storage-review': '密码存储',
  'codeql-python-models': 'CodeQL 库建模',
  'llm-vulnerability-evaluation': '漏洞模型评估',
  'incident-prioritization': '事件优先级',
  'tensor-memory-layout': '张量内存布局',
  'company-attention-interviews': '大模型注意力面经',
  'llm4vuln-paper-ref': 'LLM4Vuln 论文',
  'interview-paper-ref': '面经论文依据',
  'company-vision-interviews': '视觉算法面经',
  'company-finetuning-interviews': '微调面经',
  'company-security-detection': '安全检测面经',
  'company-security-operations': '告警研判面经',
  'company-security-code': '代码安全面经',
  'company-distributed-ml': '分布式与蒸馏面经',
  'company-optimization': '优化器面经',
  'phishing-visual': '视觉钓鱼识别',
  'virustotal-url-context': 'VirusTotal 网址分析',
  'malware-temporal-evaluation': '恶意软件时间评估',
  'bodmas-benchmark': 'BODMAS 数据集',
  'primevul-evaluation': 'PrimeVul 评估',
  'incident-evidence-workflow': '事件证据与恢复',
  'codeql-control-flow': 'CodeQL 控制流',
  'semgrep-patterns': 'Semgrep 规则',
  'fuzz-sanitizers': '模糊测试与 Sanitizer',
  'sigma-rule-authoring': 'Sigma 规则编写',
  'vulnerability-intelligence': '漏洞情报与 EPSS',
  'incident-recovery-details': '事件恢复与记录',
  'libfuzzer-review-ref': 'libFuzzer 复核资料',
  'ossfuzz-eval-ref': 'OSS-Fuzz-gen 错误分类',
  'ossfuzz-reproduce-ref': 'OSS-Fuzz 问题复现',
  'clusterfuzz-glossary-ref': 'ClusterFuzz 术语',
  'vulndata-review-ref': '漏洞数据评估资料',
  'math-linear-properties': '线性代数性质',
  'math-statistical-inference': '概率与统计推断',
  'nlp-sequence-bert': '文本标注与 BERT',
  'agent-a2a-design': 'A2A 智能体协作',
  'a2a-task-lifecycle': 'A2A 任务状态',
  'agent-evaluation-methods': 'Agent 评估方法',
  'ml-baseline-ref': '模型基线资料',
  'ml-monitor-ref': '模型监控资料',
  'vision-paper-ref': '视觉模型资料',
  'anomaly-detection-models': '异常检测模型',
  'ids-protocol-analysis': '入侵检测方法',
  'anomaly-review-ref': '异常检测复核资料',
  'zeek-review-ref': 'Zeek 特征复核资料',
  'lexical-retrieval': '关键词检索',
  'retrieval-context-preparation': '检索内容准备',
  'faiss-index-maintenance': 'Faiss 索引维护',
  'rag-context-ref': 'RAG 复核资料',
  'evaluation-review-ref': '安全评估复核资料',
  'training-paper-ref': '分布式训练资料',
  'http-user-agent-ref': 'HTTP 标准',
  'tls-ech-ref': 'TLS ECH 标准',
  'suricata-rule-ref': 'Suricata 规则文档',
  'nist-ids-review': 'NIST 入侵检测',
  'zeek-time-ref': 'Zeek 字段文档',
  'technical-ref': '面经技术依据',
  'llm-paper-ref': '大模型论文',
  'sft-reference': '监督微调文档',
  'cwe-read-ref': 'CWE 越界读取',
  custom: '个人自建',
};

export function LibraryScreen({ data, now, category, onCategory, topic, onTopic, sourceId, onSource, query, onQuery, studySet, onStudySet, level, onLevel, onSettings, onAdd, onEdit, onDelete, onStudy }: {
  data: StudyData;
  now: number;
  category?: CategoryId;
  onCategory: (category?: CategoryId) => void;
  topic?: TopicId;
  onTopic: (topic?: TopicId) => void;
  sourceId?: string;
  onSource: (sourceId?: string) => void;
  query: string;
  onQuery: (query: string) => void;
  studySet: NonNullable<StudyScope['studySet']>;
  onStudySet: (studySet: NonNullable<StudyScope['studySet']>) => void;
  level?: StudyLevel;
  onLevel: (level?: StudyLevel) => void;
  onSettings: () => void;
  onAdd: () => void;
  onEdit: (card: StudyCard) => void;
  onDelete: (id: string) => void;
  onStudy: (scope: StudyScope) => void;
}) {
  const [deleteTarget, setDeleteTarget] = useState<StudyCard | null>(null);
  const scope: StudyScope = { category, topic, sourceId, query, studySet, level };
  const cards = data.cards.filter((card) => matchesScope(card, scope));
  const queue = getStudyQueue(data, now, undefined, scope);
  const filtered = Boolean(category || topic || sourceId || query.trim() || studySet !== 'regular' || level);
  const levelDisabled = Boolean(level && !enabledStudyLevels(data.settings).includes(level));
  const availableTopics = Array.from(new Map(
    topics.filter((item) => !category || item.category === category).map((item) => [item.id, item])
  ).values());
  const allSourceIds = Array.from(new Set(data.cards.flatMap((card) => card.sources?.length
    ? card.sources.map((source) => source.id)
    : ['custom'])));
  const interviewCompanyIds = Array.from(new Set(data.cards.flatMap((card) =>
    (card.sources ?? [])
      .filter((source) => source.id.startsWith('company-') && source.type.includes('公开面经'))
      .map((source) => source.id)
  )));
  const companyPriority = [
    'company-bytedance', 'company-alibaba', 'company-tencent', 'company-baidu',
    'company-ant', 'company-huawei', 'company-meituan', 'company-jd',
    'company-kuaishou', 'company-xiaomi',
  ];
  interviewCompanyIds.sort((left, right) => {
    const leftIndex = companyPriority.indexOf(left);
    const rightIndex = companyPriority.indexOf(right);
    return (leftIndex < 0 ? companyPriority.length : leftIndex) -
      (rightIndex < 0 ? companyPriority.length : rightIndex);
  });
  const companies = new Set(interviewCompanyIds);
  const sourceIds = [...interviewCompanyIds, ...allSourceIds.filter((id) => !companies.has(id))];
  if (data.cards.some((card) => matchesScope(card, { sourceId: publicInterviewScope }))) {
    sourceIds.unshift(publicInterviewScope);
  }

  const header = (
    <>
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>知识收藏</Text>
          <Text style={styles.title}>AI4SEC 题库</Text>
          <Text style={styles.subtitle}>按方向、主题或来源找到需要的知识。</Text>
        </View>
        <IconButton icon="add" label="添加卡片" onPress={onAdd} light />
      </View>
      <View style={styles.search}>
        <Ionicons name="search-outline" size={19} color={colors.muted} />
        <TextInput
          accessibilityLabel="搜索卡片"
          placeholder="搜索问题、解析、标签或来源"
          placeholderTextColor={colors.muted}
          value={query}
          onChangeText={onQuery}
          style={styles.searchInput}
          returnKeyType="search"
        />
        {query.length > 0 && (
          <Pressable onPress={() => onQuery('')} accessibilityRole="button" accessibilityLabel="清除搜索">
            <Ionicons name="close-circle" size={19} color={colors.muted} />
          </Pressable>
        )}
      </View>
      <Text style={styles.filterHeading}>学习范围</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
        {([
          ['regular', '常规学习'],
          ['research', '研究拓展'],
          ['all', '全部卡片'],
        ] as const).map(([value, label]) => (
          <Pressable key={value} accessibilityRole="button" accessibilityLabel={`学习范围：${label}`}
            accessibilityState={{ selected: studySet === value }} onPress={() => onStudySet(value)}
            style={[styles.filter, studySet === value && styles.filterSelected]}>
            <Text style={[styles.filterText, studySet === value && styles.filterTextSelected]}>{label}</Text>
          </Pressable>
        ))}
      </ScrollView>
      <Text style={styles.filterHeading}>学习阶段</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
        <Pressable accessibilityRole="button" accessibilityLabel="全部学习阶段" accessibilityState={{ selected: !level }} onPress={() => onLevel(undefined)}
          style={[styles.filter, !level && styles.filterSelected]}>
          <Text style={[styles.filterText, !level && styles.filterTextSelected]}>全部</Text>
        </Pressable>
        {studyLevels.map((item) => (
          <Pressable key={item.id} accessibilityRole="button" accessibilityLabel={`学习阶段：${item.label}`}
            accessibilityState={{ selected: level === item.id }} onPress={() => onLevel(item.id)}
            style={[styles.filter, level === item.id && styles.filterSelected]}>
            <Text style={[styles.filterText, level === item.id && styles.filterTextSelected]}>{item.label}</Text>
          </Pressable>
        ))}
      </ScrollView>
      {levelDisabled && (
        <Pressable accessibilityRole="button" accessibilityLabel="前往设置开启学习阶段" onPress={onSettings}>
          <Text style={styles.levelDisabledHint}>该阶段尚未开启，前往学习设置</Text>
        </Pressable>
      )}
      <Text style={styles.filterHeading}>方向</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
        <Pressable accessibilityRole="button" accessibilityLabel="全部方向" onPress={() => onCategory(undefined)} style={[styles.filter, !category && styles.filterSelected]}>
          <Text style={[styles.filterText, !category && styles.filterTextSelected]}>全部</Text>
        </Pressable>
        {categories.map((item) => (
          <Pressable key={item.id} accessibilityRole="button" accessibilityLabel={`方向：${item.label}`} onPress={() => onCategory(item.id)} style={[styles.filter, category === item.id && styles.filterSelected]}>
            <Text style={[styles.filterText, category === item.id && styles.filterTextSelected]}>{item.label}</Text>
          </Pressable>
        ))}
      </ScrollView>
      <Text style={styles.filterHeading}>主题</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
        <Pressable accessibilityRole="button" accessibilityLabel="全部主题" onPress={() => onTopic(undefined)} style={[styles.filter, !topic && styles.filterSelected]}>
          <Text style={[styles.filterText, !topic && styles.filterTextSelected]}>全部</Text>
        </Pressable>
        {availableTopics.map((item) => (
          <Pressable key={item.id} accessibilityRole="button" accessibilityLabel={`主题：${item.label}`} onPress={() => onTopic(item.id)} style={[styles.filter, topic === item.id && styles.filterSelected]}>
            <Text style={[styles.filterText, topic === item.id && styles.filterTextSelected]}>{item.label}</Text>
          </Pressable>
        ))}
      </ScrollView>
      <Text style={styles.filterHeading}>来源</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
        <Pressable accessibilityRole="button" accessibilityLabel="全部来源" onPress={() => onSource(undefined)} style={[styles.filter, !sourceId && styles.filterSelected]}>
          <Text style={[styles.filterText, !sourceId && styles.filterTextSelected]}>全部</Text>
        </Pressable>
        {sourceIds.map((id) => (
          <Pressable key={id} accessibilityRole="button" accessibilityLabel={`来源：${shortSourceNames[id] ?? id}`} onPress={() => onSource(id)} style={[styles.filter, sourceId === id && styles.filterSelected]}>
            <Text style={[styles.filterText, sourceId === id && styles.filterTextSelected]}>{shortSourceNames[id] ?? id}</Text>
          </Pressable>
        ))}
      </ScrollView>
      {filtered && (
        <View style={styles.categoryBanner}>
          <View style={styles.categoryBannerText}>
            <Text style={styles.categoryBannerTitle}>当前筛选</Text>
            <Text style={styles.categoryBannerSub}>{cards.length} 张卡片 · {queue.length} 张待学习</Text>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="学习筛选结果"
            disabled={queue.length === 0}
            onPress={() => onStudy(scope)}
            style={[styles.smallButton, queue.length === 0 && { opacity: 0.4 }]}
          >
            <Text style={styles.smallButtonText}>开始学习</Text>
            <Ionicons name="arrow-forward" size={14} color="#FFFFFF" />
          </Pressable>
        </View>
      )}
      <View style={styles.listHeading}>
        <Text style={styles.listTitle}>{filtered ? '筛选结果' : '常规学习'}</Text>
        <Text style={styles.listCount}>{cards.length} 张</Text>
      </View>
    </>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cards}
        keyExtractor={(card) => card.id}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        initialNumToRender={10}
        windowSize={7}
        ListHeaderComponent={header}
        ListEmptyComponent={(
          <View style={styles.empty}>
            <Ionicons name="albums-outline" size={30} color="#B4C3B8" />
            <Text style={styles.emptyTitle}>这里还没有卡片</Text>
            <Text style={styles.emptyText}>{filtered ? '试试调整筛选或关键词' : '添加一张属于你的知识卡片'}</Text>
          </View>
        )}
        renderItem={({ item: card }) => {
          const cardCategory = getCategory(card.category);
          const progress = data.progress[card.id];
          const status = !progress ? '未学习' : progress.dueAt <= now ? '待复习' : `${formatInterval(progress.dueAt - now)}后复习`;
          return (
            <View style={styles.card}>
              <View style={styles.cardTop}>
                <View style={[styles.cardTag, { backgroundColor: cardCategory.background }]}>
                  <Text style={[styles.cardTagText, { color: cardCategory.color }]}>{topicLabel(card.topic)}</Text>
                </View>
                <Text style={styles.cardStatus}>{status}</Text>
              </View>
              <Text style={styles.question}>{card.question}</Text>
              <Text style={styles.answer} numberOfLines={2}>{card.answer}</Text>
              <Text style={styles.metadata} numberOfLines={1}>
                {[studyLevelLabel(cardLevel(card)), ...(card.tags ?? []).slice(0, 3)].join(' · ')}
              </Text>
              <View style={styles.cardActions}>
                <Pressable onPress={() => onEdit(card)} accessibilityRole="button" accessibilityLabel={`编辑卡片：${card.question}`} style={styles.textAction}>
                  <Ionicons name="create-outline" size={16} color={colors.brand} />
                  <Text style={styles.editText}>编辑</Text>
                </Pressable>
                <Pressable onPress={() => setDeleteTarget(card)} accessibilityRole="button" accessibilityLabel={`删除卡片：${card.question}`} style={styles.textAction}>
                  <Ionicons name="trash-outline" size={16} color={colors.muted} />
                  <Text style={styles.deleteText}>删除</Text>
                </Pressable>
              </View>
            </View>
          );
        }}
      />
      <Modal visible={deleteTarget !== null} transparent animationType="fade" onRequestClose={() => setDeleteTarget(null)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>删除这张卡片？</Text>
            <Text style={styles.modalText}>卡片和它的复习进度会被删除，历史学习次数会保留。</Text>
            <View style={styles.modalActions}>
              <View style={styles.modalAction}><ActionButton label="取消" secondary onPress={() => setDeleteTarget(null)} /></View>
              <View style={styles.modalAction}><ActionButton label="确认删除" onPress={() => {
                if (deleteTarget) onDelete(deleteTarget.id);
                setDeleteTarget(null);
              }} /></View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: 22, paddingTop: 30, paddingBottom: 34 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  eyebrow: { color: colors.brand, fontSize: 10, fontWeight: '800', letterSpacing: 1.5, marginBottom: 9 },
  title: { color: colors.ink, fontSize: 27, fontWeight: '800' },
  subtitle: { color: colors.secondary, fontSize: 13, marginTop: 8 },
  search: { marginTop: 23, flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 15, paddingHorizontal: 14, minHeight: 50 },
  searchInput: { flex: 1, color: colors.ink, fontSize: 13, paddingVertical: 12 },
  filterHeading: { color: colors.secondary, fontSize: 11, fontWeight: '700', marginTop: 16 },
  levelDisabledHint: { color: colors.brand, fontSize: 11, marginTop: 10 },
  filters: { flexDirection: 'row', gap: 8, paddingTop: 8 },
  filter: { borderRadius: 12, backgroundColor: '#EBF0EA', paddingHorizontal: 13, paddingVertical: 9 },
  filterSelected: { backgroundColor: colors.brandDark },
  filterText: { color: colors.secondary, fontSize: 12, fontWeight: '700' },
  filterTextSelected: { color: '#FFFFFF' },
  categoryBanner: { backgroundColor: colors.brandLight, borderRadius: 18, padding: 16, flexDirection: 'row', alignItems: 'center', marginTop: 18 },
  categoryBannerText: { flex: 1 },
  categoryBannerTitle: { color: colors.brandDark, fontSize: 14, fontWeight: '800' },
  categoryBannerSub: { color: colors.brand, fontSize: 11, marginTop: 5 },
  smallButton: { backgroundColor: colors.brand, borderRadius: 12, flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 10 },
  smallButtonText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
  listHeading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, marginBottom: 12 },
  listTitle: { color: colors.ink, fontSize: 15, fontWeight: '800' },
  listCount: { color: colors.muted, fontSize: 12 },
  card: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 19, padding: 16, marginBottom: 10 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  cardTag: { borderRadius: 8, paddingHorizontal: 9, paddingVertical: 5 },
  cardTagText: { fontSize: 10, fontWeight: '700' },
  cardStatus: { color: colors.muted, fontSize: 10 },
  question: { color: colors.ink, fontSize: 14, fontWeight: '800', lineHeight: 22 },
  answer: { color: colors.secondary, fontSize: 12, lineHeight: 20, marginTop: 7 },
  metadata: { color: colors.muted, fontSize: 10, lineHeight: 17, marginTop: 8 },
  cardActions: { flexDirection: 'row', gap: 22, marginTop: 14 },
  textAction: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  editText: { color: colors.brand, fontSize: 11, fontWeight: '700' },
  deleteText: { color: colors.muted, fontSize: 11 },
  empty: { alignItems: 'center', paddingVertical: 60 },
  emptyTitle: { color: colors.ink, fontSize: 14, fontWeight: '700', marginTop: 12 },
  emptyText: { color: colors.muted, fontSize: 12, marginTop: 6 },
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(19, 32, 27, 0.45)', justifyContent: 'center', padding: 26 },
  modal: { backgroundColor: '#FFFFFF', borderRadius: 24, padding: 22 },
  modalTitle: { fontSize: 18, fontWeight: '800', color: colors.ink },
  modalText: { fontSize: 13, lineHeight: 22, color: colors.secondary, marginTop: 10 },
  modalActions: { flexDirection: 'row', gap: 10, marginTop: 22 },
  modalAction: { flex: 1 },
});
