import { Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import { MouseEventHandler, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  CourseUpdateContext,
  ICourseUpdateForm,
} from "../../lib/context/course";
import { AuthContext } from "../../lib/context/user";
import {
  getCoursePublicData,
  updateCoursePublicData,
} from "../../lib/helpers/course";
import { courseCreateValidationSchema } from "../../lib/validation";
import { Loader } from "../common/loader";
import {
  CoverImgField,
  DescriptionField,
  DifficultyLevelField,
  NameField,
  PriceField,
} from "./fields";

export const CourseUpdateForm = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const { courseId } = router.query;
  const [initialValues, setInitialValues] = useState({
    name: "",
    description: "",
    level: "",
    price: 0,
  });
  const [coverImgURL, setCoverImgURL] = useState<string>(null);
  const [coverImgFile, setCoverImgFile] = useState<File>(null);
  const [courseLoading, setCourseLoading] = useState(false);

  const getCourseData = async () => {
    if (!courseId) return;

    setCourseLoading(true);
    const [data, err] = await getCoursePublicData(courseId as string);
    if (err) toast(err.msg, { icon: "❌" });
    else {
      const { course } = data.data;
      setInitialValues({
        name: course.name,
        description: course.description,
        level: course.level._id,
        price: course.price,
      });
      setCoverImgURL(course.coverImgURL);
    }
    setCourseLoading(false);
  };
  useEffect(() => {
    getCourseData();
  }, [courseId]);

  const [loading, setLoading] = useState(false);
  const handleSubmit = async (values: ICourseUpdateForm) => {
    if (!user) return toast("You must be logged", { icon: "❌" });

    setLoading(() => true);
    const [data, err] = await updateCoursePublicData(
      courseId as string,
      coverImgFile ? { ...values, coverImg: coverImgFile } : values,
      user.data?._id,
      user.token
    );
    if (err) toast(err.msg, { icon: "❌" });
    else toast(data.msg, { icon: "✅" });
    setLoading(() => false);
  };

  return (
    <>
      {courseLoading ? (
        <Loader />
      ) : (
        <Formik
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={courseCreateValidationSchema}
        >
          {({
            values,
            handleSubmit,
            handleChange,
            errors,
            touched,
            handleBlur,
          }) => (
            <CourseUpdateContext.Provider
              value={{
                values,
                handleSubmit,
                handleChange,
                loading,
                setLoading,
                errors,
                touched,
                handleBlur,
                coverImgURL,
                coverImgFile,
                setCoverImgFile,
              }}
            >
              <form className="mt-8 flex flex-col items-start w-3/4 space-y-5">
                <NameField />
                <DescriptionField />
                <DifficultyLevelField />
                <PriceField />
                <CoverImgField />

                <div className="w-full flex justify-center mt-8">
                  <SubmitButton />
                </div>
              </form>
            </CourseUpdateContext.Provider>
          )}
        </Formik>
      )}
    </>
  );
};

const SubmitButton = () => {
  const { handleSubmit, loading } = useContext(CourseUpdateContext);

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
