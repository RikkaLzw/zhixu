import { CategoryId, TopicId } from './types';

export const topics: { id: TopicId; category: CategoryId; label: string }[] = [
  { id: 'data-evaluation', category: 'foundations', label: '数据与评估' },
  { id: 'network-threats', category: 'detection', label: '网络威胁检测' },
  { id: 'security-telemetry', category: 'detection', label: '安全日志与流量' },
  { id: 'anomaly-detection', category: 'detection', label: '异常行为检测' },
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
