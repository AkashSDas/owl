import { useRouter } from "next/dist/client/router";
import { useContext, useState } from "react";
import { Delete } from "react-iconly";
import { Divider } from "../../../../../components/common/divider";
import {
  Loader,
  SmallPrimaryLoader,
} from "../../../../../components/common/loader";
import { CourseEditorSidebarContext } from "../../../../../lib/context/sidebar";
import { AuthContext } from "../../../../../lib/context/user";
import { useLessonsOfChapter } from "../../../../../lib/hooks/lesson";
import {
  useChapterIdForSidebar,
  useCourseIdForSidebar,
} from "../../../../../lib/hooks/sidebar";
import styles from "../../../../../styles/components/chapter_cards/MyChapterCard.module.scss";
import btnStyles from "../../../../../styles/components/common/Buttons.module.scss";

const Chapter = () => {
  const router = useRouter();
  const { courseId } = useCourseIdForSidebar();
  const { chapterId } = useChapterIdForSidebar();
  const { lessons, chapterInfo, loading, setLessons } = useLessonsOfChapter(
    courseId as string,
    chapterId as string
  );

  return (
    <main style={{ marginLeft: "250px" }} className="px-2">
      <section className="mt-8 w-full flex flex-col items-center relative h-screen space-y-2">
        <h1 className="text-desktop-h4 w-full">
          {chapterInfo ? chapterInfo.name : ""}
        </h1>
        <div className="text-tablet-body-main w-full font-medium text-grey3">
          {chapterInfo ? chapterInfo.description : ""}
        </div>
        <Divider />
        <div className="w-full flex items-center justify-start">
          <button
            onClick={() => {
              if (courseId && chapterId)
                router.push(
                  `/course/${courseId}/chapter/${chapterId}/lesson/create`
                );
            }}
            className={btnStyles["secondary-btn"]}
          >
            Create lesson
          </button>
        </div>
        <Divider />
        {loading ? (
          <Loader />
        ) : (
          <Lessons lessons={lessons} setLessons={setLessons} />
        )}
      </section>
    </main>
  );
};

const Lessons = ({ lessons, setLessons }) => {
  const router = useRouter();
  const { sidebar } = useContext(CourseEditorSidebarContext);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [cardLoading, setCardLoading] = useState({
    loading: false,
    chapterId: "",
  });

  return (
    <div className="bg-grey1 rounded-xl w-full">
      {lessons.map((l) => (
        <div
          key={l._id}
          className={`bg-grey1 rounded-xl p-4 flex items-center space-x-5 text-desktop-body-intro cursor-pointer ${styles["card"]}`}
        >
          <div>🎪</div>
          <div className="w-full">{l.name}</div>
          <div onClick={() => {}}>
            {cardLoading.loading && cardLoading.chapterId === l._id ? (
              <SmallPrimaryLoader />
            ) : (
              <Delete />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chapter;
