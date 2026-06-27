import { getNewsApi } from '../api/news.api';
import type { NormalizedArticle, GetNewsParams } from '../types/news';

/**
 * Service class that decouples the API transport layer from UI components.
 * 
 * Provides an infrastructure wrapper for fetching news data, resolving the
 * raw ApiResponse envelope, and returning clean normalized articles arrays.
 */
export class NewsService {
  /**
   * Fetches news articles using the underlying API layer.
   * 
   * @param params Optional query filters (category, search, page criteria)
   * @param signal AbortSignal to cancel requests on unmount or retry
   * @returns Promise resolving to the array of NormalizedArticle objects
   */
  public async getNews(
    params?: GetNewsParams,
    signal?: AbortSignal
  ): Promise<NormalizedArticle[]> {
    const apiResponse = await getNewsApi(params, signal);
    return apiResponse.data || [];
  }
}
