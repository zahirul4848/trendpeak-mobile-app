import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import CarouselDetailsProduct from '../components/CarouselDetailsProduct';
import { COLORS, commonStyles } from '../constants';
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import AboutItem from '../components/AboutItem';
import RatingAndReviews from '../components/RatingAndReviews';
import ProductDetailsFooter from '../components/ProductDetailsFooter';
import { useGetProductQuery, useLazyGetAllProductsQuery } from '../store/productApiSlice';
import ProductCard from '../components/ProductCard';
import { useScrollToTop } from '@react-navigation/native';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import { useGetUserProfileQuery } from '../store/userApiSlice';
import { useSelector } from 'react-redux';

const descriptionTypes = ["About Item", "Reviews"];


const ProductDetailsScreen = ({navigation, route}) => {
  const [activeDescriptionType, setActiveDescriptionType] = useState("About Item");
  const [requestRefetch, setRequestRefetch] = useState(false);
  const { userInfo } = useSelector(state=> state.auth);
  const {data: userProfile, refetch: userRefetch} = useGetUserProfileQuery();
  const {data: product, isLoading, refetch} = useGetProductQuery(route?.params?.id);
  const [getAllProducts, {data: categoryWiseProducts, isLoading: loadingCategoryProducts}] = useLazyGetAllProductsQuery();

  const ref = useRef(null);

  useScrollToTop(ref);

  useEffect(() => {
    refetch();
    if(userInfo?.email) {
      userRefetch();
    }
    if(product) {
      const fetchCategoryWiseProduct = async()=> {
        await getAllProducts({categoryId: product.category._id}).unwrap();
      }
      fetchCategoryWiseProduct();
    }
  }, [product]);

  useEffect(() => {
    if(requestRefetch) {
      userRefetch();
      setRequestRefetch(false);
    }
  }, [requestRefetch])
  
  return (
    <View style={{flex: 1}}>
      {isLoading && (
        <ActivityIndicator style={{marginTop: 20}} size="large" color={COLORS.primary} />
      )}
      {product && (
        <>
        <KeyboardAvoidingWrapper>
          <ScrollView
            ref={ref}
            showsVerticalScrollIndicator={false}
          >
            <CarouselDetailsProduct carouselImages={product.imageUrls} />
            <View style={styles.container}>
              <View style={commonStyles.row}>
                <Ionicons name="grid-outline" size={16} color={COLORS.secondary} />
                <Text style={commonStyles.subTxt}>{product.category.name}</Text>
              </View>
              <Text style={[commonStyles.titleTxt, {marginVertical: 10}]} numberOfLines={2}>{product.title}</Text>
              <View style={commonStyles.rowSB}>
                <View style={commonStyles.row}>
                  <AntDesign name="star" size={12} color="gold" />
                  <Text style={commonStyles.subTxt}>{product.rating} Ratings</Text>  
                </View>
                <Entypo name="dot-single" size={24} color={COLORS.primary} />
                <Text style={commonStyles.subTxt}>{product.reviews.length} Reviews</Text>
                <Entypo name="dot-single" size={24} color={COLORS.primary} />
                <Text style={commonStyles.subTxt}>{product.stock > 0 ? <Text style={{color: COLORS.primary}}>In Stock</Text> : <Text style={{color: "red"}}>Unavailable</Text>}</Text>
              </View>
              
              <View style={styles.tabsContainer}>
                <FlatList
                  data={descriptionTypes}
                  keyExtractor={item=> item}
                  horizontal
                  contentContainerStyle={{
                    flex: 1,
                    alignItems: "center",
                    borderBottomColor: COLORS.lightGray2,
                    borderBottomWidth: 1,
                  }}
                  renderItem={({item})=> (
                    <TouchableOpacity 
                      style={styles.tab(activeDescriptionType, item)}
                      onPress={()=> {
                        setActiveDescriptionType(item);
                      }}
                    >
                      <Text style={styles.tabTxt(activeDescriptionType, item)}>{item}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
              {
                activeDescriptionType === "About Item" ? 
                <AboutItem product={product} />
                :
                <RatingAndReviews refetch={refetch} product={product}/>
              }
              <View>
                <View style={styles.titleContainer}>
                  <Text style={{fontSize: 18, fontWeight: "bold"}}>Recomendation</Text>
                  <TouchableOpacity onPress={()=> navigation.navigate("ProductListScreen", {categoryId: product.category._id, title: product.category.name})}>
                    <Text style={styles.seeMore}>See More</Text>
                  </TouchableOpacity>
                </View>
                {loadingCategoryProducts && <ActivityIndicator/>}
                <FlatList
                  scrollEnabled={false}
                  data={categoryWiseProducts?.products || []}
                  keyExtractor={(data)=> data._id}
                  horizontal={false}
                  numColumns={2}
                  columnWrapperStyle={{
                    justifyContent: 'space-between',
                    marginBottom: 10,
                  }}
                  renderItem={({ item }) => <ProductCard setRequestRefetch={setRequestRefetch} userProfile={userProfile} product={item} navigation={navigation} />}
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingWrapper>
        <View style={{height: 100}}>
          <ProductDetailsFooter navigation={navigation} product={product} />
        </View>
        </>
      )}
    </View>
    
  )
}

export default ProductDetailsScreen

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    padding: 10,
  },
  tabsContainer: {
    marginTop: 10,
  },
  tab: (activeDescriptionType, item) => ({
    width: "50%",
    paddingVertical: 10,
    borderBottomWidth: activeDescriptionType === item ? 1 : 0,
    borderColor: activeDescriptionType === item ? COLORS.primary : COLORS.secondary,
  }),
  tabTxt: (activeDescriptionType, item) => ({
    width: "100%",
    fontSize: 16,
    color: activeDescriptionType === item ? COLORS.primary : COLORS.gray2,
  }),
  titleContainer: {
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    marginVertical: 15,
  },
  seeMore: {
    color: COLORS.primary,
    fontSize: 16,
  },
});