import { Formik } from "formik";
import { MouseEventHandler, useContext, useState } from "react";
import toast from "react-hot-toast";
import {
  ChapterCreateContext,
  IChapterCreateForm,
} from "../../lib/context/chapter";
import { AuthContext } from "../../lib/context/user";
import { createChapter } from "../../lib/helpers/chapter";
import { useCourseIdForSidebar } from "../../lib/hooks/sidebar";
import { chapterCreateValidationSchema } from "../../lib/validation";
import { DescriptionField, NameField } from "./fields";

export const ChapterCreateForm = () => {
  const { courseId } = useCourseIdForSidebar();
  const { user } = useContext(AuthContext);
  const initialValues = { name: "", description: "" };

  const [loading, setLoading] = useState(false);
  const handleSubmit = async (values: IChapterCreateForm) => {
    if (!user) return toast("You must be logged", { icon: "❌" });
    if (!courseId)
      return toast("Something went wrong, Please try again", {
        icon: "❌",
      });

    setLoading(() => true);
    const [data, err] = await createChapter(
      { ...values, courseId },
      user.data?._id,
      user.token
    );
    if (err) toast(err.msg, { icon: "❌" });
    else toast(data.msg, { icon: "✅" });
    setLoading(() => false);
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={chapterCreateValidationSchema}
    >
      {({
        values,
        handleSubmit,
        handleChange,
        errors,
        touched,
        handleBlur,
      }) => (
        <ChapterCreateContext.Provider
          value={{
            values,
            handleSubmit,
            handleChange,
            loading,
            setLoading,
            errors,
            touched,
            handleBlur,
          }}
        >
          <form className="mt-8 flex flex-col items-start w-3/4 space-y-5">
            <NameField />
            <DescriptionField />

            <div className="w-full flex justify-center mt-8">
              <SubmitButton />
            </div>
          </form>
        </ChapterCreateContext.Provider>
      )}
    </Formik>
  );
};

const SubmitButton = () => {
  const { handleSubmit, loading } = useContext(ChapterCreateContext);

  return (
    <button
      style={{
        height: "45px",
        padding: "12px 40px 14px 40px",
      }}
      className="bg-gradient-to-r from-purple2 to-purple3 text-btn-17 text-grey0 font-medium w-max rounded-full flex items-center justify-center"
      type="submit"
      onClick={handleSubmit as MouseEventHandler<HTMLButtonElement>}
    >
      {loading ? "Loading..." : "Create"}
    </button>
  );
};
