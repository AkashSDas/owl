import { NextFunction, Request, Response } from "express";
import Chapter, { ChapterDocument } from "../../models/chapter";
import { responseMsg, runAsync } from "../../utils";

/**
 * Get single doc by id
 */
export async function getChapterById(
  req: Request,
  res: Response,
  next: NextFunction,
  chapterId: string
) {
  const [data, err] = await runAsync(Chapter.findById(chapterId).exec());
  if (err)
    return responseMsg(res, { status: 400, message: "Something went wrong, Please try again" });
  if (!data) return responseMsg(res, { status: 400, message: "Chapter doesn't exists" });

  const chapter: ChapterDocument = data;
  req.chapter = chapter;

  next();
}
