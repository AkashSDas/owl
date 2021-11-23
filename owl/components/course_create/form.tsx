import { Formik } from "formik";
import { MouseEventHandler, useContext, useState } from "react";
import toast from "react-hot-toast";
import {
  CourseCreateContext,
  ICourseCreateForm,
} from "../../lib/context/course";
import { AuthContext } from "../../lib/context/user";
import { createCourse } from "../../lib/helpers/course";
import { courseCreateValidationSchema } from "../../lib/validation";
import {
  DescriptionField,
  DifficultyLevelField,
  NameField,
  PriceField,
} from "./fields";

export const CourseCreateForm = () => {
  const { user } = useContext(AuthContext);
  const initialValues = { name: "", description: "", level: "", price: 0 };

  const [loading, setLoading] = useState(false);
  const handleSubmit = async (values: ICourseCreateForm) => {
    if (!user) return toast("You must be logged", { icon: "❌" });

    setLoading(() => true);
    const [data, err] = await createCourse(values, user.token, user.data?._id);
    if (err) toast(err.msg, { icon: "❌" });
    else toast(data.msg, { icon: "✅" });
    setLoading(() => false);
  };

  return (
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
        <CourseCreateContext.Provider
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
            <DifficultyLevelField />
            <PriceField />

            <div className="w-full flex justify-center mt-8">
              <SubmitButton />
            </div>
          </form>
        </CourseCreateContext.Provider>
      )}
    </Formik>
  );
};

const SubmitButton = () => {
  const { handleSubmit, loading } = useContext(CourseCreateContext);

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
