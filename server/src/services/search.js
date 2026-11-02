import { PLACES } from '../data/places.js';

// Very common words that should not count as search terms.
const STOP_WORDS = new Set([
  'where', 'is', 'the', 'a', 'an', 'of', 'in', 'at', 'to', 'how', 'do', 'does',
  'i', 'me', 'my', 'you', 'can', 'find', 'what', 'which', 'located', 'location',
  'building', 'floor', 'please', 'go', 'get', 'there', 'on', 'for', 'and', 'or', 'are',
]);

function toWords(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 1);
}

// Returns up to "limit" published places that match the question.
export function findPlaces(question, limit = 3) {
  const searchWords = toWords(question).filter((word) => !STOP_WORDS.has(word));
  if (searchWords.length === 0) {
    return [];
  }

  const scored = PLACES.filter((place) => place.published)
    .map((place) => {
      const nameWords = new Set(toWords([place.name, place.shortName, ...place.aliases].join(' ')));
      const otherWords = new Set(
        toWords([place.category, ...place.facilities, ...place.floorInfo].join(' '))
      );

      let score = 0;
      for (const word of searchWords) {
        if (nameWords.has(word)) {
          score += 3;
        } else if (otherWords.has(word)) {
          score += 1;
        }
      }
      return { place, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((item) => item.place);
}