import { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import FeedItem from "./FeedItem";
import Profile from "./Profile";

const data = [
  "https://amplify-realbuckettest-dev-215519-deployment.s3.ap-northeast-2.amazonaws.com/public/253e8dac-05a3-4991-9cac-a48567455a6c.mp4",
  "https://amplify-realbuckettest-dev-215519-deployment.s3.ap-northeast-2.amazonaws.com/public/253e8dac-05a3-4991-9cac-a48567455a6c.mp4",
  "https://amplify-realbuckettest-dev-215519-deployment.s3.ap-northeast-2.amazonaws.com/public/fcf10e02-4230-402b-b88f-1f78bee87bc9.mp4",
  "https://vistel-videos.s3.ap-northeast-2.amazonaws.com/videos/1654841544842_vaco.mp4",
];

function Feed() {
  const [feeds, setFeeds] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getData = async () => {
    setLoading(true);

    try {
      const response = await fetch("url/api/videos", {
        method: "GET",
      });
      const videos = response.json();

      if (videos) {
        setFeeds(videos);
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
      <FlatList
        style={styles.videoList}
        numColumns={3}
        removeClippedSubviews
        nestedScrollEnabled
        data={data}
        keyExtractor={(item) => item?._id}
        renderItem={({ item }) => <FeedItem item={item} />}
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
