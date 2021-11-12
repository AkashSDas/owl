import { Router } from "express";
import { createExpertise, getAllExpertise, deleteExpertise } from "../controllers/expertise";
import { isAdmin, isAuthenticated, isLoggedIn } from "../middlewares/auth";
import { getExpertiseById } from "../middlewares/expertise";
import { validationCheck } from "../middlewares/express_validation";
import { getUserById } from "../middlewares/user";
import { qualificationValidation } from "../validators";

export const router = Router();

// Params
router.param("userId", getUserById);
router.param("expertiseId", getExpertiseById);

// Routes
router.post(
  "/:userId",
  isLoggedIn,
  isAuthenticated,
  isAdmin,
  qualificationValidation,
  validationCheck,
  createExpertise
);
router.get("/", getAllExpertise);
router.delete("/:expertiseId/:userId", isLoggedIn, isAuthenticated, isAdmin, deleteExpertise);
