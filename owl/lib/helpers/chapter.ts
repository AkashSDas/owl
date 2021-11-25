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