import { Request, Response } from "express";
import Chapter from "../../models/chapter";
import CourseChapters from "../../models/course_chapters";
import { responseMsg, runAsync } from "../../utils";

/**
 * Create a chapter and then add it to course chapters list
 *
 * @remarks
 * Here req.body will be of shape {name, description}
 */
export async function createChapterAndPushToCourseChapters(req: Request, res: Response) {
  const courseChapters = req.courseChapters;
  const [chapter, err1] = await runAsync(new Chapter(req.body).save());
  if (err1) return responseMsg(res, { status: 400, message: "Failed to create chapter" });

  const [, err2] = await runAsync(
    CourseChapters.findOneAndUpdate(
      { _id: courseChapters._id },
      { $push: { chapters: chapter._id } }
    ).exec()
  );
  if (err2) return responseMsg(res, { status: 400, message: "Failed to create chapter" });

  return responseMsg(res, {
    status: 200,
    error: false,
    message: "Successfully created chapter",
    data: { chapter },
  });
}
