import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Utensils, Plus, ShoppingCart } from 'lucide-react';
import MenuItemCard from '@/components/MenuItemCard';
import SortBar from '@/components/SortBar';
import { useRestaurantStore } from '@/store/useRestaurantStore';
import { useFilterStore } from '@/store/useFilterStore';
import { useFilterMenuItems } from '@/hooks/useFilter';
import { menuCategories } from '@/data/menuItems';
import { usePlanStore } from '@/store/usePlanStore';

export default function Menu() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getRestaurantById, getMenuByRestaurantId, getMenuItemById } = useRestaurantStore();
  const { sortBy, sortOrder } = useFilterStore();
  const { currentPlan, addDish, removeDish } = usePlanStore();
  const [activeCategory, setActiveCategory] = useState('全部');

  const restaurant = id ? getRestaurantById(id) : undefined;
  const allMenuItems = id ? getMenuByRestaurantId(id) : [];
  const filteredItems = useFilterMenuItems(allMenuItems, activeCategory, sortBy, sortOrder);

  const selectedDishes = currentPlan?.selectedDishes || [];
  const isDishSelected = (dishId: string) => selectedDishes.includes(dishId);

  useEffect(() => {
    if (!restaurant) {
      navigate('/');
    }
  }, [restaurant, navigate]);

  const handleDishSelect = (dishId: string) => {
    if (isDishSelected(dishId)) {
      removeDish(dishId);
    } else {
      addDish(dishId);
    }
  };

  const selectedDishesData = selectedDishes
    .map(id => getMenuItemById(id))
    .filter(Boolean);

  const dishesTotal = selectedDishesData.reduce((sum, dish) => sum + (dish?.price || 0), 0);

  if (!restaurant) return null;

  return (
    <div className="min-h-screen pb-24">
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
            <div className="text-center">
              <h1 className="font-display text-lg font-semibold text-brown-500">
                {restaurant.name}
              </h1>
              <p className="text-xs text-brown-400">菜品菜单</p>
            </div>
            <Link
              to="/plan"
              className="relative w-10 h-10 rounded-xl flex items-center justify-center hover:bg-cream-100 transition-colors"
            >
              <ShoppingCart className="w-5 h-5 text-brown-500" />
              {selectedDishes.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                  {selectedDishes.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Restaurant Info Banner */}
        <div className="card p-4 mb-6 flex items-center gap-4 bg-gradient-to-r from-primary-50 to-cream-50">
          <img
            src={restaurant.images[0]}
            alt={restaurant.name}
            className="w-16 h-16 rounded-xl object-cover"
          />
          <div className="flex-1">
            <h2 className="font-display text-xl font-bold text-brown-500">
              {restaurant.name}
            </h2>
            <p className="text-sm text-brown-400">
              {restaurant.cuisine} · ¥{restaurant.pricePerPerson}/人
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-brown-400 mb-1">已选菜品</p>
            <p className="text-xl font-bold text-primary-600">
              ¥{dishesTotal}
            </p>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="mb-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
            {menuCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all duration-200 ${
                  activeCategory === category
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'bg-white text-brown-500 hover:bg-cream-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Sort Bar */}
        <SortBar />

        {/* Menu Items */}
        <div className="space-y-4">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <div
                key={item.id}
                style={{ animationDelay: `${index * 0.05}s` }}
                className="animate-slide-up"
              >
                <MenuItemCard
                  item={item}
                  showSelect={true}
                  selected={isDishSelected(item.id)}
                  onSelect={handleDishSelect}
                />
              </div>
            ))
          ) : (
            <div className="card p-8 text-center">
              <Utensils className="w-16 h-16 mx-auto text-brown-300 mb-4" />
              <h3 className="font-display text-xl font-semibold text-brown-500 mb-2">
                暂无菜品
              </h3>
              <p className="text-brown-400">
                该分类下暂无菜品，试试其他分类吧
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Bar - Add to Plan */}
      {selectedDishes.length > 0 && (
        <div className="fixed bottom-16 md:bottom-0 left-0 right-0 z-40 glass border-t border-cream-200 p-4">
          <div className="container mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <ShoppingCart className="w-6 h-6 text-primary-500" />
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary-500 text-white text-xs rounded-full flex items-center justify-center">
                  {selectedDishes.length}
                </span>
              </div>
              <div>
                <p className="text-xs text-brown-400">已选菜品</p>
                <p className="text-xl font-bold text-primary-600">
                  ¥{dishesTotal}
                </p>
              </div>
            </div>
            <Link
              to="/plan"
              className="btn-primary flex items-center gap-2 py-3"
            >
              <Plus className="w-5 h-5" />
              <span>加入用餐计划</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
