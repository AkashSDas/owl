import { EmojiSectionForSidebar } from "../../components/common/emoji_section";
import { CourseCreateForm } from "../../components/course_create/form";

const CreateCourse = () => {
  return (
    <main style={{ marginLeft: "250px" }} className="px-2">
      <section className="mt-8 w-full flex flex-col items-center relative h-screen">
        <h1 className="text-desktop-h4">Course Info</h1>
        <CourseCreateForm />
        <EmojiSectionForSidebar />
      </section>
    </main>
  );
};

export default CreateCourse;
