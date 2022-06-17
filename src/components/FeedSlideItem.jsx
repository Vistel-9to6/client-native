/* eslint-disable react/display-name */
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { Video } from "expo-av";

const PostSingle = forwardRef(({ item }, parentRef) => {
  const ref = useRef(null);

  useImperativeHandle(parentRef, () => ({
    play,
    unload,
    stop,
  }));

  useEffect(() => {
    return () => unload();
  }, []);

  const play = async () => {
    if (ref.current === null) {
      return;
    }

    const status = await ref.current.getStatusAsync();

    if (status?.isPlaying) {
      return;
    }

    try {
      await ref.current.playAsync();
    } catch (error) {
      console.log(error);
    }
  };

  const stop = async () => {
    if (ref.current === null) {
      return;
    }

    const status = await ref.current.getStatusAsync();

    if (!status?.isPlaying) {
      return;
    }

    try {
      await ref.current.stopAsync();
    } catch (error) {
      console.log(error);
    }
  };

  const unload = async () => {
    if (ref.current === null) {
      return;
    }

    try {
      await ref.current.unloadAsync();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Video
        ref={ref}
        style={styles.video}
        resizeMode={"cover"}
        shouldPlay={true}
        source={{ uri: item?.videoUrl }}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    width: "100%",
    height: "100%",
  },
});

export default PostSingle;
