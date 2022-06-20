import { useRef, useCallback } from "react";
import { View, FlatList, Dimensions } from "react-native";

import FeedSlideItem from "./FeedSlideItem";

function FeedSlide({ navigation, videoList }) {
  const mediaRefs = useRef([]);

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

  const videoSlide = useCallback(({ item, index }) => {
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
    <FlatList
      data={videoList}
      windowSize={2}
      initialNumToRender={1}
      maxToRenderPerBatch={2}
      removeClippedSubviews
      viewabilityConfig={{
        itemVisiblePercentThreshold: 100,
      }}
      renderItem={videoSlide}
      pagingEnabled
      keyExtractor={(item) => item._id}
      decelerationRate={"normal"}
      onViewableItemsChanged={onViewableItemsChanged.current}
    />
  );
}

export default FeedSlide;
