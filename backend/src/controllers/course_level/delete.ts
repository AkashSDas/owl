import { Request, Response } from "express";
import { responseMsg, runAsync } from "../../utils";

export async function deleteCourseLevel(req: Request, res: Response) {
  const courseLevel = req.courseLevel;
  const [, err] = await runAsync(courseLevel.deleteOne({ _id: courseLevel._id }));
  if (err) responseMsg(res, { status: 400, message: "Failed to delete course level" });
  return responseMsg(res, {
    status: 200,
    error: false,
    message: "Successfully deleted course level",
  });
}
