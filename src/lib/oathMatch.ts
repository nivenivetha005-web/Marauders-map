export const OATH_PHRASE = "I solemnly swear that I am up to no good";
export const CLOSING_PHRASE = "Mischief managed";

const SIMILARITY_THRESHOLD = 0.75;

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/i'm/g, "i am")
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function levenshteinDistance(a: string, b: string): number {
  const rows = a.length + 1;
  const cols = b.length + 1;
  const distances: number[][] = Array.from({ length: rows }, () =>
    new Array<number>(cols).fill(0)
  );

  for (let i = 0; i < rows; i++) distances[i][0] = i;
  for (let j = 0; j < cols; j++) distances[0][j] = j;

  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      distances[i][j] = Math.min(
        distances[i - 1][j] + 1,
        distances[i][j - 1] + 1,
        distances[i - 1][j - 1] + cost
      );
    }
  }

  return distances[rows - 1][cols - 1];
}

function similarity(a: string, b: string): number {
  const maxLength = Math.max(a.length, b.length);
  if (maxLength === 0) return 1;
  return 1 - levenshteinDistance(a, b) / maxLength;
}

export function matchesPhrase(input: string, phrase: string): boolean {
  const normalizedInput = normalize(input);
  if (!normalizedInput) return false;

  return similarity(normalizedInput, normalize(phrase)) >= SIMILARITY_THRESHOLD;
}

export function matchesOath(input: string): boolean {
  return matchesPhrase(input, OATH_PHRASE);
}

export function matchesClosingPhrase(input: string): boolean {
  return matchesPhrase(input, CLOSING_PHRASE);
}
