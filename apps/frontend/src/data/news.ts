export interface SourceHeadline {
  outlet: string;
  headline: string;
  trustScore: number;
}

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
}

export interface NewsStory {
  id: string;
  category: string;
  title: string;
  image: string;
  isBreaking: boolean;
  source: string;
  publishTime: string;
  readTime: string;
  facts: string[];
  progressiveView: string;
  conservativeView: string;
  sourceComparison: SourceHeadline[];
  timeline: TimelineEvent[];
  aiConfidence: number;
  biasScore: number; // 0 to 100 representing bias detection intensity
  sourceDiversity: number; // 0 to 100
  sentiment: 'Positive' | 'Negative' | 'Neutral';
  factCheckStatus: 'Verified' | 'Mostly True' | 'Disputed';
  overallTrustScore: number;
  url: string;
  author: string;
}

// Mock newsData array removed as part of the live backend integration.
