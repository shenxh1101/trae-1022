import { Star, DollarSign, MapPin, Clock, Check, X, ArrowRight } from 'lucide-react';
import { Restaurant } from '@/types';
import { formatDistance, formatRating, getBusinessStatusText, getBusinessStatusColor } from '@/utils/format';

interface CompareTableProps {
  restaurants: Restaurant[];
  onRemove: (id: string) => void;
  onViewDetails: (id: string) => void;
}

const compareFields = [
  { label: '评分', icon: Star, key: 'rating' },
  { label: '人均', icon: DollarSign, key: 'pricePerPerson' },
  { label: '距离', icon: MapPin, key: 'distance' },
  { label: '状态', icon: Clock, key: 'status' },
];

export default function CompareTable({ restaurants, onRemove, onViewDetails }: CompareTableProps) {
  if (restaurants.length === 0) {
    return (
      <div className="card p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cream-100 flex items-center justify-center">
          <X className="w-8 h-8 text-brown-300" />
        </div>
        <h3 className="font-display text-lg font-semibold text-brown-500 mb-2">
          暂无对比
        </h3>
        <p className="text-brown-400 text-sm">
          请先选择要对比的餐厅
        </p>
      </div>
    );
  }

  const getValue = (restaurant: Restaurant, key: string) => {
    switch (key) {
      case 'rating':
        return (
          <div className="flex items-center justify-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{formatRating(restaurant.rating)}</span>
          </div>
        );
      case 'pricePerPerson':
        return <span className="font-semibold text-primary-600">¥{restaurant.pricePerPerson}</span>;
      case 'distance':
        return <span>{formatDistance(restaurant.distance)}</span>;
      case 'status':
        return (
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium text-white ${getBusinessStatusColor(restaurant.businessStatus)}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse-soft" />
            {getBusinessStatusText(restaurant.businessStatus)}
          </span>
        );
      default:
        return '-';
    }
  };

  const getBestValue = (key: string) => {
    if (restaurants.length < 2) return null;
    
    switch (key) {
      case 'rating':
        return restaurants.reduce((best, curr) => 
          curr.rating > best.rating ? curr : best
        ).id;
      case 'pricePerPerson':
        return restaurants.reduce((best, curr) => 
          curr.pricePerPerson < best.pricePerPerson ? curr : best
        ).id;
      case 'distance':
        return restaurants.reduce((best, curr) => 
          curr.distance < best.distance ? curr : best
        ).id;
      default:
        return null;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[600px]">
        {/* Header - Restaurant Names */}
        <thead>
          <tr>
            <th className="w-32 p-4 text-left text-sm font-medium text-brown-400 bg-transparent">
              对比项
            </th>
            {restaurants.map((restaurant) => (
              <th key={restaurant.id} className="p-4 text-center relative">
                <button
                  onClick={() => onRemove(restaurant.id)}
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-100 text-red-500 flex items-center justify-center hover:bg-red-200 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={restaurant.images[0]}
                    alt={restaurant.name}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <span className="font-display font-semibold text-brown-500">
                    {restaurant.name}
                  </span>
                  <span className="text-xs text-brown-400">
                    {restaurant.cuisine}
                  </span>
                </div>
              </th>
            ))}
          </tr>
        </thead>

        {/* Body - Compare Fields */}
        <tbody>
          {compareFields.map((field) => {
            const Icon = field.icon;
            const bestId = getBestValue(field.key);
            return (
              <tr key={field.key} className="border-t border-cream-100">
                <td className="p-4">
                  <div className="flex items-center gap-2 text-brown-500">
                    <Icon className="w-4 h-4 text-brown-400" />
                    <span className="font-medium">{field.label}</span>
                  </div>
                </td>
                {restaurants.map((restaurant) => (
                  <td
                    key={restaurant.id}
                    className={`p-4 text-center ${
                      bestId === restaurant.id ? 'bg-primary-50/50' : ''
                    }`}
                  >
                    <div className="relative inline-flex items-center justify-center">
                      {getValue(restaurant, field.key)}
                      {bestId === restaurant.id && (
                        <span className="ml-2 text-primary-500">
                          <Check className="w-4 h-4" />
                        </span>
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            );
          })}

          {/* Available Times */}
          <tr className="border-t border-cream-100">
            <td className="p-4">
              <div className="flex items-center gap-2 text-brown-500">
                <Clock className="w-4 h-4 text-brown-400" />
                <span className="font-medium">可订时段</span>
              </div>
            </td>
            {restaurants.map((restaurant) => (
              <td key={restaurant.id} className="p-4">
                <div className="flex flex-wrap justify-center gap-1">
                  {restaurant.availableTimes.slice(0, 4).map((time) => (
                    <span
                      key={time}
                      className="px-2 py-1 text-xs bg-cream-100 rounded-lg text-brown-500"
                    >
                      {time}
                    </span>
                  ))}
                  {restaurant.availableTimes.length > 4 && (
                    <span className="px-2 py-1 text-xs text-brown-400">
                      +{restaurant.availableTimes.length - 4}
                    </span>
                  )}
                </div>
              </td>
            ))}
          </tr>

          {/* Tags */}
          <tr className="border-t border-cream-100">
            <td className="p-4">
              <div className="flex items-center gap-2 text-brown-500">
                <span className="font-medium">特色标签</span>
              </div>
            </td>
            {restaurants.map((restaurant) => (
              <td key={restaurant.id} className="p-4">
                <div className="flex flex-wrap justify-center gap-1">
                  {restaurant.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs bg-primary-50 text-primary-600 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </td>
            ))}
          </tr>

          {/* Actions */}
          <tr className="border-t border-cream-200">
            <td className="p-4"></td>
            {restaurants.map((restaurant) => (
              <td key={restaurant.id} className="p-4">
                <button
                  onClick={() => onViewDetails(restaurant.id)}
                  className="btn-primary w-full py-2 text-sm flex items-center justify-center gap-1"
                >
                  <span>去看看</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
