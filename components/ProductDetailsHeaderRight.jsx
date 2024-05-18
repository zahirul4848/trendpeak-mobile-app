import { Alert, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react';
import { COLORS } from "../constants";
import { Badge } from "@rneui/themed";
import {MaterialCommunityIcons, AntDesign} from "@expo/vector-icons";
import { useSelector } from 'react-redux';
import { useLazyGetUserProfileQuery, useToggleWishlistMutation } from '../store/userApiSlice';
import { useEffect } from 'react';
// import Share from "react-native-share";

const ProductDetailsHeaderRight = ({navigation, route}) => {
  const { cart } = useSelector(state=> state.cart);
  const { userInfo } = useSelector(state=> state.auth);
  const url = `https://trendpeakbd.com/product/${route?.params?.slug}`;
  
  const [toggleWishlist] = useToggleWishlistMutation();
  const [getUserProfile, {data: userProfile}] = useLazyGetUserProfileQuery();

  const handleToggleWishlist = async()=> {
    if(userInfo?.email) {
      try {
        await toggleWishlist({productId: route?.params?.id});
        getUserProfile();
      } catch (err) {
        Alert.alert(err?.data?.message || err.error);
      }
    } else {
      navigation.navigate("AuthStackScreen", {screen: "LoginScreen"});
    }
  }
  useEffect(() => {
    if(userInfo) {
      getUserProfile();
    }
  }, [userInfo]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.badgeContainer} onPress={handleToggleWishlist}>
        {userProfile?.wishlist?.includes(route?.params?.id) ? <AntDesign name="heart" size={24} color={COLORS.primary} /> : <AntDesign name="hearto" size={24} color={COLORS.secondary} />}
      </TouchableOpacity>
      <TouchableOpacity style={styles.badgeContainer} onPress={()=> Linking.openURL(url)}>
        <AntDesign name="sharealt" size={24} color={COLORS.primary} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.badgeContainer} onPress={()=> navigation.navigate("CartScreen")}>
        <MaterialCommunityIcons name="shopping-outline" size={24} color={COLORS.primary} />
        <Badge containerStyle={styles.badge} value={cart.length} status='error' />
      </TouchableOpacity>
    </View>
  )
}

export default ProductDetailsHeaderRight

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: "center",
    gap: 3,
  },
  badgeContainer: {
    position: "relative",
    marginRight: 20,
  },
  badge: {
    position: "absolute",
    right: -10,
    top: -10,
  }
})