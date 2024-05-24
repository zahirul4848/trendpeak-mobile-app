import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator } from 'react-native'
import React from 'react'
import { COLORS, commonStyles } from '../constants'
import { Divider } from '@rneui/themed'
import { Ionicons } from '@expo/vector-icons';
import { useGetOrderQuery } from '../store/orderApiSlice';


const OrderDetailsScreen = ({route}) => {
  const {data: order, isLoading} = useGetOrderQuery(route?.params?.orderId);

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
    >
      {isLoading && (
        <ActivityIndicator size="large" color={COLORS.primary} />
      )}
      {order && (
        <View style={styles.container}>
          <View style={styles.wrapper}>
            <View style={commonStyles.rowSB}>
              <View>
                <Text style={styles.titleTxt}>Order No: {order.orderNumber}</Text>
                <Text style={styles.date}>Date: {order.createdAt.split("T")[0]}</Text>
              </View>
              <Text
                style={[commonStyles.boldTxt, {color: COLORS.secondary, marginRight: 10}]}
              >
                {order.isDelivered ? "Finished" : "Pending"}
              </Text>
            </View>
            <Divider/>
            <View style={commonStyles.row}>
              <Ionicons name="location" size={24} color={COLORS.primary} />
              <View>
                <Text>{order.shippingAddress.fullName}</Text>
                <Text numberOfLines={1}>
                  {order.shippingAddress.address}, {" "} 
                  {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                </Text>
                <Text>
                  {order.shippingAddress.phoneNumber}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.wrapper}>
            <Text style={styles.titleTxt}>Ordered Items</Text>
            <Divider/>
            <View>
              {order.orderItems.map((product)=> (
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
                <Text style={commonStyles.boldTxt}>Tk. {order.itemsPrice}</Text>
              </View>
              <View style={[commonStyles.rowSB, {marginHorizontal: 10, marginVertical: 20}]}>
                <Text style={commonStyles.boldTxt}>Shipping Price</Text>
                <Text style={commonStyles.boldTxt}>Tk. {order.shippingPrice}</Text>
              </View>
              <Divider/>
              <View style={[commonStyles.rowSB, {marginHorizontal: 10, marginTop: 20}]}>
                <Text style={commonStyles.boldTxtPrimary}>Total</Text>
                <Text style={commonStyles.boldTxtPrimary}>Tk. {order.totalPrice}</Text>
              </View>
            </View>
          </View>
          <View style={styles.wrapper}>
            <Text style={styles.titleTxt}>Payment Method</Text>
            <Divider/>
            <Text style={{marginHorizontal: 10}}>{order.paymentMethod}</Text>
          </View>
          <View style={styles.wrapper}>
            <Text style={styles.titleTxt}>Message</Text>
            <Divider/>
            <Text style={{marginHorizontal: 10}}>{order.message || "-"}</Text>
          </View>
        </View>
      )}
    </ScrollView>
  )
}

export default OrderDetailsScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 10,
    flexDirection: "column",
    rowGap: 20,
    marginBottom: 60,
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
    alignItems: "center"
  },
  addAddressBtnTxt: {
    color: COLORS.primary,
    fontWeight: "bold"
  },
  titleTxt: {
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
  date: {
    fontSize: 12,
    paddingHorizontal: 10,
    color: COLORS.tertiary,
    marginTop: 5,
  },
  itemWrapper: {
    height: 64,
    width: "100%",
    flexDirection: "row",
    columnGap: 20,
    marginHorizontal: 10,
  },
  image: {
    height: "100%",
    width: 64,
    resizeMode: "cover",
    borderRadius: 10,
  },
  
});