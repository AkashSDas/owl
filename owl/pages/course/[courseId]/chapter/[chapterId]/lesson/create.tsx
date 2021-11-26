import { EmojiSectionForSidebar } from "../../../../../../components/common/emoji_section";
import { LessonCreateForm } from "../../../../../../components/lesson_create/form";

const CreateLesson = () => {
  return (
    <main style={{ marginLeft: "250px" }} className="px-2">
      <section className="mt-8 w-full flex flex-col items-center relative h-screen">
        <h1 className="text-desktop-h4">Lesson Info</h1>
        <LessonCreateForm />
        <EmojiSectionForSidebar />
      </section>
    </main>
  );
};

export default CreateLesson;
