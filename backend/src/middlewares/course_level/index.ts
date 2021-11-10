import { NextFunction, Request, Response } from "express";
import CourseLevel, { CourseLevelDocument } from "../../models/course_level";
import { responseMsg, runAsync } from "../../utils";

/**
 * Get single doc by id
 */
export async function getCourseLevelById(
  req: Request,
  res: Response,
  next: NextFunction,
  courseLevelId: string
) {
  const [data, err] = await runAsync(CourseLevel.findById(courseLevelId).exec());
  if (err)
    return responseMsg(res, { status: 400, message: "Something went wrong, Please try again" });
  if (!data) return responseMsg(res, { status: 400, message: "Course level doesn't exists" });

  const courseLevel: CourseLevelDocument = data;
  req.courseLevel = courseLevel;

  next();
}
