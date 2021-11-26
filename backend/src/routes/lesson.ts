/**
 * base route for this is `/lesson`
 */

import { Router } from "express";
import {
  createLesson,
  deleteLesson,
  getAllLessonsOfChapter,
  getLesson,
  updateLesson,
} from "../controllers/lesson";
import { isAuthenticated, isLoggedIn } from "../middlewares/auth";
import { getChapterById } from "../middlewares/chapter";
import { getLessonById } from "../middlewares/lesson";
import { getUserById, isTeacher } from "../middlewares/user";

export const router = Router();

/**
 * Params
 */
router.param("userId", getUserById);
router.param("lessonId", getLessonById);
router.param("chapterMongoId", getChapterById);

/**
 * Routes
 */

// Get all lessons of a chapter
router.get("/:courseId/:chapterMongoId", getAllLessonsOfChapter);

// Get a lessons
router.get("/:courseId/:chapterId/:lessonMongoId", getLesson);

// Create lesson if requested by a teacher
// TODO: add some validation checks on req.body
router.post(
  "/:userId/:courseId/:chapterId",
  isLoggedIn,
  isAuthenticated,
  isTeacher,
  createLesson
);

// Update lesson if requested by a teacher
// TODO: add some validation checks on req.body
router.put(
  "/:userId/:courseId/:chapterId/:lessonId",
  isLoggedIn,
  isAuthenticated,
  isTeacher,
  updateLesson
);

// Delete a lesson if requested by a teacher
router.delete(
  "/:userId/:courseId/:chapterId/:lessonId",
  isLoggedIn,
  isAuthenticated,
  isTeacher,
  deleteLesson
);
