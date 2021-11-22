import { useState } from "react";
import { AuthContext, IUser } from "../../lib/context/user";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<IUser>({ token: null, data: null });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
