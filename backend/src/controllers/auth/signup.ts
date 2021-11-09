import { Request, Response } from "express";
import User from "../../models/user";
import { responseMsg, runAsync } from "../../utils";

/**
 * @remarks
 * Save user in the database thus signing up the  user
 *
 * @todo
 * - Add req.body check to take only those values needed for User creation
 */
export async function signup(req: Request, res: Response): Promise<void> {
  // Checking if email is already used`
  const [count, error] = await runAsync(
    User.find({ email: req.body.email }).limit(1).count().exec()
  );
  if (error) return responseMsg(res, { status: 400, message: "Signup failed" });
  else if (count !== 0) return responseMsg(res, { status: 400, message: "Email is already used" });

  const [data, err] = await runAsync(new User(req.body).save());
  if (err || !data) return responseMsg(res, { status: 400, message: "Signup failed" });
  return responseMsg(res, { status: 200, error: false, message: "Account created successfully" });
}
