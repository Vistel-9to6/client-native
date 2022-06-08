import React, { useState, useRef } from "react";
import { Video } from "expo-av";
import { StyleSheet, View, Button } from "react-native";

export default function ScreenResult({ route, navigation }) {
  const [videoStatus, setVideoStatus] = useState({});
  const videoRef = useRef(null);
  const { data } = route.params;

  const sendVideo = async () => {
    try {
      const respond = await fetch("http://192.168.0.10:3000/api/videos", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      navigation.popToTop();
    } catch (err) {
      console.dir(err);
    }
  };

  return (
    <View>
      <Video
        ref={videoRef}
        style={styles.video}
        source={{
          uri: data.uri,
        }}
        useNativeControls
        resizeMode="contain"
        isLooping
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
      <Button title="send" onPress={sendVideo} />
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
