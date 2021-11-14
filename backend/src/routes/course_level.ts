/**
 * base route for course level is `/course-level`
 */

import { Router } from "express";
import {
  createCourseLevel,
  deleteCourseLevel,
  getAllCourseLevels,
} from "../controllers/course_level";
import { isAuthenticated, isLoggedIn } from "../middlewares/auth";
import { getCourseLevelById } from "../middlewares/course_level";
import { validationCheck } from "../middlewares/express_validation";
import { getUserById, isAdmin } from "../middlewares/user";
import { qualificationValidation } from "../validators";

export const router = Router();

/**
 * Params
 */
router.param("userId", getUserById);
router.param("courseLevelId", getCourseLevelById);

/**
 * Routes
 */

// Get all course levels
router.get("/", getAllCourseLevels);

// Create course level when requested by an admin
router.post(
  "/:userId",
  isLoggedIn,
  isAuthenticated,
  isAdmin,
  qualificationValidation,
  validationCheck,
  createCourseLevel
);

// Delete course level when requested by an admin
router.delete(
  "/:userId/:courseLevelId",
  isLoggedIn,
  isAuthenticated,
  isAdmin,
  deleteCourseLevel
);
