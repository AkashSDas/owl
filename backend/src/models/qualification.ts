import { Document, model, Schema } from "mongoose";

export type QualificationDocument = Document & {
  name: string;
  emoji: string;
};

const QualificationSchema = new Schema<QualificationDocument>({
  name: { type: String, required: true, unqiue: true, trim: true },
  emoji: { type: String, required: true, trim: true },
});

const Qualification = model<QualificationDocument>(
  "Qualification",
  QualificationSchema
);
export default Qualification;
