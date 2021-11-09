import { Request, Response } from "express";
import User, { UserDocument } from "../../models/user";
import { responseMsg, runAsync } from "../../utils";

/**
 * Check user's role
 */
async function checkRole(req: Request, res: Response, role: string): Promise<void | UserDocument> {
  const user = req.profile;
  const [data, err] = await runAsync(User.findOne({ _id: user._id }).exec());

  if (err)
    return responseMsg(res, { status: 400, message: "Something went wrong, Please try again" });
  else {
    const userDoc: UserDocument = data;
    if (user.roles.filter((r: string) => r === role).length > 0)
      return responseMsg(res, { status: 200, error: false, message: `You're already a ${role}` });
    else return userDoc;
  }
}

/**
 * Give user role
 */
async function makeRole(user: UserDocument, res: Response, role: string): Promise<void> {
  user.roles.push(role);
  const [, err] = await runAsync(user.save());

  if (err)
    return responseMsg(res, { status: 400, message: "Something went wrong, Please try again" });
  else
    return responseMsg(res, {
      status: 200,
      error: false,
      message: `The account now has ${role} privileges`,
    });
}

/**
 * Make existing User an admin
 *
 * @todo
 * - Add something like `secret code` using which the user can become admin and not directly
 */
export async function becomeAdmin(req: Request, res: Response): Promise<void> {
  const user = await checkRole(req, res, "admin");
  if (user) makeRole(user as unknown as UserDocument, res, "admin");
}

/**
 * Make existing User an teacher
 *
 * @todo
 * - Add something like `secret code` using which the user can become teacher and not directly
 */
export async function becomeTeacher(req: Request, res: Response): Promise<void> {
  const user = await checkRole(req, res, "teacher");
  if (user) makeRole(user as unknown as UserDocument, res, "teacher");
}
