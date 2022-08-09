import { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import { ModalHandler, ModalDispatchHandler } from "../context/modalContext";
import { getVideoList } from "../api/index";

import FeedItem from "../components/FeedItem";
import ModalContainer from "../components/shared/modal";
import { fetchResult, errorMessage } from "../../constants/index";

function MainFeedScreen({ navigation }) {
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(false);
  const modalStatus = ModalHandler();
  const { handleModalOpen } = ModalDispatchHandler();
  const isFocused = useIsFocused();

  const getData = async () => {
    setLoading(true);

    try {
      const data = await getVideoList();

      if (data?.result === fetchResult.SUCCESS) {
        setFeeds([...data?.videoList]);
      }
    } catch (error) {
      handleModalOpen();
    }

    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [isFocused]);

  return (
    <>
      <View style={styles.container}>
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
      </View>
      {modalStatus && (
        <ModalContainer
          modalHeader={errorMessage.ERROR}
          modalBody={errorMessage.ERROR_VIDEOLIST}
        />
      )}
    </>
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

export default MainFeedScreen;
