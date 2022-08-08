import { AuthContextProvider } from "./src/context/AuthContext";
import { ModalContextProvider } from "./src/context/modalContext";
import { NativeBaseProvider } from "native-base";
import "react-native-gesture-handler";

import MainNavigation from "./src/navigation/MainNavigation";

function App() {
  return (
    <AuthContextProvider>
      <ModalContextProvider>
        <NativeBaseProvider>
          <MainNavigation />
        </NativeBaseProvider>
      </ModalContextProvider>
    </AuthContextProvider>
  );
}

export default App;
