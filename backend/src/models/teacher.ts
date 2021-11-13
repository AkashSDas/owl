import { Document, model, Schema } from "mongoose";
import { ExpertiseDocument } from "./expertise";
import { QualificationDocument } from "./qualification";
import { UserDocument } from "./user";
import MongoPaging from "mongo-cursor-pagination";

/**
 * Model Purpose
 *
 * A user can become a teacher and the relation between them is one-to-one.
 * A teacher will a user which have additional information about that user
 * like years of exp, qualifications, etc...
 */

export type TeacherDocument = Document & {
  userId: UserDocument;
  bio: string;
  yearsOfExperience: number;
  qualifications: QualificationDocument[];
  expertise: ExpertiseDocument[];
};

const TeacherSchema = new Schema<TeacherDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    bio: { type: String, required: true, trim: true },
    yearsOfExperience: { type: Number, required: true },
    qualifications: {
      type: [{ type: Schema.Types.ObjectId, ref: "Qualification" }],
      required: true,
    },
    expertise: {
      type: [{ type: Schema.Types.ObjectId, ref: "Expertise" }],
      required: true,
    },
  },
  { timestamps: true }
);

// Pagination
TeacherSchema.plugin(MongoPaging.mongoosePlugin, { name: "paginateTeacher" });

const Teacher = model<TeacherDocument>("Teacher", TeacherSchema);
export default Teacher;
