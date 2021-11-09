import { NextFunction, Request, Response } from "express";
import User, { UserDocument } from "../../models/user";
import { responseMsg, runAsync } from "../../utils";

/**
 * Get single by id
 */
export async function getUserById(req: Request, res: Response, next: NextFunction, userId: string) {
  const [data, err] = await runAsync(User.findById(userId).exec());
  if (err)
    return responseMsg(res, { status: 400, message: "Something went wrong, Please try again" });
  if (!data) return responseMsg(res, { status: 400, message: "User doesn't exists" });

  const user: UserDocument = data;
  req.profile = user;

  // Removing unnecessary user info
  req.profile.salt = undefined;
  req.profile.encryptPassword = undefined;

  next();
}
