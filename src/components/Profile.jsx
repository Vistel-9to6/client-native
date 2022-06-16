import { useEffect, useState } from "react";
import { View, Image, FlatList, StyleSheet, Text } from "react-native";
import { UserAuth } from "../context/AuthContext";
import { useIsFocused } from "@react-navigation/native";

import FeedItem from "./FeedItem";

function ProfileScreen({ navigation }) {
  const { user, idToken } = UserAuth();
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const isFocused = useIsFocused();

  const getData = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.API_SERVER_URL}/api/videos/${user.userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        },
      );
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
      <View style={styles.profileBox}>
        <Image
          style={styles.profile}
          source={{
            uri: user?.profilePhoto,
          }}
        />
      </View>
      <View style={styles.videoListBox}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    flexDirection: "column",
    backgroundColor: "white",
    textAlign: "center",
  },
  profileBox: {
    flex: 1,
    flexDirection: "column",
    marginBottom: 150,
    alignItems: "center",
  },
  profile: {
    width: 100,
    height: 100,
    borderRadius: 75,
  },
});

export default ProfileScreen;
