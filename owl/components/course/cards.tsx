import { Show, Star, TimeCircle } from "react-iconly";
import btnStyle from "../../styles/components/common/Buttons.module.scss";
import cardstyle from "../../styles/components/course_cards/MyCourseCard.module.scss";

export const MyCourseCard = ({ course }: any) => {
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
