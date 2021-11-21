import { ISignupForm } from "../context/auth";
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
