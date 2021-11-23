import { createContext, Dispatch, SetStateAction } from "react";

export interface IUser {
  token?: string;
  data?: {
    createdAt: string;
    updatedAt: string;
    dateOfBirth: string;
    email: string;
    profilePicURL: string;
    username: string;
    roles: string[];
    _id: string;
  };
}

export interface IAuth {
  user: IUser;
  setUser: Dispatch<SetStateAction<IUser>>;
}

export const AuthContext = createContext<IAuth>(null);
