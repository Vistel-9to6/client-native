import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Button, LogBox } from "react-native";
import { UserAuth } from "../context/AuthContext";

import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

import { API_SERVER_URL, EXPO_CLIENT_ID, ANDROID_CLIENT_ID } from "@env";

WebBrowser.maybeCompleteAuthSession();
LogBox.ignoreLogs(["EventEmitter.removeListener"]);

function ScreenLogin({ navigation }) {
  const { setUser } = UserAuth();

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: EXPO_CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID,
    responseType: "id_token",
  });

  useEffect(() => {
    if (response?.type === "success") {
      handleLogin(response.params.id_token);
    }
  }, [response]);

  const handleLogin = async (id) => {
    try {
      const response = await fetch(`${API_SERVER_URL}api/google`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: id,
        }),
      });

      const data = await response.json();
      const { user } = data;
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

export default ScreenLogin;
