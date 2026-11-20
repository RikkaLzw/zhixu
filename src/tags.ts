import aliases from '../question-banks/tag-aliases.json';

const tagAliases: Record<string, string> = aliases;

export function normalizeTag(tag: string): string {
  const trimmed = tag.normalize('NFKC').trim();
  return tagAliases[trimmed.toLocaleLowerCase()] ?? trimmed;
}
