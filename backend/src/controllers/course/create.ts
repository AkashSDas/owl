import { Request, Response } from "express";
import Course from "../../models/course";
import { responseMsg, runAsync } from "../../utils";

/**
 * Create course
 *
 * @remarks
 * req.body shape will be
 *  {
 *      name,
 *      description,
 *      level
 *  }
 *
 * Course will be created incrementally so therefore only using
 * name, description and level (course level) to create the course
 */
export async function createCourse(req: Request, res: Response) {
  const teacher = req.teacher;
  const courseData = {
    teacherId: teacher._id,
    ...req.body,
  };
  const [data, err] = await runAsync(new Course(courseData).save());

  if (err || !data)
    return responseMsg(res, {
      status: 400,
      message: "Failed to create course",
    });
  return responseMsg(res, {
    status: 200,
    error: false,
    message: "Course created successfully",
  });
}
