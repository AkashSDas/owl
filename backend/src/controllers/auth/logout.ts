import { Request, Response } from "express";
import { responseMsg } from "../../utils";

export function logout(_: Request, res: Response) {
  res.clearCookie("token");
  return responseMsg(res, { status: 200, error: false, message: "User logged out" });
}
