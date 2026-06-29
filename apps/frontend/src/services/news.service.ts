import { getNewsApi } from '../api/news.api';
import type { NormalizedArticle, GetNewsParams, ApiResponse } from '../types/news';

/**
 * Service class that decouples the API transport layer from UI components.
 * 
 * Provides an infrastructure wrapper for fetching news data, resolving the
 * raw ApiResponse envelope.
 */
export class NewsService {
  /**
   * Fetches news articles envelope using the underlying API layer.
   * 
   * @param params Optional query filters (category, search, page criteria)
   * @param signal AbortSignal to cancel requests on unmount or retry
   * @returns Promise resolving to the ApiResponse containing NormalizedArticle array
   */
  public async getNews(
    params?: GetNewsParams,
    signal?: AbortSignal
  ): Promise<ApiResponse<NormalizedArticle[]>> {
    return getNewsApi(params, signal);
  }
}
