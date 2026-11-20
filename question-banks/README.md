# AI4SEC 题库

本目录保存按来源整理的 AI4SEC 学习卡，涵盖 AI、Agent 基础及其在安全中的应用。来源文件保留各资料对应的原始题目；应用与导出文件使用合并同一知识点后的卡片。现有卡片以安全应用为主，基础 AI 与 Agent 的扩充范围见下方规划。

万题集的知识范围与数量分配见 [万题集知识范围.md](万题集知识范围.md)。

当前收录 16 个外部来源的 178 条题目，以及应用原有的 40 张自编起步题。按照 20 条人工确认的合并规则，得到 **198 张标准化卡片**。卡片包含问题、答案、解析、示例、主题、标签和来源信息。

## 来源索引

| 来源 | 方向 | 来源题数 | 文件 |
| --- | --- | ---: | --- |
| CIC-IDS2017 官方数据集 | 恶意流量与实验设计 | 12 | [cards.json](cic-ids2017/cards.json) |
| UNSW-NB15 官方数据集 | 入侵检测与数据切分 | 10 | [cards.json](unsw-nb15/cards.json) |
| scikit-learn 评估文档 | 安全模型评估与数据泄漏 | 16 | [cards.json](sklearn-evaluation/cards.json) |
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

各来源文件中的 `source.url` 指向原始资料。题目、答案、解析和例子由资料整理或结合安全场景编写；`evidence` 标记 `source` 表示主要依据来源内容，`application` 表示基于资料的场景应用或实验建议。具体卡片使用其他相关页面时，通过 `reference` 单独标注。

## 标准化结果

- [cards.json](normalized/cards.json)：去重后的完整卡片，包含稳定编号、方向、主题、难度、标签、解析、例子和全部来源引用。
- [anki-import.tsv](normalized/anki-import.tsv)：制卡文本，包含问题、带解析和来源的答案，以及标签；支持按文本文件方式导入 Anki。
- [aliases.json](aliases.json)：已确认的重复知识点及合并理由，保留每个来源的原始题号。
- [tag-aliases.json](tag-aliases.json)：标签同义词，例如 `LLM` 和 `大语言模型` 统一为 `大模型`。

应用内可以按**方向、主题、来源**筛选，也可以搜索问题、答案、解析、例子、标签、难度和来源名称，并直接学习筛选结果。

## 分类与去重

卡片使用三层组织：方向对应安全任务，主题描述具体场景，标签记录方法、数据和易错点；来源作为独立维度。一张合并后的卡片可以保留多个来源，而不会因来源不同重复出现在学习队列中。

去重先检查编号和标准化后的完全相同问题，再扫描文本相似候选；相似结果只作为人工复核线索。确认是同一知识点后，将新题编号映射到已有主卡，并记录理由。相反概念和关注点不同的问题应保留：例如“误报”和“漏报”措辞相似，但需要分开学习。

当前以 0.55 的文本相似度阈值检查出 7 组候选，复核后均为不同知识点，予以保留。文字相似度无法发现所有语义重复，新增资料时仍需人工检查问题、答案和适用条件。

## 新增题库

1. 创建一个来源目录，放入 `cards.json`。每条题使用来源内稳定且全局唯一的 `id`，并填写 `category`、`level`、`question`、`answer`、`explanation`、`example`、`tags`、`evidence`；有更精确来源时填写 `reference`。
2. 在 `src/data/banks.ts` 注册来源文件和主题，必要时在 `src/topics.ts` 添加主题。标签尽量复用现有词；同义词可登记到 `tag-aliases.json`。
3. 对照现有卡片检查知识点；确认重复时在 `aliases.json` 将新题指向已有主卡。已发布主卡的编号应保持不变，以保留学习记录。
4. 执行下面的检查和导出命令。应用新增卡片时，同步增加 `src/data/seed.ts` 和 `src/data/migration.ts` 中的内容版本，再构建应用。旧版学习记录与已删除卡片会保留。

```powershell
npm run check:banks -- --candidates --threshold=0.55
npm test
npm run export:banks
```

来源资料各有使用条件；本目录保存原创整理的问答与来源链接，不包含原始数据集。使用或再分发原始数据前，应核对对应来源的许可和访问规则。
