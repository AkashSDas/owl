import Feedback from "../models/feedback";
import UserPurchase from "../models/user_purchase";
import { Controller, responseMsg, responseMsgs, runAsync } from "../utils";

/**
 * Create feedback
 *
 * @remarks
 *
 * Feedback can be created only one per user. User can delete and then create
 * a new one
 *
 * User who purchased a course can give their feedback on that course
 * and by no other way user can give feedback
 *
 * req.params should've the following
 * - userId
 * - courseId
 *
 * Shape of req.body
 * - rating
 * - comment
 *
 * @todo
 * - Check whether the user in userId exists or not
 * - Check whether the course in courseId exists or not
 * - Check whether the user has already given their feedback,
 */
export const createFeedback: Controller = async (req, res) => {
  const userId = req.params.userId;
  const courseId = req.params.courseId;

  // Check whether the user have purchased the course or not
  const [courses, err1] = await runAsync(
    UserPurchase.findOne({ _id: userId as any }, "courses").exec()
  );
  if (err1) return responseMsg(res, { msg: responseMsgs.WENT_WRONG });
  if (courses.filter((id: any) => id === courseId).length === 0)
    return responseMsg(res, {
      status: 200,
      error: false,
      msg: "You've not purchased the course, So you can't give your feedback",
    });

  // Add feedback
  const [feedback, err2] = await runAsync(
    new Feedback({
      userId: userId as any,
      courseId: courseId as any,
      ...req.body,
    }).save()
  );
  if (err2 || !feedback)
    return responseMsg(res, { msg: responseMsgs.WENT_WRONG });

  return responseMsg(res, {
    status: 200,
    error: false,
    msg: "Thank's for your feedback",
    data: { feedback },
  });
};

/**
 * Update feedback
 *
 * @remarks
 *
 * Here not check whether the user purchased the course or not
 * since if user has created a feedback means they have purchased it
 * and if not then there won't be any feedback and hence there won't be
 * doc to update
 *
 * req.params should've the following
 * - userId
 *
 * Shape of req.body (all optional)
 * - rating
 * - comment
 *
 * Use this in conjunction with
 * - getFeedbackById since it will set req.feedback
 *
 * @todo
 * - Check whether the user in userId exists or not
 */
export const updateFeedback: Controller = async (req, res) => {
  const feedback = req.feedback;
  const userId = req.params.userId;

  // Check whether the user is updating their feedback
  if (feedback.userId !== (userId as any))
    return responseMsg(res, { status: 401, msg: responseMsgs.ACCESS_DENIED });

  let updateData = {};
  const { rating, comment } = req.body;
  if (rating) updateData["rating"] = rating;
  if (comment) updateData["comment"] = comment;

  const [, err] = await runAsync(
    Feedback.updateOne(
      { _id: feedback._id },
      { $set: { ...updateData } }
    ).exec()
  );
  if (err) return responseMsg(res, { msg: responseMsgs.WENT_WRONG });
  return responseMsg(res, {
    status: 200,
    error: false,
    msg: "Feedback updated",
  });
};

/**
 * Delete feedback
 *
 * @remarks
 *
 * The req.params should have
 * - userId
 *
 * Use this in conjunction with
 * - getFeedbackById since it will set req.feedback
 *
 * @todo
 * - Check whether the user in userId exists or not
 */
export const deleteFeedback: Controller = async (req, res) => {
  const feedback = req.feedback;
  const userId = req.params.userId;

  // Check whether the user is updating their feedback
  if (feedback.userId !== (userId as any))
    return responseMsg(res, { status: 401, msg: responseMsgs.ACCESS_DENIED });

  const [, err] = await runAsync(
    Feedback.deleteOne({ _id: feedback._id }).exec()
  );
  if (err) return responseMsg(res, { msg: responseMsgs.WENT_WRONG });
  return responseMsg(res, {
    status: 200,
    error: false,
    msg: "Feedback deleted",
  });
};
