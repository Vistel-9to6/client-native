import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  ToastAndroid,
  FlatList,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import { Button } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { UserAuth } from "../context/AuthContext";
import { ModalHandler } from "../context/modalContext";

import ModalContainer from "../components/shared/modal";

function EditGifScreen({ navigation, route }) {
  const { uri } = route.params;
  const { idToken } = UserAuth();
  const [gifUrl, setGifUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasLibraryPermissions, setHasLibraryPermissions] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(
    `${process.env.AWS_BUCKET_URL}/assets/1x1_original_15.gif`,
  );
  const [filter, setFilter] = useState({
    color: "original",
    grid: "1x1",
    fps: 15,
  });
  const [downloading, setDownloading] = useState(false);
  const { openModal, setOpenModal } = ModalHandler();

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
        setOpenModal(true);
        return;
      }

      setGifUrl(data.file);
      setIsLoading(false);
    } catch (error) {
      setOpenModal(true);
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

      navigation.goBack();
    } catch (error) {
      setOpenModal(true);
      setDownloading(true);
    }
  };

  const colors = ["SEPIA", "GRAYSCALE", "REVERSAL"];

  const colorButtonPress = (title) => {
    if (title === filter.color) {
      setFilter({ ...filter, color: "original" });
    } else {
      setFilter({ ...filter, color: title });
    }
  };

  const grids = ["2", "3", "4"];

  const gridButtonPress = (title) => {
    if (title === filter.grid) {
      setFilter({ ...filter, grid: "1x1" });
    } else {
      setFilter({ ...filter, grid: title });
    }
  };

  const fps = ["1", "15"];

  const fpsButtonPress = (title) => {
    if (title === filter.fps) {
      setFilter({ ...filter, fps: 15 });
    } else {
      setFilter({ ...filter, fps: title });
    }
  };

  const initializeOption = () => {
    setGifUrl("");
    setFilter({
      color: "original",
      grid: "1x1",
      fps: 15,
    });
  };

  useEffect(() => {
    setPreviewUrl(
      `${process.env.AWS_BUCKET_URL}/assets/${filter.grid}_${filter.color}_${filter.fps}.gif`,
    );
  }, [filter]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <AntDesign name="left" size={27} color="black" />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>
          {gifUrl ? "변환 결과" : "GIF 예시"}
        </Text>
      </View>
      <View style={styles.contentsContainer}>
        <Image
          resizeMode="cover"
          source={{
            uri: gifUrl ? gifUrl : previewUrl,
          }}
          style={styles.mediaPreview}
        />
        {gifUrl ? (
          <Button onPress={initializeOption} title="다시 선택하기" />
        ) : (
          <View style={styles.filterContainer}>
            <View style={styles.filterRow}>
              <Text style={styles.optionTitle}>색상</Text>
              <FlatList
                contentContainerStyle={styles.itemList}
                keyExtractor={(item) => item}
                data={colors}
                renderItem={({ item }) => (
                  <View style={styles.item}>
                    <TouchableOpacity
                      num={item}
                      style={{
                        ...styles.optionButton,
                        backgroundColor:
                          filter.color === item ? "black" : "white",
                      }}
                      onPress={() => colorButtonPress(item)}
                    >
                      <Text
                        style={{
                          ...styles.option,
                          color: filter.color === item ? "white" : "black",
                        }}
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
            <View style={styles.filterRow}>
              <Text style={styles.optionTitle}>격자</Text>
              <FlatList
                contentContainerStyle={styles.itemList}
                keyExtractor={(item) => item}
                data={grids}
                renderItem={({ item }) => (
                  <View style={styles.item}>
                    <TouchableOpacity
                      num={item}
                      style={{
                        ...styles.optionButton,
                        backgroundColor:
                          filter.grid === `${item}x${item}` ? "black" : "white",
                      }}
                      onPress={() => gridButtonPress(`${item}x${item}`)}
                    >
                      <Text
                        style={{
                          ...styles.option,
                          color:
                            filter.grid === `${item}x${item}`
                              ? "white"
                              : "black",
                        }}
                      >{`${item}x${item}`}</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
            <View style={styles.filterRow}>
              <Text style={styles.optionTitle}>FPS</Text>
              <FlatList
                contentContainerStyle={styles.itemList}
                keyExtractor={(item) => item}
                data={fps}
                renderItem={({ item }) => (
                  <View style={styles.item}>
                    <TouchableOpacity
                      num={item}
                      style={{
                        ...styles.optionButton,
                        backgroundColor:
                          filter.fps === item ? "black" : "white",
                      }}
                      onPress={() => fpsButtonPress(item)}
                    >
                      <Text
                        style={{
                          ...styles.option,
                          color: filter.fps === item ? "white" : "black",
                        }}
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
            <View style={styles.normalText}>
              <Text style={{ color: "blue", fontSize: 11 }}>
                옵션을 선택하지 않으면 기본모드로 설정 됩니다
              </Text>
            </View>
          </View>
        )}
      </View>
      <View style={styles.bottonContainer}>
        <View
          style={{
            ...styles.button,
            backgroundColor: isLoading ? "#99CCFF" : "#2196F3",
          }}
        >
          {isLoading ? (
            <ActivityIndicator size="large" color="#2196F3" />
          ) : (
            <TouchableOpacity
              onPress={gifUrl ? saveGif : convertVideoToGif}
              style={styles.button}
            >
              <Text style={styles.buttonText}>
                {gifUrl ? "저장하기" : "변환하기"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      {openModal && (
        <ModalContainer
          isRequiredToGoBack={true}
          navigation={navigation}
          modalHeader="Error"
          modalBody={
            downloading
              ? "GIF 다운로드 실패! 다시 시도해주세요."
              : "GIF 만들기 실패! 다시 시도해 주세요."
          }
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
    width: "100%",
    height: "7%",
    flexDirection: "row",
  },
  backButton: {
    flex: 1,
    marginLeft: 10,
  },
  pageTitle: {
    flex: 5,
    fontSize: 20,
    bottom: 5,
  },
  contentsContainer: {
    flex: 1,
    alignItems: "center",
  },
  mediaPreview: {
    aspectRatio: 9 / 16,
    marginBottom: 20,
    height: "50%",
    backgroundColor: "black",
  },
  filterContainer: {
    flex: 1,
    marginBottom: 100,
  },
  filterRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingLeft: 10,
  },
  itemList: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  item: {
    paddingVertical: 10,
  },
  optionTitleBox: {
    width: "15%",
    height: "100%",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  optionTitle: {
    fontSize: 18,
  },
  option: {
    color: "black",
    fontSize: 11,
  },
  optionButton: {
    width: 85,
    height: 50,
    marginHorizontal: 5,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  normalText: {
    alignItems: "center",
    left: 0,
    right: 0,
    bottom: -37,
    width: "100%",
    position: "absolute",
  },
  bottonContainer: {
    alignItems: "center",
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    position: "absolute",
  },
  button: {
    paddingVertical: 7,
    alignItems: "center",
    width: "100%",
    backgroundColor: "#2196F3",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
});

export default EditGifScreen;
