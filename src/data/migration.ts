import retiredFile from '../../question-banks/retired-v4.json';
import retiredV6File from '../../question-banks/retired-v6.json';
import retiredV8File from '../../question-banks/retired-v8.json';
import retiredV9File from '../../question-banks/retired-v9.json';
import retiredV11File from '../../question-banks/retired-v11.json';
import retiredV17File from '../../question-banks/retired-v17.json';
import retiredV18File from '../../question-banks/retired-v18.json';
import retiredV19File from '../../question-banks/retired-v19.json';
import retiredV20File from '../../question-banks/retired-v20.json';
import retiredV21File from '../../question-banks/retired-v21.json';
import retiredV22File from '../../question-banks/retired-v22.json';
import retiredV23File from '../../question-banks/retired-v23.json';
import retiredV25File from '../../question-banks/retired-v25.json';
import retiredV38File from '../../question-banks/retired-v38.json';
import retiredV49File from '../../question-banks/retired-v49.json';
import retiredV52File from '../../question-banks/retired-v52.json';
import retiredV54File from '../../question-banks/retired-v54.json';
import retiredV55File from '../../question-banks/retired-v55.json';
import retiredV62File from '../../question-banks/retired-v62.json';
import retiredV82File from '../../question-banks/retired-v82.json';
import retiredV83File from '../../question-banks/retired-v83.json';
import retiredV118File from '../../question-banks/retired-v118.json';
import retiredV237File from '../../question-banks/retired-v237.json';
import retiredV238File from '../../question-banks/retired-v238.json';
import retiredV239File from '../../question-banks/retired-v239.json';
import { CardSource, StudyCard, StudyData } from '../types';
import { defaultTopic } from '../topics';
import { createInitialData } from './seed';
import { contentRevision } from './contentRevision';

const retiredFiles = [retiredFile, retiredV6File, retiredV8File, retiredV9File, retiredV11File,
  retiredV17File, retiredV18File, retiredV19File, retiredV20File, retiredV21File, retiredV22File,
  retiredV23File, retiredV25File, retiredV38File, retiredV49File, retiredV52File, retiredV54File,
  retiredV55File, retiredV62File, retiredV82File, retiredV83File, retiredV118File, retiredV237File,
  retiredV238File, retiredV239File];
const oldCards = new Map((retiredFiles.flatMap((file) => file.cards) as StudyCard[]).map((card) => [card.id, card]));
const oldCardsByRevision = new Map<string, { version: number; card: StudyCard }[]>();
for (const file of retiredFiles) {
  for (const card of file.cards as StudyCard[]) {
    const snapshots = oldCardsByRevision.get(card.id) ?? [];
    snapshots.push({ version: file.version, card });
    oldCardsByRevision.set(card.id, snapshots);
  }
}

// A compact save may refer to a card as it was before a later bundle update.
export function previousBundledCard(id: string, revision: number): StudyCard | undefined {
  return oldCardsByRevision.get(id)?.find((snapshot) => snapshot.version >= revision)?.card;
}
const revisedV238Ids = new Set(retiredV237File.cards.map((card) => card.id));
const revisedV239Ids = new Set(retiredV238File.cards.map((card) => card.id));
const revisedV240Ids = new Set(retiredV239File.cards.map((card) => card.id));
const retireTargets: Record<string, string[]> = {
  'ai4sec-004': ['eval-010'],
  'eval-004': ['ai4sec-006', 'ai4sec-007'],
  'eval-007': ['ai4sec-008'],
  'ai4sec-020': ['ai4sec-008'],
  'phish-005': ['ai4sec-003'],
  'isof-005': ['ai4sec-011'],
  'isof-009': ['ai4sec-014'],
  'prime-005': ['prime-004'],
  'zeek-006': ['cic-007'],
  'phish-004': ['eval-010'],
  'phish-009': ['eval-010'],
  'phish-010': ['eval-009'],
  'phish-012': ['eval-013'],
  'ember-010': ['eval-013'],
  'code-006': ['prime-007'],
  'code-007': ['ai4sec-005'],
  'code-010': ['eval-010'],
  'copilot-004': ['ai4sec-032'],
  'ai4sec-034': ['rag-002', 'rag-009', 'ai4sec-039'],
  'isof-012': ['eval-016'],
  'ai4sec-010': ['eval-002'],
  'fuzz-012': ['fuzz-004', 'fuzz-006', 'fuzz-007'],
  'fuzz-010': ['fuzz-005', 'lfuzz-005', 'lfuzz-006'],
  'interview-001': ['copilot-001', 'code-012', 'ai4sec-033'],
  'interview-002': ['copilot-001', 'rag-001'],
  'interview-003': ['copilot-008', 'ai4sec-040'],
  'ai4sec-023': ['code-012', 'llmv-007', 'llmvstudy-017'],
  'ai4sec-030': ['cflow-008', 'llmvstudy-017'],
  'llmv-004': ['code-012', 'cflow-008'],
  'llmv-010': ['prime-010', 'llmvstudy-019', 'llmvstudy-020'],
};

