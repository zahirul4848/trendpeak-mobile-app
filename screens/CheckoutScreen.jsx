import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { COLORS, baseApiUrl, commonStyles } from '../constants'
import { CheckBox, Divider } from '@rneui/themed'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import CheckoutFooter from '../components/CheckoutFooter';
import ShippingAddressModal from '../components/ShippingAddressModal';
import { useCreateOrderMutation } from '../store/orderApiSlice';
import { resetCart } from '../store/cartSlice';

const paymentMethods = ["Cash on Delivery", "Bkash", "Nagad"];

const CheckoutScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");
  const { cart, shippingInfo } = useSelector(state=> state.cart);
  const { userInfo } = useSelector(state=> state.auth);
  const [selectedIndex, setIndex] = useState(0);
  const [createOrder, {isLoading}] = useCreateOrderMutation();
  
  const paymentMethod = paymentMethods[selectedIndex];
  
  const toPrice = (num)=> Number(num.toFixed(2));
  const itemsPrice = toPrice(cart.reduce((a, c)=> a + c.price * c.count, 0));
  const shippingPrice = itemsPrice > 5000 ? toPrice(0) : toPrice(80);
  const totalPrice = itemsPrice + shippingPrice;

  const toggleModal = ()=> {
    setOpenModal(prev=> !prev);
  }

  const handleCreateOrder = async()=> {
    try {
      const response = await createOrder({
        orderItems: cart,
        shippingAddress: shippingInfo.shippingAddress,
        paymentMethod: paymentMethod,
        message: message,
        itemsPrice,
        totalPrice,
        shippingPrice,
      }).unwrap();
      navigation.navigate("OrderStatusScreen", {orderId: response.orderId, orderNumber: response.orderNumber});
      dispatch(resetCart());
    } catch (err) {
      Alert.alert("Error", err?.data?.message || err.error);
    }
  }

  useEffect(() => {
    if(userInfo?.email === undefined) {
      navigation.navigate("AuthStackScreen", {screen: "LoginScreen"});
    }
  }, [userInfo])
  

  return (
    <View style={{flex: 1}}>
      <KeyboardAvoidingWrapper>
        <ScrollView
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.container}>
            <View style={styles.wrapper}>
              <Text style={styles.titleTxt}>Shipping and Billing</Text>
              <Divider/>
              {shippingInfo?.shippingAddress ? (
                <View style={[commonStyles.rowSB, {paddingHorizontal: 10}]}>
                  <View style={commonStyles.row}>
                    <Ionicons name="location" size={24} color={COLORS.primary} />
                    <View>
                      <Text>{shippingInfo?.shippingAddress?.fullName}</Text>
                      <Text numberOfLines={1}>
                        {shippingInfo?.shippingAddress?.address}, {" "} 
                        {shippingInfo?.shippingAddress?.city}, {shippingInfo?.shippingAddress?.postalCode}
                      </Text>
                      <Text>
                        {shippingInfo?.shippingAddress?.phoneNumber}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity onPress={()=> setOpenModal(true)}>
                    <MaterialIcons name="edit" size={24} color={COLORS.primary} />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity style={styles.addAddressBtn} onPress={()=> setOpenModal(true)}>
                  <Text style={styles.addAddressBtnTxt}>Add Address</Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.wrapper}>
              <Text style={styles.titleTxt}>Comment (Optional)</Text>
              <Divider/>
              <TextInput
                multiline
                numberOfLines={5}
                style={styles.textInput}
                placeholder='Write here...'
                value={message}
                onChangeText={text=> setMessage(text)}
              />
            </View>
            <View style={styles.wrapper}>
              <Text style={styles.titleTxt}>Payment Method</Text>
              <Divider/>
              <View>
                <CheckBox
                  checked={selectedIndex === 0}
                  onPress={() => setIndex(0)}
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  title="Cash on Delivery"
                  containerStyle={{ backgroundColor: "transparent", padding: 5,}}
                />
                <CheckBox
                  checked={selectedIndex === 1}
                  onPress={() => setIndex(1)}
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  title="Bkash"
                  containerStyle={{ backgroundColor: "transparent", padding: 5, }}
                />
                <CheckBox
                  checked={selectedIndex === 2}
                  onPress={() => setIndex(2)}
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  title="Nagad"
                  containerStyle={{ backgroundColor: "transparent", padding: 5, }}
                />
              </View>
            </View>
            <View style={styles.wrapper}>
              <Text style={styles.titleTxt}>Cart Items</Text>
              <Divider/>
              <View>
                {cart.map((product)=> (
                  <View key={product._id}>
                    <View style={styles.itemWrapper}>
                      <Image source={{uri: product.imageUrls[0].url}} style={styles.image} />
                      <View style={styles.rightColumn}>
                        <Text style={[commonStyles.boldTxt, {marginBottom: 10}]}>{product.title}</Text>
                        <Text>Tk. {product.price} x {product.count} = Tk. {product.price * product.count}</Text>
                      </View>
                    </View>
                    <Divider style={{marginVertical: 20}} />
                  </View>
                ))}
                <View style={[commonStyles.rowSB, {marginHorizontal: 10,}]}>
                  <Text style={commonStyles.boldTxt}>Sub-Total</Text>
                  <Text style={commonStyles.boldTxt}>Tk. {itemsPrice}</Text>
                </View>
                <View style={[commonStyles.rowSB, {marginHorizontal: 10, marginVertical: 20}]}>
                  <Text style={commonStyles.boldTxt}>Shipping Price</Text>
                  <Text style={commonStyles.boldTxt}>Tk. {shippingPrice}</Text>
                </View>
                <Divider/>
                <View style={[commonStyles.rowSB, {marginHorizontal: 10, marginTop: 20}]}>
                  <Text style={commonStyles.boldTxtPrimary}>Total to be paid</Text>
                  <Text style={commonStyles.boldTxtPrimary}>Tk. {totalPrice}</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingWrapper>
      <ShippingAddressModal
        setOpenModal={setOpenModal}
        toggleModal={toggleModal}
        openModal={openModal}
      />
      <View style={{height: 100}}>
        <CheckoutFooter totalPrice={totalPrice} handleCreateOrder={handleCreateOrder} />
      </View>
    </View>
  )
}

export default CheckoutScreen

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 20,
    flexDirection: "column",
    rowGap: 20,
    //marginBottom: 100,
  },
  wrapper: {
    backgroundColor: COLORS.lightWhite,
    borderRadius: 10,
    flexDirection: "column",
    rowGap: 20,
    paddingVertical: 20,
  },
  addAddressBtn: {
    borderWidth: 1,
    borderColor: COLORS.secondary,
    width: 150,
    padding: 5,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 10,
  },
  addAddressBtnTxt: {
    color: COLORS.primary,
    fontWeight: "bold",
  },
  titleTxt: {
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
  itemWrapper: {
    height: 80,
    width: "100%",
    flexDirection: "row",
    columnGap: 20,
    marginHorizontal: 10,
  },
  image: {
    height: "100%",
    width: 80,
    resizeMode: "cover",
    borderRadius: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: COLORS.secondary,
    borderRadius: 10,
    height: 100,
    padding: 10,
    marginHorizontal: 10,
    textAlignVertical: "top",
  }
});