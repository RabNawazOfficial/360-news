import { api } from './axios';
import { ENDPOINTS } from './endpoints';
import type { ApiResponse, NormalizedArticle, GetNewsParams } from '../types/news';

/**
 * Performs a GET request to the backend news API.
 * 
 * Accepts query filtering parameters and a standard AbortSignal to allow
 * cancelling the request if components unmount or criteria parameters change.
 * 
 * @param params Optional filters, country constraints, and paging parameters
 * @param signal AbortSignal to trigger request cancellation
 * @returns Promise containing standard ApiResponse wrapper holding normalized articles list
 */
export const getNewsApi = async (
  params?: GetNewsParams,
  signal?: AbortSignal
): Promise<ApiResponse<NormalizedArticle[]>> => {
  const response = await api.get<ApiResponse<NormalizedArticle[]>>(ENDPOINTS.NEWS, {
    params,
    signal,
  });
  return response.data;
};
