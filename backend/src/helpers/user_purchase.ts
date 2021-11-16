import UserPurchase, { UserPurchaseDocument } from "../models/user_purchase";
import { runAsync } from "../utils";

/**
 * Get or create user purchase mongodb document
 *
 * @param userId - User's mongoId
 */
export const getOrCreateUserPurchaseDoc = async (userId: string) => {
  const [doc, err1] = await runAsync(
    UserPurchase.findOne({ userId: userId as any }).exec()
  );
  if (err1) return null;
  if (doc) return doc as UserPurchaseDocument;

  // Create a doc
  const [userPurchase, err2] = await runAsync(
    new UserPurchase({ userId }).save()
  );
  if (err2 || !userPurchase) return null;
  return userPurchase as UserPurchaseDocument;
};
