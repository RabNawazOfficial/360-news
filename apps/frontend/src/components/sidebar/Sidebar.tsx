import React from 'react';
import { 
  Home, 
  TrendingUp, 
  Bookmark, 
  Globe, 
  Cpu, 
  Briefcase, 
  FlaskConical, 
  HeartPulse, 
  Trophy,
  ChevronLeft,
  ChevronRight,
  Compass,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activeCategory: string | null;
  setActiveCategory: (category: string | null) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  activeCategory,
  setActiveCategory,
  isCollapsed,
  setIsCollapsed,
}) => {
  const { t } = useLanguage();
  const mainNavItems = [
    { id: 'feed', label: 'Feed', icon: Home },
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark },
  ];

  const categories = [
    { name: 'General', icon: Globe },
    { name: 'Technology', icon: Cpu },
    { name: 'Business', icon: Briefcase },
    { name: 'Sports', icon: Trophy },
    { name: 'Science', icon: FlaskConical },
    { name: 'Health', icon: HeartPulse },
    { name: 'Entertainment', icon: Sparkles },
  ];

  const handleCategorySelect = (categoryName: string) => {
    setActiveTab('feed');
    if (activeCategory === categoryName) {
      setActiveCategory(null); // toggle off
    } else {
      setActiveCategory(categoryName);
    }
  };

  return (
    <>
      {/* Desktop/Tablet Sidebar */}
      <aside 
        className={`hidden md:flex flex-col h-full bg-[#0F1117] border-r border-white/5 transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-64'
        } shrink-0 sticky top-[60px]`}
        style={{ height: 'calc(100vh - 60px)' }}
      >
        <div className="flex flex-col justify-between h-full p-4 overflow-y-auto no-scrollbar">
          <div className="space-y-6">
            {/* Collapse toggle */}
            <div className="flex items-center justify-end px-2">
              <button 
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-textSecondary hover:text-white transition-colors"
                aria-label={isCollapsed ? t("Expand sidebar") : t("Collapse sidebar")}
              >
                {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
              </button>
            </div>

            {/* Main Navigation */}
            <div className="space-y-1">
              {mainNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id && activeCategory === null;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setActiveCategory(null);
                    }}
                    className={`flex items-center w-full px-3 py-3 rounded-xl transition-all duration-200 ${
                      isActive 
                        ? 'bg-primary/10 text-primary font-medium' 
                        : 'text-textSecondary hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <Icon size={22} className={isActive ? 'text-primary' : 'text-textSecondary'} />
                    {!isCollapsed && <span className="ml-4 text-sm">{t(item.label)}</span>}
                  </button>
                );
              })}
            </div>

            {/* Divider */}
            <div className="h-[1px] bg-white/5 my-4" />

            {/* Categories */}
            <div className="space-y-1">
              {!isCollapsed && (
                <p className="px-3 text-xs font-semibold text-textSecondary uppercase tracking-wider mb-2">
                  {t("Categories")}
                </p>
              )}
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.name;
                return (
                  <button
                    key={cat.name}
                    onClick={() => handleCategorySelect(cat.name)}
                    className={`flex items-center w-full px-3 py-3 rounded-xl transition-all duration-200 ${
                      isActive 
                        ? 'bg-secondary/15 text-secondary font-medium' 
                        : 'text-textSecondary hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <Icon size={20} className={isActive ? 'text-secondary' : 'text-textSecondary'} />
                    {!isCollapsed && <span className="ml-4 text-sm">{t(cat.name)}</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer branding */}
          {!isCollapsed && (
            <div className="mt-8 px-3 py-4 rounded-2xl bg-white/5 border border-white/5 text-center">
              <p className="text-[10px] text-textSecondary uppercase tracking-widest font-semibold">
                360 News v1.0
              </p>
              <p className="text-[10px] text-textSecondary/60 mt-1">
                {t("Factual • Balanced • Swift")}
              </p>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar (Instagram-style) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#171923]/95 border-t border-white/5 glass-effect z-40 flex items-center justify-around px-4">
        <button
          onClick={() => {
            setActiveTab('feed');
            setActiveCategory(null);
          }}
          className={`flex flex-col items-center justify-center space-y-1 ${
            activeTab === 'feed' && activeCategory === null ? 'text-primary' : 'text-textSecondary'
          }`}
        >
          <Home size={22} />
          <span className="text-[10px]">{t("Home")}</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('trending');
            setActiveCategory(null);
          }}
          className={`flex flex-col items-center justify-center space-y-1 ${
            activeTab === 'trending' ? 'text-primary' : 'text-textSecondary'
          }`}
        >
          <Compass size={22} />
          <span className="text-[10px]">{t("Trending")}</span>
        </button>

        {/* Categories trigger or generic feed toggle */}
        <div className="relative">
          <select
            value={activeCategory || ''}
            onChange={(e) => {
              const val = e.target.value;
              setActiveCategory(val === '' ? null : val);
              setActiveTab('feed');
            }}
            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
          >
            <option value="">{t("All Categories")}</option>
            {categories.map((c) => (
              <option key={c.name} value={c.name}>
                {t(c.name)}
              </option>
            ))}
          </select>
          <button
            className={`flex flex-col items-center justify-center space-y-1 ${
              activeCategory !== null ? 'text-secondary' : 'text-textSecondary'
            }`}
          >
            <Globe size={22} />
            <span className="text-[10px] truncate max-w-[60px]">
              {activeCategory ? t(activeCategory) : t("Category")}
            </span>
          </button>
        </div>

        <button
          onClick={() => {
            setActiveTab('bookmarks');
            setActiveCategory(null);
          }}
          className={`flex flex-col items-center justify-center space-y-1 ${
            activeTab === 'bookmarks' ? 'text-primary' : 'text-textSecondary'
          }`}
        >
          <Bookmark size={22} />
          <span className="text-[10px]">{t("Bookmarks")}</span>
        </button>
      </nav>
    </>
  );
};
export default Sidebar;
