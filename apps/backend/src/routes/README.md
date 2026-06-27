# Routes Directory

This directory maps HTTP endpoints to controllers and applies route-specific middlewares.

## Responsibility
Serves as the router routing table. Defines routes, maps HTTP verbs (GET, POST, etc.) and paths (e.g. `/api/news`) to their respective controllers, and applies validators or auth middlewares.

## Key Files
- `index.ts`: The main Express router which bundles and namespaces all sub-routers.
- `news.routes.ts`: Routes specifically targeting the news domains.
- `health.routes.ts`: Basic status check endpoint.
