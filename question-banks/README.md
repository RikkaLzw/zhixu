# AI4SEC 题库

本目录保存按来源整理的 AI4SEC 学习卡，涵盖 AI、Agent 基础及其在安全中的应用。来源文件保留各资料对应的原始题目；应用与导出文件使用合并同一知识点后的卡片。

万题集的知识范围与数量分配见 [万题集知识范围.md](万题集知识范围.md)。

当前包含 **10021 张标准化主卡**；本轮将其中 **343 张**论文、数据集和特定实现细节标为可选研究拓展，默认学习 **9678 张**常规卡片。已有内容复核记录不等于每张题都已确认适合面试；方法、抽样范围与后续工作见[面试适用性审计](面试适用性审计.md)。覆盖分布及内容复核记录见[批次进展](批次进展.md)。

[大厂公开面经索引](大厂公开面经索引.md)按公司列出岗位、轮次、原帖考点和出处，便于浏览个人复盘；应用可按公司或“全部公开面经”筛选相应学习卡。

## 学习阶段

卡片按原有 `level` 字段分为「基础」（存储值为 `入门`）、「进阶」和「实践」：基础侧重常见概念，进阶侧重原理与边界，实践侧重工具和场景。全库分别有 **2381、7194、446 张**；常规学习分别有 **2342、6890、446 张**，研究拓展分别有 **39、304、0 张**。

在首页进入「学习设置」可自由组合阶段，默认全部开启。关闭阶段会暂停该阶段的新题和到期复习，保留学习进度；题库中仍可筛选并浏览关闭阶段的卡片。编辑卡片时可自行调整阶段，未标难度的旧自建卡按基础处理。研究拓展是独立的学习范围，可在题库中选择。

对全库 **10021 张**主卡完成学习阶段复核，依据核心概念、机制边界和实际应用场景调整 **397 张**：110 张进阶改为基础，221 张进阶改为实践，55 张实践改为进阶，11 张实践改为基础。题目和答案未因本次校准而改动。难度与岗位和经验相关；阶段复核不等同于面试频率认证，详见[批次进展](批次进展.md)。

## 来源索引

