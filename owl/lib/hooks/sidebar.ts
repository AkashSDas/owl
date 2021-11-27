import { useRouter } from "next/dist/client/router";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CourseEditorSidebarContext } from "../context/sidebar";
import { getCourseChaptersAndLessonsOverview } from "../helpers/course";

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

/**
 * @remarks
 * Use this in every page where you want CourseEditorSidebarContext
 * to be available
 */
export const useLessonIdForSidebar = () => {
  const router = useRouter();
  const { lessonId } = router.query;
  const { setSidebar } = useContext(CourseEditorSidebarContext);

  useEffect(() => {
    if (lessonId) setSidebar((s) => ({ ...s, lessonId }));
  }, [lessonId]);

  return { lessonId };
};

/**
 * Sidebar 3 hook
 */
export const useCourseOverview = () => {
  const { courseId } = useCourseIdForSidebar();
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(false);

  const getOverview = async () => {
    if (!courseId) return;
    setLoading(true);
    const [data, err] = await getCourseChaptersAndLessonsOverview(
      courseId as string
    );
    if (err) toast(err.msg, { icon: "❌" });
    setOverview(data.data);
    setLoading(false);
  };

  useEffect(() => {
    getOverview();
  }, [courseId]);

  return { courseId, overview, loading };
};
