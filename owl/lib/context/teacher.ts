import { FormikErrors, FormikTouched } from "formik";
import { ChangeEventHandler, createContext, FocusEventHandler } from "react";

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
