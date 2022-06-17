/* eslint-disable react/display-name */
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Video } from "expo-av";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { UserAuth } from "../context/AuthContext";

export const FeedSlideItem = forwardRef(({ item, navigation }, parentRef) => {
  const videoRef = useRef(null);
  const [like, setLike] = useState(false);
  const { idToken, user } = UserAuth();

  useImperativeHandle(parentRef, () => ({
    play,
    unload,
    stop,
  }));

  useEffect(() => {
    return () => unload();
  }, [item]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (videoRef) {
        videoRef.current.playAsync();
      }
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      if (videoRef) {
        videoRef.current.pauseAsync();
      }
    });

    return unsubscribe;
  }, [navigation]);

  const play = async () => {
    if (videoRef.current === null) {
      return;
    }

    const status = await videoRef.current.getStatusAsync();

    if (status?.isPlaying) {
      return;
    }

    try {
      await videoRef.current.playAsync();
    } catch (err) {
      console.log(err);
    }
  };

  const stop = async () => {
    if (videoRef.current === null) {
      return;
    }

    const status = await videoRef.current.getStatusAsync();

    if (!status?.isPlaying) {
      return;
    }

    try {
      await videoRef.current.stopAsync();
    } catch (err) {
      console.log(err);
    }
  };

  const unload = async () => {
    if (videoRef.current === null) {
      return;
    }

    try {
      await videoRef.current.unloadAsync();
    } catch (err) {
      console.log(err);
    }
  };

  const createGif = () => {
    videoRef.current.pauseAsync();

    if (idToken) {
      navigation.navigate("Gif", { uri: item.videoUrl });
    } else {
      navigation.navigate("Login");
    }
  };

  const participateVideo = async () => {
    videoRef.current.pauseAsync();

    if (idToken) {
      try {
        navigation.navigate("Camera", { originVideo: item });
      } catch (error) {
        console.log(error);
      }
    } else {
      navigation.navigate("Login");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" style="light" />
      <Video
        ref={videoRef}
        style={styles.video}
        resizeMode={"cover"}
        source={{ uri: item?.videoUrl }}
        shouldPlay={false}
        isLooping
        usePoster
        posterSource={{ uri: item?.thumbnails }}
      />
      <View style={styles.headerContainer}>
        <View style={styles.iconBox}>
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

            <Text style={styles.gifText}>GIF</Text>
          </>
        </View>
        <View style={styles.buttonBox}>
          <TouchableOpacity onPress={participateVideo} style={styles.button}>
            <Text style={styles.next}>{"스토리 더하기"}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.videoInfo}>
        <Text style={{ color: "white", fontSize: 25 }}>{item.title}</Text>
        <Image
          style={styles.profile}
          source={{
            uri: user?.profilePhoto,
          }}
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
  },
  video: {
    width: "100%",
    height: "100%",
    backgroundColor: "black",
  },
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    top: 10,
    paddingHorizontal: 15,
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
    top: 25,
    left: 18,
    color: "white",
    fontSize: 10,
    position: "absolute",
  },
  videoInfo: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    bottom: 10,
    paddingHorizontal: 15,
  },
  profile: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
  },
});

export default FeedSlideItem;
