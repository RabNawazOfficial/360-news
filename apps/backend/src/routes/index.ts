import { Router } from 'express';
import newsRoutes from './news.routes';
import { HTTP_STATUS, MESSAGES } from '../constants';
import { ApiResponse } from '../interfaces/api.interface';

const router = Router();

/**
 * Health check endpoint.
 * Kept at /api/health for system diagnostic probes.
 */
router.get('/health', (_req, res) => {
  const response: ApiResponse = {
    success: true,
    message: MESSAGES.HEALTH_OK,
    timestamp: new Date().toISOString(),
  };
  res.status(HTTP_STATUS.OK).json(response);
});

// Define and structure v1 namespace sub-routes
const v1Router = Router();

// Mount news-related endpoint handlers under /api/v1/news
v1Router.use('/news', newsRoutes);

// Mount versioned sub-routers
router.use('/v1', v1Router);

export default router;
