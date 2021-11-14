import CourseLevel from "../models/course_level";
import { runAsync } from "../utils";

/**
 * Check whether the given course leve exists in course levels collection
 *
 * @param name - name of the course level (its unique in CourseLevel's model)
 *
 * @returns
 * Array of 2 elements - [data, err] (in our case data will be either 0 if the
 * doc doesn't exists or 1 if it does exists)
 */
export const checkCourseLevelExists = async (name: string) => {
  return await runAsync(
    CourseLevel.find({ name: name }).limit(1).count().exec()
  );
};
