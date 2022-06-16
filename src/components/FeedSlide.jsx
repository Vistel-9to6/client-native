import { useState, useEffect, useRef } from "react";
import { View, FlatList, StyleSheet, Dimensions } from "react-native";

import FeedSlideItem from "./FeedSlideItem";

function FeedSlide() {
  const mediaRefs = useRef([]);
  const [feed, setFeed] = useState([]);

  const getFeed = async () => {
    try {
      const response = await fetch(`${process.env.API_SERVER_URL}/api/videos`);
      const data = await response.json();

      if (data?.result === "ok") {
        setFeed([...data?.videoList]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  const onViewableItemsChanged = useRef(({ changed }) => {
    changed.forEach((element) => {
      const cell = mediaRefs.current[element.key];
      if (cell) {
        if (element.isViewable) {
          cell.play();
        } else {
          cell.stop();
        }
      }
    });
  });

  const renderItem = ({ item, index }) => {
    return (
      <View
        style={[
          { flex: 1, height: Dimensions.get("window").height - 65.5 },
          index % 2 === 0
            ? { backgroundColor: "gray" }
            : { backgroundColor: "lightgray" },
        ]}
      >
        <FeedSlideItem
          item={item}
          ref={(FeedSlideItemRef) =>
            (mediaRefs.current[item] = FeedSlideItemRef)
          }
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={feed}
        windowSize={4}
        initialNumToRender={0}
        maxToRenderPerBatch={3}
        removeClippedSubviews
        viewabilityConfig={{
          itemVisiblePercentThreshold: 100,
        }}
        renderItem={renderItem}
        pagingEnabled
        keyExtractor={(item) => item?._id}
        decelerationRate={"normal"}
        onViewableItemsChanged={onViewableItemsChanged.current}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "white",
  },
});

export default FeedSlide;
