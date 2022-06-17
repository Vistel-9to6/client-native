import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContextProvider } from "./src/context/AuthContext";
import { ModalContextProvider } from "./src/context/modalContext";
import { NativeBaseProvider } from "native-base";
import "react-native-gesture-handler";

import TabNavigation from "./src/navigation/TabNavigation";
import CameraScreen from "./src/screen/CameraScreen";
import VideoResultScreen from "./src/screen/VideoResultScreen";
import VideoPostScreen from "./src/screen/VideoPostScreen";
import VideoConcatScreen from "./src/screen/VideoConcatScreen";
import LoginScreen from "./src/screen/LoginScreen";
import ProfileScreen from "./src/screen/ProfileScreen";
import EditGifScreen from "./src/screen/EditGifScreen";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <AuthContextProvider>
      <ModalContextProvider>
        <NativeBaseProvider>
          <NavigationContainer>
            <StatusBar style="auto" />
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen
                name="Home"
                component={TabNavigation}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Camera"
                component={CameraScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="VideoResult"
                component={VideoResultScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="VideoPost"
                component={VideoPostScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="VideoConcat"
                component={VideoConcatScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Gif"
                component={EditGifScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </NativeBaseProvider>
      </ModalContextProvider>
    </AuthContextProvider>
  );
}

export default App;
