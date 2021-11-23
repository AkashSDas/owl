import { FormikErrors, FormikTouched } from "formik";
import { ChangeEventHandler, createContext, FocusEventHandler } from "react";

export interface ICourseCreateForm {
  name: string;
  description: string;
  level: string;
  price: number;
}

interface ICourseCreateContext {
  loading: boolean;
  setLoading: Function;
  values: ICourseCreateForm;
  handleSubmit: Function;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  errors: FormikErrors<ICourseCreateForm>;
  touched: FormikTouched<ICourseCreateForm>;
  handleBlur: FocusEventHandler<HTMLInputElement>;
}

export const CourseCreateContext = createContext<ICourseCreateContext>(null);
