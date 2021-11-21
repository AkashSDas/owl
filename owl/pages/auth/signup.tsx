import { OwlTopSection } from "../../components/common/branding";
import { EmojiSection } from "../../components/common/emoji_section";
import { SignupForm } from "../../components/signup/form";

const Signup = () => {
  return (
    <main>
      <OwlTopSection />

      <section className="mt-8 flex flex-col items-center relative h-screen">
        <h1 className="text-desktop-h4">Sign up</h1>
        <SignupForm />
        <EmojiSection />
      </section>
    </main>
  );
};

export default Signup;
