# 360 News Backend Service

This is the backend API foundation for the 360 News platform, built with Node.js, Express, and TypeScript. It implements a layered, scalable, and modular structure following clean architecture and SOLID principles.

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm (v7+)

### Installation
Run the following from the project root:
```bash
npm install
```

### Environment Setup
Create a `.env` file in `apps/backend/` or copy the example:
```bash
cp .env.example .env
```

### Run in Development
To run the server with hot-reloading:
```bash
npm run dev -w @360-news/backend
# or from this folder:
npm run dev
```

### Build and Run in Production
To compile and start the production build:
```bash
npm run build
npm start
```

## Project Architecture

The application is structured into the following layers to separate concerns:

- `src/config/`: Configuration manager loading and validating env vars with Zod.
- `src/constants/`: Centralized status codes and error message templates.
- `src/controllers/`: Receives requests, triggers validations, calls services, and formats JSON responses.
- `src/interfaces/`: General and shared TypeScript interfaces (e.g., API requests/responses).
- `src/middlewares/`: Express middlewares (error handlers, validation orchestrators, security setup).
- `src/routes/`: Express routers maps endpoints to controllers.
- `src/services/`: Core business logic and integrations (mocked data fetching).
- `src/types/`: Custom global types or extension of external library typings.
- `src/utils/`: Common utilities (custom `ApiError` class, logging wrapper).
- `src/validators/`: Input validation schemas built using Zod.

For details on each folder, please refer to the respective `README.md` inside those subdirectories.
