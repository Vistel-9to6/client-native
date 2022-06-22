import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

import { UserAuth } from "../context/AuthContext";
import { ModalHandler } from "../context/modalContext";
import { postVideo } from "../api/index";

import ModalContainer from "../components/shared/modal";
import Loading from "../components/shared/loading";
import { INPUT_TITLE } from "../../constants/text";
import { fetchResult, errorMessage } from "../../constants";

function VideoPostScreen({ route, navigation }) {
  const [post, setPost] = useState({
    title: "",
    maxCreators: 2,
  });
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
      name: `${Date.now()}_${post.title}.mp4`,
    };

    const thumbnailFile = {
      uri: thumbnail,
      type: "multipart/form-data",
      name: `${Date.now()}_${post.title}_thumbnail.jpg`,
    };

    if (!post.title) {
      setOpenModal(true);
      return;
    }

    formdata.append("video", videoFile);
    formdata.append("thumbnail", thumbnailFile);
    formdata.append("title", post.title);
    formdata.append("maxCreators", post.maxCreators);

    try {
      const data = await postVideo(formdata, idToken);

      if (data.result === fetchResult.SUCCESS) {
        setIsLoading(false);
        navigation.navigate("Home");
      }
    } catch {
      setIsLoading(false);
      setOpenModal(true);
    }
  };

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
          placeholder={INPUT_TITLE}
          onChangeText={(value) => setPost({ ...post, title: value })}
        />
        <View style={styles.participantsContainer}>
          <Text style={styles.person}>참여인원</Text>
          <View style={styles.participants}>
            <Picker
              selectedValue={post.maxCreators}
              onValueChange={(value) =>
                setPost({ ...post, maxCreators: value })
              }
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
            <Loading color="#2196F3" />
          ) : (
            <AntDesign name="check" style={styles.uploadIcon} />
          )}
        </TouchableOpacity>
      </View>
      {openModal && (
        <ModalContainer
          isRequiredToGoBack={true}
          navigation={navigation}
          modalHeader={errorMessage.ERROR}
          modalBody={errorMessage.ERROR_POST_FAILURE}
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
