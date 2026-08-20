import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware";

import {
  scheduleInterview,
  getInterview,
  getApplicationInterviews,
  getCandidateInterviews,
  editInterview,
  changeInterviewStatus,
  cancelInterview,
  removeInterview,
} from "../controllers/interview.controller";

const router = Router();

router.post(
  "/",
  authenticate,
  scheduleInterview
);

router.get(
  "/application/:applicationId",
  authenticate,
  getApplicationInterviews
);

router.get(
  "/candidate/:candidateId",
  authenticate,
  getCandidateInterviews
);

router.get(
  "/:id",
  authenticate,
  getInterview
);

router.put(
  "/:id",
  authenticate,
  editInterview
);

router.patch(
  "/:id/status",
  authenticate,
  changeInterviewStatus
);

router.patch(
  "/:id/cancel",
  authenticate,
  cancelInterview
);

router.delete(
  "/:id",
  authenticate,
  removeInterview
);

export default router;