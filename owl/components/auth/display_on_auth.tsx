import { useContext } from "react";
import { AuthContext } from "../../lib/context/user";

export const DisplayOnAuth = ({ children }: { children: JSX.Element }) => {
  const { user } = useContext(AuthContext);
  return user ? children : null;
};

export const DisplayOnNoAuth = ({ children }: { children: JSX.Element }) => {
  const { user } = useContext(AuthContext);
  return user ? null : children;
};
