import { FlatList, RefreshControl, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { useGetUserOrdersQuery } from '../store/orderApiSlice'
import { COLORS, commonStyles } from '../constants';
import { Divider } from '@rneui/themed';
import { Fragment } from 'react';

const UserOrderListScreen = ({navigation}) => {
  const {data: orders, isFetching, refetch} = useGetUserOrdersQuery();
  return (
    <SafeAreaView>
      <View style={styles.container}>
        {orders?.length === 0 ? (
          <Text style={styles.emptyOrder}>You did not make any order yet</Text>
        ) : (
          <FlatList
            data={orders || []}
            keyExtractor={(data)=> data._id}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={isFetching} onRefresh={refetch} />
            }
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.itemContainer}
                onPress={()=> navigation.navigate("OrderDetailsScreen", {orderId: item._id})}
              >
                <View style={commonStyles.rowSB}>
                  <Text style={commonStyles.boldTxt}>Order No: {item.orderNumber}</Text>
                  <Text>Date: {item.createdAt.split("T")[0]}</Text>
                </View>
                <Divider style={{marginVertical: 10}} />
                {item.orderItems.map((orderItem)=> (
                  <Fragment key={orderItem._id}>
                      <View style={styles.itemWrapper}>
                        <Image source={{uri: orderItem.imageUrls[0].url}} style={styles.image} />
                        <View style={styles.titleContainer}>
                          <Text>{orderItem.title}</Text>
                          <Text style={commonStyles.boldTxt}>Tk. {orderItem.price} x {orderItem.count} = Tk. {orderItem.price * orderItem.count}</Text>
                        </View>
                      </View>
                      <Divider style={{marginVertical: 10}} />
                  </Fragment>
                ))}
                <View style={commonStyles.rowSB}>
                  <Text style={[commonStyles.boldTxt, {color: COLORS.secondary}]}>{item.isDelivered ? "Finished" : "Pending"}</Text>
                  <Text>{`${item.orderItems.length} Items(s), Total: Tk. ${item.itemsPrice}`}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  )
}

export default UserOrderListScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  emptyOrder: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 100
  },
  itemContainer: {
    backgroundColor: COLORS.gray,
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  itemWrapper: {
    flexDirection: "row",
    //alignItems: "center",
    //justifyContent: "space-between",
    gap: 10,
  },
  image: {
    width: 64,
    height: 64,
  },
  titleContainer: {
    flexDirection: "column",
    rowGap: 10,
  }
});