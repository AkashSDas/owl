import { Document, model, Schema } from "mongoose";
import { CourseLevelDocument } from "./course_level";
import { TeacherDocument } from "./teacher";
import MongoPaging from "mongo-cursor-pagination";

export type CourseDocument = Document & {
  teacherId: TeacherDocument;
  name: string;
  description: string;
  ratings: number;
  coverImgURL: string;
  numberOfStudentsEnrolled: number;
  courseLength: number; // course length in hours
  numberOfLectures: number;
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
    coverImgURL: {
      type: String,
      required: true,
      default: process.env.DEFAULT_USER_PROFILE_PIC_URL,
    },
    numberOfStudentsEnrolled: { type: Number, required: true, default: 0 },
    courseLength: { type: Number, required: true, default: 0 },
    numberOfLectures: { type: Number, required: true, default: 0 },
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
