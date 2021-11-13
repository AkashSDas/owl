import { Document, model, Schema } from "mongoose";

/**
 * Model Purpose
 *
 * Currently qualifications will be created only by admin.
 * These values will be used in teacher's qualifications list
 */

export type QualificationDocument = Document & {
  name: string;
  emoji: string;
};

const QualificationSchema = new Schema<QualificationDocument>({
  name: { type: String, required: true, unique: true, trim: true },
  emoji: { type: String, required: true, trim: true },
});

const Qualification = model<QualificationDocument>(
  "Qualification",
  QualificationSchema
);
export default Qualification;
