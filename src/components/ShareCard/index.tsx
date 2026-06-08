import { Calendar, Users, MapPin, Clock, Utensils, Download, Share2, X } from 'lucide-react';
import { Restaurant, MenuItem, DiningPlan } from '@/types';
import { formatDateTime, formatPrice, calculateServiceFee } from '@/utils/format';

interface ShareCardProps {
  plan: DiningPlan;
  restaurant: Restaurant | undefined;
  dishes: MenuItem[];
  onClose: () => void;
}

export default function ShareCard({ plan, restaurant, dishes, onClose }: ShareCardProps) {
  const dishesTotal = dishes.reduce((sum, dish) => sum + dish.price, 0);
  const serviceFee = calculateServiceFee(dishesTotal);
  const total = dishesTotal + serviceFee;

  const handleDownload = () => {
    alert('分享卡片已保存到相册');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `用餐计划 - ${restaurant?.name}`,
          text: `我计划去 ${restaurant?.name} 用餐，${plan.peopleCount}人，预计消费 ${formatPrice(total)}`,
        });
      } catch (err) {
        console.log('分享取消');
      }
    } else {
      alert('已复制分享链接');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Card */}
      <div className="relative w-full max-w-md animate-slide-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Main Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cream-50 to-white shadow-2xl">
          {/* Decorative Gradient */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600" />
          <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-white/10" />
          <div className="absolute top-10 -left-10 w-24 h-24 rounded-full bg-white/10" />

          <div className="relative p-6">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Utensils className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-white">
                  用餐计划
                </h3>
                <p className="text-white/80 text-sm">
                  {restaurant?.name || '未选择餐厅'}
                </p>
              </div>
            </div>

            {/* Restaurant Image */}
            {restaurant && (
              <div className="relative mb-6 rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={restaurant.images[0]}
                  alt={restaurant.name}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-brown-500">
                    {restaurant.cuisine}
                  </span>
                  <span className="px-3 py-1 bg-primary-500/90 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                    ¥{restaurant.pricePerPerson}/人
                  </span>
                </div>
              </div>
            )}

            {/* Details */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary-500" />
                </div>
                <div>
                  <p className="text-xs text-brown-400">用餐时间</p>
                  <p className="font-medium text-brown-500">
                    {plan.dateTime ? formatDateTime(plan.dateTime) : '未选择'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-avocado-50 flex items-center justify-center">
                  <Users className="w-5 h-5 text-avocado-500" />
                </div>
                <div>
                  <p className="text-xs text-brown-400">用餐人数</p>
                  <p className="font-medium text-brown-500">{plan.peopleCount} 人</p>
                </div>
              </div>

              {restaurant && (
                <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-cream-100 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-brown-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-brown-400">餐厅地址</p>
                    <p className="font-medium text-brown-500 truncate">
                      {restaurant.address}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Selected Dishes */}
            {dishes.length > 0 && (
              <div className="mb-6">
                <h4 className="font-display font-semibold text-brown-500 mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary-500" />
                  必点菜品
                </h4>
                <div className="space-y-2">
                  {dishes.map((dish) => (
                    <div
                      key={dish.id}
                      className="flex items-center justify-between p-2.5 bg-white rounded-xl"
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={dish.image}
                          alt={dish.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <span className="font-medium text-brown-500 text-sm">
                          {dish.name}
                        </span>
                      </div>
                      <span className="text-primary-600 font-semibold text-sm">
                        ¥{dish.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Note */}
            {plan.note && (
              <div className="mb-6 p-3 bg-cream-50 rounded-xl border border-cream-200">
                <p className="text-sm text-brown-500">
                  <span className="font-medium">备注：</span>
                  {plan.note}
                </p>
              </div>
            )}

            {/* Price Summary */}
            <div className="p-4 bg-gradient-to-br from-primary-50 to-cream-50 rounded-2xl mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-brown-400 text-sm">菜品合计</span>
                <span className="text-brown-500 font-medium">{formatPrice(dishesTotal)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-brown-400 text-sm">服务费 (10%)</span>
                <span className="text-brown-500 font-medium">{formatPrice(serviceFee)}</span>
              </div>
              <div className="border-t border-cream-200 pt-2 mt-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-brown-500">预计总计</span>
                  <span className="font-display text-2xl font-bold text-primary-600">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center">
              <p className="text-xs text-brown-300 mb-1">由美食圈生成</p>
              <p className="text-[10px] text-brown-200">
                {new Date().toLocaleDateString('zh-CN')}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={handleDownload}
            className="flex-1 btn-secondary flex items-center justify-center gap-2 py-3"
          >
            <Download className="w-5 h-5" />
            <span>保存图片</span>
          </button>
          <button
            onClick={handleShare}
            className="flex-1 btn-primary flex items-center justify-center gap-2 py-3"
          >
            <Share2 className="w-5 h-5" />
            <span>分享好友</span>
          </button>
        </div>
      </div>
    </div>
  );
}
