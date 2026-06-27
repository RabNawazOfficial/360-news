import { Request, Response, NextFunction } from 'express';
import { NewsService } from '../services/news.service';
import { HTTP_STATUS } from '../constants';
import { ApiResponse, PaginatedResponse } from '../interfaces/api.interface';
import { GetNewsQuery } from '../validators/news.validator';
import { NewsArticle } from '../services/news.service';

/**
 * Controller to manage news endpoints.
 */
export class NewsController {
  private readonly newsService: NewsService;

  constructor() {
    this.newsService = new NewsService();
  }

  /**
   * HTTP Handler to fetch news articles with pagination metadata.
   * 
   * Reads validated query parameters, delegates to NewsService,
   * constructs paginated response, and returns standard JSON payload.
   * 
   * @param req Express Request object
   * @param res Express Response object
   * @param next Express NextFunction for middleware chaining/error-handling
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

      const totalPages = Math.ceil(totalItems / queryParams.limit);

      const paginatedData: PaginatedResponse<NewsArticle> = {
        items,
        pagination: {
          page: queryParams.page,
          limit: queryParams.limit,
          totalItems,
          totalPages,
        },
      };

      const response: ApiResponse<PaginatedResponse<NewsArticle>> = {
        success: true,
        message: 'Successfully retrieved news articles.',
        data: paginatedData,
        timestamp: new Date().toISOString(),
      };

      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      // Pass the error to the global Express error handler
      next(error);
    }
  };
}
