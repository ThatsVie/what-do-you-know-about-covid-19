
# Frontend for "What Do You Know About COVID-19?"

This is the frontend repository for the "What Do You Know About COVID-19?" project, a web application designed to fetch and display COVID-19-related articles. The frontend is built with **React** and interacts with a backend API to filter, paginate, and display articles in a user-friendly and responsive interface.

## Features

- **Search & Filters**: Users can search articles by keyword, filter by year, and category.
- **Pagination**: Supports paginated results for better usability and performance.
- **View All Options**: Users can view all articles sorted by ascending or descending order.
- **Responsive Design**: Optimized for viewing on various devices with adaptive layouts.
- **Interactive UI**: Modern and engaging design with hover effects and button animations.
- **Accessible Components**: Includes keyboard navigation and ARIA labels for improved accessibility.


## Components
1. FilterBar
Purpose: Allows users to search by keyword, filter by year, and filter by category.
Features:
Responsive design for mobile and desktop.
Clear All button to reset filters.
2. ArticleCard
Purpose: Displays article details in a visually appealing card format.
Features:
Shows title, summary, authors, publication date, category, and tags.
Includes a "View Article" button linking to the full article.
3. Pagination
Purpose: Provides navigation for paginated results.
Features:
Buttons for next/previous pages.
Displays the current page and total pages.

## API Integration
The frontend communicates with the backend API to fetch articles and supports the following query parameters:
search: Search articles by keyword.
year: Filter articles by publication year.
category: Filter articles by category.
page: Specify the page number for pagination.
limit: Limit the number of articles returned per page.

## Styling
Global Theme: The application uses a modern color palette featuring shades of blue, gray, and white.
Animations: Smooth hover effects and transitions for an interactive experience.
Responsive Design: Adjusts layout and styling for different screen sizes.

## Future Enhancements
User Authentication: Add login functionality for personalized user experiences.
Bookmarking: Allow users to save and manage favorite articles.
Real-time Updates: Implement WebSockets to display new articles in real-time.
