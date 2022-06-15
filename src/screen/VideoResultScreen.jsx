import React, { useRef, useState } from "react";
import { Video } from "expo-av";
import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";
import { UserAuth } from "../context/AuthContext";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

function VideoResultScreen({ route, navigation }) {
  const videoRef = useRef(null);
  const [like, setLike] = useState(false);
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

  const createGif = async () => {
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
    <View style={styles.container}>
      <StatusBar style="light" />
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
      <View style={styles.headerContainer}>
        <View style={styles.iconBox}>
          {originVideo ? (
            <>
              <TouchableOpacity
                onPress={createGif}
                style={styles.downloadGifIcon}
              >
                <AntDesign name="download" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.downloadGifIcon}
                onPress={() => setLike(!like)}
              >
                {like ? (
                  <Entypo name="heart" size={24} color="white" />
                ) : (
                  <Entypo name="heart-outlined" size={24} color="white" />
                )}
              </TouchableOpacity>

              <Text style={styles.gitText}>GIF</Text>
            </>
          ) : (
            <View style={styles.buttonBox}>
              <Text style={styles.start}>Vistel 시작하기</Text>
            </View>
          )}
        </View>
        <View style={styles.buttonBox}>
          <TouchableOpacity
            onPress={originVideo ? participateVideo : saveVideo}
            style={styles.button}
          >
            <Text style={styles.next}>
              {originVideo ? "VISTEL 참여하기" : "다음"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
  },
  video: {
    alignSelf: "center",
    width: "100%",
    height: "100%",
  },
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    top: 0,
    marginTop: 50,
    paddingHorizontal: 10,
    position: "absolute",
  },
  iconBox: {
    flexDirection: "row",
  },
  downloadGifIcon: {
    paddingHorizontal: 15,
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: "#FFF",
  },
  gitText: {
    top: 25,
    left: 18,
    color: "white",
    fontSize: 10,
    position: "absolute",
  },
  start: {
    color: "black",
    fontSize: 15,
  },
  next: {
    color: "black",
    fontSize: 15,
  },
});

export default VideoResultScreen;
