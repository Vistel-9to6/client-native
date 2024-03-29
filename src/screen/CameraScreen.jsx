import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { useIsFocused } from "@react-navigation/core";
import { Feather } from "@expo/vector-icons";

import { ModalHandler, ModalDispatchHandler } from "../context/modalContext";
import ModalContainer from "../components/shared/modal";
import { PERMISSION_GRANTED } from "../../constants/text";
import {
  cameraStatus,
  galleryStatus,
  errorMessage,
} from "../../constants/index";

function CameraScreen({ navigation, route }) {
  const cameraRef = useRef(null);
  const [hasAudioPermission, setHasAudioPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermissions, setHasGalleryPermissions] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [cameraFlash, setCameraFlash] = useState(
    Camera.Constants.FlashMode.off,
  );
  const originVideo = route?.params?.originVideo;
  const modalStatus = ModalHandler();
  const { handleModalOpen } = ModalDispatchHandler();
  const [galleryItems, setGalleryItems] = useState([]);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      const cameraPermissionStatus =
        await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(
        cameraPermissionStatus.status === PERMISSION_GRANTED,
      );

      const audioPermissionStatus =
        await Camera.requestMicrophonePermissionsAsync();
      setHasAudioPermission(
        audioPermissionStatus.status === PERMISSION_GRANTED,
      );

      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermissions(galleryStatus.status === PERMISSION_GRANTED);

      if (galleryStatus.status === PERMISSION_GRANTED) {
        const userGalleryMedia = await MediaLibrary.getAssetsAsync({
          sortBy: ["creationTime"],
          mediaType: ["video"],
        });
        setGalleryItems(userGalleryMedia.assets);
      }

      if (
        cameraPermissionStatus.status !== PERMISSION_GRANTED &&
        audioPermissionStatus.status !== PERMISSION_GRANTED
      ) {
        navigation.navigate("Home");
      }
    })();
  }, []);

  const recordVideo = async () => {
    if (cameraRef) {
      try {
        const options = {
          maxDuration: cameraStatus.RECORDING_DURATION,
          quality:
            Camera.Constants.VideoQuality[cameraStatus.RECORDING_QUALITY],
        };

        const videoRecordPromise = cameraRef.current.recordAsync(options);

        if (videoRecordPromise) {
          const liveVideo = await videoRecordPromise;

          originVideo
            ? navigation.navigate("VideoConcat", {
                data: {
                  originVideo,
                  liveVideo,
                },
              })
            : navigation.navigate("VideoResult", { liveVideo });
        }
      } catch (error) {
        handleModalOpen();
      }
    }
  };

  const stopVideo = async () => {
    if (cameraRef) {
      cameraRef.current.stopRecording();
    }
  };

  const pickFromGallery = async () => {
    const galleryVideo = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: galleryStatus.ASPECT,
      quality: galleryStatus.QUALITY,
      maxDuration: galleryStatus.MAX_DURATION,
    });

    if (!galleryVideo.cancelled) {
      originVideo
        ? navigation.navigate("VideoConcat", {
            data: {
              originVideo,
              galleryVideo,
            },
          })
        : navigation.navigate("VideoResult", { galleryVideo });
    }
  };

  return (
    <View style={styles.container}>
      {isFocused ? (
        <Camera
          ref={cameraRef}
          style={styles.camera}
          ratio={cameraStatus.CAMERA_RATIO}
          type={cameraType}
          flashMode={cameraFlash}
          onCameraReady={() => setIsCameraReady(true)}
        />
      ) : null}
      <View style={styles.sideBarContainer}>
        <TouchableOpacity
          style={styles.sideBarButton}
          onPress={() =>
            setCameraType(
              cameraType === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back,
            )
          }
        >
          <Feather name="refresh-ccw" size={24} color={"white"} />
          <Text style={styles.iconText}>Flip</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sideBarButton}
          onPress={() =>
            setCameraFlash(
              cameraFlash === Camera.Constants.FlashMode.off
                ? Camera.Constants.FlashMode.torch
                : Camera.Constants.FlashMode.off,
            )
          }
        >
          <Feather name="zap" size={24} color={"white"} />
          <Text style={styles.iconText}>Flash</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomBarContainer}>
        <View style={styles.flexContainer}></View>
        <View style={styles.recordButtonContainer}>
          <TouchableOpacity
            disabled={!isCameraReady}
            onLongPress={recordVideo}
            onPressOut={stopVideo}
            style={styles.recordButton}
          />
        </View>
        {hasGalleryPermissions && (
          <View style={styles.flexContainer}>
            <TouchableOpacity
              onPress={() => pickFromGallery()}
              style={styles.galleryButton}
            >
              {galleryItems[0] === undefined ? null : (
                <Image
                  style={styles.galleryButtonImage}
                  source={{ uri: galleryItems[0].uri }}
                />
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>
      {modalStatus && (
        <ModalContainer
          modalHeader={errorMessage.ERROR}
          modalBody={errorMessage.ERROR_RECORD_VIDEO}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  camera: {
    flex: 1,
    backgroundColor: "black",
    aspectRatio: 9 / 16,
  },
  bottomBarContainer: {
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    marginBottom: 30,
  },
  recordButtonContainer: {
    flex: 1,
    marginHorizontal: 30,
  },
  recordButton: {
    borderWidth: 8,
    borderColor: "#ff404087",
    backgroundColor: "#ff4040",
    borderRadius: 100,
    height: 80,
    width: 80,
    alignSelf: "center",
  },
  galleryButton: {
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 10,
    overFlow: "hidden",
    height: 60,
    width: 60,
  },
  galleryButtonImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  sideBarContainer: {
    top: 60,
    right: 0,
    marginHorizontal: 20,
    position: "absolute",
  },
  iconText: {
    color: "white",
    fontSize: 12,
    marginTop: 5,
  },
  sideBarButton: {
    alignItems: "center",
    marginBottom: 25,
  },
  flexContainer: {
    flex: 1,
  },
});

export default CameraScreen;
