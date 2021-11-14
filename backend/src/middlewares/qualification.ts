import Qualification, { QualificationDocument } from "../models/qualification";
import { IdMiddleware, responseMsg, responseMsgs, runAsync } from "../utils";

/**
 * Get qualifiction (if exists) and set it to req.qualification
 *
 * @params
 * id: qualification mongodb id
 */
export const getQualificationById: IdMiddleware = async (
  req,
  res,
  next,
  id
) => {
  const [data, err] = await runAsync(Qualification.findOne({ _id: id }).exec());
  if (err) return responseMsg(res, { msg: responseMsgs.WENT_WRONG });
  else if (!data)
    return responseMsg(res, { msg: "Qualification doesn't exists" });
  const q: QualificationDocument = data;
  req.qualification = q;
  next();
};
