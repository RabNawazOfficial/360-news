import axios from 'axios';

// Read the VITE_API_BASE_URL injected by the Vite builder, falling back to localhost:4000
const baseURL = (import.meta.env.VITE_API_BASE_URL as string) || 'http://localhost:4000';

/**
 * Centrally configured Axios instance.
 * Houses configurations such as request base URLs, default headers, and request timeouts.
 */
export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15-second request timeout boundary
});
