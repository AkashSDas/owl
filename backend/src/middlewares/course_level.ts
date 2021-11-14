import CourseLevel, { CourseLevelDocument } from "../models/course_level";
import { IdMiddleware, responseMsg, responseMsgs, runAsync } from "../utils";

/**
 * Get course level (if exists) and set it to req.courseLevel
 *
 * @params
 * id: course level mongodb id
 */
export const getCourseLevelById: IdMiddleware = async (req, res, next, id) => {
  const [data, err] = await runAsync(CourseLevel.findOne({ _id: id }).exec());
  if (err) return responseMsg(res, { msg: responseMsgs.WENT_WRONG });
  else if (!data)
    return responseMsg(res, { msg: "Course level doesn't exists" });
  const lvl: CourseLevelDocument = data;
  req.courseLevel = lvl;
  next();
};
