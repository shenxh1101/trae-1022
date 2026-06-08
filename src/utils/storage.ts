const FAVORITES_KEY = 'foodie_favorites';
const PLAN_KEY = 'foodie_dining_plan';

export const getFavorites = (): string[] => {
  try {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveFavorites = (favorites: string[]): void => {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (e) {
    console.error('Failed to save favorites', e);
  }
};

export const addFavorite = (restaurantId: string): string[] => {
  const favorites = getFavorites();
  if (!favorites.includes(restaurantId)) {
    favorites.push(restaurantId);
    saveFavorites(favorites);
  }
  return favorites;
};

export const removeFavorite = (restaurantId: string): string[] => {
  const favorites = getFavorites();
  const index = favorites.indexOf(restaurantId);
  if (index > -1) {
    favorites.splice(index, 1);
    saveFavorites(favorites);
  }
  return favorites;
};

export const getDiningPlan = () => {
  try {
    const data = localStorage.getItem(PLAN_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

export const saveDiningPlan = (plan: unknown): void => {
  try {
    localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
  } catch (e) {
    console.error('Failed to save dining plan', e);
  }
};

export const clearDiningPlan = (): void => {
  try {
    localStorage.removeItem(PLAN_KEY);
  } catch (e) {
    console.error('Failed to clear dining plan', e);
  }
};
