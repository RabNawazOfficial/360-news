import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { NewsService } from '../services/news.service';
import type { NormalizedArticle, GetNewsParams } from '../types/news';

/**
 * Reusable React hook for fetching and managing news article state.
 * 
 * Handles local state for request load status, error reports, and current articles list.
 * Automatically runs fetches on component mounting and triggers new queries if parameters
 * (e.g. search query or category filters) change.
 * 
 * Utilizes AbortController to cancel outdated requests on criteria updates or component unmount.
 * 
 * @param params Optional news filtering query params (category, search, page criteria)
 * @returns React bindings: loading state, error text, article data arrays, and manual refresh handle
 */
export const useNews = (params?: GetNewsParams) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [news, setNews] = useState<NormalizedArticle[]>([]);

  // Create a single instance of the service
  const newsServiceRef = useRef(new NewsService());

  // Stringify params to enable stable hook dependencies tracking
  const paramsString = JSON.stringify(params);

  /**
   * Executes news query transactions.
   * 
   * @param signal AbortSignal to trigger axios cancel token mapping
   */
  const fetchArticles = useCallback(async (signal?: AbortSignal) => {
    setLoading(true);
    setError(null);

    try {
      const parsedParams: GetNewsParams = paramsString ? JSON.parse(paramsString) : {};
      const articles = await newsServiceRef.current.getNews(parsedParams, signal);
      
      if (!signal?.aborted) {
        setNews(articles);
      }
    } catch (err: any) {
      // Gracefully capture cancellation events
      if (
        signal?.aborted || 
        axios.isCancel(err) || 
        err.name === 'CanceledError' || 
        err.name === 'AbortError'
      ) {
        return;
      }

      const errorMessage =
        err.response?.data?.message || err.message || 'Failed to fetch news articles.';
      setError(errorMessage);
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  }, [paramsString]);

  // Handle automatic query dispatch on criteria changes and lifecycle unmounting cleanup
  useEffect(() => {
    const controller = new AbortController();
    fetchArticles(controller.signal);

    return () => {
      controller.abort();
    };
  }, [fetchArticles]);

  /**
   * Manually dispatches news queries with the active search parameters.
   */
  const refetch = useCallback(() => {
    return fetchArticles();
  }, [fetchArticles]);

  return {
    loading,
    error,
    news,
    refetch,
  };
};
export default useNews;
