import React from "react";
import { Text, StyleSheet, View } from "react-native";

function ModalError({ err }) {
  return (
    <View style={styles.container}>
      <Text>{err}</Text>
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
