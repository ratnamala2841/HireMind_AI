import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { matchApplication } from "../controllers/ai.controller";

const router = Router();

router.post(
  "/match/:applicationId",
  authenticate,
  matchApplication
);

export default router;