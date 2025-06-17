import { adjectives as adjective } from "./adjective";
import { adverbs as adverb } from "./adverb";
import { conjunctions as conjunction } from "./conjunction";
import { nouns as noun } from "./noun";
import { verbs } from "./verbs";
import { pronouns as pronoun } from "./pronoun";
import { prepositions as preposition } from "./preposition";
import { interjections as interjection } from "./interjection";

export * from "./adjective";
export * from "./adverb";
export * from "./conjunction";
export * from "./noun";
export * from "./verbs";
export * from "./pronoun";
export * from "./preposition";
export * from "./interjection";

export const words = [
  ...adjective,
  ...adverb,
  ...conjunction,
  ...noun,
  ...verbs,
  ...pronoun,
  ...preposition,
  ...interjection,
]

// Utility to get 10 random words with part of speech info
export function getRandomWordsByPart(part: string | 'all', count = 10) {
  let filtered = part === 'all'
    ? words
    : words.filter(w => w.partsOfSpeech === part); // Exact match since we're using the correct case from the mapping
  if (filtered.length === 0) {
    console.warn(`No words found for part of speech: ${part}`);
    filtered = words; // Fallback to all words if none found
  }
  // Shuffle and pick count
  filtered = filtered.sort(() => Math.random() - 0.5).slice(0, count);
  return filtered;
}
