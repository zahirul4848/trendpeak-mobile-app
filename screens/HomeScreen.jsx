import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, ScrollView, RefreshControl, ActivityIndicator } from 'react-native'
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { COLORS } from '../constants';
import CarouselCardItem from "../components/CarouselCardItem";
import CategoryMenu from '../components/CategoryMenu';
import ProductCard from '../components/ProductCard';
import { useGetAllCategoriesQuery } from '../store/categoryApiSlice';
import { useGetAllProductsQuery } from '../store/productApiSlice';
import { useScrollToTop } from '@react-navigation/native';
import CategoryMenuMore from '../components/CategoryMenuMore';

import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useGetUserProfileQuery } from '../store/userApiSlice';
import { useSelector } from 'react-redux';

const HomeScreen = ({navigation}) => {
  const [search, setSearch] = useState("");
  const [requestRefetch, setRequestRefetch] = useState(false);
  const { userInfo } = useSelector(state=> state.auth);
  const {data: userProfile, refetch: userRefetch} = useGetUserProfileQuery();
  const {
    data: categoryList, 
    refetch: categoryRefetch
  } = useGetAllCategoriesQuery();
  const {data: productsData, isLoading, refetch} = useGetAllProductsQuery({pageSize: 10});
  
  const updateSearch = () => {
    navigation.navigate("ProductListScreen", {name: search, title: search})
  };
  
  const ref = useRef(null);
  useScrollToTop(ref);

  useEffect(() => {
    categoryRefetch();
    refetch();
    if(userInfo?.email) {
      userRefetch();
    }
  }, [])
  
  useEffect(() => {
    if(requestRefetch) {
      userRefetch();
      setRequestRefetch(false);
    }
  }, [requestRefetch])
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={{paddingHorizontal: 10, marginBottom: 90}}>
        <View style={styles.topContainer}>
          <TouchableOpacity 
            onPress={()=> navigation.openDrawer()}
            style={styles.btnContainer}
          >
            <MaterialCommunityIcons name="sort-variant" size={26} color="black" />
          </TouchableOpacity>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={24} />
            <TextInput 
              returnKeyLabel="search" 
              returnKeyType="search" 
              style={styles.searchInput} 
              placeholder="Search"
              onChangeText={(text)=> setSearch(text)}
              onSubmitEditing={updateSearch}
              value={search}
            />
          </View>
        </View>
        
        <ScrollView 
          ref={ref}
          showsVerticalScrollIndicator={false}
        >
          <Fragment>
            <CarouselCardItem/>
            <View style={styles.categoryMenuContainer}>
              <FlatList
                data={categoryList || []}
                keyExtractor={(data)=> data._id}
                horizontal={true}
                alwaysBounceVertical={false}
                alwaysBounceHorizontal={true}
                renderItem={({ item }) => <CategoryMenu item={item} navigation={navigation} />}
                ListFooterComponent={<CategoryMenuMore navigation={navigation} />}
              />
            </View>
            <View style={styles.productCardContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.categoryTitle}>Featured Products</Text>
                <TouchableOpacity onPress={()=> navigation.navigate("ProductListScreen", {})}>
                  <Text style={styles.seeMore}>See More</Text>
                </TouchableOpacity>
              </View>
              {isLoading && (
                <ActivityIndicator style={{marginTop: 50}} />
              )}
              <FlatList
                scrollEnabled={false}
                data={productsData?.products || []}
                keyExtractor={(data)=> data._id}
                horizontal={false}
                numColumns={2}
                columnWrapperStyle={{
                  justifyContent: 'space-between',
                  marginBottom: 10,
                }}
                refreshControl={
                  <RefreshControl refreshing={isLoading} onRefresh={refetch} />
                }
                renderItem={({ item }) => <ProductCard setRequestRefetch={setRequestRefetch} userProfile={userProfile} product={item} navigation={navigation} />}
              />
            </View> 
          </Fragment>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    marginTop: 0,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent:'space-between',
    //alignItems: 'center',
    paddingTop: 10,
    gap: 20,
    marginBottom: 5,
  },
  btnContainer: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.gray,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 1
  },
  btnImg: {
    width: 18,
    height: 14,
    borderRadius: 1,
  },
  
  categoryMenuContainer: {
    paddingVertical: 10,
    backgroundColor: COLORS.white,
    height: "auto"
  },
  productCardContainer: {
    backgroundColor: COLORS.lightGray,
    padding: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  seeMore: {
    color: COLORS.primary,
    fontSize: 16,
  },
  badgeContainer: {
    position: "relative",
    marginRight: 20,
  },
  badge: {
    position: "absolute",
    right: -10,
    top: -10,
  },

  searchContainer: {
    height: 40,
    backgroundColor: COLORS.gray,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  searchInput: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginLeft: 10,
    width: "80%",
  }
})