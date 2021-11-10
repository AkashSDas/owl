import { Router } from "express";
import { createExpertise } from "../controllers/expertise/create";
import { deleteExpertise } from "../controllers/expertise/delete";
import { getAllExpertise } from "../controllers/expertise/get_all";
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
