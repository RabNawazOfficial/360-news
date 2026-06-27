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

      const { items } = await this.newsService.getArticles(queryParams);

      const response: ApiResponse<NormalizedArticle[]> = {
        success: true,
        message: 'Successfully retrieved news articles.',
        data: items,
        timestamp: new Date().toISOString(),
      };

      res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      // Pass the error to the global Express error handler
      next(error);
    }
  };
}
