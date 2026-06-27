import dotenv from 'dotenv';
import path from 'path';
import { z } from 'zod';

// Load variables from the local .env file
dotenv.config({ path: path.join(__dirname, '../../.env') });

// Define environment variable schema using Zod
const envSchema = z.object({
  PORT: z.coerce.number().default(4000),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  CORS_ORIGIN: z.string().default('*'),
});

// Perform validation
const envParse = envSchema.safeParse(process.env);

if (!envParse.success) {
  console.error('❌ Environment validation failed:', envParse.error.format());
  process.exit(1);
}

const validatedEnv = envParse.data;

/**
 * Global application configuration object.
 * Reads environment variables validated at boot time.
 */
export const config = {
  port: validatedEnv.PORT,
  env: validatedEnv.NODE_ENV,
  corsOrigin: validatedEnv.CORS_ORIGIN,
};
