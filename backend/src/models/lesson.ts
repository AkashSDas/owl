import { Document, model, Schema } from "mongoose";
import { ChapterDocument } from "./chapter";
import { CourseDocument } from "./course";

/**
 * Shape of a lesson
 * Lesson has one-to-many relation with course and chapter. Having courseId and chapterId
 * in lesson doc simplifies a lot of querying
 *
 * Fields like course length (duration) and number of lectures (lessons) can be optained
 * by simple query on lesson model since it has couseId field in it
 */

export type LessonDocument = Document & {
  courseId: CourseDocument;
  chapterId: ChapterDocument;
  name: string;
  description: string;
  note?: string;
  videoURL?: string;
  videoDuration?: number; // in minutes
};

const LessonSchema = new Schema<LessonDocument>({
  courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  chapterId: { type: Schema.Types.ObjectId, ref: "Chapter", required: true },
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  note: { type: String, trim: true },
  videoURL: { type: String, trim: true },
  videoDuration: { type: Number },
});

const Lesson = model<LessonDocument>("Lesson", LessonSchema);
export default Lesson;
