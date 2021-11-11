import { Router } from "express";
import { createCourse } from "../controllers/course/create";
import { isAuthenticated, isLoggedIn, isTeacher } from "../middlewares/auth";
import { validationCheck } from "../middlewares/express_validation";
import { getUserById } from "../middlewares/user";
import { courseCreateValidation } from "../validators";

export const router = Router();

// Params
router.param("userId", getUserById);

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
