import React from 'react';
import { 
  TrendingUp, 
  ShieldAlert, 
  Sparkles, 
  Bookmark, 
  Scale 
} from 'lucide-react';
import type { NewsStory } from '../data/news';
import { useLanguage } from '../context/LanguageContext';
import { Translate } from './Translate';

interface RightPanelProps {
  stories: NewsStory[];
  bookmarkedIds: string[];
  onSelectStory: (id: string) => void;
}

export const RightPanel: React.FC<RightPanelProps> = ({
  stories,
  bookmarkedIds,
  onSelectStory,
}) => {
  const { t } = useLanguage();
  // Get bookmarked stories
  const savedStories = stories.filter(story => bookmarkedIds.includes(story.id));

  // Get recommended stories (just sample first 3 stories that are NOT bookmarked)
  const recommendedStories = stories
    .filter(story => !bookmarkedIds.includes(story.id))
    .slice(0, 3);

  // Today's trending tags
  const trendingTopics = [
    { tag: "#CleanEnergyBill", volume: "125.4K reads" },
    { date: "June 2026", tag: "#AISafetyAccord", volume: "94.2K reads" },
    { tag: "#FusionBreakthrough", volume: "88.1K reads" },
    { tag: "#MicroplasticsStudy", volume: "74.8K reads" },
    { tag: "#SCOTUSPrivilege", volume: "62.3K reads" }
  ];

  // Fact check updates
  const factChecks = [
    {
      source: "Reuters Fact Check",
      claim: "Did Congress pass a carbon emission tax?",
      rating: "Verified True",
      ratingColor: "text-success bg-success/10",
      storyId: "1"
    },
    {
      source: "AP Fact Check",
      claim: "Do plastics in organs cause direct disease?",
      rating: "Mostly True (Needs Study)",
      ratingColor: "text-warning bg-warning/10",
      storyId: "12"
    }
  ];

  return (
    <aside className="hidden lg:flex flex-col w-80 shrink-0 border-l border-white/5 bg-[#0F1117] p-5 space-y-6 overflow-y-auto no-scrollbar sticky top-[60px]" style={{ height: 'calc(100vh - 60px)' }}>
      {/* Daily Bias Meter Gauge */}
      <div className="p-4 rounded-2xl glass-effect border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/5 rounded-full blur-2xl" />
        
        <div className="flex items-center space-x-2 mb-3">
          <Scale className="text-secondary" size={18} />
          <h3 className="text-sm font-semibold text-white">{t("Daily Bias Meter")}</h3>
        </div>

        {/* Gauge visualization */}
        <div className="relative flex flex-col items-center mt-2">
          <div className="w-full h-2 bg-white/5 rounded-full relative overflow-hidden flex">
            <div className="w-1/3 h-full bg-blue-500/50" title={t("Progressive focus")} />
            <div className="w-1/3 h-full bg-success/50" title={t("Factual Center")} />
            <div className="w-1/3 h-full bg-red-500/50" title={t("Conservative focus")} />
          </div>
          
          {/* Active pointer (let's put it right in the center for Centrist/Balanced reading) */}
          <div className="absolute left-[50%] -translate-x-[50%] -top-1 w-4 h-4 bg-white border border-secondary rounded-full shadow-lg transition-all duration-500" />

          <div className="flex justify-between w-full mt-2 text-[10px] text-textSecondary">
            <span>{t("Progressive")}</span>
            <span className="text-white font-medium">{t("Perfect Balance")}</span>
            <span>{t("Conservative")}</span>
          </div>
        </div>
        <p className="text-[11px] text-textSecondary/75 mt-3 text-center">
          {t("You read perspective A and B equally today. Keep it up!")}
        </p>
      </div>

      {/* Trending Topics */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <TrendingUp className="text-primary" size={18} />
          <h3 className="text-sm font-semibold text-white">{t("Trending Topics")}</h3>
        </div>
        <div className="space-y-2">
          {trendingTopics.map((topic, idx) => (
            <div 
              key={idx} 
              className="p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <p className="text-xs font-semibold text-white">
                <Translate>{topic.tag}</Translate>
              </p>
              <p className="text-[10px] text-textSecondary mt-0.5">
                <Translate>{topic.volume}</Translate>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Fact Check Alerts */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <ShieldAlert className="text-warning" size={18} />
          <h3 className="text-sm font-semibold text-white">{t("Fact Check Center")}</h3>
        </div>
        <div className="space-y-2.5">
          {factChecks.map((fc, idx) => (
            <div 
              key={idx} 
              onClick={() => onSelectStory(fc.storyId)}
              className="p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer space-y-1.5"
            >
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-textSecondary">
                  <Translate>{fc.source}</Translate>
                </span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${fc.ratingColor}`}>
                  <Translate>{fc.rating}</Translate>
                </span>
              </div>
              <Translate as="p" className="text-xs font-medium text-white">{fc.claim}</Translate>
            </div>
          ))}
        </div>
      </div>

      {/* Saved / Bookmarked Articles */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Bookmark className="text-secondary" size={18} />
          <h3 className="text-sm font-semibold text-white">{t("Saved for Later")}</h3>
        </div>
        <div className="space-y-2">
          {savedStories.length === 0 ? (
            <div className="p-4 rounded-xl border border-dashed border-white/10 text-center text-xs text-textSecondary">
              {t("No bookmarks saved yet.")}
            </div>
          ) : (
            savedStories.slice(0, 3).map(story => (
              <div 
                key={story.id} 
                onClick={() => onSelectStory(story.id)}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer flex items-center space-x-2.5"
              >
                <img 
                  src={story.image} 
                  alt={story.title} 
                  className="w-12 h-12 object-cover rounded-lg"
                />
                <div className="min-w-0 flex-1">
                  <Translate as="p" className="text-xs font-medium text-white line-clamp-2 leading-tight">
                    {story.title}
                  </Translate>
                  <span className="text-[9px] text-textSecondary uppercase tracking-wider mt-1 inline-block">
                    {t(story.category)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* AI Recommended */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Sparkles className="text-primary" size={18} />
          <h3 className="text-sm font-semibold text-white">{t("AI Recommendations")}</h3>
        </div>
        <div className="space-y-2">
          {recommendedStories.map(story => (
            <div 
              key={story.id} 
              onClick={() => onSelectStory(story.id)}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer flex items-center space-x-2.5"
            >
              <img 
                src={story.image} 
                alt={story.title} 
                className="w-12 h-12 object-cover rounded-lg"
              />
              <div className="min-w-0 flex-1">
                <Translate as="p" className="text-xs font-medium text-white line-clamp-2 leading-tight">
                  {story.title}
                </Translate>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-[9px] text-textSecondary uppercase tracking-wider">
                    {t(story.category)}
                  </span>
                  <span className="text-[9px] text-primary bg-primary/10 px-1 py-0.5 rounded">
                    {story.aiConfidence}% {t("match")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
export default RightPanel;
