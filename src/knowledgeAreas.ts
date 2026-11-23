export const knowledgeAreas = [
  ['01', '数学与统计基础'],
  ['02', 'Python 与数据工程'],
  ['03', '机器学习基础'],
  ['04', '深度学习基础'],
  ['05', 'NLP 与 Transformer'],
  ['06', '大语言模型训练与推理'],
  ['07', '检索、向量数据库与 RAG'],
  ['08', 'Agent 原理与设计'],
  ['09', 'Agent 工程与评测'],
  ['10', '安全数据与特征'],
  ['11', 'AI 威胁与异常检测'],
  ['12', 'AI 恶意软件与钓鱼检测'],
  ['13', 'AI 代码漏洞检测'],
  ['14', 'AI 辅助模糊测试'],
  ['15', 'AI 威胁情报'],
  ['16', 'AI 安全运营与应急响应'],
  ['17', 'AI4SEC 评估与落地'],
  ['18', '多模态与其他 AI 方法'],
  ['19', '计算机基础与系统'],
] as const;

export type KnowledgeAreaId = typeof knowledgeAreas[number][0];

export function knowledgeAreaLabel(id?: KnowledgeAreaId): string {
  return knowledgeAreas.find(([areaId]) => areaId === id)?.[1] ?? '待分类';
}
