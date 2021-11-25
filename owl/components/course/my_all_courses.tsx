import { useUserAllCourses } from "../../lib/hooks/user_courses";
import btnStyle from "../../styles/components/common/Buttons.module.scss";
import { Divider } from "../common/divider";
import { TextRoll } from "../text_roll/animation";
import { MyCourseCard } from "./cards";

export const MyAllCourses = () => {
  const { loading, courses, getCourses, setCourses } = useUserAllCourses(1);

  const loadMoreBtn = () => {
    if (courses.hasNext) {
      return (
        <button className={btnStyle["regular-btn"]} onClick={getCourses}>
          <TextRoll text="Load more" color="hsla(0, 0%, 0%, 1)" />
        </button>
      );
    }

    return (
      <div style={{ cursor: "unset" }} className={`${btnStyle["regular-btn"]}`}>
        <TextRoll text="You've reached the end" color="hsla(0, 0%, 0%, 1)" />
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
            <MyCourseCard course={c} setCourses={setCourses} />
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
