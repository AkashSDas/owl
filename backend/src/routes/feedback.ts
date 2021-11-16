import { Router } from "express";
import { createFeedback } from "../controllers/feedback";
import { isAuthenticated, isLoggedIn } from "../middlewares/auth";
import { validationCheck } from "../middlewares/express_validation";
import { feedbackCreateValidation } from "../validators";

export const router = Router();

/**
 * Routes
 */

// Create a feedback
router.post(
  "/:userId/:courseId",
  isLoggedIn,
  isAuthenticated,
  feedbackCreateValidation,
  validationCheck,
  createFeedback
);