| 来源 | 方向 | 来源题数 | 文件 |
| --- | --- | ---: | --- |
| 多源公开教材、标准与官方技术文档 | 计算理论、类型系统、PKI、JVM、云存储与函数、CRDT、OCI、软件测试与领域驱动设计（已逐题复核） | 470 | [cards.json](computer-science-general-expansion/cards.json) |
| 多领域教材与官方技术文档 | 统计推断、Python、机器学习、LLM、Agent、安全与计算机基础补充（已逐题复核） | 133 | [cards.json](cross-domain-knowledge-expansion/cards.json) |
| NIST SP 800-226、Dwork 与 Roth、Opacus | 差分隐私定义、噪声机制、DP-SGD 与隐私会计 | 25 | [cards.json](differential-privacy-ml-foundations/cards.json) |
| System Design Primer、Stripe、Google SRE、Microsoft、AWS、PostgreSQL 与 Elasticsearch 文档 | 需求澄清、短链、限流、信息流、异步任务、聊天、文件同步、爬虫、搜索补全、通知与库存预约设计 | 48 | [cards.json](system-design-interview-cases/cards.json) |
| CSES Handbook 与 USACO Guide | 子集、排列、组合、N 皇后、约束搜索与分支限界 | 26 | [cards.json](backtracking-search-foundations/cards.json) |
| AtCoder Educational DP Contest、CSES 与 CP-Algorithms | 网格、背包、位掩码、树形、区间、数位与博弈 DP | 26 | [cards.json](dynamic-programming-patterns-foundations/cards.json) |
| CP-Algorithms、Princeton Algorithms 与 NetworkX 文档 | Dijkstra、Bellman-Ford、DAG 与 Floyd-Warshall 最短路 | 30 | [cards.json](shortest-path-algorithms-foundations/cards.json) |
| OSTEP 与 Linux 内核设备 I/O、DMA、IRQ 文档 | 中断、DMA、MMIO、MSI 与设备驱动交互 | 25 | [cards.json](device-io-interrupts-foundations/cards.json) |
| RFC 1058、1812、2328、4271、4456 | OSPF、BGP、距离向量路由与路由收敛 | 30 | [cards.json](routing-protocols-foundations/cards.json) |
| ITU-T X.200、RFC 1122、1034、9114、9001、8446 | OSI/TCP/IP 分层、层次映射、服务与协议、封装及 DNS/HTTPS 协议栈（已逐题复核） | 9 | [cards.json](network-layering-fundamentals/cards.json) |
| Linux KVM、QEMU、VirtIO 与 libvirt 官方文档 | 硬件辅助虚拟化、地址转换、设备、迁移与资源调度 | 24 | [cards.json](virtualization-mechanisms-foundations/cards.json) |
| Linux 手册、ELF ABI 与 GNU ld | ELF 装载器搜索、SONAME、符号绑定与动态插件接口 | 23 | [cards.json](elf-dynamic-linking-foundations/cards.json) |
| OSTEP 与 Linux 内核文档 | 机械硬盘调度、块层多队列 I/O 与 RAID | 21 | [cards.json](disk-io-raid-foundations/cards.json) |
| Linux man-pages 与内核文档 | Linux 命名空间、PID 隔离、cgroups v2 CPU／内存／PID 控制 | 13 | [cards.json](linux-namespaces-cgroups-foundations/cards.json) |
| CP-Algorithms 与 AtCoder Library | 线段树、Fenwick 树（树状数组）、区间查询与更新 | 14 | [cards.json](segment-tree-fenwick-foundations/cards.json) |
| Stanford CS149 Fall 2025 讲义 | 多核缓存一致性、MSI、并行效率、超标量、数据并行与 GPU 调度 | 14 | [cards.json](computer-architecture-parallelism/cards.json) |
| NVIDIA CUDA C++ Programming Guide | GPU 线程层次、SIMT、内存访问、同步与异步执行 | 20 | [cards.json](cuda-programming-fundamentals/cards.json) |
| Brendan Gregg 与 Linux perf 手册 | USE 资源诊断、采样剖析、perf 与 CPU 火焰图 | 17 | [cards.json](linux-performance-analysis-fundamentals/cards.json) |
| Berkeley CS267 与 EECS-2008-134 Roofline 报告 | Amdahl 定律、固定与缩放工作量、Roofline 性能上界和瓶颈分析 | 16 | [cards.json](performance-models-foundations/cards.json) |
| gem5 O3CPU 与 v25.1.0.0 分支预测源码 | 乱序执行、寄存器重命名、ROB、分支预测器与加载存储队列 | 18 | [cards.json](cpu-out-of-order-branch-prediction/cards.json) |
| Netfilter nftables 官方手册与 Wiki | nftables 规则链、hook、conntrack、NAT 与常用命令 | 24 | [cards.json](linux-nftables-firewall-practice/cards.json) |
| Lamport 逻辑时钟论文、RFC 5905、Spanner 论文与分布式锁分析 | 时钟偏差、因果顺序、租约、fencing token 与 TrueTime | 20 | [cards.json](distributed-time-coordination/cards.json) |
| RocksDB 官方 Wiki | LSM 存储、WAL、compaction、Bloom filter 与 block cache | 20 | [cards.json](rocksdb-lsm-storage-fundamentals/cards.json) |
| Microsoft Azure Architecture Center | 架构风格、CQRS、事件溯源、系统迁移、API 网关与 Sidecar | 34 | [cards.json](software-architecture-patterns/cards.json) |
| Fielding REST 论文与 Google API Improvement Proposals | REST 架构、资源命名、分页、更新掩码、兼容性与版本 | 14 | [cards.json](rest-api-design-foundations/cards.json) |
| OpenAPI Specification 3.1.1 | HTTP API 参数、响应、Schema 与安全契约 | 25 | [cards.json](openapi-31-contract-foundations/cards.json) |
| NIST SP 800-145 与 AWS/Azure 云架构文档 | 服务模型、区域与可用区、弹性扩展、云存储和灾难恢复 | 18 | [cards.json](cloud-computing-foundations/cards.json) |
| Nick Huntington-Klein《The Effect》开放教材 | 潜在结果、因果图、匹配与准实验设计 | 19 | [cards.json](causal-inference-foundations/cards.json) |
| cppreference C++ 并发与内存模型参考 | 线程、同步原语、原子顺序与异步任务 | 37 | [cards.json](cpp-concurrency-memory-model/cards.json) |
| Kubernetes 1.32 官方文档 | 集群组件、控制器、资源、存储、调度与策略 | 35 | [cards.json](kubernetes-cluster-operations-foundations/cards.json) |
| Rust 官方教材与标准库文档 | 所有权、借用、生命周期、trait、错误处理与并发 | 39 | [cards.json](rust-programming-foundations/cards.json) |
| MDN JavaScript Guide 与 Web API 文档 | 类型、作用域、闭包、Promise、事件循环与浏览器事件 | 35 | [cards.json](javascript-language-async-foundations/cards.json) |
| Go 语言规范、Go 内存模型与标准库文档 | 包／模块、类型、切片、接口、错误处理、goroutine 与并发同步 | 35 | [cards.json](go-programming-foundations/cards.json) |
| ISTQB CTFL 4.0.1 | 测试原则、测试过程、测试级别与风险管理 | 25 | [cards.json](software-testing-principles-process/cards.json) |
| cppreference C++ 语言与标准库参考 | 面向对象、对象生命周期、移动语义、智能指针与容器 | 27 | [cards.json](cpp-interview-foundations/cards.json) |
| Database System Concepts 第 15–16 章 | 查询执行、连接算法、统计估算与计划优化 | 27 | [cards.json](database-query-processing-optimization/cards.json) |
| Database System Concepts 第 18 章 | 锁协议、死锁、多粒度锁、时间戳排序、乐观验证与多版本读取 | 18 | [cards.json](database-concurrency-control/cards.json) |
| OSTEP 第 19–20 章 | TLB、虚拟地址转换与多级页表 | 21 | [cards.json](virtual-memory-translation-foundations/cards.json) |
| Crafting Interpreters 与 LLVM 官方文档 | 编译器前端、IR 与优化 | 25 | [cards.json](compiler-fundamentals/cards.json) |
| Stanford CS103 与 MIT OCW | 有限自动机、正则语言、P/NP 与计算复杂性 | 30 | [cards.json](theory-of-computation-foundations/cards.json) |
| x86-64 System V ABI、Linux syscall(2) 与 Microsoft x64 文档 | System V、Linux 系统调用与 Windows x64 调用约定 | 26 | [cards.json](amd64-abi-call-conventions-foundations/cards.json) |
| AWS VPC、IAM、Elastic Load Balancing 与 EC2 Auto Scaling 文档 | 云网络、身份权限、负载均衡与容量管理 | 25 | [cards.json](aws-cloud-networking-identity/cards.json) |
| RabbitMQ 官方 AMQP 与消息可靠性文档 | Exchange、队列、确认、TTL 与死信 | 25 | [cards.json](rabbitmq-messaging-foundations/cards.json) |
| C11 N1570 | C 语言链接、存储期、整数转换、表达式与常用标准库 | 30 | [cards.json](c11-language-semantics/cards.json) |
| Java SE 21 JLS 与标准库 API | 集合、泛型、异常、Stream 与语言特性 | 32 | [cards.json](java-language-collections-foundations/cards.json) |
| Java SE 21 JVMS / JLS 与 HotSpot 文档 | Java 虚拟机类加载、运行时数据区与执行机制 | 29 | [cards.json](java-vm-runtime-foundations/cards.json) |
| Oracle Java 26 Garbage Collection Tuning Guide | G1 回收目标、混合收集、并发标记与日志诊断 | 14 | [cards.json](java26-g1-gc-practice/cards.json) |
| Java SE 21 JLS 与 Object API | Java 并发、内存模型与对象契约 | 14 | [cards.json](java-concurrency-foundations/cards.json) |
| Oracle Java Tutorials / Refactoring.Guru / SOLID 资料 | 面向对象设计原则与 GoF 设计模式 | 27 | [cards.json](software-design-patterns-foundations/cards.json) |
| Refactoring.Guru、Martin Fowler 与 Java SE 21 | GoF 模式补齐、设计模式辨析、依赖注入和 Java 接口设计 | 21 | [cards.json](software-design-interview-expansion/cards.json) |
| PEGASUS 原论文 v2 | 摘要式预训练 | 8 | [cards.json](pegasus-gap-sentences/cards.json) |
| XLM-R 原论文 v2 | 多语言表示与迁移 | 7 | [cards.json](xlmr-crosslingual-representation/cards.json) |
| Vul-RAG 原论文 v3 | 漏洞知识检索 | 8 | [cards.json](vulrag-knowledge-vulnerability/cards.json) |
| CodeQL 官方文档 | 路径查询与数据流证据 | 6 | [cards.json](codeql-path-query-evidence/cards.json) |
| DeepDGA 原论文 v1 | 对抗域名生成与检测 | 7 | [cards.json](deepdga-adversarial-detection/cards.json) |
| YARA 4.4 官方文档 | Base64 与 XOR 字符串修饰符 | 8 | [cards.json](yara-base64-string-modifiers/cards.json) |
| MathWorks 官方文档 | 群体稳定性指数 | 7 | [cards.json](population-stability-index-monitoring/cards.json) |
| Java SE 21 API | ThreadPoolExecutor | 9 | [cards.json](java-threadpool-foundations/cards.json) |
| PostgreSQL 17 文档 | 部分索引 | 3 | [cards.json](postgresql-partial-index-foundations/cards.json) |
| RFC 5681 | TCP 拥塞控制 | 4 | [cards.json](tcp-congestion-control-rfc5681/cards.json) |
| Linux man-pages | waitpid 子进程状态选择 | 3 | [cards.json](linux-waitpid-selection/cards.json) |
| StatLect 统计教材 | 最大似然估计 | 8 | [cards.json](maximum-likelihood-foundations/cards.json) |
| ProbabilityCourse 教材 | 样本均值与极限定理 | 4 | [cards.json](sample-mean-limit-theorems/cards.json) |
| Graphplan 原论文 | 规划图与互斥 | 8 | [cards.json](graphplan-planning-graphs/cards.json) |
| Zeek 7.2.1 源码 | DNS 事务字段 | 6 | [cards.json](zeek-dns-transaction-fields/cards.json) |
| Microsoft 官方文档 | Windows 4688 进程审核 | 7 | [cards.json](windows-4688-process-audit/cards.json) |
| MITRE TRAM 固定提交 | 威胁报告到 ATT&CK 映射 | 4 | [cards.json](mitre-tram-attack-mapping/cards.json) |
| CALDERA 5.0 官方文档 | 对抗模拟基本对象 | 7 | [cards.json](caldera-emulation-fundamentals/cards.json) |
| NIST SP 800-94 | 蜜罐与入侵检测 | 3 | [cards.json](nist-honeypot-detection/cards.json) |
| AFLNet 固定提交 | 协议状态反馈与消息序列 | 7 | [cards.json](aflnet-protocol-state-fuzzing/cards.json) |
| Qdrant Python client 1.15.1 源码 | 向量检索与过滤 | 11 | [cards.json](qdrant-client-retrieval-practice/cards.json) |
| NannyML 0.13.1 文档 | 无标签分类性能估计 | 8 | [cards.json](cbpe-unlabeled-performance/cards.json) |
| G-Eval 原论文 v3 | 生成文本模型评审 | 6 | [cards.json](geval-llm-evaluation/cards.json) |
| ALCE 原论文 v2 | 引用质量评估 | 5 | [cards.json](alce-citation-evaluation/cards.json) |
| ARES 原论文 v2 | RAG 自动评估与置信区间 | 6 | [cards.json](ares-rag-evaluation/cards.json) |
| DINOv2 原论文 v2 | 视觉自监督表征 | 8 | [cards.json](dinov2-visual-self-supervision/cards.json) |
| UNB 官方说明 | ISCXVPN2016 流量数据 | 6 | [cards.json](iscxvpn2016-traffic-dataset/cards.json) |
| 维基百科与 NIST 算法词典 | 最长公共子序列与动态规划 | 8 | [cards.json](lcs-dynamic-programming/cards.json) |
| Princeton Algorithms | 最小生成树 | 8 | [cards.json](mst-graph-fundamentals/cards.json) |
| Linux man-pages | 时钟与耗时测量 | 8 | [cards.json](linux-clock-measurement/cards.json) |
| Python 3.14 文档 | unittest.mock 测试替身 | 10 | [cards.json](python-unittest-mock-practice/cards.json) |
| PostgreSQL 17 文档 | 事务错误与保存点恢复 | 3 | [cards.json](postgresql-savepoint-recovery/cards.json) |
| Python 3.14 文档 | heapq 优先队列 | 9 | [cards.json](python-heapq-practice/cards.json) |
| Python 3.14 文档 | 线程同步与队列 | 9 | [cards.json](python-threading-sync-practice/cards.json) |
| scikit-learn 1.7 文档 | Cohen 标注一致性 | 7 | [cards.json](sklearn-cohen-kappa-practice/cards.json) |
| Go 官方文档 | 原生模糊测试 | 7 | [cards.json](go-native-fuzzing-practice/cards.json) |
| GNU Binutils 2.45 文档 | ELF 检查与反汇编 | 5 | [cards.json](gnu-elf-inspection-practice/cards.json) |
| Ghidra 官方材料 | 静态反编译基础 | 7 | [cards.json](ghidra-reverse-engineering-basics/cards.json) |
| LangGraph Prebuilt 1.0.13 源码 | 工具节点 | 7 | [cards.json](langgraph-toolnode-practice/cards.json) |
| PyOD 2.0.5 源码 | KNN 异常检测 | 6 | [cards.json](pyod-knn-anomaly-practice/cards.json) |
| Wazuh 4.12 文档 | 规则关联与测试 | 7 | [cards.json](wazuh-rule-correlation-practice/cards.json) |
| RFC 6962 | 证书透明度 v1 | 6 | [cards.json](certificate-transparency-v1/cards.json) |
| Elkan 与 Noto 论文 | 正例与未标注样本学习 | 5 | [cards.json](positive-unlabeled-learning/cards.json) |
| scikit-learn 1.7 文档 | Brier 分数接口 | 4 | [cards.json](sklearn-brier-score-practice/cards.json) |
| Ubuntu 26.04 手册 | APT 与 dpkg 软件包管理 | 11 | [cards.json](debian-apt-dpkg-practice/cards.json) |
| OpenBSD 7.7 OpenSSH 手册 | 用户密钥与认证代理 | 10 | [cards.json](openssh-key-agent-practice/cards.json) |
| procps-ng 4.0.4 手册 | 进程查询与资源字段 | 12 | [cards.json](linux-process-query-practice/cards.json) |
| CMake 3.31 文档 | 配置与构建基础 | 12 | [cards.json](cmake-build-foundations/cards.json) |
| Berkeley CS188 教材 | 博弈搜索与剪枝 | 9 | [cards.json](agent-adversarial-game-search/cards.json) |
| Sutton 与 Barto 教材／百度面经主题延伸 | Sarsa 与双重 Q | 8 | [cards.json](sarsa-expected-double-q/cards.json) |
| scikit-learn 1.7.2 文档 | 部分依赖与个体曲线 | 9 | [cards.json](sklearn-pdp-ice-inspection/cards.json) |
| τ²-bench 论文 v1 | 双控制对话智能体评测 | 9 | [cards.json](tau2-dual-control-evaluation/cards.json) |
| CERT 官方说明 | 合成内部威胁测试数据 | 5 | [cards.json](cert-synthetic-insider-dataset/cards.json) |
| FuzzGPT 原论文 v1 | 历史缺陷引导生成 | 4 | [cards.json](fuzzgpt-history-guided-generation/cards.json) |
| Transformers 4.51.3 文档 | 分词批次与截断 | 9 | [cards.json](transformers-tokenizer-batching/cards.json) |
| Transformers 4.51.3 源码 | Trainer 评估与保存 | 11 | [cards.json](transformers-trainer-evaluation/cards.json) |
| PyTorch 2.7 文档 | 嵌入层与余弦相似度 | 7 | [cards.json](pytorch-embedding-cosine-contracts/cards.json) |
| Matryoshka 原论文 v2 | 可变维度表示 | 7 | [cards.json](matryoshka-variable-embeddings/cards.json) |
| rsLoRA 原论文 v1 | 秩与训练稳定性 | 2 | [cards.json](rslora-rank-stability/cards.json) |
| MalNet 原论文 v3 | 函数调用图数据 | 8 | [cards.json](malnet-function-call-graphs/cards.json) |
| VirusTotal 官方文档 | 文件沙箱行为 | 7 | [cards.json](virustotal-file-behaviour-fields/cards.json) |
| Git 2.53 文档 | 忽略规则与排查 | 11 | [cards.json](git-ignore-patterns-practice/cards.json) |
| OpenBSD 7.7 OpenSSH 手册 | SCP 与 SFTP 传输 | 8 | [cards.json](openssh-scp-sftp-practice/cards.json) |
| gRPC 官方指南 | 服务调用与期限 | 10 | [cards.json](grpc-service-fundamentals/cards.json) |
| PostgreSQL 17 文档 | 时间类型与时区 | 9 | [cards.json](postgresql-datetime-timezone/cards.json) |
| SQLAlchemy 2.0 文档 | 数据库连接池 | 9 | [cards.json](sqlalchemy-connection-pool/cards.json) |
| Princeton Algorithms | 哈希表与线性探测 | 6 | [cards.json](hash-table-collision-practice/cards.json) |
| pandas 2.3.3 文档 | 字符串筛选与提取 | 5 | [cards.json](pandas-string-extraction-practice/cards.json) |
| Option-Critic 论文 v2 | 时间抽象与技能 | 6 | [cards.json](option-critic-temporal-abstraction/cards.json) |
| Gorilla 论文 v1／字节面经主题延伸 | API 检索与调用 | 7 | [cards.json](gorilla-api-retrieval-agent/cards.json) |
| 能量分数论文 v2 | 分布外检测 | 7 | [cards.json](energy-ood-detection-evaluation/cards.json) |
| VulRepair 固定提交与研究 | 漏洞修复数据质量 | 4 | [cards.json](vulrepair-data-quality-study/cards.json) |
| AFL++ v4.21c 文档 | 自定义变异器 | 5 | [cards.json](afl-custom-mutator-lifecycle/cards.json) |
| TAXII 2.1 标准 | 集合增量与分页 | 6 | [cards.json](taxii-collection-pagination/cards.json) |
| Linux ACL 手册 | 访问控制列表 | 7 | [cards.json](linux-acl-permission-practice/cards.json) |
| Python 3.14 文档 | CSV 字典读写 | 5 | [cards.json](python-csv-dictionary-practice/cards.json) |
| NumPy 2.2 文档 | 随机抽样 | 6 | [cards.json](numpy-generator-choice-practice/cards.json) |
| SciPy 1.15.3 文档 | 稳健离散程度 | 5 | [cards.json](scipy-robust-dispersion-practice/cards.json) |
| SciPy 1.15.3 文档 | 时序峰值检测 | 7 | [cards.json](scipy-signal-peak-detection/cards.json) |
| Pillow 12.1.1 源码 | 图像预处理 | 7 | [cards.json](pillow-image-preprocessing/cards.json) |
| RFC 5424 | Syslog 安全日志 | 8 | [cards.json](rfc5424-syslog-telemetry/cards.json) |
| ToolEmu 论文 v2 | Agent 工具风险评估 | 6 | [cards.json](toolemu-agent-risk-evaluation/cards.json) |
| CISA SSVC 2022 指南 | 漏洞处置优先级 | 6 | [cards.json](cisa-ssvc-vulnerability-triage/cards.json) |
| BIND 9.20 文档 | dig DNS 查询 | 8 | [cards.json](dns-dig-query-practice/cards.json) |
| Python 3.14 文档 | 整数位运算 | 9 | [cards.json](bitwise-interview-fundamentals/cards.json) |
| GNU coreutils 手册 | timeout 超时控制 | 5 | [cards.json](gnu-timeout-command-practice/cards.json) |
| Bash 5.3 参考手册 | 错误处理 | 3 | [cards.json](bash-errexit-nounset-practice/cards.json) |
| OpenSSL 3.5 文档 | TLS 客户端诊断 | 7 | [cards.json](openssl-s-client-tls-diagnostics/cards.json) |
| scikit-learn 1.7 文档 | 时间序列交叉验证 | 4 | [cards.json](sklearn-time-series-split/cards.json) |
| Python 3.14 文档 | 摘要与 HMAC | 9 | [cards.json](python-hashlib-hmac/cards.json) |
| PyOD 2.0.5 源码 | HBOS 异常检测 | 6 | [cards.json](pyod-hbos-outlier-detection/cards.json) |
| IBM D2A 固定提交 | 差分漏洞数据 | 4 | [cards.json](d2a-differential-vulnerability-dataset/cards.json) |
| AndroZoo 官方资料 | Android 应用样本 | 6 | [cards.json](androzoo-android-app-dataset/cards.json) |
| AgentBoard 论文 v2／蚂蚁面经主题延伸 | Agent 进度评估 | 4 | [cards.json](agentboard-progress-evaluation/cards.json) |
| DDPM 原论文 v2 | 扩散模型基础 | 7 | [cards.json](ddpm-diffusion-foundations/cards.json) |
| Angora 原论文 v1 | 污点引导模糊测试 | 5 | [cards.json](angora-taint-guided-fuzzing/cards.json) |
| MISP Galaxy 固定提交 | JSON Schema | 4 | [cards.json](misp-galaxy-schema-practice/cards.json) |
| SciPy 1.15.3 官方文档 | LogSumExp 与数值稳定 | 6 | [cards.json](scipy-logsumexp-softmax/cards.json) |
| PyTorch 2.7 官方文档 | 二维最大池化 | 6 | [cards.json](pytorch-maxpool2d-practice/cards.json) |
| Transformers 4.51.3 源码 | 语言模型批次整理 | 7 | [cards.json](transformers-language-model-collation/cards.json) |
| LangChain 0.3.27 源码 | 嵌入缓存 | 8 | [cards.json](langchain-embedding-cache/cards.json) |
| SimCLR 原论文 v3／字节面经主题延伸 | 视觉对比学习 | 4 | [cards.json](simclr-visual-contrastive/cards.json) |
| Deep SAD 原论文 v2 | 半监督异常检测 | 5 | [cards.json](deep-sad-semisupervised-anomaly/cards.json) |
| Linux flock 手册 | 文件锁 | 6 | [cards.json](linux-flock-file-locking/cards.json) |
| RFC 6797 | HTTP HSTS 策略 | 8 | [cards.json](http-hsts-protocol/cards.json) |
| coverage.py 7.6.1 文档 | 分支覆盖与报告 | 8 | [cards.json](coverage-py-branch-analysis/cards.json) |
| Linux inotify 手册 | 文件变化通知 | 9 | [cards.json](linux-inotify-file-events/cards.json) |
| PostgreSQL 17 文档 | psql 命令行 | 7 | [cards.json](postgresql-psql-cli-practice/cards.json) |
| Python 3.14 与 pip 文档 | 虚拟环境及依赖 | 9 | [cards.json](python-venv-pip-practice/cards.json) |
| Python 3.14 文档 | JSON 编解码 | 8 | [cards.json](python-json-serialization/cards.json) |
| pandas 2.2.3 文档 | 合并键与来源 | 6 | [cards.json](pandas-merge-key-practice/cards.json) |
| Pydantic 2.12 文档 | 模型与校验器 | 10 | [cards.json](pydantic-v2-validation/cards.json) |
| scikit-learn 1.7 文档 | 聚类评估指标 | 9 | [cards.json](sklearn-clustering-evaluation/cards.json) |
| LoRA-FA 原论文 v3／快手面经主题延伸 | 固定投影与内存 | 4 | [cards.json](lora-fa-fixed-matrix/cards.json) |
| CIC 官方数据集说明 | CICIoT2023 | 3 | [cards.json](ciciot2023-security-dataset/cards.json) |
| Requests 2.32.5 文档与源码 | HTTP 请求与会话 | 13 | [cards.json](python-requests-http-practice/cards.json) |
| Git 2.46 文档 | 子模块 | 9 | [cards.json](git-submodule-fundamentals/cards.json) |
| Git 2.46 文档 | 多工作树 | 7 | [cards.json](git-worktree-practice/cards.json) |
| RHEL 9 文档 | Linux Audit 日志字段 | 7 | [cards.json](linux-audit-log-analysis/cards.json) |
| PyOD 2.0.5 源码 | COPOD 异常评分 | 3 | [cards.json](pyod-copod-usage/cards.json) |
| Vul4J 固定提交 | Java 漏洞与补丁评估 | 4 | [cards.json](vul4j-java-vulnerability-benchmark/cards.json) |
| UCI 数据集说明 | PhiUSIIL 钓鱼 URL | 2 | [cards.json](phiusiil-phishing-dataset/cards.json) |
| Plan-and-Solve 原论文 v3 | 计划提示与错误类型 | 2 | [cards.json](plan-and-solve-prompting/cards.json) |
| MT-Bench 原论文 v3 | 多轮对话与模型评审 | 2 | [cards.json](mt-bench-llm-judge/cards.json) |
| SciPy 1.15.3 官方文档 | 独立与配对 t 检验 | 8 | [cards.json](scipy-independent-paired-t-tests/cards.json) |
| SciPy 1.15.3 官方文档 | Shapiro 正态性检验 | 3 | [cards.json](scipy-shapiro-normality/cards.json) |
| pandas 2.2.3 官方文档 | 时间近邻合并 | 7 | [cards.json](pandas-asof-time-alignment/cards.json) |
| pandas 2.2.3 官方文档 | 日期时间解析 | 6 | [cards.json](pandas-datetime-parsing/cards.json) |
| scikit-learn 1.7 官方文档 | K 近邻分类接口 | 7 | [cards.json](sklearn-knn-classification/cards.json) |
| PyTorch 2.7 官方文档 | AdamW 优化器 | 6 | [cards.json](pytorch-adamw-optimizer/cards.json) |
| LoRA+ 原论文 v2／快手面经主题延伸 | 矩阵学习率与前向缩放 | 3 | [cards.json](lora-plus-learning-rates/cards.json) |
| langchain-core 1.8.4 固定版本源码 | 聊天模型结构化输出 | 4 | [cards.json](langchain-model-structured-output/cards.json) |
| Linux proc 手册 | 进程信息与文件描述符 | 9 | [cards.json](linux-proc-process-inspection/cards.json) |
| XLNet 原论文 v2 | 排列语言建模 | 7 | [cards.json](xlnet-permutation-pretraining/cards.json) |
| HotpotQA 原论文 v1 | 多跳问答与支持事实 | 6 | [cards.json](hotpotqa-multihop-evaluation/cards.json) |
| RAP 原论文 v2 | 世界模型与规划 | 4 | [cards.json](rap-world-model-planning/cards.json) |
| ReVeal 原论文 v1 | 代码图与漏洞检测 | 4 | [cards.json](reveal-code-graph-detection/cards.json) |
| Fuzzilli 固定提交 | JavaScript 引擎模糊测试 | 7 | [cards.json](fuzzilli-javascript-intermediate/cards.json) |
| YARA 4.4 官方文档 | 条件与字节表达式 | 7 | [cards.json](yara-condition-operators/cards.json) |
| ThreatFox Community API 文档 | 威胁指标查询 | 6 | [cards.json](threatfox-ioc-api/cards.json) |
| Volatility 3 v2.26.2 文档 | Linux 内存调查 | 7 | [cards.json](volatility3-linux-memory/cards.json) |
| AST 原论文 v1 | 音频频谱 Transformer | 7 | [cards.json](audio-spectrogram-transformer/cards.json) |
| GNU join／paste／comm／tr 手册 | 文本合并与比较 | 8 | [cards.json](gnu-text-join-compare/cards.json) |
| Cronie crontab 和 cron 手册 | Linux 定时任务 | 10 | [cards.json](linux-cron-scheduling/cards.json) |
| Linux 用户与凭据手册 | 用户与进程身份 | 9 | [cards.json](linux-user-identity/cards.json) |
| Linux 环境与资源限制手册 | 环境变量与资源上限 | 9 | [cards.json](linux-environment-resource-limits/cards.json) |
| Linux select／poll／epoll 手册 | I/O 多路复用 | 8 | [cards.json](linux-select-poll-io/cards.json) |
| GNU diff 与 patch 手册 | 文件差异与补丁 | 9 | [cards.json](gnu-diff-patch-practice/cards.json) |
| scikit-learn 1.7 官方文档 | 哈希文本向量化 | 7 | [cards.json](sklearn-hashing-vectorizer/cards.json) |
| scikit-learn 1.7 文档与 1.7.2 源码 | 直方图梯度提升 | 8 | [cards.json](sklearn-hist-gradient-boosting/cards.json) |
| PyTorch 2.7 文档 | 参数初始化 | 6 | [cards.json](pytorch-parameter-initialization/cards.json) |
| IA³ 原论文 v2 | 激活缩放与参数高效微调 | 6 | [cards.json](ia3-activation-adaptation/cards.json) |
| langchain-core 1.8.4 源码 | 历史消息包装器与弃用状态 | 7 | [cards.json](langchain-runnable-message-history/cards.json) |
| LATS 原论文 v3 | 语言智能体搜索与反思 | 4 | [cards.json](lats-search-reflection/cards.json) |
| Loghub HDFS 固定提交 | 数据版本与标注差异 | 5 | [cards.json](loghub-hdfs-data-variants/cards.json) |
| Extended Isolation Forest 原论文 v3 | 随机超平面异常检测 | 5 | [cards.json](extended-isolation-forest/cards.json) |
| MLflow 3.1 官方文档 | 实验运行与记录 | 7 | [cards.json](mlflow-experiment-tracking/cards.json) |
| SciPy 1.15.3 官方文档 | Mann–Whitney U 检验 | 8 | [cards.json](scipy-mann-whitney-u/cards.json) |
| Python 3.14 官方文档 | 多进程与进程池 | 12 | [cards.json](python-multiprocessing-practice/cards.json) |
| BART 原论文 v1 | 去噪预训练结构 | 5 | [cards.json](bart-denoising-architecture/cards.json) |
| ALFWorld 原论文 v2 | 文本与具身智能体 | 7 | [cards.json](alfworld-agent-transfer/cards.json) |
| MSR 2020 数据集固定提交 | C/C++ 漏洞代码标签 | 5 | [cards.json](msr20-code-vulnerability-dataset/cards.json) |
| AFLGo 原论文 | 定向灰盒模糊测试 | 6 | [cards.json](aflgo-directed-greybox/cards.json) |
| OpenCTI 官方文档 | 情报图谱与导入导出 | 7 | [cards.json](opencti-knowledge-ingestion/cards.json) |
| Elastic Common Schema 8.17 | 事件字段与调查 | 9 | [cards.json](elastic-ecs-event-analysis/cards.json) |
| LAION CLAP 原论文 v2 | 音频文本对比学习 | 5 | [cards.json](clap-audio-text-contrastive/cards.json) |
| Redis 文档与 7.2.7 源码 | Streams 与消费组 | 12 | [cards.json](redis-streams-consumer-groups/cards.json) |
| MySQL 8.4 官方文档 | InnoDB 日志与恢复 | 11 | [cards.json](mysql-logging-recovery/cards.json) |
| RFC 9293 与 Linux 手册 | TCP 保活与小包 | 8 | [cards.json](tcp-keepalive-small-packets/cards.json) |
| Bash 手册 | 参数展开与数组 | 12 | [cards.json](bash-expansion-array-practice/cards.json) |
| GNU 命令手册 | 输出与统计命令 | 6 | [cards.json](gnu-output-command-practice/cards.json) |
| PostgreSQL 17 官方文档 | SQL 空值与模式匹配 | 7 | [cards.json](postgresql-null-logic-patterns/cards.json) |
| LightGBM 4.6 文档与原论文 | 树学习 | 8 | [cards.json](lightgbm-tree-learning/cards.json) |
| LightGBM 4.6 官方文档 | 分类器接口 | 7 | [cards.json](lightgbm-classifier-practice/cards.json) |
| PyTorch 2.7 官方文档 | 交叉熵形状与归约 | 4 | [cards.json](pytorch-cross-entropy-shapes/cards.json) |
| PiSSA 原论文 v2 | 低秩初始化 | 3 | [cards.json](pissa-low-rank-initialization/cards.json) |
| Transformers 4.51.3 文档与源码 | bitsandbytes 量化配置 | 6 | [cards.json](bitsandbytes-quantization-config/cards.json) |
| E5 原论文 v2 | 文本嵌入 | 5 | [cards.json](e5-embedding-pretraining/cards.json) |
| datasketch 1.6.5 源码 | MinHash 近似集合检索 | 8 | [cards.json](minhash-jaccard-retrieval/cards.json) |
| Salesforce JA3 固定提交 | TLS 客户端指纹 | 5 | [cards.json](ja3-client-fingerprint/cards.json) |
| USAD 作者固定提交 | 重建异常检测实现 | 6 | [cards.json](usad-reference-model/cards.json) |
| capa v9.3.0 官方说明 | 程序能力分析 | 6 | [cards.json](capa-capability-analysis/cards.json) |
| NannyML 0.13.1 官方文档 | Hellinger 分布距离 | 4 | [cards.json](hellinger-drift-distance/cards.json) |
| Python 3.14 文档 | sqlite3 数据库接口 | 13 | [cards.json](python-sqlite3-database/cards.json) |
| MTEB 原论文 v2 | 文本嵌入评估 | 6 | [cards.json](mteb-embedding-evaluation/cards.json) |
| MetaGPT 原论文 v2 | 角色与结构化协作 | 3 | [cards.json](metagpt-role-collaboration/cards.json) |
| Mind2Web 原论文 v2 | 网页操作离线评测 | 9 | [cards.json](mind2web-offline-evaluation/cards.json) |
| ChatAFL 原论文 | 协议模糊测试 | 8 | [cards.json](chatafl-protocol-fuzzing/cards.json) |
| MISP 3.0_wip 文档 | 指标警告列表 | 7 | [cards.json](misp-warninglist-triage/cards.json) |
| Elastic Security 8.17 文档 | 阈值与指标匹配规则 | 8 | [cards.json](elastic-threshold-rule-practice/cards.json) |
| DETR 原论文 v3 | 集合预测目标检测 | 8 | [cards.json](detr-object-detection/cards.json) |
| Guo 等原论文 v2 | 温度缩放与概率校准 | 4 | [cards.json](temperature-scaling-calibration/cards.json) |
| Focal Loss 原论文与 torchvision 0.22 | 检测损失与接口 | 6 | [cards.json](focal-loss-training-details/cards.json) |
| PyTorch 2.7 官方文档 | 插值接口与适用条件 | 5 | [cards.json](pytorch-interpolate-practice/cards.json) |
| Longformer 原论文 v2 | 局部与全局注意力 | 6 | [cards.json](longformer-attention-foundations/cards.json) |
| DeBERTa 原论文 v6 | 解耦注意力与掩码解码 | 4 | [cards.json](deberta-disentangled-attention/cards.json) |
| DPO 原论文 v3 | 偏好目标与梯度 | 5 | [cards.json](dpo-preference-objective/cards.json) |
| AWS 官方文档 | VPC 流日志字段与限制 | 5 | [cards.json](aws-vpc-flow-log-fields/cards.json) |
| TranAD 原论文 v6 | 时序异常与自条件化 | 5 | [cards.json](tranad-self-conditioning/cards.json) |
| pefile 使用文档 | PE 静态解析 | 6 | [cards.json](pefile-static-parsing/cards.json) |
| VulBERTa 原论文 v1 | 代码分词与漏洞检测 | 4 | [cards.json](vulberta-code-pretraining/cards.json) |
| U-Net 原论文 v1 | 图像分割与边界处理 | 5 | [cards.json](unet-biomedical-segmentation/cards.json) |
| GNU coreutils 手册 | 排序与去重 | 7 | [cards.json](gnu-sort-uniq-practice/cards.json) |
| POSIX awk 手册 | 字段与记录处理 | 8 | [cards.json](posix-awk-processing/cards.json) |
| GNU／POSIX sed 手册 | 过滤与替换 | 5 | [cards.json](gnu-sed-substitution/cards.json) |
| OpenSSH 客户端手册 | 远程连接与端口转发 | 11 | [cards.json](openssh-client-practice/cards.json) |
| rsync 官方手册 | 文件同步 | 9 | [cards.json](rsync-file-sync/cards.json) |
| PostgreSQL 17 官方文档 | JSON 数据、操作符与索引 | 12 | [cards.json](postgresql-jsonb-practice/cards.json) |
| Redis 官方文档 | RDB 与 AOF 持久化 | 6 | [cards.json](redis-persistence-practice/cards.json) |
| QEMU 官方文档 | 虚拟机与系统仿真 | 4 | [cards.json](qemu-virtualization-foundations/cards.json) |
| ProbabilityCourse 与 NIST | 指数分布与等待时间 | 7 | [cards.json](exponential-waiting-times/cards.json) |
| SciPy 1.15.3 官方文档 | Wilcoxon 配对检验 | 8 | [cards.json](scipy-wilcoxon-paired-test/cards.json) |
| SayCan 原论文 v2 | 技能规划与可行性 | 7 | [cards.json](saycan-grounded-agent/cards.json) |
| DSPy 原论文 v1 | 模块化程序与优化 | 7 | [cards.json](dspy-program-compilation/cards.json) |
| AFLFast 原论文 | 模糊测试能量调度 | 3 | [cards.json](aflfast-power-schedules/cards.json) |
| FairFuzz 原论文 v1 | 稀有分支与变异 | 7 | [cards.json](fairfuzz-rare-branch/cards.json) |
| Microsoft Sentinel 官方文档 | ASIM 日志归一化 | 7 | [cards.json](sentinel-asim-normalization/cards.json) |
| Huet 等原论文 v1 | 异常事件关联指标 | 7 | [cards.json](affiliation-anomaly-evaluation/cards.json) |
| GNU GDB 官方手册 | 程序调试基础 | 11 | [cards.json](gdb-debugging-foundations/cards.json) |
| Python 3.14 文档 | argparse 命令行参数 | 11 | [cards.json](python-argparse-cli/cards.json) |
| Python 3.14 文档 | 性能分析与计时 | 8 | [cards.json](python-profiling-timeit/cards.json) |
| curl 官方手册 | HTTP 请求与调试 | 9 | [cards.json](curl-http-debug-practice/cards.json) |
| Docker Compose 官方文档 | 多服务开发 | 9 | [cards.json](docker-compose-development/cards.json) |
| Python 3.14 文档 | pathlib 路径处理 | 9 | [cards.json](python-pathlib-practice/cards.json) |
| LangChain Text Splitters 0.3.8 源码 | 文档切分 | 9 | [cards.json](langchain-text-splitting-practice/cards.json) |
| jq 1.8 官方手册 | JSON 命令行处理 | 11 | [cards.json](jq-json-command-practice/cards.json) |
| RFC 9110 | HTTP 内容协商 | 8 | [cards.json](http-content-negotiation/cards.json) |
| PostgreSQL 17 官方文档 | 写入冲突与集合查询 | 10 | [cards.json](postgresql-upsert-set-operations/cards.json) |
| ISTQB CTFL 4.0.1 | 软件测试设计 | 8 | [cards.json](istqb-test-design-fundamentals/cards.json) |
| GNU Make 4.4.1 手册 | 增量构建 | 9 | [cards.json](gnu-make-incremental-build/cards.json) |
| CP-Algorithms | 最长递增子序列 | 5 | [cards.json](lis-algorithm-foundations/cards.json) |
| SciPy 1.15.3 官方文档 | 多元正态分布 | 7 | [cards.json](scipy-multivariate-normal/cards.json) |
| scikit-learn 1.7.2 官方文档与源码 | 随机参数搜索 | 9 | [cards.json](sklearn-randomized-search/cards.json) |
| ALBERT 原论文 | 参数共享与 SOP | 4 | [cards.json](albert-parameter-sharing/cards.json) |
| SpanBERT 原论文 | 片段预训练 | 5 | [cards.json](spanbert-span-boundaries/cards.json) |
| LLMLingua 原论文 | 提示压缩 | 8 | [cards.json](llmlingua-prompt-compression/cards.json) |
| DQN 原论文 | 经验回放与目标网络 | 8 | [cards.json](dqn-experience-replay/cards.json) |
| Hypothesis 6.100.0 文档 | 性质测试 | 8 | [cards.json](hypothesis-property-fuzzing/cards.json) |
| Velociraptor VQL 固定提交 | 调查查询 | 8 | [cards.json](velociraptor-vql-investigation/cards.json) |
| Koide 等钓鱼网页研究 | 语言模型与网页分析 | 6 | [cards.json](chatgpt-phishing-website-study/cards.json) |
| ProbabilityCourse 教材 | 条件期望与方差 | 8 | [cards.json](conditional-expectation-variance/cards.json) |
| PyTorch 2.7 官方文档 | 二维卷积接口 | 9 | [cards.json](pytorch-conv2d-practice/cards.json) |
| Lewis 等 RAG 原论文 v4 | 潜在文档与边缘化 | 8 | [cards.json](rag-original-latent-documents/cards.json) |
| CSE-CIC-IDS2018 官方说明 | 网络安全数据 | 5 | [cards.json](cse-cic-ids2018-dataset/cards.json) |
| py-tree-sitter 0.24.0 文档 | 代码语法解析 | 8 | [cards.json](tree-sitter-code-parsing/cards.json) |
| ATT&CK Navigator 5.1 图层格式 4.5 | 技术图层与标注 | 9 | [cards.json](attack-navigator-layer-format/cards.json) |
| Zeek 6.0.9 官方文档 | Weird 记录与处理 | 8 | [cards.json](zeek-weird-analysis/cards.json) |
| Geifman 与 El-Yaniv 原论文 v2 | 选择性分类与风险覆盖 | 6 | [cards.json](selective-classification-risk-coverage/cards.json) |
| scikit-learn 1.7.2 源码 | 分类阈值调优 | 10 | [cards.json](sklearn-decision-threshold-tuning/cards.json) |
| RoBERTa 原论文 v1 | 预训练策略 | 8 | [cards.json](roberta-pretraining-details/cards.json) |
| GraphSAGE 原论文 v4 | 采样与聚合 | 5 | [cards.json](graphsage-inductive-sampling/cards.json) |
| Graph of Thoughts 原论文 v2 | 图结构推理 | 6 | [cards.json](graph-of-thoughts-reasoning/cards.json) |
| Transformers 4.51.3 源码 | 文本生成 Pipeline | 8 | [cards.json](hf-text-generation-pipeline/cards.json) |
| SmoothQuant 原论文 v3 | 激活与权重量化 | 8 | [cards.json](smoothquant-activation-quantization/cards.json) |
| Clang 20.1 官方文档 | ASan 与 UBSan 诊断 | 8 | [cards.json](clang-asan-ubsan-fuzzing/cards.json) |
| Guha 等 2016 原论文 | 鲁棒随机切分森林 | 6 | [cards.json](robust-random-cut-forest/cards.json) |
| YARA 4.4 官方文档 | Python 规则扫描 | 9 | [cards.json](yara-python-scanning/cards.json) |
| GNU grep 手册 | 文本搜索与排障 | 12 | [cards.json](gnu-grep-search-practice/cards.json) |
| tcpdump 与 libpcap 手册 | 抓包与过滤 | 10 | [cards.json](tcpdump-packet-capture-practice/cards.json) |
| RFC 768、792、1191 与 8085 | UDP 与 ICMP | 9 | [cards.json](udp-icmp-protocol-practice/cards.json) |
| RFC 2308 | DNS 负缓存 | 6 | [cards.json](dns-negative-cache-practice/cards.json) |
| PostgreSQL 17 官方文档 | 游标式分页 | 7 | [cards.json](postgresql-keyset-pagination/cards.json) |
| Redis 官方文档 | SCAN 与管线 | 10 | [cards.json](redis-scan-pipelining-practice/cards.json) |
| Kudo 2018 原论文 | Unigram 子词分词 | 7 | [cards.json](unigram-subword-segmentation/cards.json) |
| MemGPT 原论文 v2 | 分层上下文与记忆 | 7 | [cards.json](memgpt-context-management/cards.json) |
| tldextract 5.3.0 文档 | 公共后缀与网址特征 | 5 | [cards.json](tldextract-public-suffix-analysis/cards.json) |
| LLMSecEval 固定提交 | 安全代码生成评测 | 7 | [cards.json](llmseceval-secure-code-benchmark/cards.json) |
| MITRE CAPEC 数据 3.9 与模式 3.5 | 攻击模式结构 | 8 | [cards.json](capec-attack-pattern-schema/cards.json) |
| Prometheus 3.5.0 官方文档 | PromQL 监控查询 | 10 | [cards.json](prometheus-promql-monitoring/cards.json) |
| SciPy 1.15.3 官方文档 | Bootstrap 置信区间 | 7 | [cards.json](scipy-bootstrap-intervals/cards.json) |
| Hugging Face Datasets 3.6.0 文档与源码 | 数据集变换 | 8 | [cards.json](hf-datasets-transform-practice/cards.json) |
| scikit-learn 1.7.2 文档与源码 | 学习曲线与模型诊断 | 8 | [cards.json](sklearn-learning-curves/cards.json) |
| Captum 0.8.0 源码与积分梯度论文 | 积分梯度模型解释 | 9 | [cards.json](captum-integrated-gradients/cards.json) |
| LangChain 0.3.27 源码 | 自查询检索 | 8 | [cards.json](langchain-self-query-retrieval/cards.json) |
| Suricata 8.0.1 官方文档 | 流状态关联 | 8 | [cards.json](suricata-flow-state-rules/cards.json) |
| LLVM 20.1 官方文档 | libFuzzer 字典与执行次数 | 2 | [cards.json](libfuzzer-dictionary-feedback/cards.json) |
| RFC 3022 | 网络地址转换与端口映射 | 8 | [cards.json](network-address-translation/cards.json) |
| RFC 9110、Nginx 与 MDN 文档 | HTTP 代理与网关 | 6 | [cards.json](http-proxy-gateway-fundamentals/cards.json) |
| Linux strace 与 lsof 手册 | 进程与文件排障 | 9 | [cards.json](linux-strace-lsof-troubleshooting/cards.json) |
| GNU Coreutils 与 util-linux 手册 | 磁盘与挂载排查 | 7 | [cards.json](linux-disk-mount-diagnostics/cards.json) |
| OI Wiki | 单调栈与滑动窗口 | 8 | [cards.json](monotonic-stack-window-algorithms/cards.json) |
| PostgreSQL 17 官方文档 | SQL 子查询与存在性判断 | 7 | [cards.json](postgresql-subquery-interview/cards.json) |
| SciPy 1.15.3 文档 | Jensen–Shannon 距离 | 6 | [cards.json](jensen-shannon-distance/cards.json) |
| scikit-learn 1.7.2 官方文档 | ColumnTransformer 特征处理 | 9 | [cards.json](sklearn-column-transformer-practice/cards.json) |
| PyTorch 2.7.1 官方文档 | 函数式自动微分 | 9 | [cards.json](pytorch-func-differentiation/cards.json) |
| Sentence Transformers 5.1.2 源码 | CrossEncoder 重排 | 7 | [cards.json](cross-encoder-reranking-practice/cards.json) |
| Gymnasium 1.1.1 官方文档 | 回合终止与截断 | 9 | [cards.json](gymnasium-episode-boundaries/cards.json) |
| Whisper 原论文 | 语音识别训练与推理 | 7 | [cards.json](whisper-speech-training-inference/cards.json) |
| Zeek 6.0.9 官方文档 | TLS 遥测字段与证书验证 | 8 | [cards.json](zeek-tls-telemetry-fields/cards.json) |
| OmniAnomaly 固定提交源码 | 时序异常分数与评估 | 5 | [cards.json](omnianomaly-model-evaluation/cards.json) |
| LLVM 20.1 官方文档 | libFuzzer 语料与产物 | 6 | [cards.json](libfuzzer-corpus-management/cards.json) |
| Package-URL v1.1.1 规范 | 软件包漏洞情报标识 | 10 | [cards.json](package-url-vulnerability-identity/cards.json) |
| Microsoft Kusto 官方文档 | 安全事件连接与时间窗口 | 6 | [cards.json](kusto-security-event-joins/cards.json) |
| Kim 等人原论文 v2 | 时序异常点调整评估 | 5 | [cards.json](point-adjust-anomaly-evaluation/cards.json) |
| PyTorch 2.7 官方文档 | 缩放点积注意力接口 | 5 | [cards.json](pytorch-sdpa-attention-practice/cards.json) |
| ELECTRA 原论文 v1 | 替换词检测预训练 | 5 | [cards.json](electra-pretraining-foundations/cards.json) |
| CodeAct 原论文 v2 | 可执行代码动作 | 4 | [cards.json](codeact-agent-framework/cards.json) |
| CodeAct 原论文 v2 | M3 ToolEval 多工具评测 | 1 | [cards.json](m3-tooleval-agent-benchmark/cards.json) |
| MINT 原论文 v3 | 多轮工具与反馈评测 | 9 | [cards.json](mint-multiturn-agent-evaluation/cards.json) |
| Phishpedia 原论文 | 视觉品牌识别 | 6 | [cards.json](phishpedia-visual-identification/cards.json) |
| LineVul 固定提交源码 | 函数分类与行级定位 | 7 | [cards.json](linevul-function-line-evaluation/cards.json) |
| RFC 4632 与 RFC 3021 | IPv4 子网计算 | 8 | [cards.json](ipv4-subnet-practice/cards.json) |
| Open Data Structures 与 Floyd 判环 | 链表常见算法 | 9 | [cards.json](linked-list-interview-practice/cards.json) |
| Algorithms for Competitive Programming | KMP 字符串匹配 | 6 | [cards.json](kmp-string-matching-foundations/cards.json) |
| PostgreSQL 17 官方文档 | SQL 分组与聚合实践 | 8 | [cards.json](postgresql-aggregate-interview/cards.json) |
| Practical Test Pyramid 与 coverage.py 文档 | 软件测试与质量 | 11 | [cards.json](software-testing-foundations/cards.json) |
| AWQ 与 GPTQ 原论文 | 大模型权重量化 | 12 | [cards.json](awq-gptq-weight-quantization/cards.json) |
| LangChain 0.3.27 固定提交源码 | 多查询与上下文压缩 | 9 | [cards.json](langchain-query-compression/cards.json) |
| BFCL v1/v3 官方说明 | 函数调用评测 | 10 | [cards.json](berkeley-function-calling-evaluation/cards.json) |
| LiveCodeBench 原论文 v2 | 代码模型持续评估 | 7 | [cards.json](livecodebench-evaluation/cards.json) |
| PyTorch 2.7.1 官方源码 | 数据采样与批次 | 10 | [cards.json](pytorch-sampling-practice/cards.json) |
| scikit-learn 1.7.2 文档与源码 | 交叉验证置换检验 | 7 | [cards.json](sklearn-permutation-score/cards.json) |
| Suricata 8.0.1 文档与源码 | 规则告警阈值 | 8 | [cards.json](suricata-rule-thresholding/cards.json) |
| Clang 20.1 文档 | SanitizerCoverage 插桩 | 8 | [cards.json](clang-sanitizer-coverage/cards.json) |
| Sutton 与 Barto 第 2 版教材 | 多臂老虎机与探索 | 7 | [cards.json](bandit-exploration-foundations/cards.json) |
| GNU findutils 手册 | Linux 文件查找与批处理 | 11 | [cards.json](gnu-find-xargs-practice/cards.json) |
| Dockerfile 官方参考 | 容器镜像构建 | 11 | [cards.json](dockerfile-build-foundations/cards.json) |
| PostgreSQL 17 官方文档 | 查询执行计划 | 9 | [cards.json](postgresql-explain-practice/cards.json) |
| RFC 2018 与 RFC 6298 | TCP 确认与重传计时 | 6 | [cards.json](tcp-sack-retransmission/cards.json) |
| Python 3.12 官方文档 | 子进程与命令执行 | 9 | [cards.json](python-subprocess-foundations/cards.json) |
| HuggingGPT 原论文 v1 | 专家模型协作 | 7 | [cards.json](hugginggpt-model-orchestration/cards.json) |
| WebShop 原论文 v1 | 网页智能体评测 | 9 | [cards.json](webshop-agent-benchmark/cards.json) |
| OSWorld 原论文 v1 | 计算机操作评测 | 5 | [cards.json](osworld-desktop-agent-benchmark/cards.json) |
| NeuralLog 原论文 v1 | 日志语义异常检测 | 7 | [cards.json](neurallog-semantic-anomaly/cards.json) |
| AVclass2 原论文与 AVClass 2.8.10 | 恶意软件标签归一化 | 9 | [cards.json](avclass-malware-label-normalization/cards.json) |
| BERTScore 原论文与 0.3.13 实现 | 文本生成评估 | 7 | [cards.json](bertscore-text-generation-evaluation/cards.json) |
| vLLM 0.9.2 文档与源码 | 前缀缓存 | 9 | [cards.json](vllm-prefix-cache/cards.json) |
| TruthfulQA 原论文 v1 | 模型真实性评测 | 9 | [cards.json](truthfulqa-benchmark/cards.json) |
| COCO 官方 Python API 固定提交 | 目标检测评估 | 9 | [cards.json](coco-detection-evaluation/cards.json) |
| OpenVEX 0.2.0 规范 | 漏洞影响状态 | 8 | [cards.json](openvex-vulnerability-status/cards.json) |
| OASIS SARIF 2.1.0 | 静态分析结果交换 | 7 | [cards.json](sarif-static-analysis-results/cards.json) |
| AFL++ 固定提交文档 | 持久化测试入口 | 5 | [cards.json](afl-persistent-harness/cards.json) |
| procps-ng 4.0.4 系统手册 | Linux 内存与负载监控 | 11 | [cards.json](linux-resource-monitoring/cards.json) |
| Database System Concepts 第 7 版与 IBM/Microsoft 文档 | 关系数据库范式与设计 | 13 | [cards.json](relational-database-normalization/cards.json) |
| Open Data Structures 与 MIT 6.006 | 算法复杂度基础 | 16 | [cards.json](algorithm-complexity-foundations/cards.json) |
| RFC 1034 | DNS 分层解析与委派 | 5 | [cards.json](dns-resolution-delegation/cards.json) |
| RFC 9111 与 RFC 9110 | HTTP 缓存与条件请求 | 8 | [cards.json](http-cache-validation-fundamentals/cards.json) |
| Python 3.12 标准库 | 线程池与 Future | 13 | [cards.json](python-futures-executors/cards.json) |
| scikit-learn 1.7 官方文档 | 概率校准接口 | 12 | [cards.json](sklearn-probability-calibration/cards.json) |
| PyTorch 2.7 官方文档 | 常用损失函数 | 8 | [cards.json](pytorch-common-loss-functions/cards.json) |
| Stratosphere IoT-23 官方说明 | 物联网安全流量数据 | 10 | [cards.json](iot23-network-dataset/cards.json) |
| OpenTelemetry 1.40 规范 | 指标采集与服务监控 | 10 | [cards.json](opentelemetry-metrics-monitoring/cards.json) |
| LangChain 0.3.27 固定提交 | 父子文档检索 | 12 | [cards.json](langchain-parent-document-retrieval/cards.json) |
| DoRA 原论文 v2 与 PEFT 0.17 | 权重分解与训练 | 9 | [cards.json](dora-weight-decomposition/cards.json) |
| Self-Ask 原论文 v2 | 追问与组合推理 | 5 | [cards.json](self-ask-compositional-reasoning/cards.json) |
| statsmodels 0.14.4 | McNemar 成对分类检验 | 7 | [cards.json](mcnemar-paired-classification/cards.json) |
| seqeval 1.2.2 固定提交 | 序列标注与实体指标 | 5 | [cards.json](seqeval-entity-metrics/cards.json) |
| MITRE ATT&CK v18 文档 | 检测策略与分析项 | 5 | [cards.json](mitre-attack-detection-strategies/cards.json) |
| C11 N1570 与 Linux 手册 | C 指针与动态内存 | 14 | [cards.json](c-memory-pointer-fundamentals/cards.json) |
| RFC 9110 | HTTP 状态码与范围请求 | 13 | [cards.json](http-status-range-fundamentals/cards.json) |
| GNU tar 与 gzip 手册 | Linux 归档与压缩 | 10 | [cards.json](gnu-tar-gzip-commands/cards.json) |
| Open Data Structures 与 Cornell 课程 | 二叉树遍历 | 7 | [cards.json](binary-tree-traversal-fundamentals/cards.json) |
| PostgreSQL 17 官方文档 | SQL 视图与 CTE | 9 | [cards.json](postgresql-views-cte-foundations/cards.json) |
| Falco 规则文档固定版本 | 安全规则与例外 | 12 | [cards.json](falco-rule-authoring/cards.json) |
| imbalanced-learn 0.14.2 | SMOTE 过采样 | 9 | [cards.json](smote-oversampling-practice/cards.json) |
| SQuAD 2.0 论文与评分脚本 | 无答案问答评测 | 8 | [cards.json](squad-v2-evaluation/cards.json) |
| E-PhishGEN 原论文 v1 | 合成钓鱼邮件评测 | 6 | [cards.json](ephishgen-dataset-evaluation/cards.json) |
| LogGPT 原论文 v1 | 日志序列异常检测 | 5 | [cards.json](loggpt-sequence-detection/cards.json) |
| MegaVul 原论文 v1 | 漏洞代码数据构建 | 6 | [cards.json](megavul-dataset-construction/cards.json) |
| Python 3.12 官方文档 | 异常组与 except* | 12 | [cards.json](python-exception-groups/cards.json) |
| SciPy 1.15.3 官方文档 | 列联表与统计检验 | 10 | [cards.json](contingency-statistical-tests/cards.json) |
| NVD CVE API 文档及模式 | 漏洞情报接口与适用条件 | 12 | [cards.json](nvd-cve-api-practice/cards.json)；[模式快照](nvd-cve-api-practice/模式快照.md) |
| ClusterFuzzLite 固定版本 | CI 模糊测试 | 9 | [cards.json](clusterfuzzlite-ci-fuzzing/cards.json) |
| wav2vec 2.0 原论文 v3 | 语音自监督预训练 | 8 | [cards.json](wav2vec2-pretraining-detail/cards.json) |
| scikit-learn 1.7 官方文档 | HDBSCAN 密度聚类 | 13 | [cards.json](sklearn-hdbscan-foundations/cards.json) |
| SimPO 原论文 v1 | 无参考模型偏好优化 | 5 | [cards.json](simpo-preference-optimization/cards.json) |
| GAIA 原论文 v1 | 通用助手评测 | 7 | [cards.json](gaia-agent-benchmark/cards.json) |
| torchvision 0.22 官方文档 | 模型和预训练权重 | 7 | [cards.json](torchvision-model-weights/cards.json) |
| FoxIO 固定版本 | JA4 TLS 客户端指纹 | 11 | [cards.json](ja4-tls-fingerprint/cards.json) |
| Git 官方文档 | 历史、撤销与排查 | 16 | [cards.json](git-history-debugging/cards.json) |
| systemd 259 官方文档 | Linux 服务管理与日志 | 17 | [cards.json](systemd-service-operations/cards.json) |
| pytest 8.3 官方文档 | Python 自动化测试 | 16 | [cards.json](pytest-testing-fundamentals/cards.json) |
| RFC 6455 与 WHATWG | WebSocket 与服务端事件 | 16 | [cards.json](websocket-sse-protocol-foundations/cards.json) |
| PyTorch 2.7 官方文档 | 检查点序列化与加载 | 8 | [cards.json](pytorch-checkpoint-serialization/cards.json) |
| CodeT5 原论文 v1 | 代码模型标识符预训练 | 7 | [cards.json](codet5-identifier-pretraining/cards.json) |
| AdaLoRA 原论文 v1 | 参数高效微调与秩分配 | 8 | [cards.json](adalora-rank-allocation/cards.json) |
| MCTS 综述 v1 | 蒙特卡洛树搜索 | 6 | [cards.json](monte-carlo-tree-search-foundations/cards.json) |
| Anomaly Transformer 原论文 v1 | 时序异常关联差异 | 6 | [cards.json](anomaly-transformer-association/cards.json) |
| Kubernetes 1.32 官方文档 | Pod、工作负载与服务 | 19 | [cards.json](kubernetes-workload-service-foundations/cards.json) |
| Linux man-pages | 文件与目录权限、umask | 10 | [cards.json](linux-file-permissions-fundamentals/cards.json) |
| MAE 原论文 v3 | 图像掩码自编码 | 8 | [cards.json](masked-autoencoder-vision-foundations/cards.json) |
| DiverseVul 原论文 v2 | 漏洞代码数据与标签评估 | 8 | [cards.json](diversevul-code-dataset/cards.json) |
| Sentence Transformers 5.1.2 源码 | 文本向量编码接口 | 8 | [cards.json](sentence-transformers-encode-practice/cards.json) |
| Cisco、Linux 与 RFC 826 | 以太网交换、RSTP、VLAN 与 ARP | 22 | [cards.json](ethernet-switching-vlan-foundations/cards.json) |
| Linux man-pages | 内存映射、保护与同步 | 11 | [cards.json](linux-memory-mapping-fundamentals/cards.json) |
| Princeton Algorithms 第四版 | 二叉搜索树与平衡树 | 8 | [cards.json](binary-search-trees-foundations/cards.json) |
| RoFormer 原论文 v5 | RoPE 旋转位置编码 | 5 | [cards.json](rope-rotation-foundations/cards.json) |
| PyTorch 2.7 与 GLU 原论文 | RMSNorm 与 SwiGLU | 7 | [cards.json](rmsnorm-swiglu-foundations/cards.json) |
| CWE-22、Python 3.13 与 Linux 手册 | 路径穿越与文件访问 | 10 | [cards.json](path-traversal-code-analysis/cards.json) |
| HumanEval 原论文 v2 | 代码生成评估与 pass@k | 5 | [cards.json](humaneval-code-evaluation/cards.json) |
| HDDL 原论文 v1 | 层级任务网络规划 | 7 | [cards.json](hierarchical-task-network-planning/cards.json) |
| SciPy 1.15.3 官方文档 | 相关系数与秩相关 | 10 | [cards.json](correlation-statistical-foundations/cards.json) |
| SciPy 1.15.3 官方文档 | 分布差异与安全漂移 | 11 | [cards.json](distribution-drift-statistics/cards.json) |
| PyTorch 2.7 官方文档 | EmbeddingBag 聚合 | 9 | [cards.json](pytorch-embeddingbag-practice/cards.json) |
| YARA 4.4 官方文档 | PE 模块与规则条件 | 10 | [cards.json](yara-pe-rule-practice/cards.json) |
| Tesseract 官方文档 | 文档 OCR 设置与结果 | 8 | [cards.json](tesseract-ocr-document-practice/cards.json) |
| Self-Refine 原论文 v2 | 自反馈与迭代修订 | 3 | [cards.json](self-refine-agent-feedback/cards.json) |
| scikit-learn 1.7 文档 | 词袋和 TF-IDF 特征 | 16 | [cards.json](sklearn-text-vectorization/cards.json) |
| AWS CloudTrail 官方文档 | 云审计事件与字段 | 12 | [cards.json](cloudtrail-security-telemetry/cards.json) |
| Microsoft Windows 审核文档 | Kerberos 审核事件 | 6 | [cards.json](windows-kerberos-audit/cards.json) |
| AWS GuardDuty 官方文档 | 威胁发现与数据覆盖 | 5 | [cards.json](guardduty-threat-findings/cards.json) |
| Splunk Enterprise 9.4 文档 | SPL 安全日志查询 | 13 | [cards.json](splunk-spl-security-analysis/cards.json) |
| Artificial Intelligence 第三版与 PDDL 教程 | 经典规划建模 | 6 | [cards.json](classical-agent-planning/cards.json) |
| MySQL 8.4 官方手册 | InnoDB 索引与查询计划 | 9 | [cards.json](mysql-innodb-index-foundations/cards.json) |
| MySQL 8.4 官方手册 | InnoDB 事务、快照与锁 | 12 | [cards.json](mysql-innodb-transactions/cards.json) |
| POSIX 与 GNU 手册 | Linux 文本处理命令 | 15 | [cards.json](linux-text-processing-commands/cards.json) |
| Google SRE 与 AWS 文档 | 分布式服务过载与可靠性 | 9 | [cards.json](distributed-overload-reliability/cards.json) |
| Google SRE Book | SLI、SLO、SLA、数据服务指标与可用性换算 | 16 | [cards.json](google-sre-service-level-objectives/cards.json) |
| AWS Builders' Library 与 Stripe API v1 | 超时分位数、重试退避、抖动与幂等请求 | 10 | [cards.json](distributed-retry-idempotency/cards.json) |
| DistilBERT 原论文 v4 | 知识蒸馏 | 9 | [cards.json](distillation-distilbert/cards.json) |
| SWE-agent 原论文 v3 | 智能体计算机接口 | 7 | [cards.json](swe-agent-interface/cards.json) |
| AgentBench 原论文 v3 | 交互式智能体评测 | 6 | [cards.json](agentbench-interactive-evaluation/cards.json) |
| AutoGen 原论文 v2 | 多智能体对话 | 2 | [cards.json](autogen-conversation-basics/cards.json) |
| HyDE 原论文 v1 | 假设文档检索 | 4 | [cards.json](hyde-retrieval-details/cards.json) |
| syzkaller 固定提交文档 | 系统调用模糊测试 | 8 | [cards.json](syzkaller-syscall-fuzzing/cards.json) |
| Linux 6.12 文档 | KCOV 内核覆盖采集 | 7 | [cards.json](linux-kcov-fuzzing/cards.json) |
| OpenTelemetry 文档 | 分布式追踪 | 9 | [cards.json](opentelemetry-agent-tracing/cards.json) |
| SciPy 1.15.3 文档 | 二项比例与安全评估 | 7 | [cards.json](binomial-security-evaluation/cards.json) |
| SciPy 1.15.3 | 多重检验与假发现率 | 9 | [cards.json](multiple-testing-fdr/cards.json) |
| Elasticsearch 8.17 | EQL 安全事件关联 | 11 | [cards.json](eql-security-event-sequences/cards.json) |
| N-BaIoT 原论文 v1 | IoT 僵尸网络检测 | 7 | [cards.json](nbaiot-botnet-detection/cards.json) |
| ECOD 原论文 v3 | 经验分布异常检测 | 8 | [cards.json](ecod-outlier-detection/cards.json) |
| Self-Consistency 原论文 v4 | 多路径推理 | 4 | [cards.json](self-consistency-reasoning/cards.json) |
| Least-to-Most 原论文 v3 | 子问题分解与求解 | 5 | [cards.json](least-to-most-reasoning/cards.json) |
| Fuzz4All 原论文 v3 | 生成策略与预言机 | 4 | [cards.json](fuzz4all-generation-oracles/cards.json) |
| UNICORN 原论文 v1 | 主机溯源图检测 | 10 | [cards.json](unicorn-provenance-detection/cards.json) |
| Nginx 官方文档 | HTTP 负载均衡 | 10 | [cards.json](nginx-load-balancing/cards.json) |
| AWS 缓存实践 | 应用缓存策略 | 10 | [cards.json](application-cache-patterns/cards.json) |
| Redis 官方文档 | 布隆过滤器 | 10 | [cards.json](bloom-filter-foundations/cards.json) |
| Dynamo 原论文 | 一致性哈希与虚拟节点 | 10 | [cards.json](consistent-hashing-foundations/cards.json) |
| Think Bayes 2 | Beta 与二项共轭更新 | 7 | [cards.json](beta-binomial-inference/cards.json) |
| ReWOO 原论文 v1 | 工具规划与证据 | 6 | [cards.json](rewoo-agent-planning/cards.json) |
| DeepSeekMath 原论文 v1 | GRPO 训练与监督 | 7 | [cards.json](grpo-training-foundations/cards.json) |
| FPN 原论文与 58 同城面经 | 多尺度视觉特征 | 8 | [cards.json](fpn-multiscale-vision/cards.json) |
| Python 3.14 官方文档 | logging 配置与处理 | 12 | [cards.json](python-logging-foundations/cards.json) |
| Elasticsearch 8.17 | RRF 检索融合 | 6 | [cards.json](rrf-ranking-fusion/cards.json) |
| Google SRE Workbook | 金丝雀发布评估 | 8 | [cards.json](canary-release-evaluation/cards.json) |
| Zeek Notice 官方文档 | 通知字段与抑制 | 7 | [cards.json](zeek-notice-workflow/cards.json) |
| AFL++ 固定提交 | 比较反馈与插桩 | 9 | [cards.json](afl-instrumentation-feedback/cards.json) |
| GQA 原论文 v1 | 分组查询注意力与检查点转换 | 8 | [cards.json](gqa-attention-uptraining/cards.json) |
| Switch Transformer 原论文 v1 | 稀疏专家路由与计算 | 8 | [cards.json](switch-moe-foundations/cards.json) |
| HNSW 原论文 v4 | 分层近邻图检索 | 10 | [cards.json](hnsw-graph-search/cards.json) |
| PyTorch 2.7.1 源码与文档 | 学习率调度器 | 12 | [cards.json](pytorch-lr-schedulers/cards.json) |
| OCSF 1.2.0 模式 | 安全事件标准化 | 12 | [cards.json](ocsf-security-event-schema/cards.json) |
| CVE JSON 5.2.0 模式 | 漏洞记录与版本范围 | 12 | [cards.json](cve-record-schema/cards.json) |
| FCN 原论文与 TensorFlow 教程 | 语义分割基础 | 10 | [cards.json](semantic-segmentation-foundations/cards.json) |
| Semgrep 官方文档 | 污点匹配与分析范围 | 7 | [cards.json](semgrep-taint-analysis-details/cards.json) |
| HTTP/2、HTTP/3 与 QUIC RFC | HTTP 版本、流与传输 | 12 | [cards.json](http-versions-quic/cards.json) |
| Computation Structures | CPU 缓存与存储层次、局部性与 AMAT 计算 | 20 | [cards.json](cpu-cache-foundations/cards.json) |
| PostgreSQL 17 官方文档 | SQL 窗口函数 | 12 | [cards.json](postgresql-window-functions/cards.json) |
| Princeton Algorithms | 字典树与字符串检索 | 7 | [cards.json](trie-string-search/cards.json) |
| Python 3.14 与 RFC 3629 | Unicode、UTF-8 与浮点表示 | 9 | [cards.json](text-number-representation/cards.json) |
| τ-bench 论文 v1 | 工具交互与可靠性评测 | 10 | [cards.json](tau-bench-agent-reliability/cards.json) |
| ToolSandbox 论文 v2 | 有状态工具与轨迹评估 | 10 | [cards.json](toolsandbox-agent-evaluation/cards.json) |
| AgentDojo 论文 v2 | 工具信任边界与评测 | 9 | [cards.json](agentdojo-tool-boundaries/cards.json) |
| Deep SVDD 原论文 | 单类深度异常检测 | 9 | [cards.json](deep-svdd-anomaly-detection/cards.json) |
| scikit-learn 1.7.2 | MCC 分类评估 | 7 | [cards.json](matthews-correlation-evaluation/cards.json) |
| CICFlowMeter 固定提交源码 | 流量特征语义 | 7 | [cards.json](cicflowmeter-feature-contracts/cards.json) |
| URLhaus 社区文档 | 恶意 URL 清单、RPZ 与数据边界 | 7 | [cards.json](urlhaus-threat-feed/cards.json) |
| PhishTank 开发者文档 | 钓鱼记录、状态与时间 | 5 | [cards.json](phishtank-feed-boundaries/cards.json) |
| MalwareBazaar 社区文档 | 恶意样本情报与查询边界 | 7 | [cards.json](malwarebazaar-community-data/cards.json) |
| UNSW ToN_IoT 官网 | IoT 多源遥测与数据划分 | 7 | [cards.json](ton-iot-multisource-dataset/cards.json) |
| Tranco 官网 | 域名流行度榜单与评估 | 4 | [cards.json](tranco-ranking-evaluation/cards.json) |
| NIST SP 800-61r3 | 事件影响分析与沟通 | 6 | [cards.json](nist-incident-analysis-communication/cards.json) |
| Spinning Up 与 GAE 论文 | 策略梯度、基线与优势估计 | 9 | [cards.json](policy-gradient-gae/cards.json) |
| Spinning Up PPO 教程 | 裁剪目标、比率与 KL 监控 | 8 | [cards.json](ppo-clipped-objective/cards.json) |
| InstructGPT 原论文 v1 | 偏好奖励、KL 与 PPO 训练 | 10 | [cards.json](instructgpt-rlhf-training/cards.json) |
| Think Bayes 2 | 贝叶斯更新、似然与赔率 | 10 | [cards.json](bayesian-updating-foundations/cards.json) |
| UNSW BoT-IoT 官网及论文 | IoT 流量数据、标签与使用条件 | 11 | [cards.json](bot-iot-dataset/cards.json) |
| FuzzBench 2021 原论文 | 统一覆盖、差异覆盖与试验报告 | 8 | [cards.json](fuzzbench-evaluation-methods/cards.json) |
| MDN 官方文档 | 同源策略、CORS 与 Cookie | 19 | [cards.json](browser-origin-cors-cookies/cards.json) |
| PostgreSQL 17 官方文档 | 表约束、外键与数据完整性 | 13 | [cards.json](postgresql-constraints-design/cards.json) |
| IPv6 与 DHCP RFC | IPv6、邻居发现、SLAAC 与 DHCP | 14 | [cards.json](ipv6-dhcp-fundamentals/cards.json) |
| Linux man-pages | 管道、UNIX 套接字与共享内存 | 16 | [cards.json](linux-ipc-fundamentals/cards.json) |
| Linux man-pages | epoll、就绪事件与触发方式 | 10 | [cards.json](linux-io-multiplexing/cards.json) |
| CP-Algorithms | 图遍历、最短路与并查集 | 18 | [cards.json](graph-algorithms-fundamentals/cards.json) |
| Docker 官方文档 | 容器、镜像、构建与持久化 | 19 | [cards.json](docker-container-fundamentals/cards.json) |
| Deep Learning 教材 | 自编码器、稀疏约束与去噪 | 8 | [cards.json](autoencoder-foundations/cards.json) |
| TensorFlow 自编码器教程 | 重构式异常检测 | 2 | [cards.json](autoencoder-anomaly-detection/cards.json) |
| ALiBi 原论文 v2 | 位置偏置与长度外推 | 7 | [cards.json](alibi-position-bias/cards.json) |
| Transformer-XL 原论文 v2 | 片段记忆与相对位置 | 6 | [cards.json](transformer-xl-recurrence/cards.json) |
| tokenizers 0.23.1 官方文档 | 编码、对齐、截断与填充 | 9 | [cards.json](tokenizers-encoding-contracts/cards.json) |
| PyTorch 2.7 官方文档 | 批、组与实例归一化 | 11 | [cards.json](pytorch-normalization-contracts/cards.json) |
| scikit-learn 1.9 官方文档 | SGD 分类与增量训练 | 12 | [cards.json](sklearn-sgd-incremental/cards.json) |
| CodeBERT 与 GraphCodeBERT 原论文 | 代码表示和预训练 | 11 | [cards.json](codebert-graphcodebert/cards.json) |
| DPR 原论文 v3 | 稠密段落检索与训练 | 7 | [cards.json](dpr-dense-passage-retrieval/cards.json) |
| CVEfixes 原论文 v1 | 漏洞修复代码数据与覆盖边界 | 8 | [cards.json](cvefixes-vulnerability-data/cards.json) |
| CP-Algorithms、USACO Guide 与 Python 官方文档 | 动态规划、二分、双指针与前缀和 | 17 | [cards.json](algorithm-design-foundations/cards.json) |
| Linux 套接字手册 | TCP／UDP 接口、非阻塞与半关闭 | 19 | [cards.json](linux-socket-programming/cards.json) |
| Linux 与 Bash 手册 | 进程、信号、子进程回收与作业控制 | 20 | [cards.json](linux-process-signals/cards.json) |
| Python 3.14 官方文档与 PEP 552 | 模块导入、重载与字节码缓存 | 21 | [cards.json](python-import-mechanics/cards.json) |
| Kibana 8.17 官方文档 | KQL 日志筛选 | 13 | [cards.json](kibana-kql-investigation/cards.json) |
| LogAnomaly 原论文 | 日志序列与数量异常 | 9 | [cards.json](loganomaly-sequence-count/cards.json) |
| ToolLLM 原论文 v2 | 工具调用轨迹、检索与评测 | 12 | [cards.json](toolllm-toolbench-foundations/cards.json) |
| ProbabilityCourse | 离散马尔可夫链与平稳分布 | 13 | [cards.json](markov-chain-fundamentals/cards.json) |
| MIT 6.004 课程 | CPU 指令流水线与冒险 | 12 | [cards.json](cpu-pipeline-fundamentals/cards.json) |
| SWE-bench 原论文 v3 | 软件工程任务与补丁评测 | 12 | [cards.json](swe-bench-agent-evaluation/cards.json) |
| LLMFuzz 原论文 v2 | 深度学习库代码生成与变异 | 13 | [cards.json](llmfuzz-dl-library/cards.json) |
| ColBERTv2 原论文 v2 | 多向量压缩与检索 | 11 | [cards.json](colbertv2-compression/cards.json) |
| Raft 原论文 | 多数派、选举与日志复制 | 18 | [cards.json](raft-consensus-foundations/cards.json) |
| CAP 定理、线性化与 Dynamo 原论文 | 副本一致性、quorum、向量时钟与修复 | 23 | [cards.json](distributed-consistency-foundations/cards.json) |
| PostgreSQL 17、AWS 与 microservices.io | 2PC、Saga 补偿与 transactional outbox | 23 | [cards.json](distributed-transactions-patterns/cards.json) |
| PyTorch BiLSTM-CRF 教程 | 序列评分、归一化与解码 | 12 | [cards.json](bilstm-crf-foundations/cards.json) |
| Transformers 4.51.3 文档与源码 | 生成长度、束搜索和采样配置 | 14 | [cards.json](transformers-generation-parameters/cards.json) |
| SOC AI Companion 现场研究 | 研判流程、证据核验与观察研究边界 | 8 | [cards.json](soc-companion-field-study/cards.json) |
| SOC-bench 设计论文 | 蓝队任务与评测设计边界 | 7 | [cards.json](soc-benchmark-design/cards.json) |
| Redis 7.2 官方文档 | 数据类型、过期、持久化与事务 | 19 | [cards.json](redis-cache-foundations/cards.json) |
| Apache Kafka 3.9 官方文档 | 分区、消费与消息可靠性 | 18 | [cards.json](kafka-messaging-foundations/cards.json) |
| GCC 15、GNU Make 与 Linux 手册 | 编译、链接与构建 | 17 | [cards.json](compiler-build-foundations/cards.json) |
| DREBIN 原论文 | Android 静态特征、检测与解释 | 14 | [cards.json](drebin-android-malware/cards.json) |
| LineVD 原论文 | 语句依赖图、漏洞标签与评估 | 12 | [cards.json](linevd-statement-detection/cards.json) |
| LLMCompiler 原论文 | 工具任务依赖、调度与重规划 | 10 | [cards.json](llmcompiler-parallel-tools/cards.json) |
| Forecasting: Principles and Practice 第三版 | 时间序列分解与异常基线 | 13 | [cards.json](time-series-anomaly-basics/cards.json) |
| Linux、iputils、BIND 与 curl 手册 | 网络接口、路由与排查命令 | 17 | [cards.json](linux-network-troubleshooting/cards.json) |
| PostgreSQL 17 官方文档 | 并发控制、行锁、咨询锁与 VACUUM | 19 | [cards.json](postgresql-mvcc-locks/cards.json) |
| Python 3.14 官方文档 | 正则匹配、分组与替换 | 23 | [cards.json](python-regex-practice/cards.json) |
| Elasticsearch 8.17 官方文档 | 文本分析与关键词检索 | 13 | [cards.json](elasticsearch-text-retrieval/cards.json) |
| OSV schema 1.9.2 固定提交 | 漏洞别名、软件包及版本范围 | 17 | [cards.json](osv-schema-v192/cards.json) |
| OSTEP 与 Linux 系统调用手册 | 文件系统、元数据与持久化 | 19 | [cards.json](file-system-internals/cards.json) |
| OSTEP 1.10 第 43 章 | 日志结构文件系统、imap、segment 清理与崩溃恢复 | 20 | [cards.json](log-structured-file-system/cards.json) |
| OSTEP 1.10 第 17 章 | 堆空闲空间、碎片、分配策略与 buddy/slab 分配器 | 20 | [cards.json](memory-free-space-management/cards.json) |
| TLS 1.3 与服务身份 RFC | 握手、证书、恢复与应用协议协商 | 18 | [cards.json](tls-protocol-foundations/cards.json) |
| NIST 密码学标准与 RFC | 哈希性质、数字签名、AES 模式、AEAD、密钥协商与派生 | 16 | [cards.json](cryptography-primitives-foundations/cards.json) |
| FIRST CVSS v4.0 文档 | 漏洞指标、向量与补充信息 | 14 | [cards.json](cvss-v4-foundations/cards.json) |
| River 0.21.2 官方文档 | ADWIN、Page-Hinkley 与 KSWIN | 11 | [cards.json](river-drift-detection/cards.json) |
| Princeton Algorithms 教材 | 排序、快速选择与二叉堆 | 18 | [cards.json](sorting-heap-algorithms/cards.json) |
| PostgreSQL 17 官方文档 | 查询、连接、集合与索引 | 22 | [cards.json](postgresql-query-index/cards.json) |
| Bash 5.3 与 GNU 命令手册 | Shell 展开、管道与文件操作 | 25 | [cards.json](bash-shell-practice/cards.json) |
| MISP core draft-20、galaxy draft-08 | 情报对象、分发、撤销与观察 | 17 | [cards.json](misp-threat-intelligence-format/cards.json) |
| Settles 主动学习综述 | 选样、标注成本与评估 | 13 | [cards.json](active-learning-security-evaluation/cards.json) |
| torchvision 0.22 官方文档 | 图像类型、缩放与裁剪 | 13 | [cards.json](torchvision-image-preprocessing/cards.json) |
| OSTEP 调度章节 | FCFS、SJF、STCF、RR 的场景计算，CPU／I/O 重叠及 Lottery 比例份额调度 | 29 | [cards.json](os-cpu-scheduling-fundamentals/cards.json) |
| Snorkel 论文与 0.9.9 源码 | 弱监督标签、覆盖与冲突 | 17 | [cards.json](weak-supervision-labeling/cards.json) |
| Drain 论文与固定版本 Drain3 | 日志模板解析与状态恢复 | 10 | [cards.json](log-template-parsing/cards.json) |
| LIME、SHAP 原论文与文档 | 局部代理模型与特征归因 | 14 | [cards.json](model-explanations-lime-shap/cards.json) |
| Pro Git 与 Git 官方手册 | 暂存、分支、远端与恢复 | 24 | [cards.json](git-version-control-foundations/cards.json) |
| IP、CIDR、ARP 与 ICMP RFC | 地址、路由与分片 | 18 | [cards.json](ip-routing-fundamentals/cards.json) |
| OSTEP 操作系统教材 | 内存局部性与页面替换 | 12 | [cards.json](os-memory-replacement-foundations/cards.json) |
| MIT 计算机结构、Python 与 RFC | 处理器、指令集与字节序 | 12 | [cards.json](computer-architecture-foundations/cards.json) |
| OSTEP 操作系统教材 | 互斥、死锁与条件变量 | 17 | [cards.json](os-concurrency-fundamentals/cards.json) |
| Linux open 与 unlink 手册 | 文件描述符、偏移与打开标志 | 11 | [cards.json](linux-file-descriptor-fundamentals/cards.json) |
| RFC 9110、9111 | HTTP 方法、状态码与缓存 | 20 | [cards.json](http-web-fundamentals/cards.json) |
| 投机解码原论文与腾讯公开面经 | 采样分布、接受与性能权衡 | 9 | [cards.json](speculative-decoding-foundations/cards.json) |
| scikit-learn 1.7 文档 | 单类 SVM 与椭圆异常检测 | 6 | [cards.json](one-class-anomaly-methods/cards.json) |
| TCP 与 UDP RFC 标准 | 连接、流量控制与拥塞控制 | 26 | [cards.json](tcp-ip-fundamentals/cards.json) |
| GNU/Linux 与 Bash 手册 | 常用命令、权限与进程 | 35 | [cards.json](linux-command-foundations/cards.json) |
| OSTEP 与 Linux 手册 | 进程、虚拟内存与系统调用 | 16 | [cards.json](os-fundamentals/cards.json) |
| PostgreSQL 17 文档 | 事务、SQL 与索引 | 23 | [cards.json](postgresql-database-foundations/cards.json) |
| Open Data Structures 与 Python 文档 | 数据结构、搜索与排序 | 16 | [cards.json](data-structures-foundations/cards.json) |
| Open Data Structures Python 版 | 红黑树不变量、左倾变体、插入与删除修复 | 14 | [cards.json](red-black-tree-invariants/cards.json) |
| NIST SARD Juliet 1.3 | 漏洞基准与标签边界 | 7 | [cards.json](juliet-code-benchmark/cards.json) |
| Devign 原论文 | 程序图与函数级漏洞识别 | 11 | [cards.json](devign-graph-vulnerability/cards.json) |
| VulDeePecker 原论文 | 代码切片与漏洞检测 | 13 | [cards.json](vuldeepecker-code-gadgets/cards.json) |
| SPLADE 原论文 | 稀疏检索与词汇扩展 | 11 | [cards.json](splade-sparse-retrieval/cards.json) |
| Reflexion 原论文 | 智能体反馈、反思与记忆 | 9 | [cards.json](reflexion-agent-feedback/cards.json) |
| Python 3.13 官方文档 | 对象协议、异常与资源清理 | 29 | [cards.json](python-object-protocols/cards.json) |
| scikit-learn 1.7、1.7.2 源码 | 回归评估常用函数与边界 | 13 | [cards.json](sklearn-regression-metrics/cards.json) |
| Atheris 2.3.0 官方文档 | Python 覆盖引导模糊测试 | 12 | [cards.json](atheris-python-fuzzing/cards.json) |
| CIC-IDS2017 官方数据集 | 恶意流量与实验设计 | 13 | [cards.json](cic-ids2017/cards.json) |
| UNSW-NB15 官方数据集 | 入侵检测与数据切分 | 10 | [cards.json](unsw-nb15/cards.json) |
| scikit-learn 评估文档 | 安全模型评估与数据泄漏 | 19 | [cards.json](sklearn-evaluation/cards.json) |
| Zeek 官方日志文档 | 网络日志、DNS 与连接特征 | 12 | [cards.json](zeek-logs/cards.json) |
| Suricata EVE 文档 | 告警和事件关联 | 11 | [cards.json](suricata-eve/cards.json) |
| Isolation Forest 文档 | 安全异常检测 | 12 | [cards.json](isolation-forest/cards.json) |
| OpenPhish 数据资料 | 钓鱼网址检测 | 12 | [cards.json](openphish/cards.json) |
| CodeXGLUE 缺陷检测 | 函数级漏洞分类 | 14 | [cards.json](codexglue-defects/cards.json) |
| PrimeVul 数据集 | 漏洞基准、去重和成对评估 | 12 | [cards.json](primevul/cards.json) |
| LLM4Vuln 论文 | 大模型漏洞推理评估 | 10 | [cards.json](llm4vuln/cards.json) |
| EMBER 数据集 | 恶意软件静态检测 | 12 | [cards.json](ember-malware/cards.json) |
| OSS-Fuzz-gen 项目 | AI 辅助模糊测试 | 12 | [cards.json](oss-fuzz-gen/cards.json) |
| MITRE ATT&CK 知识库 | 威胁情报抽取与行为映射 | 10 | [cards.json](mitre-attack/cards.json) |
| Microsoft Security Copilot 文档 | 事件摘要与安全运营 | 10 | [cards.json](security-copilot/cards.json) |
| RAG 原始论文 | 安全知识检索与问答 | 10 | [cards.json](security-rag/cards.json) |
| security-engineering 面试题 | AI 赋能安全面试题 | 3 | [cards.json](github-ai4sec-interview/cards.json) |
| Dive into Deep Learning | 数学与统计 | 18 | [cards.json](d2l-math/cards.json) |
| Python / NumPy 官方文档 | 容器、异常与广播 | 12 | [cards.json](python-numpy/cards.json) |
| scikit-learn 官方文档 | 聚类与预处理 | 11 | [cards.json](sklearn-clustering/cards.json) |
| PyTorch 官方教程 | 自动微分与训练 | 14 | [cards.json](pytorch-training/cards.json) |
| Hugging Face LLM Course | Transformer 与 BPE | 11 | [cards.json](hf-transformer/cards.json) |
| Happy-LLM 中文教程 | 注意力与 Transformer | 7 | [cards.json](happy-attention/cards.json) |
| Hugging Face 生成文档 | 语言模型训练与生成 | 10 | [cards.json](hf-generation/cards.json) |
| LangChain / Pinecone | 检索架构与重排 | 9 | [cards.json](langchain-retrieval/cards.json) |
| Microsoft AI Agents for Beginners | Agent 基础设计 | 8 | [cards.json](ms-agents/cards.json) |
| LangGraph 官方文档 | 状态图与持久执行 | 7 | [cards.json](langgraph-engineering/cards.json) |
| Spinning Up | 强化学习基础 | 12 | [cards.json](rl-intro/cards.json) |
| Berkeley CS188、Spinning Up 与 Gymnasium | 强化学习方法、目标与终止处理 | 15 | [cards.json](rl-learning-methods/cards.json) |
| Faiss 1.12 源码 | 索引 ID、搜索输出与重建 | 9 | [cards.json](faiss-index-contracts/cards.json) |
| CTU-13 官方数据集 | 僵尸网络流量和公开数据边界 | 5 | [cards.json](ctu13-botnet-dataset/cards.json) |
| LANL Unified Host and Network Data Set | 主机和网络事件、去标识化与关联 | 8 | [cards.json](lanl-host-network-dataset/cards.json) |
| Python 3.13 官方文档 | 异步任务、取消、同步与队列 | 27 | [cards.json](python-asyncio-practice/cards.json) |
| langchain-core 1.8.4 源码 | JSON 解析、模型校验与条件路由 | 11 | [cards.json](langchain-output-parsing/cards.json) |
| NAB 论文与固定版本仓库 | 流式异常数据、时间敏感评分与阈值 | 11 | [cards.json](nab-anomaly-benchmark/cards.json) |
| scikit-learn 1.7 | 朴素贝叶斯原理、变体与训练接口 | 19 | [cards.json](naive-bayes-foundations/cards.json) |
| Transformers 4.51.3、seqeval 固定版本 | 实体标签对齐与评估 | 13 | [cards.json](ner-token-labeling/cards.json) |
| Berkeley CS188 | 隐马尔可夫模型与 Viterbi | 8 | [cards.json](hmm-sequence-models/cards.json) |
| MITRE ATT&CK v20、Microsoft | 凭据、横向移动与防御受损 | 18 | [cards.json](host-threat-behavior/cards.json) |
| 线性代数教材、NumPy 2.0 | 正交投影、最小二乘与矩阵性质 | 21 | [cards.json](linear-projection-least-squares/cards.json) |
| PyTorch 2.7 官方文档 | 激活检查点、重计算与随机状态 | 15 | [cards.json](pytorch-activation-checkpoint/cards.json) |
| FlashAttention、FlashAttention-2 原论文 | 分块注意力、重计算与并行 | 12 | [cards.json](flash-attention-algorithms/cards.json) |
| GCN、GraphSAGE、GAT 论文及 PyG 2.6.1 | 图模型与图卷积接口 | 15 | [cards.json](gnn-convolution-models/cards.json) |
| Zeek / Suricata 日志文档 | 连接、DNS、文件与报文溯源 | 10 | [cards.json](zeek-telemetry/cards.json) |
| OASIS STIX / TAXII 2.1 | 威胁情报对象与交换 | 14 | [cards.json](stix-taxii/cards.json) |
| CodeQL 数据流指南 | 代码表示、数据流与污点跟踪 | 9 | [cards.json](codeql-flow/cards.json) |
| LLVM libFuzzer / AddressSanitizer | 语料、测试入口与覆盖反馈 | 11 | [cards.json](libfuzzer-basics/cards.json) |
| pandas 用户指南 | 分组、缺失值与表连接 | 12 | [cards.json](pandas-data/cards.json) |
| 动手学深度学习中文教材 | 泛化、模型选择与 Dropout | 9 | [cards.json](d2l-generalization/cards.json) |
| PyTorch Geometric 教程 | 图数据与消息传递 | 9 | [cards.json](pyg-graphs/cards.json) |
| LoRA 原论文 | 低秩适配与部署 | 7 | [cards.json](lora-adaptation/cards.json) |
| Hugging Face / Albumentations | 目标检测与边界框 | 5 | [cards.json](vision-detection/cards.json) |
| Google ML Crash Course | 生产模型监控 | 8 | [cards.json](ml-production/cards.json) |
| NIST SP 800-61r3 | 事件研判与响应 | 6 | [cards.json](nist-incident/cards.json) |
| ReAct / Hello-Agents | 智能体规划与反思 | 5 | [cards.json](agent-patterns/cards.json) |
| MCP 规范与概念文档 | 工具、资源与通信 | 12 | [cards.json](mcp-agent/cards.json) |
| LangGraph 中断与持久化 | 线程与中断恢复 | 4 | [cards.json](langgraph-resume/cards.json) |
| LangChain / Pinecone / Elastic | 文档切块与检索索引 | 6 | [cards.json](rag-indexing/cards.json) |
| scikit-learn LOF | 局部异常与新颖性检测 | 6 | [cards.json](lof-detection/cards.json) |
| MITRE ATT&CK 密码喷洒 | 身份认证异常 | 3 | [cards.json](password-spray/cards.json) |
| Microsoft PE 格式 | 恶意软件静态文件结构 | 7 | [cards.json](pe-structure/cards.json) |
| 字节公开面经（个人自述） | Agent Skill 与工具 | 2 | [cards.json](company-bytedance/cards.json) |
| 阿里公开面经（个人自述） | 工具反馈与图结构 | 2 | [cards.json](company-alibaba/cards.json) |
| 腾讯公开面经（个人自述） | Agent 评测 | 1 | [cards.json](company-tencent/cards.json) |
| 百度公开面经（个人自述） | Agent 工程与审批 | 1 | [cards.json](company-baidu/cards.json) |
| Microsoft Sysmon | Windows 主机事件与关联 | 10 | [cards.json](windows-sysmon/cards.json) |
| scikit-learn 模型评估 | 分类指标与类别比例 | 8 | [cards.json](security-metrics/cards.json) |
| YARA 4.4 文档 | 恶意文件规则与匹配 | 12 | [cards.json](malware-yara/cards.json) |
| MITRE CWE / OWASP | 常见漏洞与防护边界 | 17 | [cards.json](cwe-fundamentals/cards.json) |
| MITRE ATT&CK | DGA 与 DNS 通信 | 4 | [cards.json](dga-communications/cards.json) |
| Linux ELF 手册 | ELF 文件静态结构 | 5 | [cards.json](elf-malware/cards.json) |
| MITRE ATT&CK | 沙箱规避与软件打包 | 2 | [cards.json](malware-analysis-limits/cards.json) |
| ir-measures / Ragas | 检索与 RAG 评估 | 7 | [cards.json](ir-evaluation/cards.json) |
| Sigma 2.1.0 | 检测规则与事件关联 | 9 | [cards.json](sigma-detection/cards.json) |
| Microsoft Windows 审核事件 | 登录、进程与会话日志 | 8 | [cards.json](windows-audit/cards.json) |
| NIST 事件响应、日志与取证 | 恢复、保全与时间线 | 7 | [cards.json](incident-forensics/cards.json) |
| Evidently / Google ML、SRE | 漂移、切片与服务水平监控 | 8 | [cards.json](ml-observability/cards.json) |
| 字节、腾讯公开面经（个人自述） | RAG 评估与问题诊断 | 2 | [cards.json](company-rag-interviews/cards.json) |
| scikit-learn 1.9.1 | 监督学习、集成与概率校准 | 15 | [cards.json](sklearn-supervised/cards.json) |
| LLVM / OSS-Fuzz | 引擎配置、sanitizer 与复现 | 11 | [cards.json](fuzzing-engine/cards.json) |
| OASIS STIX 2.1 | 情报对象属性、标记与版本 | 9 | [cards.json](stix-object-semantics/cards.json) |
| Semgrep | 污点规则与追踪 | 6 | [cards.json](semgrep-taint/cards.json) |
| MITRE ATT&CK | 身份认证攻击与采集盲区 | 2 | [cards.json](auth-attacks/cards.json) |
| NIST SP 800-94 | 入侵检测基础与术语 | 5 | [cards.json](nist-ids-basics/cards.json) |
| 字节公开面经（个人自述） | Python 迭代、装饰器与 GIL | 5 | [cards.json](company-python-interviews/cards.json) |
| Hugging Face / GQA 论文 | WordPiece 与注意力头共享 | 4 | [cards.json](transformer-details/cards.json) |
| Transformers 5.23.0 / PagedAttention | KV 缓存与量化 | 9 | [cards.json](llm-memory/cards.json) |
| IETF 邮件认证标准 | SPF、DKIM、DMARC 与认证结果 | 14 | [cards.json](email-authentication/cards.json) |
| Microsoft PE / EMBER | 导入、导出、证书与静态特征 | 8 | [cards.json](pe-import-analysis/cards.json) |
| MITRE ATT&CK / CISA | 钓鱼渠道与识别 | 3 | [cards.json](phishing-behavior/cards.json) |
| 大厂公开面经合集（转载自述） | SFT、DPO 与投机解码 | 4 | [cards.json](company-llm-preference/cards.json) |
| 大厂公开面经合集（转载自述） | RoPE 位置编码 | 1 | [cards.json](company-transformer-positions/cards.json) |
| 动手学深度学习 / 字节面经（转载自述） | 信息论与统计推断 | 10 | [cards.json](information-theory/cards.json) |
| PyTorch / 快手与腾讯面经（转载自述） | 训练优化与归一化 | 14 | [cards.json](training-optimization/cards.json) |
| 小米面经（转载自述） / DeepSeekMath | GRPO 组内相对优势 | 1 | [cards.json](company-grpo/cards.json) |
| Faiss / Pinecone | 向量距离、索引与过滤 | 9 | [cards.json](faiss-retrieval/cards.json) |
| AWS / LangGraph / HTTP 标准 | Agent 工具调用容错 | 12 | [cards.json](agent-reliability/cards.json) |
| Zeek / Suricata | 网络日志字段、协议与可见性 | 14 | [cards.json](network-protocol-logs/cards.json) |
| MITRE ATT&CK | 威胁行为与检测上下文 | 10 | [cards.json](threat-behavior/cards.json) |
| OWASP Cheat Sheet | 访问控制、上传与输入处理 | 17 | [cards.json](web-vulnerability-analysis/cards.json) |
| Google ML / scikit-learn | 安全模型评估与反馈 | 5 | [cards.json](security-evaluation-practice/cards.json) |
| 蚂蚁、腾讯面经（转载自述） / DeepSpeed | 分布式训练与稀疏模型 | 4 | [cards.json](company-distributed-training/cards.json) |
| VirusTotal 官方文档 | 文件标识、引擎结果与分析状态 | 3 | [cards.json](virustotal-analysis/cards.json) |
| Python、RFC 3986 与 Public Suffix List | 网址解析、主机与域名边界 | 5 | [cards.json](phishing-url-parsing/cards.json) |
| OASIS STIX 2.1 | 攻击活动、分析与情报分组 | 5 | [cards.json](stix-analysis-objects/cards.json) |
| FIRST CVSS v3.1 | 漏洞严重性、利用条件与风险 | 5 | [cards.json](cvss-v31/cards.json) |
| CLIP、ViT 论文 / Hugging Face | 图文模型、视觉模型与分割 | 6 | [cards.json](vision-language-basics/cards.json) |
| TorchVision / TorchMetrics | IoU、NMS 与检测评估 | 3 | [cards.json](vision-evaluation/cards.json) |
| Tesseract / LayoutLMv3 | OCR 与文档布局 | 3 | [cards.json](document-understanding/cards.json) |
| Hugging Face 音频课程 | 音频表示与语音评估 | 5 | [cards.json](speech-audio-basics/cards.json) |
| 字节、腾讯面经（转载自述） / 训练资料 | 参数显存估算与持续学习 | 2 | [cards.json](company-memory-interviews/cards.json) |
| Anthropic、LangChain 与 Agent 论文 | 工作流、委派与记忆 | 8 | [cards.json](agent-design-patterns/cards.json) |
| MITRE CWE | 资源竞争、内存与凭据风险 | 5 | [cards.json](code-lifetime-credentials/cards.json) |
| OWASP 密码存储指南 | 密码哈希、盐与成本 | 5 | [cards.json](password-storage-review/cards.json) |
| CodeQL Python 文档 | 外部库传播建模 | 1 | [cards.json](codeql-python-models/cards.json) |
| LLM4Vuln 论文 | 漏洞类型识别评估 | 1 | [cards.json](llm-vulnerability-evaluation/cards.json) |
| NIST SP 800-61r3 | 事件优先级、升级与跟踪 | 4 | [cards.json](incident-prioritization/cards.json) |
| PyTorch / 字节面经（转载自述） | 张量内存布局与视图 | 3 | [cards.json](tensor-memory-layout/cards.json) |
| 字节、百度面经（转载自述） / 论文 | FlashAttention 与上下文学习 | 3 | [cards.json](company-attention-interviews/cards.json) |
| 视觉算法公开面经（个人自述） / 原论文 | 目标检测、FPN 与卷积结构 | 8 | [cards.json](company-vision-interviews/cards.json) |
| scikit-learn / DGA 论文 | 异常检测模型与评分 | 5 | [cards.json](anomaly-detection-models/cards.json) |
| NIST SP 800-94 | 协议分析与异常画像 | 1 | [cards.json](ids-protocol-analysis/cards.json) |
| Elastic | BM25 与排名融合 | 4 | [cards.json](lexical-retrieval/cards.json) |
| LangChain / Sentence Transformers | 文档切块与检索编码 | 5 | [cards.json](retrieval-context-preparation/cards.json) |
| Faiss | 索引参数、训练与更新 | 7 | [cards.json](faiss-index-maintenance/cards.json) |
| 百度、腾讯公开面经（转载自述） / 论文 | LoRA 与混合精度 | 3 | [cards.json](company-finetuning-interviews/cards.json) |
| CodeQL Python 文档 | 控制流与可达性 | 4 | [cards.json](codeql-control-flow/cards.json) |
| Semgrep 文档 | 规则模式与匹配位置 | 4 | [cards.json](semgrep-patterns/cards.json) |
| LLVM Sanitizer / libFuzzer | 未初始化内存、泄漏与测试入口 | 7 | [cards.json](fuzz-sanitizers/cards.json) |
| Sigma 2.1.0 规范 | 日志来源、条件与规则说明 | 8 | [cards.json](sigma-rule-authoring/cards.json) |
| FIRST / CISA / MITRE | 漏洞概率、在野利用与弱点分类 | 8 | [cards.json](vulnerability-intelligence/cards.json) |
| NIST SP 800-61r3 | 事件恢复与记录保护 | 4 | [cards.json](incident-recovery-details/cards.json) |
| 动手学深度学习 | 矩阵性质、秩与特征向量 | 5 | [cards.json](math-linear-properties/cards.json) |
| 动手学深度学习 / NIST | 条件独立、协方差与统计推断 | 9 | [cards.json](math-statistical-inference/cards.json) |
| Hugging Face / BERT 论文 | 序列标注、实体识别与预训练 | 10 | [cards.json](nlp-sequence-bert/cards.json) |
| A2A 1.0.0 / MCP | 智能体协作与协议比较 | 5 | [cards.json](agent-a2a-design/cards.json) |
| A2A 1.0.0 | 任务标识、状态与通知 | 4 | [cards.json](a2a-task-lifecycle/cards.json) |
| LangSmith 文档 | Agent 评估、轨迹与回归 | 8 | [cards.json](agent-evaluation-methods/cards.json) |
| 腾讯安全岗位公开面经（合集收录） / 论文 | 加密流量检测 | 1 | [cards.json](company-security-detection/cards.json) |
| 蚂蚁安全岗位公开面经（合集收录） / 标准 | 告警聚类与攻击结果核验 | 2 | [cards.json](company-security-operations/cards.json) |
| 阿里、腾讯、京东、字节、美团公开面经（合集收录） / 技术文档 | 越权、注入与 Web 防护 | 6 | [cards.json](company-security-code/cards.json) |
| 百度、科大讯飞、阿里公开面经（合集收录） / 论文与文档 | 并行训练、蒸馏与稀疏模型 | 7 | [cards.json](company-distributed-ml/cards.json) |
| 腾讯安全岗位公开面经（合集收录） / 动手学深度学习 | 优化器与随机梯度 | 3 | [cards.json](company-optimization/cards.json) |
| Phishpedia / PhishIntention 论文 | 视觉钓鱼识别、品牌和凭据意图 | 9 | [cards.json](phishing-visual/cards.json) |
| VirusTotal 官方文档 | 网址跳转、引擎结果与文件时间 | 8 | [cards.json](virustotal-url-context/cards.json) |
| TESSERACT 论文 | 时间评估、主动学习和拒判成本 | 5 | [cards.json](malware-temporal-evaluation/cards.json) |
| BODMAS 数据集文档 | 恶意文件特征、元数据与时间 | 3 | [cards.json](bodmas-benchmark/cards.json) |
| PrimeVul 论文 | 漏洞标签、误报约束与成对评估 | 6 | [cards.json](primevul-evaluation/cards.json) |
| NIST SP 800-61r3 | 事件证据处理与恢复时机 | 2 | [cards.json](incident-evidence-workflow/cards.json) |
| osquery 官方文档 | 主机状态、事件采集与日志 | 10 | [cards.json](osquery-telemetry/cards.json) |
| 腾讯安全面经（合集收录） / Community ID | 多源流量关联 | 4 | [cards.json](company-flow-correlation/cards.json) |
| FIRST TLP 2.0 | 威胁情报共享边界 | 7 | [cards.json](tlp-threat-sharing/cards.json) |
| Ragas 官方文档 | 回答与上下文评估 | 4 | [cards.json](ragas-evaluation-details/cards.json) |
| MITRE ATT&CK FAQ | 战术顺序与知识库覆盖 | 2 | [cards.json](attack-coverage-limits/cards.json) |
| JSON Lines / Python CSV / Parquet | 数据格式与读取 | 10 | [cards.json](structured-data-formats/cards.json) |
| PyTorch 文档 | 数据加载、复现与检查点 | 19 | [cards.json](training-data-loader/cards.json) |
| scikit-learn | 类别编码与阈值 | 9 | [cards.json](categorical-encoding/cards.json) |
| pandas / MITRE ATT&CK | 安全事件时间窗口 | 6 | [cards.json](security-window-features/cards.json) |
| 字节公开面经（合集收录） / SentencePiece | 子词分词 | 5 | [cards.json](company-tokenization-concepts/cards.json) |
| Sigma 2.1.0 | 关联规则与转换边界 | 8 | [cards.json](sigma-correlation-detail/cards.json) |
| PyTorch Geometric | 图批处理、采样与异构图 | 13 | [cards.json](pyg-graph-engineering/cards.json) |
| scikit-learn | Isolation Forest 配置与评分 | 7 | [cards.json](isolation-forest-usage/cards.json) |
| 蚂蚁安全面经（合集收录） / AFL++ | 二进制插桩与持久模式 | 7 | [cards.json](company-afl-interview/cards.json) |
| OSS-Fuzz-gen / LLVM | 模糊测试实验比较 | 2 | [cards.json](fuzz-evaluation-controls/cards.json) |
| NIST SP 800-150 | 威胁指标质量 | 5 | [cards.json](threat-indicator-quality/cards.json) |
| 快手、地平线公开面经 / Python 文档 | 拷贝与 IP 地址排序 | 2 | [cards.json](company-interview-python/cards.json) |
| 小米安全岗位公开面经 / OWASP、CodeQL | 安全测试、依赖与路径分析 | 3 | [cards.json](company-interview-code-audit/cards.json) |
| 美团公开面经 / MDN | 正向与反向代理 | 1 | [cards.json](company-interview-network/cards.json) |
| 小米、科大讯飞、字节、腾讯公开面经 / 论文与文档 | 强化学习、偏好训练与显存 | 5 | [cards.json](company-interview-alignment/cards.json) |
| 快手公开面经主题启发 / Anthropic、OWASP | Agent 上下文与提示注入 | 2 | [cards.json](company-interview-agent-design/cards.json) |
| 美团公开面经 / 对抗稳健性论文 | 对抗训练与安全评估 | 2 | [cards.json](company-interview-evaluation/cards.json) |
| 动手学深度学习 | 卷积、通道与池化 | 14 | [cards.json](cnn-foundations/cards.json) |
| D2L、CS231n 与 PyTorch 2.7 文档 | CNN 感受野、膨胀／分组卷积、参数量与上采样 | 17 | [cards.json](cnn-architecture-practice/cards.json) |
| 动手学深度学习 | 循环网络、LSTM 与 GRU | 12 | [cards.json](recurrent-foundations/cards.json) |
| 动手学深度学习 / PyTorch 2.15 | 初始化与归一化 | 7 | [cards.json](deep-init-normalization/cards.json) |
| Hugging Face Tokenizers / Transformers | 分词流程与位置映射 | 5 | [cards.json](tokenization-pipeline-details/cards.json) |
| Transformers 5.23 / PyTorch 2.15 | 输入掩码与抽取问答 | 13 | [cards.json](transformer-input-qa/cards.json) |
| LangChain / Anthropic | Agent 记忆与上下文 | 9 | [cards.json](agent-memory-context/cards.json) |
| 概率教材与文档 / 动手学深度学习 | 概率与矩阵性质 | 8 | [cards.json](probability-matrix-identities/cards.json) |
| scikit-learn | 概率校准与评分 | 7 | [cards.json](ml-probability-calibration/cards.json) |
| scikit-learn | 交叉验证与模型选择 | 5 | [cards.json](evaluation-cross-validation/cards.json) |

