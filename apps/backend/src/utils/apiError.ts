/**
 * Custom Operational Error class for API exceptions.
 * 
 * Extends the native Error class to include HTTP status codes and operational status checks.
 * In Express, throwing an instance of ApiError allows the global error handler
 * middleware to format and return uniform JSON error responses to the client.
 */
export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly errors: unknown[];

  /**
   * Constructs a new ApiError.
   * 
   * @param statusCode HTTP Status Code representing the error (e.g., 400, 404, 500)
   * @param message Descriptive error message
   * @param errors Additional validation errors or metadata details
   * @param isOperational Mark true if this is a known, expected operational error (vs. code/system failure)
   * @param stack Call stack path (optional, will capture stack if empty)
   */
  constructor(
    statusCode: number,
    message: string,
    errors: unknown[] = [],
    isOperational = true,
    stack = ''
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
