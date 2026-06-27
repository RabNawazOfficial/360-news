import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

/**
 * Reusable validation middleware orchestrator.
 * 
 * Takes a Zod schema object and checks the specified request property ('body' | 'query' | 'params').
 * If validation fails, it catches the error and forwards it to the next() handler
 * (which triggers the global errorHandler).
 * 
 * If validation succeeds, it overrides the request property with the parsed, validated,
 * and coerced values from Zod (e.g. string '5' coerced to number 5) and calls next().
 * 
 * @param schema Zod Schema object
 * @param target Request property to validate (defaults to 'body')
 */
export const validate = (
  schema: ZodSchema,
  target: 'body' | 'query' | 'params' = 'body'
) => {
  return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      const validatedData = await schema.parseAsync(req[target]);
      // Override request data with fully validated and coerced data
      req[target] = validatedData;
      next();
    } catch (error) {
      // Forward the validation error to the global error handler
      next(error);
    }
  };
};
