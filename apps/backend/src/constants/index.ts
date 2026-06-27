/**
 * HTTP Status Codes mapping to avoid using magic numbers in controllers or route handlers.
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
} as const;

/**
 * Common system-wide messages.
 */
export const MESSAGES = {
  ERROR_GENERIC: 'Something went wrong on our end. Please try again later.',
  ERROR_NOT_FOUND: 'The requested resource could not be found.',
  ERROR_VALIDATION: 'Request validation failed.',
  HEALTH_OK: 'API service is fully operational.',
} as const;
