import { useState, useEffect } from "react";
import { View, FlatList, TextInput, StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import { getVideoList } from "../api/index";
import { fetchResult, errorMessage } from "../../constants/index";
import { ModalHandler, ModalDispatchHandler } from "../context/modalContext";

import FeedItem from "../components/FeedItem";
import ModalContainer from "../components/shared/modal";

function SearchScreen({ navigation }) {
  const [videos, setVideos] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const modalStatus = ModalHandler();
  const { handleModalOpen } = ModalDispatchHandler();
  const isFocused = useIsFocused();

  const getData = async () => {
    setLoading(true);

    try {
      const data = await getVideoList();

      if (data?.result === fetchResult.SUCCESS) {
        setVideos([...data?.videoList]);
      }
    } catch (error) {
      handleModalOpen();
    }

    setLoading(false);
  };

  const handleInputSearch = (keyword) => {
    if (keyword) {
      const newData = videos.filter((video) => {
        const videoTitle = video.title ? video.title : "";

        return videoTitle.indexOf(keyword) > -1;
      });

      setFiltered(newData);
    } else {
      setFiltered([]);
    }

    setSearch(keyword);
  };

  useEffect(() => {
    getData();
  }, [isFocused]);

  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={styles.textInputStyle}
          value={search}
          placeholder="검색하기"
          underlineColorAndroid="transparent"
          onChangeText={(text) => handleInputSearch(text)}
        />
        <View style={styles.listContainer}>
          <FlatList
            style={styles.videoList}
            numColumns={3}
            data={filtered}
            keyExtractor={(item) => item?._id}
            renderItem={({ item }) => (
              <FeedItem item={item} navigation={navigation} />
            )}
          />
        </View>
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
    backgroundColor: "white",
  },
  textInputStyle: {
    height: 50,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: "#009688",
    backgroundColor: "white",
  },
  listContainer: {
    height: "100%",
  },
});

export default SearchScreen;
