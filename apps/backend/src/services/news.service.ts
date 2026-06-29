import axios, { AxiosError } from 'axios';
import { env } from '../config';
import { ApiError } from '../utils/apiError';
import { HTTP_STATUS } from '../constants';
import { logger } from '../utils/logger';
import { GetNewsQuery } from '../validators/news.validator';

/**
 * Interface representing a raw article returned by NewsAPI.org.
 */
interface NewsApiArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

/**
 * Interface representing the raw envelope response from NewsAPI.org.
 */
interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: NewsApiArticle[];
  code?: string;
  message?: string;
}

/**
 * Normalized News Article representation returned by our API.
 */
export interface NormalizedArticle {
  title: string;
  description: string | null;
  content: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  source: string;
  author: string | null;
}

const FALLBACK_ARTICLES: NormalizedArticle[] = [
  {
    title: "Congress Passes Landmark Clean Energy Infrastructure Bill",
    description: "The bill allocates $450 billion over 10 years to modernize the national power grid and construct wind, solar, and nuclear power installations. It establishes carbon tax penalties starting in 2028 for fossil-fuel plants failing to implement emission reduction tech.",
    content: "Congress has passed the landmark clean energy bill after weeks of negotiations. The bill allocates $450 billion over 10 years to modernize the national power grid and construct wind, solar, and nuclear power installations.",
    url: "https://apnews.com/clean-energy-infrastructure-bill-2026",
    urlToImage: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80",
    publishedAt: "2026-06-27T08:00:00Z",
    source: "AP News",
    author: "Sarah Jenkins"
  },
  {
    title: "Global Summit Agrees on New AI Safety Regulations",
    description: "Delegates from 42 countries, including the US, EU members, and China, signed the Geneva AI Safety Accord. The agreement mandates third-party audits for AI models utilizing more than 10^26 FLOPs of computing power.",
    content: "Forty-two nations signed the accord in Geneva. The agreement mandates third-party audits for AI models utilizing more than 10^26 FLOPs of computing power, marking the first global AI regulatory standard.",
    url: "https://reuters.com/global-summit-ai-safety-regulations-2026",
    urlToImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
    publishedAt: "2026-06-27T06:00:00Z",
    source: "Reuters",
    author: "David Lee"
  },
  {
    title: "Scientists Achieve Commercial Net Energy Gain in Nuclear Fusion",
    description: "The National Ignition Facility generated 4.2 megajoules of energy from a 2.1 megajoule laser input, achieving a Q-factor of 2.0. The reaction was sustained for 15 seconds, a 500% increase over the previous record.",
    content: "In a historic breakthrough, scientists achieved commercial net energy gain in a fusion reactor. The National Ignition Facility generated 4.2 megajoules of energy from a 2.1 megajoule laser input, achieving a Q-factor of 2.0.",
    url: "https://nature.com/articles/fusion-net-energy-gain-ignition",
    urlToImage: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=800&q=80",
    publishedAt: "2026-06-27T04:00:00Z",
    source: "Nature Journal",
    author: "Dr. Elizabeth Carter"
  },
  {
    title: "Federal Reserve Holds Interest Rates Steady, Citing Stubborn Inflation",
    description: "The Federal Reserve maintained the benchmark federal funds rate at 5.25% - 5.50% range. May's Consumer Price Index (CPI) report recorded inflation at 3.1%, above the Fed's target threshold of 2.0%.",
    content: "The Fed announced it will keep rates unchanged. Unemployment metrics rose slightly to 3.9%, while consumer credit card debt reached a new high of $1.15 trillion.",
    url: "https://bloomberg.com/news/fed-holds-rates-inflation-cpi",
    urlToImage: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80",
    publishedAt: "2026-06-27T01:00:00Z",
    source: "Bloomberg",
    author: "Marcus Vance"
  },
  {
    title: "Tensions Rise Over Disputed Maritime Borders in South China Sea",
    description: "A collision occurred between a Philippine coast guard vessel and a Chinese patrol boat near the disputed Second Thomas Shoal. Two Philippine sailors suffered minor injuries; both nations have accused the other of reckless navigation.",
    content: "Tensions continue to rise in the South China Sea. Around $3.4 trillion in global trade transits through the South China Sea annually.",
    url: "https://bbc.com/news/south-china-sea-maritime-collision-2026",
    urlToImage: "https://images.unsplash.com/photo-1507682531662-421b17d4723e?auto=format&fit=crop&w=800&q=80",
    publishedAt: "2026-06-26T22:00:00Z",
    source: "BBC News",
    author: "Alistair Campbell"
  },
  {
    title: "FDA Approves First CRISPR Gene Therapy for Inherited Heart Disease",
    description: "The FDA approved 'CardiEdit', a CRISPR-Cas9 genetic therapy designed to treat hypertrophic cardiomyopathy. Clinical trials demonstrated a 78% reduction in toxic protein accumulation in the heart with a one-time treatment.",
    content: "The FDA issued official commercial market clearance for 'CardiEdit', a genetic editor. The cost of the single-dose therapy is set at $1.8 million per patient.",
    url: "https://apnews.com/fda-approves-crispr-heart-disease-therapy",
    urlToImage: "https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&w=800&q=80",
    publishedAt: "2026-06-26T18:00:00Z",
    source: "AP News",
    author: "Helen Mercer"
  },
  {
    title: "EU Imposes Major Fines on Social Media Giants Over Teen Algorithms",
    description: "The European Commission fined three major social platforms a combined $3.2 billion for violating youth protection codes. The platforms are accused of deploying addictive loop features that bypass child filter protections.",
    content: "The European Commission announced the penalty under the Digital Services Act (DSA). Platforms must disable algorithmic feed recommendations for users under 16 by default.",
    url: "https://dw.com/eu-fines-social-media-teen-algorithms",
    urlToImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    publishedAt: "2026-06-26T12:00:00Z",
    source: "Deutsche Welle",
    author: "Dieter Schmitt"
  },
  {
    title: "International Olympic Committee Announces New E-Sports Games",
    description: "The IOC formally established the Olympic Esports Games, to debut in Saudi Arabia in 2027. The games will feature virtual sports titles and popular competitive strategy video games.",
    content: "The IOC signed a 12-year partnership with the Saudi Olympic Committee. Events will be held under separate rules, bypassing traditional Olympic drug testing.",
    url: "https://espn.com/olympics/ioc-announces-esports-games-saudi-arabia",
    urlToImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
    publishedAt: "2026-06-25T14:00:00Z",
    source: "ESPN",
    author: "Jake Miller"
  },
  {
    title: "Global Study Finds Microplastics Present in All Tested Human Organs",
    description: "A peer-reviewed study analyzing tissue samples from 120 donors detected microplastics in every brain, liver, kidney, and lung sample tested. The most common polymer found was polyethylene, widely used in single-use plastic packaging.",
    content: "Pathologists across 8 countries begin archiving donor tissue samples. Average concentration levels were 15 particles per gram of tissue.",
    url: "https://thelancet.com/journals/lanplh/article/microplastics-human-organs",
    urlToImage: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80",
    publishedAt: "2026-06-24T10:00:00Z",
    source: "Lancet Planet Health",
    author: "Sarah Thompson"
  }
];

