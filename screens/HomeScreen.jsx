import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, FlatList, ScrollView, RefreshControl, Platform, StatusBar, Image } from 'react-native'
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { COLORS, icons } from '../constants';
import CarouselCardItem from "../components/CarouselCardItem";
import CategoryMenu from '../components/CategoryMenu';
import ProductCard from '../components/ProductCard';
import { SearchBar } from '@rneui/themed';
import { useGetAllCategoriesQuery } from '../store/categoryApiSlice';
import { useGetAllProductsQuery } from '../store/productApiSlice';
import { useScrollToTop } from '@react-navigation/native';
import CategoryMenuMore from '../components/CategoryMenuMore';

const HomeScreen = ({navigation}) => {
  const [search, setSearch] = useState("");
  const {
    data: categoryList, 
    refetch: categoryRefetch
  } = useGetAllCategoriesQuery();
  const {data: productsData, isLoading, refetch} = useGetAllProductsQuery({pageSize: 4});
  
  const updateSearch = () => {
    navigation.navigate("ProductListScreen", {name: search, title: search})
  };
  
  const ref = useRef(null);
  useScrollToTop(ref);

  useEffect(() => {
    categoryRefetch();
    refetch();
  }, [])
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={{paddingHorizontal: 10, paddingBottom: 70}}>
        <View style={styles.topContainer}>
          <TouchableOpacity 
            onPress={()=> navigation.openDrawer()}
            style={styles.btnContainer}
          >
            <Image source={icons.menu_primary} resizeMode="cover" style={styles.btnImg}/>
          </TouchableOpacity>
          <SearchBar
            placeholder="Search product..."
            onChangeText={(text)=> setSearch(text)}
            value={search}
            onSubmitEditing={updateSearch}
            returnKeyType='search'
            lightTheme
            containerStyle={{
              backgroundColor: "transparent",
              borderColor: "transparent",
              borderWidth: 0,
              padding: 0,
              width: "80%",
              margin: 0,
              borderTopColor: "transparent",
              borderBottomColor: "transparent",
              marginBottom: 10,
            }}
            inputStyle={{
              color: COLORS.primary,
            }}
            inputContainerStyle={{
              backgroundColor: COLORS.lightGray,
            }}
            
            labelStyle={{
              backgroundColor: "green"
            }}
          />
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
                <Text style={styles.categoryTitle}>Featured Product</Text>
                <TouchableOpacity onPress={()=> navigation.navigate("ProductListScreen", {})}>
                  <Text style={styles.seeMore}>See More</Text>
                </TouchableOpacity>
              </View>
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
                renderItem={({ item }) => <ProductCard product={item} navigation={navigation} />}
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
  },
  btnContainer: {
    width: 47.5,
    height: 47.5,
    backgroundColor: COLORS.lightGray,
    borderRadius: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 1
  },
  btnImg: {
    width: 22,
    height: 16,
    borderRadius: 1,
  },
  searchInputContainer: {
    position: 'relative',
  },
  searchInput: {
    width: 250,
    height: 50,
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 40,
  },
  searchIcon: {
    position: 'absolute',
    top: 12,
    left: 10,
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
    fontSize: 22,
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
  }
})