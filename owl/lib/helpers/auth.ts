import { ILoginForm, ISignupForm } from "../context/auth";
import { fetchFromAPI } from "./base";

/**
 * User signup
 */
export const signup = async (data: ISignupForm) => {
  const [result, err] = await fetchFromAPI("/auth/signup", {
    method: "POST",
    data,
  });
  if (err) return [null, err.response.data];
  return [result.data, null];
};

/**
 * User login
 */
export const login = async (data: ILoginForm) => {
  const [result, err] = await fetchFromAPI("/auth/login", {
    method: "POST",
    data,
  });
  if (err) return [null, err.response.data];
  return [result.data, null];
};

/**
 * Save user in local storage
 */
export const saveUserToLocalStorage = (data: any, next: Function) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

/**
 * Check user data if exists in local storage if yes then send it
 * else send null
 */
export function isAuthenticated() {
  if (typeof window === "undefined") return null;
  if (localStorage.getItem("jwt"))
    return JSON.parse(localStorage.getItem("jwt"));
  return null;
}
