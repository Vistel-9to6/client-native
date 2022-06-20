import { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { ModalHandler } from "../context/modalContext";
import { getVideoList } from "../api";

import FeedSlide from "../components/FeedSlide";
import ModalContainer from "../components/shared/modal";
import { errorMessage, fetchResult } from "../../constants/index";

function FeedSlideScreen() {
  const [feed, setFeed] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { openModal, setOpenModal } = ModalHandler();

  const getFeed = async () => {
    setIsLoading(true);

    try {
      const data = await getVideoList();

      if (data?.result === fetchResult.SUCCESS) {
        setFeed([...data?.videoList]);
      }
    } catch (error) {
      setOpenModal(true);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : (
        <FeedSlide videoList={feed} />
      )}
      {openModal && (
        <ModalContainer
          modalHeader={errorMessage.ERROR}
          modalBody={errorMessage.ERROR_VIDEOLIST}
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

export default FeedSlideScreen;
