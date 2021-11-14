/**
 * @todo
 * - Check whether the chapter on whom the operation are being performed
 * belong to the course whose id is given
 */

import Chapter from "../models/chapter";
import Course from "../models/course";
import { Controller, responseMsg, responseMsgs, runAsync } from "../utils";
import { extend } from "lodash";
import Lesson from "../models/lesson";
import { deleteFileInFirebaseStorage } from "../firebase";

/**
 * Create a chapter
 *
 * @remarks
 *
 * Shape of req.body is going to be
 * - name
 * - description
 */
export const createChapter: Controller = async (req, res) => {
  const courseId = req.params.courseId;

  // Check whether the course exists or not
  const [exists, err1] = await runAsync(
    Course.findOne({ _id: courseId }, "_id").exec()
  );
  if (err1) return responseMsg(err1, { msg: responseMsgs.WENT_WRONG });
  if (!exists) return responseMsg(err1, { msg: "Course doesn't exists" });

  // Create chapter for the given course
  const [chapter, err2] = await runAsync(
    new Chapter({ courseId, ...req.body }).save()
  );
  if (err2 || !chapter)
    return responseMsg(err1, { msg: responseMsgs.WENT_WRONG });
  return responseMsg(res, {
    status: 200,
    error: false,
    msg: "Successfully created chapter",
    data: { chapter },
  });
};

/**
 * Update a chapter
 *
 * @remarks
 *
 * Only thing that can be updated in a chapter is
 * - name
 * - description
 * courseId is not meant to be updated as of now
 *
 * Use this controller in conjunction with
 * - getChapterById which will set `req.chapter`
 */
export const updateChapter: Controller = async (req, res) => {
  let chapter = req.chapter;
  chapter = extend(chapter, req.body);
  const [updatedChapter, err] = await runAsync(chapter.save());
  if (err) return responseMsg(res, { msg: responseMsgs.WENT_WRONG });
  return responseMsg(res, {
    status: 200,
    error: false,
    msg: "Successfully updated the chapter",
    data: { chapter: updatedChapter },
  });
};

/**
 * Delete a chapter
 *
 * @remarks
 *
 * req.params should have the following
 * - courseId
 *
 * Use this controller in conjunction with getChapterById which will set `req.chapter`
 *
 * @todo
 * - Instead of getting entire chapter just get the chapter id with validation check of
 * that chapter existing and having belonging to course whose id is given in param
 */
export const deleteChapter: Controller = async (req, res) => {
  const chapter = req.chapter;

  /**
   * Delete all lessons in this chapter
   */

  // Delete all videos
  // This will delete all the lesson videos in a chapter
  const destination = `lesson-videos/${req.params.courseId}/${chapter._id}`;
  const wasDeleted = await deleteFileInFirebaseStorage(destination);
  if (!wasDeleted) return responseMsg(res, { msg: responseMsgs.WENT_WRONG });

  // Delete all lesson docs
  const [, err2] = await runAsync(
    Lesson.deleteMany({ chapterId: chapter._id }).exec()
  );
  if (err2) return responseMsg(res, { msg: responseMsgs.WENT_WRONG });

  /**
   * Delete the chapter doc
   */
  const [, err3] = await runAsync(
    Chapter.deleteOne({ _id: chapter._id }).exec()
  );
  if (err3) return responseMsg(res, { msg: responseMsgs.WENT_WRONG });

  return responseMsg(res, {
    status: 200,
    error: false,
    msg: "Successfully deleted the chapter",
  });
};
