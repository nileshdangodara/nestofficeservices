import express from "express";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";

import connectDB from "./config/db.js";
import contactRoutes from "./routes/contactRoutes.js";
import { contactLimiter, globalLimiter } from "./middleware/rateLimiter.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
app.set("trust proxy", 1);
// Connect to MongoDB
connectDB();

// Security headers
app.use(helmet());

// CORS
const allowedOrigins = [
  process.env.CLIENT_URL || "http://localhost:5173",
  "http://localhost:5173",
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: false,
  })
);

// Body size limit & JSON parsing
app.use(express.json({ limit: "16kb" }));

// Global rate limit
app.use(globalLimiter);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ success: true, message: "API is running" });
});

// Contact route — tighter rate limit
app.use("/api/contact", contactLimiter, contactRoutes);

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ success: false, message: "Endpoint not found." });
});

// Centralised error handler (must be last)
app.use(errorHandler);

export default app;

