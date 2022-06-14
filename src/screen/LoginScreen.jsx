import { useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  LogBox,
  Image,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { UserAuth } from "../context/AuthContext";
import googleLoginButtonImage from "../../assets/google-login-button.png";
import vistelLogo from "../../assets/vistel-logo.png";

import ModalError from "../components/ModalError";

WebBrowser.maybeCompleteAuthSession();
LogBox.ignoreLogs(["EventEmitter.removeListener"]);

function LoginScreen({ navigation }) {
  const { setUser, setIdToken } = UserAuth();

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
      const response = await fetch(
        `${process.env.API_SERVER_URL}/api/auth/google`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: id,
          }),
        },
      );

      const user = await response.json();
      setUser(user);
      setIdToken(user.token);

      navigation.goBack();
    } catch {
      return <ModalError />;
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
        <View style={styles.logoBox}>
          <Image source={vistelLogo} style={styles.logo} />
        </View>
        <View style={styles.loginBox}>
          <TouchableOpacity onPress={handleGoogleLoginButtonClick}>
            <Image
              style={styles.googleLoginButton}
              source={googleLoginButtonImage}
            />
          </TouchableOpacity>
        </View>
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
    width: 400,
    height: 600,
    resizeMode: "center",
  },
  loginBox: {
    flex: 1,
    marginTop: 50,
    alignItems: "center",
  },
  googleLoginButton: {
    resizeMode: "contain",
    width: 250,
  },
});

export default LoginScreen;
