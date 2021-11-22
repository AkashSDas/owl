import { FormikErrors, FormikTouched } from "formik";
import { ChangeEventHandler, createContext, FocusEventHandler } from "react";

/**
 * Signup context
 */

export interface ISignupForm {
  username: string;
  email: string;
  password: string;
  dateOfBirth: string;
}

interface ISignupContext {
  loading: boolean;
  setLoading: Function;
  values: ISignupForm;
  handleSubmit: Function;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  errors: FormikErrors<ISignupForm>;
  touched: FormikTouched<ISignupForm>;
  handleBlur: FocusEventHandler<HTMLInputElement>;
}

export const SignupContext = createContext<ISignupContext>(null);

/**
 * Login context
 */

export interface ILoginForm {
  email: string;
  password: string;
}

interface ILoginContext {
  loading: boolean;
  setLoading: Function;
  values: ILoginForm;
  handleSubmit: Function;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  errors: FormikErrors<ISignupForm>;
  touched: FormikTouched<ISignupForm>;
  handleBlur: FocusEventHandler<HTMLInputElement>;
}

export const LoginContext = createContext<ILoginContext>(null);

/**
 * Teacher signup
 */

export interface ITeacherSignupForm {
  bio: string;
  yearsOfExperience: number;
  qualifications: string[];
  expertise: string[];
}

interface ITeacherSignupContext {
  loading: boolean;
  setLoading: Function;
  values: ITeacherSignupForm;
  handleSubmit: Function;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  errors: FormikErrors<ITeacherSignupForm>;
  touched: FormikTouched<ITeacherSignupForm>;
  handleBlur: FocusEventHandler<HTMLInputElement>;
}

export const TeacherSignupContext = createContext<ITeacherSignupContext>(null);
