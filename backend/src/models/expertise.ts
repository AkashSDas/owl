import { Document, model, Schema } from "mongoose";

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
