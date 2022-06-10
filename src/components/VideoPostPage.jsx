import React, { useState } from "react";
import { Text, TextInput, View, Button, StyleSheet } from "react-native";
import ModalError from "./ModalError";
import ModalSuccess from "./ModalSuccess";
import {Picker} from '@react-native-picker/picker';

function VideoPostPage({ route }) {
  const [title, setTitle] = useState("");
  const [participants, setParticipants] = useState();
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
    formdata.append("participants", participants);

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
          selectedValue={participants}
          onValueChange={(value) =>
            setParticipants(value)
          }>
          <Picker.Item label="2명" value="2명" />
          <Picker.Item label="3명" value="3명" />
          <Picker.Item label="4명" value="4명" />
          <Picker.Item label="5명" value="5명" />
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

export default VideoPostPage;
