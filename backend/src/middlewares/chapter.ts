import Chapter, { ChapterDocument } from "../models/chapter";
import { IdMiddleware, responseMsg, responseMsgs, runAsync } from "../utils";

/**
 * Get chapter (if exists) and set it to req.chapter
 *
 * @params
 * id: chapter mongodb id
 */
export const getChapterById: IdMiddleware = async (req, res, next, id) => {
  const [data, err] = await runAsync(Chapter.findOne({ _id: id }).exec());
  if (err) return responseMsg(res, { msg: responseMsgs.WENT_WRONG });
  else if (!data) return responseMsg(res, { msg: "Chapter doesn't exists" });
  const chapter: ChapterDocument = data;
  req.chapter = chapter;
  next();
};
