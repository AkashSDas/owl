import { Router } from "express";
import { createChapterAndPushToCourseChapters } from "../controllers/chapter/create";
import { isAuthenticated, isLoggedIn, isTeacher } from "../middlewares/auth";
import { getCourseChaptersByCourseId } from "../middlewares/course_chapters";
import { getUserById } from "../middlewares/user";

export const router = Router();

// Param
router.param("userId", getUserById);
router.param("courseId", getCourseChaptersByCourseId);

// Route
router.post(
  "/:courseId/:userId",
  isLoggedIn,
  isAuthenticated,
  isTeacher,
  createChapterAndPushToCourseChapters
);
