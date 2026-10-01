import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { connectDB } from "./config/db.js";

import authRoutes from "./routes/auth.js";
import courseRoutes from "./routes/courses.js";
import quizRoutes from "./routes/quizzes.js";
import questionRoutes from "./routes/questions.js";
import materialRoutes from "./routes/materials.js";
import aiRoutes from "./routes/ai.js";
import progressRoutes from "./routes/progress.js";
import leaderboardRoutes from "./routes/leaderboard.js";
import notificationRoutes from "./routes/notifications.js";
import adminRoutes from "./routes/admin.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env") });
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Mount REST API Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/materials", materialRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/admin", adminRoutes);

// API Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    app: "CSE Prep Academic Platform API",
    institution: "Pabna University of Science and Technology (PUST)",
    curriculum: "B.Sc. Engineering in CSE (Session 2020-2021)",
    totalCredits: 165,
    timestamp: new Date().toISOString()
  });
});

// Serve frontend build if dist exists
const distPath = path.join(__dirname, "../frontend/dist");
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get("*", (req, res) => {
    if (!req.path.startsWith("/api/")) {
      res.sendFile(path.join(distPath, "index.html"));
    }
  });
}

// Initialize DB and start server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log("==================================================================");
    console.log(`🎓 CSE Prep Full-Stack Platform running on http://localhost:${PORT}`);
    console.log("   PUST B.Sc. Engineering CSE Curriculum: 8 Terms, 165 Credits");
    console.log("   React Frontend + Node.js REST API + MongoDB Mongoose layer");
    console.log("==================================================================");
  });
};

startServer();
