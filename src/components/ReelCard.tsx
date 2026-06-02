import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bookmark, 
  Share2, 
  ChevronDown, 
  ChevronUp, 
  Calendar, 
  Award,
  Sparkles,
  Info,
  CheckCircle,
  FileText,
  Flame,
  Plus,
  Minus
} from 'lucide-react';
import type { NewsStory } from '../data/news';
import { useLanguage } from '../context/LanguageContext';
import { Translate } from './Translate';

interface ReelCardProps {
  story: NewsStory;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  fontScale: 'sm' | 'md' | 'lg' | 'xl';
  setFontScale: (scale: 'sm' | 'md' | 'lg' | 'xl') => void;
  isActive: boolean;
}

export const ReelCard: React.FC<ReelCardProps> = ({
  story,
  isBookmarked,
  onToggleBookmark,
  fontScale,
  setFontScale,
  isActive
}) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'facts' | 'progressive' | 'conservative'>('facts');
  const [showSources, setShowSources] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  // Font size mapping classes
  const fontSizes = {
    sm: 'text-scale-sm',
    md: 'text-scale-md',
    lg: 'text-scale-lg',
    xl: 'text-scale-xl'
  };

  const handleShare = () => {
    // Mock sharing trigger
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${story.title} - Read balanced perspectives on 360 News`);
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2000);
    }
  };

  const cycleFontScale = (direction: 'up' | 'down') => {
    const scales: ('sm' | 'md' | 'lg' | 'xl')[] = ['sm', 'md', 'lg', 'xl'];
    const currentIndex = scales.indexOf(fontScale);
    if (direction === 'up' && currentIndex < scales.length - 1) {
      setFontScale(scales[currentIndex + 1]);
    } else if (direction === 'down' && currentIndex > 0) {
      setFontScale(scales[currentIndex - 1]);
    }
  };

  return (
    <div className="snap-card w-full flex items-center justify-center p-3 md:p-6 bg-[#0F1117]">
      <div className="w-full max-w-xl h-[calc(100svh-90px)] md:h-[calc(100vh-100px)] bg-[#171923] rounded-3xl border border-white/5 shadow-glass overflow-hidden flex flex-col relative">
        
        {/* Scrollable card body */}
        <div className="flex-1 overflow-y-auto no-scrollbar pb-6 space-y-4">
          
          {/* Hero Image Section */}
          <div className="h-44 md:h-52 w-full relative shrink-0">
            <img 
              src={story.image} 
              alt={story.title} 
              className="w-full h-full object-cover"
            />
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#171923] via-[#171923]/40 to-transparent" />
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="text-[10px] md:text-xs font-bold text-white bg-primary px-2.5 py-1 rounded-full uppercase tracking-wider">
                {t(story.category)}
              </span>
              {story.isBreaking && (
                <span className="text-[10px] md:text-xs font-bold text-[#0F1117] bg-warning px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 animate-pulse">
                  <Flame size={12} /> {t("Breaking")}
                </span>
              )}
            </div>

            {/* Fact Check Badge */}
            <div className="absolute top-4 right-4">
              <span className="text-[9px] md:text-[10px] font-bold bg-[#171923]/90 border border-success/30 text-success px-2 py-0.5 rounded-full flex items-center gap-1 backdrop-blur-md">
                <CheckCircle size={10} /> {t("Fact Checked")}
              </span>
            </div>
          </div>

          {/* Headline & Metadata */}
          <div className="px-4 md:px-6 space-y-2 mt-[-10px] relative z-10">
            <Translate as="h2" className="text-lg md:text-xl font-bold text-white leading-snug">
              {story.title}
            </Translate>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-textSecondary/80">
              <Translate as="span" className="font-semibold text-white">{story.source}</Translate>
              <span>•</span>
              <Translate as="span">{story.publishTime}</Translate>
              <span>•</span>
              <Translate as="span">{story.readTime}</Translate>
              <span>•</span>
              <span className="flex items-center gap-1 text-primary">
                <Award size={13} /> {t("Trust Score")}: {story.overallTrustScore}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="mx-4 md:mx-6 h-[1px] bg-white/5" />

          {/* Main Perspective Selector */}
          <div className="px-4 md:px-6">
            <div className="bg-[#0F1117] p-1.5 rounded-2xl flex border border-white/5">
              <button
                onClick={() => setActiveTab('facts')}
                className={`flex-1 py-2 text-center text-xs md:text-sm font-semibold rounded-xl transition-all duration-300 relative ${
                  activeTab === 'facts' ? 'text-white' : 'text-textSecondary hover:text-white'
                }`}
              >
                {activeTab === 'facts' && (
                  <motion.div 
                    layoutId="activeTabGlow"
                    className="absolute inset-0 bg-white/5 border border-white/10 rounded-xl"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {t("Facts")}
              </button>
              <button
                onClick={() => setActiveTab('progressive')}
                className={`flex-1 py-2 text-center text-xs md:text-sm font-semibold rounded-xl transition-all duration-300 relative ${
                  activeTab === 'progressive' ? 'text-primary' : 'text-textSecondary hover:text-white'
                }`}
              >
                {activeTab === 'progressive' && (
                  <motion.div 
                    layoutId="activeTabGlow"
                    className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-xl"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {t("Progressive View")}
              </button>
              <button
                onClick={() => setActiveTab('conservative')}
                className={`flex-1 py-2 text-center text-xs md:text-sm font-semibold rounded-xl transition-all duration-300 relative ${
                  activeTab === 'conservative' ? 'text-[#ef4444]' : 'text-textSecondary hover:text-white'
                }`}
              >
                {activeTab === 'conservative' && (
                  <motion.div 
                    layoutId="activeTabGlow"
                    className="absolute inset-0 bg-[#ef4444]/10 border border-[#ef4444]/20 rounded-xl"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {t("Conservative View")}
              </button>
            </div>
          </div>

          {/* Perspective Viewport Content */}
          <div className="px-4 md:px-6 min-h-[140px]">
            <AnimatePresence mode="wait">
              {activeTab === 'facts' && (
                <motion.div
                  key="facts"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                  className={`space-y-2.5 ${fontSizes[fontScale]}`}
                >
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-textSecondary uppercase tracking-widest mb-1">
                    <FileText size={12} /> {t("Factual Base Analysis")}
                  </div>
                  <ul className="list-disc list-outside pl-4 space-y-2 text-textSecondary">
                    {story.facts.map((fact, idx) => (
                      <li key={idx} className="leading-relaxed pl-1">
                        <Translate>{fact}</Translate>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {activeTab === 'progressive' && (
                <motion.div
                  key="progressive"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                  className={`space-y-2.5 ${fontSizes[fontScale]}`}
                >
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-primary uppercase tracking-widest mb-1">
                    <Info size={12} /> {t("Left-Leaning Media Framing")}
                  </div>
                  <Translate as="p" className="text-textSecondary leading-relaxed border-l-2 border-primary/40 pl-3">
                    {story.progressiveView}
                  </Translate>
                </motion.div>
              )}

              {activeTab === 'conservative' && (
                <motion.div
                  key="conservative"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                  className={`space-y-2.5 ${fontSizes[fontScale]}`}
                >
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-danger uppercase tracking-widest mb-1">
                    <Info size={12} /> {t("Right-Leaning Media Framing")}
                  </div>
                  <Translate as="p" className="text-textSecondary leading-relaxed border-l-2 border-danger/40 pl-3">
                    {story.conservativeView}
                  </Translate>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Source Comparison Accordion */}
          <div className="mx-4 md:mx-6 bg-[#0F1117] border border-white/5 rounded-2xl overflow-hidden">
            <button
              onClick={() => setShowSources(!showSources)}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/5 transition-colors text-left"
            >
              <div className="flex items-center gap-2">
                <Award size={16} className="text-secondary" />
                <div>
                  <span className="text-xs md:text-sm font-bold text-white block">{t("Source Headline Comparison")}</span>
                  <span className="text-[10px] text-textSecondary">{t("Compare framing & trust rankings")}</span>
                </div>
              </div>
              {showSources ? <ChevronUp size={16} className="text-textSecondary" /> : <ChevronDown size={16} className="text-textSecondary" />}
            </button>
            
            <AnimatePresence>
              {showSources && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  className="overflow-hidden border-t border-white/5 bg-[#171923]/50"
                >
                  <div className="p-3 space-y-2 text-xs">
                    <div className="grid grid-cols-12 gap-2 text-[10px] font-bold text-textSecondary border-b border-white/5 pb-1.5">
                      <div className="col-span-3">{t("Outlet")}</div>
                      <div className="col-span-7">{t("Headline Framing")}</div>
                      <div className="col-span-2 text-right">{t("Trust")}</div>
                    </div>
                    
                    {story.sourceComparison.map((sc, index) => (
                      <div key={index} className="grid grid-cols-12 gap-2 py-1.5 border-b border-white/5 last:border-b-0 items-center">
                        <Translate as="div" className="col-span-3 font-semibold text-white truncate">{sc.outlet}</Translate>
                        <Translate as="div" className="col-span-7 text-[11px] text-textSecondary/90 leading-tight italic">{`"${sc.headline}"`}</Translate>
                        <div className="col-span-2 text-right">
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            sc.trustScore >= 90 ? 'bg-success/15 text-success' :
                            sc.trustScore >= 80 ? 'bg-primary/10 text-primary' : 'bg-warning/10 text-warning'
                          }`}>
                            {sc.trustScore}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Timeline Accordion */}
          <div className="mx-4 md:mx-6 bg-[#0F1117] border border-white/5 rounded-2xl overflow-hidden">
            <button
              onClick={() => setShowTimeline(!showTimeline)}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/5 transition-colors text-left"
            >
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-primary" />
                <div>
                  <span className="text-xs md:text-sm font-bold text-white block">{t("Story Timeline")}</span>
                  <span className="text-[10px] text-textSecondary">{t("Chronological sequence of events")}</span>
                </div>
              </div>
              {showTimeline ? <ChevronUp size={16} className="text-textSecondary" /> : <ChevronDown size={16} className="text-textSecondary" />}
            </button>
            
            <AnimatePresence>
              {showTimeline && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  className="overflow-hidden border-t border-white/5 bg-[#171923]/50"
                >
                  <div className="p-4 space-y-4">
                    {story.timeline.map((event, index) => (
                      <div key={index} className="flex gap-3 relative last:pb-0 pb-1">
                        {/* Timeline branch line */}
                        {index < story.timeline.length - 1 && (
                          <div className="absolute top-4 bottom-0 left-2 w-0.5 bg-white/10" />
                        )}
                        {/* Node circle */}
                        <div className="w-4 h-4 rounded-full bg-primary border border-background shrink-0 mt-0.5 z-10 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        </div>
                        {/* Content */}
                        <div className="space-y-0.5 text-xs">
                          <Translate as="span" className="text-[10px] text-primary font-bold">{event.date}</Translate>
                          <Translate as="h6" className="font-semibold text-white">{event.title}</Translate>
                          <Translate as="p" className="text-textSecondary text-[11px] leading-relaxed">{event.description}</Translate>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* AI Metrics Progress Bars */}
          <div className="mx-4 md:mx-6 bg-[#0F1117]/40 p-4 rounded-2xl border border-white/5 space-y-3.5">
            <div className="flex items-center justify-between text-xs font-semibold text-textSecondary">
              <span className="flex items-center gap-1.5">
                <Sparkles size={13} className="text-secondary" /> {t("AI Metadata Analysis")}
              </span>
              <span className="text-[9px] bg-secondary/15 text-secondary px-1.5 py-0.5 rounded font-bold uppercase">
                {t("Fact Check")}: {t(story.factCheckStatus)}
              </span>
            </div>

            <div className="space-y-2">
              {/* Confidence */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-textSecondary flex items-center gap-1">
                    {t("AI Confidence Score")}
                    <span className="group relative cursor-pointer text-textSecondary/50 hover:text-white">
                      <Info size={11} />
                      <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 bg-black border border-white/10 text-white text-[9px] p-2 rounded w-40 opacity-0 group-hover:opacity-100 transition-opacity z-50 text-center">
                        {t("Accuracy score based on cross-referenced sources.")}
                      </span>
                    </span>
                  </span>
                  <span className="text-white font-semibold">{story.aiConfidence}%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: isActive ? `${story.aiConfidence}%` : 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="h-full bg-success rounded-full"
                  />
                </div>
              </div>

              {/* Bias Meter */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-textSecondary flex items-center gap-1">
                    {t("Bias Deviation")}
                    <span className="group relative cursor-pointer text-textSecondary/50 hover:text-white">
                      <Info size={11} />
                      <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 bg-black border border-white/10 text-white text-[9px] p-2 rounded w-40 opacity-0 group-hover:opacity-100 transition-opacity z-50 text-center">
                        {t("Percentage of opinionated language detected in raw reporting. Lower is cleaner.")}
                      </span>
                    </span>
                  </span>
                  <span className="text-white font-semibold">{story.biasScore}%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: isActive ? `${story.biasScore}%` : 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </div>

              {/* Source Diversity */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-textSecondary flex items-center gap-1">
                    {t("Source Diversity Score")}
                    <span className="group relative cursor-pointer text-textSecondary/50 hover:text-white">
                      <Info size={11} />
                      <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 bg-black border border-white/10 text-white text-[9px] p-2 rounded w-40 opacity-0 group-hover:opacity-100 transition-opacity z-50 text-center">
                        {t("Scored on the variety of global news networks aggregated.")}
                      </span>
                    </span>
                  </span>
                  <span className="text-white font-semibold">{story.sourceDiversity}%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: isActive ? `${story.sourceDiversity}%` : 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="h-full bg-secondary rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Right Actions Panel */}
        <div className="absolute right-4 bottom-20 md:bottom-24 flex flex-col items-center space-y-4 z-20">
          
          {/* Bookmark Button */}
          <button 
            onClick={() => onToggleBookmark(story.id)}
            className={`w-11 h-11 rounded-full flex items-center justify-center border shadow-lg transition-all duration-300 active:scale-95 ${
              isBookmarked 
                ? 'bg-secondary border-secondary text-white' 
                : 'bg-[#171923]/90 border-white/10 text-textSecondary hover:text-white'
            }`}
            aria-label={t("Bookmark article")}
          >
            <Bookmark size={20} className={isBookmarked ? 'fill-current' : ''} />
          </button>

          {/* Share Button */}
          <div className="relative">
            <button 
              onClick={handleShare}
              className="w-11 h-11 rounded-full bg-[#171923]/90 border border-white/10 text-textSecondary hover:text-white flex items-center justify-center shadow-lg transition-all duration-300 active:scale-95"
              aria-label={t("Share article")}
            >
              <Share2 size={20} />
            </button>
            <AnimatePresence>
              {shareSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: 20 }}
                  className="absolute right-14 top-2 bg-success text-white text-[10px] font-bold px-2.5 py-1 rounded-lg whitespace-nowrap z-50 shadow-md border border-success/30"
                >
                  {t("Link Copied!")}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Font Scaling Action Container */}
          <div className="bg-[#171923]/90 border border-white/10 rounded-full flex flex-col items-center py-2 px-1 shadow-lg gap-2">
            <button
              onClick={() => cycleFontScale('up')}
              disabled={fontScale === 'xl'}
              className={`p-1.5 rounded-full hover:bg-white/5 transition-colors ${
                fontScale === 'xl' ? 'text-textSecondary/30 cursor-not-allowed' : 'text-textSecondary hover:text-white'
              }`}
              title={t("Increase text size")}
            >
              <Plus size={16} />
            </button>
            
            <span className="text-[10px] font-bold text-white select-none">
              A
            </span>

            <button
              onClick={() => cycleFontScale('down')}
              disabled={fontScale === 'sm'}
              className={`p-1.5 rounded-full hover:bg-white/5 transition-colors ${
                fontScale === 'sm' ? 'text-textSecondary/30 cursor-not-allowed' : 'text-textSecondary hover:text-white'
              }`}
              title={t("Decrease text size")}
            >
              <Minus size={16} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
export default ReelCard;
