const express = require("express");
const router = express.Router();
const { getAllArticles } = require("../controllers/articlesController");

// Route for fetching articles with filters
router.get("/", getAllArticles);

module.exports = router;
