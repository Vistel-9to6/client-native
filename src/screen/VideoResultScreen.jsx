import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { Video } from "expo-av";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

import { UserAuth } from "../context/AuthContext";
import { generateThumbnail } from "../api/thumbnail";

function VideoResultScreen({ route, navigation }) {
  const videoRef = useRef(null);
  const [like, setLike] = useState(false);
  const { idToken } = UserAuth();
  const { originVideo, liveVideo, galleryVideo } = route.params;
  const uri = originVideo?.videoUrl || liveVideo?.uri || galleryVideo?.uri;
  const isFocused = useIsFocused();

  const postVideo = async () => {
    videoRef.current.pauseAsync();

    if (idToken) {
      try {
        const thumbnail = await generateThumbnail(uri);

        navigation.navigate("VideoPost", { uri, thumbnail });
      } catch (error) {
        navigation.goBack();
      }
    } else {
      navigation.navigate("Login");
    }
  };

  const createGif = () => {
    videoRef.current.pauseAsync();

    if (idToken) {
      navigation.navigate("Gif", { uri });
    } else {
      navigation.navigate("Login");
    }
  };

  const participateVideo = async () => {
    videoRef.current.pauseAsync();

    if (idToken) {
      navigation.navigate("Camera", { originVideo });
    } else {
      navigation.navigate("Login");
    }
  };

  useEffect(() => {
    if (isFocused) {
      videoRef.current.playAsync();
    }
  }, [isFocused]);

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
                <AntDesign name="download" size={32} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.downloadGifIcon}
                onPress={() => setLike(!like)}
              >
                {like ? (
                  <Entypo name="heart" size={32} color="white" />
                ) : (
                  <Entypo name="heart-outlined" size={32} color="white" />
                )}
              </TouchableOpacity>

              <Text style={styles.gifText}>GIF</Text>
            </>
          ) : (
            <></>
          )}
        </View>
        <View style={styles.buttonBox}>
          <TouchableOpacity
            onPress={originVideo ? participateVideo : postVideo}
            style={styles.button}
          >
            <Text style={styles.next}>
              {originVideo ? "스토리 더하기" : "다음"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {originVideo && (
        <View style={styles.videoInfo}>
          <Text style={{ color: "white", fontSize: 25 }}>
            {originVideo.title}
          </Text>
          <Image
            style={styles.profile}
            source={{
              uri: originVideo?.creators[0]?.profilePhoto,
            }}
          />
        </View>
      )}
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
  gifText: {
    top: 33,
    left: 22,
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
  videoInfo: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    bottom: 55,
    paddingHorizontal: 15,
  },
  profile: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
  },
});

export default VideoResultScreen;
