import { useContext, createContext, useReducer } from "react";

const initialState = {
  user: null,
  idToken: "",
};
const AuthContext = createContext();
const AuthDispatchContext = createContext();

const reducer = (preState, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return {
        ...preState,
        user: action.user,
        idToken: action.idToken,
      };
    case "SIGN_OUT":
      return {
        ...preState,
        user: null,
        idToken: "",
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export function AuthContextProvider({ children }) {
  const [authInfo, authDispatch] = useReducer(reducer, initialState);
  const { user, idToken } = authInfo;

  return (
    <AuthContext.Provider value={{ user, idToken }}>
      <AuthDispatchContext.Provider value={authDispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
}

export const UserAuth = () => {
  return useContext(AuthContext);
};

export function UserAuthDispatch() {
  return useContext(AuthDispatchContext);
}
