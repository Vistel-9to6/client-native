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

import { API_SERVER_URL } from "@env";

function VideoPostScreen({ route, navigation }) {
  const [title, setTitle] = useState("");
  const [maxCreators, setMaxCreators] = useState(2);
  const [success, setSuccess] = useState(false);
  const { uri } = route.params;

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
      name: `${title}.mp4`,
    };

    formdata.append("video", videoFile);
    formdata.append("title", title);
    formdata.append("maxCreators", maxCreators);

    try {
      const response = await fetch(`${API_SERVER_URL}/api/videos`, {
        method: "POST",
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
      <View style={styles.bottonsContainer}>
        <TouchableOpacity onPress={uploadVideo} style={styles.uploadButton}>
          <Text style={styles.uploadText}>업로드</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "white",
  },
  header: {
    height: "7%",
  },
  backButton: {
    flex: 1,
    marginLeft: 10,
  },
  imageContainer: {
    alignItems: "center",
    borderRadius: 10,
  },
  mediaPreview: {
    aspectRatio: 9 / 16,
    backgroundColor: "black",
    borderRadius: 15,
    width: "40%",
  },
  inputText: {
    flex: 1,
    paddingVertical: 10,
    marginRight: 20,
  },
  infoContainer: {
    margin: 20,
    flex: 1,
    flexDirection: "column",
    marginRight: 20,
  },
  title: {
    height: 50,
    marginBottom: 10,
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
  bottonsContainer: {
    alignItems: "center",
    left: 0,
    right: 0,
    bottom: 0,
    position: "absolute",
  },
  uploadButton: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    justifyContent: "center",
    borderRadius: 4,
    marginBottom: 30,
    backgroundColor: "#2196F3",
  },
  uploadText: {
    color: "white",
    fontSize: 15,
  },
});

export default VideoPostScreen;
