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
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import { UserAuth } from "../context/AuthContext";

import { AntDesign } from "@expo/vector-icons";

const exampleGif =
  "https://cdn.vox-cdn.com/thumbor/IF0m88w-ozKL_EhRqKJ0vy_3MtA=/800x0/filters:no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/654972/ash_and_pikachu.0.gif";

function EditGifScreen({ navigation, route }) {
  const { uri } = route.params;
  const { idToken } = UserAuth();
  const [gifUrl, setGifUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasLibraryPermissions, setHasLibraryPermissions] = useState(null);
  const [filter, setfilter] = useState({
    color: "",
    grid: "",
    fps: "",
  });

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
            filter,
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

  const colorButtonPress = (title) => {
    if (title === filter.color) {
      setfilter({ ...filter, color: "" });
    } else {
      setfilter({ ...filter, color: title });
    }
  };

  const gridButtonPress = (title) => {
    if (title === filter.grid) {
      setfilter({ ...filter, grid: "" });
    } else {
      setfilter({ ...filter, grid: title });
    }
  };

  const fpsButtonPress = (title) => {
    if (title === filter.fps) {
      setfilter({ ...filter, fps: "" });
    } else {
      setfilter({ ...filter, fps: title });
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
            uri: gifUrl ? gifUrl : exampleGif,
          }}
          style={styles.mediaPreview}
        />
        <View style={styles.filtersContainer}>
          <View style={styles.filterContainer}>
            <Text style={styles.textTitle}>색상</Text>
            <TouchableOpacity
              style={{
                ...styles.buttonFilter,
                backgroundColor: filter.color === "SEPIA" ? "black" : "white",
              }}
              onPress={() => colorButtonPress("SEPIA")}
            >
              <Text style={styles.filter}>세피아</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.buttonFilter,
                backgroundColor:
                  filter.color === "GRAYSCALE" ? "black" : "white",
              }}
              onPress={() => colorButtonPress("GRAYSCALE")}
            >
              <Text style={styles.filter}>흑백</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.buttonFilter,
                backgroundColor:
                  filter.color === "REVERSAL" ? "black" : "white",
              }}
              onPress={() => colorButtonPress("REVERSAL")}
            >
              <Text style={styles.filter}>반전</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.filterContainer}>
            <Text style={styles.textTitle}>grid</Text>
            <TouchableOpacity
              style={{
                ...styles.buttonFilter,
                backgroundColor: filter.grid === "2x2" ? "black" : "white",
              }}
              onPress={() => gridButtonPress("2x2")}
            >
              <Text style={styles.filter}>2x2</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.buttonFilter,
                backgroundColor: filter.grid === "3x3" ? "black" : "white",
              }}
              onPress={() => gridButtonPress("3x3")}
            >
              <Text style={styles.filter}>3x3</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.buttonFilter,
                backgroundColor: filter.grid === "4x4" ? "black" : "white",
              }}
              onPress={() => gridButtonPress("4x4")}
            >
              <Text style={styles.filter}>4x4</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.filterContainer}>
            <Text style={styles.textTitle}>fps</Text>
            <TouchableOpacity
              style={{
                ...styles.buttonFilter,
                backgroundColor: filter.fps === "1" ? "black" : "white",
              }}
              onPress={() => fpsButtonPress("1")}
            >
              <Text style={styles.filter}>1 fps</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.buttonFilter,
                backgroundColor: filter.fps === "15" ? "black" : "white",
              }}
              onPress={() => fpsButtonPress("15")}
            >
              <Text style={styles.filter}>15 fps</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={gifUrl ? saveGif : convertVideoToGif}>
          <View
            style={{
              ...styles.button,
              backgroundColor: isLoading ? "#99CCFF" : "#2196F3",
            }}
          >
            {isLoading && <ActivityIndicator size="large" color="black" />}
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
  filtersContainer: {
    flex: 1,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  filterContainer: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonFilter: {
    width: 70,
    height: 40,
    marginHorizontal: 5,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  filter: {
    color: "black",
    fontSize: 17,
  },
  mediaPreview: {
    aspectRatio: 9 / 16,
    backgroundColor: "black",
    borderRadius: 15,
    height: "60%",
  },
  textTitle: {
    fontSize: 18,
    marginRight: 10,
  },
  textDetails: {
    fontSize: 15,
    marginVertical: 5,
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
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default EditGifScreen;
