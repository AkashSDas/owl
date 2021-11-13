import { Document, model, Schema } from "mongoose";
import { CourseDocument } from "./course";

/**
 * Shape of a chapter. This will keep info about a chapter and its id will be used
 * in the lesson doc which will belong to this chapter
 *
 * This doc will have one-to-many relation with the course.
 * A lesson will have many-to-one relation (many lessons for one chapter)
 *
 * @todo
 * - Add a way to re-order lessons in a chapter
 * - Add a way to re-order chapters in a course
 */

export type ChapterDocument = Document & {
  courseId: CourseDocument;
  name: string;
  description: string;
};

const ChapterSchema = new Schema<ChapterDocument>({
  courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
});

const Chapter = model<ChapterDocument>("Chapter", ChapterSchema);
export default Chapter;
