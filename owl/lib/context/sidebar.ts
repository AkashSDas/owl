import { createContext } from "react";

/**
 * Set their values after getting to a page which has them as param
 */
export interface ICourseEditorSidebarContext {
  sidebar: {
    chapterId: string;
    courseId: string;
    lessonId: string;
  };
  setSidebar: Function;
}

export const CourseEditorSidebarContext =
  createContext<ICourseEditorSidebarContext>(null);
