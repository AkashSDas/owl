import { useRouter } from "next/dist/client/router";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Delete } from "react-iconly";
import { Divider } from "../../../../components/common/divider";
import {
  Loader,
  SmallPrimaryLoader,
} from "../../../../components/common/loader";
import { CourseEditorSidebarContext } from "../../../../lib/context/sidebar";
import { AuthContext } from "../../../../lib/context/user";
import { deleteChapter } from "../../../../lib/helpers/chapter";
import { useChaptersOfCourse } from "../../../../lib/hooks/chapter";
import { useCourseIdForSidebar } from "../../../../lib/hooks/sidebar";
import styles from "../../../../styles/components/chapter_cards/MyChapterCard.module.scss";
import btnStyles from "../../../../styles/components/common/Buttons.module.scss";

const CourseChapters = () => {
  const router = useRouter();
  const { courseId } = useCourseIdForSidebar();
  const { loading, chapters, setChapters } = useChaptersOfCourse(
    courseId as string
  );

  return (
    <main style={{ marginLeft: "250px" }} className="px-2">
      <section className="mt-8 w-full space-y-4">
        <h1 className="text-desktop-h4 w-full">Course has chapters</h1>
        <Divider />
        <button
          onClick={() => {
            if (courseId) router.push(`/course/${courseId}/chapter/create`);
          }}
          className={btnStyles["secondary-btn"]}
        >
          Create chapter
        </button>
        <Divider />
        {loading ? (
          <Loader />
        ) : (
          <Chapters chapters={chapters} setChapters={setChapters} />
        )}
      </section>
    </main>
  );
};

const Chapters = ({
  chapters,
  setChapters,
}: {
  chapters: any[];
  setChapters: any;
}) => {
  const router = useRouter();
  const { sidebar } = useContext(CourseEditorSidebarContext);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [cardLoading, setCardLoading] = useState({
    loading: false,
    chapterId: "",
  });

  const deleteThisChapter = async (chapterId: string) => {
    if (loading) return;
    if (!user) return toast("You must be logged", { icon: "❌" });
    if (!sidebar.courseId)
      return toast("Something went wrong, Please try again", {
        icon: "❌",
      });

    setCardLoading({ loading: true, chapterId: chapterId });
    setLoading(() => true);
    const [data, err] = await deleteChapter(
      sidebar.courseId,
      chapterId,
      user.data?._id,
      user.token
    );
    if (err) toast(err.msg, { icon: "❌" });
    else {
      setChapters((chaps: any) => chaps.filter((c) => c._id !== chapterId));
      toast(data.msg, { icon: "✅" });
    }
    setCardLoading({ loading: false, chapterId: "" });
    setLoading(() => false);
  };

  return (
    <div className="bg-grey1 rounded-xl">
      {chapters.map((c) => (
        <div
          key={c._id}
          className={`bg-grey1 rounded-xl p-4 flex items-center space-x-5 text-desktop-body-intro cursor-pointer ${styles["card"]}`}
          onClick={() => {
            if (sidebar.courseId) {
              router.push(`/course/${sidebar.courseId}/chapter/${c._id}`);
            }
          }}
        >
          <div>🎪</div>
          <div className="w-full">{c.name}</div>
          <div onClick={() => deleteThisChapter(c._id)}>
            {cardLoading.loading && cardLoading.chapterId === c._id ? (
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

export default CourseChapters;
