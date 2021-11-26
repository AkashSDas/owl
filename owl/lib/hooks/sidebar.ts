import { useRouter } from "next/dist/client/router";
import { useContext, useEffect } from "react";
import { CourseEditorSidebarContext } from "../context/sidebar";

/**
 * @remarks
 * Use this in every page where you want CourseEditorSidebarContext
 * to be available
 */
export const useCourseIdForSidebar = () => {
  const router = useRouter();
  const { courseId } = router.query;
  const { setSidebar } = useContext(CourseEditorSidebarContext);

  useEffect(() => {
    if (courseId) setSidebar((s) => ({ ...s, courseId }));
  }, [courseId]);

  return { courseId };
};

/**
 * @remarks
 * Use this in every page where you want CourseEditorSidebarContext
 * to be available
 */
export const useChapterIdForSidebar = () => {
  const router = useRouter();
  const { chapterId } = router.query;
  const { setSidebar } = useContext(CourseEditorSidebarContext);

  useEffect(() => {
    if (chapterId) setSidebar((s) => ({ ...s, chapterId }));
  }, [chapterId]);

  return { chapterId };
};
