import React, { useState, useRef } from "react";
import { Video } from "expo-av";
import { StyleSheet, View, Button } from "react-native";

function VideoResultScreen({ route, navigation }) {
  const [videoStatus, setVideoStatus] = useState({});
  const videoRef = useRef(null);
  const { liveVideo, galleryVideo } = route.params;
  const uri = liveVideo ? liveVideo?.uri : galleryVideo?.uri;

  const saveVideo = async () => {
    try {
      navigation.navigate("VideoPost", { uri });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View>
      <Video
        ref={videoRef}
        style={styles.video}
        source={{
          uri,
        }}
        useNativeControls
        resizeMode="contain"
        onPlaybackStatusUpdate={(status) => setVideoStatus(status)}
      />

      <Button
        title={videoStatus.isPlaying ? "Pause" : "Play"}
        onPress={() =>
          videoStatus.isPlaying
            ? videoRef.current.pauseAsync()
            : videoRef.current.playAsync()
        }
      />
      <Button title="저장" onPress={saveVideo} />
    </View>
  );
}

const styles = StyleSheet.create({
  video: {
    alignSelf: "center",
    width: "100%",
    height: "90%",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default VideoResultScreen;
