import { runAsync } from "../utils";
import { axiosBaseInstance, fetchFromAPI } from "./base";

/**
 * Get all lessons of a chapter
 */
export const getAllLessonsOfChapter = async (
  courseId: string,
  chapterId: string
) => {
  const [result, err] = await fetchFromAPI(`/lesson/${courseId}/${chapterId}`, {
    method: "GET",
  });
  if (err) return [null, err.response.data];
  return [result.data, null];
};

/**
 * Create lesson
 */
export const createLesson = async (
  courseId: string,
  chapterId: string,
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
    api(`/lesson/${userId}/${courseId}/${chapterId}`, {
      method: "POST",
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  );

  if (err) return [null, err.response.data];
  return [result.data, null];
};

/**
 * Delete a lesson
 */
export const deleteLesson = async (
  courseId: string,
  chapterId: string,
  lessonId: string,
  userId: string,
  token: string
) => {
  const [result, err] = await fetchFromAPI(
    `/lesson/${userId}/${courseId}/${chapterId}/${lessonId}`,
    { method: "DELETE", token }
  );
  if (err) return [null, err.response.data];
  return [result.data, null];
};

/**
 * Get a lesson
 */
export const getLesson = async (
  courseId: string,
  chapterId: string,
  lessonId: string
) => {
  const [result, err] = await fetchFromAPI(
    `/lesson/${courseId}/${chapterId}/${lessonId}`,
    {
      method: "GET",
    }
  );
  if (err) return [null, err.response.data];
  return [result.data, null];
};
