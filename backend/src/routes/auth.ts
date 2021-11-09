import { Router } from "express";
import { login } from "../controllers/auth/login";
import { logout } from "../controllers/auth/logout";
import { signup } from "../controllers/auth/signup";
import { validationCheck } from "../middlewares/express_validation";
import { loginValidation, signupValidation } from "../validators";

export const router = Router();

router.post("/signup", signupValidation, validationCheck, signup);
router.post("/login", loginValidation, validationCheck, login);
router.get("/logout", logout);