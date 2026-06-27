# Middlewares Directory

This directory contains Express middleware functions.

## Responsibility
Intercept and process HTTP requests before they reach the controllers, handling cross-cutting concerns like security, logging, error handling, rate limiting, and request validation.

## Key Files
- `errorHandler.ts`: Global error handler middleware that catches exceptions thrown at any point and returns uniform JSON responses.
- `validation.middleware.ts`: Reusable validation orchestrator that checks schemas against request targets (`body`, `query`, `params`).
