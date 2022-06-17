import { useContext, createContext, useState } from "react";

const ModalContext = createContext();

export function ModalContextProvider({ children }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <ModalContext.Provider value={{ openModal, setOpenModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export const ModalHandler = () => {
  return useContext(ModalContext);
};
