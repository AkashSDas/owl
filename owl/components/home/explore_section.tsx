import { PrimaryButton } from "../common/buttons";

export const ExploreSection = () => {
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
