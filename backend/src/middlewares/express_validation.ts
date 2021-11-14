import { validationResult } from "express-validator";
import { Middleware, responseMsg } from "../utils";

/**
 * @remarks
 * To check validations on req set by express-validator
 * If no errors then move to next
 * If any error then send response msg telling about the error
 */
export const validationCheck: Middleware = async (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  return responseMsg(res, { status: 422, msg: errors.array()[0].msg });
};
