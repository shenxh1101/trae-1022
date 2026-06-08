import { create } from 'zustand';
import { DiningPlan, MenuItem } from '@/types';
import { generatePlanId, calculateServiceFee } from '@/utils/format';
import { getDiningPlan, saveDiningPlan, clearDiningPlan } from '@/utils/storage';

interface PlanState {
  currentPlan: DiningPlan | null;
  initPlan: () => void;
  setRestaurant: (id: string, clearDishes?: boolean) => void;
  setPeopleCount: (count: number) => void;
  setDateTime: (datetime: string) => void;
  addDish: (dishId: string) => void;
  removeDish: (dishId: string) => void;
  setNote: (note: string) => void;
  calculateTotal: (menuItems: MenuItem[]) => number;
  generateShareCard: () => DiningPlan | null;
  resetPlan: () => void;
}

const createEmptyPlan = (): DiningPlan => ({
  id: generatePlanId(),
  restaurantId: '',
  peopleCount: 2,
  dateTime: '',
  selectedDishes: [],
  totalPrice: 0,
  note: ''
});

export const usePlanStore = create<PlanState>((set, get) => ({
  currentPlan: null,

  initPlan: () => {
    const savedPlan = getDiningPlan();
    if (savedPlan) {
      set({ currentPlan: savedPlan });
    } else {
      set({ currentPlan: createEmptyPlan() });
    }
  },

  setRestaurant: (id: string, clearDishes = true) =>
    set((state) => {
      if (!state.currentPlan) return state;
      const newPlan = {
        ...state.currentPlan,
        restaurantId: id,
        selectedDishes: clearDishes ? [] : state.currentPlan.selectedDishes
      };
      saveDiningPlan(newPlan);
      return { currentPlan: newPlan };
    }),

  setPeopleCount: (count: number) =>
    set((state) => {
      if (!state.currentPlan) return state;
      const newPlan = { ...state.currentPlan, peopleCount: count };
      saveDiningPlan(newPlan);
      return { currentPlan: newPlan };
    }),

  setDateTime: (datetime: string) =>
    set((state) => {
      if (!state.currentPlan) return state;
      const newPlan = { ...state.currentPlan, dateTime: datetime };
      saveDiningPlan(newPlan);
      return { currentPlan: newPlan };
    }),

  addDish: (dishId: string) =>
    set((state) => {
      if (!state.currentPlan) return state;
      if (state.currentPlan.selectedDishes.includes(dishId)) return state;
      const newPlan = {
        ...state.currentPlan,
        selectedDishes: [...state.currentPlan.selectedDishes, dishId]
      };
      saveDiningPlan(newPlan);
      return { currentPlan: newPlan };
    }),

  removeDish: (dishId: string) =>
    set((state) => {
      if (!state.currentPlan) return state;
      const newPlan = {
        ...state.currentPlan,
        selectedDishes: state.currentPlan.selectedDishes.filter(id => id !== dishId)
      };
      saveDiningPlan(newPlan);
      return { currentPlan: newPlan };
    }),

  setNote: (note: string) =>
    set((state) => {
      if (!state.currentPlan) return state;
      const newPlan = { ...state.currentPlan, note };
      saveDiningPlan(newPlan);
      return { currentPlan: newPlan };
    }),

  calculateTotal: (menuItems: MenuItem[]) => {
    const plan = get().currentPlan;
    if (!plan) return 0;
    
    const dishesTotal = plan.selectedDishes.reduce((total, dishId) => {
      const dish = menuItems.find(item => item.id === dishId);
      return total + (dish?.price || 0);
    }, 0);
    
    const serviceFee = calculateServiceFee(dishesTotal);
    const total = dishesTotal + serviceFee;
    
    set((state) => {
      if (!state.currentPlan) return state;
      const newPlan = { ...state.currentPlan, totalPrice: total };
      saveDiningPlan(newPlan);
      return { currentPlan: newPlan };
    });
    
    return total;
  },

  generateShareCard: () => {
    const plan = get().currentPlan;
    return plan;
  },

  resetPlan: () => {
    clearDiningPlan();
    set({ currentPlan: createEmptyPlan() });
  }
}));
