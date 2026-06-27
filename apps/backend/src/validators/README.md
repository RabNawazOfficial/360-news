# Validators Directory

This directory contains schemas used to validate incoming HTTP requests (params, query parameters, body inputs).

## Responsibility
Validate external inputs at the router level before executing controller or service logic. This keeps controllers and services clean of simple type-checking and value-range assertions.

## Key Files
- `news.validator.ts`: Schema validator definitions using `zod` for the news endpoint query parameters.
