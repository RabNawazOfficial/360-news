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
  category: z.enum(['general', 'technology', 'business', 'sports', 'entertainment', 'science', 'health']).optional(),
  country: z.string().default('us'),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(15),
});

/**
 * Type representation of the parsed getNews query parameters.
 */
export type GetNewsQuery = z.infer<typeof getNewsQuerySchema>;