function unchangedCard(card: StudyCard, previous: StudyCard, revision: number): boolean {
  if (card.category !== previous.category || card.question !== previous.question || card.answer !== previous.answer ||
      (card.topic !== undefined && card.topic !== previous.topic)) return false;
  if (revision >= 20 && (card.knowledgeArea !== previous.knowledgeArea || card.subtopic !== previous.subtopic ||
      card.knowledgePoint !== previous.knowledgePoint || card.questionType !== previous.questionType ||
      card.origin !== previous.origin || card.level !== previous.level ||
      JSON.stringify(card.alternateQuestions ?? []) !== JSON.stringify(previous.alternateQuestions ?? []) ||
      JSON.stringify(card.otherExplanations ?? []) !== JSON.stringify(previous.otherExplanations ?? []) ||
      JSON.stringify(card.otherExamples ?? []) !== JSON.stringify(previous.otherExamples ?? []))) return false;
  const oldSeed = revision < 2 && card.id.startsWith('ai4sec-');
  if (!(oldSeed && card.explanation === undefined) && card.explanation !== previous.explanation) return false;
  if (!(oldSeed && card.example === undefined) && card.example !== previous.example) return false;
  if (!(oldSeed && card.tags === undefined) && JSON.stringify(card.tags ?? []) !== JSON.stringify(previous.tags ?? [])) return false;
  return true;
}

