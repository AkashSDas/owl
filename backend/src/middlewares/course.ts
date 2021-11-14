import Course, { CourseDocument } from "../models/course";
import { IdMiddleware, responseMsg, responseMsgs, runAsync } from "../utils";

/**
 * Get single doc by id
 */
/**
 * Get course (if exists) and set it to req.course
 *
 * @params
 * id: course mongodb id
 */
export const getCourseById: IdMiddleware = async (req, res, next, id) => {
  const [data, err] = await runAsync(Course.findOne({ _id: id }).exec());
  if (err) return responseMsg(res, { msg: responseMsgs.WENT_WRONG });
  else if (!data) return responseMsg(res, { msg: "Course doesn't exists" });
  const course: CourseDocument = data;
  req.course = course;
  next();
};
