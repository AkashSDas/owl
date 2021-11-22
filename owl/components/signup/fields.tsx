import { useContext, useState } from "react";
import { SignupContext } from "../../lib/context/auth";
import { Calendar, Hide, Lock, Message, Show, User } from "react-iconly";

export const FormLabel = ({
  text,
  htmlFor,
}: {
  text: string;
  htmlFor: string;
}) => {
  return (
    <label htmlFor={htmlFor} className="font-medium text-caption mb-2">
      {text}
    </label>
  );
};

export const FormFieldError = ({ text }: { text: string }) => {
  return <div className="text-error">{text}</div>;
};

export const UsernameField = () => {
  const { values, handleChange, touched, errors, handleBlur } =
    useContext(SignupContext);

  return (
    <div className="form-field w-full">
      <FormLabel text="Username" htmlFor="username" />
      <div className="flex justify-between items-center space-x-4 bg-grey1 px-6 py-4 rounded-xl">
        <User primaryColor="hsla(0, 0%, 19%, 1)" />
        <input
          className="w-full bg-grey1 outline-none text-desktop-body-intro"
          name="username"
          value={values.username}
          onChange={handleChange}
          type="text"
          placeholder="What you want us to call you?"
          onBlur={handleBlur}
        />
      </div>
      {errors.username && touched.username ? (
        <FormFieldError text={errors.username} />
      ) : null}
    </div>
  );
};

export const EmailField = () => {
  const { values, handleChange, handleBlur, touched, errors } =
    useContext(SignupContext);

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
    useContext(SignupContext);

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

export const DateField = () => {
  const { values, handleChange, handleBlur, errors, touched } =
    useContext(SignupContext);

  return (
    <div className="form-field w-full">
      <FormLabel text="Date of birth" htmlFor="dateOfBirth" />
      <div className="relative flex justify-between items-center space-x-4 bg-grey1 px-6 py-4 rounded-xl">
        <Calendar primaryColor="hsla(0, 0%, 19%, 1)" />
        <input
          name="dateOfBirth"
          value={values.dateOfBirth}
          onChange={handleChange}
          className={`w-full bg-grey1 outline-none text-desktop-body-intro right-6`}
          type="date"
          placeholder="When were you born?"
          onBlur={handleBlur}
        />
      </div>
      {errors.dateOfBirth && touched.dateOfBirth ? (
        <FormFieldError text={errors.dateOfBirth} />
      ) : null}
    </div>
  );
};
