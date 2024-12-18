import React from 'react';

// Format date using UTC components to avoid timezone discrepancies
const formatDate = (dateString) => {
  if (!dateString) return 'Unknown Date'; // Handle missing dates

  const date = new Date(dateString);

  // Extract the UTC components of the date
  const year = date.getUTCFullYear();
  const month = date.toLocaleString('default', { month: 'long', timeZone: 'UTC' });
  const day = date.getUTCDate();

  return `${month} ${day}, ${year}`; // Format as "Month Day, Year"
};

const ArticleCard = ({ article }) => (
  <div className="article-card">
    <h3
      dangerouslySetInnerHTML={{
        __html: article.title, // Render title with <mark> tags as HTML
      }}
    ></h3>
    <p
      dangerouslySetInnerHTML={{
        __html: article.summary, // Render summary with <mark> tags as HTML
      }}
    ></p>
    <p>
      <strong>Author(s):</strong>{' '}
      <span
        dangerouslySetInnerHTML={{
          __html: article.authors.join(', '), // Render authors with <mark> tags as HTML
        }}
      ></span>
    </p>
    <p>
      <strong>Source:</strong>{' '}
      <span
        dangerouslySetInnerHTML={{
          __html: article.source, // Render source with <mark> tags as HTML
        }}
      ></span>
    </p>
    <p>
      <strong>Published:</strong> {formatDate(article.date_published)}
    </p>
    <p>
      <strong>Category:</strong>{' '}
      <span
        dangerouslySetInnerHTML={{
          __html: article.category, // Render category with <mark> tags as HTML
        }}
      ></span>
    </p>
    <p>
      <strong>Tags:</strong>{' '}
      <span
        dangerouslySetInnerHTML={{
          __html: article.tags.join(', '), // Render tags with <mark> tags as HTML
        }}
      ></span>
    </p>
    <a href={article.url} target="_blank" rel="noopener noreferrer">
      <button>View Article</button>
    </a>
  </div>
);

export default ArticleCard;
