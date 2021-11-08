import { Document, model, Schema } from "mongoose";
import { ExpertiseDocument } from "./expertise";
import { QualificationDocument } from "./qualification";
// import { UserDocument } from "./user";
import MongoPaging from "mongo-cursor-pagination";

export type TeacherDocument = Document & {
  // Is this right way? it's not giving any error while using (using string, number, etc... were giving error)
  // userId: UserDocument;

  userId: any;
  bio: string;
  yearsOfExperience: number;
  qualifications?: QualificationDocument[];
  expertise?: ExpertiseDocument[];
};

const TeacherSchema = new Schema<TeacherDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    bio: { type: String, required: true, trim: true },
    yearsOfExperience: { type: Number, required: true },
    qualifications: {
      type: [{ type: Schema.Types.ObjectId, ref: "Qualification" }],
    },
    expertise: {
      type: [{ type: Schema.Types.ObjectId, ref: "Expertise" }],
    },
  },
  { timestamps: true }
);

// Pagination
TeacherSchema.plugin(MongoPaging.mongoosePlugin, { name: "paginateTeacher" });

const Teacher = model<TeacherDocument>("Teacher", TeacherSchema);
export default Teacher;
