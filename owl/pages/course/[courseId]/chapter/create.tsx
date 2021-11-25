import { ChapterCreateForm } from "../../../../components/chapter_create/form";
import { EmojiSectionForSidebar } from "../../../../components/common/emoji_section";

const CreateChatper = () => {
  return (
    <main style={{ marginLeft: "250px" }} className="px-2">
      <section className="mt-8 w-full flex flex-col items-center relative h-screen">
        <h1 className="text-desktop-h4">Chapter Info</h1>
        <ChapterCreateForm />
        <EmojiSectionForSidebar />
      </section>
    </main>
  );
};

export default CreateChatper;