/**
 * Service to interact with NewsAPI.org.
 * Decoupled from Express HTTP requests/responses.
 */
export class NewsService {
  /**
   * Helper method to filter mock articles locally for fallback scenarios.
   */
  private getFallbackArticles(params: GetNewsQuery): { items: NormalizedArticle[]; totalItems: number } {
    let filtered = [...FALLBACK_ARTICLES];

    if (params.category) {
      const categoryKeywords: Record<string, string[]> = {
        general: ['clean energy', 'maritime', 'space', 'politics', 'regulation', 'summit'],
        technology: ['ai safety', 'social media', 'algorithms', 'esports', 'exploit'],
        science: ['fusion', 'antarctic', 'lakes', 'radio burst'],
        business: ['interest rates', 'inflation', 'merger', 'retail'],
        sports: ['esports', 'olympic'],
        health: ['crispr', 'heart disease', 'microplastics']
      };
      const allowedKeywords = categoryKeywords[params.category] || [];
      filtered = filtered.filter(art => 
        allowedKeywords.some(keyword => 
          art.title.toLowerCase().includes(keyword) || 
          art.description?.toLowerCase().includes(keyword)
        ) || params.category === 'general'
      );
    }

    if (params.query) {
      const q = params.query.toLowerCase();
      filtered = filtered.filter(art => 
        art.title.toLowerCase().includes(q) || 
        art.description?.toLowerCase().includes(q) ||
        art.content?.toLowerCase().includes(q) ||
        art.source.toLowerCase().includes(q)
      );
    }

    const page = params.page || 1;
    const pageSize = params.pageSize || 15;
    const items = filtered.slice((page - 1) * pageSize, page * pageSize);

    return {
      items,
      totalItems: filtered.length
    };
  }

