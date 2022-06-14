import React from "react";
import { StyleSheet } from "react-native";
import { Center, Modal, Button } from "native-base";
import { UserAuth } from "../../context/AuthContext";

function ModalContainer({ title, button }) {
  const { modal, handleModal } = UserAuth();

  return (
    <Center style={styles.container}>
      <Modal isOpen={modal} onClose={handleModal}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Body>{title}</Modal.Body>
          <Modal.Footer>
            <Button.Group>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={handleModal}
              >
                {button}
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ModalContainer;
