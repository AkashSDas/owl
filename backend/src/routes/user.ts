/**
 * base route for user is `/user`
 */

import { Router } from "express";
import { becomeAdmin, becomeTeacher } from "../controllers/user";
import { isAuthenticated, isLoggedIn } from "../middlewares/auth";
import { validationCheck } from "../middlewares/express_validation";
import { getUserById } from "../middlewares/user";
import { teacherValidation } from "../validators";

export const router = Router();

/**
 * Params
 */
router.param("userId", getUserById);

/**
 * Routes
 */

// Become admin
router.post("/:userId/roles/admin", isLoggedIn, isAuthenticated, becomeAdmin);

// Become teacher
router.post(
  "/:userId/roles/teacher",
  isLoggedIn,
  isAuthenticated,
  teacherValidation,
  validationCheck,
  becomeTeacher
);
