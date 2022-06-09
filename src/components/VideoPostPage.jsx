import React from "react";
import { Text, View, Button } from "react-native";
import ModalError from "./ModalError";

function VideoPostPage({ route }) {
  const { videoData } = route.params;

  const sendVideo = async () => {
    const formdata = new FormData();

    const videoOptions = {
      uri: videoData.uri,
      type: "multipart/form-data",
      name: "vaco.mp4",
    };

    formdata.append("video", videoOptions);

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formdata,
    };

    try {
      const response = await fetch(
        "http://192.168.0.42:3000/api/videos",
        config,
      );

      console.log(await response.json());
    } catch (err) {
      return <ModalError />;
    }
  };

  return (
    <View>
      <Text>Form Data</Text>
      <Button title="send" onPress={sendVideo} />
    </View>
  );
}

export default VideoPostPage;
