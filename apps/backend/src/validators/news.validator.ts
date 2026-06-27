import { z } from 'zod';

/**
 * Validation schema for the getNews request query parameters.
 * 
 * It validates search text, category constraints, and coerces
 * string numbers into actual numbers for page/limit with fallback defaults.
 */
export const getNewsQuerySchema = z.object({
  query: z.string().optional(),
  category: z.enum(['general', 'technology', 'business', 'sports', 'entertainment']).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});

/**
 * Type inferred from the Zod getNewsQuerySchema.
 */
export type GetNewsQuery = z.infer<typeof getNewsQuerySchema>;
