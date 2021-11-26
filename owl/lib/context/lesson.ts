import { FormikErrors, FormikTouched } from "formik";
import {
  ChangeEventHandler,
  createContext,
  Dispatch,
  FocusEventHandler,
} from "react";

export interface ILessonCreateForm {
  name: string;
  description: string;
  note: string;
}

interface ILessonCreateContext {
  loading: boolean;
  setLoading: Function;
  values: ILessonCreateForm;
  handleSubmit: Function;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  errors: FormikErrors<ILessonCreateForm>;
  touched: FormikTouched<ILessonCreateForm>;
  handleBlur: FocusEventHandler<HTMLInputElement>;
  videoFile: File;
  setVideoFile: Dispatch<File>;
}

export const LessonCreateContext = createContext<ILessonCreateContext>(null);
