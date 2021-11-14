/**
 * base route for qualification is `/qualification`
 */

import { Router } from "express";
import {
  createQualification,
  deleteQualification,
  getAllQualifications,
} from "../controllers/qualification";
import { isAuthenticated, isLoggedIn } from "../middlewares/auth";
import { validationCheck } from "../middlewares/express_validation";
import { getQualificationById } from "../middlewares/qualification";
import { getUserById, isAdmin } from "../middlewares/user";
import { qualificationValidation } from "../validators";

export const router = Router();

/**
 * Params
 */
router.param("userId", getUserById);
router.param("qualificationId", getQualificationById);

/**
 * Routes
 */

// Get all qualifications
router.get("/", getAllQualifications);

// Create qualification when requested by an admin
router.post(
  "/:userId",
  isLoggedIn,
  isAuthenticated,
  isAdmin,
  qualificationValidation,
  validationCheck,
  createQualification
);

// Delete qualification when requested by an admin
router.delete(
  "/:userId/:qualificationId",
  isLoggedIn,
  isAuthenticated,
  isAdmin,
  deleteQualification
);
