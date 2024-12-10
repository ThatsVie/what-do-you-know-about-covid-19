const express = require("express");
const router = express.Router();
const { getAllArticles } = require("../controllers/articlesController");

// Route for fetching articles with filters
router.get("/", async (req, res, next) => {
  try {
    await getAllArticles(req, res);
  } catch (error) {
    next(error); // Pass error to error handling middleware
  }
});

module.exports = router;
