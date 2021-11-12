import { Router } from "express";
import { login, signup, logout } from "../controllers/auth";
import { validationCheck } from "../middlewares/express_validation";
import { loginValidation, signupValidation } from "../validators";

export const router = Router();

router.post("/signup", signupValidation, validationCheck, signup);
router.post("/login", loginValidation, validationCheck, login);
router.get("/logout", logout);
