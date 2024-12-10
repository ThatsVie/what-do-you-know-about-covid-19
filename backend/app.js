const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const winston = require("winston");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

// Winston Logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(), // Console logging for serverless environments
  ],
});

// Middleware
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*", // Allow all origins for now
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(morgan("dev"));

// Logging each request
app.use((req, res, next) => {
  logger.info(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// MongoDB Connection with Retry Mechanism
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info("Connected to MongoDB");
  } catch (err) {
    logger.error("MongoDB connection error:", err);
    setTimeout(connectToMongoDB, 5000); // Retry after 5 seconds
  }
};

connectToMongoDB();

// Swagger Docs Setup
app.use("/api-docs", swaggerUi.serve, (req, res) => {
  res.setHeader("Content-Security-Policy", "script-src 'self'");
  swaggerUi.setup(swaggerDocument)(req, res);
});

// Routes
const articlesRouter = require("./routes/articles");
app.use("/api/articles", articlesRouter);

// Root Route for Testing
app.get("/", (req, res) => {
  res.send("Welcome to What Do You Know About COVID-19? API!");
});

// Handle 404 for Unhandled Routes
app.use((req, res) => {
  logger.warn(`Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ error: "Route not found" });
});

// Start Server
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

module.exports = app;
