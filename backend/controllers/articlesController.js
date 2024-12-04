const Article = require("../models/Article");

let escapeStringRegexp; // Placeholder for the escape-string-regexp function

(async () => {
  // Dynamically import the ES module
  const module = await import("escape-string-regexp");
  escapeStringRegexp = module.default; // Assign the default export to escapeStringRegexp
})();

const getAllArticles = async (req, res) => {
  try {
    const query = {};
    const searchKeyword = req.query.search
      ? escapeStringRegexp(req.query.search)
      : ""; // Sanitize the search keyword
    let isKeywordSearch = false; // Flag to track if the search is keyword-based

    // Filter by year
    if (req.query.year) {
      query.year = parseInt(req.query.year, 10);
    }

    // Filter by category
    if (req.query.category) {
      query.category = new RegExp(req.query.category, "i");
    }

    // Search by keyword in multiple fields
    if (searchKeyword) {
      isKeywordSearch = true; // Set flag to true for keyword search
      const searchRegex = new RegExp(searchKeyword, "i"); // Use sanitized keyword
      query.$or = [
        { title: searchRegex },
        { summary: searchRegex },
        { authors: searchRegex },
        { source: searchRegex },
        { category: searchRegex },
        { tags: searchRegex },
      ];
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    // Sorting
    const sortOrder = req.query.order === "asc" ? 1 : -1;

    const articles = await Article.find(query)
      .sort({ date_published: sortOrder })
      .skip(skip)
      .limit(limit);

    const totalArticles = await Article.countDocuments(query);

    // Highlight the keyword in the results if it's a keyword-based search
    const highlightedArticles = articles.map((article) => {
      const highlightField = (field) => {
        if (typeof field === "string") {
          return field.replace(
            new RegExp(`(${searchKeyword})`, "gi"),
            "<mark>$1</mark>"
          );
        } else if (Array.isArray(field)) {
          return field.map((item) =>
            typeof item === "string" ? highlightField(item) : item
          );
        }
        return field; // If the field is not a string or array, return as is
      };

      return {
        ...article.toObject(),
        title: isKeywordSearch ? highlightField(article.title) : article.title,
        summary: isKeywordSearch
          ? highlightField(article.summary)
          : article.summary,
        authors: isKeywordSearch
          ? highlightField(article.authors)
          : article.authors,
        source: isKeywordSearch
          ? highlightField(article.source)
          : article.source,
        category: isKeywordSearch
          ? highlightField(article.category)
          : article.category,
        tags: isKeywordSearch ? highlightField(article.tags) : article.tags,
      };
    });

    res.status(200).json({
      articles: highlightedArticles,
      totalArticles,
      currentPage: page,
      totalPages: Math.ceil(totalArticles / limit),
    });
  } catch (err) {
    console.error("Error fetching articles:", err);
    res.status(500).json({ error: "An error occurred while fetching articles." });
  }
};

module.exports = { getAllArticles };
