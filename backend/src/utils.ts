import { NextFunction, Request, Response } from "express";

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
  status?: number;
  error?: boolean;
  msg: string;
  data?: any;
}

/**
 * @remarks
 * Use this to send all the responses from routes
 * Keeping error=true and next=()=>{} by default
 */
export function responseMsg(
  res: Response,
  { status = 400, error = true, msg, data }: ResponseMessage,
  next: Function = () => {}
): void {
  res.status(status).json({ error, msg, data });
  next();
}

/**
 * Base middleware type
 */
export type Middleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

/**
 * Middlewares type for findById type of middlewares
 */
export type IdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
  id: string
) => Promise<void>;

/**
 * Base controller type
 */
export type Controller = (req: Request, res: Response) => Promise<void>;

/**
 * Presets for response msgs
 */
export const responseMsgs = {
  WENT_WRONG: "Something went wrong, Please try again",
  NO_USER: "User doesn't exists",
  ACCESS_DENIED: "Access denied",
};
