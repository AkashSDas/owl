import jwt from "express-jwt";
import { Middleware, responseMsg, responseMsgs } from "../utils";

/**
 * Check whether the user is logged in or not
 *
 * @remarks
 * isLoggedIn middleware will check if the user is logged in
 * If yes then it will set req.auth property (since userProperty is `auth`) on req
 */
export const isLoggedIn = jwt({
  secret: process.env.SECRET_KEY,
  userProperty: "auth",
  algorithms: ["HS256"],
});

/**
 * Check whether the user is authenticated or not
 *
 * @remarks
 * This will check whether the request made the user and auth state are of the same user or not
 *
 * This middleware should be used in conjunction with
 * - getUserById middleware where the `req.profile` will be set by it
 * - isLoggedIn middleware where the `req.auth` will be set by it
 *
 * This function is synchronous in nature and async is only used to follow Middleware type
 */
export const isAuthenticated: Middleware = async (req, res, next) => {
  const profile = req.profile;
  const auth = req.auth;

  // using double = since we are just checking the value and not the object (as they are different)
  const check = profile && auth && profile._id == auth._id;
  if (!check)
    return responseMsg(res, { status: 403, msg: responseMsgs.ACCESS_DENIED });
  next();
};
