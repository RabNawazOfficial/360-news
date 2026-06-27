import { GetNewsQuery } from '../validators/news.validator';

/**
 * Standard representation of a News Article.
 */
export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  category: 'general' | 'technology' | 'business' | 'sports' | 'entertainment';
  publishedAt: string;
}

// In-memory static mock database representing aggregated news articles.
const MOCK_ARTICLES: NewsArticle[] = [
  {
    id: 'art-1',
    title: 'Vite 8 Released with Advanced Performance Improvements',
    description: 'Vite 8 is out, packing support for faster module resolution and Oxc parsing speedups.',
    content: 'Today, the Vite core team announced Vite v8. The update contains significant compilation and dev server performance optimization, reducing boot time by 30%. Developers can upgrade immediately.',
    category: 'technology',
    publishedAt: '2026-06-27T08:00:00Z',
  },
  {
    id: 'art-2',
    title: 'Express 5.0 Finalized and Production-Ready',
    description: 'The Express team completes release candidate updates for the highly-anticipated version 5.0.',
    content: 'After years of development, Express 5.0 is officially stable. Key updates include native Promise support in route handlers, eliminating the need for helper middlewares to handle unhandled rejections.',
    category: 'technology',
    publishedAt: '2026-06-27T08:30:00Z',
  },
  {
    id: 'art-3',
    title: 'Global Markets Climb Amid Economic Recovery Signals',
    description: 'Indices hit new highs as consumer spending data surpasses initial Q2 projections.',
    content: 'Markets responded positively to the latest consumer price index and job reports, signaling strong recovery across major indices. Financial institutions maintain an optimistic outlook for the remainder of Q3.',
    category: 'business',
    publishedAt: '2026-06-27T09:00:00Z',
  },
  {
    id: 'art-4',
    title: 'Historic Match Ends in Thrilling Double Overtime Win',
    description: 'The championship cup concludes with a stunning 3-pointer buzzer-beater in double overtime.',
    content: 'Fans witnessed one of the most intense championship finals in basketball history. With only 1.2 seconds left on the clock in double overtime, a spectacular buzzer-beater sealed the tournament victory.',
    category: 'sports',
    publishedAt: '2026-06-27T09:15:00Z',
  },
  {
    id: 'art-5',
    title: 'Indie Film Sweeps Awards at International Film Festival',
    description: 'A low-budget independent drama secures four major awards including Best Picture.',
    content: 'The 34th annual International Film Festival came to a close last night, with low-budget indie breakout "Silent Whispers" claiming four top accolades, beating out major Hollywood competitors.',
    category: 'entertainment',
    publishedAt: '2026-06-27T10:00:00Z',
  },
  {
    id: 'art-6',
    title: 'AI Regulatory Framework Draft Published by Global Consortium',
    description: 'New guidelines aim to establish standards for transparency, safety, and training data auditability.',
    content: 'A consortium of tech companies and regulatory bodies released a comprehensive draft outlining code standards for AI model training safety, data compliance, and licensing frameworks.',
    category: 'technology',
    publishedAt: '2026-06-27T10:30:00Z',
  },
  {
    id: 'art-7',
    title: 'Startup Funding Resurges in Q2 2026 Reports',
    description: 'Venture capitalists redirect focus towards clean tech and health infrastructure innovations.',
    content: 'Quarterly reports indicate a 15% increase in venture funding compared to last quarter, with sustainability and medical hardware startups capturing the majority of early-stage investments.',
    category: 'business',
    publishedAt: '2026-06-27T11:00:00Z',
  }
];

/**
 * Service class managing news business logic.
 * Decoupled from the transport layer (Express HTTP requests).
 */
export class NewsService {
  /**
   * Fetches, filters, and paginates news articles.
   * 
   * This logic encapsulates what would normally be database queries or external API calls.
   * 
   * @param params Query criteria including search, category, page, and limit
   * @returns Promise containing filtered list of articles and total items matching parameters
   */
  public async getArticles(params: GetNewsQuery): Promise<{
    items: NewsArticle[];
    totalItems: number;
  }> {
    const { query, category, page, limit } = params;

    // Simulate async network/database delay (100ms)
    await new Promise((resolve) => setTimeout(resolve, 100));

    let filtered = [...MOCK_ARTICLES];

    // Filter by category if provided
    if (category) {
      filtered = filtered.filter((art) => art.category === category);
    }

    // Filter by query (title or description search) if provided
    if (query) {
      const searchLower = query.toLowerCase();
      filtered = filtered.filter(
        (art) =>
          art.title.toLowerCase().includes(searchLower) ||
          art.description.toLowerCase().includes(searchLower)
      );
    }

    // Calculate pagination slices
    const totalItems = filtered.length;
    const startIndex = (page - 1) * limit;
    const items = filtered.slice(startIndex, startIndex + limit);

    return {
      items,
      totalItems,
    };
  }
}
