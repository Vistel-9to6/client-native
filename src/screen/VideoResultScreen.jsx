import React, { useState, useRef } from "react";
import { Video } from "expo-av";
import { StyleSheet, View, Button } from "react-native";

function VideoResultScreen({ route, navigation }) {
  const [videoStatus, setVideoStatus] = useState({});
  const videoRef = useRef(null);
  const { liveVideo, galleryVideo, item } = route.params;
  const uri = liveVideo?.uri || galleryVideo?.uri || item?.videoUrl;

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
        title={item ? "참여" : "저장"}
        onPress={item ? participateVideo : saveVideo}
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
