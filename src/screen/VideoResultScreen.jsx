import React, { useRef, useState } from "react";
import { Video } from "expo-av";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { UserAuth } from "../context/AuthContext";
import { generateThumbnail } from "../api/thumbnail";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

function VideoResultScreen({ route, navigation }) {
  const videoRef = useRef(null);
  const [like, setLike] = useState(false);
  const { idToken, user } = UserAuth();
  const { originVideo, liveVideo, galleryVideo } = route.params;
  const uri = originVideo?.videoUrl || liveVideo?.uri || galleryVideo?.uri;

  const postVideo = async () => {
    if (idToken) {
      try {
        videoRef.current.pauseAsync();

        const thumbnail = await generateThumbnail(uri);

        navigation.navigate("VideoPost", { uri, thumbnail });
      } catch (error) {
        console.log(error);
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
    if (idToken) {
      try {
        videoRef.current.pauseAsync();

        navigation.navigate("Camera", { originVideo });
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
            onPress={originVideo ? participateVideo : postVideo}
            style={styles.button}
          >
            <Text style={styles.next}>
              {originVideo ? "스토리 더하기" : "다음"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.videoInfo}>
        <Text style={{ color: "white", fontSize: 25 }}>
          {originVideo.title}
        </Text>
        <Image
          style={styles.profile}
          source={{
            uri: user?.profilePhoto,
          }}
        />
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
