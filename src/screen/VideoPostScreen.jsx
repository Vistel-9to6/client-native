import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { UserAuth } from "../context/AuthContext";
import { ModalHandler } from "../context/modalContext";
import { postVideo } from "../api/index";

import ModalContainer from "../components/shared/modal";

function VideoPostScreen({ route, navigation }) {
  const [title, setTitle] = useState("");
  const [maxCreators, setMaxCreators] = useState(2);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { uri, thumbnail } = route.params;
  const { idToken } = UserAuth();
  const { openModal, setOpenModal } = ModalHandler();

  const uploadVideo = async () => {
    setIsLoading(true);

    const formdata = new FormData();

    const videoFile = {
      uri,
      type: "multipart/form-data",
      name: `${Date.now()}_${title}.mp4`,
    };

    const thumbnailFile = {
      uri: thumbnail,
      type: "multipart/form-data",
      name: `${Date.now()}_${title}_thumbnail.jpg`,
    };

    formdata.append("video", videoFile);
    formdata.append("thumbnail", thumbnailFile);
    formdata.append("title", title);
    formdata.append("maxCreators", maxCreators);

    try {
      const data = await postVideo(formdata, idToken);

      if (data.result === "ok") {
        setSuccess(true);
      }
    } catch {
      setOpenModal(true);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (success) {
      navigation.navigate("Home");
    }
  }, [success]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <AntDesign name="left" size={27} color="black" />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Vistel 새 게시물</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image source={{ uri }} style={styles.mediaPreview} />
      </View>

      <View style={styles.infoContainer}>
        <TextInput
          style={styles.title}
          multiline
          maxLength={100}
          placeholder="제목을 입력하세요..."
          onChangeText={(value) => setTitle(value)}
        />
        <View style={styles.participantsContainer}>
          <Text style={styles.person}>참여인원</Text>
          <View style={styles.participants}>
            <Picker
              selectedValue={maxCreators}
              onValueChange={(value) => setMaxCreators(value)}
            >
              <Picker.Item label="2명" value="2" />
              <Picker.Item label="3명" value="3" />
              <Picker.Item label="4명" value="4" />
              <Picker.Item label="5명" value="5" />
            </Picker>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={uploadVideo}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#2196F3" />
          ) : (
            <AntDesign name="check" style={styles.uploadIcon} />
          )}
        </TouchableOpacity>
      </View>
      {openModal && (
        <ModalContainer
          isRequiredToGoBack={true}
          navigation={navigation}
          modalHeader="Error"
          modalBody="동영상 생성 실패! 다시 시도해 주세요."
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "white",
  },
  header: {
    height: "9%",
    flexDirection: "row",
  },
  backButton: {
    flex: 1,
    marginLeft: 10,
  },
  pageTitle: {
    flex: 5,
    fontSize: 20,
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 20,
    borderRadius: 10,
  },
  mediaPreview: {
    aspectRatio: 9 / 16,
    backgroundColor: "black",
    borderRadius: 15,
    width: "40%",
  },
  title: {
    height: 50,
    marginBottom: 10,
  },
  infoContainer: {
    margin: 20,
    flex: 1,
    flexDirection: "column",
    marginRight: 20,
  },
  participantsContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
  },
  person: {
    width: "70%",
  },
  participants: {
    width: "30%",
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "lightgray",
  },
  buttonContainer: {
    alignItems: "center",
    right: 5,
    top: 40,
    position: "absolute",
  },
  uploadIcon: {
    fontSize: 38,
    color: "#2196F3",
  },
});

export default VideoPostScreen;
