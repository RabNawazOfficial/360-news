import { z } from 'zod';

/**
 * Validation schema for the news endpoint query parameters.
 * 
 * It validates query parameters for the NewsAPI top-headlines request,
 * applying required parameters and default fallbacks:
 * - country: string (defaults to 'us')
 * - category: optional enum matching NewsAPI categories
 * - query: optional search query text
 * - page: number (defaults to 1)
 * - pageSize: number (defaults to 15, max 100)
 */
export const getNewsQuerySchema = z.object({
  query: z.string().optional(),
  category: z.enum(['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology']).optional(),
  country: z.enum(['in', 'us', 'gb', 'au', 'ca', 'de', 'fr', 'jp']).default('us'),
  page: z.coerce
    .number()
    .int('Page must be an integer')
    .min(1, 'Page must be greater than or equal to 1')
    .default(1),
  pageSize: z.coerce
    .number()
    .int('Page size must be an integer')
    .min(1, 'Page size must be at least 1')
    .max(50, 'Page size must be at most 50')
    .default(15),
});

/**
 * Type representation of the parsed getNews query parameters.
 */
export type GetNewsQuery = z.infer<typeof getNewsQuerySchema>;
