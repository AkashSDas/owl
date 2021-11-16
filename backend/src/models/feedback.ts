import { Document, model, Schema } from "mongoose";
import { CourseDocument } from "./course";
import { UserDocument } from "./user";

/**
 * Model Purpose
 *
 * Users who have purchased a course can give their feedback
 * regarding their experience with the course and others...
 */

export type FeedbackDocument = Document & {
  userId: UserDocument;
  courseId: CourseDocument;
  rating: number; // ranging from 0-5
  comment: string;
};

const FeedbackSchema = new Schema<FeedbackDocument>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
  comment: { type: String, required: true, trim: true },
});

const Feedback = model<FeedbackDocument>("Feedback", FeedbackSchema);
export default Feedback;
