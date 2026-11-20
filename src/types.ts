export type CategoryId = 'foundations' | 'detection' | 'vulnerabilities' | 'operations';

export type Rating = 'again' | 'hard' | 'good' | 'easy';

export type TopicId = 'data-evaluation' | 'network-threats' | 'security-telemetry' | 'anomaly-detection' | 'phishing-detection' |
  'code-vulnerability' | 'malware-analysis' | 'fuzzing' | 'security-operations' | 'threat-intelligence' | 'security-rag';

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
  level?: '入门' | '进阶' | '实践';
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
  progress: Record<string, CardProgress>;
  history: ReviewEvent[];
  deletedCardIds?: string[];
  settings: {
    dailyNewLimit: number;
    userSetLimit?: boolean;
  };
}
