import { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { API_SERVER_URL } from "@env";

import FeedItem from "./FeedItem";
import Profile from "./Profile";

function Feed({ navigation }) {
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const isFocused = useIsFocused();

  const getData = async () => {
    setLoading(true);

    try {
      const response = await fetch(`${API_SERVER_URL}/api/videos`);
      const data = await response.json();

      if (data?.result === "ok") {
        setFeeds([...data?.videoList]);
      }
    } catch (err) {
      setError(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Profile />
      <FlatList
        style={styles.videoList}
        numColumns={3}
        removeClippedSubviews
        nestedScrollEnabled
        data={feeds}
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
    marginTop: 50,
    backgroundColor: "white",
  },
});

export default Feed;
