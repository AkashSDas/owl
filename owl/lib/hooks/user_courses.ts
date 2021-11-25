import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../context/user";
import { getUserAllCourses } from "../helpers/course";

export const useUserAllCourses = (limit: number) => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState({
    data: [],
    next: null,
    hasNext: null,
    previous: null,
    hasPrevious: null,
  });

  const getCourses = async () => {
    if (!user?.token) toast("You must be logged in", { icon: "❌" });
    else {
      setLoading(true);

      const [data, err] = await getUserAllCourses(
        user.data?._id,
        user.token,
        limit,
        courses.next
      );
      if (err) toast(err.msg, { icon: "❌" });
      else {
        setCourses({
          ...courses,
          data: [...courses.data, ...data.data.courses],
          next: data.data.next,
          hasNext: data.data.hasNext,
          previous: data.data.previous,
          hasPrevious: data.data.hasPrevious,
        });
      }

      setLoading(false);
    }
  };

  useEffect(() => {
    getCourses();
  }, [user]);

  return { courses, loading, getCourses, setCourses };
};
