import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import vistelLogo from "../../../assets/vistel-logo.png";

import { UserAuth } from "../../context/AuthContext";
import { LOGIN, LOGOUT } from "../../../constants/text";

function AppHeader({ navigation }) {
  const { user, setUser, setIdToken } = UserAuth();

  const handleLogin = () => navigation.navigate("Login");
  const handleLogout = () => {
    setUser("");
    setIdToken("");

    navigation.reset({ index: 0, routes: [{ name: "Home" }] });
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <TouchableOpacity>
          <Image source={vistelLogo} style={styles.logo} />
        </TouchableOpacity>
      </View>
      <View style={styles.loginContainer}>
        <TouchableOpacity
          style={styles.login}
          onPress={user ? handleLogout : handleLogin}
        >
          <Text>{user ? LOGOUT : LOGIN}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    diplay: "flex",
    flexDirection: "row",
    paddingTop: 40,
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  logoContainer: {
    top: 5,
    left: -50,
    diplay: "flex",
    width: "70%",
  },
  logo: {
    justifyContent: "center",
    width: undefined,
    height: 50,
  },
  loginContainer: {
    diplay: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
  },
  login: {
    diplay: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    width: "70%",
    height: "70%",
    borderRadius: 5,
    elevation: 3,
    backgroundColor: "white",
  },
});

export default AppHeader;
