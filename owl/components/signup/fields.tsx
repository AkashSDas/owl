import { useContext, useState } from "react";
import { SignupContext } from "../../lib/context/auth";
import { Hide, Lock, Message, Show, User } from "react-iconly";

const FormLabel = ({ text, htmlFor }: { text: string; htmlFor: string }) => {
  return (
    <label htmlFor={htmlFor} className="font-medium text-caption mb-2">
      {text}
    </label>
  );
};

export const UsernameField = () => {
  const { values, handleChange } = useContext(SignupContext);

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
        />
      </div>
    </div>
  );
};

export const EmailField = () => {
  const { values, handleChange } = useContext(SignupContext);

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
        />
      </div>
    </div>
  );
};

export const PasswordField = () => {
  const [show, setShow] = useState(false);
  const { values, handleChange } = useContext(SignupContext);

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
        />
        <div onClick={() => setShow(!show)}>
          {show ? (
            <Hide primaryColor="hsla(0, 0%, 19%, 1)" size="large" />
          ) : (
            <Show primaryColor="hsla(0, 0%, 19%, 1)" size="large" />
          )}
        </div>
      </div>
    </div>
  );
};
