const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

// Connect to database
connectDB();

const app = express();

// Middleware
const corsOriginEnv = process.env.CORS_ORIGIN || "";
const allowedOrigins = corsOriginEnv
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins.length > 0 ? allowedOrigins : true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/users", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

// Basic route for testing
app.get("/", (req, res) => {
    res.send("API is running...");
});

app.get("/health", (req, res) => {
  res.status(200).json({ ok: true });
});

// Error handling middleware (optional but recommended)
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
});

app.listen(port, () => console.log(`Server started on port ${port}`));
