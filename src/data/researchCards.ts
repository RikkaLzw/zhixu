import researchFile from '../../question-banks/interview-research-cards.json';
import { StudyCard } from '../types';

const researchById = new Map(researchFile.cards.map((card) => [card.id, card]));

// A personal edit must not silently inherit the classification of the bundled card.
export function isResearchCard(card: StudyCard): boolean {
  const reviewed = researchById.get(card.id);
  return Boolean(reviewed && reviewed.question === card.question && reviewed.answer === card.answer);
}
