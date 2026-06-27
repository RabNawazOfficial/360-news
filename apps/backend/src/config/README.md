# Config Directory

This directory contains configuration files for the application.

## Responsibility
It handles loading configuration settings, validating environment variables, and exporting a single configuration object for the application.

## Key Files
- `index.ts`: The configuration manager file. Uses `dotenv` to load configurations and validates them with a `zod` schema to guarantee type-safety and check requirements.
