import { Formik } from "formik";
import { MouseEventHandler, useContext, useState } from "react";
import {
  ITeacherSignupForm,
  TeacherSignupContext,
} from "../../lib/context/auth";
import { loginValidationSchema } from "../../lib/validation";
import {
  BioField,
  ExpertiseField,
  QualificationsField,
  YearsOfExperienceField,
} from "./fields";

export const TeacherSignupForm = () => {
  const initialValues = { bio: "", yearsOfExperience: 0 };
  const [qualifications, setQualifications] = useState([]);
  const [expertise, setExpertise] = useState([]);

  const [loading, setLoading] = useState(false);
  const handleSubmit = async (values: ITeacherSignupForm) => {
    setLoading(() => true);
    // const [data, err] = await login(values);
    // if (err) toast(err.msg, { icon: "❌" });
    // else {
    //   saveUserToLocalStorage(data.data, () => {
    //     toast(data.msg, { icon: "✅" });
    //   });
    setLoading(() => false);
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={loginValidationSchema}
    >
      {({
        values,
        handleSubmit,
        handleChange,
        errors,
        touched,
        handleBlur,
      }) => (
        <TeacherSignupContext.Provider
          value={{
            values,
            handleSubmit,
            handleChange,
            loading,
            setLoading,
            errors,
            touched,
            handleBlur,
            expertise,
            qualifications,
            setExpertise,
            setQualifications,
          }}
        >
          <form className="mt-8 flex flex-col items-start w-2/4 space-y-5">
            <QualificationsField />
            <ExpertiseField />
            <YearsOfExperienceField />
            <BioField />

            <div className="w-full flex justify-center mt-8">
              <SubmitButton />
            </div>
          </form>
        </TeacherSignupContext.Provider>
      )}
    </Formik>
  );
};

const SubmitButton = () => {
  const { handleSubmit, loading } = useContext(TeacherSignupContext);

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
      {loading ? "Loading..." : "Sign up"}
    </button>
  );
};
