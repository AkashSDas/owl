import { Request, Response } from "express";
import { validationResult } from "express-validator";

/**
 * @remarks
 * This will handle async functions to avoid repeating
 * try-catch blocks
 *
 * @returns [result, err]
 */
export async function runAsync(promise: Promise<any>): Promise<Array<any>> {
  try {
    const result = await promise;
    return [result, null];
  } catch (err) {
    return [null, err];
  }
}

/**
 * @remarks
 * The response data from all routes will be of the following shape
 */
interface ResponseMessage {
  status: number;
  error?: boolean;
  message: string;
  data?: any;
}

/**
 * @remarks
 * Use this to send all the responses from routes
 * Keeping error=true and next=()=>{} by default
 */
export function responseMsg(
  res: Response,
  { status, error = true, message, data }: ResponseMessage,
  next: Function = () => {}
): void {
  res.status(status).json({ error, message, data });
  next();
}

/**
 * @remarks
 * To check validations on req set by express-validator
 * If no errors then do nothing
 * If any error then send response msg telling about the error
 *
 * @returns void
 */
export function validationCheck(req: Request, res: Response): void {
  const errors = validationResult(req);
  if (errors.isEmpty()) return null;
  return responseMsg(res, { status: 422, message: errors.array()[0].msg });
}
