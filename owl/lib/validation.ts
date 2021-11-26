import * as Yup from "yup";

export const signupValidationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(6, "Username should be atleast 6 characters long"),
  email: Yup.string()
    .required("Email is required")
    .email("Email has wrong format"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password should be atleast 6 characters long"),
  dateOfBirth: Yup.date().required("Date of birth is required"),
});

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Email has wrong format"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password should be atleast 6 characters long"),
});

export const courseCreateValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Course name is required")
    .min(6, "Course name should be atleast 6 characters long"),
  description: Yup.string()
    .required("Description is required")
    .min(6, "Description should be atleast 6 characters long"),
  level: Yup.string().required("Course level is required"),
  price: Yup.number()
    .required("Course price is required")
    .min(0, "Course price should be a positive number"),
});

export const chapterCreateValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Chapter name is required")
    .min(6, "Chapter name should be atleast 6 characters long"),
  description: Yup.string()
    .required("Description is required")
    .min(6, "Description should be atleast 6 characters long"),
});

export const lessonCreateValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Chapter name is required")
    .min(6, "Chapter name should be atleast 6 characters long"),
  description: Yup.string()
    .required("Description is required")
    .min(6, "Description should be atleast 6 characters long"),
});
