import { Request, Response } from "express";
import Expertise from "../../models/expertise";
import { responseMsg, runAsync } from "../../utils";

export async function getAllExpertise(_: Request, res: Response) {
  const [data, err] = await runAsync(Expertise.find().exec());
  if (err)
    return responseMsg(res, { status: 400, message: "Something went wrong, Please try again" });
  if (!data) return responseMsg(res, { status: 400, message: "No expertise available" });

  return responseMsg(res, {
    status: 200,
    error: false,
    message: `Successfully retrieved ${data.length} expertise`,
    data: data,
  });
}
