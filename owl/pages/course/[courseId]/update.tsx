import { EmojiSectionForSidebar } from "../../../components/common/emoji_section";
import { CourseUpdateForm } from "../../../components/course_update/form";

/**
 * Using client side rendering for this page as we don't need
 * any SEO for this page. This is the page where user logged in with
 * role of teacher can edit his/her course of courseId
 */

const UpdateCourse = () => {
  return (
    <main style={{ marginLeft: "250px" }} className="px-2">
      <section className="mt-8 w-full flex flex-col items-center relative">
        <h1 className="text-desktop-h4">Update course info</h1>
        <CourseUpdateForm />
        <EmojiSectionForSidebar />
      </section>
    </main>
  );
};

export default UpdateCourse;
