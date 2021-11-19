/**
 * Landing Page
 */

import { PrimaryButton } from "../components/buttons";

const Index = () => {
  return (
    <main>
      <HeroSection />
      <ExploreSection />
    </main>
  );
};

/**
 * Section 1
 */

const HeroSection = () => {
  return (
    <section
      style={{ height: "350px" }}
      className="w-full relative my-16 h-screen"
    >
      <TagLineText />
      <EmojiCard text="⏰ Learn at your own pace" position="top-0 left-8" />
      <EmojiCard text="🚀 Learn whereever you want" position="top-0 right-8" />
      <EmojiCard
        text="😎 Create your own learning path"
        position="bottom-0 left-8"
      />
      <EmojiCard
        text="💪 Learn how much you want"
        position="bottom-0 right-8"
      />
    </section>
  );
};

const TagLineText = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center space-y-8">
      <h1 className="mt-10 text-desktop-h1 z-10 flex flex-col justify-center items-center">
        <div>
          Learn like a <span className="text-purple">Pro</span>
        </div>
        <div>without any distraction</div>
      </h1>

      <PrimaryButton text="Get started 🎸" onClick={() => {}} />
    </div>
  );
};

const EmojiCard = ({ text, position }: { text: string; position: string }) => {
  return (
    <div
      style={{ boxShadow: "0px 8px  16px rgba(0, 0, 0, 0.10)" }}
      className={`absolute ${position} bg-grey0 rounded-full p-6 font-medium text-desktop-body-main opacity-60`}
    >
      {text}
    </div>
  );
};

/**
 * Section 2
 */

const ExploreSection = () => {
  return (
    <section className="w-full relative my-16 h-screen bg-grey5 py-8">
      <h1 className="text-grey0 text-desktop-h1 w-full text-center">
        <span className="text-purple">Explore</span> your curiosity
      </h1>

      <EmojiDarkCard
        text="🤖 Atrifical Intelligence"
        position="top-40 left-8"
      />
      <EmojiDarkCard text="💪 Fitness" position="top-40 right-96" />
      <EmojiDarkCard text="🎰 Stock Market" position="top-48 right-8" />
      <EmojiDarkCard text="🌈 Web Development" position="bottom-16 left-8" />
      <EmojiDarkCard
        text="💰 Finance and Economics"
        position="bottom-16 right-32"
      />

      <div
        style={{ color: "#A3A3A3" }}
        className="flex flex-col justify-center items-center absolute top-32 bottom-0 left-0 right-0 text-desktop-h3 font-medium text-grey1"
      >
        <span>Don’t be limited to one field, explore</span>
        <span className="mb-6">
          <span className="text-grey0 font-bold italic">across industries</span>{" "}
          and <span className="text-grey0 font-bold italic">topics</span>
        </span>

        <PrimaryButton text="Explore 🚗" onClick={() => {}} />
      </div>
    </section>
  );
};

const EmojiDarkCard = ({
  text,
  position,
}: {
  text: string;
  position: string;
}) => {
  return (
    <div
      style={{ boxShadow: "0px 8px  16px rgba(0, 0, 0, 0.10)" }}
      className={`absolute ${position} bg-grey4 text-grey0 rounded-full p-4 font-medium text-desktop-body-main opacity-60`}
    >
      {text}
    </div>
  );
};

export default Index;
