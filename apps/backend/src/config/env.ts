import dotenv from 'dotenv';
import path from 'path';
import { z } from 'zod';

// Load variables from the local .env file in the backend directory
dotenv.config({ path: path.join(__dirname, '../../.env') });

// Define environment validation schema using Zod
const envSchema = z.object({
  PORT: z.coerce.number().default(4000),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  CORS_ORIGIN: z.string().default('*'),
  NEWS_API_KEY: z.string().min(1, 'NEWS_API_KEY is required and cannot be empty'),
  NEWS_API_BASE_URL: z.string().url('NEWS_API_BASE_URL must be a valid URL').default('https://newsapi.org/v2'),
});

// Parse and validate process.env
const envParse = envSchema.safeParse(process.env);

if (!envParse.success) {
  console.error('❌ Environment validation failed:', JSON.stringify(envParse.error.format(), null, 2));
  process.exit(1);
}

const validatedEnv = envParse.data;

/**
 * Validated configuration container for the backend application.
 * Exposes core ports, security variables, and news service configurations.
 * 
 * @type {{
 *   port: number;
 *   nodeEnv: 'development' | 'production' | 'test';
 *   corsOrigin: string;
 *   newsApiKey: string;
 *   newsApiBaseUrl: string;
 * }}
 */
export const env = {
  port: validatedEnv.PORT,
  nodeEnv: validatedEnv.NODE_ENV,
  corsOrigin: validatedEnv.CORS_ORIGIN,
  newsApiKey: validatedEnv.NEWS_API_KEY,
  newsApiBaseUrl: validatedEnv.NEWS_API_BASE_URL,
};
