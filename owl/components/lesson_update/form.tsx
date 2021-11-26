import { Formik } from "formik";
import { MouseEventHandler, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  ILessonCreateForm,
  LessonCreateContext,
} from "../../lib/context/lesson";
import { CourseEditorSidebarContext } from "../../lib/context/sidebar";
import { AuthContext } from "../../lib/context/user";
import {
  createLesson,
  getLesson,
  updateLesson,
} from "../../lib/helpers/lesson";
import {
  useChapterIdForSidebar,
  useCourseIdForSidebar,
  useLessonIdForSidebar,
} from "../../lib/hooks/sidebar";
import { lessonCreateValidationSchema } from "../../lib/validation";
import { Loader } from "../common/loader";
import { DescriptionField, NameField, NoteField, VideoField } from "./fields";

export const LessonUpdateForm = () => {
  const { courseId } = useCourseIdForSidebar();
  const { chapterId } = useChapterIdForSidebar();
  const { lessonId } = useLessonIdForSidebar();

  const { sidebar } = useContext(CourseEditorSidebarContext);
  const { user } = useContext(AuthContext);
  const [initialValues, setInitialValues] = useState({
    name: "",
    description: "",
    note: "",
  });
  const [videoFile, setVideoFile] = useState<File>(null);
  const [videoURL, setVideoURL] = useState<string>(null);
  const [lessonLoading, setLessonLoading] = useState(false);

  const getLessonData = async () => {
    if (!courseId || !chapterId || !lessonId) return;

    setLessonLoading(true);
    const [data, err] = await getLesson(
      courseId as string,
      chapterId as string,
      lessonId as string
    );
    if (err) toast(err.msg, { icon: "❌" });
    else {
      const { lesson } = data.data;
      setInitialValues({
        name: lesson.name,
        description: lesson.description,
        note: lesson.note,
      });
      setVideoURL(lesson.videoURL);
    }
    setLessonLoading(false);
  };

  useEffect(() => {
    getLessonData();
  }, [courseId, chapterId, lessonId]);

  const [loading, setLoading] = useState(false);
  const handleSubmit = async (values: ILessonCreateForm) => {
    if (!user) return toast("You must be logged", { icon: "❌" });
    if (!sidebar.chapterId || !sidebar.courseId || !sidebar.lessonId)
      return toast("Something went wrong, Please try again", { icon: "❌" });

    setLoading(() => true);
    const [data, err] = await updateLesson(
      sidebar.courseId,
      sidebar.chapterId,
      sidebar.lessonId,
      videoFile ? { ...values, video: videoFile } : values,
      user.data?._id,
      user.token
    );
    if (err) toast(err.msg, { icon: "❌" });
    else toast(data.msg, { icon: "✅" });
    setLoading(() => false);
  };

  return (
    <>
      {lessonLoading ? (
        <Loader />
      ) : (
        <Formik
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={lessonCreateValidationSchema}
        >
          {({
            values,
            handleSubmit,
            handleChange,
            errors,
            touched,
            handleBlur,
          }) => (
            <LessonCreateContext.Provider
              value={{
                values,
                handleSubmit,
                handleChange,
                loading,
                setLoading,
                errors,
                touched,
                handleBlur,
                videoFile,
                setVideoFile,
              }}
            >
              <form className="mt-8 flex flex-col items-start w-3/4 space-y-5">
                <NameField />
                <DescriptionField />
                <NoteField />
                <video
                  style={{ height: "500px" }}
                  src={videoURL}
                  className="w-full"
                  controls
                />
                <VideoField />

                <div className="w-full flex justify-center mt-8">
                  <SubmitButton />
                </div>
              </form>
            </LessonCreateContext.Provider>
          )}
        </Formik>
      )}
    </>
  );
};

const SubmitButton = () => {
  const { handleSubmit, loading } = useContext(LessonCreateContext);

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
      {loading ? "Loading..." : "Update"}
    </button>
  );
};
