import { Request, Response } from "express";
import { Fields, File, Files, IncomingForm } from "formidable";
import { v4 } from "uuid";
import { bucket } from "../firebase";
import Lesson from "../models/lesson";
import { responseMsg, runAsync } from "../utils";
import { getVideoDurationInSeconds } from "get-video-duration";

/**
 * @remarks
 * Create lesson then update chapter's lesson list and then increment lessons number in course along with course length
 * Shape of req.body
 * {
 *  name,           string
 *  description,    string
 *  note,           string (markdown) (optional)
 *  video,          file (video file)
 * }
 */
export async function createLessonAndPushToChapter(req: Request, res: Response) {
  let form = new IncomingForm({ keepExtensions: true });

  form.parse(req, async (err: any, fields: Fields, files: Files) => {
    if (err) {
      // If user is coming till here after passing all vaidators
      // then chances are high that the problem is in file itself
      return responseMsg(res, {
        status: 400,
        message: "There is some problem with the video file",
      });
    }

    let [lesson, error] = await runAsync(new Lesson(fields).save());
    if (error || !lesson)
      return responseMsg(res, {
        status: 400,
        message: "Something went wrong, Please try again",
      });

    const { video } = files;
    const filename = (video as File).originalFilename;
    const uuid = v4();
    const destination = `lesson-videos/${lesson._id}/${filename}`;
    const [, e] = await runAsync(
      bucket.upload((video as File).filepath, {
        destination,
        metadata: { metadata: { firebaseStorageDownloadTokens: uuid } },
      })
    );
    if (e) return responseMsg(res, { status: 400, message: "Failed to upload video" });
    const videoURL =
      "https://firebasestorage.googleapis.com/v0/b/" +
      bucket.name +
      "/o/" +
      encodeURIComponent(destination) +
      "?alt=media&token=" +
      uuid;

    const duration = parseFloat(((await getVideoDurationInSeconds(videoURL)) / 60).toFixed(2));
    lesson.videoURL = videoURL;
    lesson.videoDuration = duration;

    const [savedLesson, err2] = await runAsync(lesson.save());
    if (err2)
      return responseMsg(res, {
        status: 400,
        message: "Failed to save video url, Please try again",
      });

    // increment lessons count
    const course = req.course;
    course.numberOfLectures = course.numberOfLectures + 1;
    course.courseLength = course.courseLength + duration;
    await runAsync(course.save());

    // add to chapters list
    const chapter = req.chapter;
    chapter.lessons.push(lesson._id);
    await runAsync(chapter.save());

    return responseMsg(res, {
      status: 200,
      error: false,
      message: "Successfully created lesson",
      data: { lesson: savedLesson },
    });
  });
}
