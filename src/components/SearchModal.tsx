import React, { useState } from 'react';
import { Search, X, TrendingUp, History, Globe } from 'lucide-react';
import type { NewsStory } from '../data/news';
import { useLanguage } from '../context/LanguageContext';
import { Translate } from './Translate';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  stories: NewsStory[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  activeCategory: string | null;
  setActiveCategory: (category: string | null) => void;
  onSelectStory: (id: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  stories,
  searchTerm,
  setSearchTerm,
  activeCategory,
  setActiveCategory,
  onSelectStory,
}) => {
  const { t } = useLanguage();
  const [localSearch, setLocalSearch] = useState(searchTerm);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    "Fusion energy net gain",
    "Clean energy infrastructure bill",
    "CRISPR gene therapy cost",
    "South China Sea"
  ]);

  if (!isOpen) return null;

  const trendingSearches = [
    "AI Switzerland Accord",
    "Microplastics in brains",
    "Supreme Court subpoena ruling",
    "Olympic Esports Saudi Arabia"
  ];

  const categories = ["Politics", "Technology", "Science", "Business", "Sports", "Health", "World News"];

  // Filter stories based on query and active category
  const filteredStories = stories.filter(story => {
    const matchesSearch = 
      story.title.toLowerCase().includes(localSearch.toLowerCase()) ||
      story.facts.some(fact => fact.toLowerCase().includes(localSearch.toLowerCase())) ||
      story.category.toLowerCase().includes(localSearch.toLowerCase());
    
    const matchesCategory = activeCategory ? story.category === activeCategory : true;
    
    return matchesSearch && matchesCategory;
  });

  const handleSearchSubmit = (term: string) => {
    setLocalSearch(term);
    setSearchTerm(term);
    if (term.trim() && !recentSearches.includes(term)) {
      setRecentSearches(prev => [term, ...prev.slice(0, 4)]);
    }
  };

  const handleClear = () => {
    setLocalSearch('');
    setSearchTerm('');
  };

  return (
    <div className="fixed inset-0 bg-[#0F1117]/95 backdrop-blur-md z-50 flex flex-col items-center justify-start p-4 md:p-10 transition-all duration-300">
      <div className="w-full max-w-2xl bg-[#171923] rounded-3xl border border-white/5 shadow-glass overflow-hidden flex flex-col max-h-[85vh] mt-10">
        
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-4 border-b border-white/5 space-x-3">
          <Search className="text-textSecondary" size={20} />
          <input
            type="text"
            placeholder={t("Search news, facts, perspectives...")}
            value={localSearch}
            onChange={(e) => {
              setLocalSearch(e.target.value);
              setSearchTerm(e.target.value); // Instant search
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearchSubmit(localSearch);
              }
            }}
            className="flex-1 bg-transparent text-white placeholder-textSecondary/60 focus:outline-none text-sm md:text-base"
            autoFocus
          />
          {localSearch && (
            <button onClick={handleClear} className="p-1 rounded-full hover:bg-white/5 text-textSecondary hover:text-white">
              <X size={16} />
            </button>
          )}
          <button 
            onClick={onClose}
            className="text-xs px-3 py-1.5 rounded-lg bg-white/5 text-textSecondary hover:text-white transition-colors"
          >
            {t("Esc")}
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 no-scrollbar">
          
          {/* Categories Grid */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-textSecondary uppercase tracking-wider">
              {t("Filter by Category")}
            </h4>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory(null)}
                className={`text-xs px-3.5 py-1.5 rounded-full border transition-all duration-200 ${
                  activeCategory === null
                    ? 'bg-primary border-primary text-white'
                    : 'bg-white/5 border-white/5 text-textSecondary hover:bg-white/10 hover:text-white'
                }`}
              >
                {t("All News")}
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                  className={`text-xs px-3.5 py-1.5 rounded-full border transition-all duration-200 ${
                    activeCategory === cat
                      ? 'bg-secondary border-secondary text-white'
                      : 'bg-white/5 border-white/5 text-textSecondary hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {t(cat)}
                </button>
              ))}
            </div>
          </div>

          {localSearch.trim() === '' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Recent Searches */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-textSecondary">
                  <History size={14} />
                  <h4 className="text-xs font-semibold uppercase tracking-wider">{t("Recent Searches")}</h4>
                </div>
                <div className="space-y-1">
                  {recentSearches.map((term, i) => (
                    <button
                      key={i}
                      onClick={() => handleSearchSubmit(term)}
                      className="flex items-center w-full py-2 px-3 rounded-lg hover:bg-white/5 text-sm text-textSecondary hover:text-white text-left transition-colors"
                    >
                      <span className="truncate font-medium">
                        <Translate>{term}</Translate>
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Trending Searches */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-textSecondary">
                  <TrendingUp size={14} />
                  <h4 className="text-xs font-semibold uppercase tracking-wider">{t("Trending Right Now")}</h4>
                </div>
                <div className="space-y-1">
                  {trendingSearches.map((term, i) => (
                    <button
                      key={i}
                      onClick={() => handleSearchSubmit(term)}
                      className="flex items-center w-full py-2 px-3 rounded-lg hover:bg-white/5 text-sm text-textSecondary hover:text-white text-left transition-colors"
                    >
                      <span className="truncate font-medium">
                        <Translate>{term}</Translate>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Search Results */
            <div className="space-y-3">
              <div className="flex justify-between items-center text-textSecondary">
                <span className="text-xs font-semibold uppercase tracking-wider">
                  {t("Search Results")} ({filteredStories.length})
                </span>
                {activeCategory && (
                  <span className="text-[10px] bg-secondary/10 text-secondary px-2 py-0.5 rounded">
                    {t("Category")}: {t(activeCategory)}
                  </span>
                )}
              </div>

              {filteredStories.length === 0 ? (
                <div className="py-12 text-center space-y-2">
                  <Globe className="mx-auto text-textSecondary/40" size={32} />
                  <p className="text-sm text-textSecondary">{t("No matching stories found.")}</p>
                  <p className="text-xs text-textSecondary/60">{t("Try searching for other keywords, categories, or clearing filters.")}</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredStories.map((story) => (
                    <div
                      key={story.id}
                      onClick={() => {
                        onSelectStory(story.id);
                        onClose();
                      }}
                      className="p-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 cursor-pointer flex items-start space-x-3 transition-all duration-200"
                    >
                      <img
                        src={story.image}
                        alt={story.title}
                        className="w-16 h-16 object-cover rounded-xl mt-0.5 shrink-0"
                      />
                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-[9px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded uppercase tracking-wider">
                            {t(story.category)}
                          </span>
                          <Translate as="span" className="text-[9px] text-textSecondary">{story.publishTime}</Translate>
                        </div>
                        <Translate as="h5" className="text-sm font-semibold text-white leading-snug line-clamp-2">
                          {story.title}
                        </Translate>
                        <Translate as="p" className="text-[11px] text-textSecondary line-clamp-1 leading-normal">
                          {story.facts[0]}
                        </Translate>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Click outside target */}
      <div className="absolute inset-0 -z-10" onClick={onClose} />
    </div>
  );
};
export default SearchModal;
