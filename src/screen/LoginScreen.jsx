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
import googleLoginButtonImage from "../../assets/google-login-button.png";

import ModalError from "../components/ModalError";

import { UserAuth } from "../context/AuthContext";
import { API_SERVER_URL, EXPO_CLIENT_ID, ANDROID_CLIENT_ID } from "@env";

WebBrowser.maybeCompleteAuthSession();
LogBox.ignoreLogs(["EventEmitter.removeListener"]);

function LoginScreen({ navigation }) {
  const { setUser, setIdToken } = UserAuth();

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: EXPO_CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID,
    responseType: "id_token",
  });

  const handleGoogleLoginButtonClick = () => {
    promptAsync({ showInRecents: true, useProxy: true });
  };

  const handleLogin = async (id) => {
    try {
      setIdToken(id);

      const response = await fetch(`${API_SERVER_URL}/api/auth/google`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: id,
        }),
      });

      const user = await response.json();
      setUser(user);

      navigation.navigate("Home");
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
    <View style={styles.container}>
      <Text style={styles.logo}>Vistel</Text>
      <TouchableOpacity onPress={handleGoogleLoginButtonClick}>
        <Image
          style={styles.googleLoginButton}
          source={googleLoginButtonImage}
        />
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: 400,
    margin: 170,
    textAlign: "center",
    fontSize: 100,
  },
  googleLoginButton: {
    width: 250,
    height: 250,
    resizeMode: "contain",
  },
});

export default LoginScreen;
