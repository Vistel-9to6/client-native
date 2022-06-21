import React from "react";
import { ActivityIndicator } from "react-native";

function Loading({ color }) {
  return <ActivityIndicator size="large" color={color} />;
}

export default Loading;
