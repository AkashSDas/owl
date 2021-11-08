import { Document, model, Schema } from "mongoose";
import { UserDocument } from "./user";

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
