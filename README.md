# 知序 AI4SEC

知序是一款面向 AI4SEC 学习的离线安卓卡片应用，题库也包含可独立学习的通用 AI 和计算机基础。当前内置 10021 张标准化卡片，其中 9678 张纳入常规学习、343 张作为可选的研究拓展；计算机基础与系统方向共 3601 张。应用支持按学习范围、方向、主题、来源和关键词查找，也可以自建和编辑卡片；333 张带公开面经来源的卡片可按公司或汇总筛选。题目是否适合面试仍会持续复核，审计方法和局限见[题库审计记录](question-banks/面试适用性审计.md)。

## 功能

- 到期卡片优先复习；每日新卡默认上限为 500 张，可直接输入 0～5000。
- 根据「忘记、模糊、记得、简单」调整短期巩固和长期复习间隔。
- 卡片分为「基础」「进阶」「实践」阶段；在首页「学习设置」中可自由开启或关闭各阶段，默认全部开启。关闭阶段会暂停其中的新题和到期复习，重新开启后保留原有进度。
- 题库可按学习范围、阶段、方向、主题和来源筛选；未开启的阶段仍可浏览，自建或编辑卡片时可以修改阶段。研究拓展与阶段独立选择。
- 合并同一知识点时保留相关问法、例子和来源；Anki 导出带有阶段标签。
- 展示学习进度、连续学习天数，并支持添加、编辑和删除卡片。
- 学习数据保存在设备本地，升级时保留已有进度和自定义卡片。

已按核心概念、机制边界和实际应用场景复核全库 10021 张卡片的学习阶段，并调整其中 397 张；当前基础 2381 张、进阶 7194 张、实践 446 张。难度是相对判断，详情见题库批次进展。

## 学习入口

- 通用计算机基础扩展：[470 条来源题](question-banks/computer-science-general-expansion/cards.json)，覆盖计算理论、类型系统、PKI、Java 运行时、云存储与函数、CRDT、OCI、软件测试和领域驱动设计；合并后的主卡已登记内容复核。
- 本批新增数学基础题：[矩阵微分与导数公式](question-banks/matrix-calculus-foundations/cards.json)，涵盖迹、二次型、矩阵逆、最小二乘和 log-det 梯度。
- 此前新增通用计算机题：[数据库并发控制](question-banks/database-concurrency-control/cards.json)，涵盖锁协议、死锁、多粒度锁、时间戳排序、乐观验证和多版本读取。
- 此前新增：[编译器前端、IR 与优化](question-banks/compiler-fundamentals/cards.json)。
- 第一百八十七批新增：[C11 语言语义与常用标准库](question-banks/c11-language-semantics/cards.json)。
- 第一百八十二批新增：[PEGASUS 摘要预训练](question-banks/pegasus-gap-sentences/cards.json)、[XLM-R 跨语言表示](question-banks/xlmr-crosslingual-representation/cards.json)、[Vul-RAG 漏洞知识](question-banks/vulrag-knowledge-vulnerability/cards.json)、[CodeQL 路径查询](question-banks/codeql-path-query-evidence/cards.json)、[DeepDGA 对抗域名检测](question-banks/deepdga-adversarial-detection/cards.json)、[YARA Base64 与 XOR](question-banks/yara-base64-string-modifiers/cards.json)、[PSI 分布监测](question-banks/population-stability-index-monitoring/cards.json)、[Java 线程池](question-banks/java-threadpool-foundations/cards.json)、[PostgreSQL 部分索引](question-banks/postgresql-partial-index-foundations/cards.json)、[TCP 拥塞控制](question-banks/tcp-congestion-control-rfc5681/cards.json)和 [Linux waitpid](question-banks/linux-waitpid-selection/cards.json)。

- 第一百八十一批新增：[最大似然估计](question-banks/maximum-likelihood-foundations/cards.json)、[样本均值与极限定理](question-banks/sample-mean-limit-theorems/cards.json)、[Graphplan 规划图](question-banks/graphplan-planning-graphs/cards.json)、[Zeek DNS 字段](question-banks/zeek-dns-transaction-fields/cards.json)、[Windows 4688](question-banks/windows-4688-process-audit/cards.json)、[TRAM 威胁报告映射](question-banks/mitre-tram-attack-mapping/cards.json)、[CALDERA 安全模拟](question-banks/caldera-emulation-fundamentals/cards.json)、[蜜罐与威胁观测](question-banks/nist-honeypot-detection/cards.json)和 [AFLNet 协议模糊测试](question-banks/aflnet-protocol-state-fuzzing/cards.json)。

- 此前新增：[Qdrant 向量检索](question-banks/qdrant-client-retrieval-practice/cards.json)、[CBPE 无标签性能估计](question-banks/cbpe-unlabeled-performance/cards.json)、[G-Eval 模型评审](question-banks/geval-llm-evaluation/cards.json)、[ALCE 引用评估](question-banks/alce-citation-evaluation/cards.json)、[ARES RAG 评估](question-banks/ares-rag-evaluation/cards.json)、[DINOv2 视觉自监督](question-banks/dinov2-visual-self-supervision/cards.json)和 [ISCXVPN2016 流量数据](question-banks/iscxvpn2016-traffic-dataset/cards.json)。

- 此前新增：[最长公共子序列](question-banks/lcs-dynamic-programming/cards.json)、[最小生成树](question-banks/mst-graph-fundamentals/cards.json)、[Linux 时钟与耗时](question-banks/linux-clock-measurement/cards.json)、[Python mock 测试替身](question-banks/python-unittest-mock-practice/cards.json)和 [PostgreSQL 保存点与恢复](question-banks/postgresql-savepoint-recovery/cards.json)。

- 此前新增：[Python heapq 优先队列](question-banks/python-heapq-practice/cards.json)、[Python 线程同步](question-banks/python-threading-sync-practice/cards.json)、[Cohen 标注一致性](question-banks/sklearn-cohen-kappa-practice/cards.json)、[Go 原生模糊测试](question-banks/go-native-fuzzing-practice/cards.json)、[ELF 命令行检查](question-banks/gnu-elf-inspection-practice/cards.json)和 [Ghidra 静态分析](question-banks/ghidra-reverse-engineering-basics/cards.json)。

- 此前新增：[LangGraph 工具节点](question-banks/langgraph-toolnode-practice/cards.json)、[PyOD KNN 异常检测](question-banks/pyod-knn-anomaly-practice/cards.json)、[Wazuh 规则关联](question-banks/wazuh-rule-correlation-practice/cards.json)、[证书透明度 v1](question-banks/certificate-transparency-v1/cards.json)、[正例与未标注样本学习](question-banks/positive-unlabeled-learning/cards.json)和 [Brier 分数接口](question-banks/sklearn-brier-score-practice/cards.json)。

- 此前新增通用计算机题：[APT 与 dpkg 软件包管理](question-banks/debian-apt-dpkg-practice/cards.json)、[SSH 密钥与代理](question-banks/openssh-key-agent-practice/cards.json)、[Linux 进程查询](question-banks/linux-process-query-practice/cards.json)和 [CMake 配置与构建](question-banks/cmake-build-foundations/cards.json)。

