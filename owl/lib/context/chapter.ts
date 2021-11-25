import { FormikErrors, FormikTouched } from "formik";
import { ChangeEventHandler, createContext, FocusEventHandler } from "react";

export interface IChapterCreateForm {
  name: string;
  description: string;
}

interface IChapterCreateContext {
  loading: boolean;
  setLoading: Function;
  values: IChapterCreateForm;
  handleSubmit: Function;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  errors: FormikErrors<IChapterCreateForm>;
  touched: FormikTouched<IChapterCreateForm>;
  handleBlur: FocusEventHandler<HTMLInputElement>;
}

export const ChapterCreateContext = createContext<IChapterCreateContext>(null);
