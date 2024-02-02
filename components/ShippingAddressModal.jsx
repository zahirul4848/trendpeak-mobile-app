import { Platform, StyleSheet, View } from 'react-native';
import React from 'react';
import Modal from "react-native-modal";
import { COLORS } from '../constants';
import KeyboardAvoidingWrapper from './KeyboardAvoidingWrapper';
import ShippingAddressForm from './ShippingAddressForm';

const ShippingAddressModal = ({setOpenModal, toggleModal, openModal}) => {
  
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
            <ShippingAddressForm setOpenModal={setOpenModal} />
          </KeyboardAvoidingWrapper>
      </View>
    </Modal>
  )
}

export default ShippingAddressModal;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: COLORS.tertiary,
    minHeight: Platform.OS === "android" ? "90%" : "80%",
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