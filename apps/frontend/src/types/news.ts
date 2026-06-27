/**
 * Structured contract representing a Normalized News Article.
 * Conforms to the shape returned by the backend service.
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

/**
 * Standard Envelope wrapping all API Response bodies from the backend.
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: unknown[];
  timestamp: string;
}

/**
 * Valid categories supported by the news service.
 */
export type NewsCategory =
  | 'general'
  | 'technology'
  | 'business'
  | 'sports'
  | 'entertainment'
  | 'science'
  | 'health';

/**
 * Query parameters used to filter and paginate news articles.
 * Matches the validation schema implemented in the backend.
 */
export interface GetNewsParams {
  query?: string;
  category?: NewsCategory;
  country?: string;
  page?: number;
  pageSize?: number;
}
