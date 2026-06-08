import { create } from 'zustand';
import { Restaurant, MenuItem } from '@/types';
import { restaurants } from '@/data/restaurants';
import { menuItems } from '@/data/menuItems';
import { getFavorites, saveFavorites } from '@/utils/storage';

interface RestaurantState {
  restaurants: Restaurant[];
  menuItems: MenuItem[];
  favorites: string[];
  currentRestaurant: Restaurant | null;
  initFavorites: () => void;
  toggleFavorite: (id: string) => void;
  getRestaurantById: (id: string) => Restaurant | undefined;
  getMenuByRestaurantId: (restaurantId: string) => MenuItem[];
  getMenuItemById: (id: string) => MenuItem | undefined;
  setCurrentRestaurant: (restaurant: Restaurant | null) => void;
}

export const useRestaurantStore = create<RestaurantState>((set, get) => ({
  restaurants,
  menuItems,
  favorites: [],
  currentRestaurant: null,

  initFavorites: () => {
    const savedFavorites = getFavorites();
    set({ favorites: savedFavorites });
  },

  toggleFavorite: (id: string) => {
    const currentFavorites = get().favorites;
    let newFavorites: string[];
    
    if (currentFavorites.includes(id)) {
      newFavorites = currentFavorites.filter(fav => fav !== id);
    } else {
      newFavorites = [...currentFavorites, id];
    }
    
    saveFavorites(newFavorites);
    set({ favorites: newFavorites });
  },

  getRestaurantById: (id: string) => {
    return get().restaurants.find(r => r.id === id);
  },

  getMenuByRestaurantId: (restaurantId: string) => {
    return get().menuItems.filter(item => item.restaurantId === restaurantId);
  },

  getMenuItemById: (id: string) => {
    return get().menuItems.find(item => item.id === id);
  },

  setCurrentRestaurant: (restaurant: Restaurant | null) => {
    set({ currentRestaurant: restaurant });
  }
}));
