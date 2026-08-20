import { Router } from "express";
import {
  addSkill,
  getSkills,
  removeSkill,
} from "../controllers/jobSkill.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/:jobId/skills", authenticate, addSkill);
router.get("/:jobId/skills", getSkills);
router.delete("/:jobId/skills/:skillId", authenticate, removeSkill);

export default router;