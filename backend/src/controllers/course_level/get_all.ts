import { Request, Response } from "express";
import CourseLevel from "../../models/course_level";
import { responseMsg, runAsync } from "../../utils";

export async function getAllCourseLevels(_: Request, res: Response) {
  const [data, err] = await runAsync(CourseLevel.find().exec());
  if (err)
    return responseMsg(res, { status: 400, message: "Something went wrong, Please try again" });
  if (!data) return responseMsg(res, { status: 400, message: "No course level available" });

  return responseMsg(res, {
    status: 200,
    error: false,
    message: `Successfully retrieved ${data.length} course levels`,
    data: data,
  });
}
