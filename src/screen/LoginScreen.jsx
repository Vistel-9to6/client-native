import { useEffect } from "react";
import {
  StyleSheet,
  View,
  LogBox,
  Image,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

import { UserAuth } from "../context/AuthContext";
import { ModalHandler } from "../context/modalContext";
import { loginGoogle } from "../api/index";

import ModalContainer from "../components/shared/modal";
import { errorMessage } from "../../constants";

import googleLoginButtonImage from "../../assets/google-login-button.png";
import vistelLogoSmall from "../../assets/vistel-logo-small.png";

WebBrowser.maybeCompleteAuthSession();
LogBox.ignoreLogs(["EventEmitter.removeListener"]);

function LoginScreen({ navigation }) {
  const { setUser, setIdToken } = UserAuth();
  const { openModal, setOpenModal } = ModalHandler();

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: process.env.EXPO_CLIENT_ID,
    androidClientId: process.env.ANDROID_CLIENT_ID,
    responseType: "id_token",
  });

  const handleGoogleLoginButtonClick = () => {
    promptAsync({ showInRecents: true, useProxy: true });
  };

  const handleLogin = async (id) => {
    try {
      const user = await loginGoogle(id);

      setUser(user);
      setIdToken(user.token);

      navigation.goBack();
    } catch {
      setOpenModal(true);
    }
  };

  useEffect(() => {
    if (response?.type === "success") {
      handleLogin(response.params.id_token);
    }
  }, [response]);

  return (
    <>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <Image source={vistelLogoSmall} style={styles.logo} />
        <View style={styles.loginBox}>
          <TouchableOpacity onPress={handleGoogleLoginButtonClick}>
            <Image
              style={styles.googleLoginButton}
              source={googleLoginButtonImage}
            />
          </TouchableOpacity>
        </View>
        {openModal && (
          <ModalContainer
            isRequiredToGoBack={true}
            navigation={navigation}
            modalHeader={errorMessage.ERROR}
            modalBody={errorMessage.ERROR_LOGIN_FAILURE}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  logoBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    top: 70,
    marginTop: 100,
    resizeMode: "center",
  },
  loginBox: {
    flex: 1,
    marginTop: 180,
    alignItems: "center",
  },
  googleLoginButton: {
    resizeMode: "contain",
    width: 250,
  },
});

export default LoginScreen;
