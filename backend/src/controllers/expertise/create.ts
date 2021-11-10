import { Request, Response } from "express";
import Expertise from "../../models/expertise";
import { responseMsg, runAsync } from "../../utils";

export async function createExpertise(req: Request, res: Response) {
  // Checking if doc with same name already exists
  const [count, error] = await runAsync(
    Expertise.find({ name: req.body.name }).limit(1).count().exec()
  );
  if (error)
    return responseMsg(res, {
      status: 400,
      message: "Something went wrong, Please try again",
    });
  else if (count !== 0) return responseMsg(res, { status: 400, message: "Name is already used" });

  const [data, err] = await runAsync(new Expertise(req.body).save());

  if (err || !data)
    return responseMsg(res, {
      status: 400,
      message: "Failed to create expertise",
    });
  return responseMsg(res, {
    status: 200,
    error: false,
    message: "Expertise created successfully",
  });
}
