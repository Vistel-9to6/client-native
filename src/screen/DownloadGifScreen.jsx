import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import * as Linking from "expo-linking";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import { UserAuth } from "../context/AuthContext";

import { Box, Slider } from "native-base";
import { AntDesign } from "@expo/vector-icons";

function Download({ navigation, route }) {
  const { uri } = route.params;
  const { idToken } = UserAuth();
  const [onChangeValue, setOnChangeValue] = useState(2);
  const [gifUrl, setGifUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasLibraryPermissions, setHasLibraryPermissions] = useState(null);

  const linkToSaveUrl = () => {
    Linking.openURL(gifUrl);
  };

  const showToastMessage = () => {
    ToastAndroid.showWithGravity(
      "저장 완료",
      ToastAndroid.CENTER,
      ToastAndroid.SHORT,
    );
  };

  const convertVideoToGif = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.API_SERVER_URL}/api/videos/gif`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({
            videoUrl: uri,
            fps: onChangeValue * 10,
          }),
        },
      );

      const data = await response.json();

      if (data.result === "ng") {
        console.log("실패");
        return;
      }

      setGifUrl(data.file);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const saveGif = async () => {
    try {
      const filename = `${Date.now() + ".gif"}`;
      const fileUri = `${FileSystem.documentDirectory}${filename}`;
      const downloadedFile = await FileSystem.downloadAsync(gifUrl, fileUri);
      const permission = await MediaLibrary.requestPermissionsAsync();

      if (permission.status === "granted") {
        setHasLibraryPermissions(permission.status === "granted");
      }

      if (permission.status !== "granted") {
        console.log("permission should be needed");
        navigation.navigate("Home");
      }

      const asset = await MediaLibrary.createAssetAsync(downloadedFile.uri);
      const album = await MediaLibrary.getAlbumAsync("Download");

      if (album === null) {
        await MediaLibrary.createAlbumAsync("Download", asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      }

      showToastMessage();
    } catch (error) {
      console.log(error);
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
      <View style={styles.contentsContainer}>
        <Image
          resizeMode="cover"
          source={{
            uri: gifUrl
              ? gifUrl
              : "https://cdn.vox-cdn.com/thumbor/IF0m88w-ozKL_EhRqKJ0vy_3MtA=/800x0/filters:no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/654972/ash_and_pikachu.0.gif",
          }}
          style={styles.mediaPreview}
        />
        <View styles={styles.textContainer}>
          <Text style={styles.textTitle}>
            FPS(Frames Per Second): 초당 프레임 수
          </Text>
          <Text style={styles.textDetails}>10fps: 오래된 느낌의 효과</Text>
          <Text style={styles.textDetails}>20fps: 영화 같은 시네마틱 효과</Text>
          <Text style={styles.textDetails}>30fps: sns 게시 등 기본 고화질</Text>
        </View>
        <View styles={styles.blankContainer}></View>
        <Box styles={styles.boxContainer} alignItems="center" w="100%">
          <Text style={styles.speedText}>{`${onChangeValue}x`}</Text>
          <Slider
            w="3/5"
            maxW="300"
            size="lg"
            defaultValue={2}
            minValue={1}
            maxValue={3}
            onChange={(value) => setOnChangeValue(value)}
            step={1}
          >
            <Slider.Track>
              <Slider.FilledTrack />
            </Slider.Track>
            <Slider.Thumb />
          </Slider>
        </Box>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={gifUrl ? saveGif : convertVideoToGif}>
          <View
            style={{
              ...styles.button,
              backgroundColor: isLoading ? "#99CCFF" : "#2196F3",
            }}
          >
            {isLoading && <ActivityIndicator size="large" color="yellow" />}
            <Text style={styles.buttonText}>
              {gifUrl ? "저장하기" : "변환하기"}
            </Text>
          </View>
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
    width: "100%",
    height: "7%",
  },
  backButton: {
    marginLeft: 10,
  },
  contentsContainer: {
    flex: 1,
    alignItems: "center",
  },
  mediaPreview: {
    aspectRatio: 9 / 16,
    backgroundColor: "black",
    borderRadius: 15,
    height: "60%",
    marginBottom: 20,
  },
  textContainer: {
    justifyContent: "flex-start",
    marginBottom: 20,
  },
  textTitle: {
    fontSize: 18,
  },
  textDetails: {
    fontSize: 15,
    marginVertical: 5,
  },
  speedText: {
    fontSize: 20,
    marginVertical: 10,
  },
  footer: {
    height: 70,
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "stretch",
  },
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#2196F3",
    paddingVertical: 20,
    borderWidth: 0.5,
    borderColor: "white",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default Download;