export function migrateStudyData(data: StudyData): StudyData {
  if ((data.contentRevision ?? 0) >= contentRevision) return data;

  const bundled = createInitialData().cards;
  const bundledById = new Map(bundled.map((card) => [card.id, card]));
  const existingIds = new Set(data.cards.map((card) => card.id));
  const deletedIds = new Set(data.deletedCardIds ?? []);
  const currentById = new Map(data.cards.map((card) => [card.id, card]));
  const archived = Array.isArray(data.archivedBundledCards) ? [...data.archivedBundledCards] : [];
  const progress = { ...data.progress };
  const previousRevision = data.contentRevision ?? 0;
  const inheritedSources = new Map<string, CardSource[]>();

  function archive(card: StudyCard) {
    if (!archived.some((old) => old.id === card.id && old.question === card.question && old.answer === card.answer)) {
      archived.push(card);
    }
  }

  function targetsArePresent(targets: string[]): boolean {
    return targets.every((id) => {
      const current = currentById.get(id);
      const reference = bundledById.get(id);
      if (deletedIds.has(id) || !reference) return false;
      if (current) return current.question === reference.question && current.answer === reference.answer;
      // Non-legacy bundled targets absent from the old library are added below.
      return !id.startsWith('ai4sec-');
    });
  }

  const existing = data.cards.flatMap((card) => {
    const reference = bundledById.get(card.id);
    const old = previousBundledCard(card.id, previousRevision) ?? oldCards.get(card.id);
    const unedited = old && unchangedCard(card, old, previousRevision);
    const targets = retireTargets[card.id];
    if (unedited && targets && targetsArePresent(targets)) {
      archive(card);
      if (card.sources?.length) {
        for (const target of targets) {
          inheritedSources.set(target, [...(inheritedSources.get(target) ?? []), ...card.sources]);
        }
      }
      if (targets.length === 1 && progress[card.id] && !progress[targets[0]]) {
        progress[targets[0]] = progress[card.id];
      }
      return [];
    }
    if (unedited && (card.id === 'ai4sec-001' || card.id === 'ai4sec-009' || card.id === 'ai4sec-013' || card.id === 'ai4sec-015' || card.id === 'ai4sec-028' || card.id === 'ai4sec-029' || card.id === 'ember-007' || card.id === 'isof-008' || card.id === 'prime-007' || card.id === 'semtaint-006' || card.id === 'code-011' || card.id === 'suri-006' || card.id === 'suri-008' || card.id === 'eval-014' || card.id === 'zeek-012' || card.id === 'copilot-006' || card.id === 'faissdeep-002' || revisedV238Ids.has(card.id) || revisedV239Ids.has(card.id) || revisedV240Ids.has(card.id)) && reference) {
      archive(card);
      const sources = new Map(
        [...(card.sources ?? []), ...(reference.sources ?? [])]
          .map((source) => [`${source.id}:${source.sourceCardId}`, source])
      );
      return [{ ...reference, createdAt: card.createdAt, sources: Array.from(sources.values()) }];
    }
    if (!reference || reference.question !== card.question || reference.answer !== card.answer) return [card];
    const sources = new Map(
      [...(card.sources ?? []), ...(reference.sources ?? [])]
        .map((source) => [`${source.id}:${source.sourceCardId}`, source])
    );
    return [{
      ...card,
      topic: card.topic ?? (card.category === reference.category ? reference.topic : defaultTopic(card.category)),
      knowledgeArea: card.knowledgeArea ?? reference.knowledgeArea,
      subtopic: card.subtopic ?? reference.subtopic,
      knowledgePoint: card.knowledgePoint ?? reference.knowledgePoint,
      questionType: card.questionType ?? reference.questionType,
      origin: card.origin ?? reference.origin,
      level: card.level ?? reference.level,
      tags: Array.from(new Set([...(card.tags ?? []), ...(reference.tags ?? [])])),
      explanation: card.explanation ?? reference.explanation,
      example: card.example ?? reference.example,
      alternateQuestions: Array.from(new Set([...(card.alternateQuestions ?? []), ...(reference.alternateQuestions ?? [])])),
      otherExplanations: Array.from(new Set([...(card.otherExplanations ?? []), ...(reference.otherExplanations ?? [])])),
      otherExamples: Array.from(new Set([...(card.otherExamples ?? []), ...(reference.otherExamples ?? [])])),
      sources: Array.from(sources.values()),
    }];
  });
  function addInheritedSources(card: StudyCard): StudyCard {
    const inherited = inheritedSources.get(card.id);
    if (!inherited?.length) return card;
    const sources = new Map(
      [...inherited, ...(card.sources ?? [])].map((source) => [`${source.id}:${source.sourceCardId}`, source])
    );
    return { ...card, sources: Array.from(sources.values()) };
  }
  const withInheritedSources = existing.map(addInheritedSources);
  const additions = bundled.filter((card) =>
    !card.id.startsWith('ai4sec-') && !existingIds.has(card.id) && !deletedIds.has(card.id)
  ).map(addInheritedSources);

  const oldDefault = data.settings.dailyNewLimit === 10 && data.settings.userSetLimit !== true;
  return {
    ...data,
    contentRevision,
    cards: [...withInheritedSources, ...additions],
    archivedBundledCards: archived,
    progress,
    deletedCardIds: data.deletedCardIds ?? [],
    settings: {
      ...data.settings,
      dailyNewLimit: oldDefault ? 500 : data.settings.dailyNewLimit,
    },
  };
}
