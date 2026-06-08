import { create } from 'zustand';
import { FilterOptions, SortField, BusinessStatus } from '@/types';

interface FilterState {
  filters: FilterOptions;
  sortBy: SortField | null;
  sortOrder: 'asc' | 'desc';
  setDistance: (value: number) => void;
  setCuisine: (list: string[]) => void;
  setPriceRange: (range: [number, number]) => void;
  setBusinessStatus: (status: BusinessStatus[]) => void;
  setSearchKeyword: (keyword: string) => void;
  setSortBy: (field: SortField | null) => void;
  toggleSortOrder: () => void;
  resetFilters: () => void;
}

const defaultFilters: FilterOptions = {
  distance: 5000,
  cuisine: [],
  priceRange: [0, 500],
  businessStatus: [],
  searchKeyword: ''
};

export const useFilterStore = create<FilterState>((set) => ({
  filters: defaultFilters,
  sortBy: null,
  sortOrder: 'asc',

  setDistance: (value: number) =>
    set((state) => ({
      filters: { ...state.filters, distance: value }
    })),

  setCuisine: (list: string[]) =>
    set((state) => ({
      filters: { ...state.filters, cuisine: list }
    })),

  setPriceRange: (range: [number, number]) =>
    set((state) => ({
      filters: { ...state.filters, priceRange: range }
    })),

  setBusinessStatus: (status: BusinessStatus[]) =>
    set((state) => ({
      filters: { ...state.filters, businessStatus: status }
    })),

  setSearchKeyword: (keyword: string) =>
    set((state) => ({
      filters: { ...state.filters, searchKeyword: keyword }
    })),

  setSortBy: (field: SortField | null) =>
    set({ sortBy: field }),

  toggleSortOrder: () =>
    set((state) => ({
      sortOrder: state.sortOrder === 'asc' ? 'desc' : 'asc'
    })),

  resetFilters: () =>
    set({
      filters: defaultFilters,
      sortBy: null,
      sortOrder: 'asc'
    })
}));