- 此前新增：[智能体博弈搜索](question-banks/agent-adversarial-game-search/cards.json)、[Sarsa 与双重 Q 学习](question-banks/sarsa-expected-double-q/cards.json)、[部分依赖与个体效应](question-banks/sklearn-pdp-ice-inspection/cards.json)、[τ²-bench 双控制评测](question-banks/tau2-dual-control-evaluation/cards.json)、[CERT 合成内部威胁数据](question-banks/cert-synthetic-insider-dataset/cards.json)和[FuzzGPT 历史缺陷引导](question-banks/fuzzgpt-history-guided-generation/cards.json)。Sarsa 比较题关联百度公开面经的强化学习主题，明确标为主题延伸。

- 此前新增：[Transformers 分词批次](question-banks/transformers-tokenizer-batching/cards.json)、[Trainer 评估与保存](question-banks/transformers-trainer-evaluation/cards.json)、[PyTorch 嵌入与相似度](question-banks/pytorch-embedding-cosine-contracts/cards.json)、[Matryoshka 可变维度表示](question-banks/matryoshka-variable-embeddings/cards.json)、[rsLoRA 秩稳定性](question-banks/rslora-rank-stability/cards.json)、[MalNet 图数据集](question-banks/malnet-function-call-graphs/cards.json)和[VirusTotal 文件行为](question-banks/virustotal-file-behaviour-fields/cards.json)。

- 此前新增通用计算机题：[Git 忽略规则](question-banks/git-ignore-patterns-practice/cards.json)、[SCP／SFTP 文件传输](question-banks/openssh-scp-sftp-practice/cards.json)、[gRPC 服务调用](question-banks/grpc-service-fundamentals/cards.json)、[PostgreSQL 时间与时区](question-banks/postgresql-datetime-timezone/cards.json)、[数据库连接池](question-banks/sqlalchemy-connection-pool/cards.json)和[哈希表冲突处理](question-banks/hash-table-collision-practice/cards.json)。

- 此前新增：[Pandas 字符串处理](question-banks/pandas-string-extraction-practice/cards.json)、[Agent 时间抽象与技能](question-banks/option-critic-temporal-abstraction/cards.json)、[Gorilla 工具调用](question-banks/gorilla-api-retrieval-agent/cards.json)、[分布外能量评分](question-banks/energy-ood-detection-evaluation/cards.json)、[VulRepair 数据质量](question-banks/vulrepair-data-quality-study/cards.json)、[AFL++ 自定义变异器](question-banks/afl-custom-mutator-lifecycle/cards.json)、[TAXII 集合获取](question-banks/taxii-collection-pagination/cards.json)和 [Linux ACL](question-banks/linux-acl-permission-practice/cards.json)。Gorilla 面经相关卡标为主题延伸。

- 此前新增：[Python CSV 字典读写](question-banks/python-csv-dictionary-practice/cards.json)、[NumPy 随机抽样](question-banks/numpy-generator-choice-practice/cards.json)、[稳健离散程度](question-banks/scipy-robust-dispersion-practice/cards.json)、[时序峰值检测](question-banks/scipy-signal-peak-detection/cards.json)、[Pillow 图像预处理](question-banks/pillow-image-preprocessing/cards.json)、[Syslog 安全日志](question-banks/rfc5424-syslog-telemetry/cards.json)、[ToolEmu 风险评估](question-banks/toolemu-agent-risk-evaluation/cards.json)和 [SSVC 漏洞处置](question-banks/cisa-ssvc-vulnerability-triage/cards.json)。

- 此前新增通用计算机题：[dig DNS 查询](question-banks/dns-dig-query-practice/cards.json)、[整数位运算](question-banks/bitwise-interview-fundamentals/cards.json)、[GNU timeout](question-banks/gnu-timeout-command-practice/cards.json)、[Bash 错误处理](question-banks/bash-errexit-nounset-practice/cards.json)和 [OpenSSL TLS 诊断](question-banks/openssl-s-client-tls-diagnostics/cards.json)。还补充时间序列切分、Python 摘要、AgentBoard、DDPM 和安全数据等题目。

- 此前新增：[LogSumExp 数值计算](question-banks/scipy-logsumexp-softmax/cards.json)、[PyTorch 二维池化](question-banks/pytorch-maxpool2d-practice/cards.json)、[语言模型批次整理](question-banks/transformers-language-model-collation/cards.json)、[LangChain 嵌入缓存](question-banks/langchain-embedding-cache/cards.json)、[SimCLR](question-banks/simclr-visual-contrastive/cards.json)、[Deep SAD](question-banks/deep-sad-semisupervised-anomaly/cards.json)、[Linux 文件锁](question-banks/linux-flock-file-locking/cards.json)、[HTTP HSTS](question-banks/http-hsts-protocol/cards.json)和 [Python 测试覆盖率](question-banks/coverage-py-branch-analysis/cards.json)。SimCLR 面经相关卡标为主题延伸。

- 此前新增：[Linux 文件事件](question-banks/linux-inotify-file-events/cards.json)、[psql 命令行](question-banks/postgresql-psql-cli-practice/cards.json)、[Python 虚拟环境与 pip](question-banks/python-venv-pip-practice/cards.json)、[Python JSON](question-banks/python-json-serialization/cards.json)、[Pandas 合并键](question-banks/pandas-merge-key-practice/cards.json)、[Pydantic 校验](question-banks/pydantic-v2-validation/cards.json)、[聚类评估](question-banks/sklearn-clustering-evaluation/cards.json)、[LoRA-FA](question-banks/lora-fa-fixed-matrix/cards.json)和 [CICIoT2023](question-banks/ciciot2023-security-dataset/cards.json)。LoRA-FA 面经相关卡标为主题延伸。

- 此前新增：[Python Requests 请求](question-banks/python-requests-http-practice/cards.json)、[Git 子模块](question-banks/git-submodule-fundamentals/cards.json)、[Git 多工作树](question-banks/git-worktree-practice/cards.json)、[Linux Audit 日志](question-banks/linux-audit-log-analysis/cards.json)、[COPOD 异常评分](question-banks/pyod-copod-usage/cards.json)、[Vul4J 漏洞基准](question-banks/vul4j-java-vulnerability-benchmark/cards.json)、[PhiUSIIL 钓鱼数据](question-banks/phiusiil-phishing-dataset/cards.json)、[Plan-and-Solve](question-banks/plan-and-solve-prompting/cards.json)和 [MT-Bench 评审](question-banks/mt-bench-llm-judge/cards.json)。

- 此前新增：[独立与配对 t 检验](question-banks/scipy-independent-paired-t-tests/cards.json)、[Pandas 时间对齐](question-banks/pandas-asof-time-alignment/cards.json)、[日期解析](question-banks/pandas-datetime-parsing/cards.json)、[K 近邻分类](question-banks/sklearn-knn-classification/cards.json)、[AdamW](question-banks/pytorch-adamw-optimizer/cards.json)、[LoRA+](question-banks/lora-plus-learning-rates/cards.json)、[LangChain 结构化输出](question-banks/langchain-model-structured-output/cards.json)和 [Linux proc](question-banks/linux-proc-process-inspection/cards.json)。其中 LoRA+ 相关面经卡明确标为主题延伸。

