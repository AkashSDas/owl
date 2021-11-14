import Expertise, { ExpertiseDocument } from "../models/expertise";
import { IdMiddleware, responseMsg, responseMsgs, runAsync } from "../utils";

/**
 * Get expertise (if exists) and set it to req.expertise
 *
 * @params
 * id: expertise mongodb id
 */
export const getExpertiseById: IdMiddleware = async (req, res, next, id) => {
  const [data, err] = await runAsync(Expertise.findOne({ _id: id }).exec());
  if (err) return responseMsg(res, { msg: responseMsgs.WENT_WRONG });
  else if (!data) return responseMsg(res, { msg: "Expertise doesn't exists" });
  const exp: ExpertiseDocument = data;
  req.expertise = exp;
  next();
};
