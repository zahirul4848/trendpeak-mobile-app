import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, baseApiUrl } from '../constants';
import { AntDesign } from '@expo/vector-icons';

const CategoryCard = ({navigation, item}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={()=> navigation.navigate("ProductListScreen", {categoryId: item?._id, title: item?.name})}>
      <Image source={{uri: item.imageUrl.url}} style={styles.image} />
      <View style={styles.wrapper}>
        <Text numberOfLines={1} style={styles.categoryText}>{item.name}</Text>
        <Text style={styles.itemText}>{item.products.length} items</Text>
      </View>
      <View style={styles.circle}>
        <AntDesign name="arrowright" size={24} color={COLORS.primary} />
      </View>
    </TouchableOpacity>
  )
}

export default CategoryCard;

const styles = StyleSheet.create({
  container: {
    width: "45%",
    height: 200,
    position: "relative",
    shadowColor: '#000',
    shadowOffset: {width: -1, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: COLORS.gray2,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  wrapper: {
    position: "absolute",
    bottom: 20,
    left: 5,
    right: 5,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    paddingHorizontal: 2,
    paddingVertical: 4,
    borderRadius: 5
  },
  categoryText: {
    color: COLORS.lightWhite,
    fontSize: 16,
    fontWeight: "bold",
  },
  itemText: {
    color: COLORS.lightWhite,
    fontSize: 12,
  },
  circle: {
    position: "absolute",
    backgroundColor: "rgba(255,255,255,0.5)",
    top: "40%",
    left: "40%",
    height: 50,
    width: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  }

});