 import { Router } from "express";
import {
  create,
  getMe,
  getOne,
  update,
} from "../controllers/candidate.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/", authenticate, create);
router.get("/me", authenticate, getMe);
router.get("/:id", authenticate, getOne);
router.put("/me", authenticate, update);

export default router;