import { useEffect } from 'react';
import { Utensils, Flame, Star, TrendingUp } from 'lucide-react';
import FilterBar from '@/components/FilterBar';
import RestaurantCard from '@/components/RestaurantCard';
import { useRestaurantStore } from '@/store/useRestaurantStore';
import { useFilterStore } from '@/store/useFilterStore';
import { useFilterRestaurants } from '@/hooks/useFilter';

const featureTags = [
  { icon: Flame, label: '热门推荐', color: 'from-orange-400 to-red-500' },
  { icon: Star, label: '高分餐厅', color: 'from-yellow-400 to-amber-500' },
  { icon: TrendingUp, label: '新晋商家', color: 'from-green-400 to-emerald-500' },
  { icon: Utensils, label: '美食精选', color: 'from-purple-400 to-pink-500' },
];

export default function Home() {
  const { restaurants, initFavorites } = useRestaurantStore();
  const { filters } = useFilterStore();
  const filteredRestaurants = useFilterRestaurants(restaurants, filters);

  useEffect(() => {
    initFavorites();
  }, [initFavorites]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-primary-300/20 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-12 md:py-20 relative">
          <div className="max-w-3xl animate-slide-up">
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
              发现身边
              <span className="text-cream-100">美味</span>
              <br />
              每一餐都值得期待
            </h1>
            <p className="text-cream-100/90 text-lg md:text-xl mb-8 max-w-xl">
              精选商圈优质餐厅，智能筛选，收藏对比，轻松规划完美用餐体验
            </p>

            {/* Feature Tags */}
            <div className="flex flex-wrap gap-3">
              {featureTags.map((tag) => {
                const Icon = tag.icon;
                return (
                  <div
                    key={tag.label}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${tag.color} text-white shadow-lg`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{tag.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 80L48 74.7C96 69.3 192 58.7 288 53.3C384 48 480 48 576 50.7C672 53.3 768 58.7 864 61.3C960 64 1056 64 1152 61.3C1248 58.7 1344 53.3 1392 50.7L1440 48V80H1392C1344 80 1248 80 1152 80C1056 80 960 80 864 80C768 80 672 80 576 80C480 80 384 80 288 80C192 80 96 80 48 80H0Z" fill="#FDFBF8" />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Filter Section */}
        <div className="mb-6">
          <FilterBar />
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display text-2xl font-bold text-brown-500">
              发现餐厅
            </h2>
            <p className="text-brown-400 text-sm mt-1">
              共找到 <span className="font-semibold text-primary-600">{filteredRestaurants.length}</span> 家餐厅
            </p>
          </div>
        </div>

        {/* Restaurant Grid */}
        {filteredRestaurants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRestaurants.map((restaurant, index) => (
              <div
                key={restaurant.id}
                style={{ animationDelay: `${index * 0.05}s` }}
                className="animate-slide-up"
              >
                <RestaurantCard restaurant={restaurant} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-cream-100 flex items-center justify-center">
              <Utensils className="w-12 h-12 text-brown-300" />
            </div>
            <h3 className="font-display text-xl font-semibold text-brown-500 mb-2">
              没有找到符合条件的餐厅
            </h3>
            <p className="text-brown-400 mb-6">
              试试调整筛选条件，发现更多美食
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
