import { NextFunction, Request, Response } from "express";
import Course, { CourseDocument } from "../../models/course";
import { responseMsg, runAsync } from "../../utils";

/**
 * Get single doc by id
 */
export async function getCourseById(
  req: Request,
  res: Response,
  next: NextFunction,
  courseId: string
) {
  const [data, err] = await runAsync(Course.findById(courseId).exec());
  if (err)
    return responseMsg(res, { status: 400, message: "Something went wrong, Please try again" });
  if (!data) return responseMsg(res, { status: 400, message: "Course doesn't exists" });

  const course: CourseDocument = data;
  req.course = course;

  next();
}
