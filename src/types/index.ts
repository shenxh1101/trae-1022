export type BusinessStatus = 'open' | 'busy' | 'closed';
export type Taste = '清淡' | '酸甜' | '麻辣' | '酱香' | '蒜香' | '酸辣' | '咖喱';
export type SortField = 'spiciness' | 'taste' | 'suitableFor' | 'price';

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  pricePerPerson: number;
  distance: number;
  address: string;
  images: string[];
  signatureDishes: string[];
  businessStatus: BusinessStatus;
  queueInfo: {
    waitingTables: number;
    avgWaitTime: number;
  };
  promotions: {
    type: string;
    description: string;
  }[];
  availableTimes: string[];
  tags: string[];
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  category: string;
  price: number;
  image: string;
  spiciness: 0 | 1 | 2 | 3;
  taste: Taste;
  suitableFor: number;
  tags: string[];
  description: string;
}

export interface FilterOptions {
  distance: number;
  cuisine: string[];
  priceRange: [number, number];
  businessStatus: BusinessStatus[];
  searchKeyword: string;
}

export interface DiningPlan {
  id: string;
  restaurantId: string;
  peopleCount: number;
  dateTime: string;
  selectedDishes: string[];
  totalPrice: number;
  note: string;
}

export interface Favorite {
  id: string;
  restaurantId: string;
  addedAt: number;
}
