import { env } from './env';

export { env };

/**
 * Backward-compatible configuration object.
 * Maps to validated variables loaded inside config/env.ts.
 */
export const config = {
  port: env.port,
  env: env.nodeEnv,
  corsOrigin: env.corsOrigin,
};
