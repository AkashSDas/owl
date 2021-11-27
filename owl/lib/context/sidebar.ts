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

/**
 * Sidebar 3 context
 */
export interface ISidebar3Context {
  sidebar: {
    nextLessonId?: string;
    previousLessonId?: string;
    currentLessonId: string;
    lessons: any[];
  };
  setSidebar: Function;
}

export const Sidebar3Context = createContext<ISidebar3Context>(null);
