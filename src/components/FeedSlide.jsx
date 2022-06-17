import { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { ModalHandler } from "../context/modalContext";

import FeedSlideItem from "./FeedSlideItem";
import ModalContainer from "../components/shared/modal";

function FeedSlide({ navigation }) {
  const mediaRefs = useRef([]);
  const [feed, setFeed] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { openModal, setOpenModal } = ModalHandler();

  const getFeed = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(`${process.env.API_SERVER_URL}/api/videos`);
      const data = await response.json();

      setIsLoading(false);

      if (data?.result === "ok") {
        setFeed([...data?.videoList]);
      }
    } catch (error) {
      setOpenModal(true);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  const onViewableItemsChanged = useRef(({ changed }) => {
    changed.forEach((element) => {
      const cell = mediaRefs.current[element.index];
      if (cell) {
        if (element.isViewable) {
          cell.play();
        } else {
          cell.stop();
        }
      }
    });
  });

  const renderItem = useCallback(({ item, index }) => {
    return (
      <View
        style={[
          { flex: 1, height: Dimensions.get("window").height - 55.3 },
          index % 2 === 0
            ? { backgroundColor: "gray" }
            : { backgroundColor: "darkgray" },
        ]}
      >
        <FeedSlideItem
          navigation={navigation}
          item={item}
          ref={(FeedSlideItemRef) =>
            (mediaRefs.current[index] = FeedSlideItemRef)
          }
        />
      </View>
    );
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : (
        <FlatList
          data={feed}
          windowSize={2}
          initialNumToRender={1}
          maxToRenderPerBatch={2}
          removeClippedSubviews
          viewabilityConfig={{
            itemVisiblePercentThreshold: 100,
          }}
          renderItem={renderItem}
          pagingEnabled
          keyExtractor={(item) => item._id}
          decelerationRate={"normal"}
          onViewableItemsChanged={onViewableItemsChanged.current}
        />
      )}
      {openModal && (
        <ModalContainer
          modalHeader="Error"
          modalBody="동영상 목록을 가져오는 데 실패했습니다."
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "black",
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default FeedSlide;
