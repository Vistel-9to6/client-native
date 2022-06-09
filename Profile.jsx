import { View, Text, Image, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

function Profile() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.profile}
        source={{
          uri: "https://lh3.googleusercontent.com/a/AATXAJyIXPNhhc8SQyqhJXOkX6aILeeQKADYahwgo3YH=s432-p-rw-no-mo",
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    alignItems: "center",
    flex: 1,
    backgroundColor: "white",
  },
  profile: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
});

export default Profile;
