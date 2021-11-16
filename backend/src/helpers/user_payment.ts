import UserPayment, { UserPaymentDocument } from "../models/user_payment";
import { runAsync } from "../utils";

/**
 * Get or create user payment doc
 *
 * @param userId - User mongoId
 * @returns UserPayment doc if created else null
 */
export const getOrCreateUserPaymentDoc = async (userId: string) => {
  const [doc, err1] = await runAsync(
    UserPayment.findOne({ userId: userId as any }).exec()
  );
  if (err1) return null;
  if (doc) return doc as UserPaymentDocument;

  // Create a doc
  const [userPayment, err2] = await runAsync(
    new UserPayment({ userId }).save()
  );
  if (err2 || !userPayment) return null;
  return userPayment as UserPaymentDocument;
};
