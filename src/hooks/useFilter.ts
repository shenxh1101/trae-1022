import { useMemo } from 'react';
import { Restaurant, MenuItem, FilterOptions, SortField } from '@/types';

export const useFilterRestaurants = (
  restaurants: Restaurant[],
  filters: FilterOptions
): Restaurant[] => {
  return useMemo(() => {
    return restaurants.filter((restaurant) => {
      if (restaurant.distance > filters.distance) return false;
      
      if (filters.cuisine.length > 0 && !filters.cuisine.includes(restaurant.cuisine)) {
        return false;
      }
      
      if (
        restaurant.pricePerPerson < filters.priceRange[0] ||
        restaurant.pricePerPerson > filters.priceRange[1]
      ) {
        return false;
      }
      
      if (
        filters.businessStatus.length > 0 &&
        !filters.businessStatus.includes(restaurant.businessStatus)
      ) {
        return false;
      }
      
      if (filters.searchKeyword) {
        const keyword = filters.searchKeyword.toLowerCase();
        const matchName = restaurant.name.toLowerCase().includes(keyword);
        const matchCuisine = restaurant.cuisine.toLowerCase().includes(keyword);
        const matchSignature = restaurant.signatureDishes.some(dish =>
          dish.toLowerCase().includes(keyword)
        );
        if (!matchName && !matchCuisine && !matchSignature) {
          return false;
        }
      }
      
      return true;
    });
  }, [restaurants, filters]);
};

export const useFilterMenuItems = (
  menuItems: MenuItem[],
  category: string,
  sortBy: SortField | null,
  sortOrder: 'asc' | 'desc'
): MenuItem[] => {
  return useMemo(() => {
    let filtered = [...menuItems];
    
    if (category && category !== '全部') {
      filtered = filtered.filter(item => item.category === category);
    }
    
    if (sortBy) {
      filtered.sort((a, b) => {
        let comparison = 0;
        
        switch (sortBy) {
          case 'spiciness':
            comparison = a.spiciness - b.spiciness;
            break;
          case 'taste':
            comparison = a.taste.localeCompare(b.taste);
            break;
          case 'suitableFor':
            comparison = a.suitableFor - b.suitableFor;
            break;
          case 'price':
            comparison = a.price - b.price;
            break;
          default:
            comparison = 0;
        }
        
        return sortOrder === 'asc' ? comparison : -comparison;
      });
    }
    
    return filtered;
  }, [menuItems, category, sortBy, sortOrder]);
};

export const useDebounce = <T>(value: T, delay: number): T => {
  return useMemo(() => {
    let debouncedValue = value;
    const timeout = setTimeout(() => {
      debouncedValue = value;
    }, delay);
    return () => clearTimeout(timeout);
  }, [value, delay]) as unknown as T;
};
