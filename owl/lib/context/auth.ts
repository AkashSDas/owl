import { ChangeEventHandler, createContext } from "react";

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
}

export const SignupContext = createContext<ISignupContext>(null);
