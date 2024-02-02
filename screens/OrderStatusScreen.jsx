import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { COLORS, icons } from '../constants'
import { Button } from '@rneui/themed'

const OrderStatusScreen = ({navigation, route}) => {
  return (
    <View style={styles.container}>
      <Image source={icons.success_primary} style={styles.successImg} />
      <Text style={styles.placedTxt}>Your order has been placed!</Text>
      <Text style={styles.descriptionTxt}>Order number # {route?.params?.orderNumber}. You will receive an email shortly. We will contact with you soon and update when your order will be shipped.</Text>
      <Button type="outline" title="View Order" color={COLORS.secondary} onPress={()=> navigation.navigate("AuthStackScreen", {
        screen: "OrderDetailsScreen", params: {orderId: route?.params?.orderId}
      })}/>
      <Button color={COLORS.primary} title="Continue Shopping" onPress={()=> navigation.navigate("HomeScreen")}/>
    </View>
  )
}

export default OrderStatusScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    rowGap: 40,
  },
  successImg: {
    width: 100,
    height: 100,
  },
  placedTxt: {
    fontSize: 20,
    color: COLORS.primary,
  },
  descriptionTxt: {
    fontSize: 15
  },


});