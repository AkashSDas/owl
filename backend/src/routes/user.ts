import { Router } from "express";
import { becomeAdmin, becomeTeacher } from "../controllers/user/roles";
import { isAuthenticated, isLoggedIn } from "../middlewares/auth";
import { validationCheck } from "../middlewares/express_validation";
import { getUserById } from "../middlewares/user";
import { teacherValidation } from "../validators";

export const router = Router();

// Params
router.param("userId", getUserById);

// Roles
router.get("/:userId/roles/create-admin", isLoggedIn, isAuthenticated, becomeAdmin);
router.post(
  "/:userId/roles/create-teacher",
  isLoggedIn,
  isAuthenticated,
  teacherValidation,
  validationCheck,
  becomeTeacher
);
