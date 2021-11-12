import { Router } from "express";
import {
  createQualification,
  deleteQualification,
  getAllQualifications,
} from "../controllers/qualification";
import { isAdmin, isAuthenticated, isLoggedIn } from "../middlewares/auth";
import { validationCheck } from "../middlewares/express_validation";
import { getQualificationById } from "../middlewares/qualification";
import { getUserById } from "../middlewares/user";
import { qualificationValidation } from "../validators";

export const router = Router();

// Params
router.param("userId", getUserById);
router.param("qualificationId", getQualificationById);

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
router.get("/", getAllQualifications);
router.delete(
  "/:qualificationId/:userId",
  isLoggedIn,
  isAuthenticated,
  isAdmin,
  deleteQualification
);
