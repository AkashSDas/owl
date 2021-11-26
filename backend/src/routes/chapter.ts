/**
 * base route for this is `/chapter`
 */

import { Router } from "express";
import {
  createChapter,
  updateChapter,
  deleteChapter,
  getAllChaptersOfCourse,
  getChapter,
} from "../controllers/chapter";
import { isAuthenticated, isLoggedIn } from "../middlewares/auth";
import { getUserById, isTeacher } from "../middlewares/user";
import { getChapterById } from "../middlewares/chapter";
import { createChapterValidation } from "../validators";
import { validationCheck } from "../middlewares/express_validation";

export const router = Router();

/**
 * Params
 */
router.param("userId", getUserById);
router.param("chapterId", getChapterById);

/**
 * Routes
 */

// Get all chapters for a course
router.get("/:courseId", getAllChaptersOfCourse);

// Get a chapter
router.get("/:courseId/:chapterMongoId", getChapter);

// Create a chapter if requested by a teacher
router.post(
  "/:userId/:courseId",
  isLoggedIn,
  isAuthenticated,
  isTeacher,
  createChapterValidation,
  validationCheck,
  createChapter
);

// Update the given chapter if requested by a teacher
// TODO: add some validation checks for updating chapter
router.put(
  "/:userId/:courseId/:chapterId",
  isLoggedIn,
  isAuthenticated,
  isTeacher,
  updateChapter
);

// Delete chapter if requested by a teacher
router.delete(
  "/:userId/:courseId/:chapterId",
  isLoggedIn,
  isAuthenticated,
  isTeacher,
  deleteChapter
);
