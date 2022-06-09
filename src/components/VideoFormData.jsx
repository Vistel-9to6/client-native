import React, { useState, useRef } from "react";
import { Text, StyleSheet, View, Form, Button } from "react-native";
import ModalError from "./ModalError";

function VideoFormData({ route }) {
  const { videoData } = route.params;

  const sendVideo = async () => {
    const formdata = new FormData();

    const videoOptions = {
      uri: videoData.uri,
      type: "video/mp4",
      name: "vaco.mp4",
    };

    formdata.append("video", videoOptions);

    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formdata,
    };

    try {
      const response = await fetch(
        "http://192.168.0.42:3000/api/videos",
        fetchOptions,
      );

      console.log(response);
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

export default VideoFormData;
