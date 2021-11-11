import { Router } from "express";
import { createCourse } from "../controllers/course/create";
import { updateCoursePublicMetadata } from "../controllers/course/update";
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
