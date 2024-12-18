import React from 'react';

// Format date using UTC components to avoid timezone discrepancies
const formatDate = (dateString) => {
  if (!dateString) return 'Unknown Date';

  const date = new Date(dateString);
  const year = date.getUTCFullYear();
  const month = date.toLocaleString('default', { month: 'long', timeZone: 'UTC' });
  const day = date.getUTCDate();

  return `${month} ${day}, ${year}`;
};

const ArticleCard = ({ article }) => (
  <div className="article-card">
    <h3 dangerouslySetInnerHTML={{ __html: article.title }}></h3>
    <p dangerouslySetInnerHTML={{ __html: article.summary }}></p>
    <p>
      <strong>Author(s):</strong>{' '}
      <span dangerouslySetInnerHTML={{ __html: article.authors.join(', ') }}></span>
    </p>
    <p>
      <strong>Source:</strong>{' '}
      <span dangerouslySetInnerHTML={{ __html: article.source }}></span>
    </p>
    <p>
      <strong>Published:</strong> {formatDate(article.date_published)}
    </p>
    <p>
      <strong>Category:</strong>{' '}
      <span dangerouslySetInnerHTML={{ __html: article.category }}></span>
    </p>
    <p>
      <strong>Tags:</strong>{' '}
      <span dangerouslySetInnerHTML={{ __html: article.tags.join(', ') }}></span>
    </p>
    {/* Style the <a> tag to look like a button */}
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="button-link"
    >
      View Article
    </a>
  </div>
);

export default ArticleCard;
