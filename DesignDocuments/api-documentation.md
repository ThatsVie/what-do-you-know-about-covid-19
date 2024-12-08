# API Documentation

## Endpoints

### `GET /api/articles`
- **Description:** Fetches a list of articles, optionally filtered by category, year, or tags.
- **Query Parameters:**
  - `category` (string): Filter by category.
  - `year` (number): Filter by year.
  - `tags` (string): Filter by tags (comma-separated).
- **Response Example:**
```json
[
  {
    "id": "1",
    "title": "Mask Efficacy",
    "author": "Dr. Smith",
    "category": "Prevention",
    "year": 2023,
    "summary": "An article discussing mask effectiveness.",
    "url": "http://example.com"
  }
]
