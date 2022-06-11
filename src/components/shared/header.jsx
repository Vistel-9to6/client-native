import React from "react";
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

function AppHeader({ navigation }) {
  const handleLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logo}>
        <AntDesign name="smileo" size={36} color="black" />
      </TouchableOpacity>
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.text}>로그인</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 50,
    marginTop: 50,
    backgroundColor: "white",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  logo: {
    position: "absolute",
    top: 3,
    left: 20,
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    right: 10,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "white",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
  },
});

export default AppHeader;
