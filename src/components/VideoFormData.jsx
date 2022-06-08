import React, { useState, useRef } from "react";
import { Text, StyleSheet, View, Form, Button } from "react-native";
Form;
// import { withNavigation } from "react-navigation";

function VideoFormData({ route, navigation }) {
  const formdata = new FormData();
  const { video } = route.params;

  // formdata.append("product[name]", "test");
  // formdata.append("product[price]", 10);
  // formdata.append("product[category_ids][]", 2);
  // formdata.append("product[description]", "12dsadadsa");
  formdata.append("video", {
    uri: video.uri,
  });
  console.log(formdata);

  const serializeJSON = function (data) {
    return Object.keys(data)
      .map((keyName) => {
        return (
          encodeURIComponent(keyName) + "=" + encodeURIComponent(data[keyName])
        );
      })
      .join("&");
  };

  const sendVideo = async () => {
    try {
      const respond = await fetch("http://192.168.0.10:3000/api/videos", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formdata,
      });

      console.log(respond);
      // navigation.popToTop();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View>
      <Text>Form Data</Text>
      <Button title="send" onPress={sendVideo} />
    </View>
    // <Form encType="multipart/form-data" onFinish={onSubmit}>
    //   <input
    //     type="file"
    //     name="image"
    //     multiple
    //     hidden
    //     ref={imageInput}
    //     onChange={onChangeImage}
    //   />
    //   <Button onClick={onClickImageUpload}>이미지 업로드</Button>
    // </Form>
  );
}

export default VideoFormData;