- 此前新增：[XLNet 排列语言建模](question-banks/xlnet-permutation-pretraining/cards.json)、[HotpotQA 多跳问答](question-banks/hotpotqa-multihop-evaluation/cards.json)、[RAP 规划](question-banks/rap-world-model-planning/cards.json)、[ReVeal 漏洞检测](question-banks/reveal-code-graph-detection/cards.json)、[Fuzzilli](question-banks/fuzzilli-javascript-intermediate/cards.json)、[ThreatFox](question-banks/threatfox-ioc-api/cards.json)、[Volatility 内存调查](question-banks/volatility3-linux-memory/cards.json)及 [Linux 文本合并与比较](question-banks/gnu-text-join-compare/cards.json)。

- 此前新增通用计算机题：[Linux 定时任务](question-banks/linux-cron-scheduling/cards.json)、[用户与进程身份](question-banks/linux-user-identity/cards.json)、[环境与资源限制](question-banks/linux-environment-resource-limits/cards.json)、[select／poll 多路复用](question-banks/linux-select-poll-io/cards.json)、[diff／patch 文件差异](question-banks/gnu-diff-patch-practice/cards.json)。

- 此前补充：[哈希文本特征](question-banks/sklearn-hashing-vectorizer/cards.json)、[直方图梯度提升](question-banks/sklearn-hist-gradient-boosting/cards.json)、[PyTorch 初始化](question-banks/pytorch-parameter-initialization/cards.json)、[IA³ 参数高效微调](question-banks/ia3-activation-adaptation/cards.json)、[LangChain 历史消息](question-banks/langchain-runnable-message-history/cards.json)和 [MLflow 实验跟踪](question-banks/mlflow-experiment-tracking/cards.json)。

- 此前新增：[Python 多进程](question-banks/python-multiprocessing-practice/cards.json)、[Redis Streams 消费组](question-banks/redis-streams-consumer-groups/cards.json)、[Mann–Whitney U 检验](question-banks/scipy-mann-whitney-u/cards.json)、[BART 去噪结构](question-banks/bart-denoising-architecture/cards.json)、[ALFWorld](question-banks/alfworld-agent-transfer/cards.json)、[AFLGo 定向模糊测试](question-banks/aflgo-directed-greybox/cards.json)、[OpenCTI](question-banks/opencti-knowledge-ingestion/cards.json)和 [CLAP 音频文本表示](question-banks/clap-audio-text-contrastive/cards.json)。

- 此前扩展通用计算机题：[MySQL 日志与恢复](question-banks/mysql-logging-recovery/cards.json)、[TCP 保活与小包](question-banks/tcp-keepalive-small-packets/cards.json)、[Bash 参数与数组](question-banks/bash-expansion-array-practice/cards.json)、[输出与统计命令](question-banks/gnu-output-command-practice/cards.json)和 [SQL 空值逻辑](question-banks/postgresql-null-logic-patterns/cards.json)。

- 此前补充模型基础：[LightGBM 树学习](question-banks/lightgbm-tree-learning/cards.json)、[分类器接口](question-banks/lightgbm-classifier-practice/cards.json)、[PyTorch 交叉熵](question-banks/pytorch-cross-entropy-shapes/cards.json)、[PiSSA](question-banks/pissa-low-rank-initialization/cards.json)、[量化配置](question-banks/bitsandbytes-quantization-config/cards.json)、[E5 嵌入](question-banks/e5-embedding-pretraining/cards.json)和 [MinHash](question-banks/minhash-jaccard-retrieval/cards.json)；另补充 JA3、USAD、capa 和漂移评估。

- 此前新增：[指数分布](question-banks/exponential-waiting-times/cards.json)、[Wilcoxon 配对检验](question-banks/scipy-wilcoxon-paired-test/cards.json)、[SayCan 技能规划](question-banks/saycan-grounded-agent/cards.json)、[DSPy 程序优化](question-banks/dspy-program-compilation/cards.json)、[AFLFast](question-banks/aflfast-power-schedules/cards.json)、[FairFuzz](question-banks/fairfuzz-rare-branch/cards.json)、[ASIM 安全日志解析](question-banks/sentinel-asim-normalization/cards.json)和[异常事件关联指标](question-banks/affiliation-anomaly-evaluation/cards.json)。

- 此前新增：[GDB 调试基础](question-banks/gdb-debugging-foundations/cards.json)、[Python 命令行参数](question-banks/python-argparse-cli/cards.json)和 [Python 性能分析](question-banks/python-profiling-timeit/cards.json)。

- 此前新增：[curl HTTP 调试](question-banks/curl-http-debug-practice/cards.json)、[Docker Compose](question-banks/docker-compose-development/cards.json)、[Python 路径处理](question-banks/python-pathlib-practice/cards.json)和 [LangChain 文档切分](question-banks/langchain-text-splitting-practice/cards.json)。

- 此前新增通用计算机题：[jq JSON 处理](question-banks/jq-json-command-practice/cards.json)、[HTTP 内容协商](question-banks/http-content-negotiation/cards.json)、[PostgreSQL 写入与集合查询](question-banks/postgresql-upsert-set-operations/cards.json)、[软件测试设计](question-banks/istqb-test-design-fundamentals/cards.json)、[GNU Make 构建](question-banks/gnu-make-incremental-build/cards.json)和[最长递增子序列](question-banks/lis-algorithm-foundations/cards.json)。

- 此前新增：[多元正态分布](question-banks/scipy-multivariate-normal/cards.json)、[随机参数搜索](question-banks/sklearn-randomized-search/cards.json)、[ALBERT](question-banks/albert-parameter-sharing/cards.json)、[SpanBERT](question-banks/spanbert-span-boundaries/cards.json)、[LLMLingua](question-banks/llmlingua-prompt-compression/cards.json)、[DQN](question-banks/dqn-experience-replay/cards.json)、[Hypothesis 测试](question-banks/hypothesis-property-fuzzing/cards.json)、[VQL 调查](question-banks/velociraptor-vql-investigation/cards.json)和[钓鱼网页研究](question-banks/chatgpt-phishing-website-study/cards.json)。

- 此前新增：[条件期望与方差](question-banks/conditional-expectation-variance/cards.json)、[PyTorch 二维卷积](question-banks/pytorch-conv2d-practice/cards.json)、[原始 RAG 潜在文档](question-banks/rag-original-latent-documents/cards.json)、[CSE-CIC-IDS2018](question-banks/cse-cic-ids2018-dataset/cards.json)、[Tree-sitter 代码解析](question-banks/tree-sitter-code-parsing/cards.json)、[ATT&CK Navigator 图层](question-banks/attack-navigator-layer-format/cards.json)、[Zeek Weird 协议异常](question-banks/zeek-weird-analysis/cards.json)和[拒判与风险覆盖](question-banks/selective-classification-risk-coverage/cards.json)。

- 此前新增：[分类阈值调优](question-banks/sklearn-decision-threshold-tuning/cards.json)、[RoBERTa 预训练](question-banks/roberta-pretraining-details/cards.json)、[GraphSAGE 采样聚合](question-banks/graphsage-inductive-sampling/cards.json)、[Graph of Thoughts](question-banks/graph-of-thoughts-reasoning/cards.json)、[文本生成 Pipeline](question-banks/hf-text-generation-pipeline/cards.json)、[SmoothQuant](question-banks/smoothquant-activation-quantization/cards.json)、[ASan 与 UBSan](question-banks/clang-asan-ubsan-fuzzing/cards.json)、[鲁棒随机切分森林](question-banks/robust-random-cut-forest/cards.json)和 [YARA Python 扫描](question-banks/yara-python-scanning/cards.json)。

