import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Calendar, Clock, Utensils, Plus, Minus, X, Share2, Trash2, MapPin, Star, ChevronRight } from 'lucide-react';
import ShareCard from '@/components/ShareCard';
import { useRestaurantStore } from '@/store/useRestaurantStore';
import { usePlanStore } from '@/store/usePlanStore';
import { formatDateTime, formatPrice, calculateServiceFee } from '@/utils/format';

export default function DiningPlan() {
  const navigate = useNavigate();
  const { restaurants, menuItems, getRestaurantById, getMenuItemById } = useRestaurantStore();
  const {
    currentPlan,
    initPlan,
    setRestaurant,
    setPeopleCount,
    setDateTime,
    removeDish,
    setNote,
    calculateTotal,
    resetPlan
  } = usePlanStore();

  const [showShareCard, setShowShareCard] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    initPlan();
  }, [initPlan]);

  useEffect(() => {
    if (currentPlan?.dateTime) {
      const [date, time] = currentPlan.dateTime.split('T');
      setSelectedDate(date);
      setSelectedTime(time);
    }
  }, [currentPlan?.dateTime]);

  const restaurant = currentPlan?.restaurantId
    ? getRestaurantById(currentPlan.restaurantId)
    : undefined;

  const selectedDishes = currentPlan?.selectedDishes
    .map(id => getMenuItemById(id))
    .filter(Boolean) || [];

  const dishesTotal = selectedDishes.reduce((sum, dish) => sum + (dish?.price || 0), 0);
  const serviceFee = calculateServiceFee(dishesTotal);
  const total = dishesTotal + serviceFee;

  // 生成接下来7天的日期选项
  const dateOptions = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  const timeOptions = [
    '11:00', '11:30', '12:00', '12:30', '13:00',
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00'
  ];

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const handleDateSelect = (dateStr: string) => {
    setSelectedDate(dateStr);
    if (selectedTime) {
      setDateTime(`${dateStr}T${selectedTime}`);
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    if (selectedDate) {
      setDateTime(`${selectedDate}T${time}`);
    }
  };

  const handleGenerateShareCard = () => {
    if (!currentPlan) return;
    calculateTotal(menuItems);
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowShareCard(true);
    }, 500);
  };

  if (!currentPlan) return null;

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-avocado-500 via-green-500 to-emerald-600 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-20 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-avocado-300/20 blur-3xl" />
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
                用餐计划
              </h1>
              <p className="text-white/80">
                规划完美用餐体验
              </p>
            </div>
            <button
              onClick={resetPlan}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/20 text-white hover:bg-white/30 transition-all duration-200"
            >
              <Trash2 className="w-5 h-5" />
              <span className="hidden sm:inline">重置计划</span>
            </button>
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
        {/* Restaurant Selection */}
        <div className="mb-6">
          <h2 className="font-display text-lg font-semibold text-brown-500 mb-3 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-avocado-500" />
            选择餐厅
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-48 overflow-y-auto p-1">
            {restaurants
              .filter(r => r.businessStatus !== 'closed')
              .map((r) => (
                <button
                  key={r.id}
                  onClick={() => setRestaurant(r.id)}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                    currentPlan.restaurantId === r.id
                      ? 'bg-avocado-50 border-2 border-avocado-500 shadow-md'
                      : 'bg-white border-2 border-transparent hover:bg-cream-50'
                  }`}
                >
                  <img
                    src={r.images[0]}
                    alt={r.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 text-left min-w-0">
                    <p className={`font-medium truncate ${
                      currentPlan.restaurantId === r.id ? 'text-avocado-700' : 'text-brown-500'
                    }`}>
                      {r.name}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-brown-400">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span>{r.rating}</span>
                      <span>·</span>
                      <span>¥{r.pricePerPerson}/人</span>
                    </div>
                  </div>
                  {currentPlan.restaurantId === r.id && (
                    <div className="w-6 h-6 rounded-full bg-avocado-500 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
          </div>
        </div>

        {/* People Count */}
        <div className="card p-6 mb-6">
          <h2 className="font-display text-lg font-semibold text-brown-500 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-primary-500" />
            用餐人数
          </h2>
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={() => setPeopleCount(Math.max(1, currentPlan.peopleCount - 1))}
              className="w-12 h-12 rounded-2xl bg-cream-100 flex items-center justify-center hover:bg-cream-200 transition-colors"
            >
              <Minus className="w-5 h-5 text-brown-500" />
            </button>
            <div className="text-center">
              <p className="text-5xl font-display font-bold text-brown-500">
                {currentPlan.peopleCount}
              </p>
              <p className="text-sm text-brown-400">人</p>
            </div>
            <button
              onClick={() => setPeopleCount(Math.min(20, currentPlan.peopleCount + 1))}
              className="w-12 h-12 rounded-2xl bg-primary-100 flex items-center justify-center hover:bg-primary-200 transition-colors"
            >
              <Plus className="w-5 h-5 text-primary-600" />
            </button>
          </div>
        </div>

        {/* Date & Time Selection */}
        {restaurant && (
          <div className="card p-6 mb-6">
            <h2 className="font-display text-lg font-semibold text-brown-500 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              到店时间
            </h2>

            {/* Date Selection */}
            <div className="mb-4">
              <p className="text-sm text-brown-400 mb-3">选择日期</p>
              <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
                {dateOptions.map((date) => {
                  const dateStr = date.toISOString().split('T')[0];
                  const isSelected = selectedDate === dateStr;
                  const isToday = date.toDateString() === new Date().toDateString();
                  return (
                    <button
                      key={dateStr}
                      onClick={() => handleDateSelect(dateStr)}
                      className={`flex flex-col items-center justify-center min-w-[70px] py-3 rounded-xl transition-all duration-200 ${
                        isSelected
                          ? 'bg-blue-500 text-white shadow-md'
                          : 'bg-cream-50 text-brown-500 hover:bg-cream-100'
                      }`}
                    >
                      <span className="text-xs font-medium">
                        {isToday ? '今天' : ['日', '一', '二', '三', '四', '五', '六'][date.getDay()]}
                      </span>
                      <span className="text-xl font-bold">{date.getDate()}</span>
                      <span className="text-xs">{date.getMonth() + 1}月</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Selection */}
            <div>
              <p className="text-sm text-brown-400 mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                选择时段
              </p>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {timeOptions.map((time) => {
                  const isAvailable = restaurant.availableTimes.includes(time);
                  const isSelected = selectedTime === time;
                  return (
                    <button
                      key={time}
                      onClick={() => isAvailable && handleTimeSelect(time)}
                      disabled={!isAvailable}
                      className={`py-2.5 rounded-xl font-medium transition-all duration-200 ${
                        isSelected
                          ? 'bg-blue-500 text-white shadow-md'
                          : isAvailable
                          ? 'bg-cream-50 text-brown-500 hover:bg-cream-100'
                          : 'bg-cream-50 text-brown-300 cursor-not-allowed opacity-50'
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Selected Dishes */}
        <div className="card p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-semibold text-brown-500 flex items-center gap-2">
              <Utensils className="w-5 h-5 text-orange-500" />
              必点菜品
            </h2>
            {restaurant && (
              <button
                onClick={() => navigate(`/restaurant/${restaurant.id}/menu`)}
                className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                <span>添加菜品</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {selectedDishes.length > 0 ? (
            <div className="space-y-3">
              {selectedDishes.map((dish) => (
                dish && (
                  <div
                    key={dish.id}
                    className="flex items-center gap-3 p-3 bg-cream-50 rounded-xl"
                  >
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-14 h-14 rounded-xl object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-brown-500 truncate">
                        {dish.name}
                      </p>
                      <p className="text-sm text-brown-400">
                        {dish.taste} · {dish.suitableFor}人份
                      </p>
                    </div>
                    <span className="font-bold text-primary-600">
                      ¥{dish.price}
                    </span>
                    <button
                      onClick={() => removeDish(dish.id)}
                      className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center hover:bg-red-100 transition-colors"
                    >
                      <X className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                )
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Utensils className="w-12 h-12 mx-auto text-brown-300 mb-3" />
              <p className="text-brown-400">还没有选择菜品</p>
              {restaurant && (
                <button
                  onClick={() => navigate(`/restaurant/${restaurant.id}/menu`)}
                  className="mt-4 btn-secondary py-2 text-sm"
                >
                  去选菜
                </button>
              )}
            </div>
          )}
        </div>

        {/* Note */}
        <div className="card p-6 mb-6">
          <h2 className="font-display text-lg font-semibold text-brown-500 mb-4">
            备注信息
          </h2>
          <textarea
            value={currentPlan.note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="例如：需要靠窗座位、生日安排、忌口等..."
            className="input-base min-h-[100px] resize-none"
          />
        </div>

        {/* Price Summary */}
        <div className="card p-6 mb-6 bg-gradient-to-br from-primary-50 to-cream-50">
          <h2 className="font-display text-lg font-semibold text-brown-500 mb-4">
            费用估算
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-brown-400">菜品合计</span>
              <span className="font-medium text-brown-500">{formatPrice(dishesTotal)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-brown-400">服务费 (10%)</span>
              <span className="font-medium text-brown-500">{formatPrice(serviceFee)}</span>
            </div>
            <div className="border-t border-cream-200 pt-3 mt-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-brown-500">预计总计</span>
                <span className="font-display text-3xl font-bold text-primary-600">
                  {formatPrice(total)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Plan Summary */}
        <div className="card p-6 mb-6 bg-gradient-to-br from-avocado-50 to-green-50">
          <h3 className="font-display text-lg font-semibold text-brown-500 mb-3">
            计划摘要
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-brown-400">餐厅</span>
              <span className="font-medium text-brown-500">
                {restaurant?.name || '未选择'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-brown-400">人数</span>
              <span className="font-medium text-brown-500">
                {currentPlan.peopleCount} 人
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-brown-400">时间</span>
              <span className="font-medium text-brown-500">
                {currentPlan.dateTime ? formatDateTime(currentPlan.dateTime) : '未选择'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-brown-400">菜品</span>
              <span className="font-medium text-brown-500">
                {selectedDishes.length} 道
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Generate Share Card Button */}
      <div className="fixed bottom-16 md:bottom-0 left-0 right-0 z-40 glass border-t border-cream-200 p-4">
        <div className="container mx-auto">
          <button
            onClick={handleGenerateShareCard}
            disabled={!currentPlan.restaurantId || !currentPlan.dateTime || isGenerating}
            className="w-full btn-primary flex items-center justify-center gap-2 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>生成中...</span>
              </>
            ) : (
              <>
                <Share2 className="w-5 h-5" />
                <span>生成分享卡片</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Share Card Modal */}
      {showShareCard && currentPlan && (
        <ShareCard
          plan={currentPlan}
          restaurant={restaurant}
          dishes={selectedDishes}
          onClose={() => setShowShareCard(false)}
        />
      )}
    </div>
  );
}
