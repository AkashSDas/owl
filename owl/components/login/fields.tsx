import { useContext, useState } from "react";
import { LoginContext } from "../../lib/context/auth";
import { Hide, Lock, Message, Show } from "react-iconly";
import { FormFieldError, FormLabel } from "../signup/fields";

export const EmailField = () => {
  const { values, handleChange, handleBlur, touched, errors } =
    useContext(LoginContext);

  return (
    <div className="form-field w-full">
      <FormLabel text="Email" htmlFor="email" />
      <div className="flex justify-between items-center space-x-4 bg-grey1 px-6 py-4 rounded-xl">
        <Message primaryColor="hsla(0, 0%, 19%, 1)" />
        <input
          name="email"
          value={values.email}
          onChange={handleChange}
          className="w-full bg-grey1 outline-none text-desktop-body-intro"
          type="email"
          placeholder="You email address, Working one :-)"
          onBlur={handleBlur}
        />
      </div>
      {errors.email && touched.email ? (
        <FormFieldError text={errors.email} />
      ) : null}
    </div>
  );
};

export const PasswordField = () => {
  const [show, setShow] = useState(false);
  const { values, handleChange, touched, handleBlur, errors } =
    useContext(LoginContext);

  return (
    <div className="form-field w-full">
      <FormLabel text="Password" htmlFor="password" />
      <div className="flex justify-between items-center space-x-4 bg-grey1 px-6 py-4 rounded-xl">
        <Lock primaryColor="hsla(0, 0%, 19%, 1)" size="large" />
        <input
          name="password"
          value={values.password}
          onChange={handleChange}
          className="w-full bg-grey1 outline-none text-desktop-body-intro placeholder-shown:opacity-60"
          type={show ? "text" : "password"}
          placeholder="🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀🏀"
          onBlur={handleBlur}
        />
        <div onClick={() => setShow(!show)}>
          {show ? (
            <Hide primaryColor="hsla(0, 0%, 19%, 1)" size="large" />
          ) : (
            <Show primaryColor="hsla(0, 0%, 19%, 1)" size="large" />
          )}
        </div>
      </div>
      {errors.password && touched.password ? (
        <FormFieldError text={errors.password} />
      ) : null}
    </div>
  );
};
