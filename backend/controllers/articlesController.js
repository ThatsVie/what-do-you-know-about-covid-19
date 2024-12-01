const Article = require("../models/Article");

// Fetch all articles or filter by query
const getAllArticles = async (req, res) => {
  try {
    const query = {};

    // Filter by year
    if (req.query.year) {
      query.year = parseInt(req.query.year, 10);
    }

    // Filter by category
    if (req.query.category) {
      query.category = new RegExp(req.query.category, "i");
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const articles = await Article.find(query)
      .sort({ date_published: -1 })
      .skip(skip)
      .limit(limit);

    const totalArticles = await Article.countDocuments(query);

    res.status(200).json({
      articles,
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
