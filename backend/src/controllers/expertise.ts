import { Request, Response } from "express";
import Expertise from "../models/expertise";
import { responseMsg, runAsync } from "../utils";

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

export async function deleteExpertise(req: Request, res: Response) {
  const expertise = req.expertise;
  const [, err] = await runAsync(expertise.deleteOne({ _id: expertise._id }));
  if (err) responseMsg(res, { status: 400, message: "Failed to delete expertise" });
  return responseMsg(res, {
    status: 200,
    error: false,
    message: "Successfully deleted expertise",
  });
}

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
