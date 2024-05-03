import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react';
import { COLORS, baseApiUrl } from '../constants';

const CategoryMenu = ({item, navigation}) => {
  return (
    <TouchableOpacity style={styles.container}
      onPress={()=> navigation.navigate("ProductListScreen", {categoryId: item?._id, title: item?.name})}
    >
      <View style={styles.iconContainer}>
        <Image source={{uri: item.imageUrl?.url}} style={styles.image} />
      </View>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  )
}

export default CategoryMenu;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: "center",
    width: 100,
    height: 100,
  },
  iconContainer: {
    backgroundColor: COLORS.lightGray,
    alignItems: 'center',
    justifyContent: "center",
    borderRadius: 10,
  },
  icon: {
    padding: 10,
  },
  image: {
    width: 64,
    height: 64,
    resizeMode: "cover",
    borderRadius: 10,
  }

});