import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import "react-native-gesture-handler";

import { AuthContextProvider } from "../context/AuthContext";

import ScreenLogin from "../components/ScreenLogin";
import ScreenHome from "../components/ScreenHome";

const Stack = createNativeStackNavigator();

function NavigationApp() {
  return (
    <AuthContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={ScreenLogin} />
          <Stack.Screen name="Home" component={ScreenHome} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContextProvider>
  );
}

export default NavigationApp;
