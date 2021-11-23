import { useContext, useEffect } from "react";
import { AuthContext } from "../../lib/context/user";
import { isAuthenticated } from "../../lib/helpers/auth";

/**
 * This will set the user when the app is loaded
 */
export const AuthWrapper = ({ children }: { children: JSX.Element }) => {
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
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
  }, []);

  return <div>{children}</div>;
};
