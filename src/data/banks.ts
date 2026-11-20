import cic from '../../question-banks/cic-ids2017/cards.json';
import unsw from '../../question-banks/unsw-nb15/cards.json';
import evaluation from '../../question-banks/sklearn-evaluation/cards.json';
import zeek from '../../question-banks/zeek-logs/cards.json';
import suricata from '../../question-banks/suricata-eve/cards.json';
import codexglue from '../../question-banks/codexglue-defects/cards.json';
import primevul from '../../question-banks/primevul/cards.json';
import ember from '../../question-banks/ember-malware/cards.json';
import llm4vuln from '../../question-banks/llm4vuln/cards.json';
import attack from '../../question-banks/mitre-attack/cards.json';
import copilot from '../../question-banks/security-copilot/cards.json';
import rag from '../../question-banks/security-rag/cards.json';
import interview from '../../question-banks/github-ai4sec-interview/cards.json';
import isolationForest from '../../question-banks/isolation-forest/cards.json';
import openphish from '../../question-banks/openphish/cards.json';
import ossFuzzGen from '../../question-banks/oss-fuzz-gen/cards.json';
import aliasFile from '../../question-banks/aliases.json';
import { CardSource, CategoryId, StudyCard, TopicId } from '../types';
import { defaultTopic } from '../topics';
import { normalizeTag } from '../tags';

export interface BankCard {
  id: string;
  category: CategoryId;
  level: '入门' | '进阶' | '实践';
  question: string;
  answer: string;
  explanation: string;
  example: string;
  tags: string[];
  evidence: 'source' | 'application';
  reference?: string;
}

export interface QuestionBank {
  source: { id: string; title: string; url: string; type: string; note: string };
  cards: BankCard[];
}

export const questionBanks: QuestionBank[] = [
  cic, unsw, evaluation, zeek, suricata, codexglue, primevul, ember,
  llm4vuln, attack, copilot, rag, interview, isolationForest, openphish, ossFuzzGen,
] as QuestionBank[];

export const aliases = aliasFile.aliases;

const sourceTopics: Record<string, TopicId> = {
  'cic-ids2017': 'network-threats',
  'unsw-nb15': 'network-threats',
  'sklearn-evaluation': 'data-evaluation',
  'zeek-logs': 'security-telemetry',
  'suricata-eve': 'security-telemetry',
  'codexglue-defects': 'code-vulnerability',
  primevul: 'code-vulnerability',
  'ember-malware': 'malware-analysis',
  llm4vuln: 'code-vulnerability',
  'mitre-attack': 'threat-intelligence',
  'security-copilot': 'security-operations',
  'security-rag': 'security-rag',
  'github-ai4sec-interview': 'security-operations',
  'isolation-forest': 'anomaly-detection',
  openphish: 'phishing-detection',
  'oss-fuzz-gen': 'fuzzing',
};

function legacyTopic(card: StudyCard): TopicId {
  const index = Number(card.id.replace('ai4sec-', ''));
  if (card.category === 'vulnerabilities' && index >= 27) return 'malware-analysis';
  if (card.category === 'operations' && (index === 33 || index === 38)) return 'threat-intelligence';
  if (card.category === 'operations' && (index === 34 || index === 36)) return 'security-rag';
  return defaultTopic(card.category);
}

function legacySource(card: StudyCard): CardSource {
  return {
    id: 'original',
    title: 'AI4SEC 自编起步题',
    url: '',
    type: '自编题',
    evidence: 'application',
    sourceCardId: card.id,
  };
}

export function normalizeBanks(legacyCards: StudyCard[]): StudyCard[] {
  const aliasMap = new Map(aliases.map((alias) => [alias.source, alias.canonical]));
  const all: StudyCard[] = legacyCards.map((card) => ({
    ...card,
    topic: legacyTopic(card),
    sources: [legacySource(card)],
  }));

  for (const bank of questionBanks) {
    for (const card of bank.cards) {
      all.push({
        id: card.id,
        category: card.category,
        question: card.question,
        answer: card.answer,
        createdAt: 0,
        topic: sourceTopics[bank.source.id] ?? defaultTopic(card.category),
        level: card.level,
        tags: card.tags,
        explanation: card.explanation,
        example: card.example,
        sources: [{
          id: bank.source.id,
          title: bank.source.title,
          url: card.reference ?? bank.source.url,
          type: bank.source.type,
          evidence: card.evidence,
          sourceCardId: card.id,
        }],
      });
    }
  }

  const byId = new Map(all.map((card) => [card.id, card]));
  const groups = new Map<string, StudyCard[]>();
  for (const card of all) {
    const canonical = aliasMap.get(card.id) ?? card.id;
    const group = groups.get(canonical) ?? [];
    group.push(card);
    groups.set(canonical, group);
  }

  return Array.from(groups, ([canonical, group]) => {
    const primary = byId.get(canonical);
    if (!primary) throw new Error(`Unknown canonical card: ${canonical}`);
    const enrich = group.find((card) => card.explanation);
    const explanation = primary.explanation ?? enrich?.explanation;
    const example = primary.example ?? enrich?.example;
    return {
      ...primary,
      explanation,
      example,
      alternateQuestions: Array.from(new Set(group.map((card) => card.question).filter((value) => value !== primary.question))),
      otherExplanations: Array.from(new Set(group.map((card) => card.explanation).filter((value): value is string => Boolean(value) && value !== explanation))),
      otherExamples: Array.from(new Set(group.map((card) => card.example).filter((value): value is string => Boolean(value) && value !== example))),
      level: primary.level ?? enrich?.level,
      tags: Array.from(new Set(group.flatMap((card) => card.tags ?? []).map(normalizeTag).filter(Boolean))),
      sources: group.flatMap((card) => card.sources ?? []),
    };
  });
}
