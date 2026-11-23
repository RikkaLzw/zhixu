import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await expect(page.getByText('今天的学习')).toBeVisible();
});

test('find new statistics, planning and security cards with evidence', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  for (const [source, query, question] of [
    ['最大似然估计', 'k 次成功', 'n 次独立同分布伯努利观测中有 k 次成功，成功概率 p 在 [0,1] 上的最大似然估计是多少？'],
    ['样本均值与极限定理', '大数定律和中心极限定理', '大数定律和中心极限定理对样本均值分别关注什么？'],
    ['Graphplan 规划图', '没有被 Graphplan 的规则标记', '规划图中两个命题没有被 Graphplan 的规则标记为互斥，能否单独保证它们可在有效计划中共同达到？'],
    ['Zeek DNS 事务字段', 'TTLs 如何与 answers 对应', 'Zeek 7.2.1 在记录非空 DNS 回复摘要时，TTLs 如何与 answers 对应？'],
    ['Windows 4688 进程审核', '引入 Target Subject 的目的', 'Windows 4688 版本 2 引入 Target Subject 的目的是什么？'],
    ['TRAM 威胁报告映射', '是否覆盖 ATT&CK 的全部技术', '固定提交的 TRAM 开箱即用模型是否覆盖 ATT&CK 的全部技术？'],
    ['CALDERA 安全模拟', 'planner 的主要职责', 'CALDERA 5.0 中 planner 的主要职责是什么？'],
    ['蜜罐与威胁观测', '能否替代入侵检测和防御系统', 'NIST SP 800-94 认为蜜罐能否替代入侵检测和防御系统？'],
    ['AFLNet 协议模糊测试', '未启用 -E 状态感知模式', 'AFLNet 未启用 -E 状态感知模式时，是否仍能按请求序列与服务器交互？'],
  ]) {
    await page.getByRole('button', { name: `来源：${source}` }).click();
    await page.getByLabel('搜索卡片').fill(query);
    await expect(page.getByText(question)).toBeVisible();
  }
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel('AFLNet 固定提交：协议状态反馈与消息序列，原文依据')).toBeVisible();
});

test('find new retrieval and evaluation cards with sources', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '学习范围：全部卡片' }).click();
  for (const [source, query, question] of [
    ['Qdrant 向量检索', '同一层未指定的 payload 键', 'Qdrant Python client 1.15.1 的 set_payload 如何处理同一层未指定的 payload 键？'],
    ['CBPE 无标签性能估计', '对预估真阳性数贡献多少', '在二分类 CBPE 中，预测类别由概率阈值确定时，预测为正的样本其校准后正类概率 p 对预估真阳性数贡献多少？'],
    ['G-Eval 模型评审', '离散评分的概率得到更细的分数', 'G-Eval 论文如何利用离散评分的概率得到更细的分数？'],
    ['ALCE 引用评估', '没有任何引用的陈述', '在 ALCE 论文的 citation recall 定义中，没有任何引用的陈述得多少支持分？'],
    ['ARES RAG 评估', '结合了哪两类评估数据', 'ARES 使用预测驱动推断时，结合了哪两类评估数据？'],
    ['DINOv2 视觉自监督', '学生和教师的输入掩码', 'DINOv2 的 iBOT 图像块目标如何处理学生和教师的输入掩码？'],
    ['ISCXVPN2016 流量数据', '哪种连接方式', 'ISCXVPN2016 的 VPN 流量在官方说明中使用哪种连接方式？'],
  ]) {
    await page.getByRole('button', { name: `来源：${source}` }).click();
    await page.getByLabel('搜索卡片').fill(query);
    await expect(page.getByText(question)).toBeVisible();
  }
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel('UNB 官方说明：ISCXVPN2016 流量数据，原文依据')).toBeVisible();
});

test('find new computing topics and study their sources', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  for (const [source, query, question] of [
    ['最长公共子序列', '贪心匹配第二个字符串', '依次扫描第一个字符串，贪心匹配第二个字符串中当前位置之后首次出现的同一字符，一定能得到最长公共子序列吗？'],
    ['最小生成树', '起点到所有顶点的最短路径', '最小生成树一定同时给出某个起点到所有顶点的最短路径吗？'],
    ['Linux 时钟与耗时', '系统挂起期间', 'Linux CLOCK_BOOTTIME 与 CLOCK_MONOTONIC 在系统挂起期间有什么区别？'],
    ['Python mock 测试替身', '补丁哪个命名空间', 'Python 使用 unittest.mock.patch 替换依赖时，通常应补丁哪个命名空间？'],
    ['PostgreSQL 保存点与恢复', '语句错误进入中止状态', 'PostgreSQL 17 的显式事务因语句错误进入中止状态后，如何继续同一个事务而不是整体回滚？'],
  ]) {
    await page.getByRole('button', { name: `来源：${source}` }).click();
    await page.getByLabel('搜索卡片').fill(query);
    await expect(page.getByText(question)).toBeVisible();
  }
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel('PostgreSQL 17：事务错误与保存点恢复，原文依据')).toBeVisible();
});

test('find new inspection and agent cards and inspect the Baidu interview context', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  for (const [source, query, question] of [
    ['部分依赖与个体效应', '特征高度相关时', '特征高度相关时，为什么解释 PDP 或 ICE 需要谨慎？'],
    ['τ²-bench 双控制评测', '双控制”指哪两方', 'τ²-bench 的电信场景中，“双控制”指哪两方能够采取环境动作？'],
    ['百度面经', 'Sarsa 与 Q-learning 的一步目标', 'Sarsa 与 Q-learning 的一步目标对下一动作价值有何区别？'],
  ]) {
    await page.getByRole('button', { name: `来源：${source}` }).click();
    await page.getByLabel('搜索卡片').fill(query);
    await expect(page.getByText(question)).toBeVisible();
  }
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel('Sutton 与 Barto 第二版：Sarsa 与双重 Q 学习，原文依据')).toBeVisible();
  await expect(page.getByLabel('百度大模型公开面经：强化学习主题延伸，非原题，应用整理')).toBeVisible();
});

test('find new embedding, malware and training cards and inspect evidence', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  for (const [source, query, question] of [
    ['Matryoshka 可变维度表示', '利用不同维度降低搜索成本', 'Matryoshka 自适应检索怎样利用不同维度降低搜索成本？'],
    ['MalNet 图数据集', '是否所有样本都属于恶意软件', 'MalNet 图数据集是否所有样本都属于恶意软件？'],
    ['Trainer 评估与保存', '会立即因为该选项断言失败', 'Transformers 4.51.3 使用 EarlyStoppingCallback 但未启用 load_best_model_at_end，会立即因为该选项断言失败吗？'],
  ]) {
    await page.getByRole('button', { name: `来源：${source}` }).click();
    await page.getByLabel('搜索卡片').fill(query);
    await expect(page.getByText(question)).toBeVisible();
  }
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel('Transformers 4.51.3：Trainer 评估与检查点，原文依据')).toBeVisible();
});

test('find new general computer cards by source and study their evidence', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  for (const [source, query, question] of [
    ['Git 忽略规则', '先忽略 cache/', '根目录 .gitignore 先忽略 cache/，再写 !cache/keep.txt，能重新包含该文件吗？'],
    ['PostgreSQL 时间与时区', '跨夏令时切换时', 'PostgreSQL 对有时区时间加 interval 1 day 与加 interval 24 hours，跨夏令时切换时一定相同吗？'],
    ['gRPC 服务调用', '写操作返回 DEADLINE_EXCEEDED', 'gRPC 写操作返回 DEADLINE_EXCEEDED，能否断定服务端没有完成写入？'],
  ]) {
    await page.getByRole('button', { name: `来源：${source}` }).click();
    await page.getByLabel('搜索卡片').fill(query);
    await expect(page.getByText(question)).toBeVisible();
  }
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel('gRPC 官方指南：服务调用与期限，原文依据')).toBeVisible();
});

test('study a card, record its rating and retain progress after reload', async ({ page }) => {
  await page.screenshot({ path: 'test-results/home.png' });
  await page.getByRole('button', { name: '开始学习', exact: true }).click();
  await expect(page.getByText('有监督分类与异常检测的常见目标有什么区别？')).toBeVisible();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByText('有监督分类利用标注样本学习类别', { exact: false })).toBeVisible();
  await page.screenshot({ path: 'test-results/study.png' });
  await page.getByRole('button', { name: '记得，1 天后复习' }).click();
  await expect(page.getByText('安全检测中的标签泄漏是什么？')).toBeVisible();
  await page.getByRole('button', { name: '结束学习' }).click();
  await expect(page.getByText('今日学习次数')).toBeVisible();
  await page.reload();
  await page.getByRole('tab', { name: '进度' }).click();
  await expect(page.getByText('长期复习')).toBeVisible();
  await expect(page.getByText('累计学习')).toBeVisible();
  await expect(page.getByText('1 次', { exact: false }).first()).toBeVisible();
});

test('create, search, edit and delete an individual card', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '添加卡片' }).click();
  await page.getByLabel('卡片问题').fill('如何评估告警排序？');
  await page.getByLabel('卡片答案').fill('查看高优先级告警中的真实威胁比例。');
  await page.getByRole('button', { name: '保存卡片' }).click();
  await page.getByLabel('搜索卡片').fill('如何评估告警排序？');
  await expect(page.getByText('如何评估告警排序？')).toBeVisible();
  await page.getByRole('button', { name: '编辑卡片：如何评估告警排序？' }).click();
  await page.getByLabel('卡片答案').fill('结合真实威胁比例和分析人员处理量。');
  await page.getByRole('button', { name: '保存卡片' }).click();
  await expect(page.getByText('结合真实威胁比例和分析人员处理量。')).toBeVisible();
  await page.getByRole('button', { name: '删除卡片：如何评估告警排序？' }).click();
  await page.getByRole('button', { name: '确认删除' }).click();
  await expect(page.getByText('这里还没有卡片')).toBeVisible();
});

test('daily new-card limit persists', async ({ page }) => {
  await page.getByRole('button', { name: '学习设置' }).click();
  await page.screenshot({ path: 'test-results/settings.png' });
  const input = page.getByRole('textbox', { name: '每日新卡数量' });
  await expect(input).toHaveValue('500');
  await input.fill('5000');
  await page.getByRole('button', { name: '保存每日新卡数量' }).click();
  await page.getByRole('button', { name: '关闭设置' }).click();
  await page.reload();
  await page.getByRole('button', { name: '学习设置' }).click();
  await expect(page.getByRole('textbox', { name: '每日新卡数量' })).toHaveValue('5000');
  await page.getByRole('textbox', { name: '每日新卡数量' }).fill('5001');
  await page.getByRole('button', { name: '保存每日新卡数量' }).click();
  await expect(page.getByText('请输入 0～5000 之间的整数。')).toBeVisible();
  await page.reload();
  await page.getByRole('button', { name: '学习设置' }).click();
  await expect(page.getByRole('textbox', { name: '每日新卡数量' })).toHaveValue('5000');
});

test('filter by source and study a matching card with provenance', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.screenshot({ path: 'test-results/library.png' });
  await page.getByRole('button', { name: '来源：CIC-IDS2017' }).click();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByText('参考来源')).toBeVisible();
  await expect(page.getByLabel(/CIC-IDS2017 官方数据集/)).toBeVisible();
});

