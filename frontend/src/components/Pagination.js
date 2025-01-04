import React from 'react';

const Pagination = ({ pagination, onPageChange }) => {
  const { currentPage, totalPages } = pagination;

  const handlePageChange = (newPage) => {
    onPageChange(newPage);

    // Scroll to the first article below the search-results-heading
    const firstArticle = document.querySelector('.articles-list');
    if (firstArticle) {
      const topPosition = firstArticle.getBoundingClientRect().top + window.scrollY - 20; // Adjust -20 for some spacing
      window.scrollTo({ top: topPosition, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="pagination">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
