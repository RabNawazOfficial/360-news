import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './config';
import apiRouter from './routes';
import { errorHandler } from './middlewares/errorHandler';
import { ApiError } from './utils/apiError';
import { HTTP_STATUS, MESSAGES } from './constants';

const app = express();

// 1. Security Headers Middleware
app.use(helmet());

// 2. Cross-Origin Resource Sharing (CORS) Middleware
app.use(
  cors({
    origin: config.corsOrigin,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// 3. Request Body Parsing Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4. HTTP Request Logging Middleware (Morgan)
if (config.env !== 'test') {
  const logFormat = config.env === 'development' ? 'dev' : 'combined';
  app.use(morgan(logFormat));
}

// 5. Mount API Routes under /api namespace
app.use('/api', apiRouter);

// 6. Catch-all for undefined route paths (Triggers 404 Operational Error)
app.use((_req: Request, _res: Response, next: NextFunction) => {
  next(new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.ERROR_NOT_FOUND));
});

// 7. Global Error Boundary Middleware
app.use(errorHandler);

export default app;
