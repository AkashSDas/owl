/**
 * Landing Page
 */

import { PrimaryButton } from "../components/buttons";

const Index = () => {
  return (
    <main>
      <HeroSection />
      <ExploreSection />
      <TeacherSection />
    </main>
  );
};

/**
 * Section 1
 */

const HeroSection = () => {
  return (
    <section style={{ height: "85vh" }} className="w-full relative">
      <TagLineText />
      <EmojiCard
        text="⏰ Learn at your own pace"
        position="top-8 left-8"
        angle={-6}
      />
      <EmojiCard
        text="🚀 Learn whereever you want"
        position="top-8 right-8"
        angle={6}
      />
      <EmojiCard
        text="😎 Create your own learning path"
        position="bottom-8 left-8"
        angle={6}
      />
      <EmojiCard
        text="💪 Learn how much you want"
        position="bottom-8 right-8"
        angle={-6}
      />
    </section>
  );
};

const TagLineText = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center space-y-8">
      <h1 className="mt-24 text-desktop-h1 z-10 flex flex-col justify-center items-center">
        <div>
          Learn like a <span className="text-purple">Pro</span>
        </div>
        <div>without any distraction</div>
      </h1>

      <PrimaryButton text="Get started 🎸" onClick={() => {}} />
    </div>
  );
};

const EmojiCard = ({
  text,
  position,
  opacity = "opacity-60",
  angle = 0,
}: {
  text: string;
  position: string;
  opacity?: string;
  angle?: number;
}) => {
  return (
    <div
      style={{
        boxShadow: "0px 8px  16px rgba(0, 0, 0, 0.10)",
        transform: `rotate(${angle}deg)`,
      }}
      className={`absolute ${position} bg-grey0 rounded-full p-6 font-medium text-desktop-body-main ${opacity}`}
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
    <section className="w-full relative h-screen bg-grey5 py-8">
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
  opacity = "opacity-60",
}: {
  text: string;
  position: string;
  opacity?: string;
}) => {
  return (
    <div
      style={{ boxShadow: "0px 8px  16px rgba(0, 0, 0, 0.25)" }}
      className={`absolute ${position} bg-grey4 text-grey0 rounded-full p-4 font-medium text-desktop-body-main ${opacity}`}
    >
      {text}
    </div>
  );
};

/**
 * Section 3
 */

const TeacherSection = () => {
  return (
    <section className="w-full relative h-screen bg-primary py-8">
      <h1 className="text-grey4 text-desktop-h1 w-full text-center">
        Learn from the <span className="text-purple">best</span>
      </h1>

      <div>
        <TeacherProfilePic position="top-40 left-48" size="100px" />
        <TeacherProfilePic position="top-40 right-48" size="100px" />
        <TeacherProfilePic position="bottom-24 right-24" size="125px" />
        <TeacherProfilePic position="bottom-24 left-24" size="125px" />
      </div>

      <div className="w-full flex justify-center absolute">
        <TeacherProfilePic
          position="top-12"
          opacity="opacity-100"
          size="200px"
        />
        <EmojiCard
          text="😎 UI/UX Designer"
          opacity="opcaity-100"
          position="left-96 top-6"
        />
        <EmojiCard
          text="🚨 Motion Designing"
          opacity="opcaity-100"
          position="right-80 top-32"
        />
        <EmojiCard
          text="🌈 Figma"
          opacity="opcaity-100"
          position="left-96 top-48"
        />
      </div>

      <div
        style={{ lineHeight: "135%" }}
        className="flex flex-col justify-center items-center absolute -bottom-6 left-0 right-0 text-desktop-h3 font-medium text-grey4"
      >
        <span>Learn from the people who are leading </span>
        <span>the industry, who are creating new things,</span>
        <span className="mb-6">
          <span className="text-grey5 font-bold italic">
            people who teach the best
          </span>
        </span>
      </div>
    </section>
  );
};

const TeacherProfilePic = ({
  position,
  size,
  opacity = "opacity-60",
  src = "https://images.unsplash.com/photo-1463453091185-61582044d556?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80",
}) => {
  return (
    <img
      style={{
        height: size,
        width: size,
        border: "3px solid black",
        filter: "grayscale(1)",
      }}
      className={`rounded-full object-cover absolute ${position} ${opacity}`}
      src={src}
      alt=""
    />
  );
};

export default Index;
