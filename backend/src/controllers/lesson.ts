/**
 * @todo
 * - Check whether the chapter and course in req.params exists or not
 * - Check whether the chapter is of course or not
 */

import { IncomingForm } from "formidable";
import { deleteFileInFirebaseStorage } from "../firebase";
import { Controller, responseMsg, responseMsgs, runAsync } from "../utils";
import {
  lessonCreateFormCallback,
  lessonUpdateFormCallback,
} from "../helpers/lesson";
import Lesson from "../models/lesson";

/**
 * Create a lesson
 *
 * @remarks
 *
 * Shape of req.body should be
 * - name
 * - description
 * - note (optional, this will be markdown text)
 * - video (file which will saved to firebase storage and then url will be saved in the doc)
 *
 * req.params should have the following
 * - courseId
 * - chapterId
 */
export const createLesson: Controller = async (req, res) => {
  let form = new IncomingForm({ keepExtensions: true });
  form.parse(req, (err, fields, files) =>
    lessonCreateFormCallback(req, res, err, fields, files)
  );
};

/**
 * Update a lesson
 *
 * req.params should have the following
 * - courseId
 * - chapterId
 */
export const updateLesson: Controller = async (req, res) => {
  let form = new IncomingForm({ keepExtensions: true });
  form.parse(req, (err, fields, files) =>
    lessonUpdateFormCallback(req, res, err, fields, files)
  );
};

/**
 * Delete a lesson
 *
 * @remarks
 *
 * req.params should have the following
 * - courseId
 * - chapterId
 *
 * Use this controller in conjunction with getLessonById which will set `req.lesson`
 *
 * @todo
 * - Instead of getting entire lesson just get the lesson id with validation check of
 * that lesson existing and having belonging to course and chapter whose ids are given
 * in param
 * - Update course updatedAt field after deleted successfully
 */
export const deleteLesson: Controller = async (req, res) => {
  const lesson = req.lesson;

  // Delete lesson video
  const destination = `lesson-videos/${req.params.courseId}/${req.params.chapterId}/${lesson._id}`;
  const wasDeleted = await deleteFileInFirebaseStorage(destination);
  if (!wasDeleted) return responseMsg(res, { msg: responseMsgs.WENT_WRONG });

  // Delete the doc
  const [, err] = await runAsync(lesson.deleteOne({ _id: lesson._id }));
  if (err) return responseMsg(res, { msg: responseMsgs.WENT_WRONG });
  return responseMsg(res, {
    status: 200,
    error: false,
    msg: "Successfully deleted the lesson",
  });
};

/**
 * Get all lessons of a chapter
 */
export const getAllLessonsOfChapter: Controller = async (req, res) => {
  const courseId = req.params.courseId;
  const chapter = req.chapter;
  const [data, err] = await runAsync(
    Lesson.find({ courseId: courseId as any, chapterId: chapter._id }).exec()
  );

  if (err) return responseMsg(res, { msg: responseMsgs.WENT_WRONG });
  return responseMsg(res, {
    status: 200,
    error: false,
    msg: "Successfully retrieved all the lessons",
    data: { chapter, lessons: data ? data : [] },
  });
};
