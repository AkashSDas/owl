/**
 * Expertise for now are meant to be created by admins only.
 * So before performing any CUD(create, update, delete) expertise
 * opertation check whether the user is an admin or not
 *
 * Expertise are going to be already set by admin so the teacher or anyone
 * can directly select from the given options
 */

import { checkExpertiseExists } from "../helpers/expertise";
import Expertise from "../models/expertise";
import { Controller, responseMsg, responseMsgs, runAsync } from "../utils";

/**
 * Create expertise
 *
 * @remarks
 * Shape of req.body should be
 * - name
 * - emoji
 */
export const createExpertise: Controller = async (req, res) => {
  const [count, err1] = await checkExpertiseExists(req.body.name);
  if (err1) return responseMsg(res, { msg: responseMsgs.WENT_WRONG });
  if (count !== 0) return responseMsg(res, { msg: "Name is already used" });

  // Create new doc
  const [exp, err2] = await runAsync(new Expertise(req.body).save());
  if (err2 || !exp) return responseMsg(res, { msg: responseMsgs.WENT_WRONG });
  return responseMsg(res, {
    status: 200,
    error: false,
    msg: "Sccuessfully created expertise",
    data: { expertise: exp },
  });
};

/**
 * Delete expertise
 *
 * @remarks
 * This should be used in conjunction with getExpertiseById middleware
 * which will set req.expertise
 */
export const deleteExpertise: Controller = async (req, res) => {
  const exp = req.expertise;
  const [, err] = await runAsync(exp.deleteOne({ _id: exp._id }));
  if (err) return responseMsg(res, { msg: responseMsgs.WENT_WRONG });
  return responseMsg(res, {
    status: 200,
    error: false,
    msg: "Successfully deleted expertise",
  });
};

/**
 * Get all expertise without pagination
 */
export const getAllExpertise: Controller = async (_, res) => {
  const [exp, err] = await runAsync(Expertise.find().exec());
  if (err) return responseMsg(res, { msg: responseMsgs.WENT_WRONG });
  if (!exp) return responseMsg(res, { msg: "No expertise available" });
  return responseMsg(res, {
    status: 200,
    error: false,
    msg: `Successfully retrieved ${exp.length} expertise`,
    data: { expertise: exp },
  });
};
