import React, { useState, useRef } from "react";
import { Video } from "expo-av";
import { StyleSheet, View, Button } from "react-native";

function ScreenVideoResult({ route, navigation }) {
  const [videoStatus, setVideoStatus] = useState({});
  const videoRef = useRef(null);
  const { videoData } = route.params;

  const saveVideo = () => {
    try {
      navigation.navigate("VideoPost", { videoData });
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
          uri: videoData.uri,
        }}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={(status) => console.log(status)}
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
    width: 350,
    height: 220,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ScreenVideoResult;
