import { addRole, roleExists } from "../helpers/user";
import Teacher from "../models/teacher";
import { Controller, responseMsg, responseMsgs, runAsync } from "../utils";

/**
 * Make user an admin
 *
 * @todo
 * - Add something like `secret code` using which the user can become admin and not directly
 */
export const becomeAdmin: Controller = async (req, res) => {
  const exists = roleExists(req, "admin");
  if (exists)
    return responseMsg(res, {
      status: 200,
      error: false,
      msg: "You're already an admin",
    });

  // Make user an admin
  const isSuccess = await addRole(req, "admin");
  if (!isSuccess) return responseMsg(res, { msg: responseMsgs.WENT_WRONG });
  return responseMsg(res, {
    status: 200,
    error: false,
    msg: "You're now an admin",
  });
};

/**
 * Add teacher role to user's roles and create teacher doc for this user
 *
 * @remarks
 *
 * The operation of adding teacher role to user's role and creating teacher doc for
 * the user are separate and ideally if one fails and the other one should also fail
 * but currently there is option for bulk write across multiple collections in mongoDB.
 * So this is **current issue in this controller**
 *
 * The shape of req.body will be
 * - bio
 * - yearsOfExperience
 * - qualifications - List of mongoIDs of qualification
 * - expertise - List of mongoIDs of expertise
 *
 * @todo
 * - Add something like `secret code` using which the user can become admin and not directly
 */
export const becomeTeacher: Controller = async (req, res) => {
  const exists = roleExists(req, "teacher");
  if (exists)
    return responseMsg(res, {
      status: 200,
      error: false,
      msg: "You're already a teacher",
    });

  // Make user a teacher
  const isSuccess = await addRole(req, "teacher");
  if (!isSuccess) return responseMsg(res, { msg: responseMsgs.WENT_WRONG });

  // Create teacher doc
  const [teacher, err] = await runAsync(
    new Teacher({ userId: req.profile._id, ...req.body }).save()
  );
  if (err || !teacher) responseMsg(res, { msg: responseMsgs.WENT_WRONG });

  return responseMsg(res, {
    status: 200,
    error: false,
    msg: "You're now a teacher",
  });
};