- 此前新增计算机基础：[GNU grep 搜索与排障](question-banks/gnu-grep-search-practice/cards.json)、[tcpdump 抓包](question-banks/tcpdump-packet-capture-practice/cards.json)、[UDP 与 ICMP](question-banks/udp-icmp-protocol-practice/cards.json)、[DNS 负缓存](question-banks/dns-negative-cache-practice/cards.json)、[PostgreSQL 游标式分页](question-banks/postgresql-keyset-pagination/cards.json)和 [Redis 扫描与管线](question-banks/redis-scan-pipelining-practice/cards.json)。

- 此前新增：[Unigram 子词分词](question-banks/unigram-subword-segmentation/cards.json)、[MemGPT 上下文管理](question-banks/memgpt-context-management/cards.json)、[公共后缀与网址特征](question-banks/tldextract-public-suffix-analysis/cards.json)、[LLMSecEval 安全代码评测](question-banks/llmseceval-secure-code-benchmark/cards.json)、[CAPEC 攻击模式](question-banks/capec-attack-pattern-schema/cards.json)和 [PromQL 监控查询](question-banks/prometheus-promql-monitoring/cards.json)。

- 此前新增：[Bootstrap 置信区间](question-banks/scipy-bootstrap-intervals/cards.json)、[Hugging Face 数据集处理](question-banks/hf-datasets-transform-practice/cards.json)、[学习曲线](question-banks/sklearn-learning-curves/cards.json)、[积分梯度](question-banks/captum-integrated-gradients/cards.json)、[LangChain 自查询检索](question-banks/langchain-self-query-retrieval/cards.json)、[Suricata 流状态关联](question-banks/suricata-flow-state-rules/cards.json)和 [libFuzzer 字典](question-banks/libfuzzer-dictionary-feedback/cards.json)。

- 此前通用计算机题：[NAT 与端口映射](question-banks/network-address-translation/cards.json)、[HTTP 代理与网关](question-banks/http-proxy-gateway-fundamentals/cards.json)、[Linux 进程与文件排障](question-banks/linux-strace-lsof-troubleshooting/cards.json)、[磁盘与挂载排查](question-banks/linux-disk-mount-diagnostics/cards.json)、[单调栈与滑动窗口](question-banks/monotonic-stack-window-algorithms/cards.json)和 [SQL 子查询](question-banks/postgresql-subquery-interview/cards.json)。

- 此前新增：[JS 距离](question-banks/jensen-shannon-distance/cards.json)、[ColumnTransformer 特征处理](question-banks/sklearn-column-transformer-practice/cards.json)、[PyTorch 函数式自动微分](question-banks/pytorch-func-differentiation/cards.json)、[CrossEncoder 重排](question-banks/cross-encoder-reranking-practice/cards.json)、[Gymnasium 回合边界](question-banks/gymnasium-episode-boundaries/cards.json)和 [Whisper 语音识别](question-banks/whisper-speech-training-inference/cards.json)。

- 此前新增：[Zeek TLS 遥测](question-banks/zeek-tls-telemetry-fields/cards.json)、[OmniAnomaly 时序异常检测](question-banks/omnianomaly-model-evaluation/cards.json)、[libFuzzer 语料管理](question-banks/libfuzzer-corpus-management/cards.json)、[Package-URL 软件包标识](question-banks/package-url-vulnerability-identity/cards.json)、[Kusto 安全事件关联](question-banks/kusto-security-event-joins/cards.json)和[时序异常点调整评估](question-banks/point-adjust-anomaly-evaluation/cards.json)。

- 此前新增：[PyTorch 注意力接口](question-banks/pytorch-sdpa-attention-practice/cards.json)、[ELECTRA 预训练](question-banks/electra-pretraining-foundations/cards.json)、[CodeAct 智能体](question-banks/codeact-agent-framework/cards.json)、[M3 ToolEval](question-banks/m3-tooleval-agent-benchmark/cards.json)、[MINT 多轮评测](question-banks/mint-multiturn-agent-evaluation/cards.json)、[Phishpedia 视觉识别](question-banks/phishpedia-visual-identification/cards.json)和 [LineVul 行级定位](question-banks/linevul-function-line-evaluation/cards.json)。

- 此前新增：[IPv4 子网计算](question-banks/ipv4-subnet-practice/cards.json)、[链表常见算法](question-banks/linked-list-interview-practice/cards.json)、[KMP 字符串匹配](question-banks/kmp-string-matching-foundations/cards.json)、[SQL 分组与聚合](question-banks/postgresql-aggregate-interview/cards.json)和[软件测试与质量](question-banks/software-testing-foundations/cards.json)。

- 此前新增：[AWQ 与 GPTQ 权重量化](question-banks/awq-gptq-weight-quantization/cards.json)、[LangChain 多查询与上下文压缩](question-banks/langchain-query-compression/cards.json)、[BFCL 函数调用评测](question-banks/berkeley-function-calling-evaluation/cards.json)和 [LiveCodeBench 持续评估](question-banks/livecodebench-evaluation/cards.json)。

- 此前新增：[PyTorch 数据采样](question-banks/pytorch-sampling-practice/cards.json)、[交叉验证置换检验](question-banks/sklearn-permutation-score/cards.json)、[Suricata 告警阈值](question-banks/suricata-rule-thresholding/cards.json)、[覆盖插桩](question-banks/clang-sanitizer-coverage/cards.json)和[多臂老虎机](question-banks/bandit-exploration-foundations/cards.json)。

- 此前新增：[Linux 文件查找与批处理](question-banks/gnu-find-xargs-practice/cards.json)、[Dockerfile 构建基础](question-banks/dockerfile-build-foundations/cards.json)、[PostgreSQL 查询执行计划](question-banks/postgresql-explain-practice/cards.json)、[TCP 确认与重传](question-banks/tcp-sack-retransmission/cards.json)和 [Python 子进程](question-banks/python-subprocess-foundations/cards.json)。

- 此前新增：[HuggingGPT 模型协作](question-banks/hugginggpt-model-orchestration/cards.json)、[WebShop 网页智能体](question-banks/webshop-agent-benchmark/cards.json)、[OSWorld 计算机操作](question-banks/osworld-desktop-agent-benchmark/cards.json)、[NeuralLog 日志检测](question-banks/neurallog-semantic-anomaly/cards.json)、[AVclass2 标签归一化](question-banks/avclass-malware-label-normalization/cards.json)和 [BERTScore 文本评估](question-banks/bertscore-text-generation-evaluation/cards.json)。

- 此前新增：[vLLM 前缀缓存](question-banks/vllm-prefix-cache/cards.json)、[TruthfulQA 评测](question-banks/truthfulqa-benchmark/cards.json)、[COCO 检测评估](question-banks/coco-detection-evaluation/cards.json)、[OpenVEX 漏洞影响状态](question-banks/openvex-vulnerability-status/cards.json)、[SARIF 静态分析结果](question-banks/sarif-static-analysis-results/cards.json)和 [AFL++ 持久化测试入口](question-banks/afl-persistent-harness/cards.json)。

