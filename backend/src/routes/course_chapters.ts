import { Router } from "express";
import { createCourseChapters } from "../controllers/course_chapters/create";
import { isAuthenticated, isLoggedIn, isTeacher } from "../middlewares/auth";
import { getCourseById } from "../middlewares/course";
import { getUserById } from "../middlewares/user";

export const router = Router();

// Params
router.param("courseId", getCourseById);
router.param("userId", getUserById);

// Routes
router.post("/:courseId/:userId", isLoggedIn, isAuthenticated, isTeacher, createCourseChapters);
