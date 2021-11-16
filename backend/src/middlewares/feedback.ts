import Feedback, { FeedbackDocument } from "../models/feedback";
import { IdMiddleware, responseMsg, responseMsgs, runAsync } from "../utils";

/**
 * Get feedback (if exists) and set it to req.feedback
 *
 * @params
 * id: feedback mongodb id
 */
export const getFeedbackById: IdMiddleware = async (req, res, next, id) => {
  const [data, err] = await runAsync(Feedback.findOne({ _id: id }).exec());
  if (err) return responseMsg(res, { msg: responseMsgs.WENT_WRONG });
  else if (!data) return responseMsg(res, { msg: "Feedback doesn't exists" });
  const fb: FeedbackDocument = data;
  req.feedback = fb;
  next();
};
