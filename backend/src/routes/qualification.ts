import { Router } from "express";
import { createQualification } from "../controllers/qualification/create";
import { deleteQualification } from "../controllers/qualification/delete";
import { getAllQualifications } from "../controllers/qualification/get_all";
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
