import { ArrowUpDown, ArrowDown, ArrowUp, Flame, Users, DollarSign, Palette } from 'lucide-react';
import { SortField } from '@/types';
import { useFilterStore } from '@/store/useFilterStore';

const sortOptions = [
  { id: 'spiciness' as SortField, label: '辣度', icon: Flame },
  { id: 'taste' as SortField, label: '口味', icon: Palette },
  { id: 'suitableFor' as SortField, label: '适合人数', icon: Users },
  { id: 'price' as SortField, label: '价格', icon: DollarSign },
];

export default function SortBar() {
  const { sortBy, sortOrder, setSortBy, toggleSortOrder } = useFilterStore();

  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="flex items-center gap-1 text-brown-400">
        <ArrowUpDown className="w-4 h-4" />
        <span className="text-sm font-medium">排序:</span>
      </div>
      
      <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
        {sortOptions.map((option) => {
          const Icon = option.icon;
          const isActive = sortBy === option.id;
          
          return (
            <button
              key={option.id}
              onClick={() => {
                if (sortBy === option.id) {
                  toggleSortOrder();
                } else {
                  setSortBy(option.id);
                }
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-medium text-sm whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-white text-brown-500 hover:bg-cream-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{option.label}</span>
              {isActive && (
                sortOrder === 'asc' 
                  ? <ArrowUp className="w-3 h-3" />
                  : <ArrowDown className="w-3 h-3" />
              )}
            </button>
          );
        })}
        
        {sortBy && (
          <button
            onClick={() => setSortBy(null)}
            className="px-3 py-2 text-sm text-brown-400 hover:text-brown-500 transition-colors"
          >
            清除
          </button>
        )}
      </div>
    </div>
  );
}
