import { Router } from "express";
import {
  create,
  getMyApplications,
  getOne,
  getByJob,
  updateStatus,
} from "../controllers/application.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

// Candidate
router.post("/", authenticate, create);
router.get("/me", authenticate, getMyApplications);

// Single application
router.get("/:id", authenticate, getOne);

// Recruiter
router.get("/job/:jobId", authenticate, getByJob);
router.put("/:id/status", authenticate, updateStatus);

export default router;