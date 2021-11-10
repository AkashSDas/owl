import { Request, Response } from "express";
import { responseMsg, runAsync } from "../../utils";

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
