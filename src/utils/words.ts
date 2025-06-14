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
