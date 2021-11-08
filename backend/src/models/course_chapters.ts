import { Document, model, Schema } from "mongoose";
import { ChapterDocument } from "./chapter";
import { CourseDocument } from "./course";

export type CourseChaptersDocument = Document & {
  courseId: CourseDocument;
  chapters: ChapterDocument[];
};

const CourseChaptersSchema = new Schema<CourseChaptersDocument>({
  courseId: { type: Schema.Types.ObjectId, ref: "Course", unique: true },
  chapters: {
    type: [{ type: Schema.Types.ObjectId, ref: "Chapter" }],
    default: [],
  },
});

const CourseChapters = model<CourseChaptersDocument>(
  "CourseChapters",
  CourseChaptersSchema
);
export default CourseChapters;
