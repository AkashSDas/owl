/**
 * @todo
 * - When clicked on a course open the 1st lesson of that course. Currently its
 * a hack of when user click on a course learn view we naviate the user to
 * /course/learn/[courseId] page and then push them immediately to
 * /course/learn/[courseId]/[lessonId] page and we get the lessonId from
 * sidebar 3 context. This is just done to get server side rendering on
 * each lesson page and we don't have the lessonId available to us in route
 * query directly
 */

import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import { Divider } from "../../../../components/common/divider";
import { useCourseIdForSidebar } from "../../../../lib/hooks/sidebar";
import tagStyle from "../../../../styles/components/common/Buttons.module.scss";
import styles from "../../../../styles/components/chapter_cards/MyChapterCard.module.scss";
import { Show, Star, TimeCircle } from "react-iconly";
import { getCourse } from "../../../../lib/helpers/course";

const CourseLearnPage = ({ course, err }) => {
  useCourseIdForSidebar();

  return (
    <main className="px-2">
      <section className="mt-8 w-full flex justify-center space-y-4">
        {err || !course ? (
          <div className="mt-8 w-4/5 text-tablet-h3">
            Something went wrong, Please try again
          </div>
        ) : (
          <CourseView courseData={course} />
        )}
      </section>
    </main>
  );
};

const CourseView = ({ courseData }) => {
  const { course, chapters } = courseData;

  return (
    <div className="space-y-3 w-4/5">
      <h1 className="text-desktop-h4 w-full">{course.name}</h1>
      <Divider />
      <img
        style={{ height: "500px" }}
        className="w-full object-cover rounded-3xl"
        src={course.coverImgURL}
        alt={course.name}
      />
      <Divider />
      <div className="flex items-center space-x-4 w-full">
        <div className="flex items-center space-x-2">
          <Star primaryColor="hsla(54, 89%, 55%, 1)" />
          <div>{course.ratings}</div>
        </div>
        <div style={{ width: "2px" }} className="bg-grey1 h-6 rounded-xl"></div>
        <div className="flex items-center space-x-2">
          <Show primaryColor="hsla(265, 100%, 59%, 1)" />
          <div>{course.numberOfStudentsEnrolled} students</div>
        </div>
        <div style={{ width: "2px" }} className="bg-grey1 h-6 rounded-xl"></div>
        <div className="flex items-center space-x-2">
          <TimeCircle primaryColor="hsla(0, 0%, 0%, 1)" />
          <div>{course.duration} mins</div>
        </div>
        <div style={{ width: "2px" }} className="bg-grey1 h-6 rounded-xl"></div>
        <div
          style={{ color: "hsla(0, 0%, 0%, 1)" }}
          className={tagStyle["tag"]}
        >
          {course.level.emoji} {course.level.name}
        </div>
      </div>
      <Divider />
      <ReactMarkdown children={course.description} />
      <Divider />
      <div className="flex flex-col">
        <h4 className="text-tablet-h4 text-center w-full mb-4">Chapters</h4>

        <div className="space-y-8">
          {chapters.map((c) => (
            <div className="flex flex-col space-y-3">
              <h4 className="text-tablet-h4 w-full">{c.chapter.name}</h4>

              <div className="bg-grey1 rounded-xl">
                {c.lessons.map((l) => (
                  <div
                    className={`bg-grey1 rounded-xl p-4 flex items-center space-x-5 text-desktop-body-intro cursor-pointer ${styles["card"]}`}
                  >
                    <div>🎪</div>
                    <div className="w-full">{l.name}</div>
                    <div className="text-medium font-medium text-grey4 bg-grey2 px-3 rounded-full">
                      {l.videoDuration}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const { courseId } = query;

  let props = {};

  // Get course full data
  const [data, err] = await getCourse(courseId as string);
  if (err || !data) props = { err, course: null };
  else props = { err: null, course: data.data };

  return { props: props };
};

export default CourseLearnPage;
