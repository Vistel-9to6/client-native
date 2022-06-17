import { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { ModalHandler } from "../context/modalContext";
import { useIsFocused } from "@react-navigation/native";

import FeedItem from "./FeedItem";
import ModalContainer from "../components/shared/modal";

function Feed({ navigation }) {
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(false);
  const { openModal, setOpenModal } = ModalHandler();
  const isFocused = useIsFocused();

  const getData = async () => {
    setLoading(true);

    try {
      const response = await fetch(`${process.env.API_SERVER_URL}/api/videos`);
      const data = await response.json();

      if (data?.result === "ok") {
        setFeeds([...data?.videoList]);
      }
    } catch (error) {
      setOpenModal(true);
    }

    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [isFocused]);

  return (
    <View style={styles.container}>
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
    paddingTop: 5,
    backgroundColor: "white",
    flexDirection: "column",
  },
});

export default Feed;
