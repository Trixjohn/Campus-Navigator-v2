import { PLACES } from '@/data/places';

// Only records marked published are ever shown.
export function getAllPlaces() {
  return PLACES.filter((place) => place.published);
}

export function getCategories() {
  const names = getAllPlaces().map((place) => place.category);
  return [...new Set(names)];
}

export function getPlaceById(id) {
  return getAllPlaces().find((place) => place.id === id) || null;
}

// Searches name, short name, nicknames (aliases), and facilities.
// "category" is optional. Pass null to search all categories.
export function searchPlaces(query, category) {
  const text = (query || '').trim().toLowerCase();

  return getAllPlaces().filter((place) => {
    if (category && place.category !== category) {
      return false;
    }
    if (!text) {
      return true;
    }
    const searchable = [place.name, place.shortName, ...place.aliases, ...place.facilities]
      .join(' ')
      .toLowerCase();
    return searchable.includes(text);
  });
}