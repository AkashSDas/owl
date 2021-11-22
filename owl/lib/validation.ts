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
