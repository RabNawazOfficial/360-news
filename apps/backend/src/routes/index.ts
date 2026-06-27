import { Router } from 'express';
import newsRoutes from './news.routes';
import { HTTP_STATUS, MESSAGES } from '../constants';
import { ApiResponse } from '../interfaces/api.interface';

const router = Router();

/**
 * Health Check API Endpoint.
 * 
 * Verifies if the service is running and responsive. Used for
 * liveness probes or deployment verification.
 */
router.get('/health', (_req, res) => {
  const response: ApiResponse = {
    success: true,
    message: MESSAGES.HEALTH_OK,
    timestamp: new Date().toISOString(),
  };
  res.status(HTTP_STATUS.OK).json(response);
});

/**
 * Mount sub-routers for news domain.
 */
router.use('/news', newsRoutes);

export default router;
