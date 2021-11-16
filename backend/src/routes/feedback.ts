import { Router } from "express";
import { createFeedback, updateFeedback } from "../controllers/feedback";
import { isAuthenticated, isLoggedIn } from "../middlewares/auth";
import { getFeedbackById } from "../middlewares/feedback";
import { validationCheck } from "../middlewares/express_validation";
import { feedbackCreateValidation } from "../validators";

export const router = Router();

/**
 * Params
 */
router.param("feedbackId", getFeedbackById);

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

// Update feedback
router.put("/:userId/:feedbackId", isLoggedIn, isAuthenticated, updateFeedback);
