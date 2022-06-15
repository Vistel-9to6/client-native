import { useRef } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Video } from "expo-av";

function FeedItem({ item, navigation }) {
  const videoRef = useRef(null);
  const handleVideoResultPageMove = () => {
    navigation.navigate("VideoResult", { originVideo: item });
  };

  return (
    <TouchableOpacity
      onPress={handleVideoResultPageMove}
      style={styles.container}
    >
      <Video
        ref={videoRef}
        style={styles.video}
        source={{ uri: item?.videoUrl }}
        rate={1.0}
        volume={1.0}
        isMuted={true}
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
