import { useContext, createContext, useState } from "react";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [idToken, setIdToken] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser, idToken, setIdToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export const UserAuth = () => {
  return useContext(AuthContext);
};
