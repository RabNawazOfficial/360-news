/**
 * Standard API Response payload wrapper.
 * All controller endpoints will return JSON conforming to this contract.
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: unknown[];
  timestamp: string;
}

/**
 * Pagination metadata contract.
 */
export interface PaginationMeta {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

/**
 * Standard paginated API Response wrapper.
 */
export interface PaginatedResponse<T> {
  items: T[];
  pagination: PaginationMeta;
}
