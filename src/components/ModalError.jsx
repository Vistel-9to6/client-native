import React from "react";
import { Text, StyleSheet, View } from "react-native";

function ModalError() {
  return (
    <View style={styles.container}>
      <Text>Response Error</Text>
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

export default ModalError;
