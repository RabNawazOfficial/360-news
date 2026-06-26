# 360 News Monorepo

Welcome to the **360 News** monorepo. This codebase is structured using npm workspaces for ultimate scalability and modularity.

## Workspace Layout

- **`apps/`**
  - **`frontend/`**: The main React + Vite + TypeScript web application.
  - **`backend/`**: Node.js + Express + TypeScript backend (skeleton).
  - **`admin/`**: Future Admin portal.
- **`packages/`**: Reusable packages for shared logic.
  - **`ui/`**: Reusable UI components.
  - **`types/`**: Shared TypeScript models and definitions.
  - **`utils/`**: General helper libraries.
  - **`api-client/`**: Future API wrapper client.
  - **`config/`**: Shared configurations.
  - **`hooks/`**: Shared React hooks.
- **`docs/`**: Documentation including architecture design, APIs, database schemes, deployment procedures, and architectural decision records (ADRs).
- **`scripts/`**: Development and orchestration scripts.
- **`docker/`**: Docker configs and docker-compose files.

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm (v7+)

### Installation

Install dependencies across all workspaces from the root directory:

```bash
npm install
```

### Run Development Server

Launch the React web application dev server:

```bash
npm run dev
```

The application is served at [http://localhost:5173/](http://localhost:5173/).

### Build for Production

Build all workspaces:

```bash
npm run build
```
