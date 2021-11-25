import { FormikErrors, FormikTouched } from "formik";
import {
  ChangeEventHandler,
  createContext,
  Dispatch,
  FocusEventHandler,
} from "react";

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

/**
 * Update course
 */

export interface ICourseUpdateForm {
  name: string;
  description: string;
  level: string;
  price: number;
}

interface ICourseUpdateContext {
  loading: boolean;
  setLoading: Function;
  values: ICourseUpdateForm;
  handleSubmit: Function;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  errors: FormikErrors<ICourseUpdateForm>;
  touched: FormikTouched<ICourseUpdateForm>;
  handleBlur: FocusEventHandler<HTMLInputElement>;
  coverImgURL: string;
  coverImgFile: File;
  setCoverImgFile: Dispatch<File>;
}

export const CourseUpdateContext = createContext<ICourseUpdateContext>(null);
