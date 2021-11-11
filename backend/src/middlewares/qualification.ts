import { NextFunction, Request, Response } from "express";
import Qualification, { QualificationDocument } from "../models/qualification";
import { responseMsg, runAsync } from "../utils";

/**
 * Get single doc by id
 */
export async function getQualificationById(
  req: Request,
  res: Response,
  next: NextFunction,
  qualificationId: string
) {
  const [data, err] = await runAsync(Qualification.findById(qualificationId).exec());
  if (err)
    return responseMsg(res, { status: 400, message: "Something went wrong, Please try again" });
  if (!data) return responseMsg(res, { status: 400, message: "Qualification doesn't exists" });

  const qualification: QualificationDocument = data;
  req.qualification = qualification;

  next();
}
