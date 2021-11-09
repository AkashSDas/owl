import { Router } from "express";
import { becomeAdmin, becomeTeacher } from "../controllers/user/roles";
import { isAuthenticated, isLoggedIn } from "../middlewares/auth";
import { getUserById } from "../middlewares/user";

export const router = Router();

// Params
router.param("userId", getUserById);

// Roles
router.get("/:userId/roles/create-admin", isLoggedIn, isAuthenticated, becomeAdmin);
router.get("/:userId/roles/create-teacher", isLoggedIn, isAuthenticated, becomeTeacher);
