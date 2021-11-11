import { Request, Response } from "express";
import CourseChapters from "../../models/course_chapters";
import { responseMsg, runAsync } from "../../utils";

export async function createCourseChapters(req: Request, res: Response) {
  const courseId = req.course._id;
  const [data, err] = await runAsync(new CourseChapters({ courseId }).save());
  if (err || !data)
    return responseMsg(res, { status: 400, message: "Failed to create course chapters" });
  return responseMsg(res, {
    status: 200,
    error: false,
    message: "Successfully created course chapters",
  });
}
