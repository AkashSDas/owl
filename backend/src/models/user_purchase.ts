import { Document, model, Schema } from "mongoose";
import { CourseDocument } from "./course";
import { UserDocument } from "./user";

/**
 * Model Purpose
 *
 * User model will have all the courses that the user pruchase.
 * Also one user will have extactly one unique UserPurchase doc which will be created
 * with the creation of that user.
 * User and UserPurchase have one-to-one relation
 */

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
