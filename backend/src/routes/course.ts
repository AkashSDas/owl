import { Router } from "express";
import { createCourse } from "../controllers/course/create";
import { isAuthenticated, isLoggedIn, isTeacher } from "../middlewares/auth";
import { validationCheck } from "../middlewares/express_validation";
import { getTeacherById } from "../middlewares/teacher";
import { courseCreateValidation } from "../validators";

export const router = Router();

// Params
router.param("teacherId", getTeacherById);

// Routes
router.post(
  "/:teacherId",
  isLoggedIn,
  isAuthenticated,
  isTeacher,
  courseCreateValidation,
  validationCheck,
  createCourse
);
