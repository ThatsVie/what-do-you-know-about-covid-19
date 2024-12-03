# What Do You Know About COVID-19? - Backend

This is the backend for the What Do You Know About COVID-19? API. It provides an interface to fetch articles about COVID-19, including features like filtering, pagination, and detailed API documentation.


## Features

- Fetch articles with filters (search, year, category).
- Pagination for efficient browsing.
- API documentation using Swagger.
- Logging with Winston for monitoring and debugging.
- Unit tests using `supertest` to validate endpoints.

## API Documentation
Access the Swagger documentation at: http://localhost:4000/api-docs

### Endpoints
GET /api/articles

Fetch articles with optional filters and pagination.

### Query Parameters:
- search (string): Search keyword.
- year (integer): Filter by publication year.
- category (string): Filter by category.
- page (integer): Page number for pagination.
- limit (integer): Number of results per page.

## Logging
Logging is handled by Winston:

- Logs requests, errors, and other events.
- Logs are saved to logs/app.log.

## Testing
Unit tests are implemented with supertest and can be run using:
npm test

Tests Included:

- Fetch articles with pagination.
- Filter articles by search keyword.
- Filter articles by year and category.
- Handle non-existent routes.