| MCP 2025-11-25 | 提示、采样与工具交互 | 17 | [cards.json](mcp-advanced-interactions/cards.json) |
| LangSmith / 蚂蚁公开面经主题启发 / 评审论文 | Agent 评测与偏差 | 8 | [cards.json](agent-evaluation-reliability/cards.json) |
| spaCy / ACL 论文 | 情报实体链接与关系抽取 | 9 | [cards.json](cti-entity-linking/cards.json) |
| NIST SP 800-150 | 威胁指标、上下文与时效 | 6 | [cards.json](threat-indicator-lifecycle/cards.json) |
| Datasheets for Datasets | 安全数据集说明 | 9 | [cards.json](security-dataset-documentation/cards.json) |
| Model Cards / Hugging Face | 安全模型评估报告 | 9 | [cards.json](model-card-security-evaluation/cards.json) |
| SageMaker / Google SRE | 安全模型上线验证 | 6 | [cards.json](security-deployment-evaluation/cards.json) |
| 研究论文与技术文档 | 旧题核验依据，合并到旧主卡 | 7 | [cards.json](legacy-review-sources-25/cards.json) |

| 字节公开面经主题启发 / SimCSE、Sentence Transformers | 对比学习与检索 | 9 | [cards.json](company-contrastive-learning/cards.json) |
| 百度公开面经主题启发 / PyTorch | 分布式训练与梯度同步 | 10 | [cards.json](company-ddp-interviews/cards.json) |

