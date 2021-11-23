import { fetchFromAPI } from "./base";

export const getAllCourseLevels = async () => {
  const [result, err] = await fetchFromAPI("/course-level", {
    method: "GET",
  });
  if (err) return [null, err.response.data];
  return [result.data, null];
};
