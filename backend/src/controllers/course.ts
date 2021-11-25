import Course, { CourseDocument } from "../models/course";
import { Controller, responseMsg, responseMsgs, runAsync } from "../utils";
import { IncomingForm } from "formidable";
import { courseUpdateFormCallback } from "../helpers/course";
import Chapter from "../models/chapter";
import Lesson from "../models/lesson";
import { deleteFileInFirebaseStorage } from "../firebase";
import { getOrCreateUserPurchaseDoc } from "../helpers/user_purchase";
import { createPaymentIntentAndCharge } from "../payments/payment";
import UserPurchase from "../models/user_purchase";
import MongoPaging from "mongo-cursor-pagination";
import Teacher from "../models/teacher";
import Feedback from "../models/feedback";

/**
 * Create course
 *
 * @remarks
 *
 * Shape of req.body will be
 * - name
 * - description - (this will be markdown)
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
 * - getUserById middleware which will set req.profile which will used for userId
 */
export const createCourse: Controller = async (req, res) => {
  // Getting teacher
  const [teacher, err1] = await runAsync(
    Teacher.findOne({ userId: req.profile._id }).exec()
  );
  if (err1) return responseMsg(res, { msg: responseMsgs.WENT_WRONG });
  else if (!teacher) return responseMsg(res, { msg: "Teacher doesn't exists" });

  // Creating course
  const [course, err] = await runAsync(
    new Course({ teacherId: teacher._id, ...req.body }).save()
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
 *
 * @todo
 * - User can do such that pass all the checks and upload the course and
 * then make the course empty and still the course will be published. So add
 * check while deleting lesson and chapter to check if the course is published
 * or not
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

/**
 * Purchase a course
 *
 * @remarks
 *
 * The shape of req.body
 * - amount
 * - payment_method
 *
 * The req.params should've
 * - userId
 * - courseId
 *
 * @todo
 * - Check whether the course in req.params.courseId exists or not
 * - Check whether the user in req.params.userId exists or not
 */
export const purchaseCourse: Controller = async (req, res) => {
  const userId = req.params.userId;
  const courseId = req.params.courseId;

  const userPurchase = await getOrCreateUserPurchaseDoc(userId);
  if (!userPurchase) return responseMsg(res, { msg: responseMsgs.WENT_WRONG });

  // Checking whether the user have purchased the course or not
  if (userPurchase.courses.filter((id) => id === (courseId as any)).length > 0)
    return responseMsg(res, { msg: "You've already purchased the course" });

  // Charge for course
  const { amount, payment_method } = req.body;
  const paymentIntent = await createPaymentIntentAndCharge(
    userId,
    amount,
    payment_method
  );
  if (!paymentIntent) return responseMsg(res, { msg: responseMsgs.WENT_WRONG });

  // Add course to user's purchased courses
  const [, err] = await runAsync(
    UserPurchase.updateOne(
      { _id: userPurchase._id },
      { $push: { courses: courseId as any } }
    ).exec()
  );
  if (!err) return responseMsg(res, { msg: responseMsgs.WENT_WRONG });

  // Increment number of students entrolled in this course
  const [, err2] = await runAsync(
    Course.updateOne(
      { _id: courseId as any },
      { $inc: { numberOfStudentsEnrolled: 1 } }
    ).exec()
  );
  if (!err2) return responseMsg(res, { msg: responseMsgs.WENT_WRONG });

  return responseMsg(res, {
    status: 200,
    error: false,
    msg: "Successfully purchased the course",
  });
};

/**
 * Get my all courses
 *
 * @todo
 * - Check whether the user exists or not
 */
export const getUserAllCourses: Controller = async (req, res) => {
  const next = req.query.next;
  const LIMIT = 1;
  const limit = req.query.limit ? parseInt(req.query.limit as string) : LIMIT;
  const user = req.profile;

  const [teacherDoc, err1] = await runAsync(
    Teacher.findOne({ userId: user._id }, "_id").exec()
  );
  if (err1) return responseMsg(res, { msg: responseMsgs.WENT_WRONG });
  if (!teacherDoc)
    return responseMsg(res, { msg: "This teacher does not exists" });

  const [data, err2] = await runAsync(
    MongoPaging.find(Course.collection, {
      query: { teacherId: teacherDoc._id },
      paginatedField: "updatedAt",
      limit,
      next,
    })
  );
  if (err2 || !data) return responseMsg(res, { msg: responseMsgs.WENT_WRONG });

  let courses = [];
  for (let i = 0; i < data.results.length; i++) {
    const [course, err] = await runAsync(
      Course.populate(data.results[i], "level")
    );
    if (err) return responseMsg(res, { msg: responseMsgs.WENT_WRONG });
    const c: CourseDocument = course;

    // Get course rating
    const [ratingDocs, err2] = await runAsync(
      Feedback.find({ userId: user._id, courseId: c._id }, "rating").exec()
    );
    if (err2) return responseMsg(res, { msg: responseMsgs.WENT_WRONG });
    let ratings = 0;
    if (ratingDocs && ratingDocs.length > 0) {
      ratingDocs.forEach((r: any) => (ratings = ratings + r.rating));
      ratings = parseFloat((ratings / ratingDocs.length).toFixed(2));
    }

    // Get course watch time
    const [lessonDocs, err3] = await runAsync(
      Lesson.find({ courseId: c._id }, "videoDuration").exec()
    );
    if (err3) return responseMsg(res, { msg: responseMsgs.WENT_WRONG });
    let duration = 0;
    if (lessonDocs && lessonDocs.length > 0) {
      lessonDocs.forEach((l: any) => (duration = duration + l.videoDuration));
      duration = parseFloat((duration / lessonDocs.length).toFixed(2));
    }

    console.log(duration, ratings);

    courses.push({
      _id: c._id,
      teacherId: c.teacherId,
      name: c.name,
      description: c.description,
      coverImgURL: c.coverImgURL,
      price: c.price,
      published: c.published,
      level: c.level,
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
      numberOfStudentsEnrolled: c.numberOfStudentsEnrolled,
      duration,
      ratings,
    });
  }

  return responseMsg(res, {
    status: 200,
    error: false,
    msg: `Retrived ${courses.length} courses successfully`,
    data: {
      courses,
      previous: data.previous,
      hasPrevious: data.hasPrevious,
      next: data.next,
      hasNext: data.hasNext,
    },
  });
};
