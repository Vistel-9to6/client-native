import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Camera } from "expo-camera";

function ScreenCamera({ navigation }) {
  const [hasAudioPermission, setHasAudioPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const cameraPermissionStatus =
        await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermissionStatus.status === "granted");

      const audioPermissionStatus =
        await Camera.requestMicrophonePermissionsAsync();
      setHasAudioPermission(audioPermissionStatus.status === "granted");
    })();
  }, []);

  const takeVideo = async () => {
    const videoData = await cameraRef.current.recordAsync({
      maxDuration: 3,
      quality: "1080p",
    });

    navigation.navigate("VideoResult", { videoData });
  };

  if (hasCameraPermission === null || hasAudioPermission === null) {
    console.log("permission null");
    return <View />;
  }
  if (hasCameraPermission === false || hasAudioPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={styles.cameraContainer}>
          <Camera ref={cameraRef} style={styles.fixedRatio} type={type} />
        </View>
        <View style={styles.buttons}>
          <Button
            title="화면전환"
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back,
              );
            }}
          />
          <Button title="녹화" onPress={takeVideo} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    flexDirection: "row",
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ScreenCamera;
