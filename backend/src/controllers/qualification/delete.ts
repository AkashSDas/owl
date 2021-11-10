import { Request, Response } from "express";
import { responseMsg, runAsync } from "../../utils";

export async function deleteQualification(req: Request, res: Response) {
  const qualification = req.qualification;
  const [, err] = await runAsync(qualification.deleteOne({ _id: qualification._id }));
  if (err) responseMsg(res, { status: 400, message: "Failed to delete qualification" });
  return responseMsg(res, {
    status: 200,
    error: false,
    message: "Successfully deleted qualification",
  });
}
