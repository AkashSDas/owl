import { NextFunction, Request, Response } from "express";
import Expertise, { ExpertiseDocument } from "../../models/expertise";
import { responseMsg, runAsync } from "../../utils";

/**
 * Get single doc by id
 */
export async function getExpertiseById(
  req: Request,
  res: Response,
  next: NextFunction,
  expertiseId: string
) {
  const [data, err] = await runAsync(Expertise.findById(expertiseId).exec());
  if (err)
    return responseMsg(res, { status: 400, message: "Something went wrong, Please try again" });
  if (!data) return responseMsg(res, { status: 400, message: "Expertise doesn't exists" });

  const expertise: ExpertiseDocument = data;
  req.expertise = expertise;

  next();
}
