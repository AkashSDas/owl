import Feedback from "../models/feedback";
import UserPurchase from "../models/user_purchase";
import { Controller, responseMsg, responseMsgs, runAsync } from "../utils";

/**
 * Create feedback
 *
 * @remarks
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
