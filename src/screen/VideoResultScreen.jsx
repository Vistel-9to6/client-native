import React, { useState, useRef } from "react";
import { Video } from "expo-av";
import { StyleSheet, View, Button } from "react-native";

function VideoResultScreen({ route, navigation }) {
  const [videoStatus, setVideoStatus] = useState({});
  const videoRef = useRef(null);
  const { originVideo, liveVideo, galleryVideo } = route.params;
  const uri = originVideo?.videoUrl || liveVideo?.uri || galleryVideo?.uri;

  const saveVideo = async () => {
    try {
      videoRef.current.pauseAsync();

      navigation.navigate("VideoPost", { uri });
    } catch (err) {
      console.log(err);
    }
  };

  const participateVideo = async () => {
    try {
      videoRef.current.pauseAsync();

      navigation.navigate("Camera", { uri });
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
        isLooping
        useNativeControls
        resizeMode="contain"
        shouldPlay
        onPlaybackStatusUpdate={(status) => setVideoStatus(status)}
      />
      <Button
        title={originVideo ? "참여" : "저장"}
        onPress={originVideo ? participateVideo : saveVideo}
      />
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