| 哔哩哔哩、商汤、360、滴滴公开面经 | 既有安全考点的面经来源 | 5 | [cards.json](company-security-experiences-27/cards.json) |

| DNS RFC / 腾讯公开面经主题启发 | 域名解析与安全观测 | 22 | [cards.json](dns-observation-fundamentals/cards.json) |

| The Fuzzing Book / LLVM / 蚂蚁公开面经主题启发 | 覆盖反馈、语料与测试判定 | 15 | [cards.json](fuzz-coverage-and-oracles/cards.json) |

| ToT、Self-Consistency、ReAct / 快手公开面经主题启发 | Agent 推理与搜索 | 14 | [cards.json](agent-search-strategies/cards.json) |

| SciPy、NIST、ASA / 旷视公开面经主题启发 | 重采样与统计推断 | 16 | [cards.json](statistics-resampling-inference/cards.json) |

| 携程公开面经 / Elastic、Sysmon、MITRE | 主机进程树 | 3 | [cards.json](company-ctrip-process/cards.json) |
| 携程公开面经 / Elastic | 反向连接检测 | 2 | [cards.json](company-ctrip-reverse-shell/cards.json) |
| XGBoost、scikit-learn / 腾讯云安全公开面经 | 梯度提升与树模型 | 17 | [cards.json](gradient-boosting-foundations/cards.json) |
| HyDE、ColBERT、RAG-Fusion / 快手公开面经主题启发 | 查询与多向量检索 | 8 | [cards.json](retrieval-query-embeddings/cards.json) |
| MetaGPT、LATS / 快手公开面经主题启发 | 多智能体协调与搜索 | 8 | [cards.json](agent-coordination-search/cards.json) |
| scikit-learn / 腾讯云鼎公开面经 | 支持向量机与回归 | 9 | [cards.json](svm-principles/cards.json) |
| 海康威视、顺丰公开面经 / OWASP | XSS、CSRF 与输入过滤 | 3 | [cards.json](company-security-web-fundamentals/cards.json) |
| YOLOv3、Mask R-CNN / 阿里视觉公开面经 | 目标检测架构 | 7 | [cards.json](vision-detector-architectures/cards.json) |
| Python 3.13 / 快手公开面经主题启发 | 线程、进程与协程 | 13 | [cards.json](python-concurrency-fundamentals/cards.json) |
| PagedAttention 原论文 / 阿里公开面经主题启发 | KV 缓存分页、共享与调度 | 7 | [cards.json](vllm-paged-attention/cards.json) |
| MITRE CWE / 华为公开面经主题启发 | 内存释放、别名与数据破坏 | 2 | [cards.json](company-huawei-memory/cards.json) |
| URLNet 恶意网址检测研究论文 | URL 词袋、词表外信息与黑名单局限 | 7 | [cards.json](urlnet-detection/cards.json) |
| OpenStax 与 Introduction to Probability | 概率分布、正态近似与抽样 | 14 | [cards.json](probability-distributions/cards.json) |
| BLIP / BLIP-2 原论文与百度、快手公开面经 | 图文预训练与 Q-Former | 9 | [cards.json](blip-interviews/cards.json) |
| Toolformer 原论文与字节公开面经主题启发 | 工具使用训练与调用 | 5 | [cards.json](toolformer-interview/cards.json) |
| scikit-learn 1.9.1 | 缺失值填充、近邻与缺失指示 | 14 | [cards.json](missing-data-imputation/cards.json) |
| scikit-learn / 腾讯云安全公开面经主题启发 | 半监督、伪标签与标签传播 | 16 | [cards.json](semi-supervised-security/cards.json) |
| 时间序列区间评估论文 / 排名指标 | 异常区间评估与旧卡依据 | 11 | [cards.json](range-anomaly-evaluation/cards.json) |
| Microsoft Sysmon / 腾讯云鼎公开面经主题启发 | 主机事件、采集状态与过滤配置 | 12 | [cards.json](sysmon-host-monitoring/cards.json) |
| DeepSeek-V2、YaRN、GQA / 字节、百度、腾讯、阿里公开面经 | 长上下文、注意力与 KV 缓存 | 5 | [cards.json](company-long-context-interviews/cards.json) |
| OWASP / 阿里、蚂蚁公开面经 | 密码找回与多因素认证 | 3 | [cards.json](company-authentication-interviews/cards.json) |
| DeepLog / LogBERT 原论文 | 日志序列建模、参数异常与诊断 | 16 | [cards.json](log-sequence-anomaly/cards.json) |
| FuzzGPT、Fuzz4All、Csmith / PyTorch | 生成策略、差分预言机与实验评估 | 19 | [cards.json](llm-fuzzing-methods/cards.json) |
| SIABench、SOC 人机协作研究 / Microsoft Defender、ECS | 安全调查、事件分类与运营评估 | 16 | [cards.json](soc-investigation-evaluation/cards.json) |
| D2L、T5、BART、Scheduled Sampling / PyTorch、Transformers | 序列生成、去噪预训练与掩码 | 21 | [cards.json](seq2seq-pretraining/cards.json) |
| PingCAP、头条公开面经主题启发 / PortSwigger 等 | 盲注与已有安全考点来源 | 5 | [cards.json](company-security-ai-interviews-53/cards.json) |
| Voyager 原论文 | 自动课程、技能库与代码反馈 | 9 | [cards.json](voyager-agent-skills/cards.json) |
| WebArena 原论文 | 网页智能体观察、操作与评估 | 11 | [cards.json](webarena-agent-evaluation/cards.json) |
| BEIR 原论文 | 零样本检索与评测标注偏差 | 9 | [cards.json](beir-retrieval-evaluation/cards.json) |
| scikit-learn 1.9 / Distill | PCA、截断 SVD 与 t-SNE 基础 | 22 | [cards.json](pca-manifold-basics/cards.json) |
| MITRE / Domainator / 蚂蚁面经主题启发 | DNS 隧道检测与模型评估 | 10 | [cards.json](dns-tunnel-detection/cards.json) |
| CIRA-CIC-DoHBrw-2020 | 加密 DNS 数据集与特征 | 6 | [cards.json](cic-dohbrw-dataset/cards.json) |
| D2L、ResNet / 格灵深瞳面经主题启发 | 激活、残差与自动微分 | 12 | [cards.json](neural-network-foundations/cards.json) |
| D2L、PyTorch 2.15 / 地平线面经主题启发 | 损失、Softmax 与正则化 | 17 | [cards.json](loss-regularization-foundations/cards.json) |
| TRL、Transformers、FLAN / 腾讯与字节面经主题启发 | 监督微调数据、对话模板与损失掩码 | 22 | [cards.json](sft-dialogue-foundations/cards.json) |
| Hugging Face 音频课程、librosa、CTC、wav2vec 2.0、Whisper | 音频采样、语音识别与评估基础 | 35 | [cards.json](speech-recognition-foundations/cards.json) |
| NumPy 2.2、Python 3.13 / 字节面经主题启发 | 数组索引、内存、形状与 Python 数据处理 | 33 | [cards.json](numpy-data-fundamentals/cards.json) |
| USENIX 安全评估与标签研究 / 腾讯科恩面经主题启发 | 工作点、低误报与标签质量 | 23 | [cards.json](security-operating-point-evaluation/cards.json) |
| Python 3.13 / 字节面经主题启发 | 基础语法、作用域、对象与装饰器 | 49 | [cards.json](python-syntax-foundations/cards.json) |
| scikit-learn 1.7 | 常用训练、预处理和评估接口 | 26 | [cards.json](sklearn-common-apis/cards.json) |
| Dive into Deep Learning、OpenStax、NumPy 2.2 | 微积分、凸优化和矩阵分解 | 30 | [cards.json](math-optimization-matrices/cards.json) |
| The Matrix Cookbook（Petersen 与 Pedersen，2012） | 矩阵微分、迹、二次型、矩阵逆、行列式和范数梯度 | 17 | [cards.json](matrix-calculus-foundations/cards.json) |
| Boyd 与 Vandenberghe《Convex Optimization》第 5 章 | 拉格朗日对偶、Slater 条件与 KKT 最优性条件 | 16 | [cards.json](convex-optimization-kkt/cards.json) |
| PyTorch 2.7 官方文档 | 自动微分、模块和训练接口 | 26 | [cards.json](pytorch-common-training/cards.json) |
| Self-RAG、CRAG、RAPTOR、Lost in the Middle 原论文 | 检索纠错、递归摘要与长上下文评估 | 26 | [cards.json](rag-advanced-methods/cards.json) |
| LangGraph Python 官方文档 | 状态合并、并行调度、检查点和流式输出 | 25 | [cards.json](langgraph-state-runtime/cards.json) |
| Generative Agents、CAMEL 原论文 | 记忆检索、反思、计划与角色协作 | 24 | [cards.json](generative-agent-camel/cards.json) |
| The Fuzzing Book、AFL++ / 蚂蚁公开面经主题启发 | 语法生成、推导树和自定义变异 | 25 | [cards.json](grammar-fuzzing/cards.json) |
| LangChain 官方文档 | 消息、提示、Runnable 与工具 | 22 | [cards.json](langchain-fundamentals/cards.json) |
| PEFT 0.17.0、LoRA 与 QLoRA 论文 / 蚂蚁公开面经主题启发 | LoRA 配置、适配器管理和量化 | 21 | [cards.json](lora-peft-practice/cards.json) |
| Python 3.12 标准库 / 字节公开面经主题启发 | 迭代器、函数缓存与容器 | 36 | [cards.json](python-stdlib-iterators/cards.json) |
| Word2Vec、负采样、GloVe、fastText 原论文 | 词向量、局部上下文与子词表示 | 28 | [cards.json](word-vector-foundations/cards.json) |
| OASIS STIX 2.1 标准 | 模式表达式、观测匹配与时间限定 | 27 | [cards.json](stix-pattern-fundamentals/cards.json) |
| PyTorch 2.7 文档 / 字节公开面经主题启发 | 张量索引、广播、变长序列与梯度接口 | 29 | [cards.json](pytorch-tensor-operations/cards.json) |
| MalConv、长序列固定内存方法论文 | 字节序列检测、池化与长文件处理 | 25 | [cards.json](malconv-byte-models/cards.json) |
| scikit-learn 1.7 官方文档 | 分类评估指标、评分与交叉验证 | 19 | [cards.json](sklearn-metrics-validation/cards.json) |
| Sigma 2.1.0 规则与修饰符规范 | 检测条件、编码、字段引用和占位符 | 26 | [cards.json](sigma-modifier-fundamentals/cards.json) |
| GraphRAG 原论文与 Microsoft GraphRAG v3.3.0 文档 | 图索引、社区摘要与局部／全局检索 | 23 | [cards.json](graphrag-foundations/cards.json) |
| Kitsune 原论文与固定版本开源代码 | 在线网络异常检测、特征分组与自编码器集成 | 30 | [cards.json](kitsune-online-detection/cards.json) |
| langchain-core 1.8.4 官方源码与文档 | 消息、工具结果、提示模板和 Runnable 调用 | 18 | [cards.json](langchain-core-practice/cards.json) |
| langchain-core 1.8.4 官方源码 | 嵌入接口、检索器、MMR 和评分 | 7 | [cards.json](langchain-rag-apis/cards.json) |
| langchain-core 1.8.4 官方源码 | 流式消息、工具调用分片与上下文裁剪 | 12 | [cards.json](langchain-stream-context/cards.json) |
| PEFT 0.17.0 官方源码 | LoRA 训练配置、量化准备与适配器合并 | 15 | [cards.json](lora-training-details/cards.json) |
| Berkeley CS188 / POMDP.org 教程 | Agent 环境、状态与信念 | 16 | [cards.json](agent-observation-belief/cards.json) |
| AIMA 第四版第 2 章 | 经典 Agent 架构、理性、效用与学习组件 | 16 | [cards.json](agent-architecture-foundations/cards.json) |
| MIT 6.042J Mathematics for Computer Science | 命题逻辑、集合、函数、关系、归纳证明、程序不变式与组合计数 | 36 | [cards.json](discrete-math-cs-foundations/cards.json) |
| Cornell CS 4120 与 Crafting Interpreters | LL(1)、FIRST/FOLLOW、LR/LALR、文法冲突与 Pratt 表达式解析 | 32 | [cards.json](compiler-parser-construction/cards.json) |
| CP-Algorithms | Ford-Fulkerson、Edmonds-Karp、Dinic、最大流最小割与二分图匹配 | 33 | [cards.json](graph-flow-matching-foundations/cards.json) |
| Microsoft Sentinel 官方文档快照 | 定时检测、告警分组与摄取延迟 | 22 | [cards.json](sentinel-rule-operations/cards.json) |
| Magma / FuzzBench / 模糊测试评估论文 | 已知缺陷基准、触发与删失时间 | 22 | [cards.json](magma-fuzz-evaluation/cards.json) |
| 标签偏移与协变量偏移论文 | 安全模型分布变化与重要性加权 | 16 | [cards.json](security-distribution-shift/cards.json) |
| Open Data Structures / Princeton Algorithms / NetworkX | 图论基本概念、连通性与路径 | 26 | [cards.json](graph-theory-foundations/cards.json) |
| FIRST EPSS 官方说明与 API | 漏洞情报的使用边界与数据获取 | 17 | [cards.json](epss-evidence-usage/cards.json) |
| TESSERACT 论文与 scikit-learn 1.7 文档 | 时间切分、类别比例、验证与模型更新 | 15 | [cards.json](tesseract-evaluation-detail/cards.json) |
| Python 3.12 官方文档 | 类型提示、结构化类型与数据类 | 31 | [cards.json](python-typing-dataclasses/cards.json) |
| scikit-learn 1.7 官方文档 | 特征筛选、递归消除与置换重要性 | 38 | [cards.json](sklearn-feature-selection/cards.json) |
| LLM4Vuln v4 论文与 OWASP WSTG v4.2 | 漏洞推理、审计结果标注与验证 | 17 | [cards.json](llm4vuln-study/cards.json) |
| BLEU、ROUGE 原论文 / Transformers 4.51.3 | 文本生成指标、困惑度与评估口径 | 22 | [cards.json](nlp-generation-evaluation/cards.json) |
| CLIP、Vision Transformer 原论文 | 图文对比学习、图像块与位置编码 | 16 | [cards.json](clip-vit-foundations/cards.json) |
| Berkeley CS188 | 规划状态、无信息搜索与启发式搜索 | 30 | [cards.json](agent-classical-search/cards.json) |
| DeepCASE 原论文与作者仓库 | 安全事件上下文、聚类和人工研判 | 24 | [cards.json](deepcase-contextual-triage/cards.json) |
| MITRE ATT&CK v20 | MFA 疲劳、远程服务和凭据材料滥用 | 11 | [cards.json](identity-lateral-detection/cards.json) |
| EMBER2024、SOREL-20M 原论文及固定版本仓库 | 恶意软件数据集、标签与时间切分 | 28 | [cards.json](modern-malware-benchmarks/cards.json) |
| Cuckoo Sandbox 2.0.7 | 动态分析、执行条件与结果 | 12 | [cards.json](cuckoo-dynamic-analysis/cards.json) |
| TRANSCENDENT 原论文 | 共形评估、拒判与恶意软件漂移 | 13 | [cards.json](conformal-malware-evaluation/cards.json) |
| CISA KEV JSON Schema | 漏洞情报字段和状态解释 | 10 | [cards.json](cisa-kev-schema/cards.json) |
| PhishIntention 与多模态钓鱼研究 | 网页布局、页面交互和输入边界 | 20 | [cards.json](phishing-multimodal-methods/cards.json) |
| NEUZZ 原论文及复现研究与作者回应 | 神经代理、梯度变异和评估 | 15 | [cards.json](neuzz-neural-fuzzing/cards.json) |
| 入侵分析钻石模型原文 | 事件特征、分析跳转与活动关联 | 18 | [cards.json](diamond-intrusion-analysis/cards.json) |

