import { useContext, createContext, useState } from "react";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState("");
  const [idToken, setIdToken] = useState("");

  return (
    <AuthContext.Provider value={{ user, setUser, idToken, setIdToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export const UserAuth = () => {
  return useContext(AuthContext);
};
