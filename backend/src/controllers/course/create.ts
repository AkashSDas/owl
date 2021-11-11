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
  const user = req.profile; // since teacherId === user._id

  // Only below values will be used to create a course
  const { name, description, level } = req.body;
  const courseData = {
    teacherId: user._id,
    name,
    description,
    level,
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
