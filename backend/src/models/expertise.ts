import { Document, model, Schema } from "mongoose";

/**
 * Model Purpose
 *
 * Currently expertise will be created only by admin.
 * These values will be used in teacher's expertise list
 */

export type ExpertiseDocument = Document & {
  name: string;
  emoji: string;
};

const ExpertiseSchema = new Schema<ExpertiseDocument>({
  name: { type: String, required: true, unique: true, trim: true },
  emoji: { type: String, required: true, trim: true },
});

const Expertise = model<ExpertiseDocument>("Expertise", ExpertiseSchema);
export default Expertise;
