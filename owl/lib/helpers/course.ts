import { ICourseCreateForm } from "../context/course";
import { runAsync } from "../utils";
import { axiosBaseInstance, fetchFromAPI } from "./base";

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

/**
 * Get course data for updating course
 */
export const getCoursePublicData = async (courseId: string) => {
  const [result, err] = await fetchFromAPI(`/course/${courseId}/public`, {
    method: "GET",
  });
  if (err) return [null, err.response.data];
  return [result.data, null];
};

/**
 * Update course public data
 */
export const updateCoursePublicData = async (
  courseId: string,
  data: any,
  userId: string,
  token: string
) => {
  // Formdata
  const formData = new FormData();
  for (const field in data) {
    formData.append(field, data[field]);
  }

  const api = axiosBaseInstance();

  const [result, err] = await runAsync(
    api(`/course/${userId}/${courseId}`, {
      method: "PUT",
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  );

  if (err) return [null, err.response.data];
  return [result.data, null];
};
