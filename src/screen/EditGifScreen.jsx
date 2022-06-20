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

import ModalContainer from "../components/shared/modal";
import OptionList from "../components/OptionList";

import { ModalHandler } from "../context/modalContext";
import { UserAuth } from "../context/AuthContext";
import { convertGif } from "../api/index";
import {
  fetchResult,
  defalutGifFilterValue,
  defaultExample,
  filterOptions,
  errorMessage,
} from "../../constants";
import {
  SAVE_COMPLETED,
  PERMISSION_GRANTED,
  SELECT_AGAIN,
  CONVERT_RESULT,
  GIF_EXAMPLE,
  SAVE_GIF,
  CONVERT_GIF,
} from "../../constants/text";

function EditGifScreen({ navigation, route }) {
  const { uri } = route.params;
  const [gifUrl, setGifUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasLibraryPermissions, setHasLibraryPermissions] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(defaultExample);
  const [filter, setFilter] = useState(defalutGifFilterValue);
  const [downloading, setDownloading] = useState(false);

  const { openModal, setOpenModal } = ModalHandler();
  const { idToken } = UserAuth();

  const showToastMessage = () => {
    ToastAndroid.showWithGravity(
      SAVE_COMPLETED,
      ToastAndroid.CENTER,
      ToastAndroid.SHORT,
    );
  };

  const convertVideoToGif = async () => {
    setIsLoading(true);

    try {
      const data = await convertGif(idToken, uri, filter);

      if (data.result === fetchResult.SUCCESS) {
        setOpenModal(true);
        return;
      }

      setGifUrl(data.file);
    } catch (error) {
      setOpenModal(true);
    }

    setIsLoading(false);
  };

  const saveGif = async () => {
    try {
      const filename = `${Date.now() + ".gif"}`;
      const fileUri = `${FileSystem.documentDirectory}${filename}`;
      const downloadedFile = await FileSystem.downloadAsync(gifUrl, fileUri);
      const permission = await MediaLibrary.requestPermissionsAsync();

      if (permission.status === PERMISSION_GRANTED) {
        setHasLibraryPermissions(permission.status === PERMISSION_GRANTED);
      }

      if (permission.status !== PERMISSION_GRANTED) {
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

  const initializeOption = () => {
    setGifUrl("");
    setFilter(defalutGifFilterValue);
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
          {gifUrl ? CONVERT_RESULT : GIF_EXAMPLE}
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
          <Button onPress={initializeOption} title={SELECT_AGAIN} />
        ) : (
          <View style={styles.filterContainer}>
            <FlatList
              data={filterOptions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <OptionList item={item} filter={filter} onPress={setFilter} />
              )}
            />
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
                {gifUrl ? SAVE_GIF : CONVERT_GIF}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      {openModal && (
        <ModalContainer
          isRequiredToGoBack={true}
          navigation={navigation}
          modalHeader={errorMessage.ERROR}
          modalBody={
            downloading
              ? errorMessage.ERROR_DOWNLOAD_FAILURE
              : errorMessage.ERROR_CREATE_GIF_FAILURE
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
