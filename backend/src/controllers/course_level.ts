/**
 * Course level for now are meant to be created by admins only.
 * So before performing any CUD(create, update, delete) course level
 * opertation check whether the user is an admin or not
 *
 * Course level are going to be already set by admin so the teacher or anyone
 * can directly select from the given options
 */

import { checkCourseLevelExists } from "../helpers/course_level";
import CourseLevel from "../models/course_level";
import { Controller, responseMsg, responseMsgs, runAsync } from "../utils";

/**
 * Create course level
 *
 * @remarks
 * Shape of req.body should be
 * - name
 * - emoji
 */
export const createCourseLevel: Controller = async (req, res) => {
  const [count, err1] = await checkCourseLevelExists(req.body.name);
  if (err1) return responseMsg(res, { msg: responseMsgs.WENT_WRONG });
  if (count !== 0) return responseMsg(res, { msg: "Name is already used" });

  // Create new doc
  const [lvl, err2] = await runAsync(new CourseLevel(req.body).save());
  if (err2 || !lvl) return responseMsg(res, { msg: responseMsgs.WENT_WRONG });
  return responseMsg(res, {
    status: 200,
    error: false,
    msg: "Sccuessfully created course level",
    data: { courseLevel: lvl },
  });
};

/**
 * Delete course level
 *
 * @remarks
 * This should be used in conjunction with getCourseLevelById middleware
 * which will set req.expertise
 */
export const deleteCourseLevel: Controller = async (req, res) => {
  const lvl = req.courseLevel;
  const [, err] = await runAsync(lvl.deleteOne({ _id: lvl._id }));
  if (err) return responseMsg(res, { msg: responseMsgs.WENT_WRONG });
  return responseMsg(res, {
    status: 200,
    error: false,
    msg: "Successfully deleted course level",
  });
};

/**
 * Get all course levels without pagination
 */
export const getAllCourseLevels: Controller = async (_, res) => {
  const [lvls, err] = await runAsync(CourseLevel.find().exec());
  if (err) return responseMsg(res, { msg: responseMsgs.WENT_WRONG });
  if (!lvls) return responseMsg(res, { msg: "No course level available" });
  return responseMsg(res, {
    status: 200,
    error: false,
    msg: `Successfully retrieved ${lvls.length} levels`,
    data: { courseLevels: lvls },
  });
};
