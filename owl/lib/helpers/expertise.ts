import { fetchFromAPI } from "./base";

export const getAllExpertise = async () => {
  const [result, err] = await fetchFromAPI("/expertise", {
    method: "GET",
  });
  if (err) return [null, err.response.data];
  return [result.data, null];
};
