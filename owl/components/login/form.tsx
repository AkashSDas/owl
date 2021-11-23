import { Formik } from "formik";
import { MouseEventHandler, useContext, useState } from "react";
import toast from "react-hot-toast";
import { ILoginForm, LoginContext } from "../../lib/context/auth";
import { AuthContext } from "../../lib/context/user";
import {
  isAuthenticated,
  login,
  saveUserToLocalStorage,
} from "../../lib/helpers/auth";
import { loginValidationSchema } from "../../lib/validation";
import { EmailField, PasswordField } from "./fields";

export const LoginForm = () => {
  const { setUser } = useContext(AuthContext);
  const initialValues = { email: "", password: "" };

  const [loading, setLoading] = useState(false);
  const handleSubmit = async (values: ILoginForm) => {
    setLoading(() => true);
    const [data, err] = await login(values);
    if (err) toast(err.msg, { icon: "❌" });
    else {
      saveUserToLocalStorage(data.data, () => {
        toast(data.msg, { icon: "✅" });
      });
      const auth = isAuthenticated();
      if (auth)
        setUser({
          token: auth.token,
          data: {
            createdAt: auth.user.createdAt,
            dateOfBirth: auth.user.dateOfBirth,
            email: auth.user.email,
            profilePicURL: auth.user.profilePicURL,
            roles: auth.user.roles,
            updatedAt: auth.user.updatedAt,
            username: auth.user.username,
            _id: auth.user._id,
          },
        });
    }
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
        <LoginContext.Provider
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
          <form className="mt-8 flex flex-col items-start w-2/4 space-y-5">
            <EmailField />
            <PasswordField />

            <div className="w-full flex justify-center mt-8">
              <SubmitButton />
            </div>
          </form>
        </LoginContext.Provider>
      )}
    </Formik>
  );
};

const SubmitButton = () => {
  const { handleSubmit, loading } = useContext(LoginContext);

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
      {loading ? "Loading..." : "Login"}
    </button>
  );
};
