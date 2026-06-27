import { Router } from 'express';
import { NewsController } from '../controllers/news.controller';
import { validate } from '../middlewares/validation.middleware';
import { getNewsQuerySchema } from '../validators/news.validator';

const router = Router();
const controller = new NewsController();

/**
 * Route mapping for /api/news.
 * 
 * Apply getNewsQuerySchema validator on request query parameters ('query')
 * before forwarding to controller handler getNews.
 */
router.get('/', validate(getNewsQuerySchema, 'query'), controller.getNews);

export default router;
