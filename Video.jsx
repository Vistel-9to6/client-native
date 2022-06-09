import { useRef, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Video } from "expo-av";

function VideoListItem({ item }) {
  const videoRef = useRef(null);

  return (
    <TouchableOpacity style={styles.container}>
      <Video
        ref={videoRef}
        style={styles.video}
        source={{ uri: item }}
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
    margin: 3,
    height: 200,
  },
  video: {
    alignSelf: "center",
    width: "100%",
    height: "100%",
  },
});

export default VideoListItem;
