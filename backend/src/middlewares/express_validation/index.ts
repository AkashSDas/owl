import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { responseMsg } from "../../utils";

/**
 * @remarks
 * To check validations on req set by express-validator
 * If no errors then move to next
 * If any error then send response msg telling about the error
 */
export function validationCheck(req: Request, res: Response, next: NextFunction): void {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  return responseMsg(res, { status: 422, message: errors.array()[0].msg });
}
