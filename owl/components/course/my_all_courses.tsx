import { useUserAllCourses } from "../../lib/hooks/user_courses";
import btnStyle from "../../styles/components/common/Buttons.module.scss";
import { Divider } from "../common/divider";
import { MyCourseCard } from "./cards";

export const MyAllCourses = () => {
  const { loading, courses, getCourses } = useUserAllCourses(1);

  const loadMoreBtn = () => {
    if (courses.hasNext) {
      return (
        <button
          style={{ color: "hsla(0, 0%, 0%, 1)" }}
          className={btnStyle["regular-btn"]}
          onClick={getCourses}
        >
          Load more
        </button>
      );
    }

    return (
      <div
        style={{ color: "hsla(0, 0%, 0%, 1)", cursor: "unset" }}
        className={`${btnStyle["regular-btn"]}`}
      >
        You've reached the end
      </div>
    );
  };

  return (
    <section className="mt-8 w-full flex flex-col items-center space-y-4">
      <h1 className="text-desktop-h4">My all courses</h1>
      <Divider />
      {courses.data &&
        courses.data.map((c) => (
          <>
            <MyCourseCard course={c} />
            <Divider />
          </>
        ))}
      {!loading ? loadMoreBtn() : null}
      {loading ? (
        <div className="w-full text-medium font-bold text-center">
          🔎 Loading more...
        </div>
      ) : null}
    </section>
  );
};
