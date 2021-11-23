import { fetchFromAPI } from "./base";

export const getAllQualifications = async () => {
  const [result, err] = await fetchFromAPI("/qualification", {
    method: "GET",
  });
  if (err) return [null, err.response.data];
  return [result.data, null];
};