  /**
   * Fetches top headlines from NewsAPI.org and normalizes the output.
   * Falls back to mock articles if NewsAPI key is not configured or requests fail.
   * 
   * This method dynamically constructs query parameters based on the incoming GetNewsQuery
   * object by mapping our API validator keys to the parameter keys expected by NewsAPI.org.
   * This ensures we avoid hardcoding individual parameters inside the function logic.
   * 
   * @param params Validated and coerced query filters containing page, pageSize, category, country, and optional query
   * @returns Promise containing list of normalized articles and total items matching the filter
   */
  public async getArticles(params: GetNewsQuery): Promise<{
    items: NormalizedArticle[];
    totalItems: number;
  }> {
    // If NewsAPI Key is default placeholder or missing, immediately fall back to mock data
    if (!env.newsApiKey || env.newsApiKey === 'your_news_api_key_here' || env.newsApiKey.trim() === '') {
      logger.info('NewsAPI Key is not configured. Falling back to local mock articles.');
      return this.getFallbackArticles(params);
    }

    const endpoint = `${env.newsApiBaseUrl}/top-headlines`;

    // Dictionary mapping our validation query keys to the parameters expected by NewsAPI.org
    const parameterMap: Record<keyof GetNewsQuery, string> = {
      query: 'q',
      category: 'category',
      country: 'country',
      page: 'page',
      pageSize: 'pageSize'
    };

    // Dynamically build the query parameters object
    const queryParams: Record<string, unknown> = {
      apiKey: env.newsApiKey,
    };

    for (const [key, value] of Object.entries(params)) {
      const mappedKey = parameterMap[key as keyof GetNewsQuery];
      if (mappedKey && value !== undefined && value !== null) {
        queryParams[mappedKey] = value;
      }
    }

    try {
      logger.debug('Fetching headlines from NewsAPI', { endpoint, queryParams: { ...queryParams, apiKey: '***' } });

      const response = await axios.get<NewsApiResponse>(endpoint, {
        params: queryParams,
        timeout: 10000, // 10s timeout
      });

      const { data } = response;

      if (data.status !== 'ok') {
        logger.warn('NewsAPI returned non-ok status, falling back to mock articles:', data);
        return this.getFallbackArticles(params);
      }

      // Normalize the raw response into our target shape
      const normalizedItems: NormalizedArticle[] = data.articles.map((art) => ({
        title: art.title,
        description: art.description,
        content: art.content,
        url: art.url,
        urlToImage: art.urlToImage,
        publishedAt: art.publishedAt,
        source: art.source?.name || 'Unknown Source',
        author: art.author,
      }));

      return {
        items: normalizedItems,
        totalItems: data.totalResults,
      };
    } catch (error) {
      // In case of any communication or key errors, log warning and gracefully fall back
      logger.warn('Failed to query NewsAPI. Falling back to local mock articles. Error details:', 
        error instanceof Error ? error.message : error
      );
      return this.getFallbackArticles(params);
    }
  }
}
