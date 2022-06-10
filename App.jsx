import React from "react";

import { StyleSheet } from "react-native";
import ScreenMain from "./src/components/MainScreen";
import ScreenCamera from "./src/components/CameraScreen";
import ScreenVideoResult from "./src/components/VideoResultScreen";
import VideoPostPage from "./src/components/VideoPostScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import "react-native-gesture-handler";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={ScreenMain} />
        <Stack.Screen name="Camera" component={ScreenCamera} />
        <Stack.Screen name="VideoResult" component={ScreenVideoResult} />
        <Stack.Screen name="VideoPost" component={VideoPostPage} />
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
