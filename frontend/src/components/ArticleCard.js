import React from "react";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const ArticleCard = ({ article }) => (
  <div className="article-card">
    <h3>{article.title}</h3>
    <p>{article.summary}</p>
    <p>
      <strong>Author(s):</strong> {article.authors.join(", ")}
    </p>
    <p>
      <strong>Source:</strong> {article.source}
    </p>
    <p>
      <strong>Published:</strong> {formatDate(article.date_published)}
    </p>
    <p>
      <strong>Category:</strong> {article.category}
    </p>
    <p>
      <strong>Tags:</strong> {article.tags.join(", ")}
    </p>
    <a href={article.url} target="_blank" rel="noopener noreferrer">
      <button>Read More</button>
    </a>
  </div>
);

export default ArticleCard;
