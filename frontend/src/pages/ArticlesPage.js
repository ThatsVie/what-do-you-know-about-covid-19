import React, { useState } from 'react';
import axios from '../api/axiosConfig';
import FilterBar from '../components/FilterBar';
import ArticleCard from '../components/ArticleCard';
import Pagination from '../components/Pagination';
import InteractiveBubbles from '../components/InteractiveBubbles';

const ArticlesPage = () => {
  const [filters, setFilters] = useState({
    search: '',
    year: '',
    category: '',
  });
  const [articles, setArticles] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
  });
  const [hasSearched, setHasSearched] = useState(false);
  const [isViewAll, setIsViewAll] = useState(false);
  const [viewAllOrder, setViewAllOrder] = useState('desc');
  const [loading, setLoading] = useState(false);

  // Fetch articles based on filters or view-all settings
  const fetchArticles = async (
    page = 1,
    isViewAllMode = false,
    order = 'desc'
  ) => {
    setLoading(true);
    try {
      const params = isViewAllMode
        ? { all: true, page, order }
        : { ...filters, page, limit: 10 };

      const response = await axios.get('/api/articles', { params });

      setArticles(response.data.articles);
      setPagination({
        currentPage: response.data.currentPage,
        totalPages: response.data.totalPages,
      });
      setHasSearched(true);
      setIsViewAll(isViewAllMode);
      if (isViewAllMode) setViewAllOrder(order);
    } catch (err) {
      console.error('Error fetching articles:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle search functionality
  const handleSearch = () => {
    setPagination({ currentPage: 1, totalPages: 0 }); // Reset pagination
    fetchArticles(1, false); // Fetch articles with filters
  };

  // Scroll to the search results heading after the search is triggered
  setTimeout(() => {
    const searchResultsHeading = document.querySelector('.search-results-heading');
    if (searchResultsHeading) {
      const topPosition = searchResultsHeading.getBoundingClientRect().top + window.scrollY - 20;
      window.scrollTo({ top: topPosition, behavior: 'smooth' });
    }
  }, 100); // Timeout ensures the DOM is updated before scrolling


  // Handle "View All" functionality
  const handleViewAll = (order = 'desc') => {
    setPagination({ currentPage: 1, totalPages: 0 });
    fetchArticles(1, true, order);
  };

  // Handle page changes for pagination
  const handlePageChange = (newPage) => {
    fetchArticles(newPage, isViewAll, viewAllOrder);
  };

  // Clear filters and reset the view
  const clearFilters = () => {
    setFilters({ search: '', year: '', category: '' });
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
        Empowering individuals, families, and communities with trusted information to navigate an evolving world shaped by COVID-19.
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
      <p>
      Use the search options above to find articles, studies, and other valuable insights. You can search by keyword, year, category, or any combination of these.
      </p>
      </div>

      {/* Search Results Section */}
      {hasSearched && (
        <>
          <h2 className="search-results-heading">Search Results</h2>
          {loading ? (
            <div className="loader-container">
              <div className="loader"></div>
              <p>Loading articles...</p>
            </div>
          ) : articles.length === 0 ? (
            <p className="no-articles">
              No articles found. Try adjusting your filters.
            </p>
          ) : (
            <div className="articles-list">
              {articles.map((article) => (
                <ArticleCard key={article._id} article={article} />
              ))}
            </div>
          )}
        </>
      )}

      {/* Pagination and Navigation */}
      {hasSearched && pagination.totalPages > 1 && (
        <>
          <Pagination pagination={pagination} onPageChange={handlePageChange} />
          <div className="clear-all-button">
            <button onClick={clearFilters}>Clear All</button>
          </div>
          <div className="back-to-top">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Back to Top
            </button>
          </div>
        </>
      )}
      
      {/* View All Section */}
      <hr className="section-separator" />
      <div className="view-all-section">    
      <p>Browse the entire collection:</p>
        <div className="view-all-buttons">
        <button onClick={() => handleViewAll('asc')}>
        View All (Oldest First)
        </button>
        <button onClick={() => handleViewAll('desc')}>
        View All (Newest First)
        </button>
        </div>
      </div>

      {/* Acknowledgments & Dedication Section */}
      <section className="dedication">
        <h2>Acknowledgments & Dedication</h2>
        <p>
          <strong>In memory of the lives lost and forever changed</strong> by
          COVID-19.
        </p>
        <p>
          <strong>In recognition of the profound grief</strong> for a world that
          will never return, for the people we’ve lost, and for the inequities
          the pandemic has exposed.
        </p>
        <p>
          <strong>To the resilience</strong> of those navigating long COVID and
          other chronic impacts of this virus.
        </p>
        <p>
          <strong>To everyone who continues to care</strong> for their
          communities by taking precautions, advocating for justice, and
          spreading awareness.
        </p>
        <p>
          <strong>With deep gratitude</strong> to the researchers, writers, and
          organizations whose work is featured on this platform.
        </p>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-section">
          <a
            href="https://www.whatdoyouknowaboutlove.com/viepaula"
            target="_blank"
            rel="noopener noreferrer"
          >
            About the Developer
          </a>
        </div>
        <div className="footer-section">
          <p>
            If you notice any inaccuracies, errors in citations, or have
            articles to contribute, please email:
          </p>
          <a
            href="mailto:whatdoyouknowaboutcovid19@gmail.com"
            className="email"
          >
            WhatDoYouKnowAboutCovid19@gmail.com
          </a>
        </div>
        <div className="footer-section">
          <p>
            Thank you to these people and organizations whose resources and
            knowledge I've learned from:
          </p>
          <div className="button-container">
            <a
              href="https://www.the-sentinel-intelligence.net/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Jessica Wildfire
            </a>
            <a
              href="https://www.instagram.com/JaydoCovid"
              target="_blank"
              rel="noopener noreferrer"
            >
              Jaydo Covid
            </a>
            <a
              href="https://cleanairclub.org/home"
              target="_blank"
              rel="noopener noreferrer"
            >
              Clean Air Club
            </a>
            <a
              href="https://libguides.mskcc.org/CovidImpacts/Home"
              target="_blank"
              rel="noopener noreferrer"
            >
              Memorial Sloan Kettering Library
            </a>
            <a
              href="https://peoplescdc.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              People's CDC
            </a>
            <a
              href="https://www.instagram.com/shishi.rose/"
              target="_blank"
              rel="noopener noreferrer"
            >
              ShiShi Rose
            </a>
            <a
              href="https://youhavetoliveyour.life/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chris
            </a>
            <a
              href="https://www.instagram.com/thesicktimes/"
              target="_blank"
              rel="noopener noreferrer"
            >
              The Sick Times
            </a>
            <a
              href="https://www.instagram.com/crutches_and_spice/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Imani Barbarin
            </a>
            <a
              href="https://www.instagram.com/masktogetheramerica/"
              target="_blank"
              rel="noopener noreferrer"
            >
              MaskTogetherAmerica
            </a>
            <a
              href="https://www.patreon.com/violetblue"
              target="_blank"
              rel="noopener noreferrer"
            >
              Violet Blue
            </a>
            <a
              href="https://www.instagram.com/lizzie_traveler_public/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Lizzie
            </a>
            <a
              href="https://www.thegauntlet.news/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Julia Doubleday
            </a>
          </div>
        </div>
        <p>Your contributions have not only informed this project but also inspired its mission. Thank you for your courage and dedication.
        </p>
        <p>© 2025 What Do You Know About COVID-19?</p>
      </footer>
    </div>
  );
};

export default ArticlesPage;
