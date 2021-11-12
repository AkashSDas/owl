import { Request, Response } from "express";
import Chapter from "../models/chapter";
import Course from "../models/course";
import CourseChapters from "../models/course_chapters";
import Lesson from "../models/lesson";
import { responseMsg, runAsync } from "../utils";
import { bucket } from "../firebase";

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

/**
 * This update controller won't update lessons as they
 * are meant to be updated when lessons are created or deleted
 */
export async function updateChapter(req: Request, res: Response) {
  const chapter = req.chapter;
  const { name, description } = req.body;
  if (name) chapter.name = name;
  if (description) chapter.description = description;
  const [, err] = await runAsync(chapter.save());
  if (err) return responseMsg(res, { status: 400, message: "Failed to update chapter" });
  return responseMsg(res, {
    status: 200,
    error: false,
    message: "Successfully updated chapter",
  });
}

/**
 * Delete a chapter
 *
 * @remarks
 * While deleting a chapter there're multiple work
 * - Delete individual lessons (their mongoDB doc, firebase video)
 * - Update lesson number and course duration in course doc
 * - Remove this chater from chapter courses list
 */
export async function deleteChapter(req: Request, res: Response) {
  const courseChapters = req.courseChapters;
  const chapter = req.chapter;

  // Get total chapter video duration
  let chapterDuration = 0;
  const [lessons, _] = await runAsync(
    Lesson.find({ _id: { $in: chapter.lessons } }, "videoDuration").exec()
  );
  lessons.filter((doc) => {
    chapterDuration = doc.videoDuration + chapterDuration;
  });

  // Delete all lessons
  await runAsync(Lesson.deleteMany({ _id: { $in: chapter.lessons } }).exec());
  // Delete videos from firebase
  for (const doc of lessons) {
    await runAsync(bucket.deleteFiles({ prefix: `lesson-videos/${doc._id}` }));
  }

  // Update course
  await runAsync(
    Course.updateOne(
      { _id: courseChapters.courseId },
      {
        $inc: {
          courseLength: -chapterDuration,
          numberOfLectures: -lessons.length,
        },
      }
    ).exec()
  );

  // Remove this chapter from course chapters list
  const chapters = courseChapters.chapters.filter((id) => {
    if (id.equals(chapter._id)) return false;
    return true;
  });
  courseChapters.chapters = chapters;
  await runAsync(courseChapters.save());

  // Delete chapter
  await runAsync(chapter.deleteOne({ _id: chapter._id }));

  return responseMsg(res, {
    status: 200,
    error: false,
    message: "Successfully deleted chapter",
  });
}
