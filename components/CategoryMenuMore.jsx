import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react';
import { COLORS } from '../constants';
import { Feather } from '@expo/vector-icons';

const CategoryMenuMore = ({navigation}) => {
  return (
    <TouchableOpacity style={styles.container}
      onPress={()=> navigation.navigate("CategoryScreen")}
    >
      <View style={styles.iconContainer}>
        <Feather name="more-horizontal" size={24} color="black" />
      </View>
      <Text>See More</Text>
    </TouchableOpacity>
  )
}

export default CategoryMenuMore;

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
    padding: 10,
    marginBottom: 10
  },
});