test('find LangChain and PEFT cards and inspect an interview-inspired source', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：LangChain 基础' }).click();
  await page.getByLabel('搜索卡片').fill('RunnablePassthrough');
  await expect(page.getByText('RunnablePassthrough 默认与使用 assign 时分别怎样处理字典输入？')).toBeVisible();
  await page.getByRole('button', { name: '来源：LangChain 实用接口' }).click();
  await page.getByLabel('搜索卡片').fill('tool_call_id');
  await expect(page.getByText('LangChain 的 ToolMessage.tool_call_id 有什么作用？')).toBeVisible();
  await page.getByRole('button', { name: '来源：LangChain 检索接口' }).click();
  await page.getByLabel('搜索卡片').fill('fetch_k 与 k');
  await expect(page.getByText('LangChain MMR 检索中的 fetch_k 与 k 分别控制什么？')).toBeVisible();
  await page.getByRole('button', { name: '来源：LangChain 流式与上下文' }).click();
  await page.getByLabel('搜索卡片').fill('include_system');
  await expect(page.getByText('langchain-core 1.8.4 使用 last 策略、include_system=True 且未设置 end_on 时，结果是否一定满足消息预算？')).toBeVisible();
  await page.getByRole('button', { name: '来源：LoRA 训练与部署' }).click();
  await page.getByLabel('搜索卡片').fill('prepare_model_for_kbit_training');
  await expect(page.getByText('为什么通常要在插入并启用 LoRA 适配器之前调用 PEFT 0.17 的 prepare_model_for_kbit_training？')).toBeVisible();
  await page.getByRole('button', { name: '来源：LoRA 与 PEFT' }).click();
  await page.getByLabel('搜索卡片').fill('init_lora_weights');
  await expect(page.getByText('PEFT 0.17 将 init_lora_weights 设为 False 时，初始 LoRA 更新是否仍保证为零？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel(/Hugging Face PEFT 0.17.0：LoRA/)).toBeVisible();
  await expect(page.getByLabel(/蚂蚁大模型一面公开面经.*LoRA 初始化主题启发，非原题/)).toBeVisible();
});

test('find text evaluation and CLIP foundations through source filters', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：文本生成与语言模型评估' }).click();
  await page.getByLabel('搜索卡片').fill('简短惩罚');
  await expect(page.getByText('原始 BLEU 的简短惩罚在候选总长度短于有效参考总长度时起什么作用？')).toBeVisible();
  await page.getByRole('button', { name: '来源：CLIP 与 ViT 基础' }).click();
  await page.getByLabel('搜索卡片').fill('相似度矩阵');
  await expect(page.getByText('原始 CLIP 对一批 N 个配对图文样本计算的两两相似度矩阵是什么形状？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel(/CLIP 与 Vision Transformer 原论文/)).toBeVisible();
});

test('find planning, alert triage and identity threat cards', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：Agent 规划与搜索' }).click();
  await page.getByLabel('搜索卡片').fill('f(n) 如何');
  await expect(page.getByText('A* 搜索使用的 f(n) 如何结合已付代价与估计剩余代价？')).toBeVisible();
  await page.getByRole('button', { name: '来源：DeepCASE 事件关联' }).click();
  await page.getByLabel('搜索卡片').fill('跨主机攻击链');
  await expect(page.getByText('DeepCASE 原论文的同机上下文为什么不能完整覆盖跨主机攻击链？')).toBeVisible();
  await page.getByRole('button', { name: '来源：身份与远程访问威胁' }).click();
  await page.getByLabel('搜索卡片').fill('哈希传递');
  await expect(page.getByText('哈希传递（Pass the Hash）的核心做法是什么？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel(/MITRE ATT&CK v20/)).toBeVisible();
});

test('find malware benchmarks, sandbox, conformal evaluation and KEV fields', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：现代恶意软件基准' }).click();
  await page.getByLabel('搜索卡片').fill('挑战集是否全部来自');
  await expect(page.getByText('EMBER2024 挑战集是否全部来自主训练期之后？')).toBeVisible();
  await page.getByRole('button', { name: '来源：Cuckoo 动态分析' }).click();
  await page.getByLabel('搜索卡片').fill('tlsmaster.txt');
  await expect(page.getByText('Cuckoo 2.0.7 的 tlsmaster.txt 在成功捕获到密钥时可用于什么？')).toBeVisible();
  await page.getByRole('button', { name: '来源：共形评估与恶意软件漂移' }).click();
  await page.getByLabel('搜索卡片').fill('p 值能否直接');
  await expect(page.getByText('共形评估中的 p 值能否直接当作预测类别为真的后验概率？')).toBeVisible();
  await page.getByRole('button', { name: '来源：CISA KEV 情报字段' }).click();
  await page.getByLabel('搜索卡片').fill('knownRansomwareCampaignUse 为 Known');
  await expect(page.getByText('CISA KEV 的 knownRansomwareCampaignUse 为 Known 或 Unknown 分别表示什么？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel(/CISA KEV：漏洞情报目录字段与使用/)).toBeVisible();
});

test('find linear algebra, checkpoint, FlashAttention and GNN cards through their sources', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '学习范围：全部卡片' }).click();
  await page.getByRole('button', { name: '来源：正交投影与最小二乘' }).click();
  await page.getByLabel('搜索卡片').fill('空 residuals');
  await expect(page.getByText('NumPy 2.0 的 lstsq 返回空 residuals 数组，是否表示残差一定为零？')).toBeVisible();
  await page.getByRole('button', { name: '来源：PyTorch 激活检查点' }).click();
  await page.getByLabel('搜索卡片').fill('determinism_check');
  await expect(page.getByText('PyTorch 2.7 non-reentrant 检查点的 determinism_check="default" 会检查重算数值完全相等吗？')).toBeVisible();
  await page.getByRole('button', { name: '来源：FlashAttention 算法' }).click();
  await page.getByLabel('搜索卡片').fill('独立对每个键块');
  await expect(page.getByText('FlashAttention 分块时，为什么不能独立对每个键块做 softmax 后直接相加？')).toBeVisible();
  await page.getByRole('button', { name: '来源：图神经网络模型' }).click();
  await page.getByLabel('搜索卡片').fill('root_weight=False');
  await expect(page.getByText('SAGEConv 设置 root_weight=False 后，是否保证节点自身信息绝不进入输出？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel(/GCN、GraphSAGE、GAT 与 PyG 2.6.1/)).toBeVisible();
});

test('find naive Bayes, sequence labeling and host threat cards through their sources', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：朴素贝叶斯' }).click();
  await page.getByLabel('搜索卡片').fill('朴素条件独立');
  await expect(page.getByText('朴素贝叶斯分类器中的“朴素”假设是什么？')).toBeVisible();
  await page.getByRole('button', { name: '来源：实体标注与评估' }).click();
  await page.getByLabel('搜索卡片').fill('attention_mask 与 labels');
  await expect(page.getByText('序列标注中 attention_mask 与 labels 的 -100 分别控制什么？')).toBeVisible();
  await page.getByRole('button', { name: '来源：隐马尔可夫模型' }).click();
  await page.getByLabel('搜索卡片').fill('Viterbi 算法分别');
  await expect(page.getByText('HMM 的前向算法与 Viterbi 算法分别主要计算什么？')).toBeVisible();
  await page.getByRole('button', { name: '来源：主机凭据与威胁行为' }).click();
  await page.getByLabel('搜索卡片').fill('安全审核事件 1102');
  await expect(page.getByText('Windows 安全审核事件 1102 表示什么？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel(/Microsoft：Windows 安全审核事件 1102/)).toBeVisible();
});

test('find asyncio, LangChain parsing and NAB cards through their source filters', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：Python 异步编程' }).click();
  await page.getByLabel('搜索卡片').fill('Queue 的 join');
  await expect(page.getByText('asyncio.Queue 的 join 为什么不能只依靠消费者调用 get 来结束等待？')).toBeVisible();
  await page.getByRole('button', { name: '来源：LangChain 输出解析' }).click();
  await page.getByLabel('搜索卡片').fill('pydantic_object');
  await expect(page.getByText('langchain-core 1.8.4 中，JsonOutputParser 即使传入 pydantic_object，也会像 PydanticOutputParser 一样校验输出吗？')).toBeVisible();
  await page.getByRole('button', { name: '来源：NAB 流式异常评估' }).click();
  await page.getByLabel('搜索卡片').fill('完美检测器和空检测器');
  await expect(page.getByText('NAB 的归一化分数如何使用完美检测器和空检测器作为基准？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel(/NAB：流式异常检测与时间敏感评估/)).toBeVisible();
});

test('find RL, Faiss and security dataset cards through their source filters', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：强化学习方法' }).click();
  await page.getByLabel('搜索卡片').fill('一步更新目标');
  await expect(page.getByText('表格型 Q-learning 的一步更新目标是什么？')).toBeVisible();
  await page.getByRole('button', { name: '来源：Faiss 索引接口' }).click();
  await page.getByLabel('搜索卡片').fill('结果不足');
  await expect(page.getByText('Faiss 1.12 的 search 请求 k 个结果但结果不足时，结果标签如何填充？')).toBeVisible();
  await page.getByRole('button', { name: '来源：CTU-13 僵尸网络数据' }).click();
  await page.getByLabel('搜索卡片').fill('公开 PCAP');
  await expect(page.getByText('CTU-13 公开 PCAP 与带标签的双向 NetFlow 文件在流量范围上有何区别？')).toBeVisible();
  await page.getByRole('button', { name: '来源：LANL 主机与网络数据' }).click();
  await page.getByLabel('搜索卡片').fill('SrcDevice 能否');
  await expect(page.getByText('LANL 网络事件的 SrcDevice 能否无条件当作已确认的连接发起方？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel(/LANL：企业主机与网络事件数据/)).toBeVisible();
});

test('find phishing, neural fuzzing and intrusion analysis cards with research sources', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：多模态钓鱼页面分析' }).click();
  await page.getByLabel('搜索卡片').fill('爬虫的访问环境');
  await expect(page.getByText('为什么爬虫的访问环境可能影响采集到的钓鱼页面内容？')).toBeVisible();
  await page.getByRole('button', { name: '来源：入侵分析钻石模型' }).click();
  await page.getByLabel('搜索卡片').fill('活动线程与活动组');
  await expect(page.getByText('钻石模型的活动线程与活动组在关联依据上有什么区别？')).toBeVisible();
  await page.getByRole('button', { name: '来源：NEUZZ 神经模糊测试' }).click();
  await page.getByLabel('搜索卡片').fill('后续复现及作者回应');
  await expect(page.getByText('NEUZZ 原论文、后续复现及作者回应结论不同时，如何比较实验？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel(/NEUZZ 原作者对复现研究的回应/)).toBeVisible();
  await expect(page.getByLabel(/NEUZZ 原论文 v4/)).toBeVisible();
});

test('find graph foundations and EPSS usage cards by source', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：图论基础' }).click();
  await page.getByLabel('搜索卡片').fill('邻接矩阵');
  await expect(page.getByText('按行表示源节点、列表示目标节点时，简单图的邻接矩阵 A[i,j] 通常表示什么？')).toBeVisible();
  await page.getByRole('button', { name: '来源：EPSS 情报与数据' }).click();
  await page.getByLabel('搜索卡片').fill('epss-gt');
  await expect(page.getByText('截至 2026 年 11 月，FIRST EPSS API 文档中的 epss-gt 和 epss-lt 是否包含等于阈值的结果？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel(/FIRST EPSS API v1 文档/)).toBeVisible();
});

test('find fuzzing benchmark and distribution shift cards by source', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：Magma 模糊测试评估' }).click();
  await page.getByLabel('搜索卡片').fill('reached');
  await expect(page.getByText('Magma 如何区分缺陷被触达（reached）与被触发（triggered）？')).toBeVisible();
  await page.getByRole('button', { name: '来源：安全模型分布偏移' }).click();
  await page.getByLabel('搜索卡片').fill('label shift');
  await expect(page.getByText('机器学习中的标签偏移（label shift）通常假设什么发生变化？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel(/Lipton 等：Detecting and Correcting for Label Shift/)).toBeVisible();
});

test('find agent belief and scheduled detection cards by source', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：Agent 观测与信念状态' }).click();
  await page.getByLabel('搜索卡片').fill('belief state');
  await expect(page.getByText('POMDP 中的信念状态（belief state）是什么？')).toBeVisible();
  await page.getByRole('button', { name: '来源：Sentinel 定时检测运营' }).click();
  await page.getByLabel('搜索卡片').fill('查询间隔与回看期');
  await expect(page.getByText('Microsoft Sentinel 定时规则的查询间隔与回看期各控制什么？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel(/Microsoft Sentinel 定时规则：2026 年 4 月文档快照/)).toBeVisible();
});

test('find a temporal evaluation card and inspect its source', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：TESSERACT 时间评估' }).click();
  await page.getByLabel('搜索卡片').fill('最晚训练样本');
  await expect(page.getByText('TESSERACT 的 C1 约束中，最晚训练样本的时间与最早测试样本的时间应满足什么关系？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel(/TESSERACT 论文：§4.1, C1/)).toBeVisible();
});

test('find a feature-selection card and inspect its source', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：scikit-learn 特征筛选' }).click();
  await page.getByLabel('搜索卡片').fill('平均置换重要性为负数');
  await expect(page.getByText('平均置换重要性为负数时，在所用评分口径下说明什么？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel(/scikit-learn 1.7：permutation_importance/)).toBeVisible();
});

test('find a split interview topic and distinguish its source from an original question', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：GitHub 面试题' }).click();
  await page.getByLabel('搜索卡片').fill('AI 安全事件摘要要解决什么问题');
  await expect(page.getByText('AI 安全事件摘要要解决什么问题？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel(/security-engineering：AI 赋能安全面试题；主题启发，非逐题原文/).first()).toBeVisible();
});

test('find a vulnerability-review card and inspect its fixed reporting source', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：漏洞推理与审计验证' }).click();
  await page.getByLabel('搜索卡片').fill('报告中写清复现步骤');
  await expect(page.getByText('安全漏洞报告中写清复现步骤有什么作用？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel(/OWASP WSTG v4.2：Reporting §3.2/)).toBeVisible();
});

test('find a LoRA topic extension from a public interview and inspect its references', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：快手面经' }).click();
  await page.getByLabel('搜索卡片').fill('LoRA+ 相对使用同一学习率');
  await expect(page.getByText('LoRA+ 相对使用同一学习率的标准 LoRA，主要改变什么训练设置？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel(/快手大模型公开面经：LoRA 主题延伸，非原题/)).toBeVisible();
  await expect(page.getByLabel(/LoRA\+ 原论文 v2/)).toBeVisible();
});

test('find a GNU join card and inspect its reference', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：Linux 文本合并与比较' }).click();
  await page.getByLabel('搜索卡片').fill('join -v 1 和 join -a 1');
  await expect(page.getByText('GNU join -v 1 和 join -a 1 的主要输出区别是什么？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByText('-v 1 只输出第一个文件未匹配的行；-a 1 还输出匹配行。')).toBeVisible();
  await expect(page.getByLabel(/GNU join、paste、comm 与 tr 手册/)).toBeVisible();
});

test('find a Linux cron card and inspect its reference', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：Linux 定时任务' }).click();
  await page.getByLabel('搜索卡片').fill('日期与星期字段都被限制');
  await expect(page.getByText('Cronie 的日期与星期字段都被限制且均不含 * 时，任务何时满足日期条件？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByText('每月日期或星期字段任一匹配即可；分钟、小时和月份仍需匹配。')).toBeVisible();
  await expect(page.getByLabel(/Cronie crontab 手册：定时任务/)).toBeVisible();
});

test('find a Redis Streams card and inspect its versioned source', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：Redis Streams 消费组' }).click();
  await page.getByLabel('搜索卡片').fill('与该流的 last-generated-id');
  await expect(page.getByText('Redis 7.2 的 XADD 显式指定 ID 时，新 ID 与该流的 last-generated-id 有什么关系？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByText('新 ID 必须严格大于 last-generated-id。')).toBeVisible();
  await expect(page.getByLabel(/Redis 文档：Streams 与消费组/)).toBeVisible();
});

test('find a new Bash array card and inspect its reference', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：Bash 参数与数组' }).click();
  await page.getByLabel('搜索卡片').fill('数组中已赋值元素的索引或键');
  await expect(page.getByText('Bash 如何列出数组中已赋值元素的索引或键？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel(/Bash 手册：参数展开与数组/)).toBeVisible();
});

test('find a Python standard-library card and inspect its source', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：Python 类型提示与数据类' }).click();
  await page.getByLabel('搜索卡片').fill('default_factory=list');
  await expect(page.getByText('为什么 Python 数据类的可变字段通常使用 field(default_factory=list)？')).toBeVisible();
  await page.getByRole('button', { name: '来源：Python 标准库' }).click();
  await page.getByLabel('搜索卡片').fill('itertools.count');
  await expect(page.getByText('itertools.count(start, step) 什么时候自然结束？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel(/Python 3.12 标准库：itertools.count/)).toBeVisible();
  await expect(page.getByLabel(/字节跳动公开面经.*迭代器主题启发，非原题/)).toBeVisible();
});

test('filter a PingCAP interview and inspect its independent technical source', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：PingCAP 面经' }).click();
  await page.getByLabel('搜索卡片').fill('布尔盲注');
  await expect(page.getByText('布尔盲注与时间盲注分别依靠什么信号推断条件真假？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel(/PingCAP 安全工程师公开面经.*盲注主题启发/)).toBeVisible();
  await expect(page.getByLabel(/PortSwigger Web Security Academy：Blind SQL injection/)).toBeVisible();
});

test('filter a BEIR retrieval card and inspect the paper source', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：BEIR 检索评测' }).click();
  await page.getByLabel('搜索卡片').fill('没有相关性标注的文档');
  await expect(page.getByText('为什么检索评估中没有相关性标注的文档不能直接等同于已确认不相关？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel(/BEIR 检索评测 原论文：S6/)).toBeVisible();
});

test('find a foundational PCA card and inspect its official reference', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：PCA 与可视化降维' }).click();
  await page.getByLabel('搜索卡片').fill('自动标准化每个特征的方差');
  await expect(page.getByText('scikit-learn 1.9 的 PCA 在拟合前会自动标准化每个特征的方差吗？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel(/scikit-learn 1.9 文档/)).toBeVisible();
});

test('find a ResNet concept through the DeepGlint interview source', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：格灵深瞳面经' }).click();
  await page.getByLabel('搜索卡片').fill('恒等残差单元');
  await expect(page.getByText('对于 y=x+F(x) 的恒等残差单元，为什么反向传播有一项梯度不经过 F 的导数？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel(/格灵深瞳算法实习一面.*ResNet 主题启发/)).toBeVisible();
  await expect(page.getByLabel(/残差网络恒等映射论文/)).toBeVisible();
});

test('find an SFT data card through the Tencent interview source', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：腾讯面经' }).click();
  await page.getByLabel('搜索卡片').fill('prompt-completion 数据格式');
  await expect(page.getByText('TRL 的 prompt-completion 数据格式如何区分输入和目标？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel(/腾讯 IEG 大模型公开面经.*SFT 数据选择主题启发/)).toBeVisible();
  await expect(page.getByLabel(/TRL 0.23：Dataset formats/)).toBeVisible();
});

test('find a speech recognition card and inspect its technical source', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：语音识别与音频基础' }).click();
  await page.getByLabel('搜索卡片').fill('CTC 怎样计算一个目标文本的概率');
  await expect(page.getByText('CTC 怎样计算一个目标文本的概率？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel(/Distill：CTC loss/)).toBeVisible();
});

test('find a Python decorator card through the ByteDance interview source', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：字节面经' }).click();
  await page.getByLabel('搜索卡片').fill('functools.wraps 常用于什么');
  await expect(page.getByText('Python 装饰器中的 functools.wraps 常用于什么？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel(/字节后端 Agent 一面公开面经.*主题启发/)).toBeVisible();
  await expect(page.getByLabel(/Python 3.13：functools.wraps/)).toBeVisible();
});

test('find low false-positive evaluation through the Tencent interview source', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：腾讯面经' }).click();
  await page.getByLabel('搜索卡片').fill('最小非零经验假正例率');
  await expect(page.getByText('对 N 条有真实标签的正常样本做不加权评估时，最小非零经验假正例率是多少？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel(/腾讯科恩实验室实习公开面经.*主题启发/)).toBeVisible();
  await expect(page.getByLabel(/scikit-learn 1.7：ROC curve/)).toBeVisible();
});

test('find a Python syntax card and inspect its documentation', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：Python 基础与进阶语法' }).click();
  await page.getByLabel('搜索卡片').fill('分别怎样限制参数传递方式');
  await expect(page.getByText('Python 函数签名中的 / 和 * 分别怎样限制参数传递方式？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel(/Python 3.13：Special parameters/)).toBeVisible();
});

test('find and study a CrossEncoder reranking card by source', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：CrossEncoder 重排实践' }).click();
  await page.getByLabel('搜索卡片').fill('单标签 CrossEncoder.predict 使用 apply_softmax');
  await expect(page.getByText('Sentence Transformers 5.1.2 对单标签 CrossEncoder.predict 使用 apply_softmax=True 可能使得分怎样？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel(/Sentence Transformers 5.1.2：CrossEncoder 重排/)).toBeVisible();
});

test('find common networking and Linux troubleshooting cards by source', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：NAT 与端口映射' }).click();
  await page.getByLabel('搜索卡片').fill('配置静态端口映射');
  await expect(page.getByText('在 NAT 网关上配置静态端口映射通常用于什么？')).toBeVisible();
  await page.getByRole('button', { name: '来源：Linux 进程与文件排障' }).click();
  await page.getByLabel('搜索卡片').fill('lsof +L1');
  await expect(page.getByText('Linux 上 lsof +L1 常用于排查哪类磁盘占用问题？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel(/Linux strace 与 lsof 手册/)).toBeVisible();
});

test('find dataset processing and self-query retrieval cards by source', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：Hugging Face 数据集处理' }).click();
  await page.getByLabel('搜索卡片').fill('不同数量的输出行');
  await expect(page.getByText('Dataset.map 批量变换能否把一个输入批次转换为不同数量的输出行？')).toBeVisible();
  await page.getByRole('button', { name: '来源：LangChain 自查询检索' }).click();
  await page.getByLabel('搜索卡片').fill('合并静态 search_kwargs');
  await expect(page.getByText('LangChain 0.3.27 的 SelfQueryRetriever 合并静态 search_kwargs 与翻译结果时，同名参数采用谁的值？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel(/LangChain 0.3.27：自查询检索/)).toBeVisible();
});

test('find agent memory and monitoring cards by source', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '学习范围：全部卡片' }).click();
  await page.getByRole('button', { name: '来源：MemGPT 上下文与记忆' }).click();
  await page.getByLabel('搜索卡片').fill('request_heartbeat=true');
  await expect(page.getByText('MemGPT 原论文中的 request_heartbeat=true 对函数调用后的控制流有什么作用？')).toBeVisible();
  await page.getByRole('button', { name: '来源：PromQL 服务与模型监控' }).click();
  await page.getByLabel('搜索卡片').fill('为什么通常先 rate 再 sum');
  await expect(page.getByText('对多个计数器序列统计总速率时，为什么通常先 rate 再 sum？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel(/Prometheus 3.5.0：PromQL 监控查询/)).toBeVisible();
});

test('find and study a package identification card by source', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：Package-URL 软件包标识' }).click();
  await page.getByLabel('搜索卡片').fill('所有 version 都按语义化版本');
  await expect(page.getByText('PURL 标准是否要求所有 version 都按语义化版本规则排序？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel(/Package-URL v1.1.1/)).toBeVisible();
});

test('find and study a MINT evaluation card by source', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：MINT 多轮评测' }).click();
  await page.getByLabel('搜索卡片').fill('不能直接代表原始数据集的整体难度');
  await expect(page.getByText('MINT 构建数据集时，为什么其结果不能直接代表原始数据集的整体难度？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel(/MINT 原论文 v3/)).toBeVisible();
});

test('find and study a software testing card by topic and source', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '主题：软件测试与质量' }).click();
  await page.getByRole('button', { name: '来源：软件测试与质量' }).click();
  await page.getByLabel('搜索卡片').fill('行覆盖率达到 100%');
  await expect(page.getByText('代码的行覆盖率达到 100%，是否就能断定所有条件分支都执行过？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByText('不能；一行条件判断可能只走过其中一个分支。')).toBeVisible();
  await expect(page.getByLabel(/软件测试基础：测试金字塔与覆盖率/)).toBeVisible();
});

test('find AWQ, LangChain and LiveCodeBench cards by source', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '学习范围：全部卡片' }).click();
  await page.getByRole('button', { name: '来源：AWQ 与 GPTQ 权重量化' }).click();
  await page.getByLabel('搜索卡片').fill('最终采用什么方法保护');
  await expect(page.getByText('AWQ 最终采用什么方法保护重要权重通道？')).toBeVisible();
  await page.getByRole('button', { name: '来源：多查询与上下文压缩' }).click();
  await page.getByLabel('搜索卡片').fill('构造 EmbeddingsFilter 并传入 k=None');
  await expect(page.getByText('LangChain 0.3.27 搭配 langchain-core 0.3.75 时，构造 EmbeddingsFilter 并传入 k=None 会禁用 top-k 吗？')).toBeVisible();
  await page.getByRole('button', { name: '来源：代码模型持续评估' }).click();
  await page.getByLabel('搜索卡片').fill('最终 pass@1 是否只统计');
  await expect(page.getByText('LiveCodeBench 原论文自我修复的最终 pass@1 是否只统计原始程序失败后修复成功的题？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel(/LiveCodeBench 原论文 v2/)).toBeVisible();
});

test('find permutation, Suricata and bandit cards by source', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：交叉验证置换检验' }).click();
  await page.getByLabel('搜索卡片').fill('使用 GroupKFold 并启用元数据路由');
  await expect(page.getByText('scikit-learn 1.7.2 使用 GroupKFold 并启用元数据路由，只通过 params 传 groups，能保证标签仅在组内置换吗？')).toBeVisible();
  await page.getByRole('button', { name: '来源：Suricata 告警阈值' }).click();
  await page.getByLabel('搜索卡片').fill('drop 或 reject');
  await expect(page.getByText('Suricata 在 IPS 模式使用阈值时，drop 或 reject 是否只应用于触发告警的那个报文？')).toBeVisible();
  await page.getByRole('button', { name: '来源：多臂老虎机与探索' }).click();
  await page.getByLabel('搜索卡片').fill('标准 ε-greedy 如何');
  await expect(page.getByText('标准 ε-greedy 如何在贪心选择和随机探索之间选择动作？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel(/Sutton 与 Barto 第 2 版/)).toBeVisible();
});

test('find Linux, Dockerfile and Python subprocess cards by source', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：Linux 文件查找与批处理' }).click();
  await page.getByLabel('搜索卡片').fill('-prune 用于控制');
  await expect(page.getByText('GNU find 的 -prune 用于控制什么？')).toBeVisible();
  await page.getByRole('button', { name: '来源：Dockerfile 构建基础' }).click();
  await page.getByLabel('搜索卡片').fill('ENTRYPOINT 和 CMD 时');
  await expect(page.getByText('Dockerfile 使用 exec 形式的 ENTRYPOINT 和 CMD 时，它们通常怎样配合？')).toBeVisible();
  await page.getByRole('button', { name: '来源：Python 子进程与命令执行' }).click();
  await page.getByLabel('搜索卡片').fill('Popen.communicate 超时后');
  await expect(page.getByText('Python 3.12 的 subprocess.run 和 Popen.communicate 超时后，对子进程的处理有什么区别？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel(/Python 3.12 官方文档：subprocess 命令执行/)).toBeVisible();
});

test('find AVClass and BERTScore cards by source', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：AVclass2 恶意软件标签' }).click();
  await page.getByLabel('搜索卡片').fill('SINGLETON:样本标识');
  await expect(page.getByText('AVClass 2.8.10 输出 SINGLETON:样本标识通常表示什么？')).toBeVisible();
  await page.getByRole('button', { name: '来源：BERTScore 文本生成评估' }).click();
  await page.getByLabel('搜索卡片').fill('多个参考分别求分');
  await expect(page.getByText('bert-score 0.3.13 对一个候选的多个参考分别求分后，P、R、F 是否一定来自同一个参考？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel(/bert-score 0.3.13：score 实现/)).toBeVisible();
});

test('find OpenVEX and COCO cards by source', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：OpenVEX 漏洞影响状态' }).click();
  await page.getByLabel('搜索卡片').fill('justification 和 impact_statement');
  await expect(page.getByText('OpenVEX 的 justification 和 impact_statement 在表达不受影响原因时有什么区别？')).toBeVisible();
  await page.getByRole('button', { name: '来源：COCO 目标检测评估' }).click();
  await page.getByLabel('搜索卡片').fill('iscrowd 标注计算重叠');
  await expect(page.getByText('COCO API 对 iscrowd 标注计算重叠时，分母与普通 IoU 有什么不同？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel(/COCO Python API：目标检测评估/)).toBeVisible();
});

test('find Linux monitoring and database normalization cards by source', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：Linux 资源监控' }).click();
  await page.getByLabel('搜索卡片').fill('free 和 available');
  await expect(page.getByText('procps-ng 4.0.4 的 free 中，free 和 available 对内存的含义有什么区别？')).toBeVisible();
  await page.getByRole('button', { name: '来源：关系数据库范式与设计' }).click();
  await page.getByLabel('搜索卡片').fill('学生姓名只由学生编号');
  await expect(page.getByText('选课表唯一候选键为（学生编号，课程编号），学生姓名只由学生编号决定，这说明什么范式问题？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel(/IBM：数据库规范化与第二范式/)).toBeVisible();
});

test('find Python executor and PyTorch loss cards by source', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：Python 线程池与 Future' }).click();
  await page.getByLabel('搜索卡片').fill('输入迭代器是惰性收集');
  await expect(page.getByText('Python 3.12 的 Executor.map 对输入迭代器是惰性收集吗？')).toBeVisible();
  await page.getByRole('button', { name: '来源：PyTorch 常用损失函数' }).click();
  await page.getByLabel('搜索卡片').fill('KLDivLoss 中 batchmean');
  await expect(page.getByText('PyTorch 2.7 的 KLDivLoss 中 batchmean 与 mean 如何归约？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel(/PyTorch 2.7：常用损失函数/)).toBeVisible();
});

test('find parent retrieval and DoRA cards by source', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '学习范围：全部卡片' }).click();
  await page.getByRole('button', { name: '来源：LangChain 父文档检索' }).click();
  await page.getByLabel('搜索卡片').fill('显式传入 ids');
  await expect(page.getByText('ParentDocumentRetriever 设置 parent_splitter 并显式传入 ids 时，ID 数量应匹配什么？')).toBeVisible();
  await page.getByRole('button', { name: '来源：DoRA 权重分解' }).click();
  await page.getByLabel('搜索卡片').fill('归一化范数的梯度');
  await expect(page.getByText('DoRA 论文为了降低反向传播内存，如何处理归一化范数的梯度？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel(/DoRA 原论文 v2 与 PEFT 0.17：权重分解/)).toBeVisible();
});

test('find C memory fundamentals by topic and inspect the reference', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '主题：C 语言基础' }).click();
  await page.getByLabel('搜索卡片').fill('调用 realloc 失败');
  await expect(page.getByText('对非零新大小调用 realloc 失败时，原来的内存块会怎样？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByText('原内存块保持有效，内容不变，调用返回空指针。')).toBeVisible();
  await expect(page.getByLabel(/C11 草案与 Linux 手册：指针和动态内存/)).toBeVisible();
});

test('find and study a new foundational card with its source', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '主题：数学与统计基础' }).click();
  await page.getByLabel('搜索卡片').fill('贝叶斯公式');
  await expect(page.getByText('贝叶斯公式怎样由 P(B∣A) 求 P(A∣B)？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByText('整理方式：自行整理')).toBeVisible();
  await expect(page.getByLabel(/Dive into Deep Learning：线性代数、微积分与概率/)).toBeVisible();
});

test('study a standards-based threat intelligence card', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByLabel('搜索卡片').fill('TAXII 2.1 是否规定');
  await expect(page.getByText('TAXII 2.1 是否规定了可直接实现的 Channel 服务？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByText(/没有；2.1 标准保留了相关概念/)).toBeVisible();
  await expect(page.getByLabel(/OASIS STIX 2.1 与 TAXII 2.1 标准/)).toBeVisible();
});

test('find an interview card and inspect its question source and technical references', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：字节面经' }).click();
  await page.getByLabel('搜索卡片').fill('Skill 与可调用工具');
  await expect(page.getByText('Agent Skill 与可调用工具的主要作用有什么区别？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel(/字节跳动 Agent 岗公开面经（作者自述）/)).toBeVisible();
  await expect(page.getByLabel(/Agent Skills：Overview/)).toBeVisible();
  await expect(page.getByLabel(/MCP：Understanding MCP servers/)).toBeVisible();
});

test('company interviews are easy to reach and retain both interview and technical sources', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  const interview = page.getByRole('button', { name: '来源：全部公开面经' });
  const company = page.getByRole('button', { name: '来源：小米面经' });
  await expect(interview).toBeVisible();
  const sourceLabels = await page.getByRole('button', { name: /^来源：/ }).allTextContents();
  expect(sourceLabels.indexOf('小米面经')).toBeGreaterThanOrEqual(0);
  expect(sourceLabels.indexOf('小米面经')).toBeLessThan(sourceLabels.indexOf('CIC-IDS2017'));
  await company.click();
  await page.getByLabel('搜索卡片').fill('SAST、DAST 和 IAST');
  await expect(page.getByText('SAST、DAST 和 IAST 通常从哪些不同位置发现应用安全问题？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel(/小米安全工程师一面（合集收录，经历为分享者自述）/)).toBeVisible();
  await expect(page.getByLabel(/OWASP：Interactive Application Security Testing/)).toBeVisible();
});

test('study all public interviews through the shared source filter', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：全部公开面经' }).click();
  await page.getByLabel('搜索卡片').fill('FP32 主权重');
  await expect(page.getByText('原始混合精度训练方案为什么保留 FP32 主权重来更新参数？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel(/腾讯公开面经（合集转载，经历为分享者自述）/)).toBeVisible();
  await expect(page.getByLabel(/Mixed Precision Training 原论文/)).toBeVisible();
});

test('filter a RAG interview card by the company and inspect its evidence', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：字节面经' }).click();
  await page.getByLabel('搜索卡片').fill('忠于检索上下文');
  await expect(page.getByText('RAG 回答忠于检索上下文，能否保证事实正确？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel(/字节公开面经（作者自述）/)).toBeVisible();
  await expect(page.getByLabel(/Ragas：Faithfulness/)).toBeVisible();
});

test('filter the Xiaomi interview and inspect the research reference', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：小米面经' }).click();
  await page.getByLabel('搜索卡片').fill('组内相对优势');
  await expect(page.getByText('DeepSeekMath 的结果监督 GRPO 怎样估计组内相对优势？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel(/小米公开面经（合集转载，经历为分享者自述）/)).toBeVisible();
  await expect(page.getByLabel(/DeepSeekMath 论文：Group Relative Policy Optimization/)).toBeVisible();
});

test('filter the Ant interview and inspect the original and technical sources', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：蚂蚁面经' }).click();
  await page.getByLabel('搜索卡片').fill('ZeRO 的 1、2、3 阶段');
  await expect(page.getByText('DeepSpeed ZeRO 的 1、2、3 阶段逐步分片哪些训练状态？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel(/蚂蚁公开面经（合集转载，经历为分享者自述）/)).toBeVisible();
  await expect(page.getByLabel(/DeepSpeed：ZeRO/)).toBeVisible();
});

test('find the Ant interview-inspired judge question with its research reference', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：蚂蚁面经' }).click();
  await page.getByLabel('搜索卡片').fill('成对大模型评审中的位置偏差');
  await expect(page.getByText('成对大模型评审中的位置偏差指什么？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel(/蚂蚁大模型一面.*主题启发/)).toBeVisible();
  await expect(page.getByLabel(/Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena/)).toBeVisible();
});

test('find a ByteDance contrastive learning theme with its technical source', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：字节面经' }).click();
  await page.getByLabel('搜索卡片').fill('无监督 SimCSE');
  await expect(page.getByText('无监督 SimCSE 如何从同一句子构造正样本对？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel(/字节大模型面经.*主题启发/)).toBeVisible();
  await expect(page.getByLabel(/SimCSE 论文/)).toBeVisible();
});

test('filter a previously reviewed security question by the added SenseTime source', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：商汤面经' }).click();
  await page.getByLabel('搜索卡片').fill('XSS 的输出编码');
  await expect(page.getByText('为什么防止 XSS 的输出编码要考虑输出上下文？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel(/商汤安全岗位公开面经/)).toBeVisible();
  await expect(page.getByLabel(/OWASP：XSS Prevention/)).toBeVisible();
});

test('find the Ant fuzzing theme and inspect its technical reference', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：蚂蚁面经' }).click();
  await page.getByLabel('搜索卡片').fill('语句覆盖和分支覆盖');
  await expect(page.getByText('语句覆盖和分支覆盖分别关注什么？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel(/蚂蚁安全工程师公开面经.*主题启发/)).toBeVisible();
  await expect(page.getByLabel(/The Fuzzing Book：模糊测试教程/)).toBeVisible();
});

test('find the Kuaishou agent search theme and inspect its research', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：快手面经' }).click();
  await page.getByLabel('搜索卡片').fill('评估结果剪枝');
  await expect(page.getByText('Tree of Thoughts 用模型评估结果剪枝时，为什么可能错过正确方案？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel(/快手大模型应用一面.*主题启发/)).toBeVisible();
  await expect(page.getByLabel(/Tree of Thoughts 原论文/)).toBeVisible();
});

test('filter the Ctrip interview and inspect its technical evidence', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：携程面经' }).click();
  await page.getByLabel('搜索卡片').fill('Linux 反向 Shell');
  await expect(page.getByText('排查 Linux 反向 Shell 时，为什么要关联网络事件和进程树？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel(/携程基础安全工程师公开面经/)).toBeVisible();
  await expect(page.getByLabel(/Elastic：Potential Reverse Shell/)).toBeVisible();
});

test('filter the Huawei interview and inspect the memory safety sources', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：华为面经' }).click();
  await page.getByLabel('搜索卡片').fill('释放一块内存后');
  await expect(page.getByText('释放一块内存后，把其中一个指针设为 NULL 就能消除所有释放后使用风险吗？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel(/华为公开面经.*岗位未注明.*主题启发/)).toBeVisible();
  await expect(page.getByLabel(/MITRE CWE-416/)).toBeVisible();
});

test('filter the DJI interview and inspect its password storage reference', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：大疆面经' }).click();
  await page.getByLabel('搜索卡片').fill('密码哈希中的每用户随机盐');
  await expect(page.getByText('密码哈希中的每用户随机盐主要有什么作用？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel(/大疆公开面经.*岗位未注明.*主题启发/)).toBeVisible();
  await expect(page.getByLabel(/OWASP 密码存储与代码审查/)).toBeVisible();
});

test('filter the Baidu interview and inspect the BLIP papers', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：百度面经' }).click();
  await page.getByLabel('搜索卡片').fill('BLIP 和 BLIP-2');
  await expect(page.getByText('BLIP 和 BLIP-2 在核心预训练思路上有什么区别？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel(/百度大模型实习一面.*BLIP 与 BLIP-2 区别/)).toBeVisible();
  await expect(page.getByLabel(/BLIP-2 原论文/)).toBeVisible();
});

test('filter a new Tencent interview question and inspect its sources', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：腾讯面经' }).click();
  await page.getByLabel('搜索卡片').fill('GQA 有 8 个查询头');
  await expect(page.getByText('GQA 有 8 个查询头、2 个 KV 头，每头维度为 64，KV 均为 FP16；每层每 token 的 KV 缓存有多少字节？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByText(/512 字节/)).toBeVisible();
  await expect(page.getByLabel(/腾讯微信大模型一面.*主题启发/)).toBeVisible();
  await expect(page.getByLabel(/GQA 原论文：Grouped-Query Attention/)).toBeVisible();
});

test('filter and study a log sequence anomaly card with its paper', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：日志序列异常检测' }).click();
  await page.getByLabel('搜索卡片').fill('由异常日志键得到序列级判断');
  await expect(page.getByText('LogBERT 原论文如何由异常日志键得到序列级判断？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByText(/超过阈值 r 时将序列判为异常/)).toBeVisible();
  await expect(page.getByLabel(/LogBERT 论文：3.3 Anomaly Detection/)).toBeVisible();
});

test('filter and study an LLM fuzzing card with its technical source', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：大模型模糊测试方法' }).click();
  await page.getByLabel('搜索卡片').fill('多个实现对同一输入给出相同结果');
  await expect(page.getByText('多个实现对同一输入给出相同结果，能否证明结果正确？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByText(/各实现产生相同的错误/)).toBeVisible();
  await expect(page.getByLabel(/Csmith 论文：No ground truth/)).toBeVisible();
});

test('filter and study a security investigation card with its research source', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：安全事件调查与评估' }).click();
  await page.getByLabel('搜索卡片').fill('安全调查工具执行失败');
  await expect(page.getByText('安全调查工具执行失败时，能否把没有输出当作未发现异常的证据？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByText(/命令错误或工具不可用可能阻止分析/)).toBeVisible();
  await expect(page.getByLabel(/SIABench 论文：5.2 Failure Modes/)).toBeVisible();
});

for (const [company, query, question, source] of [
  ['海康威视', '跨站脚本（XSS）的核心问题', '跨站脚本（XSS）的核心问题是什么？', '海康威视公开面经'],
  ['顺丰', 'XSS 和 CSRF', 'XSS 和 CSRF 在主要攻击机制上有什么区别？', '顺丰科技技术一面'],
]) {
  test(`filter the ${company} interview and inspect its evidence`, async ({ page }) => {
    await page.getByRole('tab', { name: '题库' }).click();
    await page.getByRole('button', { name: `来源：${company}面经` }).click();
    await page.getByLabel('搜索卡片').fill(query);
    await expect(page.getByText(question)).toBeVisible();
    await page.getByRole('button', { name: '学习筛选结果' }).click();
    await page.getByRole('button', { name: '显示答案' }).click();
    await expect(page.getByLabel(new RegExp(source))).toBeVisible();
    await expect(page.getByLabel(/OWASP：Cross Site Scripting/)).toBeVisible();
  });
}

test('filter the Meituan security interview and inspect its technical evidence', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：美团面经' }).click();
  await page.getByLabel('搜索卡片').fill('DOM 型 XSS');
  await expect(page.getByText('DOM 型 XSS 的危险数据从输入到执行主要发生在哪里？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel(/美团公开面经（合集收录，经历为分享者自述）/)).toBeVisible();
  await expect(page.getByLabel(/PortSwigger：DOM-based XSS/)).toBeVisible();
});

test('find a shared security interview by the other reported company', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：京东面经' }).click();
  await page.getByLabel('搜索卡片').fill('二次 SQL 注入');
  await expect(page.getByText('二次 SQL 注入中，危险数据通常何时被当作 SQL 语法？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel(/京东安全工程师公开面经（合集收录，经历为分享者自述）/)).toBeVisible();
  await expect(page.getByLabel(/PortSwigger：Second-order SQL injection/)).toBeVisible();
});

test('find a visual phishing card and inspect the research source', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：视觉钓鱼识别' }).click();
  await page.getByLabel('搜索卡片').fill('品牌意图和凭据收集意图');
  await expect(page.getByText('PhishIntention 中品牌意图和凭据收集意图分别表示什么？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel(/Phishpedia 与 PhishIntention：视觉钓鱼检测/)).toBeVisible();
});

for (const [source, query, question, reference] of [
  ['Python 对象与异常', '__new__ 与 __init__', 'Python 类的 __new__ 与 __init__ 在构造对象时分别负责什么？', 'Python 3.13：对象协议、属性与异常处理'],
  ['回归评估函数', 'mean_squared_log_error 对真实值', 'scikit-learn 1.7.2 的 mean_squared_log_error 对真实值和预测值有什么数值下界？', 'scikit-learn 1.7.2 源码：mean_squared_log_error'],
  ['Atheris Python 模糊测试', '测试入口通常接收', 'Atheris 2.3.0 的测试入口通常接收什么输入？', 'Atheris 2.3.0：Python 覆盖引导模糊测试'],
]) {
  test(`filter ${source} and study the referenced card`, async ({ page }) => {
    await page.getByRole('tab', { name: '题库' }).click();
    await page.getByRole('button', { name: `来源：${source}` }).click();
    await page.getByLabel('搜索卡片').fill(query);
    await expect(page.getByText(question)).toBeVisible();
    await page.getByRole('button', { name: '学习筛选结果' }).click();
    await page.getByRole('button', { name: '显示答案' }).click();
    await expect(page.getByLabel(`${reference}，原文依据`)).toBeVisible();
  });
}

for (const [source, query, question, reference] of [
  ['TCP/IP 基础', '三次握手的报文顺序', '常见 TCP 三次握手的报文顺序是什么？', 'TCP/IP 基础：RFC 9293、RFC 5681 和 RFC 768'],
  ['Linux 常用命令', '重定向 > 和 >>', 'Shell 重定向 > 和 >> 在写入普通文件时有什么区别？', 'GNU/Linux 常用命令、Bash 与系统手册'],
  ['操作系统基础', '进程的虚拟地址空间主要', '进程的虚拟地址空间主要提供什么抽象？', '操作系统基础：OSTEP 与 Linux 手册'],
  ['数据库与 SQL 基础', 'COUNT(*) 与 COUNT(列名)', 'SQL 的 COUNT(*) 与 COUNT(列名) 如何处理 NULL？', 'PostgreSQL 17：SQL、事务与索引基础'],
  ['数据结构与算法', '栈和队列分别', '栈和队列分别按什么顺序取出元素？', 'Open Data Structures：常见数据结构与算法'],
  ['Juliet 漏洞基准', '一个测试用例一定', 'Juliet 中一个测试用例一定只对应一个源文件吗？', 'NIST SARD：Juliet 测试用例 77913'],
  ['SPLADE 稀疏检索', '词汇扩展能为文档原文', 'SPLADE 的词汇扩展能为文档原文未出现的词分配权重吗？', 'SPLADE 原论文：学习稀疏表示与词汇扩展'],
  ['计算机组成与表示', '存储程序思想', '冯·诺依曼存储程序思想的基本含义是什么？', 'MIT 计算机结构与 Python 二进制文档'],
  ['操作系统并发', '四个必要条件', '经典死锁分析中的四个必要条件是什么？', 'OSTEP：并发、同步与死锁'],
  ['Linux 文件描述符', 'dup 复制或 fork', 'Linux 中 dup 复制或 fork 继承的文件描述符是否共享文件偏移量？', 'Linux open 与 unlink 手册：文件描述符'],
  ['HTTP 与 Web 基础', 'no-cache 是否等于', '响应 Cache-Control: no-cache 是否等于禁止缓存存储响应？', 'HTTP 语义与缓存：RFC 9110、9111'],
  ['单类异常检测', 'OneClassSVM 中 nu', 'scikit-learn 1.7 的 OneClassSVM 中 nu 控制什么？', 'scikit-learn 1.7：单类异常检测'],
  ['Git 与版本控制', 'git fetch 与 git pull', 'git fetch 与 git pull 在更新当前分支方面有什么区别？', 'Pro Git 与 Git 官方手册：版本控制'],
  ['IP 寻址与转发', '多个前缀同时匹配', '路由表中多个前缀同时匹配目的地址时，通常按什么规则选择？', 'IP、CIDR、ARP 与 ICMP 标准'],
  ['内存局部性与页面替换', '时间局部性是什么', '程序访问中的时间局部性是什么意思？', 'OSTEP：内存局部性与页面替换'],
  ['CPU 调度', '周转时间如何定义', '调度中作业的周转时间如何定义？', 'OSTEP：CPU 调度与多级反馈队列'],
  ['弱监督与标签函数', '标签矩阵中，-1', 'Snorkel 0.9.9 的标签矩阵中，-1 通常表示什么？', 'Snorkel 弱监督原论文与 0.9.9 源码'],
  ['日志模板解析', 'add_log_message 与 match', '固定版本 Drain3 的 add_log_message 与 match 对模板状态有什么区别？', 'Drain 论文与 Drain3 固定版本：日志模板解析'],
  ['LIME 与 SHAP', '基于 Shapley 值分配', 'SHAP 如何基于 Shapley 值分配特征贡献？', 'LIME 与 SHAP 原论文：模型解释'],
  ['MISP 情报格式', '属性 to_ids', 'MISP core draft-20 的属性 to_ids 表示什么？', 'MISP core format draft-20：威胁情报数据结构'],
  ['主动学习与安全标注', '池式主动学习和流式', '池式主动学习和流式选择采样如何选择样本？', 'Settles 主动学习综述：安全标注与评估'],
  ['torchvision 图像预处理', 'CenterCrop 目标尺寸', 'torchvision 0.22 的 CenterCrop 目标尺寸大于输入某一边时会怎样？', 'torchvision 0.22 图像预处理接口'],
  ['排序与二叉堆', '选择排序如何逐步', '选择排序如何逐步得到有序结果？', 'Princeton Algorithms：排序与二叉堆'],
  ['SQL 查询与索引', 'CROSS JOIN 对两个表', 'SQL 的 CROSS JOIN 对两个表的行产生什么组合？', 'PostgreSQL 17：查询、连接与索引'],
  ['Shell 与命令实践', '单引号中的字符', 'Bash 单引号中的字符会进行变量展开吗？', 'Bash 5.3 与 GNU 手册：Shell 操作'],
  ['文件系统与持久化', 'inode 主要保存', '在常见类 Unix 文件系统中，inode 主要保存什么信息？', 'OSTEP 与 Linux 手册：文件系统和持久化'],
  ['TLS 与服务身份', 'TLS 握手主要完成', 'TLS 握手主要完成什么？', 'TLS 1.3 与服务身份：RFC 8446、9525'],
  ['CVSS v4.0 漏洞评分', '相比 v3.1，对 Temporal', 'CVSS v4.0 相比 v3.1，对 Temporal 指标组和补充信息有哪些结构变化？', 'FIRST CVSS v4.0：漏洞严重性指标'],
  ['River 流式漂移检测', 'ADWIN 为什么使用可变', 'River 0.21.2 的 ADWIN 为什么使用可变长度窗口？', 'River 0.21.2：流式漂移检测器'],
  ['数据库并发与锁', 'MVCC 如何帮助并发查询', 'PostgreSQL 17 的 MVCC 如何帮助并发查询获得一致的数据视图？', 'PostgreSQL 17：并发控制与锁'],
  ['Python 正则表达式', 're.match、re.search 和 re.fullmatch', 'Python 3.14 的 re.match、re.search 和 re.fullmatch 如何确定匹配范围？', 'Python 3.14：正则表达式与 re 接口'],
  ['Elasticsearch 全文检索', 'text 和 keyword 字段', 'Elasticsearch 8.17 的 text 和 keyword 字段常分别用于什么？', 'Elasticsearch 8.17：全文检索与分析'],
  ['OSV 漏洞数据格式', 'OSV schema 1.9.2 主要用于', 'OSV schema 1.9.2 主要用于描述哪类安全信息？', 'OSV schema 1.9.2：漏洞与版本范围'],
  ['DREBIN 恶意软件检测', 'DREBIN 原论文主要检测', 'DREBIN 原论文主要检测哪类软件？', 'DREBIN 原论文：Android 静态恶意软件检测'],
  ['LineVD 语句级漏洞检测', 'LineVD 原论文把漏洞定位', 'LineVD 原论文把漏洞定位建模成什么机器学习任务？', 'LineVD 原论文：语句级图漏洞检测'],
  ['LLMCompiler 并行工具调用', 'LLMCompiler 原论文将工具调用', 'LLMCompiler 原论文将工具调用流程分成哪三个主要组件？', 'LLMCompiler 原论文：并行工具调用'],
  ['时间序列与异常基线', '时间序列中的趋势和季节性', '时间序列中的趋势和季节性有什么区别？', 'Forecasting: Principles and Practice：时间序列分解'],
  ['Linux 网络排查', 'ip link show 与 ip addr show', 'Linux 中 ip link show 与 ip addr show 分别主要查看什么？', 'Linux、iputils、BIND 与 curl：网络排查命令'],
  ['Redis 缓存基础', 'Redis 7.2 的 TTL 对不存在的键', 'Redis 7.2 的 TTL 对不存在的键和没有过期时间的键分别返回什么？', 'Redis 7.2：数据结构、缓存与事务'],
  ['Kafka 消息队列', 'Kafka 3.9 的顺序保证', 'Kafka 3.9 的顺序保证通常以什么为单位？', 'Apache Kafka 3.9：消息、消费与可靠性'],
  ['编译与构建基础', 'GCC 15 的 -c 选项', 'GCC 15 的 -c 选项会执行链接吗？', 'GCC 15、GNU Make 与 Linux：编译链接基础'],
  ['Raft 分布式共识', 'Raft 的服务器在任一时刻', 'Raft 的服务器在任一时刻通常处于哪三种角色之一？', 'Raft 论文：分布式共识与日志复制'],
  ['BiLSTM 与 CRF', '线性链 CRF 建模的是标签序列', '线性链 CRF 建模的是标签序列与输入之间的哪种概率？', 'PyTorch 教程：BiLSTM 与条件随机场'],
  ['生成与解码配置', '同时设置 max_length 和 max_new_tokens', 'Transformers 4.51.3 同时设置 max_length 和 max_new_tokens 时，哪个参数优先？', 'Transformers 4.51.3：生成与解码配置'],
  ['SOC AI 现场研究', 'SOC AI Companion 现场研究的数据', 'SOC AI Companion 现场研究的数据能否直接代表所有安全运营中心？', 'SOC AI Companion：现场研究与调查工作流'],
  ['SOC-bench 评测设计', 'SOC-bench 论文提出的是', 'SOC-bench 论文提出的是已验证运行的基准，还是基准的概念设计？', 'SOC-bench 论文：蓝队智能体评测设计'],
  ['马尔可夫链基础', '马尔可夫链的转移矩阵 P', '离散时间齐次马尔可夫链的转移矩阵 P 中，P[i,j] 表示什么？', 'ProbabilityCourse：离散时间马尔可夫链'],
  ['CPU 指令流水线', 'CPU 指令流水线如何提高', 'CPU 指令流水线如何提高指令吞吐量？', 'MIT 6.004：CPU 指令流水线与冒险'],
  ['SWE-bench 工程评测', 'SWE-bench 原论文要求系统', 'SWE-bench 原论文要求系统针对 GitHub issue 生成什么？', 'SWE-bench 原论文：软件工程任务评测'],
  ['LLMFuzz 深度学习库测试', 'arXiv:2212.14834v2 中的 LLMFuzz', 'arXiv:2212.14834v2 中的 LLMFuzz 主要生成什么来测试深度学习库？', 'LLMFuzz 原论文 v2：深度学习库模糊测试'],
  ['ColBERTv2 检索压缩', 'ColBERTv2 论文为什么要压缩', 'ColBERTv2 论文为什么要压缩文档的 token 向量？', 'ColBERTv2 原论文：多向量检索与压缩'],
  ['Linux 进程与信号', 'kill 命令未指定信号', 'Linux 的 kill 命令未指定信号时，默认发送什么信号？', 'Linux 与 Bash 手册：进程、信号与作业'],
  ['Python 导入与缓存', '导入模块时首先检查', 'Python 3.14 导入模块时首先检查哪个模块缓存？', 'Python 3.14：模块导入与缓存'],
  ['Kibana KQL 日志筛选', 'KQL 主要用于什么', 'Kibana 8.17 的 KQL 主要用于什么？', 'Kibana 8.17：KQL 日志筛选'],
  ['LogAnomaly 日志异常', '同时建模日志的哪两类', 'LogAnomaly 原论文同时建模日志的哪两类异常模式？', 'LogAnomaly 原论文：日志顺序与数量异常'],
  ['ToolLLM 工具使用', '主要覆盖工具使用的哪些', 'ToolLLM 原论文主要覆盖工具使用的哪些环节？', 'ToolLLM v2：工具使用训练与评测'],
  ['常见算法思路', '记忆化搜索如何避免', '算法中的记忆化搜索如何避免重复计算子问题？', '算法设计：动态规划、二分与双指针'],
  ['Linux 套接字编程', 'IPv4 TCP 套接字时', 'Linux 创建 IPv4 TCP 套接字时，socket 的地址族和类型通常使用什么？', 'Linux 手册：TCP 与 UDP 套接字编程'],
  ['PyTorch 归一化层', 'BatchNorm2d 对形状为', 'PyTorch 2.7 的 BatchNorm2d 对形状为 (N,C,H,W) 的输入，按什么范围计算训练统计量？', 'PyTorch 2.7：批、组与实例归一化'],
  ['SGD 与增量训练', 'SGDClassifier 使用 hinge 和 log_loss', 'scikit-learn 1.9 的 SGDClassifier 使用 hinge 和 log_loss 分别对应哪类线性分类模型？', 'scikit-learn 1.9：SGD 分类与增量训练'],
  ['CodeBERT 代码预训练', 'CodeBERT 原论文中的双模态', 'CodeBERT 原论文中的双模态训练样本指什么？', 'CodeBERT 与 GraphCodeBERT：代码预训练'],
  ['DPR 稠密段落检索', 'DPR 原论文如何对问题向量', 'DPR 原论文如何对问题向量和候选段落向量计算相似度？', 'DPR 原论文：稠密段落检索'],
  ['CVEfixes 漏洞修复数据', 'CVEfixes 原论文主要从哪类公开记录', 'CVEfixes 原论文主要从哪类公开记录出发收集漏洞与修复信息？', 'CVEfixes 原论文：漏洞修复数据'],
  ['自编码器基础', '普通自编码器的编码器', '普通自编码器的编码器和解码器分别做什么？', 'Deep Learning：自编码器与去噪表示'],
  ['自编码器异常检测', '用自编码器进行异常检测时', '用自编码器进行异常检测时，常怎样从输入和重构结果得到分数？', 'TensorFlow 教程：自编码器异常检测'],
  ['ALiBi 位置偏置', 'ALiBi 原论文在哪里引入', 'ALiBi 原论文在哪里引入位置相关信息？', 'ALiBi 原论文：线性位置偏置'],
  ['Transformer-XL 片段记忆', 'Transformer-XL 原论文如何让当前片段', 'Transformer-XL 原论文如何让当前片段使用前一片段的上下文？', 'Transformer-XL 原论文：片段记忆与位置'],
  ['分词编码与对齐', 'Encoding.sequence_ids 如何区分', 'tokenizers 0.23.1 的 Encoding.sequence_ids 如何区分序列对中的 token？', 'Hugging Face tokenizers 0.23.1：编码与对齐'],
  ['Linux 进程间通信', 'pipe 调用成功', 'Linux 的 pipe 调用成功后提供什么通信端点？', 'Linux 手册：进程间通信与共享内存'],
  ['Linux I/O 多路复用', 'epoll 主要解决', 'Linux epoll 主要解决什么问题？', 'Linux 手册：epoll I/O 多路复用'],
  ['图算法与并查集', '节点入队时就标记', '图的 BFS 中，为什么常在节点入队时就标记已访问？', 'CP-Algorithms：图遍历、最短路与并查集'],
  ['容器与 Docker 基础', '镜像与容器的基本关系', 'Docker 镜像与容器的基本关系是什么？', 'Docker 官方文档：容器、镜像与持久化'],
  ['浏览器同源与跨域', '两个普通 HTTP(S) URL 是否同源', '浏览器判断两个普通 HTTP(S) URL 是否同源，主要比较什么？', 'MDN：同源策略、CORS 与 Cookie'],
  ['数据库约束与设计', 'CHECK (price > 0)', 'PostgreSQL 17 的 CHECK (price > 0) 能单独阻止 NULL 价格吗？', 'PostgreSQL 17：表约束与数据完整性'],
  ['IPv6 与 DHCP 基础', 'IPv6 的基础首部长度', 'IPv6 的基础首部长度是多少？', 'IPv6、邻居发现与 DHCP：RFC 协议基础'],
  ['策略梯度与优势估计', '策略梯度方法要对什么量', '策略梯度方法要对什么量求关于策略参数的梯度？', 'Spinning Up 与 GAE 论文：策略梯度基础'],
  ['PPO 裁剪与更新', '每个采样动作的新旧策略比率', 'PPO-Clip 中每个采样动作的新旧策略比率如何定义？', 'Spinning Up：PPO-Clip 目标与策略更新'],
  ['RLHF 奖励模型与 PPO', 'SFT、奖励模型和 PPO 分别', '在 InstructGPT 式 RLHF 流程中，SFT、奖励模型和 PPO 分别需要什么训练数据？', 'InstructGPT 原论文 v1：偏好奖励与 PPO 训练'],
  ['贝叶斯更新与赔率', '有限且互斥完备的假设集合', '有限且互斥完备的假设集合中，怎样由先验和似然得到各假设的后验？', 'Think Bayes 2：贝叶斯更新与赔率'],
  ['BoT-IoT 流量数据', '来自什么类型的网络环境', 'BoT-IoT 数据集来自什么类型的网络环境？', 'UNSW BoT-IoT：流量数据与使用边界'],
  ['FuzzBench 评估方法', 'FuzzBench 主要比较什么', 'FuzzBench 主要比较什么类型的工具？', 'FuzzBench 2021 论文：模糊测试评估方法'],
  ['Beta 与二项贝叶斯更新', '贝叶斯建模中的共轭先验', '贝叶斯建模中的共轭先验有什么特点？', 'Think Bayes 2：Beta 与二项共轭更新'],
  ['ReWOO 工具规划', 'ReWOO 原论文把工具增强任务', 'ReWOO 原论文把工具增强任务分为哪三个模块？', 'ReWOO 原论文 v1：先规划与工具证据'],
  ['GRPO 训练基础', 'GRPO 对同一道题如何获得', 'DeepSeekMath 原始 GRPO 对同一道题如何获得一组候选回答？', 'DeepSeekMath 原论文 v1：GRPO 训练与监督'],
  ['FPN 多尺度视觉特征', '原始 FPN 使用主干网络的哪些信息', '原始 FPN 使用主干网络的哪些信息构造特征金字塔？', 'FPN 原论文 v2：多尺度特征与检测'],
  ['Python 日志实践', '常用日志级别按严重程度', 'Python logging 的常用日志级别按严重程度从低到高怎样排列？', 'Python 3.14：logging 配置与日志处理'],
  ['RRF 检索排序融合', 'RRF 如何计算文档在多个排名列表', 'RRF 如何计算文档在多个排名列表中的融合分数？', 'Elasticsearch 8.17：倒数排名融合'],
  ['金丝雀发布评估', '金丝雀评估中，为什么常同时观察', '金丝雀评估中，为什么常同时观察旧版本的对照流量？', 'Google SRE Workbook：金丝雀发布评估'],
  ['Zeek 通知与关联', 'Zeek Notice::Info 的 note 字段', 'Zeek Notice::Info 的 note 字段标识什么？', 'Zeek Notice 框架：通知字段与处理'],
  ['AFL++ 比较反馈与插桩', 'AFL++ CmpLog 插桩主要记录', '固定提交 d7986778 的 AFL++ CmpLog 插桩主要记录什么信息？', 'AFL++ 固定提交：比较反馈与插桩'],
  ['GQA 分组查询注意力', 'GQA 中同组查询头', 'GQA 中同组查询头共享键和值时，查询头本身是否必须相同？', 'GQA 原论文 v1：分组查询注意力与转换'],
  ['Switch 稀疏专家模型', '原始 Switch Transformer 主要用稀疏专家层', '原始 Switch Transformer 主要用稀疏专家层替换 Transformer 块中的什么部分？', 'Switch Transformer 原论文 v1：稀疏专家计算'],
  ['HNSW 分层近邻图', 'HNSW 用什么结构组织', 'HNSW 用什么结构组织近似最近邻索引？', 'HNSW 原论文 v4：分层近邻图检索'],
  ['PyTorch 学习率调度', '学习率调度器通常通过什么对象', 'PyTorch 学习率调度器通常通过什么对象改变学习率？', 'PyTorch 2.7.1：学习率调度器'],
  ['OCSF 安全事件规范', 'OCSF 的安全事件模式主要解决', 'OCSF 的安全事件模式主要解决什么数据问题？', 'OCSF 1.2.0：安全事件标准化字段'],
  ['CVE 记录与版本范围', 'CVE JSON 5.2.0 的 dataVersion', 'CVE JSON 5.2.0 的 dataVersion 字段表示什么？', 'CVE JSON 5.2.0：漏洞记录与版本范围'],
  ['语义分割基础', '语义分割与整图分类的输出粒度', '语义分割与整图分类的输出粒度有什么主要区别？', 'FCN 原论文与 TensorFlow 教程：语义分割'],
  ['Semgrep 污点分析范围', 'sanitizer 设置 exact: true', 'Semgrep 污点规则对 sanitizer 设置 exact: true 时，怎样处理匹配表达式的子表达式？', 'Semgrep 官方文档：污点匹配与分析范围'],
  ['HTTP 版本与 QUIC', 'HTTP/2 与 HTTP/3 分别通常使用', 'HTTP/2 与 HTTP/3 分别通常使用什么传输协议？', 'HTTP/2、HTTP/3 与 QUIC：RFC 9113、9114 和 9000'],
  ['CPU 缓存与存储层次', 'CPU 使用多级缓存的主要目的', 'CPU 使用多级缓存的主要目的是什么？', 'Computation Structures：CPU 缓存与存储层次'],
  ['SQL 窗口函数', '窗口函数与普通 GROUP BY 聚合', 'SQL 窗口函数与普通 GROUP BY 聚合在输出行上有什么主要区别？', 'PostgreSQL 17：SQL 窗口函数'],
  ['字典树与字符串检索', '字典树（Trie）如何利用', '字典树（Trie）如何利用字符串之间的共同前缀？', 'Princeton Algorithms：字典树与字符串检索'],
  ['文本编码与数值表示', 'Unicode 码点与 UTF-8 编码', 'Unicode 码点与 UTF-8 编码有什么区别？', 'Python 3.14 与 RFC 3629：文本编码和浮点表示'],
  ['URLhaus 恶意 URL 情报', 'URLhaus 社区情报主要收录', 'URLhaus 社区情报主要收录哪类网址？', 'URLhaus 社区文档：恶意 URL 情报边界'],
  ['PhishTank 钓鱼数据', 'verified 和 online 字段', 'PhishTank 提供的 online-valid 数据文件中 verified 和 online 字段表示什么？', 'PhishTank 开发者文档：钓鱼数据与时间'],
  ['MalwareBazaar 样本情报', '社区提交策略主要接收', 'MalwareBazaar 社区提交策略主要接收什么样本？', 'MalwareBazaar 社区文档：样本情报与查询'],
  ['ToN_IoT 多源数据', '官方说明中包含哪几类', 'ToN_IoT 官方说明中包含哪几类不同来源的数据？', 'UNSW ToN_IoT：多源遥测与数据划分'],
  ['Tranco 域名排名', '榜单主要对什么对象', 'Tranco 榜单主要对什么对象进行排名？', 'Tranco：域名排名与安全评估'],
  ['事件分析与沟通', '已知受影响资产之外', '为什么 NIST SP 800-61r3 建议在已知受影响资产之外检查其他潜在目标？', 'NIST SP 800-61r3：事件分析与沟通'],
]) {
  test(`study the new ${source} topic with its reference`, async ({ page }) => {
    await page.getByRole('tab', { name: '题库' }).click();
    await page.getByRole('button', { name: `来源：${source}` }).click();
    await page.getByLabel('搜索卡片').fill(query);
    await expect(page.getByText(question)).toBeVisible();
    await page.getByRole('button', { name: '学习筛选结果' }).click();
    await page.getByRole('button', { name: '显示答案' }).click();
    await expect(page.getByLabel(`${reference}，原文依据`)).toBeVisible();
  });
}

test('find Falco, SMOTE, SQuAD and security research cards by source', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '学习范围：全部卡片' }).click();
  for (const [source, query, question] of [
    ['Falco 安全规则', 'skip-if-unknown-filter=true 后', 'Falco 规则设置 skip-if-unknown-filter=true 后，遇到未知过滤字段会怎样？'],
    ['SMOTE 过采样', '多分类问题中使用浮点', 'imbalanced-learn 的 SMOTE 能否在多分类问题中使用浮点 sampling_strategy？'],
    ['SQuAD 问答评测', '官方脚本何时按无答案预测处理', 'SQuAD 2.0 官方脚本何时按无答案预测处理某题？'],
    ['合成钓鱼邮件评测', '检测器评测是否覆盖', 'E-PhishGEN 论文对 E-PhishLLM 的检测器评测是否覆盖了全部三种语言？'],
    ['LogGPT 日志异常检测', 'Top-K 奖励怎样', 'LogGPT 的 Top-K 奖励怎样根据真实下一日志键计算？'],
    ['MegaVul 漏洞代码数据', '临时移除部分宏', 'MegaVul 为什么在函数解析前临时移除部分宏？'],
  ]) {
    await page.getByRole('button', { name: `来源：${source}` }).click();
    await page.getByLabel('搜索卡片').fill(query);
    await expect(page.getByText(question)).toBeVisible();
  }
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel('MegaVul 原论文 v1：漏洞代码数据构建，原文依据')).toBeVisible();
});

test('find exception, statistics, NVD, fuzzing and speech cards by source', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  for (const [source, query, question] of [
    ['Python 异常组', '同一异常组可以让多个', '同一异常组可以让多个 except* 子句执行吗？'],
    ['列联表统计检验', '重采样方法下，statistic', 'SciPy 1.15.3 的 fisher_exact 对 2×2 表在默认方法和重采样方法下，statistic 分别是什么？'],
    ['NVD 漏洞情报接口', 'lastMod 日期范围和 pub', 'NVD CVE API 的 lastMod 日期范围和 pub 日期范围分别筛选什么？'],
    ['CI 模糊测试', 'continuous builds 任务为何', 'ClusterFuzzLite 的 continuous builds 任务为何保存旧构建？'],
    ['wav2vec 2.0 预训练', '量化模块的输入也使用同一遮盖吗', 'wav2vec 2.0 遮盖上下文网络的输入时，量化模块的输入也使用同一遮盖吗？'],
  ]) {
    await page.getByRole('button', { name: `来源：${source}` }).click();
    await page.getByLabel('搜索卡片').fill(query);
    await expect(page.getByText(question)).toBeVisible();
  }
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel('wav2vec 2.0 原论文 v3：语音自监督预训练，原文依据')).toBeVisible();
});

test('find clustering, agent, vision and TLS cards by source', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '学习范围：全部卡片' }).click();
  for (const [source, query, question] of [
    ['HDBSCAN 密度聚类', 'HDBSCAN 标签 -2 和 -3', '使用普通特征数组时，scikit-learn 1.7 的 HDBSCAN 标签 -2 和 -3 分别表示什么？'],
    ['SimPO 偏好优化', 'SimPO 与标准 DPO', 'SimPO 与标准 DPO 的训练目标在参考模型使用上有什么区别？'],
    ['GAIA 助手评测', '任务难度分级的近似依据', 'GAIA 原论文用什么信息作为任务难度分级的近似依据？'],
    ['视觉模型权重接口', '权重对象的 transforms()', 'torchvision 权重对象的 transforms() 常用于什么？'],
    ['JA4 TLS 客户端指纹', '扩展哈希输入也包含它们吗', 'JA4 的扩展数量包含 SNI 和 ALPN，扩展哈希输入也包含它们吗？'],
  ]) {
    await page.getByRole('button', { name: `来源：${source}` }).click();
    await page.getByLabel('搜索卡片').fill(query);
    await expect(page.getByText(question)).toBeVisible();
  }
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel('FoxIO 固定版本：JA4 TLS 客户端指纹，原文依据')).toBeVisible();
});

test('find Git, Linux service and pytest cards by source', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  for (const [source, query, question] of [
    ['Git 历史与排查', 'git reflog 主要记录什么', 'git reflog 主要记录什么，有什么常见用途？'],
    ['Linux 服务与日志', 'daemon-reload 重载的内容', 'systemctl reload 服务与 systemctl daemon-reload 重载的内容有什么区别？'],
    ['Python 自动化测试', '参数化传入的列表或字典', 'pytest 参数化传入的列表或字典会自动为每次测试复制吗？'],
  ]) {
    await page.getByRole('button', { name: `来源：${source}` }).click();
    await page.getByLabel('搜索卡片').fill(query);
    await expect(page.getByText(question)).toBeVisible();
  }
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel('pytest 8.3 文档：自动化测试基础，原文依据')).toBeVisible();
});

test('find streaming, checkpoint and AI research cards by source', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  for (const [source, query, question] of [
    ['WebSocket 与服务端事件', 'SSE 重连时 Last-Event-ID', 'SSE 重连时 Last-Event-ID 头有什么用途？'],
    ['PyTorch 检查点序列化', 'map_location="cpu" 常用于', 'torch.load 的 map_location="cpu" 常用于什么？'],
    ['CodeT5 代码预训练', '同一标识符的多次出现', 'CodeT5 的 masked identifier prediction 如何遮盖同一标识符的多次出现？'],
    ['AdaLoRA 自适应秩', '同时保留恢复机会', 'AdaLoRA 怎样减少不重要低秩分量的有效秩，同时保留恢复机会？'],
    ['蒙特卡洛树搜索', '未访问动作通常如何处理', '使用含动作访问数作分母的 UCT 公式时，未访问动作通常如何处理？'],
    ['时序异常关联差异', '两个阶段分别怎样调整关联', 'Anomaly Transformer 的 minimax 学习中，两个阶段分别怎样调整关联？'],
  ]) {
    await page.getByRole('button', { name: `来源：${source}` }).click();
    await page.getByLabel('搜索卡片').fill(query);
    await expect(page.getByText(question)).toBeVisible();
  }
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel('Anomaly Transformer 原论文 v1：时序关联差异，原文依据')).toBeVisible();
});

test('find Kubernetes, permissions and research cards by source', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '学习范围：全部卡片' }).click();
  for (const [source, query, question] of [
    ['Kubernetes 工作负载与服务', '配置 startupProbe 后', '配置 startupProbe 后，liveness 和 readiness 探针何时开始运行？'],
    ['Linux 文件与目录权限', 'umask 怎样影响请求的权限位', 'Linux 创建文件时 umask 怎样影响请求的权限位？'],
    ['图像掩码自编码', '像素重建损失在哪些图像块', 'MAE 原论文的像素重建损失在哪些图像块上计算？'],
    ['DiverseVul 漏洞代码数据', '各类的 FPR 相同', 'DiverseVul 论文按 CWE 比较模型时，为何各类的 FPR 相同？'],
    ['Sentence Transformers 编码实践', 'precision="int8"', 'Sentence Transformers encode 的 precision="int8" 量化的是什么？'],
  ]) {
    await page.getByRole('button', { name: `来源：${source}` }).click();
    await page.getByLabel('搜索卡片').fill(query);
    await expect(page.getByText(question)).toBeVisible();
  }
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel('Sentence Transformers 5.1.2 源码：文本编码接口，原文依据')).toBeVisible();
});

test('find new computer fundamentals and AI cards by source', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '学习范围：全部卡片' }).click();
  for (const [source, query, question] of [
    ['以太网交换与 VLAN', '动态学习的以太网交换机', '启用动态学习的以太网交换机如何更新 MAC 地址表？'],
    ['Linux 内存映射', '立即关闭原文件描述符', 'Linux 文件 mmap 成功后立即关闭原文件描述符会使映射失效吗？'],
    ['RoPE 旋转位置编码', 'R(m)ᵀR(n)', 'RoPE 中查询位于 m、键位于 n 时，R(m)ᵀR(n) 可以化成什么？'],
    ['RMSNorm 与 SwiGLU', '三矩阵 SwiGLU', '忽略偏置并保持输入输出维度不变时，为使三矩阵 SwiGLU 与两矩阵 FFN 参数量相近，隐藏维度可如何调整？'],
    ['路径穿越与文件访问', 'RESOLVE_NO_SYMLINKS 与 O_NOFOLLOW', 'Linux openat2 的 RESOLVE_NO_SYMLINKS 与 O_NOFOLLOW 在作用范围上有什么区别？'],
    ['HumanEval 代码生成评估', 'HumanEval 每题采样', 'HumanEval 每题采样 n 个候选、其中 c 个通过测试，1≤k≤n 时如何估计 pass@k？'],
    ['层级任务网络规划', '复合任务本身直接定义状态效果', '在 HDDL 论文给出的基础形式化中，复合任务本身直接定义状态效果吗？'],
    ['二叉搜索树与平衡树', 'floor(key) 与 ceiling(key)', '有序符号表中的 floor(key) 与 ceiling(key) 分别表示什么？'],
  ]) {
    await page.getByRole('button', { name: `来源：${source}` }).click();
    await page.getByLabel('搜索卡片').fill(query);
    await expect(page.getByText(question)).toBeVisible();
  }
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel('Princeton Algorithms 第四版：二叉搜索树与平衡树，原文依据')).toBeVisible();
});

test('find new statistics, OCR and malware cards by source', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  for (const [source, query, question] of [
    ['相关系数与秩相关', '遇到常量输入时相关系数', 'SciPy 1.15.3 的 pearsonr 或 spearmanr 遇到常量输入时相关系数如何处理？'],
    ['分布差异与漂移检测', 'statistic_sign 为 +1', 'SciPy ks_2samp 的统计量大于 0 且 statistic_sign 为 +1 时，表示什么？'],
    ['EmbeddingBag 文本嵌入', 'padding_idx 对袋内聚合', 'EmbeddingBag 的 padding_idx 对袋内聚合有什么影响？'],
    ['YARA PE 与规则条件', '对未定义值取 not', 'YARA 对未定义值取 not，是否总会得到 true？'],
    ['Self-Refine 反馈与修订', '具体反馈与可执行反馈', 'Self-Refine 论文所说的具体反馈与可执行反馈分别强调什么？'],
    ['Tesseract 文档 OCR', 'TSV 与 hOCR', 'Tesseract 的 TSV 与 hOCR 输出分别用什么形式保存文本和版面信息？'],
  ]) {
    await page.getByRole('button', { name: `来源：${source}` }).click();
    await page.getByLabel('搜索卡片').fill(query);
    await expect(page.getByText(question)).toBeVisible();
  }
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel('Tesseract 文档：OCR 页面设置与结果，原文依据')).toBeVisible();
});

test('find new text vectorization and security cards by source', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  for (const [source, query, question] of [
    ['文本计数与 TF-IDF', 'binary=True 是否保证最终输出', 'TfidfVectorizer 设置 binary=True 是否保证最终输出只有 0 和 1？'],
    ['CloudTrail 云审计数据', 'eventID 与 sharedEventID', 'CloudTrail 的 eventID 与 sharedEventID 在跨账号事件中有什么区别？'],
    ['Windows Kerberos 审核', '不要求 Kerberos 预身份验证', '账号被设置为不要求 Kerberos 预身份验证时，能否依靠 4771 记录该账号的预认证失败？'],
    ['GuardDuty 威胁检测', '更多相关活动时', 'GuardDuty 发现同一安全问题的更多相关活动时，通常怎样处理已有 finding？'],
    ['智能体经典规划建模', '封闭世界假设下', 'PDDL 常见封闭世界假设下，初始状态未列为真的原子事实通常如何解释？'],
    ['Splunk SPL 日志查询', 'stats 和 eventstats', 'Splunk 的 stats 和 eventstats 在输出事件上有什么主要区别？'],
  ]) {
    await page.getByRole('button', { name: `来源：${source}` }).click();
    await page.getByLabel('搜索卡片').fill(query);
    await expect(page.getByText(question)).toBeVisible();
  }
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel('Splunk Enterprise 9.4 搜索手册：SPL 安全日志分析，原文依据')).toBeVisible();
});

test('find the new computer fundamentals cards by source', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  for (const [source, query, question] of [
    ['MySQL InnoDB 索引', '二级索引找到记录后', 'InnoDB 通过二级索引找到记录后，如果还需要不在索引中的列，通常如何取得？'],
    ['MySQL InnoDB 事务与锁', 'next-key lock 由哪两部分', 'InnoDB 的 next-key lock 由哪两部分组成？'],
    ['Linux 文本处理命令', 'NR 与 FNR', 'awk 的 NR 与 FNR 分别记录什么？'],
    ['分布式服务过载与可靠性', '健康检查失败可能放大故障', '为什么过载时健康检查失败可能放大故障？'],
  ]) {
    await page.getByRole('button', { name: `来源：${source}` }).click();
    await page.getByLabel('搜索卡片').fill(query);
    await expect(page.getByText(question)).toBeVisible();
  }
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel('Google SRE 与 AWS Builder Library：服务过载与可靠性，原文依据')).toBeVisible();
});

test('find the new model, fuzzing and evaluation cards by source', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  for (const [source, query, question] of [
    ['知识蒸馏与 DistilBERT', '余弦嵌入损失主要希望', 'DistilBERT 的余弦嵌入损失主要希望对齐什么？'],
    ['HyDE 检索细节', '采样多个假设文档时', 'HyDE 原论文采样多个假设文档时，如何得到一个查询向量？'],
    ['syzkaller 系统调用测试', '利用资源类型安排', 'syzkaller 如何利用资源类型安排依赖前序结果的系统调用？'],
    ['二项比例与安全评估', 'alternative="less" 后', 'SciPy 1.15.3 的 binomtest 设置 alternative="less" 后，proportion_ci 返回哪一侧有信息的区间？'],
  ]) {
    await page.getByRole('button', { name: `来源：${source}` }).click();
    await page.getByLabel('搜索卡片').fill(query);
    await expect(page.getByText(question)).toBeVisible();
  }
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel('SciPy 1.15.3：二项比例与安全评估，原文依据')).toBeVisible();
});

test('find new statistics and security research cards by source', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  for (const [source, query, question] of [
    ['多重检验与假发现率', '假发现率（FDR）衡量什么', '多重检验中的假发现率（FDR）衡量什么？'],
    ['EQL 安全事件关联', '受限时间内缺少某类事件', 'EQL 8.17 用什么语法表达受限时间内缺少某类事件？'],
    ['自一致性推理', '投票前为什么常需要统一答案格式', '多路径推理按最终答案投票前为什么常需要统一答案格式？'],
    ['UNICORN 溯源检测', '近期活动没有因果关联', 'UNICORN 的时间加权机制如何处理与近期活动没有因果关联的旧特征？'],
  ]) {
    await page.getByRole('button', { name: `来源：${source}` }).click();
    await page.getByLabel('搜索卡片').fill(query);
    await expect(page.getByText(question)).toBeVisible();
  }
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel('UNICORN 原论文 v1：溯源图异常检测，原文依据')).toBeVisible();
});

test('find the new system design cards and study their source', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  for (const [source, query, question] of [
    ['Nginx 负载均衡', '权重分别为 3、1、1', 'Nginx 的三个健康后端权重分别为 3、1、1，按加权轮询且请求均匀处理时，5 个请求通常如何分配？'],
    ['应用缓存策略', '先删缓存再更新数据库', '先删缓存再更新数据库时，并发读取为什么可能留下旧缓存？'],
    ['布隆过滤器', '位置 2、5', '某布隆过滤器查询得到位置 2、5，且对应位分别为 1 和 0，应如何判断？'],
    ['一致性哈希', '键的位置为 95', '哈希环上节点 A、B、C 的位置分别为 20、50、90，键的位置为 95；顺时针找第一个节点时由谁负责？'],
  ]) {
    await page.getByRole('button', { name: `来源：${source}` }).click();
    await page.getByLabel('搜索卡片').fill(query);
    await expect(page.getByText(question)).toBeVisible();
  }
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel('Dynamo 论文：一致性哈希与虚拟节点，应用整理')).toBeVisible();
});

test('find the new FPN card through the 58 interview source', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：58 同城面经' }).click();
  await page.getByLabel('搜索卡片').fill('原始 FPN 使用主干网络的哪些信息');
  await expect(page.getByText('原始 FPN 使用主干网络的哪些信息构造特征金字塔？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel(/58 同城视觉公开面经.*FPN 主题启发，非原帖逐题.*应用整理/)).toBeVisible();
  await expect(page.getByLabel('FPN 原论文 v2：多尺度特征与检测，原文依据')).toBeVisible();
});

test('filter common computer fundamentals by topic', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  for (const [topic, query, question] of [
    ['计算机网络基础', '三次握手的报文顺序', '常见 TCP 三次握手的报文顺序是什么？'],
    ['计算机网络基础', 'IPv4 TCP 套接字时', 'Linux 创建 IPv4 TCP 套接字时，socket 的地址族和类型通常使用什么？'],
    ['计算机网络基础', 'IPv6 的基础首部长度', 'IPv6 的基础首部长度是多少？'],
    ['计算机组成与表示', '大端序与小端序', '多字节整数的大端序与小端序在内存中的主要区别是什么？'],
    ['缓存与 Redis', 'Redis 7.2 的 TTL 对不存在的键', 'Redis 7.2 的 TTL 对不存在的键和没有过期时间的键分别返回什么？'],
    ['消息队列与 Kafka', 'Kafka 3.9 的顺序保证', 'Kafka 3.9 的顺序保证通常以什么为单位？'],
    ['分布式系统与一致性', 'Raft 的服务器在任一时刻', 'Raft 的服务器在任一时刻通常处于哪三种角色之一？'],
    ['编译与构建', 'GCC 15 的 -c 选项', 'GCC 15 的 -c 选项会执行链接吗？'],
    ['容器与 Docker', '镜像与容器的基本关系', 'Docker 镜像与容器的基本关系是什么？'],
    ['Git 与版本控制', 'git fetch 与 git pull', 'git fetch 与 git pull 在更新当前分支方面有什么区别？'],
    ['Linux 常用命令', '命令通常显示什么', 'pwd 命令通常显示什么？'],
    ['Linux 常用命令', 'kill 命令未指定信号', 'Linux 的 kill 命令未指定信号时，默认发送什么信号？'],
    ['操作系统基础', '系统调用的主要作用', '系统调用的主要作用是什么？'],
    ['数据库与 SQL 基础', '数据库事务的原子性', '数据库事务的原子性表示什么？'],
    ['数据库与 SQL 基础', 'CHECK (price > 0)', 'PostgreSQL 17 的 CHECK (price > 0) 能单独阻止 NULL 价格吗？'],
    ['数据结构与算法', '栈和队列分别', '栈和队列分别按什么顺序取出元素？'],
    ['数据结构与算法', '记忆化搜索如何避免', '算法中的记忆化搜索如何避免重复计算子问题？'],
  ]) {
    await page.getByRole('button', { name: `主题：${topic}` }).click();
    await page.getByLabel('搜索卡片').fill(query);
    await expect(page.getByText(question)).toBeVisible();
  }
});

test('filter speculative sampling by Tencent and inspect independent evidence', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：腾讯面经' }).click();
  await page.getByLabel('搜索卡片').fill('无损投机采样对生成结果的概率分布');
  await expect(page.getByText('无损投机采样对生成结果的概率分布有什么保证？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel(/腾讯 IEG 大模型公开面经：投机采样主题启发，非原题/)).toBeVisible();
  await expect(page.getByLabel(/投机解码原论文：Fast Inference from Transformers，原文依据/)).toBeVisible();
});

test('find Git submodule questions by source and inspect their reference', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：Git 子模块' }).click();
  await page.getByLabel('搜索卡片').fill('update --remote 与默认更新');
  await expect(page.getByText('git submodule update --remote 与默认更新的目标有什么区别？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel('Git 2.46 文档：子模块，原文依据')).toBeVisible();
});

test('find LoRA-FA through interview source with independent paper evidence', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：快手面经' }).click();
  await page.getByLabel('搜索卡片').fill('降低低秩适配器的激活内存');
  await expect(page.getByText('LoRA-FA 为什么可能降低低秩适配器的激活内存？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel('快手大模型公开面经：LoRA-FA 主题延伸，非原题，应用整理')).toBeVisible();
  await expect(page.getByLabel('LoRA-FA 原论文 v3：固定投影与内存，原文依据')).toBeVisible();
});

test('find LangChain embedding cache behavior and its source', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：LangChain 嵌入缓存' }).click();
  await page.getByLabel('搜索卡片').fill('查询与文档使用什么缓存');
  await expect(page.getByText('LangChain 0.3.27 设置 query_embedding_cache=True 时，查询与文档使用什么缓存？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel('LangChain 0.3.27 源码：嵌入缓存，原文依据')).toBeVisible();
});

test('find dig DNS questions and inspect their reference', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：dig DNS 查询' }).click();
  await page.getByLabel('搜索卡片').fill('dig 退出状态为 0');
  await expect(page.getByText('BIND 9.20 的 dig 退出状态为 0，能否证明查询的域名存在？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel('BIND 9.20 文档：dig DNS 查询，原文依据')).toBeVisible();
});

test('find Syslog questions and inspect their source', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：Syslog 安全日志' }).click();
  await page.getByLabel('搜索卡片').fill('Facility 和 Severity 计算');
  await expect(page.getByText('RFC 5424 的 PRI 数值如何由 Facility 和 Severity 计算？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel('RFC 5424：Syslog 消息格式，原文依据')).toBeVisible();
});

test('find Gorilla through the interview filter and inspect independent evidence', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：字节面经' }).click();
  await page.getByLabel('搜索卡片').fill('API 调用任务中结合文档检索');
  await expect(page.getByText('Gorilla 为什么在 API 调用任务中结合文档检索？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel('字节大模型公开面经：function calling 主题延伸，非原题，应用整理')).toBeVisible();
  await expect(page.getByLabel('Gorilla 论文 v1：API 检索与调用，原文依据')).toBeVisible();
});

test('find common system and CMake questions through their sources', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  for (const [source, query, question] of [
    ['APT 与 dpkg 软件包管理', 'apt-get -s install', 'Ubuntu 的 apt-get -s install 包名会实际安装软件包吗？'],
    ['SSH 密钥与代理', 'ssh-agent 与 ssh-add', 'OpenSSH 的 ssh-agent 与 ssh-add 通常如何配合使用用户密钥？'],
    ['Linux 进程查询', '最近一秒的瞬时占用率', 'procps-ng 4.0.4 的 ps %CPU 是最近一秒的瞬时占用率吗？'],
    ['CMake 配置与构建', '如何分配包含目录', 'CMake 的 target_include_directories 中 PRIVATE、PUBLIC、INTERFACE 如何分配包含目录？'],
  ]) {
    await page.getByRole('button', { name: `来源：${source}` }).click();
    await page.getByLabel('搜索卡片').fill(query);
    await expect(page.getByText(question)).toBeVisible();
  }
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel('CMake 3.31 文档：配置与构建基础，原文依据')).toBeVisible();
});

test('find new tool, anomaly and rule cards and inspect their sources', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '学习范围：全部卡片' }).click();
  for (const [source, query, question] of [
    ['LangGraph 工具节点', '工具参数校验错误和普通执行异常', 'langgraph-prebuilt 1.0.13 的 ToolNode 默认如何区分工具参数校验错误和普通执行异常？'],
    ['PyOD KNN 异常检测', '不同的 decision_scores_', 'PyOD 2.0.5 的 KNN 为什么可能对训练样本得到不同的 decision_scores_ 和 decision_function(X_train)？'],
    ['Wazuh 规则关联', 'if_matched_sid 与 if_sid', 'Wazuh 4.12 的 if_matched_sid 与 if_sid 在关联对象上有什么区别？'],
    ['证书透明度 v1', 'Merkle 审计路径', 'RFC 6962 v1 的 Merkle 审计路径可用于验证什么？'],
  ]) {
    await page.getByRole('button', { name: `来源：${source}` }).click();
    await page.getByLabel('搜索卡片').fill(query);
    await expect(page.getByText(question)).toBeVisible();
  }
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel('RFC 6962：证书透明度 v1，原文依据')).toBeVisible();
});

test('find Python, fuzzing and reverse engineering cards by source', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  for (const [source, query, question] of [
    ['Python heapq 优先队列', 'heappushpop 与 heapreplace', 'Python heapq 的 heappushpop 与 heapreplace 在新值小于原堆顶时返回什么？'],
    ['Python 线程同步', 'notify() 会自动释放', 'Python threading.Condition.notify() 会自动释放调用方持有的锁吗？'],
    ['Go 原生模糊测试', '保存到 testdata/fuzz', 'Go 模糊测试保存到 testdata/fuzz/目标名 的失败输入有何后续用途？'],
    ['Ghidra 静态分析', 'P-code 在反编译分析', 'Ghidra 的 P-code 在反编译分析中起什么作用？'],
  ]) {
    await page.getByRole('button', { name: `来源：${source}` }).click();
    await page.getByLabel('搜索卡片').fill(query);
    await expect(page.getByText(question)).toBeVisible();
  }
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel('Ghidra 官方材料：静态反编译基础，原文依据')).toBeVisible();
});

test('find new computer fundamentals and model cards by source', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  for (const [source, query, question] of [
    ['补码与整数表示', '表示范围分别是什么', 'n 位二进制数按无符号数与按补码有符号数解释，表示范围分别是什么？'],
    ['哈夫曼编码', '哪两个节点合并', '构造二叉哈夫曼树时，每一轮通常选择哪两个节点合并？'],
    ['垃圾回收基础', '仅靠引用计数', '为什么仅靠引用计数可能无法回收互相引用但外部已不可达的对象？'],
    ['HTTP 方法语义', '一个 PATCH 文档中的变更', 'RFC 5789 要求服务器如何应用一个 PATCH 文档中的变更？'],
    ['Safetensors 张量存储', '单独证明模型权重可信', 'Safetensors 避免 pickle 式对象反序列化，能否单独证明模型权重可信？'],
  ]) {
    await page.getByRole('button', { name: `来源：${source}` }).click();
    await page.getByLabel('搜索卡片').fill(query);
    await expect(page.getByText(question)).toBeVisible();
  }
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel('Safetensors 0.6.2 源码：张量存储，原文依据')).toBeVisible();
});

test('find the MHA extension through Baidu with independent technical evidence', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '来源：百度面经' }).click();
  await page.getByLabel('搜索卡片').fill('分别限制什么');
  await expect(page.getByText('PyTorch 2.7 的 MultiheadAttention 中 key_padding_mask 与 attn_mask 分别限制什么？')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel('百度大模型公开面经：手写多头注意力主题延伸，非原题，应用整理')).toBeVisible();
  await expect(page.getByLabel('PyTorch 2.7 文档：多头注意力接口，原文依据')).toBeVisible();
});

test('find expanded common computing questions by their sources', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  for (const [source, query, question] of [
    ['AVL 平衡搜索树', '左左失衡或右右失衡', 'AVL 树插入产生左左失衡或右右失衡时，通常分别如何调整？'],
    ['POSIX 读写锁', '直接调用 pthread_rwlock_wrlock', '线程持有 POSIX 读锁时，直接调用 pthread_rwlock_wrlock 来升级是否安全？'],
    ['数据库版本冲突', 'Query.update() 的多行批量更新', 'SQLAlchemy 2.0 的版本列检查会自动覆盖 Query.update() 的多行批量更新吗？'],
    ['HTTP 限流与状态码', '429 Too Many Requests', 'HTTP 429 Too Many Requests 通常表示什么？'],
    ['浮点特殊值', '浮点 NaN 与自身', 'Python 浮点 NaN 与自身使用 == 比较时结果是什么？'],
  ]) {
    await page.getByRole('button', { name: `来源：${source}` }).click();
    await page.getByLabel('搜索卡片').fill(query);
    await expect(page.getByText(question)).toBeVisible();
  }
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel('Python 3.14：浮点特殊值与比较，原文依据')).toBeVisible();
});

test('find new model, anomaly and security telemetry cards by source', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '学习范围：全部卡片' }).click();
  for (const [source, query, question] of [
    ['FIM 填空训练', '后缀放在前缀之前', 'FIM 论文为什么提出将后缀放在前缀之前的 SPM 格式？'],
    ['多项式与交互特征', 'interaction_only=True', 'PolynomialFeatures 的 interaction_only=True 如何处理同一特征的平方项？'],
    ['特征袋装异常检测', '是否每个基检测器都使用全部特征', 'PyOD 2.0.5 的 FeatureBagging 设置 max_features=1.0，是否每个基检测器都使用全部特征？'],
    ['YARA 数学文件特征', '有效非空范围计算哪种偏差', 'YARA 4.4 的 math.deviation(offset, size, mean) 对有效非空范围计算哪种偏差？'],
    ['Zeek HTTP 事务日志', '一定是原样请求 URI', 'Zeek 7.2.1 的 http.log 中 uri 一定是原样请求 URI 吗？'],
    ['MLflow 模型注册', '模型别名与固定版本号', 'MLflow 的模型别名与固定版本号有什么主要区别？'],
  ]) {
    await page.getByRole('button', { name: `来源：${source}` }).click();
    await page.getByLabel('搜索卡片').fill(query);
    await expect(page.getByText(question)).toBeVisible();
  }
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel('MLflow 2.22.0：模型注册与别名，原文依据')).toBeVisible();
});

test('find agent, model and security benchmark questions by source', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  for (const [source, query, question] of [
    ['AgentVerse 多智能体协作', 'solver 与 reviewer', 'AgentVerse 的垂直决策结构中，solver 与 reviewer 如何配合？'],
    ['API-Bank 工具评估', '人工标注调用的正确性', 'API-Bank 如何比较预测 API 调用与人工标注调用的正确性？'],
    ['Prefix-Tuning 前缀微调', '开启 prefix_projection', 'PEFT 0.17.1 的 PrefixEncoder 在训练模式下开启 prefix_projection 会增加什么？'],
    ['生成对抗网络基础', '最大化 log D(G(z))', '原始 GAN 论文为什么建议训练初期可最大化 log D(G(z))？'],
    ['GitHub 安全公告接口', '是否能据此认定不存在任何修复', 'GitHub 公告的 first_patched_version 为空，是否能据此认定不存在任何修复？'],
    ['OWASP 漏洞检测基准', 'real vulnerability 列', 'BenchmarkJava 的 expectedresults-1.2.csv 中 real vulnerability 列用来区分什么？'],
  ]) {
    await page.getByRole('button', { name: `来源：${source}` }).click();
    await page.getByLabel('搜索卡片').fill(query);
    await expect(page.getByText(question)).toBeVisible();
  }
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel('OWASP BenchmarkJava：漏洞检测评测，原文依据')).toBeVisible();
});
