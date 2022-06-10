import React, { useState } from "react";
import { Text, TextInput, View, Button, StyleSheet } from "react-native";
import ModalError from "../components/ModalError";
import ModalSuccess from "../components/ModalSuccess";
import {Picker} from '@react-native-picker/picker';

function VideoPostScreen({ route }) {
  const [title, setTitle] = useState("");
  const [maxCreators, setMaxCreators] = useState();
  const { videoData } = route.params;

  const sendVideo = async () => {
    const formdata = new FormData();

    const videoFile = {
      uri: videoData.uri,
      type: "multipart/form-data",
      name: `${title}.mp4`,
    };

    formdata.append("video", videoFile);
    formdata.append("title", title);
    formdata.append("maxCreators", maxCreators);

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formdata,
    };

    try {
      const response = await fetch(
        "http://192.168.0.23:3000/api/videos",
        config,
      );

      const message = await response.json().result;

      if (message === "ok") {
        <ModalSuccess />
      }
    } catch (err) {
      return <ModalError />;
    }
  };

  return (
    <View style={styles.container}>
      <Text>Form Data</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="제목"
          onChangeText={(value) => setTitle(value)}
        />
      <View>
        <Text>참여인원</Text>
        <Picker
          selectedValue={maxCreators}
          onValueChange={(value) =>
            setMaxCreators(value)
          }>
          <Picker.Item label="2명" value="2" />
          <Picker.Item label="3명" value="3" />
          <Picker.Item label="4명" value="4" />
          <Picker.Item label="5명" value="5" />
        </Picker>
      </View>
      </View>
      <Button title="업로드" onPress={sendVideo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#eaeaea",
    alignItems: "center",
  },
  inputContainer: {
    flex: 1,
    flexDirection: "column",
    borderWidth: 1,
    width: "100%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#777",
    width: "100%",
    padding: 3,
  },
});

export default VideoPostScreen;
