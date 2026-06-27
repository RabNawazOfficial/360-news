import app from './app';
import { config } from './config';
import { logger } from './utils/logger';

/**
 * Handle uncaught code/synchronous exceptions.
 * Prevents process from running in an undefined state.
 */
process.on('uncaughtException', (error: Error) => {
  logger.error('CRITICAL: Uncaught Exception thrown!', error);
  logger.warn('Shutting down server due to uncaught exception...');
  process.exit(1);
});

// Start listening for incoming HTTP connections
const server = app.listen(config.port, () => {
  logger.info(`🚀 Backend server is running on http://localhost:${config.port}`);
  logger.info(`🔧 Active Environment: ${config.env}`);
});

/**
 * Handle unhandled asynchronous promise rejections.
 * Allows current requests to close before crashing the process.
 */
process.on('unhandledRejection', (reason: unknown) => {
  logger.error('CRITICAL: Unhandled Promise Rejection!', { reason });
  logger.warn('Attempting graceful shutdown...');
  server.close(() => {
    logger.warn('Server closed. Exiting process.');
    process.exit(1);
  });
});
