import React, { useState } from "react";
import axios from "../api/axiosConfig";
import FilterBar from "../components/FilterBar";
import ArticleCard from "../components/ArticleCard";
import Pagination from "../components/Pagination";

const ArticlesPage = () => {
  const [filters, setFilters] = useState({ search: "", year: "", category: "" });
  const [articles, setArticles] = useState([]);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 0 });
  const [hasSearched, setHasSearched] = useState(false);
  const [isViewAll, setIsViewAll] = useState(false);
  const [viewAllOrder, setViewAllOrder] = useState("desc");

  // Fetch articles based on filters or view-all settings
  const fetchArticles = async (page = 1, isViewAllMode = false, order = "desc") => {
    try {
      const params = isViewAllMode
        ? { all: true, page, order }
        : { ...filters, page, limit: 10 };

      const response = await axios.get("/articles", { params });

      setArticles(response.data.articles);
      setPagination({
        currentPage: response.data.currentPage,
        totalPages: response.data.totalPages,
      });
      setHasSearched(true);
      setIsViewAll(isViewAllMode);
      if (isViewAllMode) setViewAllOrder(order);
    } catch (err) {
      console.error("Error fetching articles:", err);
    }
  };

  // Handle search functionality
  const handleSearch = () => {
    fetchArticles(1, false); // Fetch articles with filters
  };

  // Handle "View All" functionality
  const handleViewAll = (order = "desc") => {
    fetchArticles(1, true, order); // Fetch all articles
  };

  // Handle page changes for pagination
  const handlePageChange = (newPage) => {
    fetchArticles(newPage, isViewAll, viewAllOrder);
  };

  // Clear filters and reset the view
  const clearFilters = () => {
    setFilters({ search: "", year: "", category: "" });
    setArticles([]);
    setPagination({ currentPage: 1, totalPages: 0 });
    setHasSearched(false);
    setIsViewAll(false);
  };

  return (
    <div className="articles-page">
      <FilterBar
        filters={filters}
        setFilters={setFilters}
        clearFilters={clearFilters}
        onSearch={handleSearch}
      />
      <button onClick={() => handleViewAll("asc")}>View All (Ascending)</button>
      <button onClick={() => handleViewAll("desc")}>View All (Descending)</button>

      {!hasSearched ? (
        <div className="instructions">
          <p>Welcome! Use the filters above to search for articles.</p>
          <ul>
            <li>Filter by year of publication</li>
            <li>Filter by category</li>
            <li>Search for specific keywords</li>
          </ul>
        </div>
      ) : (
        <div className="articles-list">
          {articles.length > 0 ? (
            articles.map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))
          ) : (
            <p>No articles found. Try adjusting your filters.</p>
          )}
        </div>
      )}
      {hasSearched && pagination.totalPages > 1 && (
        <Pagination
          pagination={pagination}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default ArticlesPage;
