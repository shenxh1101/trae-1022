import { useState } from 'react';
import { Filter, MapPin, DollarSign, Clock, X, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { cuisines } from '@/data/restaurants';
import { useFilterStore } from '@/store/useFilterStore';
import { BusinessStatus } from '@/types';
import { getBusinessStatusText } from '@/utils/format';

export default function FilterBar() {
  const { filters, setDistance, setCuisine, setPriceRange, setBusinessStatus, resetFilters } = useFilterStore();
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'distance' | 'cuisine' | 'price' | 'status'>('distance');

  const statusOptions: BusinessStatus[] = ['open', 'busy', 'closed'];
  const priceRanges = [
    { label: '¥50以下', value: [0, 50] as [number, number] },
    { label: '¥50-100', value: [50, 100] as [number, number] },
    { label: '¥100-200', value: [100, 200] as [number, number] },
    { label: '¥200以上', value: [200, 500] as [number, number] },
  ];
  const distanceOptions = [
    { label: '500m以内', value: 500 },
    { label: '1km以内', value: 1000 },
    { label: '2km以内', value: 2000 },
    { label: '3km以内', value: 3000 },
    { label: '5km以内', value: 5000 },
  ];

  const toggleCuisine = (cuisine: string) => {
    const newCuisines = filters.cuisine.includes(cuisine)
      ? filters.cuisine.filter(c => c !== cuisine)
      : [...filters.cuisine, cuisine];
    setCuisine(newCuisines);
  };

  const toggleStatus = (status: BusinessStatus) => {
    const newStatus = filters.businessStatus.includes(status)
      ? filters.businessStatus.filter(s => s !== status)
      : [...filters.businessStatus, status];
    setBusinessStatus(newStatus);
  };

  const activeFilterCount = [
    filters.distance !== 5000 ? 1 : 0,
    filters.cuisine.length,
    (filters.priceRange[0] !== 0 || filters.priceRange[1] !== 500) ? 1 : 0,
    filters.businessStatus.length
  ].reduce((a, b) => a + b, 0);

  const tabs = [
    { id: 'distance' as const, label: '距离', icon: MapPin },
    { id: 'cuisine' as const, label: '菜系', icon: Filter },
    { id: 'price' as const, label: '人均', icon: DollarSign },
    { id: 'status' as const, label: '状态', icon: Clock },
  ];

  return (
    <div className="mb-6">
      {/* Filter Trigger */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-200"
        >
          <SlidersHorizontal className="w-5 h-5 text-primary-500" />
          <span className="font-medium text-brown-500">筛选</span>
          {activeFilterCount > 0 && (
            <span className="w-5 h-5 bg-primary-500 text-white text-xs rounded-full flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
          <ChevronDown className={`w-4 h-4 text-brown-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Active Tags */}
        {activeFilterCount > 0 && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 px-3 py-2 text-sm text-brown-400 hover:text-primary-500 transition-colors"
          >
            <X className="w-4 h-4" />
            <span>清除全部</span>
          </button>
        )}
      </div>

      {/* Filter Panel */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-card overflow-hidden animate-slide-down">
          {/* Tabs */}
          <div className="flex border-b border-cream-100">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-primary-600 bg-primary-50 border-b-2 border-primary-500'
                      : 'text-brown-400 hover:text-brown-500 hover:bg-cream-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="p-4">
            {activeTab === 'distance' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {distanceOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setDistance(option.value)}
                    className={`py-2.5 px-3 rounded-xl font-medium transition-all duration-200 ${
                      filters.distance === option.value
                        ? 'bg-primary-500 text-white shadow-md'
                        : 'bg-cream-50 text-brown-500 hover:bg-cream-100'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}

            {activeTab === 'cuisine' && (
              <div className="flex flex-wrap gap-2">
                {cuisines.filter(c => c !== '全部').map((cuisine) => (
                  <button
                    key={cuisine}
                    onClick={() => toggleCuisine(cuisine)}
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                      filters.cuisine.includes(cuisine)
                        ? 'bg-primary-500 text-white shadow-md scale-105'
                        : 'bg-cream-50 text-brown-500 hover:bg-cream-100'
                    }`}
                  >
                    {cuisine}
                  </button>
                ))}
              </div>
            )}

            {activeTab === 'price' && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {priceRanges.map((range) => {
                  const isActive = filters.priceRange[0] === range.value[0] && filters.priceRange[1] === range.value[1];
                  return (
                    <button
                      key={range.label}
                      onClick={() => setPriceRange(range.value)}
                      className={`py-2.5 px-3 rounded-xl font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-primary-500 text-white shadow-md'
                          : 'bg-cream-50 text-brown-500 hover:bg-cream-100'
                      }`}
                    >
                      {range.label}
                    </button>
                  );
                })}
              </div>
            )}

            {activeTab === 'status' && (
              <div className="flex flex-wrap gap-2">
                {statusOptions.map((status) => (
                  <button
                    key={status}
                    onClick={() => toggleStatus(status)}
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                      filters.businessStatus.includes(status)
                        ? 'bg-primary-500 text-white shadow-md scale-105'
                        : 'bg-cream-50 text-brown-500 hover:bg-cream-100'
                    }`}
                  >
                    {getBusinessStatusText(status)}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
