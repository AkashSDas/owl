import { Router } from "express";
import { login } from "../controllers/auth/login";
import { logout } from "../controllers/auth/logout";
import { signup } from "../controllers/auth/signup";
import { loginValidation, signupValidation } from "../validators";

export const router = Router();

router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);
router.get("/logout", logout);
