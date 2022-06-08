import React, { useState, useRef, useEffect } from "react";
import { Video } from "expo-av";
import { StyleSheet, View, Button } from "react-native";
import axios from "axios";

export default function ScreenResult({ route, navigation }) {
  const [status, setStatus] = useState({});
  const videoRef = useRef(null);

  const { data } = route.params;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch("http://192.168.0.45:3000/api/videos");
    console.log(JSON.stringify(res));
  };

  const sendVideo = async () => {
    const videoData = JSON.stringify({
      type: "VIDEO",
      data,
    });

    console.log("시작");

    try {
      const res = await fetch("http://192.168.0.45:3000/api/videos", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      console.log(JSON.stringify(res));
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
        onPlaybackStatusUpdate={(status) => setStatus(status)}
      />

      <Button
        title={status.isPlaying ? "Pause" : "Play"}
        onPress={() =>
          status.isPlaying
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
