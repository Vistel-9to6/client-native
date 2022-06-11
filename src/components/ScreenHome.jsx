import { StyleSheet, Text, View, Button } from "react-native";
import { UserAuth } from "../context/AuthContext";

function ScreenHome({ navigation }) {
  const { user } = UserAuth();

  return <View></View>;
}

export default ScreenHome;
