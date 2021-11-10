import { NextFunction, Request, Response } from "express";
import Teacher, { TeacherDocument } from "../../models/teacher";
import { responseMsg, runAsync } from "../../utils";

export async function getTeacherById(
  req: Request,
  res: Response,
  next: NextFunction,
  teacherId: string
) {
  const [data, err] = await runAsync(Teacher.findById(teacherId).exec());
  if (err)
    return responseMsg(res, { status: 400, message: "Something went wrong, Please try again" });
  if (!data) return responseMsg(res, { status: 400, message: "Teacher doesn't exists" });

  const teacher: TeacherDocument = data;
  req.teacher = teacher;

  next();
}
