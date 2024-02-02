import { StyleSheet, View } from 'react-native';
import React from 'react';
import Modal from "react-native-modal";
import LoginForm from './LoginForm';
import { COLORS } from '../constants';
import KeyboardAvoidingWrapper from './KeyboardAvoidingWrapper';

const LoginModal = ({setOpenModal, toggleModal, openModal}) => {
  return (
    <Modal
      onBackdropPress={()=> setOpenModal(false)}
      onBackButtonPress={()=> setOpenModal(false)}
      isVisible={openModal}
      swipeDirection="down"
      onSwipeComplete={toggleModal}
      animationIn="bounceInUp"
      animationOut="bounceOutDown"
      animationInTiming={900}
      animationOutTiming={500}
      backdropTransitionInTiming={1000}
      backdropTransitionOutTiming={500}
      style={styles.modal}
      avoidKeyboard
    >
      <View
        style={styles.modalContent}
      >
        <View style={styles.barIcon}/>
        <KeyboardAvoidingWrapper>
          <LoginForm />
        </KeyboardAvoidingWrapper>
      </View>
    </Modal>
  )
}

export default LoginModal

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: COLORS.secondary,
    minHeight: 400,
    paddingHorizontal: 12,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingVertical: 20,
  },
  barIcon: {
    backgroundColor: COLORS.gray,
    width: 60,
    height: 5,
    alignSelf: "center",
    borderRadius: 5,
    marginBottom: 20,
  }
});