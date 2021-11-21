import { ChangeEventHandler, createContext } from "react";

export interface ISignupForm {
  username: string;
  email: string;
  password: string;
}

interface ISignupContext {
  values: ISignupForm;
  handleSubmit: Function;
  handleChange: ChangeEventHandler<HTMLInputElement>;
}

export const SignupContext = createContext<ISignupContext>(null);
