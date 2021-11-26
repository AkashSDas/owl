import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getAllChaptersOfCourse } from "../helpers/chapter";

export const useChaptersOfCourse = (courseId: string) => {
  const [loading, setLoading] = useState(false);
  const [chapters, setChapters] = useState([]);

  const apiCall = async () => {
    if (courseId) {
      setLoading(true);
      const [data, err] = await getAllChaptersOfCourse(courseId);
      if (err) toast(err.msg, { icon: "❌" });
      else setChapters(data.data.chapters);
      setLoading(false);
    }
  };

  useEffect(() => {
    apiCall();
  }, [courseId]);

  return { loading, chapters, setChapters };
};
