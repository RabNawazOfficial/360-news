import { Request, Response, NextFunction } from 'express';
import { NewsService } from '../services/news.service';
import { HTTP_STATUS } from '../constants';
import { ApiResponse } from '../interfaces/api.interface';
import { GetNewsQuery } from '../validators/news.validator';
import { NormalizedArticle } from '../services/news.service';

/**
 * Controller class to manage incoming HTTP requests targeting news operations.
 */
export class NewsController {
  private readonly newsService: NewsService;

  constructor() {
    this.newsService = new NewsService();
  }

  /**
   * HTTP Request Handler to fetch normalized news articles.
   * 
   * Reads and casts the validated query params, fetches articles using the NewsService,
   * wraps the normalized array in our standard response envelope, and returns it.
   * 
   * @param req Express Request object
   * @param res Express Response object
   * @param next Express NextFunction for forwarding errors
   */
  public getNews = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      // Cast the validated and coerced query params from the validation middleware
      const queryParams = req.query as unknown as GetNewsQuery;

      const { items, totalItems } = await this.newsService.getArticles(queryParams);

      // Build active filters configuration dynamically from request parameters
      const filters: Record<string, string> = {};
      if (queryParams.category) {
        filters.category = queryParams.category;
      }
      if (queryParams.country) {
        filters.country = queryParams.country;
      }

      // Structure the payload exactly according to Phase 2 response format specifications
      const response = {
        success: true,
        totalResults: totalItems,
        page: queryParams.page,
        pageSize: queryParams.pageSize,
        filters,
        data: items,
      };

      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      // Pass the error to the global Express error handler
      next(error);
    }
  };
}
