import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, commonStyles } from '../constants'

const CheckoutFooter = ({totalPrice, handleCreateOrder, isLoading}) => {
  
  return (
    <View style={styles.container}>
      <View>
        <Text style={commonStyles.subTxt}>Total Price</Text>
        <Text style={styles.priceText}>Tk.{totalPrice}</Text>
      </View>
      <TouchableOpacity disabled={isLoading} style={styles.button} onPress={handleCreateOrder}>
        <Text style={styles.buttonText}>Confirm Order</Text>
      </TouchableOpacity>
    </View>
  )
}

export default CheckoutFooter;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.lightGray,
    paddingHorizontal: 20,
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