import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, commonStyles } from '../constants'
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import CartModal from './CartModal';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

const ProductDetailsFooter = ({product, navigation}) => {
  const dispatch = useDispatch();
  const [counter, setCounter] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  
  const toggleModal = ()=> {
    setOpenModal(prev=> !prev);
  }

  const handleBuyNow = ()=> {
    setOpenModal(prev=> !prev);
    dispatch(addToCart({item: {...product, count: counter}}));
  }
  
  return (
    <View style={styles.container}>
      <View>
        <Text style={commonStyles.subTxt}>Unit Price</Text>
        <Text style={styles.priceText}>Tk.{product?.price}</Text>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={()=> setCounter(Math.max(counter - 1, 1))}>
          <AntDesign name="minus" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.itemText}>{counter}</Text>
        <TouchableOpacity style={styles.iconButton} onPress={()=> setCounter(Math.min(counter + 1, product.stock))}>
          <AntDesign name="plus" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={styles.button} onPress={handleBuyNow}>
          <MaterialIcons name="shopping-bag" size={20} color={COLORS.lightWhite} />
          <Text style={styles.buttonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
      <CartModal
        openModal={openModal} 
        setOpenModal={setOpenModal} 
        toggleModal={toggleModal}
        product={product}
        navigation={navigation}
      />
    </View>
  )
}

export default ProductDetailsFooter

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.lightGray,
    paddingHorizontal: 10,
    //paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 4,
      height: -2,
    },
    shadowOpacity: 0.2,
    elevation: 2,
    shadowRadius: 3,
    height: 90,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  priceText: {
    marginVertical: 5,
    fontSize: 25,
    color: COLORS.primary,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    
  },
  iconButton: {
    borderColor: COLORS.primary,
    borderWidth: 1,
    padding: 3,
    borderRadius: 10
  },
  itemText: {
    marginHorizontal: 10,
    fontSize: 22,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },
  buttonText: {
    color: COLORS.lightWhite,
    fontSize: 18
  }
});