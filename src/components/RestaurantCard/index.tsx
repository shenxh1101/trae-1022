import { Link } from 'react-router-dom';
import { Heart, Star, MapPin, Clock, Users, ChevronRight } from 'lucide-react';
import { Restaurant } from '@/types';
import { formatDistance, formatRating, getBusinessStatusText, getBusinessStatusColor } from '@/utils/format';
import { useRestaurantStore } from '@/store/useRestaurantStore';

interface RestaurantCardProps {
  restaurant: Restaurant;
  showCompare?: boolean;
  isCompared?: boolean;
  onCompare?: (id: string) => void;
}

export default function RestaurantCard({
  restaurant,
  showCompare = false,
  isCompared = false,
  onCompare
}: RestaurantCardProps) {
  const { favorites, toggleFavorite } = useRestaurantStore();
  const isFavorite = favorites.includes(restaurant.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(restaurant.id);
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onCompare?.(restaurant.id);
  };

  return (
    <Link
      to={`/restaurant/${restaurant.id}`}
      className="card group relative block animate-fade-in"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={restaurant.images[0]}
          alt={restaurant.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-white shadow-lg ${getBusinessStatusColor(restaurant.businessStatus)}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse-soft" />
            {getBusinessStatusText(restaurant.businessStatus)}
          </span>
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 hover:bg-white active:scale-95"
        >
          <Heart
            className={`w-5 h-5 transition-all duration-300 ${
              isFavorite
                ? 'fill-primary-500 text-primary-500 animate-bounce-subtle'
                : 'text-brown-400 group-hover:text-primary-400'
            }`}
          />
        </button>

        {/* Queue Info */}
        {restaurant.queueInfo.waitingTables > 0 && (
          <div className="absolute bottom-3 left-3 glass px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-lg">
            <Users className="w-4 h-4 text-primary-500" />
            <span className="text-xs font-medium text-brown-500">
              排队 {restaurant.queueInfo.waitingTables} 桌
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display text-lg font-semibold text-brown-500 line-clamp-1 group-hover:text-primary-600 transition-colors">
            {restaurant.name}
          </h3>
          <div className="flex items-center gap-1 shrink-0">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold text-brown-500">
              {formatRating(restaurant.rating)}
            </span>
          </div>
        </div>

        {/* Cuisine & Price */}
        <div className="flex items-center gap-3 mb-3">
          <span className="text-sm text-brown-400">{restaurant.cuisine}</span>
          <span className="w-1 h-1 rounded-full bg-brown-200" />
          <span className="text-sm font-medium text-primary-600">
            ¥{restaurant.pricePerPerson}/人
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {restaurant.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="tag text-xs py-0.5 px-2">
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-cream-100">
          <div className="flex items-center gap-4 text-sm text-brown-400">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{formatDistance(restaurant.distance)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{restaurant.queueInfo.avgWaitTime > 0 ? `${restaurant.queueInfo.avgWaitTime}分钟` : '无需等待'}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-primary-500 font-medium text-sm">
            <span>查看</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>

      {/* Compare Overlay */}
      {showCompare && (
        <button
          onClick={handleCompareClick}
          className={`absolute inset-0 flex items-center justify-center transition-all duration-200 ${
            isCompared
              ? 'bg-primary-500/20 border-4 border-primary-500 rounded-2xl'
              : 'bg-transparent hover:bg-brown-500/5'
          }`}
        >
          {isCompared && (
            <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center shadow-glow">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </button>
      )}
    </Link>
  );
}
