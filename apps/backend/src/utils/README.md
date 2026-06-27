# Utils Directory

This directory contains standalone, helper utilities that perform pure, stateless, or generic operations.

## Responsibility
Provide reusable helpers that can be imported anywhere without introducing circular dependencies or complex state.

## Key Files
- `logger.ts`: Core logger wrapper around console logic, printing standard formats with severity levels.
- `apiError.ts`: A custom `ApiError` class extending the standard `Error` class to encapsulate HTTP status codes, validation errors, and metadata.
