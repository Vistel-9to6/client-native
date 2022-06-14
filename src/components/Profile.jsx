import { View, Image, StyleSheet } from "react-native";
import { UserAuth } from "../context/AuthContext";

function Profile() {
  const { user } = UserAuth();

  return (
    <View style={styles.container}>
      <Image
        style={styles.profile}
        source={{
          uri: user?.profilePhoto,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    alignItems: "center",
    backgroundColor: "white",
  },
  profile: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default Profile;
