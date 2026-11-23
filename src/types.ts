import type { KnowledgeAreaId } from './knowledgeAreas';

export type CategoryId = 'foundations' | 'detection' | 'vulnerabilities' | 'operations';

export type Rating = 'again' | 'hard' | 'good' | 'easy';

export type StudyLevel = '入门' | '进阶' | '实践';

export type TopicId = 'data-evaluation' | 'network-threats' | 'security-telemetry' | 'anomaly-detection' | 'threat-behavior' | 'phishing-detection' |
  'code-vulnerability' | 'malware-analysis' | 'fuzzing' | 'security-operations' | 'threat-intelligence' | 'security-rag' |
  'math-statistics' | 'python-data' | 'ml-basics' | 'deep-learning' | 'nlp-transformer' | 'llm-training' |
  'rag-basics' | 'agent-design' | 'agent-engineering' | 'reinforcement-learning' |
  'graph-learning' | 'computer-vision' | 'multimodal-learning' | 'document-understanding' | 'speech-audio' | 'model-monitoring' | 'computer-science-foundations' |
  'c-programming' | 'cpp-programming' | 'go-programming' | 'javascript-programming' | 'rust-programming' | 'computer-network' | 'cryptography-foundations' | 'cloud-fundamentals' | 'web-api-design' | 'computer-architecture' | 'caching-systems' | 'message-queues' | 'distributed-systems' | 'software-build' | 'software-design' | 'software-testing' | 'version-control' | 'containers' | 'linux-systems' | 'operating-systems' | 'java-runtime' | 'java-programming' | 'database-fundamentals' | 'data-structures' | 'theory-of-computation';

export interface CardSource {
  id: string;
  title: string;
  url: string;
  type: string;
  evidence: 'source' | 'application';
  sourceCardId: string;
}

export interface StudyCard {
  id: string;
  category: CategoryId;
  question: string;
  answer: string;
  createdAt: number;
  topic?: TopicId;
  knowledgeArea?: KnowledgeAreaId;
  subtopic?: string;
  knowledgePoint?: string;
  questionType?: string;
  origin?: '自行整理';
  level?: StudyLevel;
  tags?: string[];
  explanation?: string;
  example?: string;
  alternateQuestions?: string[];
  otherExplanations?: string[];
  otherExamples?: string[];
  sources?: CardSource[];
}

export interface CardProgress {
  stage: 'learning' | 'review';
  dueAt: number;
  intervalDays: number;
  ease: number;
  reviews: number;
  lapses: number;
  introducedAt: number;
  lastReviewedAt: number;
}

export interface ReviewEvent {
  id: string;
  cardId: string;
  category: CategoryId;
  rating: Rating;
  reviewedAt: number;
  wasNew: boolean;
}

export interface StudyData {
  version: 1;
  contentRevision?: number;
  cards: StudyCard[];
  archivedBundledCards?: StudyCard[];
  progress: Record<string, CardProgress>;
  history: ReviewEvent[];
  deletedCardIds?: string[];
  settings: {
    dailyNewLimit: number;
    userSetLimit?: boolean;
    enabledLevels?: StudyLevel[];
  };
}

export interface StudyCardDraft {
  id?: string;
  category: CategoryId;
  topic: TopicId;
  level: StudyLevel;
  question: string;
  answer: string;
  explanation?: string;
  example?: string;
  tags: string[];
}
