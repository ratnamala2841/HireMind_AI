import { Router } from "express";
import {
  create,
  getMyResumes,
  getOne,
  update,
  remove,
} from "../controllers/resume.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/", authenticate, create);
router.get("/me", authenticate, getMyResumes);
router.get("/:id", authenticate, getOne);
router.put("/:id", authenticate, update);
router.delete("/:id", authenticate, remove);

export default router;