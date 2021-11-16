/**
 * base router for this is `/course`
 */

import { Router } from "express";
import {
  createCourse,
  deleteCourse,
  publishCourse,
  updateCoursePublicData,
} from "../controllers/course";
import { isAuthenticated, isLoggedIn } from "../middlewares/auth";
import { getCourseById } from "../middlewares/course";
import { validationCheck } from "../middlewares/express_validation";
import { getUserById, isTeacher } from "../middlewares/user";
import { courseCreateValidation } from "../validators";

export const router = Router();

/**
 * Params
 */
router.param("userId", getUserById);
router.param("courseId", getCourseById);

/**
 * Routes
 */

// Create course when requested by a teacher
router.post(
  "/:userId",
  isLoggedIn,
  isAuthenticated,
  isTeacher,
  courseCreateValidation,
  validationCheck,
  createCourse
);

// Update a course when requested by a teacher
router.put(
  "/:userId/:courseId",
  isLoggedIn,
  isAuthenticated,
  isTeacher,
  updateCoursePublicData
);

// Delete course when requested by a teacher
router.delete(
  "/:userId/:courseId",
  isLoggedIn,
  isAuthenticated,
  isTeacher,
  deleteCourse
);

// Publish the course when requested by a teacher
router.post(
  "/:userId/:courseId",
  isLoggedIn,
  isAuthenticated,
  isTeacher,
  publishCourse
);
