import React from "react";
import { Center, Modal, Button } from "native-base";
import { ModalHandler, ModalDispatchHandler } from "../../context/modalContext";

function ModalContainer({
  navigation,
  isRequiredToGoBack,
  modalHeader,
  modalBody,
}) {
  const modalStatus = ModalHandler();
  const { handleModalClose } = ModalDispatchHandler();

  return (
    <Center>
      <Modal
        isOpen={modalStatus}
        onClose={handleModalClose}
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
                handleModalClose();

                if (isRequiredToGoBack) {
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
