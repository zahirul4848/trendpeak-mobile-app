import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { COLORS, baseApiUrl, images } from '../constants';
import { AntDesign } from '@expo/vector-icons';
import CartModal from './CartModal';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { useGetUserProfileQuery, useToggleWishlistMutation } from '../store/userApiSlice';
import { useEffect } from 'react';

const ProductCard = ({navigation, product}) => {
  const dispatch = useDispatch();
  const {userInfo} = useSelector(state=> state.auth);
  const [openModal, setOpenModal] = useState(false);
  
  const [toggleWishlist] = useToggleWishlistMutation();
  const {data: userProfile, refetch} = useGetUserProfileQuery();
  const toggleModal = ()=> {
    setOpenModal(prev=> !prev);
  }
  const handleBuyNow = ()=> {
    dispatch(addToCart({item: {...product, count: 1}}));
    setOpenModal(prev=> !prev);
  }

  const handleToggleWishlist = async(productId)=> {
    if(userInfo?.email) {
      try {
        await toggleWishlist({productId});
        refetch();
      } catch (err) {
        Alert.alert(err?.data?.message || err.error);
      }
    } else {
      navigation.navigate("AuthStackScreen", {screen: "LoginScreen"});
    }
  }

  useEffect(() => {
    if(userInfo) {
      refetch();
    }
  }, [userInfo]);

  return (
    <TouchableOpacity onPress={()=> navigation.navigate("ProductDetailsScreen", {id: product?._id, slug: product?.slug})} style={styles.container}>
      <Image source={{uri: product?.imageUrls[0]?.url}} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.categoryTxt}>{product?.category?.name}</Text>
        <Text numberOfLines={2} style={styles.titleTxt}>{product?.title}</Text>
        <View style={styles.pricingContainer}>
          <Text style={styles.priceTxt}>Tk.{product?.price}</Text>
          <TouchableOpacity style={styles.button} onPress={handleBuyNow}>
            <Text style={styles.buttonText}>Buy Now</Text>
          </TouchableOpacity>
        </View>        
      </View>
      <TouchableOpacity style={styles.heartIcon} onPress={()=> handleToggleWishlist(product?._id)}>
        {userProfile?.wishlist?.includes(product?._id) ? <AntDesign name="heart" size={24} color={COLORS.primary} /> : <AntDesign name="hearto" size={24} color={COLORS.secondary} />}
      </TouchableOpacity>
      <CartModal
        openModal={openModal} 
        setOpenModal={setOpenModal} 
        toggleModal={toggleModal}
        product={product}
        navigation={navigation}
      />
    </TouchableOpacity>
  )
}

export default ProductCard

const styles = StyleSheet.create({
  container: {
    width: "48%",
    height: "auto",
    backgroundColor: COLORS.lightWhite,
    position: "relative",
    shadowColor: '#000',
    shadowOffset: {width: -1, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  image: {
    width: "100%",
    height: 150,
  },
  textContainer: {
    padding: 10,
  },
  categoryTxt: {
    color: COLORS.gray2,
  },
  titleTxt: {
    fontWeight: "bold",
  },
  pricingContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconContainer: {
    flexDirection: "row",
    gap: 1,
    alignItems: "center",
  },
  ratingTxt: {
    color: COLORS.gray2,
    fontSize: 12,
  },
  priceTxt: {
    fontWeight: "bold",
    color: COLORS.primary,
    fontSize: 16,
  },
  heartIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  button: {
    backgroundColor: COLORS.secondary,
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: COLORS.lightWhite,
    fontSize: 10
  }
});