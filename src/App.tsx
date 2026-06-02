import { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Moon, 
  Sun, 
  Scale, 
  Bell, 
  Sparkles,
  ArrowUp,
  ArrowDown,
  Globe
} from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { RightPanel } from './components/RightPanel';
import { ReelCard } from './components/ReelCard';
import { SearchModal } from './components/SearchModal';
import { newsData } from './data/news';
import { useLanguage, languages } from './context/LanguageContext';

function App() {
  const [activeTab, setActiveTab] = useState<string>('feed');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(['1', '3', '6']); // pre-populated bookmarks
  const [fontScale, setFontScale] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  
  // Modals & UI States
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  const { language, setLanguage, t } = useLanguage();

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sync theme changes with the DOM element
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
  }, [theme]);

  // Handle active card detection based on scroll position
  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, clientHeight } = containerRef.current;
      // Safeguard to divide by clientHeight only if it's > 0
      if (clientHeight > 0) {
        const index = Math.round(scrollTop / clientHeight);
        if (index !== activeCardIndex) {
          setActiveCardIndex(index);
        }
      }
    }
  };

  const handleToggleBookmark = (id: string) => {
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(bId => bId !== id) : [...prev, id]
    );
  };

  // Filter logic based on active tab, search, and category
  const filteredStories = newsData.filter(story => {
    // 1. Search filter
    const matchesSearch = searchTerm.trim() === '' || 
      story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.facts.some(fact => fact.toLowerCase().includes(searchTerm.toLowerCase())) ||
      story.progressiveView.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.conservativeView.toLowerCase().includes(searchTerm.toLowerCase());

    // 2. Category filter
    const matchesCategory = activeCategory === null || story.category === activeCategory;

    // 3. Tab filter
    if (activeTab === 'bookmarks') {
      return matchesSearch && matchesCategory && bookmarkedIds.includes(story.id);
    }
    
    // For trending tab, filter to stories that are breaking or have high overall trust/scores
    if (activeTab === 'trending') {
      return matchesSearch && matchesCategory && (story.isBreaking || story.overallTrustScore >= 94);
    }

    return matchesSearch && matchesCategory;
  });

  // Handle cross-navigation scrolling
  const handleSelectStory = (storyId: string) => {
    // Search in currently filtered items
    let index = filteredStories.findIndex(s => s.id === storyId);

    if (index === -1) {
      // Reset filters so the story can be shown in the feed
      setSearchTerm('');
      setActiveCategory(null);
      setActiveTab('feed');

      // Allow DOM state to update before calculating scrolling offsets
      setTimeout(() => {
        const fullIndex = newsData.findIndex(s => s.id === storyId);
        if (fullIndex !== -1 && containerRef.current) {
          const cardElement = containerRef.current.children[fullIndex] as HTMLElement;
          if (cardElement) {
            containerRef.current.scrollTo({
              top: cardElement.offsetTop,
              behavior: 'smooth'
            });
            setActiveCardIndex(fullIndex);
          }
        }
      }, 120);
    } else {
      if (containerRef.current) {
        const cardElement = containerRef.current.children[index] as HTMLElement;
        if (cardElement) {
          containerRef.current.scrollTo({
            top: cardElement.offsetTop,
            behavior: 'smooth'
          });
          setActiveCardIndex(index);
        }
      }
    }
  };

  // Keyboard navigation support for feed scroll (Up/Down arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isSearchOpen) return; // ignore when searching
      
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const direction = e.key === 'ArrowDown' ? 1 : -1;
        const nextIndex = activeCardIndex + direction;
        
        if (nextIndex >= 0 && nextIndex < filteredStories.length && containerRef.current) {
          const cardElement = containerRef.current.children[nextIndex] as HTMLElement;
          if (cardElement) {
            containerRef.current.scrollTo({
              top: cardElement.offsetTop,
              behavior: 'smooth'
            });
            setActiveCardIndex(nextIndex);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeCardIndex, filteredStories.length, isSearchOpen]);

  // Feed scroll helper buttons
  const scrollFeed = (direction: 'up' | 'down') => {
    const nextIndex = activeCardIndex + (direction === 'down' ? 1 : -1);
    if (nextIndex >= 0 && nextIndex < filteredStories.length && containerRef.current) {
      const cardElement = containerRef.current.children[nextIndex] as HTMLElement;
      if (cardElement) {
        containerRef.current.scrollTo({
          top: cardElement.offsetTop,
          behavior: 'smooth'
        });
        setActiveCardIndex(nextIndex);
      }
    }
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
      theme === 'dark' ? 'bg-[#0F1117] text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* Sticky Top Header Navigation */}
      <header className="sticky top-0 z-40 h-[60px] flex items-center justify-between px-4 md:px-6 border-b border-white/5 bg-[#171923]/95 glass-effect">
        
        {/* Logo and Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-lg">
            <Scale size={16} className="text-white" />
          </div>
          <h1 className="text-base md:text-lg font-black tracking-tight bg-gradient-to-r from-white via-white to-textSecondary bg-clip-text text-transparent uppercase select-none">
            360 News
          </h1>
        </div>

        {/* Global Search Bar (opens search modal) */}
        <button 
          onClick={() => setIsSearchOpen(true)}
          className="flex items-center space-x-3 bg-[#0F1117] hover:bg-white/5 border border-white/5 px-4 py-2 rounded-2xl w-40 md:w-80 text-left text-xs md:text-sm text-textSecondary transition-all duration-200"
        >
          <Search size={16} />
          <span className="truncate flex-1">{t("Search news and viewpoints...")}</span>
          <kbd className="hidden md:inline-block bg-white/10 px-1.5 py-0.5 rounded text-[10px]">Ctrl K</kbd>
        </button>

        {/* Actions (Bell, Theme Toggle, Profile Avatar) */}
        <div className="flex items-center space-x-3">
          {/* Active indicator for active categories */}
          {activeCategory && (
            <span className="hidden sm:inline-flex text-[10px] bg-secondary/15 border border-secondary/30 text-secondary px-2.5 py-1 rounded-full font-bold uppercase">
              {t("Category")}: {t(activeCategory)}
            </span>
          )}

          {/* Language Selector Dropdown */}
          <div className="relative" ref={langDropdownRef}>
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center space-x-2 p-2 rounded-xl bg-[#0F1117] border border-white/5 text-textSecondary hover:text-white transition-colors"
              title={t("Change Language")}
              aria-label={t("Change Language")}
            >
              <Globe size={16} />
              <span className="text-xs font-semibold uppercase hidden md:inline">
                {(languages.find(l => l.code === language) || languages[0]).flag} {(languages.find(l => l.code === language) || languages[0]).code}
              </span>
            </button>
            
            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-[#171923]/95 border border-white/10 shadow-glass backdrop-blur-md py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-3 py-1.5 text-[10px] font-bold text-textSecondary uppercase tracking-wider border-b border-white/5 mb-1 select-none">
                  Select Language
                </div>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsLangOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-colors text-left ${
                      language === lang.code
                        ? 'bg-primary/10 text-primary font-bold'
                        : 'text-textSecondary hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span className="flex items-center space-x-2">
                      <span>{lang.flag}</span>
                      <span>{lang.nativeName}</span>
                    </span>
                    {language === lang.code && (
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-xl bg-[#0F1117] border border-white/5 text-textSecondary hover:text-white transition-colors"
            title={t("Toggle theme mode")}
            aria-label={t("Toggle theme mode")}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Notification bell (Mock UI trigger) */}
          <button 
            onClick={() => alert(t("Notification center is deferred in version 1 MVP."))}
            className="p-2 rounded-xl bg-[#0F1117] border border-white/5 text-textSecondary hover:text-white transition-colors relative"
            aria-label={t("Notification center")}
          >
            <Bell size={16} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-secondary rounded-full" />
          </button>

          {/* User profile avatar (Mock UI trigger) */}
          <div 
            onClick={() => alert(t("User profiles are deferred in version 1 MVP."))}
            className="w-8 h-8 rounded-full border border-white/15 bg-gradient-to-tr from-secondary/40 to-primary/40 flex items-center justify-center font-bold text-xs cursor-pointer hover:border-white transition-colors"
          >
            US
          </div>
        </div>
      </header>

      {/* Main Grid Wrapper */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto relative">
        
        {/* Left Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
        />

        {/* Central Feed Container */}
        <main className="flex-1 flex flex-col items-center relative h-[calc(100svh-60px)] md:h-[calc(100vh-60px)] overflow-hidden">
          
          {/* Navigation Path Breadcrumb (Tablet/Desktop Only) */}
          <div className="w-full max-w-xl hidden md:flex items-center justify-between px-6 pt-4 pb-2 z-10">
            <div className="text-xs text-textSecondary">
              {t("Showing")}: <span className="font-semibold text-white uppercase">{t(activeTab)}</span>
              {activeCategory && (
                <>
                  <span className="mx-1">/</span>
                  <span className="font-semibold text-secondary uppercase">{t(activeCategory)}</span>
                </>
              )}
              {searchTerm && (
                <>
                  <span className="mx-1">/</span>
                  <span className="italic text-primary">"{searchTerm}"</span>
                </>
              )}
            </div>
            
            {/* Scroll navigation helpers */}
            {filteredStories.length > 1 && (
              <div className="flex gap-2">
                <button 
                  onClick={() => scrollFeed('up')} 
                  disabled={activeCardIndex === 0}
                  className="p-1 rounded bg-white/5 border border-white/5 text-textSecondary hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ArrowUp size={14} />
                </button>
                <span className="text-[10px] text-textSecondary flex items-center">
                  {activeCardIndex + 1} / {filteredStories.length}
                </span>
                <button 
                  onClick={() => scrollFeed('down')} 
                  disabled={activeCardIndex === filteredStories.length - 1}
                  className="p-1 rounded bg-white/5 border border-white/5 text-textSecondary hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ArrowDown size={14} />
                </button>
              </div>
            )}
          </div>

          {/* Central Scroll Snapping Feed Viewport */}
          <div 
            ref={containerRef}
            onScroll={handleScroll}
            className="flex-1 w-full snap-container no-scrollbar pb-16 md:pb-0"
          >
            {filteredStories.length === 0 ? (
              /* Beautiful empty state */
              <div className="flex flex-col items-center justify-center h-full px-6 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-textSecondary">
                  <Sparkles size={32} />
                </div>
                <h3 className="text-lg font-bold text-white">{t("No stories match your criteria")}</h3>
                <p className="text-xs text-textSecondary max-w-sm leading-relaxed">
                  {t("Try clearing your search filters, changing categories, or bookmarks to explore 360 News.")}
                </p>
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setActiveCategory(null);
                    setActiveTab('feed');
                  }}
                  className="text-xs px-4 py-2 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-colors shadow-lg"
                >
                  {t("Reset All Filters")}
                </button>
              </div>
            ) : (
              filteredStories.map((story, index) => (
                <ReelCard
                  key={story.id}
                  story={story}
                  isBookmarked={bookmarkedIds.includes(story.id)}
                  onToggleBookmark={handleToggleBookmark}
                  fontScale={fontScale}
                  setFontScale={setFontScale}
                  isActive={index === activeCardIndex}
                />
              ))
            )}
          </div>

        </main>

        {/* Right Info Panel (Desktop Only) */}
        <RightPanel
          stories={newsData}
          bookmarkedIds={bookmarkedIds}
          onSelectStory={handleSelectStory}
        />

      </div>

      {/* Global Search Modal Overlay */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        stories={newsData}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        onSelectStory={handleSelectStory}
      />

    </div>
  );
}

export default App;
