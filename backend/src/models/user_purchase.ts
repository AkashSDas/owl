import { Document, model, Schema } from "mongoose";
import { CourseDocument } from "./course";
import { UserDocument } from "./user";

export type UserPurchaseDocument = Document & {
  userId: UserDocument;
  courses: CourseDocument[];
};

const UserPurchaseSchema = new Schema<UserPurchaseDocument>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  courses: {
    type: [{ type: Schema.Types.ObjectId, ref: "Course" }],
    default: [],
    required: true,
  },
});

const UserPurchase = model<UserPurchaseDocument>(
  "UserPurchase",
  UserPurchaseSchema
);
export default UserPurchase;
