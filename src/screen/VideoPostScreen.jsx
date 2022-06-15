import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import ModalError from "../components/ModalError";
import ModalSuccess from "../components/ModalSuccess";
import { Picker } from "@react-native-picker/picker";
import { AntDesign } from "@expo/vector-icons";
import { UserAuth } from "../context/AuthContext";
import { StatusBar } from "expo-status-bar";

function VideoPostScreen({ route, navigation }) {
  const [title, setTitle] = useState("");
  const [maxCreators, setMaxCreators] = useState(2);
  const [success, setSuccess] = useState(false);
  const { uri, thumbnail } = route.params;
  const { idToken } = UserAuth();

  useEffect(() => {
    if (success) {
      navigation.navigate("Home");
    }
  }, [success]);

  const uploadVideo = async () => {
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
      const response = await fetch(`${process.env.API_SERVER_URL}/api/videos`, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${idToken}`,
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
          <AntDesign name="check" style={styles.uploadIcon} />
        </TouchableOpacity>
      </View>
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
