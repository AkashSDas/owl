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

/**
 * Get a user's (teacher) courses paginated
 */
export const getUserAllCourses = async (
  userId: string,
  token: string,
  limit: number,
  next?: string
) => {
  let url = `/course/${userId}/my-all?limit=${limit}`;
  if (next) url = `${url}&next=${next}`;

  const [result, err] = await fetchFromAPI(url, { method: "GET", token });
  if (err) return [null, err.response.data];
  return [result.data, null];
};

/**
 * Delete a course
 */
export const deleteCourse = async (
  courseId: string,
  userId: string,
  token: string
) => {
  const [result, err] = await fetchFromAPI(`/course/${userId}/${courseId}`, {
    method: "DELETE",
    token,
  });
  if (err) return [null, err.response.data];
  return [result.data, null];
};
