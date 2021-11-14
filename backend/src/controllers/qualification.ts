/**
 * Qualification for now are meant to be created by admins only.
 * So before performing any CUD(create, update, delete) qualification
 * opertation check whether the user is an admin or not
 *
 * Qualifications are going to be already set by admin so the teacher or anyone
 * can directly select from the given options
 */

import { checkQualificationExists } from "../helpers/qualification";
import Qualification from "../models/qualification";
import { Controller, responseMsg, responseMsgs, runAsync } from "../utils";

/**
 * Create qualification
 *
 * @remarks
 * Shape of req.body should be
 * - name
 * - emoji
 */
export const createQualification: Controller = async (req, res) => {
  const [count, err1] = await checkQualificationExists(req.body.name);
  if (err1) return responseMsg(res, { msg: responseMsgs.WENT_WRONG });
  if (count !== 0) return responseMsg(res, { msg: "Name is already used" });

  // Create new doc
  const [q, err2] = await runAsync(new Qualification(req.body).save());
  if (err2 || !q) return responseMsg(res, { msg: responseMsgs.WENT_WRONG });
  return responseMsg(res, {
    status: 200,
    error: false,
    msg: "Sccuessfully created qualification",
    data: { qualification: q },
  });
};

/**
 * Delete qualification
 *
 * @remarks
 * This should be used in conjunction with getQualificationById middleware
 * which will set req.qualification
 */
export const deleteQualification: Controller = async (req, res) => {
  const q = req.qualification;
  const [, err] = await runAsync(q.deleteOne({ _id: q._id }));
  if (err) return responseMsg(res, { msg: responseMsgs.WENT_WRONG });
  return responseMsg(res, {
    status: 200,
    error: false,
    msg: "Successfully deleted qualification",
  });
};

/**
 * Get all qualifications without pagination
 */
export const getAllQualifications: Controller = async (_, res) => {
  const [qs, err] = await runAsync(Qualification.find().exec());
  if (err) return responseMsg(res, { msg: responseMsgs.WENT_WRONG });
  if (!qs) return responseMsg(res, { msg: "No qualification available" });
  return responseMsg(res, {
    status: 200,
    error: false,
    msg: `Successfully retrieved ${qs.length} qualifications`,
    data: { qualifications: qs },
  });
};
