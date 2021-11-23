import { ICourseCreateForm } from "../context/course";
import { fetchFromAPI } from "./base";

/**
 * Create a course
 */
export const createCourse = async (
  data: ICourseCreateForm,
  token: string,
  userId: string
) => {
  const [result, err] = await fetchFromAPI(`/course/${userId}/`, {
    method: "POST",
    data,
    token,
  });
  if (err) return [null, err.response.data];
  return [result.data, null];
};
