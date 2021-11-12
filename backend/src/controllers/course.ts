import { Request, Response } from "express";
import Course from "../models/course";
import CourseChapters from "../models/course_chapters";
import { responseMsg, runAsync } from "../utils";
import formidable from "formidable";
import _ from "lodash";
import { v4 } from "uuid";
import { bucket } from "../firebase";
import Lesson from "../models/lesson";
import Chapter from "../models/chapter";

/**
 * Create course
 *
 * @remarks
 * req.body shape will be
 *  {
 *      name,
 *      description,
 *      level
 *  }
 *
 * Course will be created incrementally so therefore only using
 * name, description and level (course level) to create the course
 *
 * @todo
 * - Make creation of course and course chapters robust so that if course is created
 * later on course chapters can be created separately
 */
export async function createCourse(req: Request, res: Response) {
  const user = req.profile; // since teacherId === user._id

  // Only below values will be used to create a course
  const { name, description, level } = req.body;
  const courseData = {
    teacherId: user._id,
    name,
    description,
    level,
  };

  const [data, err] = await runAsync(new Course(courseData).save());

  if (err || !data)
    return responseMsg(res, {
      status: 400,
      message: "Failed to create course",
    });

  // Create course chapters
  const [chapters, error] = await runAsync(new CourseChapters({ courseId: data._id }).save());
  if (error || !chapters)
    return responseMsg(res, {
      status: 400,
      message: "Failed to create course",
    });

  return responseMsg(res, {
    status: 200,
    error: false,
    message: "Course created successfully",
  });
}

/**
 * Update course metadata that are meant to be updated by user (teacher)
 *
 * @remarks
 * course metadata that are public
 *  - name
 *  - description
 *  - coverImgURL
 *  - level
 * Shape of req.body will be (note all of these fields are optional)
 *  {
 *      name,           string
 *      description,    string
 *      coverImg,       file
 *      level           mongoId
 *  }
 *
 * @todo
 * - Add check on incoming data i.e. fields - it shouldn't contain
 * any other fields to avoid accidental update of any other field in course doc
 */
export async function updateCoursePublicMetadata(req: Request, res: Response) {
  let form = new formidable.IncomingForm({ keepExtensions: true });

  const filterData = (fields: formidable.Fields): Object => {
    let newData = {};

    // only these are going to be present in `fields`
    const updateFields = ["name", "description", "level"];

    for (const key in fields) {
      if (updateFields.filter((field) => field === key).length === 1) {
        newData[key] = fields[key];
      }
    }

    return newData;
  };

  form.parse(req, async (err: any, fields: formidable.Fields, files: formidable.Files) => {
    if (err) {
      // If user is coming till here after passing all vaidators
      // then chances are high that the problem is in file itself
      return responseMsg(res, {
        status: 400,
        message: "There is some problem with the image file",
      });
    }

    let course = req.course;
    const updateData = filterData(fields);
    course = _.extend(course, updateData);

    const { coverImg } = files;
    if (coverImg) {
      // Save cover img
      const courseId = req.course._id;
      const filename = (coverImg as formidable.File).originalFilename;

      const uuid = v4();
      const destination = `course-cover-imgs/${courseId}/${filename}`;

      // Delete old cover img
      // Note: Be careful with deleteFiles, if empty string is passed to prefix
      // then it will delete everything in the bucket
      const [, deleteErr] = await runAsync(
        bucket.deleteFiles({ prefix: `course-cover-imgs/${courseId}` })
      );

      // If there's only one file to be deleted then use the below method
      //   const [, deleteErr] = await runAsync(
      //     bucket.file(`blog-post-cover-imgs/${userId}/${blogPost._id}/${filename}`).delete()
      //   );

      if (deleteErr)
        return responseMsg(res, { status: 400, message: "Failed to delete post cover image" });

      const [, err] = await runAsync(
        bucket.upload((coverImg as formidable.File).filepath, {
          destination,
          metadata: { contentType: "image/png", metadata: { firebaseStorageDownloadTokens: uuid } },
        })
      );

      if (err) return responseMsg(res, { status: 400, message: "Could not save cover image" });

      const photoURL =
        "https://firebasestorage.googleapis.com/v0/b/" +
        bucket.name +
        "/o/" +
        encodeURIComponent(destination) +
        "?alt=media&token=" +
        uuid;

      course.coverImgURL = photoURL;
    }

    const [savedCourse, error] = await runAsync(course.save());
    if (error) return responseMsg(res, { status: 400, message: "Could not update course" });
    return responseMsg(res, {
      status: 200,
      error: false,
      message: "Successfully update course",
      data: {
        // Just sending fields that were updated instead of the entire payload
        name: savedCourse.name,
        description: savedCourse.description,
        level: savedCourse.level,
        coverImgURL: savedCourse.coverImgURL,
      },
    });
  });
}

/**
 * Delete a course
 *
 * @remarks
 * Deleting a course involves multiple work
 * - Deleting course doc
 * - Deleting courseChapters doc where courseId === course._id
 * - Deleting all chapters in courseChapters
 * - Deleting all lessons in above chapters
 * - Delete video files of above lessons in firebase
 * One good thing is that we don't have to update any metadata as they all are going to be deleted
 */
export async function deleteCourse(req: Request, res: Response) {
  const course = req.course;

  // Get course chapters
  const [courseChapters, _err1] = await runAsync(
    CourseChapters.findOne({ courseId: course._id }).populate("chapters", "lessons").exec()
  );

  // Needed to delete all chapters and lessons associated with this
  let chapterIds = [];
  let lessonIds = [];

  // Deleting video files of all lessons
  for (const chapter of courseChapters.chapters) {
    chapterIds.push(chapter._id);

    for (const lessonId of chapter.lessons) {
      lessonIds.push(lessonId);
      await runAsync(bucket.deleteFiles({ prefix: `lesson-videos/${lessonId}` }));
    }
  }

  // Delete lessons and chapters
  await runAsync(Chapter.deleteMany({ _id: { $in: chapterIds } }).exec());
  await runAsync(Lesson.deleteMany({ _id: { $in: lessonIds } }).exec());

  // Delete course chapters and course
  await runAsync(CourseChapters.deleteOne({ courseId: course._id }).exec());
  await runAsync(Course.deleteOne({ _id: course._id }).exec());

  return responseMsg(res, {
    status: 200,
    error: false,
    message: "Successfully deleted the course",
  });
}
