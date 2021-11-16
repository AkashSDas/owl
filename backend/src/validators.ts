/**
 * This file has all the express validators for req.body used
 * in this project
 */

import { check } from "express-validator";

export const signupValidation = [
  check("email", "Email is required").exists(),
  check("email", "Email has wrong format").isEmail(),
  check("username", "Username is required").exists(),
  check("username", "Username should be atleast 3 characters").isLength({
    min: 3,
  }),
  check("dateOfBirth", "Date of birth is required").exists(),
  check("dateOfBirth", "Date of birth has wrong format").isDate(),
  check("password", "Password is required").exists(),
  check("password", "Password should be atleast 6 characters").isLength({
    min: 6,
  }),
];

export const loginValidation = [
  check("email", "Email is required").exists(),
  check("email", "Email has wrong format").isEmail(),
  check("password", "Password is required").exists(),
  check("password", "Password should be atleast 6 characters").isLength({
    min: 6,
  }),
];

/**
 * This validator can be used for
 * - qualification
 * - expertise
 * - course level
 * Because all of them have same data shape
 */
export const qualificationValidation = [
  check("name", "Name is required").exists(),
  check("name", "Name should be atleast 3 characters").isLength({ min: 3 }),
  check("emoji", "Emoji is required").exists(),
  check("emoji", "Emoji should be atmost 4 characters").isLength({ max: 4 }),
];

/**
 * @todo
 * Add custom validator in qualification and expertise fields to check
 * whether both of them are arrays of mongoIds
 */
export const teacherValidation = [
  check("bio", "Bio required").exists(),
  check("bio", "Bio should be atleast of 10 characters").isLength({ min: 10 }),
  check("yearsOfExperience", "Years of experience is required").exists(),
  check(
    "yearsOfExperience",
    "Years of experience should be a positive number"
  ).isNumeric({
    no_symbols: true,
  }),
  check("qualifications", "Qualifications required").exists(),
  check("qualifications", "Qualifications format is wrong").isArray(),
  check("qualifications", "Qualifications should've atleast one item").isArray({
    min: 1,
  }),
  check("expertise", "Experise required").exists(),
  check("expertise", "Experise format is wrong").isArray(),
  check("expertise", "Experise should've atleast one item").isArray({ min: 1 }),
];

export const courseCreateValidation = [
  check("name", "Name is required").exists(),
  check("name", "Name should be atleast of 6 characters").isLength({
    min: 6,
  }),
  check("description", "Description is required").exists(),
  check(
    "description",
    "Description should be atleast of 6 characters"
  ).isLength({ min: 6 }),
  check("level", "Course level is required").exists(),
  check("level", "Wrong format of course level").isMongoId(),
];

export const createChapterValidation = [
  check("name", "Name is required").exists(),
  check("name", "Name should be atleast of 6 characters").isLength({
    min: 6,
  }),
  check("description", "Description is required").exists(),
  check(
    "description",
    "Description should be atleast of 6 characters"
  ).isLength({
    min: 6,
  }),
];

export const purchaseCourseValidation = [
  check("amount", "Amount of purchase is required").exists(),
  check("amount", "Amount of purchase should be positive").isNumeric({
    no_symbols: true,
  }),
  check("payment_method", "Payment method for purchase is required").exists(),
  check("payment_method", "Wrong payment method format").isString(),
];

export const feedbackCreateValidation = [
  check("rating", "Rating is required").exists(),
  check("rating", "Rating should be between 0 and 5").isInt({
    min: 0,
    max: 5,
  }),
  check("comment", "Comment is required").exists(),
  check("comment", "Comment should be less than 1024 characters").isLength({
    max: 1024,
  }),
];
