import { Request, Response } from "express";
import Qualification from "../../models/qualification";
import { responseMsg, runAsync } from "../../utils";

export async function getAllQualifications(_: Request, res: Response) {
  const [data, err] = await runAsync(Qualification.find().exec());
  if (err)
    return responseMsg(res, { status: 400, message: "Something went wrong, Please try again" });
  if (!data) return responseMsg(res, { status: 400, message: "No qualification available" });

  return responseMsg(res, {
    status: 200,
    error: false,
    message: `Successfully retrieved ${data.length} qualifications`,
    data: data,
  });
}
