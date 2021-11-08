import { Document, model, Schema } from "mongoose";

export type LessonDocument = Document & {
  name: string;
  description: string;
  note?: string;
  videoURL?: string;
};

const LessonSchema = new Schema<LessonDocument>({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  note: { type: String, trim: true },
  videoURL: { type: String, trim: true },
});

const Lesson = model<LessonDocument>("Lesson", LessonSchema);
export default Lesson;
