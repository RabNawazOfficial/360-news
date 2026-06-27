import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { ApiError } from '../utils/apiError';
import { logger } from '../utils/logger';
import { HTTP_STATUS, MESSAGES } from '../constants';
import { ApiResponse } from '../interfaces/api.interface';
import { config } from '../config';

/**
 * Global Express Error Handling Middleware.
 * 
 * Captures all errors thrown in routes, controllers, or other middlewares.
 * Distinguishes between validated ApiErrors, validation errors (ZodError),
 * and unexpected system errors, formatting them into a standard ApiResponse.
 */
export const errorHandler: ErrorRequestHandler = (
  err: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): void => {
  let statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR;
  let message: string = MESSAGES.ERROR_GENERIC;
  let errors: unknown[] = [];

  // 1. Handle custom operational ApiErrors
  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    errors = err.errors;
  }
  // 2. Handle input validation errors (Zod validation schemas)
  else if (err instanceof ZodError) {
    statusCode = HTTP_STATUS.BAD_REQUEST;
    message = MESSAGES.ERROR_VALIDATION;
    errors = err.issues.map((e: any) => ({
      field: e.path.map(String).join('.'),
      issue: e.message,
    }));
  }
  // 3. Handle unexpected/system errors
  else {
    // Log details internally for debugging (never leak raw stack trace to clients in prod)
    logger.error('Unexpected Exception:', err);
    if (config.env === 'development') {
      message = err.message || message;
      errors = [err.stack];
    }
  }

  const responseBody: ApiResponse = {
    success: false,
    message,
    errors: errors.length > 0 ? errors : undefined,
    timestamp: new Date().toISOString(),
  };

  res.status(statusCode).json(responseBody);
};
