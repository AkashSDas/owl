/*
 * Extending properties of Request by using Declaration Merging
 * creating an interface with extending Request would work in controller
 * but will give error while working with router, also code can be repeated
 * for just having same properties in Request. So this is a better way
 * Below post has lots of solution, some are out-dated but one used here is working
 * https://stackoverflow.com/questions/37377731/extend-express-request-object-using-typescript
 *
 * To extend Express interfaces properties
 * 1. create folder ${PROJECT_ROOT}/@types/express/index.d.ts
 * 2. Add what's added below in that file
 * 3. in tsconfig.json, add / merge the property such that:
 *     {"compilerOptions": "typeRoots": [ "@types" ] }
 */

import { ChapterDocument } from "../../src/models/chapter";
import { CourseDocument } from "../../src/models/course";
import { CourseLevelDocument } from "../../src/models/course_level";
import { ExpertiseDocument } from "../../src/models/expertise";
import { FeedbackDocument } from "../../src/models/feedback";
import { LessonDocument } from "../../src/models/lesson";
import { QualificationDocument } from "../../src/models/qualification";
import { TeacherDocument } from "../../src/models/teacher";
import { UserDocument } from "../../src/models/user";

declare module "express-serve-static-core" {
  interface Request {
    profile: UserDocument;
    auth: any;
    qualification: QualificationDocument;
    expertise: ExpertiseDocument;
    courseLevel: CourseLevelDocument;
    teacher: TeacherDocument;
    course: CourseDocument;
    chapter: ChapterDocument;
    lesson: LessonDocument;
    feedback: FeedbackDocument;
  }
}
