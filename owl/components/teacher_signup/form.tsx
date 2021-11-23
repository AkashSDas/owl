import { Formik } from "formik";
import { MouseEventHandler, useContext, useState } from "react";
import { TeacherSignupContext } from "../../lib/context/auth";
import { loginValidationSchema } from "../../lib/validation";
import {
  BioField,
  ExpertiseField,
  QualificationsField,
  YearsOfExperienceField,
} from "./fields";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../lib/context/user";
import { becomeTeacher } from "../../lib/helpers/auth";

/**
 * @remarks
 *
 * Here there is not onSubmit on formik (it has dummy/empty function which won't be
 * fired why submitting the form). This has to be done since qualification
 * and expertise are not formvalues and they custom values which we'll not
 * have access to handleSubmit in TeacherSignupForm as provider won't be
 * have its access. But form will be submitted normally and handleSubmit on
 * Submit btn will be fired which will take care of teacher signup.
 *
 * Also none of the formvalue and nor qualification and expertise has any formik
 * error and touch values available for validation. For this validation is done
 * in handleSubmit in Submit btn
 */
export const TeacherSignupForm = () => {
  const initialValues = { bio: "", yearsOfExperience: 0 };
  const [qualifications, setQualifications] = useState([]);
  const [expertise, setExpertise] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <Formik
      onSubmit={() => {}}
      initialValues={initialValues}
      validationSchema={loginValidationSchema}
    >
      {({ values, handleChange, errors, touched, handleBlur }) => (
        <TeacherSignupContext.Provider
          value={{
            values,
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
  const { user } = useContext(AuthContext);

  const { values, qualifications, expertise, setLoading, loading } =
    useContext(TeacherSignupContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) return toast("You must be logged", { icon: "❌" });

    // Validation
    if (qualifications.length === 0)
      return toast("You should have atleast one qualification", { icon: "❌" });
    if (expertise.length === 0)
      return toast("You should have atleast one expertise", { icon: "❌" });
    if (values.yearsOfExperience < 0)
      return toast("Years of experience should be positive", { icon: "❌" });
    if (values.bio.length === 0)
      return toast("Bio is required", { icon: "❌" });

    setLoading(() => true);
    const payload = {
      ...values,
      qualifications: qualifications.map((q) => q._id),
      expertise: expertise.map((exp) => exp._id),
    };
    const [data, err] = await becomeTeacher(
      payload,
      user.token,
      user.data?._id
    );
    if (err) toast(err.msg, { icon: "❌" });
    else toast(data.msg, { icon: "✅" });
    setLoading(() => false);
  };

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