- 此前新增：[Linux 资源监控](question-banks/linux-resource-monitoring/cards.json)、[数据库范式与设计](question-banks/relational-database-normalization/cards.json)、[算法复杂度](question-banks/algorithm-complexity-foundations/cards.json)、[DNS 分层解析](question-banks/dns-resolution-delegation/cards.json)和 [HTTP 缓存与条件请求](question-banks/http-cache-validation-fundamentals/cards.json)。

- 此前新增：[Python 线程池与 Future](question-banks/python-futures-executors/cards.json)、[scikit-learn 概率校准](question-banks/sklearn-probability-calibration/cards.json)、[PyTorch 常用损失函数](question-banks/pytorch-common-loss-functions/cards.json)、[IoT-23 安全流量](question-banks/iot23-network-dataset/cards.json)和 [OpenTelemetry 指标监控](question-banks/opentelemetry-metrics-monitoring/cards.json)。

- 此前新增：[LangChain 父文档检索](question-banks/langchain-parent-document-retrieval/cards.json)、[DoRA 权重分解](question-banks/dora-weight-decomposition/cards.json)、[Self-Ask 组合推理](question-banks/self-ask-compositional-reasoning/cards.json)、[McNemar 成对检验](question-banks/mcnemar-paired-classification/cards.json)、[seqeval 实体指标](question-banks/seqeval-entity-metrics/cards.json)和 [ATT&CK 检测策略](question-banks/mitre-attack-detection-strategies/cards.json)。

- 此前新增：[C 指针与内存](question-banks/c-memory-pointer-fundamentals/cards.json)、[HTTP 状态码与范围请求](question-banks/http-status-range-fundamentals/cards.json)、[Linux 归档与压缩](question-banks/gnu-tar-gzip-commands/cards.json)、[二叉树遍历](question-banks/binary-tree-traversal-fundamentals/cards.json)和 [SQL 视图与 CTE](question-banks/postgresql-views-cte-foundations/cards.json)。

- 此前新增：[Falco 安全规则](question-banks/falco-rule-authoring/cards.json)、[SMOTE 过采样](question-banks/smote-oversampling-practice/cards.json)、[SQuAD 问答评测](question-banks/squad-v2-evaluation/cards.json)、[合成钓鱼邮件评测](question-banks/ephishgen-dataset-evaluation/cards.json)、[LogGPT 日志异常检测](question-banks/loggpt-sequence-detection/cards.json)和 [MegaVul 漏洞代码数据](question-banks/megavul-dataset-construction/cards.json)。

- 此前新增：[Python 异常组](question-banks/python-exception-groups/cards.json)、[列联表统计检验](question-banks/contingency-statistical-tests/cards.json)、[NVD 漏洞情报接口](question-banks/nvd-cve-api-practice/cards.json)、[CI 模糊测试](question-banks/clusterfuzzlite-ci-fuzzing/cards.json)和 [wav2vec 2.0 预训练](question-banks/wav2vec2-pretraining-detail/cards.json)。

- 此前新增：[HDBSCAN 密度聚类](question-banks/sklearn-hdbscan-foundations/cards.json)、[SimPO 偏好优化](question-banks/simpo-preference-optimization/cards.json)、[GAIA 助手评测](question-banks/gaia-agent-benchmark/cards.json)、[视觉模型权重接口](question-banks/torchvision-model-weights/cards.json)和 [JA4 TLS 客户端指纹](question-banks/ja4-tls-fingerprint/cards.json)。

- 此前新增：[Git 历史与排查](question-banks/git-history-debugging/cards.json)、[Linux 服务与日志](question-banks/systemd-service-operations/cards.json)和 [Python 自动化测试](question-banks/pytest-testing-fundamentals/cards.json)。

- 此前新增：[WebSocket 与服务端事件](question-banks/websocket-sse-protocol-foundations/cards.json)、[PyTorch 检查点序列化](question-banks/pytorch-checkpoint-serialization/cards.json)、[CodeT5 代码预训练](question-banks/codet5-identifier-pretraining/cards.json)、[AdaLoRA 自适应秩](question-banks/adalora-rank-allocation/cards.json)、[蒙特卡洛树搜索](question-banks/monte-carlo-tree-search-foundations/cards.json)和[时序异常关联差异](question-banks/anomaly-transformer-association/cards.json)。

- 此前新增：[Kubernetes 工作负载与服务](question-banks/kubernetes-workload-service-foundations/cards.json)、[Linux 文件与目录权限](question-banks/linux-file-permissions-fundamentals/cards.json)、[图像掩码自编码](question-banks/masked-autoencoder-vision-foundations/cards.json)、[DiverseVul 漏洞代码数据](question-banks/diversevul-code-dataset/cards.json)和 [Sentence Transformers 编码实践](question-banks/sentence-transformers-encode-practice/cards.json)。

- 此前通用计算机题：[以太网交换与 VLAN](question-banks/ethernet-switching-vlan-foundations/cards.json)、[Linux 内存映射](question-banks/linux-memory-mapping-fundamentals/cards.json)和[二叉搜索树与平衡树](question-banks/binary-search-trees-foundations/cards.json)；另补充 [RoPE](question-banks/rope-rotation-foundations/cards.json)、[RMSNorm 与 SwiGLU](question-banks/rmsnorm-swiglu-foundations/cards.json)、[路径穿越](question-banks/path-traversal-code-analysis/cards.json)、[HumanEval](question-banks/humaneval-code-evaluation/cards.json)和[层级任务网络](question-banks/hierarchical-task-network-planning/cards.json)。

- 此前基础与安全实践：[相关系数与秩相关](question-banks/correlation-statistical-foundations/cards.json)、[分布差异与漂移](question-banks/distribution-drift-statistics/cards.json)、[EmbeddingBag 文本嵌入](question-banks/pytorch-embeddingbag-practice/cards.json)、[YARA PE 与规则条件](question-banks/yara-pe-rule-practice/cards.json)、[文档 OCR](question-banks/tesseract-ocr-document-practice/cards.json)和 [Self-Refine 反馈修订](question-banks/self-refine-agent-feedback/cards.json)。

- 新增基础与安全运营：[词袋与 TF-IDF](question-banks/sklearn-text-vectorization/cards.json)、[经典规划建模](question-banks/classical-agent-planning/cards.json)、[CloudTrail 云审计](question-banks/cloudtrail-security-telemetry/cards.json)、[Windows Kerberos 审核](question-banks/windows-kerberos-audit/cards.json)、[GuardDuty 威胁检测](question-banks/guardduty-threat-findings/cards.json)和 [Splunk SPL 日志查询](question-banks/splunk-spl-security-analysis/cards.json)。

- 此前计算机通用题：[MySQL InnoDB 索引与查询计划](question-banks/mysql-innodb-index-foundations/cards.json)、[MySQL InnoDB 事务与锁](question-banks/mysql-innodb-transactions/cards.json)、[Linux 文本处理命令](question-banks/linux-text-processing-commands/cards.json)、[分布式服务过载与可靠性](question-banks/distributed-overload-reliability/cards.json)、[CAP 与 Dynamo 副本一致性](question-banks/distributed-consistency-foundations/cards.json)和[两阶段提交、Saga 与 Outbox](question-banks/distributed-transactions-patterns/cards.json)。

