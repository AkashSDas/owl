import { Request } from "express";
import { runAsync } from "../utils";

/**
 * Check if the user has the specified role or not
 */
export const roleExists = (req: Request, role: string): boolean => {
  const user = req.profile;
  if (user.roles.filter((r) => r === role).length > 0) return true;
  return false;
};

/**
 * Add role to user's roles
 * @returns Role add to user's roles or not
 */
export const addRole = async (req: Request, role: string) => {
  const user = req.profile;
  user.roles.push(role);
  const [, err] = await runAsync(user.save());
  if (err) return false;
  return true;
};
