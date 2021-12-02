import { Document, model, Schema } from "mongoose";
import { UserDocument } from "./user";

/**
 * Model Purpose
 *
 * User's all payment information will be in UserPayment doc.
 * Also one user will have extactly one unique UserPayment doc.
 * User and UserPayment have one-to-one relation
 */

export type UserPaymentDocument = Document & {
  userId: UserDocument;
  stripeCustomerId?: string;
};

const UserPaymentSchema = new Schema<UserPaymentDocument>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  stripeCustomerId: { type: String },
});

const UserPayment = model<UserPaymentDocument>(
  "UserPayment",
  UserPaymentSchema
);
export default UserPayment;
