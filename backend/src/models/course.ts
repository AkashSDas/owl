import { Document, model, Schema } from "mongoose";
import { CourseLevelDocument } from "./course_level";
import { TeacherDocument } from "./teacher";
import MongoPaging from "mongo-cursor-pagination";

/**
 * Shape of a course
 * A teacher can have multiple course, relation between them is one-to-many respectively
 *
 * A course will be created in incremental fashion. First course will be created
 * then the teacher can create a chapter with empty lessons and then teacher can add
 * lesson and so on...
 *
 * Few properties of course can be updated by teacher
 * - teacherId (which teacher is creating the course) - (although we do it in the backend, but id provided by the client/route)
 * - name
 * - description
 * - coverImgURL  (has a default value)
 * - published    (has a default value of false)
 * - level
 * - price        (at mininum it will be 0, free course)
 *
 * Other values will be not be updated by user but will be updated in backend as per
 * specific process take place
 * - numberOfStudentsEnrolled - (this field will be incremented when a user buy's the course)
 *
 * Note: when user is wants to publish a course, check if the number of lectures is greater than equal
 * to some number, (same can be done for course length, not for now), the user has updated the cover img
 *
 * Two fields that are removed from this model are course length (duration) and number of lectures (lessons).
 * They can be optained by simple query on lesson model since it has couseId field in it
 *
 * The chapter doc has courseId field, so all the chapter for a course can be queried
 */

export type CourseDocument = Document & {
  teacherId: TeacherDocument;
  name: string;
  description: string;
  ratings: number;
  coverImgURL: string;
  numberOfStudentsEnrolled: number;
  price: number;
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
    price: { type: Number, required: true, min: 0 },
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
