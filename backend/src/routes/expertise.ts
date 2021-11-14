/**
 * base route for expertise is `/expertise`
 */

import { Router } from "express";
import {
  createExpertise,
  getAllExpertise,
  deleteExpertise,
} from "../controllers/expertise";
import { isAuthenticated, isLoggedIn } from "../middlewares/auth";
import { getExpertiseById } from "../middlewares/expertise";
import { validationCheck } from "../middlewares/express_validation";
import { getUserById, isAdmin } from "../middlewares/user";
import { qualificationValidation } from "../validators";

export const router = Router();

/**
 * Params
 */
router.param("userId", getUserById);
router.param("expertiseId", getExpertiseById);

/**
 * Routes
 */

// Get all expertise
router.get("/", getAllExpertise);

// Create expertise when requested by an admin
router.post(
  "/:userId",
  isLoggedIn,
  isAuthenticated,
  isAdmin,
  qualificationValidation,
  validationCheck,
  createExpertise
);

// Delete expertise when requested by an admin
router.delete(
  "/:userId/:expertiseId",
  isLoggedIn,
  isAuthenticated,
  isAdmin,
  deleteExpertise
);
