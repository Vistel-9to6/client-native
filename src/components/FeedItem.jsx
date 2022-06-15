import { StyleSheet, TouchableOpacity, Image } from "react-native";

function FeedItem({ item, navigation }) {
  const handleVideoResultPageMove = () => {
    navigation.navigate("VideoResult", { originVideo: item });
  };

  return (
    <TouchableOpacity
      onPress={handleVideoResultPageMove}
      style={styles.container}
    >
      <Image
        style={styles.video}
        source={{ uri: item?.thumbnailUrl }}
        resizeMode="stretch"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1 / 3,
    margin: 1,
    height: 200,
  },
  video: {
    flex: 1,
    alignSelf: "center",
    width: "100%",
    height: "100%",
  },
});

export default FeedItem;
