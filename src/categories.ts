import { CategoryId } from './types';

export const categories: {
  id: CategoryId;
  label: string;
  description: string;
  color: string;
  background: string;
  icon: 'layers-outline' | 'pulse-outline' | 'code-slash-outline' | 'sparkles-outline';
}[] = [
  {
    id: 'foundations',
    label: 'AI 与数据基础',
    description: '数学、模型、Agent 与数据',
    color: '#5B6EB4',
    background: '#ECEFFD',
    icon: 'layers-outline',
  },
  {
    id: 'detection',
    label: '威胁检测',
    description: '流量、异常与行为',
    color: '#238574',
    background: '#E4F4EF',
    icon: 'pulse-outline',
  },
  {
    id: 'vulnerabilities',
    label: '漏洞与恶意软件',
    description: '代码审计与样本分析',
    color: '#BA7B42',
    background: '#FBF0E5',
    icon: 'code-slash-outline',
  },
  {
    id: 'operations',
    label: '智能安全运营',
    description: '告警、情报与大模型',
    color: '#9D668A',
    background: '#F8EAF2',
    icon: 'sparkles-outline',
  },
];

export function getCategory(id: CategoryId) {
  return categories.find((category) => category.id === id) ?? categories[0];
}
