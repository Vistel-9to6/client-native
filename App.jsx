import React from "react";

import { StyleSheet, LogBox } from "react-native";
import ScreenMain from "./src/components/ScreenMain";
import ScreenCamera from "./src/components/ScreenCamera";
import ScreenResult from "./src/components/ScreenResult";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import "react-native-gesture-handler";
LogBox.ignoreLogs(["Remote debugger"]);
LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={ScreenMain} />
        <Stack.Screen name="Camera" component={ScreenCamera} />
        <Stack.Screen name="Result" component={ScreenResult} />
      </Stack.Navigator>
    </NavigationContainer>
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

export default App;