- 新增模型与系统实践：[DistilBERT 知识蒸馏](question-banks/distillation-distilbert/cards.json)、[HyDE 检索](question-banks/hyde-retrieval-details/cards.json)、[SWE-agent 接口](question-banks/swe-agent-interface/cards.json)、[AgentBench 评测](question-banks/agentbench-interactive-evaluation/cards.json)、[AutoGen 多智能体](question-banks/autogen-conversation-basics/cards.json)、[OpenTelemetry 追踪](question-banks/opentelemetry-agent-tracing/cards.json)、[syzkaller](question-banks/syzkaller-syscall-fuzzing/cards.json)、[Linux KCOV](question-banks/linux-kcov-fuzzing/cards.json)及[二项比例评估](question-banks/binomial-security-evaluation/cards.json)。

- 新一批基础与安全应用：[多重检验与 FDR](question-banks/multiple-testing-fdr/cards.json)、[自一致性推理](question-banks/self-consistency-reasoning/cards.json)、[Least-to-Most 子问题求解](question-banks/least-to-most-reasoning/cards.json)、[EQL 事件关联](question-banks/eql-security-event-sequences/cards.json)、[N-BaIoT 检测](question-banks/nbaiot-botnet-detection/cards.json)、[ECOD 异常检测](question-banks/ecod-outlier-detection/cards.json)、[UNICORN 溯源检测](question-banks/unicorn-provenance-detection/cards.json)和 [Fuzz4All 生成与预言机](question-banks/fuzz4all-generation-oracles/cards.json)。
- 基础与实践：[Beta 贝叶斯更新](question-banks/beta-binomial-inference/cards.json)、[Python 日志](question-banks/python-logging-foundations/cards.json)、[GRPO](question-banks/grpo-training-foundations/cards.json)、[ReWOO](question-banks/rewoo-agent-planning/cards.json)、[RRF 排名融合](question-banks/rrf-ranking-fusion/cards.json)、[FPN 多尺度特征](question-banks/fpn-multiscale-vision/cards.json)、[AFL++ 比较反馈](question-banks/afl-instrumentation-feedback/cards.json)、[Zeek 通知](question-banks/zeek-notice-workflow/cards.json)和 [金丝雀发布评估](question-banks/canary-release-evaluation/cards.json)。
- 模型与安全数据补充：[GQA 分组查询注意力](question-banks/gqa-attention-uptraining/cards.json)、[Switch 稀疏专家](question-banks/switch-moe-foundations/cards.json)、[HNSW 分层近邻图](question-banks/hnsw-graph-search/cards.json)、[PyTorch 学习率调度](question-banks/pytorch-lr-schedulers/cards.json)、[OCSF 安全事件规范](question-banks/ocsf-security-event-schema/cards.json)、[CVE 记录与版本范围](question-banks/cve-record-schema/cards.json)、[语义分割](question-banks/semantic-segmentation-foundations/cards.json)和 [Semgrep 污点分析](question-banks/semgrep-taint-analysis-details/cards.json)。
- 新增通用基础：[HTTP/2、HTTP/3 与 QUIC](question-banks/http-versions-quic/cards.json)、[CPU 缓存与存储层次](question-banks/cpu-cache-foundations/cards.json)、[SQL 窗口函数](question-banks/postgresql-window-functions/cards.json)、[字典树与字符串检索](question-banks/trie-string-search/cards.json)、[文本编码与数值表示](question-banks/text-number-representation/cards.json)。
- 计算机基础：[TCP/IP](question-banks/tcp-ip-fundamentals/cards.json)、[DNS 解析与观测](question-banks/dns-observation-fundamentals/cards.json)、[Linux 套接字编程](question-banks/linux-socket-programming/cards.json)、[IP 寻址与转发](question-banks/ip-routing-fundamentals/cards.json)、[IPv6 与 DHCP](question-banks/ipv6-dhcp-fundamentals/cards.json)、[浏览器同源与跨域](question-banks/browser-origin-cors-cookies/cards.json)、[HTTP 与缓存](question-banks/http-web-fundamentals/cards.json)、[TLS 与服务身份](question-banks/tls-protocol-foundations/cards.json)、[计算机组成与表示](question-banks/computer-architecture-foundations/cards.json)、[CPU 指令流水线](question-banks/cpu-pipeline-fundamentals/cards.json)、[Redis 缓存](question-banks/redis-cache-foundations/cards.json)、[Kafka 消息队列](question-banks/kafka-messaging-foundations/cards.json)、[Raft 分布式共识](question-banks/raft-consensus-foundations/cards.json)、[编译与构建](question-banks/compiler-build-foundations/cards.json)、[Git 版本控制](question-banks/git-version-control-foundations/cards.json)、[Linux 常用命令](question-banks/linux-command-foundations/cards.json)、[Linux 网络排查](question-banks/linux-network-troubleshooting/cards.json)、[Linux 进程与信号](question-banks/linux-process-signals/cards.json)、[Shell 与命令实践](question-banks/bash-shell-practice/cards.json)、[文件描述符](question-banks/linux-file-descriptor-fundamentals/cards.json)、[文件系统与持久化](question-banks/file-system-internals/cards.json)、[操作系统](question-banks/os-fundamentals/cards.json)、[进程间通信](question-banks/linux-ipc-fundamentals/cards.json)、[I/O 多路复用](question-banks/linux-io-multiplexing/cards.json)、[CPU 调度](question-banks/os-cpu-scheduling-fundamentals/cards.json)、[并发同步](question-banks/os-concurrency-fundamentals/cards.json)、[内存局部性与页面替换](question-banks/os-memory-replacement-foundations/cards.json)、[数据库与 SQL](question-banks/postgresql-database-foundations/cards.json)、[数据库约束与设计](question-banks/postgresql-constraints-design/cards.json)、[SQL 查询与索引](question-banks/postgresql-query-index/cards.json)、[数据库并发与锁](question-banks/postgresql-mvcc-locks/cards.json)、[数据结构与算法](question-banks/data-structures-foundations/cards.json)、[图算法与并查集](question-banks/graph-algorithms-fundamentals/cards.json)、[容器与 Docker](question-banks/docker-container-fundamentals/cards.json)、[排序与二叉堆](question-banks/sorting-heap-algorithms/cards.json)、[动态规划与常见算法思路](question-banks/algorithm-design-foundations/cards.json)、[线段树与树状数组](question-banks/segment-tree-fenwick-foundations/cards.json)。
- 计算机系统补充：[Linux 命名空间与 cgroups](question-banks/linux-namespaces-cgroups-foundations/cards.json)。
- 常见系统设计：[Nginx 负载均衡](question-banks/nginx-load-balancing/cards.json)、[应用缓存策略](question-banks/application-cache-patterns/cards.json)、[布隆过滤器](question-banks/bloom-filter-foundations/cards.json)、[一致性哈希与虚拟节点](question-banks/consistent-hashing-foundations/cards.json)。
- Python：[基础与进阶语法](question-banks/python-syntax-foundations/cards.json)、[正则表达式](question-banks/python-regex-practice/cards.json)、[模块导入与缓存](question-banks/python-import-mechanics/cards.json)、[对象模型与异常](question-banks/python-object-protocols/cards.json)、[类型提示与数据类](question-banks/python-typing-dataclasses/cards.json)、[标准库迭代器与容器](question-banks/python-stdlib-iterators/cards.json)、[并发](question-banks/python-concurrency-fundamentals/cards.json)、[异步编程](question-banks/python-asyncio-practice/cards.json)和 [NumPy 数据处理](question-banks/numpy-data-fundamentals/cards.json)。
- 数学与情报：[马尔可夫链基础](question-banks/markov-chain-fundamentals/cards.json)、[贝叶斯更新](question-banks/bayesian-updating-foundations/cards.json)、[正交投影与最小二乘](question-banks/linear-projection-least-squares/cards.json)、[图论基础](question-banks/graph-theory-foundations/cards.json)、[EPSS 情报与数据使用](question-banks/epss-evidence-usage/cards.json)、[CVSS v4.0 漏洞评分](question-banks/cvss-v4-foundations/cards.json)、[OSV 漏洞数据](question-banks/osv-schema-v192/cards.json)。
- 机器学习：[朴素贝叶斯](question-banks/naive-bayes-foundations/cards.json)、[scikit-learn 常用接口](question-banks/sklearn-common-apis/cards.json)、[SGD 与增量训练](question-banks/sklearn-sgd-incremental/cards.json)、[PyTorch 归一化层](question-banks/pytorch-normalization-contracts/cards.json)、[自编码器基础](question-banks/autoencoder-foundations/cards.json)、[回归评估函数](question-banks/sklearn-regression-metrics/cards.json)、[特征选择与重要性](question-banks/sklearn-feature-selection/cards.json)、[LIME 与 SHAP 模型解释](question-banks/model-explanations-lime-shap/cards.json)、[评估与交叉验证接口](question-banks/sklearn-metrics-validation/cards.json)、[PyTorch 训练接口](question-banks/pytorch-common-training/cards.json)、[激活检查点](question-banks/pytorch-activation-checkpoint/cards.json)、[图神经网络模型](question-banks/gnn-convolution-models/cards.json)和 [张量与变长序列操作](question-banks/pytorch-tensor-operations/cards.json)。
- 强化学习与检索：[强化学习方法](question-banks/rl-learning-methods/cards.json)、[策略梯度与 GAE](question-banks/policy-gradient-gae/cards.json)、[PPO 裁剪](question-banks/ppo-clipped-objective/cards.json)、[Faiss 索引接口](question-banks/faiss-index-contracts/cards.json)、[DPR 稠密段落检索](question-banks/dpr-dense-passage-retrieval/cards.json)、[Elasticsearch 全文检索](question-banks/elasticsearch-text-retrieval/cards.json)和 [SPLADE 稀疏检索](question-banks/splade-sparse-retrieval/cards.json)。
- NLP 基础：[Word2Vec、GloVe 与 fastText](question-banks/word-vector-foundations/cards.json)、[分词流水线](question-banks/tokenization-pipeline-details/cards.json)、[分词编码与对齐](question-banks/tokenizers-encoding-contracts/cards.json)、[ALiBi 位置偏置](question-banks/alibi-position-bias/cards.json)、[实体标注与评估](question-banks/ner-token-labeling/cards.json)、[BiLSTM 与 CRF](question-banks/bilstm-crf-foundations/cards.json)、[隐马尔可夫模型](question-banks/hmm-sequence-models/cards.json)和 [BLEU、ROUGE 与困惑度](question-banks/nlp-generation-evaluation/cards.json)。
- 多模态：[CLIP 图文学习与 ViT 视觉编码](question-banks/clip-vit-foundations/cards.json)、[torchvision 图像预处理](question-banks/torchvision-image-preprocessing/cards.json)、[语音识别与评估](question-banks/speech-recognition-foundations/cards.json)。
- 大模型应用：[生成与解码配置](question-banks/transformers-generation-parameters/cards.json)、[RLHF 奖励模型与 PPO](question-banks/instructgpt-rlhf-training/cards.json)、[Transformer-XL 片段记忆](question-banks/transformer-xl-recurrence/cards.json)、[FlashAttention](question-banks/flash-attention-algorithms/cards.json)、[投机解码与采样](question-banks/speculative-decoding-foundations/cards.json)、[LangChain 基础](question-banks/langchain-fundamentals/cards.json)、[LangChain 实用接口](question-banks/langchain-core-practice/cards.json)、[输出解析](question-banks/langchain-output-parsing/cards.json)、[流式消息与上下文](question-banks/langchain-stream-context/cards.json)、[LangChain 检索接口](question-banks/langchain-rag-apis/cards.json)、[LangGraph 状态与运行](question-banks/langgraph-state-runtime/cards.json)、[GraphRAG](question-banks/graphrag-foundations/cards.json)、[LoRA 基础](question-banks/lora-adaptation/cards.json)、[PEFT 与 QLoRA](question-banks/lora-peft-practice/cards.json)和 [LoRA 训练细节](question-banks/lora-training-details/cards.json)。
- Agent 与安全运营：[Agent 环境与信念状态](question-banks/agent-observation-belief/cards.json)、[LLMCompiler 工具调度](question-banks/llmcompiler-parallel-tools/cards.json)、[ToolLLM 工具使用](question-banks/toolllm-toolbench-foundations/cards.json)、[Kibana KQL 日志筛选](question-banks/kibana-kql-investigation/cards.json)、[SWE-bench 工程评测](question-banks/swe-bench-agent-evaluation/cards.json)、[规划与搜索](question-banks/agent-classical-search/cards.json)、[Reflexion 反思与反馈](question-banks/reflexion-agent-feedback/cards.json)、[DeepCASE 事件上下文研判](question-banks/deepcase-contextual-triage/cards.json)、[SOC AI 现场研究](question-banks/soc-companion-field-study/cards.json)、[SOC-bench 评测设计](question-banks/soc-benchmark-design/cards.json)、[事件分析与沟通](question-banks/nist-incident-analysis-communication/cards.json)和 [定时检测与告警运营](question-banks/sentinel-rule-operations/cards.json)。
- 威胁检测：[弱监督标签](question-banks/weak-supervision-labeling/cards.json)、[时间序列与异常基线](question-banks/time-series-anomaly-basics/cards.json)、[自编码器异常检测](question-banks/autoencoder-anomaly-detection/cards.json)、[日志模板解析](question-banks/log-template-parsing/cards.json)、[LogAnomaly 日志异常](question-banks/loganomaly-sequence-count/cards.json)、[身份与远程访问威胁](question-banks/identity-lateral-detection/cards.json)、[主机凭据与威胁行为](question-banks/host-threat-behavior/cards.json)、[CTU-13 僵尸网络数据](question-banks/ctu13-botnet-dataset/cards.json)、[BoT-IoT 流量数据](question-banks/bot-iot-dataset/cards.json)、[ToN_IoT 多源遥测](question-banks/ton-iot-multisource-dataset/cards.json)和 [LANL 主机与网络数据](question-banks/lanl-host-network-dataset/cards.json)。
- 恶意软件与情报：[EMBER2024 与 SOREL 基准](question-banks/modern-malware-benchmarks/cards.json)、[Cuckoo 动态分析](question-banks/cuckoo-dynamic-analysis/cards.json)、[DREBIN Android 检测](question-banks/drebin-android-malware/cards.json)、[MalwareBazaar 样本情报](question-banks/malwarebazaar-community-data/cards.json)、[PhishTank 钓鱼数据](question-banks/phishtank-feed-boundaries/cards.json)、[URLhaus 恶意 URL 情报](question-banks/urlhaus-threat-feed/cards.json)、[多模态钓鱼页面分析](question-banks/phishing-multimodal-methods/cards.json)、[CISA KEV 情报字段](question-banks/cisa-kev-schema/cards.json)、[MISP 情报交换格式草案](question-banks/misp-threat-intelligence-format/cards.json)和 [入侵分析钻石模型](question-banks/diamond-intrusion-analysis/cards.json)。
- 安全评估：[主动学习与安全标注](question-banks/active-learning-security-evaluation/cards.json)、[Tranco 域名榜单评估](question-banks/tranco-ranking-evaluation/cards.json)、[River 流式漂移检测](question-banks/river-drift-detection/cards.json)、[流式异常检测评估](question-banks/nab-anomaly-benchmark/cards.json)、[模糊测试基准与删失时间](question-banks/magma-fuzz-evaluation/cards.json)、[FuzzBench 评估](question-banks/fuzzbench-evaluation-methods/cards.json)、[NEUZZ 神经模糊测试](question-banks/neuzz-neural-fuzzing/cards.json)、[Atheris Python 模糊测试](question-banks/atheris-python-fuzzing/cards.json)、[LLMFuzz 深度学习库测试](question-banks/llmfuzz-dl-library/cards.json)、[安全模型分布偏移](question-banks/security-distribution-shift/cards.json)和 [共形评估与恶意软件漂移](question-banks/conformal-malware-evaluation/cards.json)。
- 代码安全：[漏洞推理与审计验证](question-banks/llm4vuln-study/cards.json)、[Juliet 基准](question-banks/juliet-code-benchmark/cards.json)、[CVEfixes 修复数据](question-banks/cvefixes-vulnerability-data/cards.json)、[CodeBERT 代码预训练](question-banks/codebert-graphcodebert/cards.json)、[Devign 程序图](question-banks/devign-graph-vulnerability/cards.json)、[LineVD 语句级检测](question-banks/linevd-statement-detection/cards.json)、[VulDeePecker 切片](question-banks/vuldeepecker-code-gadgets/cards.json)、[代码漏洞检测评估](question-banks/primevul-evaluation/cards.json)。
- Agent 和异常检测补充：[τ-bench](question-banks/tau-bench-agent-reliability/cards.json)、[ToolSandbox](question-banks/toolsandbox-agent-evaluation/cards.json)、[AgentDojo](question-banks/agentdojo-tool-boundaries/cards.json)、[Deep SVDD](question-banks/deep-svdd-anomaly-detection/cards.json)、[MCC 指标](question-banks/matthews-correlation-evaluation/cards.json)、[CICFlowMeter 特征](question-banks/cicflowmeter-feature-contracts/cards.json)。
- 面经：[大厂公开面经索引](question-banks/大厂公开面经索引.md)。应用中也可以搜索关键词，或在来源中选择公司与“全部公开面经”。

