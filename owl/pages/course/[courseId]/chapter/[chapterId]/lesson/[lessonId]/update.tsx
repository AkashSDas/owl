import { EmojiSectionForSidebar } from "../../../../../../../components/common/emoji_section";
import { LessonUpdateForm } from "../../../../../../../components/lesson_update/form";

const UpdateLesson = () => {
  return (
    <main style={{ marginLeft: "250px" }} className="px-2">
      <section className="mt-8 w-full flex flex-col items-center relative">
        <h1 className="text-desktop-h4">Update Lesson</h1>
        <LessonUpdateForm />
        <EmojiSectionForSidebar />
      </section>
    </main>
  );
};

export default UpdateLesson;
