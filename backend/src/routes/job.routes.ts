import { Router } from "express";
import {
  create,
  getAll,
  getOne,
  update,
  remove,
  updateStatus,
} from "../controllers/job.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/", authenticate, create);
router.get("/", authenticate, getAll);
router.get("/:id", authenticate, getOne);
router.put("/:id", authenticate, update);
router.delete("/:id", authenticate, remove);
router.put("/:id/status", authenticate, updateStatus);

export default router;