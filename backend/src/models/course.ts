import { Document, model, Schema } from "mongoose";
import { CourseLevelDocument } from "./course_level";
import { TeacherDocument } from "./teacher";
import MongoPaging from "mongo-cursor-pagination";

export type CourseDocument = Document & {
  teacherId: TeacherDocument;
  name: string;
  description: string;
  ratings: number;
  numberOfStudentsEnrolled: number;
  published: boolean;
  level: CourseLevelDocument;
  createdAt: Date;
  updatedAt: number | Date;
};

const CourseSchema = new Schema<CourseDocument>(
  {
    teacherId: { type: Schema.Types.ObjectId, ref: "Teacher", required: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    ratings: { type: Number, required: true, default: 0 },
    numberOfStudentsEnrolled: { type: Number, required: true, default: 0 },
    published: { type: Boolean, required: true, default: false },
    level: { type: Schema.Types.ObjectId, ref: "CourseLevel", required: true },
    updatedAt: { type: Date, default: Date.now, required: true },
  },
  { timestamps: { createdAt: true } }
);

// Pagination
CourseSchema.plugin(MongoPaging.mongoosePlugin, { name: "paginateCourse" });

const Course = model<CourseDocument>("Course", CourseSchema);
export default Course;
