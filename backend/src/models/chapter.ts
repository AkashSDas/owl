import { Document, model, Schema } from "mongoose";
import { LessonDocument } from "./lesson";

export type ChapterDocument = Document & {
  lessons: LessonDocument[];
  name: string;
  description: string;
};

const ChapterSchema = new Schema<ChapterDocument>({
  lessons: {
    type: [{ type: Schema.Types.ObjectId, ref: "Lesson" }],
    required: true,
  },
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
});

const Chapter = model<ChapterDocument>("Chapter", ChapterSchema);
export default Chapter;
