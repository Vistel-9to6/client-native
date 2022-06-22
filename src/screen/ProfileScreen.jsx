import { useEffect, useState } from "react";
import { View, Image, FlatList, StyleSheet, Text } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import { UserAuth } from "../context/AuthContext";
import { ModalHandler } from "../context/modalContext";
import { getUserInfo } from "../api/index";

import FeedItem from "../components/FeedItem";
import ModalContainer from "../components/shared/modal";
import { errorMessage, fetchResult } from "../../constants";

function ProfileScreen({ navigation }) {
  const { user, idToken } = UserAuth();
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(false);
  const { openModal, setOpenModal } = ModalHandler();
  const isFocused = useIsFocused();

  const getData = async () => {
    setLoading(true);

    try {
      const data = await getUserInfo(user.userId, idToken);

      if (data?.result === fetchResult.SUCCESS) {
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
    paddingVertical: 20,
    flexDirection: "column",
    backgroundColor: "white",
    textAlign: "center",
  },
  profileBox: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  videoListBox: {
    height: "100%",
    marginTop: 150,
  },
  profile: {
    width: 100,
    height: 100,
    borderRadius: 75,
  },
});

export default ProfileScreen;
