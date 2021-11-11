import { NextFunction, Request, Response } from "express";
import CourseChapters, { CourseChaptersDocument } from "../../models/course_chapters";
import { responseMsg, runAsync } from "../../utils";

/**
 * Get single doc by id
 */
export async function getCourseChaptersByCourseId(
  req: Request,
  res: Response,
  next: NextFunction,
  courseId: string
) {
  const [data, err] = await runAsync(CourseChapters.findOne({ courseId: courseId as any }).exec());
  if (err)
    return responseMsg(res, { status: 400, message: "Something went wrong, Please try again" });
  if (!data) return responseMsg(res, { status: 400, message: "Course chapter doesn't exists" });

  const courseChapters: CourseChaptersDocument = data;
  req.courseChapters = courseChapters;

  next();
}
