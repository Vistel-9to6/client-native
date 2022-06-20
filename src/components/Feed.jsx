import { View, FlatList, StyleSheet } from "react-native";
import FeedItem from "./FeedItem";

function Feed({ navigation, videos }) {
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.videoList}
        numColumns={3}
        removeClippedSubviews
        nestedScrollEnabled
        data={videos}
        keyExtractor={(item) => item?._id}
        renderItem={({ item }) => (
          <FeedItem item={item} navigation={navigation} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    backgroundColor: "white",
    flexDirection: "column",
  },
});

export default Feed;