各来源文件中的 `source.url` 指向原始资料。题目、答案、解析和例子由资料整理或结合安全场景编写；`evidence` 标记 `source` 表示主要依据来源内容，`application` 表示基于资料的场景应用或实验建议。已复核题目标记 `origin: 自行整理`，并以 `reference` 标注逐题依据；引用其他资料时可用 `referenceId`、`referenceTitle` 和 `referenceType` 指明来源编号、名称与类型，`referenceId` 也用于按具体来源筛选；`supportingReferences` 可为同一题保存额外技术依据。公开面经的公司、岗位与经历均为发帖人自述，并非经企业确认的官方题库；每道面经卡另附技术依据。

## 标准化结果

- [cards.json](normalized/cards.json)：去重后的完整卡片，包含稳定编号、方向、主题、难度、标签、解析、例子和全部来源引用。
- [anki-regular.tsv](normalized/anki-regular.tsv)：常规学习卡片，可直接导入 Anki。
- [anki-import.tsv](normalized/anki-import.tsv)：完整制卡文本，包含常规和研究拓展卡片；研究拓展题带有对应标签。
- [aliases.json](aliases.json)：已确认的重复知识点及合并理由，保留每个来源的原始题号。
- [splits.json](splits.json)：组合题拆分到多个单点主卡的规则，保留原题来源。
- [retired-v11.json](retired-v11.json)：合并旧主卡时用于保护学习记录和用户编辑的迁移快照。
- [retired-v17.json](retired-v17.json)：修正旧卡前提及合并说明时用于保护学习记录和用户编辑的迁移快照。
- [retired-v18.json](retired-v18.json)：合并相似样本评估旧卡时用于保护学习记录和用户编辑的迁移快照。
- [retired-v19.json](retired-v19.json)：修正恶意软件静态与动态特征旧卡时用于保护学习记录和用户编辑的迁移快照。
- [retired-v20.json](retired-v20.json)：合并钓鱼、恶意文件、漏洞检测及安全摘要重复旧卡时的迁移快照。
- [retired-v21.json](retired-v21.json)：拆分 RAG 组合题和合并模型复评旧卡时的迁移快照。
- [retired-v22.json](retired-v22.json)：修正分类、类别不平衡及阈值旧题并合并预处理题前的迁移快照。
- [retired-v23.json](retired-v23.json)：拆分模糊测试实验与入口审查组合题前的迁移快照。
- [retired-v25.json](retired-v25.json)：修正变量重命名实验的语义保持条件前的迁移快照。
- [retired-v38.json](retired-v38.json)：修正事件时间窗口题前的迁移快照。
- [retired-v49.json](retired-v49.json)：明确攻击事件关联前提之前的迁移快照。
- [retired-v52.json](retired-v52.json)：澄清基于 Zeek 日志的模型评分之前的迁移快照。
- [retired-v54.json](retired-v54.json)：明确事件摘要评估维度之前的迁移快照。
- [retired-v55.json](retired-v55.json)：明确模型漂移的资料口径之前的迁移快照。
- [retired-v62.json](retired-v62.json)：明确告警优先级标签的前提之前的迁移快照。
- [retired-v82.json](retired-v82.json)：拆分旧面试组合题前的迁移快照。
- [retired-v83.json](retired-v83.json)：拆分漏洞分析和审计评估组合题前的迁移快照。
- [retired-v238.json](retired-v238.json)：基础阶段校准前的主卡快照，用于迁移旧数据并保留用户修改和进度。
- [retired-v239.json](retired-v239.json)：全库阶段校准前的 397 张变更卡片快照，用于迁移旧数据并保留用户修改和进度。
- [stage-calibration-v240.json](stage-calibration-v240.json)：全库阶段复核的分级口径和阶段变更明细。
- [tag-aliases.json](tag-aliases.json)：标签同义词，例如 `LLM` 和 `大语言模型` 统一为 `大模型`。
- [scope-map.json](scope-map.json)：旧主卡的知识方向映射，仅用于覆盖统计，不代表旧题已复核。
- [review-batches.json](review-batches.json)：已复核主卡及内容摘要；题目、分类或来源改变后必须重新复核才能继续计数。
- [interview-research-cards.json](interview-research-cards.json)：人工标记为研究拓展的卡片及其原始问答、原因；题目变化后须重新判断。
- [similarity-reviews.json](similarity-reviews.json)：当前全库相似候选的人工判定；题目变化后重新运行候选扫描并复核新增或失效记录。