## 项目结构

```text
.
├── App.tsx                  # 应用入口、页面切换
├── app.json                 # Expo 与安卓构建配置
├── assets/                  # 图标及其原始素材
├── docs/                    # AI4SEC 技术路线
├── question-banks/          # 分来源题库、去重规则和标准化导出
│   ├── README.md            # 题库格式、来源索引和增库流程
│   ├── 大厂公开面经索引.md  # 公司、岗位、轮次及原帖考点
│   ├── 万题集知识范围.md    # 可持续扩充的知识范围
│   └── normalized/          # 合并后的 JSON 和 Anki 文本导出
├── src/
│   ├── data/                # 题库注册、标准化和数据迁移
│   ├── lib/                 # 间隔复习及筛选逻辑
│   ├── screens/             # 学习、题库、设置和进度页面
│   └── components/          # 通用界面组件
├── tests/                   # 调度、迁移、题库和界面测试
├── tools/                   # 题库检查、导出和图标生成
└── .github/workflows/       # 自动检查
```

## 安装与运行

需要 Node.js 22.13 及以上的受支持版本；项目提供 `.nvmrc`。克隆后安装锁定的依赖：

```bash
git clone https://github.com/RikkaLzw/zhixu.git
cd zhixu
npm ci
npm start
```

使用与项目 SDK 版本相匹配的 Expo Go 扫描终端二维码，在安卓手机上运行。手机与开发机需要能够访问同一个开发服务器。

