import { CategoryId, TopicId } from './types';

export const topics: { id: TopicId; category: CategoryId; label: string }[] = [
  { id: 'math-statistics', category: 'foundations', label: '数学与统计基础' },
  { id: 'python-data', category: 'foundations', label: 'Python 与数据工程' },
  { id: 'c-programming', category: 'foundations', label: 'C 语言基础' },
  { id: 'cpp-programming', category: 'foundations', label: 'C++ 语言与标准库' },
  { id: 'go-programming', category: 'foundations', label: 'Go 语言与并发基础' },
  { id: 'javascript-programming', category: 'foundations', label: 'JavaScript 语言与异步基础' },
  { id: 'rust-programming', category: 'foundations', label: 'Rust 语言与并发基础' },
  { id: 'computer-network', category: 'foundations', label: '计算机网络基础' },
  { id: 'cryptography-foundations', category: 'foundations', label: '通用密码学原语' },
  { id: 'cloud-fundamentals', category: 'foundations', label: '云计算与高可用基础' },
  { id: 'web-api-design', category: 'foundations', label: 'Web API 与 REST 设计' },
  { id: 'computer-architecture', category: 'foundations', label: '计算机组成与表示' },
  { id: 'computer-science-foundations', category: 'foundations', label: '计算机通用基础' },
  { id: 'theory-of-computation', category: 'foundations', label: '理论计算机基础' },
  { id: 'caching-systems', category: 'foundations', label: '缓存与 Redis' },
  { id: 'message-queues', category: 'foundations', label: '消息队列与 Kafka' },
  { id: 'distributed-systems', category: 'foundations', label: '分布式系统与一致性' },
  { id: 'software-build', category: 'foundations', label: '编译与构建' },
  { id: 'software-design', category: 'foundations', label: '软件设计与设计模式' },
  { id: 'software-testing', category: 'foundations', label: '软件测试与质量' },
  { id: 'version-control', category: 'foundations', label: 'Git 与版本控制' },
  { id: 'containers', category: 'foundations', label: '容器与 Docker' },
  { id: 'linux-systems', category: 'foundations', label: 'Linux 常用命令' },
  { id: 'operating-systems', category: 'foundations', label: '操作系统基础' },
  { id: 'java-runtime', category: 'foundations', label: 'Java 虚拟机与运行时' },
  { id: 'java-programming', category: 'foundations', label: 'Java 语言与集合' },
  { id: 'database-fundamentals', category: 'foundations', label: '数据库与 SQL 基础' },
  { id: 'data-structures', category: 'foundations', label: '数据结构与算法' },
  { id: 'ml-basics', category: 'foundations', label: '机器学习基础' },
  { id: 'deep-learning', category: 'foundations', label: '深度学习基础' },
  { id: 'nlp-transformer', category: 'foundations', label: 'NLP 与 Transformer' },
  { id: 'llm-training', category: 'foundations', label: '大语言模型训练与推理' },
  { id: 'rag-basics', category: 'foundations', label: '检索与 RAG 基础' },
  { id: 'agent-design', category: 'foundations', label: 'Agent 原理与设计' },
  { id: 'agent-engineering', category: 'foundations', label: 'Agent 工程与评测' },
  { id: 'reinforcement-learning', category: 'foundations', label: '强化学习' },
  { id: 'graph-learning', category: 'foundations', label: '图学习' },
  { id: 'computer-vision', category: 'foundations', label: '计算机视觉' },
  { id: 'multimodal-learning', category: 'foundations', label: '图文与多模态模型' },
  { id: 'document-understanding', category: 'foundations', label: 'OCR 与文档理解' },
  { id: 'speech-audio', category: 'foundations', label: '语音与音频' },
  { id: 'model-monitoring', category: 'foundations', label: '模型部署与监控' },
  { id: 'data-evaluation', category: 'foundations', label: '数据与评估' },
  { id: 'network-threats', category: 'detection', label: '网络威胁检测' },
  { id: 'security-telemetry', category: 'detection', label: '安全日志与流量' },
  { id: 'anomaly-detection', category: 'detection', label: '异常行为检测' },
  { id: 'threat-behavior', category: 'detection', label: '威胁行为分析' },
  { id: 'phishing-detection', category: 'detection', label: '钓鱼网址检测' },
  { id: 'code-vulnerability', category: 'vulnerabilities', label: '代码漏洞检测' },
  { id: 'malware-analysis', category: 'vulnerabilities', label: '恶意软件检测' },
  { id: 'fuzzing', category: 'vulnerabilities', label: 'AI 辅助模糊测试' },
  { id: 'security-telemetry', category: 'operations', label: '安全日志与流量' },
  { id: 'security-operations', category: 'operations', label: '告警与事件研判' },
  { id: 'threat-intelligence', category: 'operations', label: '威胁情报' },
  { id: 'security-rag', category: 'operations', label: '安全知识检索' },
];

export function topicLabel(id?: TopicId): string {
  return topics.find((topic) => topic.id === id)?.label ?? '未分类';
}

export function defaultTopic(category: CategoryId): TopicId {
  const defaults: Record<CategoryId, TopicId> = {
    foundations: 'data-evaluation',
    detection: 'network-threats',
    vulnerabilities: 'code-vulnerability',
    operations: 'security-operations',
  };
  return defaults[category];
}
