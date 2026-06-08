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
    <div className="min-h-screen bg-cream-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-primary-300/20 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-12 md:py-16 relative">
          <div className="max-w-3xl">
            <h1 className="font-display text-3xl md:text-5xl font-bold text-white mb-3 leading-tight">
              发现身边
              <span className="text-cream-100">美味</span>
              <br />
              每一餐都值得期待
            </h1>
            <p className="text-cream-100/90 text-base md:text-lg mb-6 max-w-xl">
              精选商圈优质餐厅，智能筛选，收藏对比，轻松规划完美用餐体验
            </p>

            <div className="flex flex-wrap gap-2">
              {featureTags.map((tag) => {
                const Icon = tag.icon;
                return (
                  <div
                    key={tag.label}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r ${tag.color} text-white shadow-md`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-xs font-medium">{tag.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L48 56C96 52 192 44 288 40C384 36 480 36 576 38C672 40 768 44 864 46C960 48 1056 48 1152 46C1248 44 1344 40 1392 38L1440 36V60H1392C1344 60 1248 60 1152 60C1056 60 960 60 864 60C768 60 672 60 576 60C480 60 384 60 288 60C192 60 96 60 48 60H0Z" fill="#FDFBF8" />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 md:pt-6 pt-24">
        <FilterBar />

        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-display text-xl md:text-2xl font-bold text-brown-500">
              发现餐厅
            </h2>
            <p className="text-brown-400 text-sm mt-1">
              共找到 <span className="font-semibold text-primary-600">{filteredRestaurants.length}</span> 家餐厅
            </p>
          </div>
        </div>

        {filteredRestaurants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl shadow-card">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-cream-100 flex items-center justify-center">
              <Utensils className="w-10 h-10 text-brown-300" />
            </div>
            <h3 className="font-display text-lg font-semibold text-brown-500 mb-2">
              没有找到符合条件的餐厅
            </h3>
            <p className="text-brown-400 text-sm mb-4">
              试试调整筛选条件，发现更多美食
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
