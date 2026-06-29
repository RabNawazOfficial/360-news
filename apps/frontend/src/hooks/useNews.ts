import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { NewsService } from '../services/news.service';
import type { NormalizedArticle, GetNewsParams } from '../types/news';

// Global cache to persist loaded pages and articles across component mount/unmount and renders
const globalNewsCache: Record<string, {
  articles: NormalizedArticle[];
  page: number;
  totalResults: number;
  hasMore: boolean;
}> = {};

/**
 * Reusable React hook for fetching and managing news article state with pagination and caching.
 * 
 * Handles query parameter inputs for category, country, and query searches. It maintains
 * a client-side in-memory cache of already loaded pages to ensure instant navigation.
 * 
 * @param params GetNewsParams containing category, country, and query filters
 */
export const useNews = (params: GetNewsParams = {}) => {
  const { query, category, country } = params;

  // Generate a unique cache key based on active query filters
  const cacheKey = `${category || 'general'}_${country || 'us'}_${query || ''}`;

  // Read initial states from cache if available, otherwise default
  const getInitialState = () => {
    const cached = globalNewsCache[cacheKey];
    if (cached) {
      return {
        articles: cached.articles,
        page: cached.page,
        hasMore: cached.hasMore
      };
    }
    return {
      articles: [],
      page: 1,
      hasMore: true
    };
  };

  const initialState = getInitialState();

  const [news, setNews] = useState<NormalizedArticle[]>(initialState.articles);
  const [page, setPage] = useState<number>(initialState.page);
  const [hasMore, setHasMore] = useState<boolean>(initialState.hasMore);

  const [loading, setLoading] = useState<boolean>(!globalNewsCache[cacheKey]);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const newsServiceRef = useRef(new NewsService());
  const abortControllerRef = useRef<AbortController | null>(null);

  /**
   * Helper function to fetch a specific page of articles.
   * 
   * @param targetPage Page number to request
   * @param isFirstPage If true, resets news list; if false, appends to it
   */
  const fetchPage = useCallback(async (targetPage: number, isFirstPage: boolean) => {
    // Cancel any ongoing requests
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    if (isFirstPage) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }
    setError(null);

    try {
      const response = await newsServiceRef.current.getNews({
        query,
        category,
        country,
        page: targetPage,
        pageSize: 15,
      }, controller.signal);

      if (controller.signal.aborted) return;

      const newArticles = response.data || [];
      const total = response.totalResults || 0;

      setNews((prevNews) => {
        let updated: NormalizedArticle[];
        if (isFirstPage) {
          updated = newArticles;
        } else {
          // Avoid duplicate articles by filtering by URL
          const existingUrls = new Set(prevNews.map((a) => a.url));
          const uniqueNewArticles = newArticles.filter((a) => !existingUrls.has(a.url));
          updated = [...prevNews, ...uniqueNewArticles];
        }

        const loadedCount = updated.length;
        const moreAvailable = loadedCount < total && newArticles.length > 0;

        // Persist back to the cache
        globalNewsCache[cacheKey] = {
          articles: updated,
          page: targetPage,
          totalResults: total,
          hasMore: moreAvailable,
        };

        setHasMore(moreAvailable);
        setPage(targetPage);

        return updated;
      });

    } catch (err: unknown) {
      if (axios.isCancel(err) || controller.signal.aborted) {
        return;
      }
      let errorMessage = 'Failed to fetch news articles.';
      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message || err.message;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      if (!controller.signal.aborted) {
        if (isFirstPage) {
          setLoading(false);
        } else {
          setLoadingMore(false);
        }
      }
    }
  }, [category, country, query, cacheKey]);

  // Adjust state during render when cacheKey changes
  const [prevCacheKey, setPrevCacheKey] = useState<string>(cacheKey);
  if (cacheKey !== prevCacheKey) {
    setPrevCacheKey(cacheKey);
    const cached = globalNewsCache[cacheKey];
    if (cached) {
      setNews(cached.articles);
      setPage(cached.page);
      setHasMore(cached.hasMore);
      setLoading(false);
      setError(null);
    } else {
      setNews([]);
      setPage(1);
      setHasMore(true);
      setLoading(true);
      setError(null);
    }
  }

  // Fetch page 1 on cacheKey change if not cached
  useEffect(() => {
    const cached = globalNewsCache[cacheKey];
    let timerId: ReturnType<typeof setTimeout> | null = null;
    
    if (!cached) {
      // Defer execution to next tick to prevent synchronous setState cascading renders in effect body
      timerId = setTimeout(() => {
        fetchPage(1, true);
      }, 0);
    }

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
      // Cancel active request when the cache key changes
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [cacheKey, fetchPage]);

  /**
   * Triggers loading the next page of results if available.
   */
  const loadMore = useCallback(async () => {
    // Prevent duplicate requests and loading if we don't have more
    if (loading || loadingMore || !hasMore) {
      return;
    }
    const nextPage = page + 1;
    await fetchPage(nextPage, false);
  }, [loading, loadingMore, hasMore, page, fetchPage]);

  /**
   * Refetches the first page of news.
   */
  const refetch = useCallback(() => {
    fetchPage(1, true);
  }, [fetchPage]);

  return {
    loading,
    loadingMore,
    error,
    news,
    refetch,
    loadMore,
    hasMore,
    page,
  };
};

export default useNews;