若手机通过 ADB 连接，且开发服务器使用默认端口 8081，可以执行：

```bash
adb reverse tcp:8081 tcp:8081
adb shell am start -a android.intent.action.VIEW -d "exp://127.0.0.1:8081"
```

## 安卓构建

构建独立 APK 需要 Java、Android SDK、NDK 与 CMake。项目的 Android 配置使用 compile SDK 37、target SDK 36、NDK 27.1.12297006 和 CMake 3.31.6；本地构建时由 Android 构建工具检查所需组件。

```bash
npx expo prebuild --platform android
cd android
```

在 Windows 上运行 `.\gradlew.bat assembleRelease`；在 macOS 或 Linux 上运行 `./gradlew assembleRelease`。APK 位于 `android/app/build/outputs/apk/release/app-release.apk`。当前使用开发签名，正式分发前需配置自己的签名。

原生目录、安装包、SDK 缓存和签名材料不提交到仓库；克隆后可根据上述命令重新生成。设备本地数据不会随仓库同步，卸载应用会清除本地记录。

## 题库维护

阅读 [题库来源与维护说明](question-banks/README.md)、[大厂公开面经索引](question-banks/大厂公开面经索引.md)、[万题集知识范围](question-banks/万题集知识范围.md) 和 [批次进展](question-banks/批次进展.md)。新增资料时，在 `question-banks/` 建立来源目录并登记卡片；检查相似知识点、维护合并规则，最后重新导出标准化文件。

```bash
npm run check:banks -- --candidates --threshold=0.55
npm run export:banks
```

导出的[标准 JSON](question-banks/normalized/cards.json)、[常规学习 Anki 文本](question-banks/normalized/anki-regular.tsv)和[完整 Anki 文本](question-banks/normalized/anki-import.tsv)随源码一起提交。新增内置题库时，需要按题库维护说明更新内容版本和迁移逻辑，以保留已有进度。

## 检查

```bash
npm run typecheck
npm test
npm run check:banks
npx playwright install chromium
npm run test:ui
```

界面测试默认使用 Playwright 安装的 Chromium。若要使用本机 Chrome，可将 `PLAYWRIGHT_BROWSER_CHANNEL` 设为 `chrome` 后运行 `npm run test:ui`。GitHub Actions 会检查类型、测试、题库及导出文件的一致性。

## 资料与许可

[AI4SEC 技术路线](docs/技术路线.md) 和题库目录记录了学习范围与来源。仓库根目录的 `LICENSE` 是初始化时随 Expo 模板提供的许可文本；题库所引用的资料仍需遵守各自的许可与署名要求。
