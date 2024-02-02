import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Modal from "react-native-modal";
import { COLORS, commonStyles, icons } from '../constants';
import { Divider } from '@rneui/themed';
import { useSelector } from 'react-redux';

const CartModal = ({setOpenModal, toggleModal, openModal, product, navigation}) => {
  const {cart} = useSelector(state=> state.cart);
  const toPrice = (num)=> Number(num.toFixed(2));
  const itemsPrice = toPrice(cart.reduce((a, c)=> a + c.price * c.count, 0));
  const handleNavigate = (screen)=> {
    navigation.navigate(screen);
    setOpenModal(false);
  }
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
    >
      <View
        style={styles.modalContent}
      >
        <View style={styles.barIcon}/>
        {/* cart summery */}
        <View style={styles.thumbWrapper}>
          <Image source={icons.success_primary} style={styles.successIcon} />
          <Text style={{textAlign: "center", width: "80%"}}>You have added "{product.title}" to your shopping cart!</Text>
        </View>
        <View style={[commonStyles.rowSB, {marginVertical: 10}]}>
          <Text>Cart Quantity</Text>       
          <Text>{cart.length} item(s)</Text>       
        </View>
        <Divider/>
        <View style={[commonStyles.rowSB, {marginVertical: 10}]}>
          <Text>Cart Total</Text>       
          <Text>Tk. {itemsPrice}</Text>     
        </View>
        <Divider/>
        <View style={[commonStyles.rowSB, {marginTop: 30}]}>
          <TouchableOpacity onPress={()=> handleNavigate("CartScreen")} style={styles.buttonSecondary}>
            <Text style={styles.buttonSecondaryTxt}>View Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> handleNavigate("CheckoutScreen")} style={styles.buttonPrimary}>
            <Text style={styles.buttonPrimaryTxt}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default CartModal;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: COLORS.gray,
    minHeight: 350,
    paddingHorizontal: 12,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingVertical: 20,
  },
  barIcon: {
    backgroundColor: COLORS.lightWhite,
    width: 60,
    height: 5,
    alignSelf: "center",
    borderRadius: 5,
    marginBottom: 20,
  },
  thumbWrapper: {
    alignItems: "center",
    marginVertical: 10,
    flexDirection: "column",
    rowGap: 10,  
  },
  successIcon: {
    width: 60,
    height: 60,
    resizeMode: "cover",
  },
  buttonSecondary: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    padding: 10,
    width: "45%",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonSecondaryTxt: {
    color: COLORS.primary,
    fontWeight: "bold",
  },
  buttonPrimary: {
    backgroundColor: COLORS.primary,
    padding: 12,
    width: "45%",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonPrimaryTxt: {
    color: COLORS.lightWhite,
    fontWeight: "bold",
  },
});