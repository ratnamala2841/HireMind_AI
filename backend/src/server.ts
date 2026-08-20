import applicationRoutes from "./routes/application.routes";
import resumeRoutes from "./routes/resume.routes";
import candidateRoutes from "./routes/candidate.routes";
import jobRoutes from "./routes/job.routes";
import companyRoutes from "./routes/company.routes";
import authRoutes from "./routes/auth.routes";
import prisma from "./lib/prisma";
import express from "express";
import cors from "cors";
import "dotenv/config";
import skillRoutes from "./routes/skill.routes";
import jobSkillRoutes from "./routes/jobSkill.routes";
import aiRoutes from "./routes/ai.routes";
import interviewRoutes from "./routes/interview.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api/resumes", resumeRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/jobs", jobSkillRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/interviews", interviewRoutes);

app.get("/api/health", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.json({
      success: true,
      message: "HireMind AI backend is running",
      database: "connected",
    });
  } catch (error) {
    console.error("Database connection failed:", error);

    res.status(500).json({
      success: false,
      message: "Backend is running but database connection failed",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`HireMind AI backend running on port ${PORT}`);
});