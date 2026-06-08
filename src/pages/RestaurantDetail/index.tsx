import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Star, MapPin, Clock, Users, Tag, ChevronRight, Utensils, Percent, Phone, Navigation, Calendar } from 'lucide-react';
import ImageCarousel from '@/components/ImageCarousel';
import { useRestaurantStore } from '@/store/useRestaurantStore';
import { usePlanStore } from '@/store/usePlanStore';
import { formatDistance, formatRating, formatWaitTime, getBusinessStatusText, getBusinessStatusColor } from '@/utils/format';

const tabs = [
  { id: 'info', label: '餐厅信息' },
  { id: 'dishes', label: '招牌菜' },
  { id: 'queue', label: '排队信息' },
  { id: 'promotions', label: '优惠活动' },
];

export default function RestaurantDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getRestaurantById, getMenuByRestaurantId, favorites, toggleFavorite } = useRestaurantStore();
  const { initPlan, setRestaurant } = usePlanStore();
  const [activeTab, setActiveTab] = useState('info');

  const restaurant = id ? getRestaurantById(id) : undefined;
  const menuItems = id ? getMenuByRestaurantId(id) : [];
  const signatureDishes = menuItems.filter(item => item.category === '招牌菜');
  const isFavorite = restaurant ? favorites.includes(restaurant.id) : false;

  useEffect(() => {
    if (!restaurant) {
      navigate('/');
    }
  }, [restaurant, navigate]);

  const handleAddToPlan = () => {
    if (restaurant) {
      initPlan();
      setTimeout(() => {
        setRestaurant(restaurant.id);
        navigate('/plan');
      }, 0);
    }
  };

  if (!restaurant) return null;

  return (
    <div className="min-h-screen pb-8">
      {/* Header */}
      <div className="sticky top-16 z-40 glass border-b border-cream-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-brown-500 hover:text-primary-500 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">返回</span>
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleFavorite(restaurant.id)}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
                  isFavorite
                    ? 'bg-primary-50 text-primary-500'
                    : 'hover:bg-cream-100 text-brown-400'
                }`}
              >
                <Heart
                  className={`w-5 h-5 transition-all ${
                    isFavorite ? 'fill-primary-500' : ''
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Image Carousel */}
        <div className="mb-6">
          <ImageCarousel
            images={restaurant.images}
            alt={restaurant.name}
            autoPlay={true}
            interval={5000}
          />
        </div>

        {/* Restaurant Info */}
        <div className="mb-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h1 className="font-display text-3xl font-bold text-brown-500 mb-2">
                {restaurant.name}
              </h1>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="tag tag-active">
                  {restaurant.cuisine}
                </span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{formatRating(restaurant.rating)}</span>
                </div>
                <span className="text-primary-600 font-semibold">
                  ¥{restaurant.pricePerPerson}/人
                </span>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium text-white ${getBusinessStatusColor(restaurant.businessStatus)}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse-soft" />
                  {getBusinessStatusText(restaurant.businessStatus)}
                </span>
              </div>
            </div>
          </div>

          {/* Address & Distance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-card">
              <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-brown-400">地址</p>
                <p className="font-medium text-brown-500 truncate">
                  {restaurant.address}
                </p>
              </div>
              <span className="text-sm text-primary-600 font-medium">
                {formatDistance(restaurant.distance)}
              </span>
            </div>

            <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-card">
              <div className="w-10 h-10 rounded-xl bg-avocado-50 flex items-center justify-center">
                <Clock className="w-5 h-5 text-avocado-500" />
              </div>
              <div>
                <p className="text-xs text-brown-400">预计等待</p>
                <p className="font-medium text-brown-500">
                  {formatWaitTime(restaurant.queueInfo.avgWaitTime)}
                </p>
              </div>
              {restaurant.queueInfo.waitingTables > 0 && (
                <div className="ml-auto flex items-center gap-1 px-3 py-1 bg-orange-50 rounded-full">
                  <Users className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-medium text-orange-600">
                    排队 {restaurant.queueInfo.waitingTables} 桌
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <Link
            to={`/restaurant/${restaurant.id}/menu`}
            className="btn-primary flex-1 flex items-center justify-center gap-2"
          >
            <Utensils className="w-5 h-5" />
            <span>浏览菜单</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
          <button
            onClick={handleAddToPlan}
            className="btn-secondary flex-1 flex items-center justify-center gap-2"
          >
            <Calendar className="w-5 h-5" />
            <span>加入用餐计划</span>
          </button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          <button className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <Phone className="w-5 h-5 text-blue-500" />
            </div>
            <span className="text-xs text-brown-500">打电话</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all">
            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
              <Navigation className="w-5 h-5 text-green-500" />
            </div>
            <span className="text-xs text-brown-500">导航</span>
          </button>
          <button
            onClick={() => toggleFavorite(restaurant.id)}
            className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isFavorite ? 'bg-primary-50' : 'bg-rose-50'
            }`}>
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-primary-500 text-primary-500' : 'text-rose-500'}`} />
            </div>
            <span className="text-xs text-brown-500">
              {isFavorite ? '已收藏' : '收藏'}
            </span>
          </button>
          <Link
            to={`/restaurant/${restaurant.id}/menu`}
            className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
              <Utensils className="w-5 h-5 text-amber-500" />
            </div>
            <span className="text-xs text-brown-500">菜单</span>
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-xl font-medium whitespace-nowrap transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-white text-brown-500 hover:bg-cream-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in">
          {activeTab === 'info' && (
            <div className="card p-6">
              <h3 className="font-display text-xl font-semibold text-brown-500 mb-4">
                餐厅信息
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-brown-500 mb-2 flex items-center gap-2">
                    <Tag className="w-4 h-4 text-primary-500" />
                    餐厅标签
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {restaurant.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-brown-500 mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary-500" />
                    可订时段
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {restaurant.availableTimes.map((time) => (
                      <span
                        key={time}
                        className="px-3 py-1.5 bg-cream-50 rounded-lg text-sm text-brown-500"
                      >
                        {time}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'dishes' && (
            <div>
              <h3 className="font-display text-xl font-semibold text-brown-500 mb-4">
                招牌菜品
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {signatureDishes.map((dish) => (
                  <div
                    key={dish.id}
                    className="card p-4 flex gap-4"
                  >
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-24 h-24 rounded-xl object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-brown-500 mb-1">
                        {dish.name}
                      </h4>
                      <p className="text-sm text-brown-400 line-clamp-2 mb-2">
                        {dish.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-primary-600 font-bold">
                          ¥{dish.price}
                        </span>
                        <div className="flex gap-1">
                          {dish.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 bg-primary-50 text-primary-600 text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {signatureDishes.length === 0 && (
                <div className="card p-8 text-center">
                  <Utensils className="w-12 h-12 mx-auto text-brown-300 mb-3" />
                  <p className="text-brown-400">暂无招牌菜信息</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'queue' && (
            <div className="card p-6">
              <h3 className="font-display text-xl font-semibold text-brown-500 mb-4">
                排队信息
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-orange-50 rounded-2xl">
                  <Users className="w-8 h-8 mx-auto text-orange-500 mb-2" />
                  <p className="text-3xl font-bold text-orange-600">
                    {restaurant.queueInfo.waitingTables}
                  </p>
                  <p className="text-sm text-brown-400">等待桌数</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-2xl">
                  <Clock className="w-8 h-8 mx-auto text-blue-500 mb-2" />
                  <p className="text-3xl font-bold text-blue-600">
                    {restaurant.queueInfo.avgWaitTime}
                  </p>
                  <p className="text-sm text-brown-400">预计等待(分钟)</p>
                </div>
              </div>
              <div className="p-4 bg-cream-50 rounded-xl">
                <p className="text-sm text-brown-500">
                  <span className="font-medium">温馨提示：</span>
                  建议避开用餐高峰期前往，或提前预订座位。您也可以通过用餐计划功能提前规划用餐时间。
                </p>
              </div>
            </div>
          )}

          {activeTab === 'promotions' && (
            <div>
              <h3 className="font-display text-xl font-semibold text-brown-500 mb-4">
                优惠活动
              </h3>
              <div className="space-y-4">
                {restaurant.promotions.map((promo, index) => (
                  <div
                    key={index}
                    className="card p-4 flex gap-4 bg-gradient-to-r from-primary-50 to-cream-50"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center shrink-0">
                      <Percent className="w-6 h-6 text-primary-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-brown-500 mb-1">
                        {promo.type}
                      </h4>
                      <p className="text-sm text-brown-400">
                        {promo.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {restaurant.promotions.length === 0 && (
                <div className="card p-8 text-center">
                  <Percent className="w-12 h-12 mx-auto text-brown-300 mb-3" />
                  <p className="text-brown-400">暂无优惠活动</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
