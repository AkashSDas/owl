import { Request, Response } from "express";
import { Fields, File, Files } from "formidable";
import { responseMsg, responseMsgs, runAsync } from "../utils";
import { extend } from "lodash";
import {
  deleteFileInFirebaseStorage,
  uploadToFirebaseStorage,
} from "../firebase";

/**
 * This function is a callback for formidable IncomingForm.parse callback in
 * **updateCoursePublicData** controller
 *
 * This callback does the updating work of course public data
 */
export const courseUpdateFormCallback = async (
  req: Request,
  res: Response,
  err: any,
  fields: Fields,
  files: Files
): Promise<void> => {
  // If user is coming till here after passing all vaidators then chances are
  // high that the problem is in the file itself
  if (err) responseMsg(res, { msg: "There is some issue with the file" });

  let course = req.course;
  // updating course object with new updated data sent by user
  course = extend(course, fields);

  if (files.coverImg) {
    // Delete img
    const destination = `course-cover-imgs/${course._id}`;
    const wasDeleted = await deleteFileInFirebaseStorage(destination);
    if (!wasDeleted) return responseMsg(res, { msg: responseMsgs.WENT_WRONG });

    // Upload img
    const url = await uploadToFirebaseStorage(
      destination,
      files.coverImg as File,
      { contentType: "image/png" }
    );
    if (url.length === 0)
      return responseMsg(res, { msg: responseMsgs.WENT_WRONG });
    course.coverImgURL = url;
  }

  const [updatedCourse, error] = await runAsync(course.save());
  if (error) return responseMsg(res, { msg: responseMsgs.WENT_WRONG });
  return responseMsg(res, {
    status: 200,
    error: false,
    msg: "Successfully updated the course",
    data: {
      course: {
        // Just sending fields that were updated instead of the entire payload
        name: updatedCourse.name,
        description: updatedCourse.description,
        level: updatedCourse.level,
        coverImgURL: updatedCourse.coverImgURL,
      },
    },
  });
};
