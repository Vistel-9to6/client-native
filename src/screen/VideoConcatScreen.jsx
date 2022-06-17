import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { UserAuth } from "../context/AuthContext";
import { ModalHandler } from "../context/modalContext";

import ModalContainer from "../components/shared/modal";

function VideoConcatScreen({ route, navigation }) {
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { idToken } = UserAuth();
  const { openModal, setOpenModal } = ModalHandler();

  const { originVideo, liveVideo, galleryVideo } = route.params.data;
  const uri = liveVideo?.uri || galleryVideo?.uri;

  const concatVideo = async () => {
    setIsLoading(true);
    const formdata = new FormData();

    const videoFile = {
      uri,
      type: "multipart/form-data",
      name: `${Date.now()}.mp4`,
    };

    formdata.append("originVideoUrl", originVideo.videoUrl);
    formdata.append("video", videoFile);

    try {
      const response = await fetch(`${process.env.API_SERVER_URL}/api/videos`, {
        method: "PATCH",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${idToken}`,
        },
        body: formdata,
      });

      const data = await response.json();
      setIsLoading(false);

      if (data.result === "ok") {
        setSuccess(true);
      }
    } catch (err) {
      setOpenModal(true);
    }
  };

  useEffect(() => {
    if (success) {
      navigation.navigate("Home");
    }
  }, [success]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <AntDesign name="left" size={27} color="black" />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>스토리 더하기</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: originVideo.thumbnailUrl }}
          style={styles.mediaPreview}
        />
        <Fontisto style={styles.plus} name="plus-a" size={24} color="black" />
        <Image source={{ uri }} style={styles.mediaPreview} />
      </View>
      <View style={styles.bottonContainer}>
        <View
          style={{
            ...styles.concatButton,
            backgroundColor: isLoading ? "#99CCFF" : "#2196F3",
          }}
        >
          {isLoading ? (
            <ActivityIndicator size="large" color="black" />
          ) : (
            <TouchableOpacity onPress={concatVideo} style={styles.concatButton}>
              <Text style={styles.concatText}>합치기</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      {openModal && (
        <ModalContainer
          needToGoBack={true}
          navigation={navigation}
          modalHeader="Error"
          modalBody="동영상 합치기 실패! 다시 시도해 주세요."
        />
      )}
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
    flexDirection: "row",
  },
  backButton: {
    flex: 1,
    marginLeft: 10,
  },
  pageTitle: {
    flex: 5,
    fontSize: 20,
    top: -3,
  },
  imageContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
    height: "50%",
  },
  mediaPreview: {
    aspectRatio: 9 / 16,
    backgroundColor: "black",
    borderRadius: 15,
    width: "40%",
  },
  plus: {
    marginHorizontal: 10,
  },
  bottonContainer: {
    alignItems: "center",
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    position: "absolute",
  },
  concatButton: {
    paddingVertical: 7,
    alignItems: "center",
    width: "100%",
    backgroundColor: "#2196F3",
  },
  concatText: {
    color: "white",
    fontSize: 20,
  },
});

export default VideoConcatScreen;
