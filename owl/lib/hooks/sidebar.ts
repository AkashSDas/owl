import { useRouter } from "next/dist/client/router";
import { useContext, useEffect } from "react";
import { CourseEditorSidebarContext } from "../context/sidebar";

export const useCourseIdForSidebar = () => {
  const router = useRouter();
  const { courseId } = router.query;
  const { setSidebar } = useContext(CourseEditorSidebarContext);

  useEffect(() => {
    if (courseId) setSidebar((s) => ({ ...s, courseId }));
  }, [courseId]);
};
