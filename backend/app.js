const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(morgan("dev"));

// Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: "Too many requests, please try again later.",
});
app.use("/api", apiLimiter);

// API Key Protection for Sensitive Routes
app.use("/api/articles", (req, res, next) => {
  const sensitiveMethods = ["POST", "PUT", "PATCH", "DELETE"];
  if (sensitiveMethods.includes(req.method)) {
    const apiKey = req.headers["x-api-key"];
    if (apiKey !== process.env.API_KEY) {
      return res.status(403).json({ error: "Forbidden: Invalid API Key" });
    }
  }
  next();
});

// MongoDB Connection with Retry Mechanism
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    setTimeout(connectToMongoDB, 5000); // Retry after 5 seconds
  }
};

connectToMongoDB();

// Routes
const articlesRouter = require("./routes/articles");
app.use("/api/articles", articlesRouter);

// Root Route for Testing
app.get("/", (req, res) => {
  res.send("Welcome to What Do You Know About COVID-19? API!");
});

// Handle 404 for Unhandled Routes
app.use((req, res) => {
  console.warn(`Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ error: "Route not found" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
