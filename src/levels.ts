import { StudyCard, StudyData, StudyLevel } from './types';

export const studyLevels: { id: StudyLevel; label: string; description: string }[] = [
  { id: '入门', label: '基础', description: '基础概念和常见知识点' },
  { id: '进阶', label: '进阶', description: '原理、边界和深入理解' },
  { id: '实践', label: '实践', description: '工具应用和实际场景' },
];

// Older personal cards may not have a difficulty; they remain available as basic cards.
export function cardLevel(card: StudyCard): StudyLevel {
  return card.level === '进阶' || card.level === '实践' ? card.level : '入门';
}

export function studyLevelLabel(level: StudyLevel): string {
  return studyLevels.find((item) => item.id === level)?.label ?? '基础';
}

// Existing installations have no preference stored, so all stages stay enabled.
export function enabledStudyLevels(settings: StudyData['settings']): StudyLevel[] {
  if (!Array.isArray(settings.enabledLevels)) return studyLevels.map((level) => level.id);
  return studyLevels.filter((level) => settings.enabledLevels!.includes(level.id)).map((level) => level.id);
}
