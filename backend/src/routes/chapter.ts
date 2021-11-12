import { Router } from "express";
import { createChapterAndPushToCourseChapters, updateChapter } from "../controllers/chapter";
import { isAuthenticated, isLoggedIn, isTeacher } from "../middlewares/auth";
import { getCourseChaptersByCourseId } from "../middlewares/course_chapters";
import { getUserById } from "../middlewares/user";
import { getChapterById } from "../middlewares/chapter";

export const router = Router();

// Param
router.param("userId", getUserById);
router.param("courseId", getCourseChaptersByCourseId);
router.param("chapterId", getChapterById);

// Route
router.post(
  "/:courseId/:userId",
  isLoggedIn,
  isAuthenticated,
  isTeacher,
  createChapterAndPushToCourseChapters
);
router.put("/:chapterId/:userId", isLoggedIn, isAuthenticated, isTeacher, updateChapter);
