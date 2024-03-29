import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getAllLessonsOfChapter, getLesson } from "../helpers/lesson";

export const useLessonsOfChapter = (courseId: string, chapterId: string) => {
  const [loading, setLoading] = useState(false);
  const [chapterInfo, setChapterInfo] = useState(null);
  const [lessons, setLessons] = useState([]);

  const apiCall = async () => {
    if (courseId && chapterId) {
      setLoading(true);
      const [data, err] = await getAllLessonsOfChapter(courseId, chapterId);
      if (err) toast(err.msg, { icon: "❌" });
      else {
        setChapterInfo(data.data.chapter);
        setLessons(data.data.lessons);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    apiCall();
  }, [courseId, chapterId]);

  return { loading, lessons, setLessons, chapterInfo };
};

export const useLesson = (
  courseId: string,
  chapterId: string,
  lessonId: string
) => {
  const [loading, setLoading] = useState(false);
  const [lesson, setLesson] = useState(null);

  const apiCall = async () => {
    if (courseId && chapterId && lessonId) {
      setLoading(true);
      const [data, err] = await getLesson(courseId, chapterId, lessonId);
      if (err) toast(err.msg, { icon: "❌" });
      else setLesson(data.data.lesson);
      setLoading(false);
    }
  };

  useEffect(() => {
    apiCall();
  }, [courseId, chapterId, lessonId]);

  return { loading, lesson };
};
