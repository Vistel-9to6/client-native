import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";

import { ModalHandler, ModalDispatchHandler } from "../context/modalContext";
import { getVideoList } from "../api";

import FeedSlide from "../components/FeedSlide";
import ModalContainer from "../components/shared/modal";
import Loading from "../components/shared/loading";
import { errorMessage, fetchResult } from "../../constants/index";

function FeedSlideScreen({ navigation }) {
  const [feed, setFeed] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const modalStatus = ModalHandler();
  const { handleModalOpen } = ModalDispatchHandler();

  const getFeed = async () => {
    setIsLoading(true);

    try {
      const data = await getVideoList();

      if (data?.result === fetchResult.SUCCESS) {
        setFeed([...data?.videoList]);
      }
    } catch (error) {
      handleModalOpen();
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
          <Loading color="black" />
        </View>
      ) : (
        <FeedSlide videoList={feed} navigation={navigation} />
      )}
      {modalStatus && (
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
