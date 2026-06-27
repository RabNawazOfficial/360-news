/**
 * Simple logging utility for consistent console output.
 * 
 * In a full production environment, this can be swapped with Winston or Pino.
 * It provides timestamp formatting and log levels (info, warn, error, debug).
 */
export const logger = {
  /**
   * Logs informational messages.
   * @param message Message or descriptive label
   * @param optionalParams Optional parameters or metadata object
   */
  info: (message: string, ...optionalParams: unknown[]): void => {
    console.info(`[${new Date().toISOString()}] [INFO]: ${message}`, ...optionalParams);
  },

  /**
   * Logs warning messages.
   * @param message Message or descriptive label
   * @param optionalParams Optional parameters or metadata object
   */
  warn: (message: string, ...optionalParams: unknown[]): void => {
    console.warn(`[${new Date().toISOString()}] [WARN]: ${message}`, ...optionalParams);
  },

  /**
   * Logs error messages.
   * @param message Message or descriptive label
   * @param optionalParams Optional parameters or metadata object
   */
  error: (message: string, ...optionalParams: unknown[]): void => {
    console.error(`[${new Date().toISOString()}] [ERROR]: ${message}`, ...optionalParams);
  },

  /**
   * Logs debugging messages (only outputs if NODE_ENV is not production).
   * @param message Message or descriptive label
   * @param optionalParams Optional parameters or metadata object
   */
  debug: (message: string, ...optionalParams: unknown[]): void => {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(`[${new Date().toISOString()}] [DEBUG]: ${message}`, ...optionalParams);
    }
  }
};
