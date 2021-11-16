import Course from "../models/course";
import { Controller, responseMsg, responseMsgs, runAsync } from "../utils";
import { IncomingForm } from "formidable";
import { courseUpdateFormCallback } from "../helpers/course";
import Chapter from "../models/chapter";
import Lesson from "../models/lesson";
import { deleteFileInFirebaseStorage } from "../firebase";

/**
 * Create course
 *
 * @remarks
 *
 * Shape of req.body will be
 * - name
 * - description
 * - level - This is course level (mongoId)
 * - price
 *
 * Other value have default values out which few fields can be updated
 * directly by the user and other shouldn't be updated the users but will
 * be updated by different processes in the backend
 *
 * This controller should be used in conjunction with
 * - auth middlewares
 * - isTeacher middlewares to see if the requested user is a teacher or not
 * - getTeacherById middleware which will set req.teacher which will used for teacherId
 */
export const createCourse: Controller = async (req, res) => {
  const [course, err] = await runAsync(
    new Course({ teacherId: req.profile._id, ...req.body }).save()
  );
  if (err || !course) return responseMsg(res, { msg: responseMsgs.WENT_WRONG });
  return responseMsg(res, {
    status: 200,
    error: false,
    msg: "Successfully created the course",
    data: { course },
  });
};

/**
 * Update course
 *
 * @remarks
 *
 * This controller should be used in conjunction with
 * - getCourseById middleware which will set the `req.course`
 *
 * Shape of req.body (with all fields being optional)
 * - name
 * - description
 * - price
 * - level
 * - coverImg (this is a img file, this will be updated with course
 * cover img and then coverImgURL will be updated)
 *
 * Only the specified fields in Course model should be updated by user's
 * and others are updated by different proccess in the backend
 * - name
 * - description
 * - price
 * - level
 * - updatedAt
 *
 * The **updatedAt** is a custom updatedAt field which should be updated if
 * name, description, price, level or coverImgURL, any of these fields are
 * updated then. Also note that updatedAt should also be updated whenever
 * a chapter/lesson is created/updated/deleted
 *
 * @todo
 * - Add filter that only the allowed fields are updated
 */
export const updateCoursePublicData: Controller = async (req, res) => {
  let form = new IncomingForm({ keepExtensions: true });
  form.parse(req, (err, fields, files) =>
    courseUpdateFormCallback(req, res, err, fields, files)
  );
};

/**
 * Delete a course
 *
 * @remarks
 * Use this controller in conjunction with getCourseById which will set `req.course`
 *
 * @todo
 * - Instead of getting entire course just get the course id with validation check if
 * its there or not
 */
export const deleteCourse: Controller = async (req, res) => {
  const course = req.course;

  // Delete course cover img
  const path = `course-cover-imgs/${course._id}`;
  const isDeleted = await deleteFileInFirebaseStorage(path);
  if (!isDeleted) return responseMsg(res, { msg: responseMsgs.WENT_WRONG });

  // Delete all videos of lessons in this course
  const destination = `lesson-videos/${course._id}`;
  const wasDeleted = await deleteFileInFirebaseStorage(destination);
  if (!wasDeleted) return responseMsg(res, { msg: responseMsgs.WENT_WRONG });

  // Delete all lessons in this course
  const [, err1] = await runAsync(
    Lesson.deleteMany({ courseId: course._id }).exec()
  );
  if (err1) return responseMsg(res, { msg: responseMsgs.WENT_WRONG });

  // Delete all chapters in this course
  const [, err2] = await runAsync(
    Chapter.deleteMany({ courseId: course._id }).exec()
  );
  if (err2) return responseMsg(res, { msg: responseMsgs.WENT_WRONG });

  // Delete course doc
  const [, err3] = await runAsync(Course.deleteOne({ _id: course._id }).exec());
  if (err3) return responseMsg(res, { msg: responseMsgs.WENT_WRONG });

  return responseMsg(res, {
    status: 200,
    error: false,
    msg: "Successfully delete the course",
  });
};

/**
 * Publish a course
 *
 * @remarks
 * To publish a course, it should've atleast 1 chapter with 1 lesson
 */
export const publishCourse: Controller = async (req, res) => {
  const courseId = req.params.courseId;

  // Check if the course has at least one chapter
  const [chapterCount, err1] = await runAsync(
    Chapter.find({ courseId: courseId as any })
      .limit(1)
      .count()
      .exec()
  );
  if (err1) return responseMsg(res, { msg: responseMsgs.WENT_WRONG });
  if (chapterCount === 0)
    return responseMsg(res, { msg: "Course should've atleast one chapter" });

  // Check if the course has at least one lesson
  const [lessonCount, err2] = await runAsync(
    Lesson.find({ courseId: courseId as any })
      .limit(1)
      .count()
      .exec()
  );
  if (err2) return responseMsg(res, { msg: responseMsgs.WENT_WRONG });
  if (lessonCount === 0)
    return responseMsg(res, { msg: "Course should've atleast one lesson" });

  // Publish the course
  const [, err3] = await runAsync(
    Course.updateOne(
      { _id: courseId as any },
      { $set: { published: true } }
    ).exec()
  );
  if (err3) return responseMsg(res, { msg: responseMsgs.WENT_WRONG });
  return responseMsg(res, {
    status: 200,
    error: false,
    msg: "Successfully published the course",
  });
};
