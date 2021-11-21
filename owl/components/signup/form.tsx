import { Formik } from "formik";
import { MouseEventHandler, useContext, useState } from "react";
import toast from "react-hot-toast";
import { ISignupForm, SignupContext } from "../../lib/context/auth";
import { signup } from "../../lib/helpers/auth";
import { UsernameField, EmailField, PasswordField, DateField } from "./fields";

export const SignupForm = () => {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    dateOfBirth: "",
  };

  const [loading, setLoading] = useState(false);
  const handleSubmit = async (values: ISignupForm) => {
    setLoading(() => true);
    const [success, err] = await signup(values);
    if (err) toast(err.msg, { icon: "❌" });
    else toast(success.msg, { icon: "✅" });
    setLoading(() => false);
  };

  return (
    <Formik onSubmit={handleSubmit} initialValues={initialValues}>
      {({ values, handleSubmit, handleChange }) => (
        <SignupContext.Provider
          value={{ values, handleSubmit, handleChange, loading, setLoading }}
        >
          <form className="mt-8 flex flex-col items-start w-2/4 space-y-5">
            <UsernameField />
            <EmailField />
            <PasswordField />
            <DateField />

            <div className="w-full flex justify-center mt-8">
              <SubmitButton />
            </div>
          </form>
        </SignupContext.Provider>
      )}
    </Formik>
  );
};

const SubmitButton = () => {
  const { handleSubmit, loading } = useContext(SignupContext);

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
