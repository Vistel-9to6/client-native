import React from "react";
import { Text, StyleSheet, View, Button } from "react-native";

function MainScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Vistel</Text>
      <Button title={"촬영"} onPress={() => navigation.navigate("Camera")} />
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

export default MainScreen;
