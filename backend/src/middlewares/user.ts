import User, { UserDocument } from "../models/user";
import {
  IdMiddleware,
  Middleware,
  responseMsg,
  responseMsgs,
  runAsync,
} from "../utils";

/**
 * Get user (if exists) and set it to req.profile
 *
 * @params
 * id: user mongodb id
 */
export const getUserById: IdMiddleware = async (req, res, next, id) => {
  const [data, err] = await runAsync(User.findOne({ _id: id }).exec());
  if (err) return responseMsg(res, { msg: responseMsgs.WENT_WRONG });
  else if (!data) return responseMsg(res, { msg: responseMsgs.NO_USER });
  const user: UserDocument = data;
  req.profile = user;

  // Removing vital user info
  req.profile.salt = undefined;
  req.profile.encryptPassword = undefined;

  next();
};

/**
 * Check user exists using email (since its unique field) and if yes then
 * set req.user to the User found
 *
 * @remarks
 * Here req.body should have email property
 */
export const checkUserExists: Middleware = async (req, res, next) => {
  const [data, err] = await runAsync(
    User.findOne({ email: req.body.email }).exec()
  );

  if (err) return responseMsg(res, { msg: responseMsgs.WENT_WRONG });
  else if (!data) return responseMsg(res, { msg: responseMsgs.NO_USER });
  const user: UserDocument = data;
  req.profile = user;

  // Removing vital user info
  req.profile.salt = undefined;
  req.profile.encryptPassword = undefined;

  next();
};

/**
 * Check whether the request made is by a user with role of techer or not
 *
 * @remarks
 * This middleware should be used in conjuntion with
 * - getUserById which will set req.profile
 *
 * This function is synchronous in nature and async is only used to follow Middleware type
 */
export const isTeacher: Middleware = async (req, res, next) => {
  if (req.profile.roles.filter((role) => role === "teacher").length === 0) {
    return responseMsg(res, { status: 403, msg: responseMsgs.ACCESS_DENIED });
  }
  next();
};

/**
 * Check whether the request made is by a user with role of admin or not
 *
 * @remarks
 * This middleware should be used in conjuntion with
 * - getUserById which will set req.profile
 *
 * This function is synchronous in nature and async is only used to follow Middleware type
 */
export const isAdmin: Middleware = async (req, res, next) => {
  if (req.profile.roles.filter((role) => role === "admin").length === 0) {
    return responseMsg(res, { status: 403, msg: responseMsgs.ACCESS_DENIED });
  }
  next();
};
