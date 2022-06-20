import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

import { ModalHandler } from "../context/modalContext";
import { getVideoList } from "../api/index";

import Feed from "../components/Feed";
import ModalContainer from "../components/shared/modal";
import { fetchResult, errorMessage } from "../../constants/index";

function MainFeedScreen() {
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(false);
  const { openModal, setOpenModal } = ModalHandler();
  const isFocused = useIsFocused();

  const getData = async () => {
    setLoading(true);

    try {
      const data = await getVideoList();
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
    <>
      <Feed videos={feeds} />
      {openModal && (
        <ModalContainer
          modalHeader={errorMessage.ERROR}
          modalBody={errorMessage.ERROR_VIDEOLIST}
        />
      )}
    </>
  );
}

export default MainFeedScreen;
