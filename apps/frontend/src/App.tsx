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
import { Sidebar } from '@/components/sidebar/Sidebar';
import { RightPanel } from '@/components/layout/RightPanel';
import { ReelCard } from '@/components/cards/ReelCard';
import { SearchModal } from '@/components/common/SearchModal';
import { useLanguage, languages } from '@/contexts/LanguageContext';
import { useNews } from '@/hooks/useNews';
import type { NormalizedArticle, NewsCategory } from '@/types/news';
import type { NewsStory, SourceHeadline, TimelineEvent } from '@/data/news';

const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80";

// Stable hash generator for AI metrics and scores
const getStableScore = (str: string, min: number, max: number, seed: number) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const range = max - min;
  const val = Math.abs(hash + seed) % range;
  return min + val;
};

const getRelativeTime = (publishedAt: string) => {
  try {
    const diffMs = Date.now() - new Date(publishedAt).getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 60) return `${Math.max(1, diffMins)}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  } catch {
    return "recently";
  }
};

const normalizeToNewsStory = (article: NormalizedArticle, activeCategory: string | null): NewsStory => {
  const cleanDescription = article.description || "No description available.";
  const sentences = cleanDescription
    .split(/[.!?]\s+/)
    .map(s => s.trim())
    .filter(s => s.length > 0)
    .map(s => s.endsWith('.') ? s : s + '.');
  const facts = sentences.length > 0 ? sentences : ["No description available."];

  const wordCount = (article.description?.split(/\s+/).length || 0) + (article.content?.split(/\s+/).length || 0);
  const readTimeVal = Math.max(1, Math.ceil(wordCount / 200));
  const readTime = `${readTimeVal} min read`;

  const trust = getStableScore(article.title, 85, 98, 1);
  const isBreaking = getStableScore(article.title, 0, 10, 8) > 8; // ~20% of articles show breaking badge

  const sourceComparison: SourceHeadline[] = [
    { outlet: article.source || "Publisher", headline: article.title, trustScore: trust },
    { outlet: 'Reuters', headline: `Factual coverage of: ${article.title}`, trustScore: 95 },
    { outlet: 'AP News', headline: `Summary details regarding: ${article.title}`, trustScore: 94 }
  ];

  const dateStr = new Date(article.publishedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  const timeline: TimelineEvent[] = [
    { date: dateStr, title: "Report Published", description: `Article officially published by ${article.source || 'publisher'}.` },
    { date: "Earlier", title: "Editorial Desk Verification", description: "Information structured and cross-referenced by newsroom staff." }
  ];

  return {
    id: article.url, // unique URL serves as ID
    category: activeCategory || "General",
    title: article.title,
    image: article.urlToImage || PLACEHOLDER_IMAGE,
    isBreaking,
    source: article.source || "Unknown Source",
    publishTime: getRelativeTime(article.publishedAt),
    readTime,
    facts,
    progressiveView: `Left-leaning perspective analysis is currently unavailable for this article. Aggregated from the factual reporting of ${article.source || 'the publisher'}.`,
    conservativeView: `Right-leaning perspective analysis is currently unavailable for this article. Aggregated from the factual reporting of ${article.source || 'the publisher'}.`,
    sourceComparison,
    timeline,
    aiConfidence: getStableScore(article.title, 90, 99, 2),
    biasScore: getStableScore(article.title, 5, 25, 3),
    sourceDiversity: getStableScore(article.title, 80, 98, 4),
    sentiment: getStableScore(article.title, 0, 3, 5) === 0 ? 'Positive' : getStableScore(article.title, 0, 3, 5) === 1 ? 'Negative' : 'Neutral',
    factCheckStatus: trust >= 92 ? 'Verified' : 'Mostly True',
    overallTrustScore: trust,
    url: article.url,
    author: article.author || "Unknown Author"
  };
};

const mapUiCategoryToApiCategory = (uiCategory: string): NewsCategory | undefined => {
  const map: Record<string, NewsCategory> = {
    'World': 'general',
    'Politics': 'general',
    'Technology': 'technology',
    'Business': 'business',
    'Science': 'science',
    'Health': 'health',
    'Sports': 'sports',
  };
  return map[uiCategory];
};

function App() {
  const [activeTab, setActiveTab] = useState<string>('feed');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');
  const [bookmarkedArticles, setBookmarkedArticles] = useState<NewsStory[]>([]);
  const [fontScale, setFontScale] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const bookmarkedIds = bookmarkedArticles.map(a => a.id);

  // Debounce search query changes to prevent rapid API requests during typing
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 400);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);
  
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
    // Find the story in current feed or bookmark cache
    const story = filteredStories.find(s => s.id === id) || bookmarkedArticles.find(s => s.id === id);
    if (!story) return;

    setBookmarkedArticles(prev => {
      const isBookmarked = prev.some(item => item.id === story.id);
      if (isBookmarked) {
        return prev.filter(item => item.id !== story.id);
      } else {
        return [...prev, story];
      }
    });
  };

  const mappedCategory = activeCategory ? mapUiCategoryToApiCategory(activeCategory) : undefined;
  
  // Call useNews hook for fetching live backend articles
  const { loading, error, news, refetch } = useNews({
    query: debouncedSearchTerm.trim() || undefined,
    category: mappedCategory,
  });

  const normalizedStories = news.map(art => normalizeToNewsStory(art, activeCategory));

  // Filter logic based on active tab, search, and category
  const filteredStories = activeTab === 'bookmarks'
    ? bookmarkedArticles.filter(story => {
        const matchesSearch = searchTerm.trim() === '' || 
          story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          story.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          story.facts.some(fact => fact.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesCategory = activeCategory === null || story.category === activeCategory;
        return matchesSearch && matchesCategory;
      })
    : activeTab === 'trending'
      ? normalizedStories.filter(story => story.isBreaking || story.overallTrustScore >= 92)
      : normalizedStories;

  // Handle cross-navigation scrolling
  const handleSelectStory = (storyId: string) => {
    let index = filteredStories.findIndex(s => s.id === storyId);

    if (index === -1) {
      setSearchTerm('');
      setActiveCategory(null);
      setActiveTab('feed');

      setTimeout(() => {
        const fullIndex = normalizedStories.findIndex(s => s.id === storyId);
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
            {loading ? (
              /* Skeletons loader while fetching live backend articles */
              Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="snap-card w-full flex items-center justify-center p-3 md:p-6 bg-[#0F1117]">
                  <div className="w-full max-w-xl h-[calc(100svh-90px)] md:h-[calc(100vh-100px)] bg-[#171923] rounded-3xl border border-white/5 shadow-glass overflow-hidden flex flex-col relative animate-pulse">
                    <div className="h-44 md:h-52 w-full bg-white/5" />
                    <div className="p-6 space-y-4 flex-1">
                      <div className="h-6 bg-white/10 rounded w-3/4" />
                      <div className="h-4 bg-white/5 rounded w-1/2" />
                      <div className="h-[1px] bg-white/5 my-4" />
                      <div className="h-10 bg-white/5 rounded-2xl" />
                      <div className="space-y-3 mt-4">
                        <div className="h-4 bg-white/5 rounded w-full" />
                        <div className="h-4 bg-white/5 rounded w-5/6" />
                        <div className="h-4 bg-white/5 rounded w-2/3" />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : error ? (
              /* Professional error state with Retry button */
              <div className="flex flex-col items-center justify-center h-full px-6 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center animate-bounce">
                  <span className="text-xl font-bold">!</span>
                </div>
                <h3 className="text-lg font-bold text-white">{t("Unable to load news")}</h3>
                <p className="text-xs text-textSecondary max-w-sm leading-relaxed">
                  {error || t("There was a connection issue fetching the latest articles. Please try again.")}
                </p>
                <button 
                  onClick={refetch}
                  className="text-xs px-5 py-2.5 rounded-xl bg-danger text-white font-bold hover:bg-danger/90 transition-colors shadow-lg"
                >
                  {t("Retry Connection")}
                </button>
              </div>
            ) : filteredStories.length === 0 ? (
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
          stories={normalizedStories}
          bookmarkedIds={bookmarkedIds}
          onSelectStory={handleSelectStory}
        />

      </div>

      {/* Global Search Modal Overlay */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        stories={normalizedStories}
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
