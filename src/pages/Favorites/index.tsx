import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, GitCompare, Trash2, ArrowLeft, Check } from 'lucide-react';
import RestaurantCard from '@/components/RestaurantCard';
import CompareTable from '@/components/CompareTable';
import { useRestaurantStore } from '@/store/useRestaurantStore';

export default function Favorites() {
  const navigate = useNavigate();
  const { restaurants, favorites, toggleFavorite, initFavorites } = useRestaurantStore();
  const [isCompareMode, setIsCompareMode] = useState(false);
  const [compareIds, setCompareIds] = useState<string[]>([]);

  useEffect(() => {
    initFavorites();
  }, [initFavorites]);

  const favoriteRestaurants = restaurants.filter(r => favorites.includes(r.id));
  const compareRestaurants = restaurants.filter(r => compareIds.includes(r.id));

  const handleCompareToggle = (id: string) => {
    setCompareIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(i => i !== id);
      }
      if (prev.length >= 3) {
        return prev;
      }
      return [...prev, id];
    });
  };

  const handleRemoveFromCompare = (id: string) => {
    setCompareIds(prev => prev.filter(i => i !== id));
  };

  const handleViewDetails = (id: string) => {
    navigate(`/restaurant/${id}`);
  };

  const handleClearCompare = () => {
    setCompareIds([]);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-rose-500 via-pink-500 to-red-500 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-20 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute bottom-10 left-10 w-60 h-60 rounded-full bg-rose-300/20 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-10 relative">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>返回</span>
          </button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
                我的收藏
              </h1>
              <p className="text-white/80">
                已收藏 <span className="font-bold text-white">{favoriteRestaurants.length}</span> 家餐厅
              </p>
            </div>
            {favoriteRestaurants.length >= 2 && (
              <button
                onClick={() => {
                  setIsCompareMode(!isCompareMode);
                  if (isCompareMode) {
                    setCompareIds([]);
                  }
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                  isCompareMode
                    ? 'bg-white text-rose-600 shadow-lg'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <GitCompare className="w-5 h-5" />
                <span>{isCompareMode ? '取消对比' : '对比餐厅'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L60 55C120 50 240 40 360 37.5C480 35 600 40 720 42.5C840 45 960 45 1080 42.5C1200 40 1320 35 1380 32.5L1440 30V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z" fill="#FDFBF8" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Compare Mode Info */}
        {isCompareMode && (
          <div className="mb-6 p-4 bg-primary-50 rounded-2xl border border-primary-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                <GitCompare className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <p className="font-medium text-brown-500">
                  已选择 <span className="text-primary-600 font-bold">{compareIds.length}/3</span> 家餐厅进行对比
                </p>
                <p className="text-sm text-brown-400">
                  点击餐厅卡片添加到对比，最多可选择3家
                </p>
              </div>
            </div>
            {compareIds.length > 0 && (
              <button
                onClick={handleClearCompare}
                className="px-4 py-2 text-sm text-brown-400 hover:text-brown-500 transition-colors"
              >
                清除选择
              </button>
            )}
          </div>
        )}

        {/* Compare Table */}
        {compareIds.length > 0 && (
          <div className="mb-8">
            <h2 className="font-display text-xl font-semibold text-brown-500 mb-4 flex items-center gap-2">
              <Check className="w-5 h-5 text-avocado-500" />
              餐厅对比
            </h2>
            <div className="card p-6 overflow-x-auto">
              <CompareTable
                restaurants={compareRestaurants}
                onRemove={handleRemoveFromCompare}
                onViewDetails={handleViewDetails}
              />
            </div>
          </div>
        )}

        {/* Favorites List */}
        <div>
          <h2 className="font-display text-xl font-semibold text-brown-500 mb-4 flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            收藏餐厅
          </h2>

          {favoriteRestaurants.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favoriteRestaurants.map((restaurant, index) => (
                <div
                  key={restaurant.id}
                  style={{ animationDelay: `${index * 0.05}s` }}
                  className="animate-slide-up relative"
                >
                  <RestaurantCard
                    restaurant={restaurant}
                    showCompare={isCompareMode}
                    isCompared={compareIds.includes(restaurant.id)}
                    onCompare={handleCompareToggle}
                  />
                  {!isCompareMode && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleFavorite(restaurant.id);
                      }}
                      className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-red-100 text-red-500 flex items-center justify-center hover:bg-red-200 transition-colors shadow-md z-10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="card p-12 text-center">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-cream-100 flex items-center justify-center">
                <Heart className="w-12 h-12 text-brown-300" />
              </div>
              <h3 className="font-display text-xl font-semibold text-brown-500 mb-2">
                还没有收藏餐厅
              </h3>
              <p className="text-brown-400 mb-6">
                浏览餐厅时点击心形图标收藏喜欢的餐厅
              </p>
              <button
                onClick={() => navigate('/')}
                className="btn-primary"
              >
                去发现美食
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
