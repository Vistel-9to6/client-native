import React from "react";
import { Text, StyleSheet, View } from "react-native";

function ModalSuccess() {
  return (
    <View style={styles.container}>
      <Text>Response Success</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
  },
});

export default ModalSuccess;
