import { Router } from "express";
import {
  create,
  getCompanies,
  getCompanyById,
  update,
  remove,
} from "../controllers/company.controller";
import { authenticate } from "../middleware/auth.middleware";


const router = Router();

router.post("/", authenticate, create);
router.get("/", authenticate, getCompanies);
router.get("/:id", authenticate, getCompanyById);
router.put("/:id", authenticate, update);
router.delete("/:id", authenticate, remove);

export default router;