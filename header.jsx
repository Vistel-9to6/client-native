import React from "react";
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

function AppHeader() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.leftSection}>
        <AntDesign name="smileo" size={36} color="black" />
      </TouchableOpacity>
      <Pressable style={styles.button}>
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
  leftSection: {
    position: "absolute",
    top: 10,
    left: 20,
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

export default AppHeader;
