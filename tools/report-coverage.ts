import reviews from '../question-banks/review-batches.json';
import { createInitialData } from '../src/data/seed';
import { knowledgeAreas } from '../src/knowledgeAreas';
import { reviewedIds } from './review-coverage';

const cards = createInitialData().cards;
const result = reviewedIds(cards, reviews.batches);
if (result.errors.length) {
  for (const error of result.errors) console.error(error);
  process.exitCode = 1;
}
console.log(`已复核 ${result.ids.size} 张；待复核 ${cards.length - result.ids.size} 张；当前标准化主卡 ${cards.length} 张。`);
console.log('编号  知识方向  已复核  待复核  合计');
for (const [id, label] of knowledgeAreas) {
  const inArea = cards.filter((card) => card.knowledgeArea === id);
  const verified = inArea.filter((card) => result.ids.has(card.id)).length;
  console.log(`${id}  ${label}  ${verified}  ${inArea.length - verified}  ${inArea.length}`);
}
