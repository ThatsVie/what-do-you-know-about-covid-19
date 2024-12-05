import React, { useState } from "react";
import axios from "../api/axiosConfig";
import FilterBar from "../components/FilterBar";
import ArticleCard from "../components/ArticleCard";
import Pagination from "../components/Pagination";
import InteractiveBubbles from "../components/InteractiveBubbles";

const ArticlesPage = () => {
  const [filters, setFilters] = useState({ search: "", year: "", category: "" });
  const [articles, setArticles] = useState([]);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 0 });
  const [hasSearched, setHasSearched] = useState(false);
  const [isViewAll, setIsViewAll] = useState(false);
  const [viewAllOrder, setViewAllOrder] = useState("desc");
  const [loading, setLoading] = useState(false);

  // Fetch articles based on filters or view-all settings
  const fetchArticles = async (page = 1, isViewAllMode = false, order = "desc") => {
    setLoading(true);
    try {
      const params = isViewAllMode
        ? { all: true, page, order }
        : { ...filters, page, limit: 10 };

      const response = await axios.get("/api/articles", { params });

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
    } finally {
      setLoading(false);
    }
  };

  // Handle search functionality
  const handleSearch = () => {
    setPagination({ currentPage: 1, totalPages: 0 }); // Reset pagination
    fetchArticles(1, false); // Fetch articles with filters
  };

  // Handle "View All" functionality
  const handleViewAll = (order = "desc") => {
    setPagination({ currentPage: 1, totalPages: 0 });
    fetchArticles(1, true, order);
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
      <header className="header">
      <div className="interactive-bubbles">
    <InteractiveBubbles />
  </div>
        <h1>What Do You Know About COVID-19?</h1>
        <p>
          Sharing knowledge and personal experiences to help others make informed
          decisions for themselves and the world at large.
        </p>
      </header>


      {/* Filter Section */}
      <FilterBar
        filters={filters}
        setFilters={setFilters}
        clearFilters={clearFilters}
        onSearch={handleSearch}
      />
      <div className="instructions">
        <p>Use the filters above to search for articles.</p>
      </div>
  
  {/* Search Results Section */}
{hasSearched && (
  <div className="search-results-container">
    {loading ? (
      <div className="loader-container">
        <div className="loader"></div>
        <p>Loading articles...</p>
      </div>
    ) : articles.length === 0 ? (
      <p>No articles found. Try adjusting your filters.</p>
    ) : (
      <>
        <h2>Search Results</h2>
        <div className="articles-list">
          {articles.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      </>
    )}
  </div>
)}

{/* Pagination and Navigation */}
{hasSearched && pagination.totalPages > 1 && (
  <>
    <Pagination pagination={pagination} onPageChange={handlePageChange} />
    <div className="clear-all-button">
      <button onClick={clearFilters}>Clear All</button>
    </div>
    <div className="back-to-top">
      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        Back to Top
      </button>
    </div>
  </>
)}
      {/* View All Section */}
      <hr className="section-separator" />
      <div className="view-all-section">
        <p>Alternatively, view all the articles:</p>
        <div className="view-all-buttons">
          <button onClick={() => handleViewAll("asc")}>View All (Ascending)</button>
          <button onClick={() => handleViewAll("desc")}>View All (Descending)</button>
        </div>
      </div>
  




  
      {/* Footer Section */}
      <footer className="footer">
        <p>Acknowledgements: Special thanks to everyone who contributed to this project.</p>
        <p>
          <a href="https://github.com/ThatsVie" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>{" "}
          |{" "}
          <a href="https://www.whatdoyouknowaboutlove.com/viepaula" target="_blank" rel="noopener noreferrer">
            About the Developer
          </a>
        </p>
      </footer>
    </div>
  );
  
};

export default ArticlesPage;