import { Router } from "express";
import { createCourse, deleteCourse, updateCoursePublicMetadata } from "../controllers/course";
import { isAuthenticated, isLoggedIn, isTeacher } from "../middlewares/auth";
import { getCourseById } from "../middlewares/course";
import { validationCheck } from "../middlewares/express_validation";
import { getUserById } from "../middlewares/user";
import { courseCreateValidation } from "../validators";

export const router = Router();

// Params
router.param("userId", getUserById);
router.param("courseId", getCourseById);

// Routes
router.post(
  "/:userId",
  isLoggedIn,
  isAuthenticated,
  isTeacher,
  courseCreateValidation,
  validationCheck,
  createCourse
);
router.put(
  "/:courseId/:userId",
  isLoggedIn,
  isAuthenticated,
  isTeacher,
  updateCoursePublicMetadata
);
router.delete("/:courseId/:userId", isLoggedIn, isAuthenticated, isTeacher, deleteCourse);