应用内可以按**学习范围、阶段、方向、主题、来源**筛选，也可以搜索问题、答案、解析、例子、标签、阶段和来源名称，并直接学习已开启阶段的筛选结果。来源中的「全部公开面经」汇总含面经出处的卡片，也可以选择具体公司；重复考点保留多个来源，只出现一次。两份 Anki 文件的卡片都带有 `阶段::基础`、`阶段::进阶` 或 `阶段::实践` 标签。

## 分类与去重

卡片使用三层组织：方向对应安全任务，主题描述具体场景，标签记录方法、数据和易错点；来源作为独立维度。一张合并后的卡片可以保留多个来源，而不会因来源不同重复出现在学习队列中。

去重先检查编号和标准化后的完全相同问题，再扫描文本相似候选；相似结果只作为人工复核线索。确认是同一知识点后，将新题编号映射到已有主卡，并记录理由。相反概念和关注点不同的问题应保留：例如“误报”和“漏报”措辞相似，但需要分开学习。

相似检查跨应用分类进行；文字相似度无法发现所有语义重复，新增资料时仍需对照已有问题、答案和适用条件进行人工判断。旧库中的精确率与召回率、RAG 可靠性及模糊测试组合题已拆分到单点卡，重复的阈值选择题及模型复评题已合并；旧版卡片的迁移与归档规则保留学习记录。

