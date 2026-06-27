# Controllers Directory

This directory contains controllers that map HTTP requests to business operations.

## Responsibility
Accepts requests from the routing layer, extracts arguments and payload, delegates to the appropriate service, formats the service's returned values, and sends the standard HTTP response.

## Key Files
- `news.controller.ts`: Handles requests related to news aggregation.
