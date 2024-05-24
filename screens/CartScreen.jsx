import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { COLORS, commonStyles, images } from '../constants';
import { AntDesign } from '@expo/vector-icons';
import { Divider } from '@rneui/themed';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseCount, increaseCount, removeFromCart } from '../store/cartSlice';

const CartScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state=> state.auth);
  const { cart } = useSelector(state=> state.cart);

  const toPrice = (num)=> Number(num.toFixed(2));
  const itemsPrice = toPrice(cart.reduce((a, c)=> a + c.price * c.count, 0));
  const shippingPrice = itemsPrice > 999 ? toPrice(0) : toPrice(80);
  const totalPrice = itemsPrice + shippingPrice;

  const handleCheckout = ()=> {
    if(userInfo?.email) {
      navigation.navigate("CheckoutScreen");
    } else {
      navigation.navigate("AuthStackScreen", {screen: "LoginScreen"});
    }
  }

  return (
    <>
    {cart.length < 1 ? (
      <View style={styles.emptyContainer}>
        <Image source={images.empty_box} style={styles.emptyImg} />
        <Text>Your Shopping Cart is Empty!</Text>
      </View>
    ) : (
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {cart.map((product)=> (
          <View style={styles.itemWrapper} key={product._id}>
            <View style={styles.leftColumn}>
              <Pressable onPress={()=> navigation.navigate("ProductDetailsScreen", {id: product?._id})}>
                <Image source={{uri: product.imageUrls[0].url}} style={styles.image} />
              </Pressable>
              <View>
                <Pressable onPress={()=> navigation.navigate("ProductDetailsScreen", {id: product?._id})}>
                  <Text style={styles.titleTxt} numberOfLines={1}>{product.title}</Text>
                </Pressable>
                <View style={styles.iconContainer}>
                  <TouchableOpacity
                    style={styles.iconButton}
                    onPress={()=> dispatch(decreaseCount({_id: product._id}))}
                  >
                    <AntDesign name="minus" size={24} color="black" />
                  </TouchableOpacity>
                  <Text style={styles.itemText}>{product.count}</Text>
                  <TouchableOpacity
                    style={styles.iconButton}
                    onPress={()=> dispatch(increaseCount({_id: product._id}))}
                  >
                    <AntDesign name="plus" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.rightColumn}>
              <Text style={styles.priceTxt}>Tk. {product.price}</Text>
              <Text>x {product.count}</Text>
              <Divider color={COLORS.primary} style={{width: "100%"}} />
              <Text style={styles.priceTxt}>Tk. {product.price * product.count}</Text>
            </View>
            <TouchableOpacity
              style={styles.closeIcon}
              onPress={()=> dispatch(removeFromCart({_id: product._id}))}
            >
              <AntDesign name="closecircleo" size={24} color="black" />
            </TouchableOpacity>
          </View>      
        ))}
        
        <View style={styles.calculationConatiner}>
          <View style={commonStyles.rowSB}>
            <Text style={styles.priceTxt}>Sub Total</Text>
            <Text style={styles.priceTxt}>Tk.{itemsPrice}</Text>
          </View>
          <View style={commonStyles.rowSB}>
            <Text style={styles.priceTxt}>Shipping Fee</Text>
            <Text style={styles.priceTxt}>Tk.{shippingPrice}</Text>
          </View>
          <Divider width={3} />
          <View style={commonStyles.rowSB}>
            <Text style={styles.total}>Total to be paid</Text>
            <Text style={styles.total}>Tk.{totalPrice}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleCheckout}>
          <Text style={styles.buttonTxt}>Checkout</Text>
        </TouchableOpacity>
      </ScrollView>
    )}
    </>
  )
}

export default CartScreen

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    rowGap: 50
  },
  emptyImg: {
    width: 200,
    height: 200,
    resizeMode: "cover"
  },
  container: {
    flex: 1,
    padding: 10,
    marginBottom: 60,
  },
  itemWrapper: {
    height: 100,
    width: "100%",
    backgroundColor: COLORS.lightGray,
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    position: "relative",
  },
  leftColumn: {
    flexDirection: "row",
    columnGap: 10,
  },
  rightColumn: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  image: {
    height: "100%",
    width: 80,
    resizeMode: "cover",
    borderRadius: 10,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 2,
    marginTop: 10,
  },
  titleTxt: {
    fontSize: 15,
    fontWeight: "bold",
    maxWidth: 160
  },
  iconButton: {
    borderColor: COLORS.primary,
    borderWidth: 1,
    padding: 3,
    borderRadius: 10,
  },
  itemText: {
    marginHorizontal: 10,
    fontSize: 15,
  },
  priceTxt: {
    fontWeight: "bold",
    fontSize: 15,
  },
  closeIcon: {
    position: "absolute",
  },
  calculationConatiner: {
    flexDirection: "column",
    width: "70%",
    alignSelf: "flex-end",
    marginTop: 10,
    rowGap: 10,
    paddingHorizontal: 10,
  },
  total: {
    fontWeight: "bold",
    fontSize: 15,
    color: COLORS.primary
  },
  button: {
    backgroundColor: COLORS.primary,
    marginTop: 30,
    padding: 15,
    alignItems: "center",
    borderRadius: 15,
  },
  buttonTxt: {
    color: COLORS.lightWhite, 
    fontWeight: "bold",
  }
});