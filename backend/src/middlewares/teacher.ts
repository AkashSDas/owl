import Teacher, { TeacherDocument } from "../models/teacher";
import { IdMiddleware, responseMsg, responseMsgs, runAsync } from "../utils";

/**
 * Get teacher (if exists) and set it to req.teacher
 *
 * @params
 * id: teacher mongodb id
 */
export const getTeacherById: IdMiddleware = async (req, res, next, id) => {
  const [data, err] = await runAsync(Teacher.findOne({ _id: id }).exec());
  if (err) return responseMsg(res, { msg: responseMsgs.WENT_WRONG });
  else if (!data) return responseMsg(res, { msg: "Teacher doesn't exists" });
  const teacher: TeacherDocument = data;
  req.teacher = teacher;
  next();
};