## 新增题库

1. 创建一个来源目录，放入 `cards.json`。每条题使用来源内稳定且全局唯一的 `id`，填写 `category`、`level`、`subtopic`、`knowledgePoint`、`questionType`、`origin`、`question`、`answer`、`explanation`、`example`、`tags`、`evidence` 和逐题 `reference`，并在来源填写 19 个方向中的 `knowledgeArea`。
2. 在 `src/data/banks.ts` 注册来源文件和主题，必要时在 `src/topics.ts` 添加主题。标签尽量复用现有词；同义词可登记到 `tag-aliases.json`。
3. 对照现有卡片检查知识点；确认重复时在 `aliases.json` 将新题指向已有主卡。已发布主卡的编号应保持不变，以保留学习记录。
4. 在完成范围、答案和语义去重复核后，将主卡编号及 `reviewDigest` 写入 `review-batches.json`；不得用程序自动把未复核题目标记为通过。执行下面的检查和导出命令。应用新增或修改卡片时，更新 `src/data/contentRevision.ts` 中的内容版本，并按需要补充迁移快照，再构建应用。旧版学习记录与已删除卡片会保留。

```powershell
npm run check:banks -- --candidates --threshold=0.55
npm test
npm run export:banks
npm run report:coverage
```

来源资料各有使用条件；本目录保存原创整理的问答与来源链接，不包含原始数据集。使用或再分发原始数据前，应核对对应来源的许可和访问规则。
