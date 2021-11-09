import { Request, Response } from "express";
import User, { UserDocument } from "../../models/user";
import { responseMsg, runAsync } from "../../utils";
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
