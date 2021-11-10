import { Router } from "express";
import { createCourse } from "../controllers/course/create";
import { isAuthenticated, isLoggedIn, isTeacher } from "../middlewares/auth";
import { getTeacherById } from "../middlewares/teacher";

export const router = Router();

// Params
router.param("teacherId", getTeacherById);

// Routes
router.post("/:teacherId", isLoggedIn, isAuthenticated, isTeacher, createCourse);
