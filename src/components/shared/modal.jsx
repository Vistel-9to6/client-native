import React from "react";
import { Center, Modal, Button } from "native-base";
import { ModalHandler } from "../../context/modalContext";

function ModalContainer({ navigation, needToGoBack, modalHeader, modalBody }) {
  const { openModal, setOpenModal } = ModalHandler();

  return (
    <Center>
      <Modal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        _backdrop={{
          _dark: {
            bg: "coolGray.800",
          },
          bg: "blueGray.400",
        }}
      >
        <Modal.Content>
          <Modal.Header>{modalHeader}</Modal.Header>
          <Modal.Body>{modalBody}</Modal.Body>
          <Modal.Footer>
            <Button
              onPress={() => {
                setOpenModal(false);

                if (needToGoBack) {
                  navigation.goBack();
                }
              }}
            >
              닫기
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  );
}

export default ModalContainer;
