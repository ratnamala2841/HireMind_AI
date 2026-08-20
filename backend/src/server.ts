import express from "express";
import cors from "cors";
import "dotenv/config";

import prisma from "./lib/prisma";

import authRoutes from "./routes/auth.routes";
import companyRoutes from "./routes/company.routes";
import jobRoutes from "./routes/job.routes";
import applicationRoutes from "./routes/application.routes";
import offerRoutes from "./routes/offer.routes";

const app = express();

/* ============================================================
   MIDDLEWARE
   ============================================================ */

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

/* ============================================================
   API ROUTES
   ============================================================ */

app.use("/api/auth", authRoutes);

app.use("/api/companies", companyRoutes);

app.use("/api/jobs", jobRoutes);

app.use("/api/applications", applicationRoutes);

/*
   HR OFFER ROUTES

   Includes:
   POST /api/offers/:id/decision

   This is isolated from the existing
   Candidate and Recruiter routes.
*/
app.use("/api/offers", offerRoutes);

/* ============================================================
   HEALTH CHECK
   ============================================================ */

app.get("/api/health", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.status(200).json({
      success: true,
      message: "HireMind AI backend is running",
      database: "connected",
    });
  } catch (error) {
    console.error(
      "Database connection failed:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Backend is running but database connection failed",
    });
  }
});

/* ============================================================
   ROOT ROUTE
   ============================================================ */

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "HireMind AI API is running",
  });
});

/* ============================================================
   404 HANDLER
   ============================================================ */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    method: req.method,
    path: req.originalUrl,
  });
});

/* ============================================================
   ERROR HANDLER
   ============================================================ */

app.use(
  (
    error: any,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error(
      "Unhandled server error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
);

/* ============================================================
   START SERVER
   ============================================================ */

const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
  console.log(
    `HireMind AI backend running on port ${PORT}`
  );

  console.log(
    `Health: http://localhost:${PORT}/api/health`
  );

  console.log(
    `Jobs: http://localhost:${PORT}/api/jobs`
  );

  console.log(
    `Applications: http://localhost:${PORT}/api/applications`
  );

  console.log(
    `Offers: http://localhost:${PORT}/api/offers`
  );
});