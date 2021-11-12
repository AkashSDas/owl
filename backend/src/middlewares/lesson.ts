import { NextFunction, Request, Response } from "express";
import Lesson, { LessonDocument } from "../models/lesson";
import { responseMsg, runAsync } from "../utils";

/**
 * Get single doc by id
 */
export async function getLessonById(
  req: Request,
  res: Response,
  next: NextFunction,
  lessonId: string
) {
  const [data, err] = await runAsync(Lesson.findById(lessonId).exec());
  if (err)
    return responseMsg(res, { status: 400, message: "Something went wrong, Please try again" });
  if (!data) return responseMsg(res, { status: 400, message: "Lesson doesn't exists" });

  const lesson: LessonDocument = data;
  req.lesson = lesson;

  next();
}
