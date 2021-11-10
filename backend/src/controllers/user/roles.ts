import { Request, Response } from "express";
import Teacher from "../../models/teacher";
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
 * @remarks
 * Here db operations (creating teacher doc and add teacher role to user doc) both needs to be
 * completed together or else if one fails then other one should not be executed. Now the issue
 * it bulk write in mongodb are for same collection but here we've separate collection namely
 * Teachers and Users. This is one flaw in this implementation
 *
 * @todo
 * - Add something like `secret code` using which the user can become teacher and not directly
 * - Check whether object ids in qualifications and expertise are mongo object ids
 * - Check whether mongo object ids in qualifications and expertise exists
 * - What to do when qualifications and expertise in teacher doc if they're deleted in their respective collections
 */
export async function becomeTeacher(req: Request, res: Response): Promise<void> {
  const user = await checkRole(req, res, "teacher");
  if (user) {
    // Creating teacher doc
    const [data, err] = await runAsync(new Teacher({ userId: user._id, ...req.body }).save());

    if (err || !data)
      return responseMsg(res, {
        status: 400,
        message: "Something went wrong, Please try again",
      });

    // Add teacher role to user doc
    makeRole(user as unknown as UserDocument, res, "teacher");
  }
}
