import { Router } from "express";

import {
  applyForJob,
  getMyApplications,
  getMyApplicationById,
} from "../controllers/application.controller";

import { authenticate } from "../middleware/auth.middleware";

const router = Router();

// ============================================================
// CANDIDATE APPLICATION ROUTES
// ============================================================

// Apply for a job
router.post(
  "/",
  authenticate,
  applyForJob
);

// Get all applications of logged-in candidate
router.get(
  "/my",
  authenticate,
  getMyApplications
);

// Get one application
router.get(
  "/:id",
  authenticate,
  getMyApplicationById
);

export default router;