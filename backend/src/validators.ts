import { check } from "express-validator";

export const signupValidation = [
  check("email", "Email is required").exists(),
  check("username", "Username is required").exists(),
  check("dateOfBirth", "Date of birth is required").exists(),
  check("password", "Password is required").exists(),
  check("email", "Email has wrong format").isEmail(),
  check("dateOfBirth", "Date of birth has wrong format").isDate(),
  check("username", "Username should be atleast 3 characters").isLength({ min: 3 }),
  check("password", "Password should be atleast 6 characters").isLength({ min: 6 }),
];

export const loginValidation = [
  check("email", "Email is required").exists(),
  check("password", "Password is required").exists(),
  check("email", "Email has wrong format").isEmail(),
  check("password", "Password should be atleast 6 characters").isLength({ min: 6 }),
];

export const qualificationValidation = [
  check("name", "Name is required").exists(),
  check("emoji", "Emoji is required").exists(),
  check("name", "Name should be atleast 3 characters").isLength({ min: 3 }),
  check("emoji", "Emoji should be atmost 4 characters").isLength({ max: 4 }),
];
