import { useRouter } from "next/dist/client/router";
import ReactMarkdown from "react-markdown";
import { Divider } from "../../../../../../../components/common/divider";
import { Loader } from "../../../../../../../components/common/loader";
import { useLesson } from "../../../../../../../lib/hooks/lesson";
import {
  useChapterIdForSidebar,
  useCourseIdForSidebar,
  useLessonIdForSidebar,
} from "../../../../../../../lib/hooks/sidebar";

const Lesson = () => {
  const router = useRouter();
  const { courseId } = useCourseIdForSidebar();
  const { chapterId } = useChapterIdForSidebar();
  const { lessonId } = useLessonIdForSidebar();
  const { loading, lesson } = useLesson(
    courseId as string,
    chapterId as string,
    lessonId as string
  );

  return (
    <main style={{ marginLeft: "250px" }} className="px-2">
      <div className="w-full">
        {loading ? <Loader /> : <LessonView lesson={lesson} />}
      </div>
    </main>
  );
};

const LessonView = ({ lesson }) => {
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
    </section>
  );
};

export default Lesson;
