import { Request, Response } from "express";
import CourseLevel from "../../models/course_level";
import { responseMsg, runAsync } from "../../utils";

export async function createCourseLevel(req: Request, res: Response) {
  // Checking if course level name is already used
  const [count, error] = await runAsync(
    CourseLevel.find({ name: req.body.name }).limit(1).count().exec()
  );
  if (error)
    return responseMsg(res, {
      status: 400,
      message: "Something went wrong, Please try again",
    });
  else if (count !== 0) return responseMsg(res, { status: 400, message: "Name is already used" });

  const [data, err] = await runAsync(new CourseLevel(req.body).save());

  if (err || !data)
    return responseMsg(res, {
      status: 400,
      message: "Failed to create course level",
    });
  return responseMsg(res, {
    status: 200,
    error: false,
    message: "Course level created successfully",
  });
}
