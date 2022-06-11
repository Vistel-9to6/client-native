import React from "react";
<<<<<<< HEAD

import NavigationApp from "./src/Navigation/NavigationApp";

export default function App() {
  return <NavigationApp />;
}
=======
import { StyleSheet } from "react-native";
import ScreenMain from "./src/components/ScreenMain";
import ScreenCamera from "./src/components/ScreenCamera";
import ScreenVideoResult from "./src/components/ScreenVideoResult";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={ScreenMain} />
        <Stack.Screen name="Camera" component={ScreenCamera} />
        <Stack.Screen name="VideoResult" component={ScreenVideoResult} />
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
>>>>>>> origin/dev
