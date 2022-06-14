import React, { useRef } from "react";
import { Video } from "expo-av";
import { StyleSheet, View, Button } from "react-native";
import { UserAuth } from "../context/AuthContext";

function VideoResultScreen({ route, navigation }) {
  const videoRef = useRef(null);
  const { idToken } = UserAuth();
  const { originVideo, liveVideo, galleryVideo } = route.params;
  const uri = originVideo?.videoUrl || liveVideo?.uri || galleryVideo?.uri;

  const saveVideo = async () => {
    try {
      videoRef.current.pauseAsync();

      navigation.navigate("VideoPost", { uri });
    } catch (error) {
      console.log(error);
    }
  };

  const creatGif = async () => {
    videoRef.current.pauseAsync();

    if (idToken) {
      navigation.navigate("Gif", { uri });
    } else {
      navigation.navigate("Login");
    }
  };

  const participateVideo = async () => {
    if (idToken) {
      try {
        videoRef.current.pauseAsync();

        navigation.navigate("Camera", { uri });
      } catch (error) {
        console.log(error);
      }
    } else {
      navigation.navigate("Login");
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
      />
      {originVideo && <Button title="gif 만들기" onPress={creatGif} />}
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
