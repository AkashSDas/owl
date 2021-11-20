import { EmojiCard } from "./hero_section";

export const TeacherSection = () => {
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
