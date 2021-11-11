import { Router } from "express";
import { createLessonAndPushToChapter } from "../controllers/lesson/create";
import { isAuthenticated, isLoggedIn, isTeacher } from "../middlewares/auth";
import { getChapterById } from "../middlewares/chapter";
import { getCourseById } from "../middlewares/course";
import { getUserById } from "../middlewares/user";

export const router = Router();

// Param
router.param("courseId", getCourseById);
router.param("chapterId", getChapterById);
router.param("userId", getUserById);

// Route
router.post(
  "/:courseId/:chapterId/:userId",
  isLoggedIn,
  isAuthenticated,
  isTeacher,
  createLessonAndPushToChapter
);
