import { Request, Response } from "express";
import { Fields, File, Files } from "formidable";
import getVideoDurationInSeconds from "get-video-duration";
import { extend } from "lodash";
import {
  deleteFileInFirebaseStorage,
  uploadToFirebaseStorage,
} from "../firebase";
import Lesson from "../models/lesson";
import { responseMsg, responseMsgs, runAsync } from "../utils";

/**
 * Callback function for formidable.IncomingForm.parse function which handles
 * this work of creating a course
 */
export const lessonCreateFormCallback = async (
  req: Request,
  res: Response,
  err: any,
  fields: Fields,
  files: Files
): Promise<void> => {
  // If user is coming till here after passing all vaidators then chances are
  // high that the problem is in the file itself
  if (err) responseMsg(res, { msg: "There is some issue with the file" });

  const { video } = files;
  if (!fields.name || !fields.description || !video)
    return responseMsg(res, { msg: "Include all fields" });

  const lesson = new Lesson({
    courseId: req.params.courseId,
    chapterId: req.params.chapterId,
    ...fields,
  });

  // Saving the video
  // Keeping destination name like this so that in deletion of chapter and course becomes easy
  const destination = `lesson-videos/${req.params.courseId}/${req.params.chapterId}/${lesson._id}`;
  const url = await uploadToFirebaseStorage(destination, files.video as File);
  if (url.length === 0)
    return responseMsg(res, { msg: responseMsgs.WENT_WRONG });
  lesson.videoURL = url;
  lesson.videoDuration = parseFloat(
    ((await getVideoDurationInSeconds(url)) / 60).toFixed(2)
  );

  const [data, error] = await runAsync(lesson.save());
  if (error) return responseMsg(res, { msg: responseMsgs.WENT_WRONG });
  return responseMsg(res, {
    status: 200,
    error: false,
    msg: "Successfully created a lesson",
    data: { lesson: data },
  });
};

/**
 * Callback function for formidable.IncomingForm.parse function which handles
 * this work of updating a course.
 *
 * @todo
 * - Update course updatedAt field after updating successfully
 */
export const lessonUpdateFormCallback = async (
  req: Request,
  res: Response,
  err: any,
  fields: Fields,
  files: Files
): Promise<void> => {
  // If user is coming till here after passing all vaidators then chances are
  // high that the problem is in the file itself
  if (err) responseMsg(res, { msg: "There is some issue with the file" });

  let lesson = req.lesson;
  // merging the lessons and fields objects and overwritting lessons with new updated values
  lesson = extend(lesson, fields);

  const { video } = files;
  if (video) {
    // Updating the video

    // Delete video
    const destination = `lesson-videos/${req.params.courseId}/${req.params.chapterId}/${lesson._id}`;
    const wasDeleted = await deleteFileInFirebaseStorage(destination);
    if (!wasDeleted) return responseMsg(res, { msg: responseMsgs.WENT_WRONG });

    // Upload video
    const url = await uploadToFirebaseStorage(destination, video as File);
    if (url.length === 0)
      return responseMsg(res, { msg: responseMsgs.WENT_WRONG });
    lesson.videoURL = url;
    lesson.videoDuration = parseFloat(
      ((await getVideoDurationInSeconds(url)) / 60).toFixed(2)
    );
  }

  const [data, error] = await runAsync(lesson.save());
  if (error) return responseMsg(res, { msg: responseMsgs.WENT_WRONG });
  return responseMsg(res, {
    status: 200,
    error: false,
    msg: "Successfully updated the lesson",
    data: { lesson: data },
  });
};
