import { GetServerSideProps } from "next";
import { useRouter } from "next/dist/client/router";
import { useContext, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Divider } from "../../../../components/common/divider";
import {
  CourseEditorSidebarContext,
  Sidebar3Context,
} from "../../../../lib/context/sidebar";
import { getLessonDirectly } from "../../../../lib/helpers/lesson";
import { useLessonIdForSidebar } from "../../../../lib/hooks/sidebar";
import style from "../../../../styles/components/common/Buttons.module.scss";

const LessonLearnPage = ({ lesson, err }) => {
  return (
    <main style={{ marginLeft: "350px" }} className="px-2">
      <section className="mt-8 w-full space-y-4">
        {err || !lesson ? (
          <div className="mt-8 w-full text-tablet-h3">
            Something went wrong, Please try again
          </div>
        ) : (
          <LessonView lesson={lesson} />
        )}
      </section>
    </main>
  );
};

const LessonView = ({ lesson }) => {
  const { lessonId } = useLessonIdForSidebar();
  const router = useRouter();
  const { sidebar, setSidebar } = useContext(Sidebar3Context);
  const { sidebar: sidebar2 } = useContext(CourseEditorSidebarContext);

  useEffect(() => {
    if (lessonId) {
      let idx = 0;
      sidebar.lessons.map((l, index) => {
        if (l._id === lessonId) idx = index;
      });

      setSidebar((s) => ({
        ...s,
        currentLessonId: lessonId,
        nextLessonId:
          sidebar.lessons.length > idx + 1
            ? sidebar.lessons[idx + 1]._id
            : null,
        previousLessonId: idx - 1 >= 0 ? sidebar.lessons[idx - 1]._id : null,
      }));
    }
  }, [lessonId, sidebar.lessons]);

  return (
    <section className="mt-8 w-full space-y-4">
      <h1 className="text-desktop-h4 w-full">{lesson?.name ?? "No name"}</h1>
      <div className="text-tablet-body-main w-full font-medium text-grey3">
        {lesson?.description ?? "No description"}
      </div>
      <Divider />
      <video
        style={{ height: "500px" }}
        src={lesson?.videoURL}
        className="w-full"
        controls
      />
      <ReactMarkdown children={lesson?.note ?? ""} />
      <Divider />
      <div className="w-full flex items-center justify-between">
        {sidebar.previousLessonId ? (
          <button
            style={{ color: "hsla(0, 0%, 0%, 1)" }}
            className={`${style["regular-btn"]} cursor-pointer`}
            onClick={() => {
              router.push(
                `/course/learn/${sidebar2.courseId}/${sidebar.previousLessonId}`
              );
            }}
          >
            👈 Previous
          </button>
        ) : (
          <div></div>
        )}
        {sidebar.nextLessonId ? (
          <button
            style={{ color: "hsla(0, 0%, 0%, 1)" }}
            className={`${style["regular-btn"]} cursor-pointer`}
            onClick={() => {
              router.push(
                `/course/learn/${sidebar2.courseId}/${sidebar.nextLessonId}`
              );
            }}
          >
            Next 👉
          </button>
        ) : (
          <div></div>
        )}
      </div>
    </section>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const { lessonId } = query;

  let props = {};

  // Get course full data
  const [data, err] = await getLessonDirectly(lessonId as string);
  if (err || !data) props = { err, lesson: null };
  else props = { err: null, lesson: data.data.lesson };

  return { props: props };
};

export default LessonLearnPage;
