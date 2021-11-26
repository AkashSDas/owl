import { ChapterUpdateForm } from "../../../../../components/chapter_update/form";
import { EmojiSectionForSidebar } from "../../../../../components/common/emoji_section";

const UpdateChapter = () => {
  return (
    <main style={{ marginLeft: "250px" }} className="px-2">
      <section className="mt-8 w-full flex flex-col items-center relative h-screen">
        <h1 className="text-desktop-h4">Update Chapter</h1>
        <ChapterUpdateForm />
        <EmojiSectionForSidebar />
      </section>
    </main>
  );
};

export default UpdateChapter;
