import { OwlTopSection } from "../../components/common/branding";
import { EmojiSection } from "../../components/common/emoji_section";
import { TeacherSignupForm } from "../../components/teacher_signup/form";

const TeacherSignup = () => {
  return (
    <main>
      <OwlTopSection />

      <section className="mt-8 flex flex-col items-center relative">
        <h1 className="text-desktop-h4">Become a Teacher</h1>
        <TeacherSignupForm />
        <EmojiSection />
      </section>
    </main>
  );
};

export default TeacherSignup;
