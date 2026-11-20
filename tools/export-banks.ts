import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { getCategory } from '../src/categories';
import { createInitialData } from '../src/data/seed';
import { topicLabel } from '../src/topics';

const directory = join(__dirname, '..', 'question-banks', 'normalized');
const cards = createInitialData().cards;
mkdirSync(directory, { recursive: true });

writeFileSync(join(directory, 'cards.json'), `${JSON.stringify({
  schemaVersion: 1,
  description: '合并同一知识点后的 AI4SEC 卡片；不包含个人学习记录。',
  cards,
}, null, 2)}\n`, 'utf8');

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function cleanTag(value: string): string {
  return value.trim().replace(/[\s:]+/g, '_');
}

function field(value: string): string {
  return value.replace(/[\r\n\t]+/g, ' ');
}

const rows = cards.map((card) => {
  const answer = [escapeHtml(card.answer)];
  if (card.explanation) answer.push(`<b>深入理解：</b>${[card.explanation, ...(card.otherExplanations ?? [])].map(escapeHtml).join('<br>')}`);
  if (card.example) answer.push(`<b>应用示例：</b>${[card.example, ...(card.otherExamples ?? [])].map(escapeHtml).join('<br>')}`);
  if (card.alternateQuestions?.length) answer.push(`<b>相关问法：</b>${card.alternateQuestions.map(escapeHtml).join('<br>')}`);
  if (card.sources?.length) {
    const sources = card.sources.map((source) => {
      const title = `${source.title}（${source.evidence === 'source' ? '原文依据' : '应用整理'}）`;
      return source.url ? `<a href="${escapeHtml(source.url)}">${escapeHtml(title)}</a>` : escapeHtml(title);
    });
    answer.push(`<b>参考来源：</b>${sources.join('；')}`);
  }
  const tags = [
    'AI4SEC',
    `方向::${cleanTag(getCategory(card.category).label)}`,
    `主题::${cleanTag(topicLabel(card.topic))}`,
    ...(card.tags ?? []).map(cleanTag),
  ].join(' ');
  return [field(escapeHtml(card.question)), field(answer.join('<br><br>')), field(tags)].join('\t');
});

const header = ['#separator:Tab', '#html:true', '#columns:问题\t答案\t标签', '#tags column:3'];
writeFileSync(join(directory, 'anki-import.tsv'), `${[...header, ...rows].join('\n')}\n`, 'utf8');
console.log(`已导出 ${cards.length} 张卡片到 question-banks/normalized。`);
