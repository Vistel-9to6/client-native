import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Button, LogBox } from "react-native";
import { UserAuth } from "../context/AuthContext";

import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();
LogBox.ignoreLogs(["EventEmitter.removeListener"]);

function LoginScreen({ navigation }) {
  const { setUser, setIdToken } = UserAuth();

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: process.env.EXPO_CLIENT_ID,
    androidClientId: process.env.ANDROID_CLIENT_ID,
    responseType: "id_token",
  });

  useEffect(() => {
    if (response?.type === "success") {
      handleLogin(response.params.id_token);
    }
  }, [response]);

  const handleLogin = async (id) => {
    try {
      setIdToken(id);

      const response = await fetch(`${process.env.API_SERVER_URL}/api/google`, {
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

  return (
    <View style={styles.container}>
      <Button
        title={"Login"}
        onPress={() => {
          promptAsync({ showInRecents: true, useProxy: true });
        }}
      />
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
