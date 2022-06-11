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

      const response = await fetch(`${API_SERVER_URL}/api/google`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: id,
        }),
      });

      const userData = await response.json();
      const { user } = userData;
      setUser(user);

      navigation.navigate("Home");
    } catch (err) {
      alert(err);
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
          source={require("../../assets/google-login-button.png")}
        />
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LoginScreen;
