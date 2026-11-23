import { StudyCard, StudyData } from '../types';
import { previousBundledCard } from './migration';
import { createInitialData } from './seed';

let bundledById: Map<string, StudyCard> | undefined;
let bundledJsonById: Map<string, string> | undefined;

function bundle(): Map<string, StudyCard> {
  if (!bundledById) bundledById = new Map(createInitialData().cards.map((card) => [card.id, card]));
  return bundledById;
}

function bundleJson(): Map<string, string> {
  if (!bundledJsonById) {
    bundledJsonById = new Map(Array.from(bundle(), ([id, card]) => [id, JSON.stringify(card)]));
  }
  return bundledJsonById;
}

// Bundled cards are already in the application. Store their IDs, while keeping
// complete copies of edited and custom cards as well as all user study state.
export function serializeStudyData(data: StudyData): string {
  const baseline = bundleJson();
  const cards = data.cards.map((card) => baseline.get(card.id) === JSON.stringify(card) ? card.id : card);
  return JSON.stringify({ ...data, storageFormat: 2, cards });
}

export function isCompactStudyData(value: unknown): boolean {
  return typeof value === 'object' && value !== null && 'storageFormat' in value && value.storageFormat === 2;
}

// Leave malformed or unavailable data untouched in storage by throwing instead
// of dropping entries. The caller validates the reconstructed StudyData.
export function hydrateStudyData(value: unknown): unknown {
  if (!isCompactStudyData(value)) return value;
  const stored = value as Record<string, unknown>;
  if (!Array.isArray(stored.cards)) throw new Error('Invalid compact card list');
  const revision = typeof stored.contentRevision === 'number' ? stored.contentRevision : 0;
  const current = bundle();
  const cards = stored.cards.map((card: unknown) => {
    if (typeof card !== 'string') return card;
    const resolved = previousBundledCard(card, revision) ?? current.get(card);
    if (!resolved) throw new Error(`Missing bundled card snapshot: ${card}`);
    return resolved;
  });
  const { storageFormat: _storageFormat, ...rest } = stored;
  return { ...rest, cards };
}
