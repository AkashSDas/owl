import { NextFunction, Request, Response } from "express";
import jwt from "express-jwt";
import { responseMsg } from "../utils";

// Protect routes using this middleware
// `auth` will be the user property
export const isLoggedIn = jwt({
  secret: process.env.SECRET_KEY,
  userProperty: "auth",
  algorithms: ["HS256"],
});

/**
 * Authenticate request
 */
export function isAuthenticated(req: Request, res: Response, next: NextFunction): void {
  // Will be set by router.param('userId', getUserById) where profile is the user document from database
  const profile = req.profile;

  // `auth` property will be set by isLoggedIn middleware
  const auth = req.auth;

  // using double = since we are just checking the value and not the object (as they are different)
  const check = profile && auth && profile._id == auth._id;
  if (!check) return responseMsg(res, { status: 403, message: "Access denied" });
  next();
}

/**
 * Authenticate if request is sent by a 'teacher'
 */
export function isTeacher(req: Request, res: Response, next: NextFunction): void {
  if (req.profile.roles.filter((role) => role === "teacher").length === 0) {
    return responseMsg(res, { status: 403, message: "Access denied" });
  }
  next();
}

/**
 * Authenticate if request is sent by a 'admin'
 */
export function isAdmin(req: Request, res: Response, next: NextFunction): void {
  if (req.profile.roles.filter((role) => role === "admin").length === 0) {
    return responseMsg(res, { status: 403, message: "Access denied" });
  }
  next();
}
