import { Router } from "express";

import {
  updateOfferDecision,
} from "../controllers/offer.controller";

const router = Router();

router.post(
  "/:id/decision",
  updateOfferDecision
);

export default router;