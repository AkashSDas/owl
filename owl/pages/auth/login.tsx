import { OwlTopSection } from "../../components/common/branding";
import { EmojiSection } from "../../components/common/emoji_section";
import { LoginForm } from "../../components/login/form";

const Login = () => {
  return (
    <main>
      <OwlTopSection />

      <section className="mt-8 flex flex-col items-center relative h-screen">
        <h1 className="text-desktop-h4">Login</h1>
        <LoginForm />
        <EmojiSection />
      </section>
    </main>
  );
};

export default Login;
