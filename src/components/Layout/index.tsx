import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Heart, Utensils, Calendar, MapPin, Search } from 'lucide-react';
import { useFilterStore } from '@/store/useFilterStore';

interface LayoutProps {
  children: ReactNode;
}

const navItems = [
  { path: '/', label: '首页', icon: Home },
  { path: '/favorites', label: '收藏', icon: Heart },
  { path: '/plan', label: '计划', icon: Calendar },
];

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const { filters, setSearchKeyword } = useFilterStore();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream-50">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-cream-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center shadow-glow">
                <Utensils className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="font-display text-xl font-bold text-brown-500 leading-none">
                  美食圈
                </h1>
                <p className="text-xs text-brown-300">发现身边美味</p>
              </div>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brown-300" />
                <input
                  type="text"
                  placeholder="搜索餐厅、菜品..."
                  className="input-base pl-12 pr-4 py-2.5"
                  value={filters.searchKeyword}
                  onChange={handleSearch}
                />
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                      active
                        ? 'bg-primary-50 text-primary-600 shadow-sm'
                        : 'text-brown-400 hover:text-brown-500 hover:bg-brown-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-cream-200">
        <div className="flex items-center justify-around h-16 px-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center flex-1 h-full transition-all duration-200 ${
                  active ? 'text-primary-600' : 'text-brown-300'
                }`}
              >
                <Icon className={`w-6 h-6 transition-transform duration-200 ${active ? 'scale-110' : ''}`} />
                <span className="text-xs mt-1 font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile Search - 当在首页时显示 */}
      {location.pathname === '/' && (
        <div className="md:hidden fixed top-16 left-0 right-0 z-40 glass border-b border-cream-200 p-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brown-300" />
            <input
              type="text"
              placeholder="搜索餐厅、菜品..."
              className="input-base pl-12 pr-4 py-2.5"
              value={filters.searchKeyword}
              onChange={handleSearch}
            />
          </div>
        </div>
      )}

      {/* Footer - Desktop */}
      <footer className="hidden md:block bg-brown-500 text-cream-100 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center">
                <Utensils className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-white">美食圈</h3>
                <p className="text-xs text-cream-300">发现身边美味 · 享受每一餐</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-cream-300">
              <MapPin className="w-4 h-4" />
              <span>为您推荐商圈周边美食</span>
            </div>
            <p className="text-xs text-cream-400">
              © 2024 美食圈 FoodieCircle. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Bottom padding for mobile nav */}
      <div className="md:hidden h-16" />
    </div>
  );
}
