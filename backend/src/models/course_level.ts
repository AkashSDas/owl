import { Document, model, Schema } from "mongoose";

/**
 * Model Purpose
 *
 * Currently course level will be created only by admin.
 * These values will be used for giving a course its level like all, beginner, intermediate, etc...
 */

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
