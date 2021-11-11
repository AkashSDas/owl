import { Request, Response } from "express";
import CourseLevel from "../models/course_level";
import { responseMsg, runAsync } from "../utils";

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
