import { Alert, FlatList, Image, RefreshControl, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { useGetWishlistQuery, useToggleWishlistMutation } from '../store/userApiSlice';
import { COLORS, baseApiUrl, commonStyles } from '../constants';
import { MaterialIcons } from '@expo/vector-icons';

const WishlistScreen = ({navigation}) => {
  const {data: products, isFetching, refetch} = useGetWishlistQuery();
  const [toggleWishlist] = useToggleWishlistMutation(); 
  const handleToggleWishlist = async(productId)=> {
    try {
      await toggleWishlist({productId});
      refetch();
    } catch (err) {
      Alert.alert(err?.data?.message || err.error);
    }
  }

  useEffect(() => {
    refetch();
  }, [])
  if(products?.length === 0) return <Text style={styles.emptyList}>Your wishlist is empty!</Text>
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <FlatList
          data={products || []}
          keyExtractor={(data)=> data._id}
          horizontal={false}
          refreshControl={
            <RefreshControl refreshing={isFetching} onRefresh={refetch} />
          }
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <View style={styles.itemWrapper}>
                <TouchableOpacity onPress={()=> navigation.navigate("ProductDetailsScreen", {id: item?._id})} style={commonStyles.row}>
                  <Image resizeMode="contain" source={{uri: item.imageUrls[0]?.url}} style={styles.image} />
                  <View style={styles.titleContainer}>
                    <Text>{item.title}</Text>
                    <Text style={commonStyles.boldTxt}>Tk. {item.price}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={()=> handleToggleWishlist(item._id)}
                >
                  <MaterialIcons name="delete-outline" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  )
}

export default WishlistScreen

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  emptyList: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 100
  },
  itemContainer: {
    backgroundColor: COLORS.lightWhite,
    padding: 10,
    borderRadius: 10,
    height: 100,
    marginBottom: 20,
  },
  itemWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: "cover"
  },
  titleContainer: {
    flexDirection: "column",
    rowGap: 10,
  }
});