import { Request, Response } from "express";
import Qualification from "../../models/qualification";
import { responseMsg, runAsync } from "../../utils";

export async function createQualification(req: Request, res: Response) {
  // Checking if qualification name is already used`
  const [count, error] = await runAsync(
    Qualification.find({ name: req.body.name }).limit(1).count().exec()
  );
  if (error)
    return responseMsg(res, {
      status: 400,
      message: "Something went wrong, Please try again",
    });
  else if (count !== 0)
    return responseMsg(res, { status: 400, message: "Name is already used" });

  const [data, err] = await runAsync(new Qualification(req.body).save());

  if (err || !data)
    return responseMsg(res, {
      status: 400,
      message: "Failed to create qualification",
    });
  return responseMsg(res, {
    status: 200,
    error: false,
    message: "Qualification created successfully",
  });
}
