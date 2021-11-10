import { Router } from "express";
import { createCourseLevel } from "../controllers/course_level/create";
import { deleteCourseLevel } from "../controllers/course_level/delete";
import { getAllCourseLevels } from "../controllers/course_level/get_all";
import { isAdmin, isAuthenticated, isLoggedIn } from "../middlewares/auth";
import { getCourseLevelById } from "../middlewares/course_level";
import { validationCheck } from "../middlewares/express_validation";
import { getUserById } from "../middlewares/user";
import { qualificationValidation } from "../validators";

export const router = Router();

// Params
router.param("userId", getUserById);
router.param("courseLevelId", getCourseLevelById);

// Routes
router.post(
  "/:userId",
  isLoggedIn,
  isAuthenticated,
  isAdmin,
  qualificationValidation,
  validationCheck,
  createCourseLevel
);
router.get("/", getAllCourseLevels);
router.delete("/:courseLevelId/:userId", isLoggedIn, isAuthenticated, isAdmin, deleteCourseLevel);
