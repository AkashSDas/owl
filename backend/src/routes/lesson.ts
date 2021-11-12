import { Router } from "express";
import { createLessonAndPushToChapter, deleteLesson, updateLesson } from "../controllers/lesson";
import { isAuthenticated, isLoggedIn, isTeacher } from "../middlewares/auth";
import { getChapterById } from "../middlewares/chapter";
import { getCourseById } from "../middlewares/course";
import { getLessonById } from "../middlewares/lesson";
import { getUserById } from "../middlewares/user";

export const router = Router();

// Param
router.param("courseId", getCourseById);
router.param("chapterId", getChapterById);
router.param("userId", getUserById);
router.param("lessonId", getLessonById);

// Route
router.post(
  "/:courseId/:chapterId/:userId",
  isLoggedIn,
  isAuthenticated,
  isTeacher,
  createLessonAndPushToChapter
);

router.put("/:lessonId/:courseId/:userId", isLoggedIn, isAuthenticated, isTeacher, updateLesson);

router.delete(
  "/:lessonId/:chapterId/:courseId/:userId",
  isLoggedIn,
  isAuthenticated,
  isTeacher,
  deleteLesson
);
