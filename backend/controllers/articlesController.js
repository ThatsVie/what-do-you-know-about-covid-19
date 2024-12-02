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

    // Search by keyword in title or summary
    if (req.query.search) {
      query.$or = [
        { title: new RegExp(req.query.search, "i") },
        { summary: new RegExp(req.query.search, "i") },
      ];
    }

    // Pagination or "see all"
    const page = req.query.all === "true" ? 1 : parseInt(req.query.page, 10) || 1;
    const limit = req.query.all === "true" ? 0 : parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const articles = await Article.find(query)
      .sort({ date_published: -1 }) // Default sorting
      .skip(skip)
      .limit(limit);

    const totalArticles = await Article.countDocuments(query);

    res.status(200).json({
      articles,
      totalArticles,
      currentPage: page,
      totalPages: limit ? Math.ceil(totalArticles / limit) : 1,
    });
  } catch (err) {
    console.error("Error fetching articles:", err);
    res.status(500).json({ error: "An error occurred while fetching articles." });
  }
};

module.exports = { getAllArticles };
