import { Router } from "express";
import { createQualification } from "../controllers/qualification/create";
import { isAdmin, isAuthenticated, isLoggedIn } from "../middlewares/auth";
import { validationCheck } from "../middlewares/express_validation";
import { getUserById } from "../middlewares/user";
import { qualificationValidation } from "../validators";

export const router = Router();

// Params
router.param("userId", getUserById);

// Routes
router.post(
  "/:userId",
  isLoggedIn,
  isAuthenticated,
  isAdmin,
  qualificationValidation,
  validationCheck,
  createQualification
);
