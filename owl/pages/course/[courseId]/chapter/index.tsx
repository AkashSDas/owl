import { useRouter } from "next/dist/client/router";
import { Delete } from "react-iconly";
import { Divider } from "../../../../components/common/divider";
import { Loader } from "../../../../components/common/loader";
import { useChaptersOfCourse } from "../../../../lib/hooks/chapter";
import { useCourseIdForSidebar } from "../../../../lib/hooks/sidebar";
import styles from "../../../../styles/components/chapter_cards/MyChapterCard.module.scss";
import btnStyles from "../../../../styles/components/common/Buttons.module.scss";

const CourseChapters = () => {
  const router = useRouter();
  const { courseId } = useCourseIdForSidebar();
  const { loading, chapters } = useChaptersOfCourse(courseId as string);

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
        {loading ? <Loader /> : <Chapters chapters={chapters} />}
      </section>
    </main>
  );
};

const Chapters = ({ chapters }: { chapters: any[] }) => {
  return (
    <div className="bg-grey1 rounded-xl">
      {chapters.map((c) => (
        <div
          key={c._id}
          className={`bg-grey1 rounded-xl p-4 flex items-center space-x-5 text-desktop-body-intro cursor-pointer ${styles["card"]}`}
        >
          <div>🎪</div>
          <div className="w-full">{c.name}</div>
          <Delete />
        </div>
      ))}
    </div>
  );
};

export default CourseChapters;
