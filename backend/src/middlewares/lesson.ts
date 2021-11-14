import Lesson, { LessonDocument } from "../models/lesson";
import { IdMiddleware, responseMsg, responseMsgs, runAsync } from "../utils";

/**
 * Get lesson (if exists) and set it to req.lesson
 *
 * @params
 * id: lesson mongodb id
 */
export const getLessonById: IdMiddleware = async (req, res, next, id) => {
  const [data, err] = await runAsync(Lesson.findOne({ _id: id }).exec());
  if (err) return responseMsg(res, { msg: responseMsgs.WENT_WRONG });
  else if (!data) return responseMsg(res, { msg: "Lesson doesn't exists" });
  const lesson: LessonDocument = data;
  req.lesson = lesson;
  next();
};
