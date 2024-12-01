const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    authors: { type: [String], required: true },
    source: { type: String, required: true },
    date_published: { type: Date, required: true },
    year: { type: Number, required: true },
    category: { type: String, required: true },
    tags: { type: [String], default: [] },
    summary: { type: String, required: true },
    url: { type: String, required: true },
    date_added: { type: Date, default: Date.now },
  },
  { collection: "articles" }
);

module.exports = mongoose.model("Article", ArticleSchema);
