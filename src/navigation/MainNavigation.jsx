import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "react-native-gesture-handler";

import { UserAuth } from "../context/AuthContext";

import TabNavigation from "./TabNavigation";
import CameraScreen from "../screen/CameraScreen";
import VideoResultScreen from "../screen/VideoResultScreen";
import VideoPostScreen from "../screen/VideoPostScreen";
import VideoConcatScreen from "../screen/VideoConcatScreen";
import LoginScreen from "../screen/LoginScreen";
import ProfileScreen from "../screen/ProfileScreen";
import EditGifScreen from "../screen/EditGifScreen";

const Stack = createNativeStackNavigator();

function MainNavigation() {
  const { idToken } = UserAuth();

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={TabNavigation} />
        {idToken ? (
          <>
            <Stack.Screen name="Camera" component={CameraScreen} />
            <Stack.Screen name="VideoResult" component={VideoResultScreen} />
            <Stack.Screen name="VideoPost" component={VideoPostScreen} />
            <Stack.Screen name="VideoConcat" component={VideoConcatScreen} />
            <Stack.Screen name="Gif" component={EditGifScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </>
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigation;
