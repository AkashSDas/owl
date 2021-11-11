import { Request, Response } from "express";
import User, { UserDocument } from "../models/user";
import { responseMsg, runAsync } from "../utils";
import * as jsonwebtoken from "jsonwebtoken";

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const [data, err] = await runAsync(User.findOne({ email }).exec());
  if (err)
    return responseMsg(res, { status: 400, message: "Something went wrong, Please try again" });
  else if (!data) return responseMsg(res, { status: 400, message: "User does not exists" });

  // Authentication
  const user: UserDocument = data;
  if (!user.authenticate(password))
    return responseMsg(res, { status: 401, message: "Wrong password" });

  // Adding auth cookie
  const token = jsonwebtoken.sign({ _id: user._id }, process.env.SECRET_KEY);
  res.cookie("token", token, { expires: new Date(Number(new Date()) + 9999) });

  return responseMsg(res, {
    status: 200,
    error: false,
    message: "Successfully logged in",
    data: {
      token,
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
        roles: user.roles,
        profilePicURL: user.profilePicURL,
        dateOfBirth: user.dateOfBirth,
      },
    },
  });
}

export function logout(_: Request, res: Response) {
  res.clearCookie("token");
  return responseMsg(res, { status: 200, error: false, message: "User logged out" });
}

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
