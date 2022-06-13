import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import ModalError from "../components/ModalError";
import ModalSuccess from "../components/ModalSuccess";
import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import * as VideoThumbnails from "expo-video-thumbnails";

function VideoConcatScreen({ route, navigation }) {
  const [success, setSuccess] = useState(false);
  const { videoUrl, liveVideo, galleryVideo } = route.params;
  const uri = liveVideo?.uri || galleryVideo?.uri;

  const [image, setImage] = useState(null);

  useEffect(() => {
    generateThumbnail();
  }, []);

  const generateThumbnail = async () => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(videoUrl, {
        time: 100,
      });
      setImage(uri);
    } catch (e) {
      console.warn(e);
    }
  };

  useEffect(() => {
    if (success) {
      navigation.navigate("Home", { msg: true });
    }
  }, [success]);

  const concatVideo = async () => {
    const formdata = new FormData();

    const videoFile = {
      uri,
      type: "multipart/form-data",
      name: `${Date.now()}.mp4`,
    };

    formdata.append("originVideoUrl", videoUrl);
    formdata.append("video", videoFile);

    try {
      const response = await fetch(`${process.env.API_SERVER_URL}/api/videos`, {
        method: "PATCH",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formdata,
      });
      const data = await response.json();

      if (data.result === "ok") {
        setSuccess(true);
        return <ModalSuccess />;
      }
    } catch (err) {
      return <ModalError />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <AntDesign name="left" size={27} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.mediaPreview} />
        <Fontisto style={styles.plus} name="plus-a" size={24} color="black" />
        <Image source={{ uri }} style={styles.mediaPreview} />
      </View>
      <View style={styles.bottonsContainer}>
        <TouchableOpacity onPress={concatVideo} style={styles.concatButton}>
          <Text style={styles.concatText}>합치기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    paddingTop: 50,
    height: "10%",
  },
  backButton: {
    flex: 1,
    marginLeft: 10,
  },
  imageContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: "50%",
  },
  mediaPreview: {
    aspectRatio: 9 / 16,
    backgroundColor: "black",
    borderRadius: 15,
    width: "40%",
  },
  plus: {
    margin: 15,
  },
  bottonsContainer: {
    alignItems: "center",
    left: 0,
    right: 0,
    bottom: 0,
    position: "absolute",
  },
  concatButton: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    justifyContent: "center",
    borderRadius: 4,
    marginBottom: 30,
    backgroundColor: "#2196F3",
  },
  concatText: {
    color: "white",
    fontSize: 15,
  },
});

export default VideoConcatScreen;
