import { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { API_SERVER_URL } from "@env";
import LottieView from "lottie-react-native";
import loadingAnimation from "../../assets/loadingAnimation.json";

import FeedItem from "./FeedItem";
import Profile from "./Profile";

function Feed({ navigation }) {
  const [feeds, setFeeds] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getData = async () => {
    setLoading(true);

    try {
      const response = await fetch(`${API_SERVER_URL}/api/videos`, {
        method: "GET",
      });
      const data = await response.json();

      if (data) {
        setFeeds(data.videoList);
      }
    } catch (err) {
      setError(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <Profile />
      {loading && <LottieView source={loadingAnimation} autoPlay loop />}
      {!loading && (
        <FlatList
          numColumns={3}
          removeClippedSubviews
          nestedScrollEnabled
          data={feeds}
          keyExtractor={(item) => item?._id}
          renderItem={({ item }) => (
            <FeedItem item={item} navigation={navigation} />
          )}
        />
      )}
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
