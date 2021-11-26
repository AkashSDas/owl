import { fetchFromAPI } from "./base";

/**
 * Get all chapters of a course
 */
export const getAllChaptersOfCourse = async (courseId: string) => {
  const [result, err] = await fetchFromAPI(`/chapter/${courseId}`, {
    method: "GET",
  });
  if (err) return [null, err.response.data];
  return [result.data, null];
};

/**
 * Create a chapter
 */
export const createChapter = async (
  data: any,
  userId: string,
  token: string
) => {
  const [result, err] = await fetchFromAPI(
    `/chapter/${userId}/${data.courseId}`,
    {
      method: "POST",
      data,
      token,
    }
  );
  if (err) return [null, err.response.data];
  return [result.data, null];
};

/**
 * Delete a chapter
 */
export const deleteChapter = async (
  courseId: string,
  chapterId: string,
  userId: string,
  token: string
) => {
  const [result, err] = await fetchFromAPI(
    `/chapter/${userId}/${courseId}/${chapterId}`,
    { method: "DELETE", token }
  );
  if (err) return [null, err.response.data];
  return [result.data, null];
};

/**
 * Get a chapter data
 */
export const getChapter = async (courseId: string, chapterId: string) => {
  const [result, err] = await fetchFromAPI(
    `/chapter/${courseId}/${chapterId}`,
    { method: "GET" }
  );
  if (err) return [null, err.response.data];
  return [result.data, null];
};

/**
 * Update a chapter data
 */
export const updateChapter = async (
  courseId: string,
  chapterId: string,
  data: any,
  userId: string,
  token: string
) => {
  const [result, err] = await fetchFromAPI(
    `/chapter/${userId}/${courseId}/${chapterId}`,
    { method: "PUT", data, token }
  );
  if (err) return [null, err.response.data];
  return [result.data, null];
};
