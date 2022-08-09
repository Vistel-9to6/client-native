import { useContext, createContext, useReducer } from "react";

const ModalContext = createContext();
const ModalDispatchContext = createContext();

const initialState = false;

const reducer = (preState, action) => {
  switch (action.type) {
    case "OPEN_MODAL":
      return true;
    case "CLOSE_MODAL":
      return false;
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export function ModalContextProvider({ children }) {
  const [modalStatus, modalDispatch] = useReducer(reducer, initialState);

  const handleModalOpen = () => {
    modalDispatch({ type: "OPEN_MODAL" });
  };
  const handleModalClose = () => {
    modalDispatch({ type: "CLOSE_MODAL" });
  };

  return (
    <ModalContext.Provider value={modalStatus}>
      <ModalDispatchContext.Provider
        value={{ handleModalOpen, handleModalClose }}
      >
        {children}
      </ModalDispatchContext.Provider>
    </ModalContext.Provider>
  );
}

export const ModalHandler = () => {
  return useContext(ModalContext);
};

export const ModalDispatchHandler = () => {
  return useContext(ModalDispatchContext);
};
