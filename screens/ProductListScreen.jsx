import { FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SearchBar } from '@rneui/themed'
import ProductCard from '../components/ProductCard';
import { Ionicons } from '@expo/vector-icons';
import { useGetAllProductsQuery } from '../store/productApiSlice';
import { COLORS, commonStyles } from '../constants';
import SortingModal from '../components/SortingModal';

const ProductListScreen = ({navigation, route}) => {
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("");
  //console.log(order)
  const {data: productsData, isLoading, refetch} = useGetAllProductsQuery({
    name: search !== "all" ? search || route?.params?.name : "", categoryId: route?.params?.categoryId || "", order,
  });
  
  const updateSearch = (search) => {
    setSearch(search);
  };

  const toggleModal = ()=> {
    setOpenModal(prev=> !prev);
  }

  useEffect(() => {
    refetch();
  }, [])
  
  return (
    <View style={styles.container}>
      <View style={commonStyles.rowSB}>
        <SearchBar
          placeholder="Search product..."
          onChangeText={(text)=> updateSearch(text)}
          value={search}
          showLoading={isLoading}
          returnKeyType='search'
          lightTheme
          containerStyle={{
            backgroundColor: "transparent",
            borderColor: "transparent",
            border: "none",
            padding: 0,
            borderRadius: 10,
            margin: 0,
            width: "80%",
          }}
          inputStyle={{
            color: COLORS.primary,
          }}
          inputContainerStyle={{
            backgroundColor: COLORS.lightGray,
            //borderRadius: 10,
          }}
        />
        <TouchableOpacity
          onPress={()=> setOpenModal(prev=> !prev)}
          style={styles.btnContainer}
        >
          <Ionicons name="filter" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
      </View>
      <View style={styles.productsContainer}>
        {productsData && productsData?.products?.length === 0 && (
          <Text style={{textAlign: "center"}}>No Product Found!</Text>
        )}
        <FlatList
          data={productsData?.products || []}
          showsVerticalScrollIndicator={false}
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
      <SortingModal
        toggleModal={toggleModal}
        openModal={openModal}
        setOrder={setOrder}
      />
    </View>
  )
}

export default ProductListScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  btnContainer: {
    width: 47.5,
    height: 47.5,
    backgroundColor: COLORS.lightGray,
    borderRadius: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btnImg: {
    width: 30,
    height: 30,
    borderRadius: 1,
  },
  productsContainer: {
    marginTop: 10,
    marginBottom: 100,
  }
  ,

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});