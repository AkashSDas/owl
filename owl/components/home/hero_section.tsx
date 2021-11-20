import { PrimaryButton } from "../common/buttons";

export const HeroSection = () => {
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

export const EmojiCard = ({
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
