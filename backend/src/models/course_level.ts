import { Document, model, Schema } from "mongoose";

export type CourseLevelDocument = Document & {
  name: string;
  emoji: string;
};

const CourseLevelSchema = new Schema<CourseLevelDocument>({
  name: { type: String, required: true, trim: true, unique: true },
  emoji: { type: String, required: true, trim: true },
});

const CourseLevel = model<CourseLevelDocument>(
  "CourseLevel",
  CourseLevelSchema
);
export default CourseLevel;
