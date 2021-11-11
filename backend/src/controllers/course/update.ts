import { Request, Response } from "express";
import formidable from "formidable";
import { responseMsg, runAsync } from "../../utils";
import _ from "lodash";
import { v4 } from "uuid";
import { bucket } from "../../firebase";

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
