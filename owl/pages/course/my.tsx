import { Show, Star, TimeCircle } from "react-iconly";
import { useUserAllCourses } from "../../lib/hooks/user_courses";
import btnStyle from "../../styles/components/common/Buttons.module.scss";
import cardstyle from "../../styles/components/course_cards/MyCourseCard.module.scss";

const MyCourses = () => {
  return (
    <main style={{ marginLeft: "250px" }} className="px-2">
      <MyAllCourses />
    </main>
  );
};

const Divider = () => (
  <div style={{ borderWidth: "1px" }} className="border-grey1 w-full"></div>
);

const MyAllCourses = () => {
  const { loading, courses, getCourses } = useUserAllCourses(3);

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
      {loading ? (
        <div className="w-full text-medium font-bold text-center">
          🔎 Loading more...
        </div>
      ) : null}
    </section>
  );
};

const MyCourseCard = ({ course }: any) => {
  return (
    <div
      key={course._id}
      className={`w-full space-x-3 flex ${cardstyle["card"]}`}
    >
      <img
        style={{ height: "180px", width: "300px" }}
        src={course.coverImgURL}
        alt={course.name}
        className="object-cover rounded-2xl"
      />

      <div className="flex flex-col space-y-3">
        <div className="text-desktop-body-intro font-bold text-grey4">
          {course.name}
        </div>
        <div className="flex items-center space-x-8 w-full">
          <div className="flex items-center space-x-2">
            <Star primaryColor="hsla(54, 89%, 55%, 1)" />
            <div>{course.ratings}</div>
          </div>
          <div className="flex items-center space-x-2">
            <Show primaryColor="hsla(265, 100%, 59%, 1)" />
            <div>{course.numberOfStudentsEnrolled} students</div>
          </div>
          <div className="flex items-center space-x-2">
            <TimeCircle primaryColor="hsla(0, 0%, 0%, 1)" />
            <div>{course.duration} mins</div>
          </div>
        </div>

        <div className="flex item-center space-x-3">
          <div
            style={{ color: "hsla(0, 0%, 0%, 1)" }}
            className={btnStyle["tag"]}
          >
            {course.level.emoji} {course.level.name}
          </div>
          <div
            style={{ color: "hsla(0, 0%, 0%, 1)" }}
            className={btnStyle["tag"]}
          >
            {course.published ? "Published" : "Draft"}
          </div>
          <div
            style={{ color: "hsla(0, 0%, 0%, 1)" }}
            className={btnStyle["tag"]}
          >
            Price is ${course.price}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
