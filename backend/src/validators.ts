import { check } from "express-validator";

export const signupValidation = [
  check("email", "Email is required").isEmail(),
  check("username", "Username should have atleast 3 character").isLength({ min: 3 }),
  check("password", "Password should have atleast 6 characters").isLength({ min: 6 }),
];

export const loginValidation = [
  check("email", "Email is required").isEmail(),
  check("password", "Password should have atleast 6 characters").isLength({ min: 6 }),
];
