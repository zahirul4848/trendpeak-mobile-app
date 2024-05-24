import { FlatList, RefreshControl, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard';
import { Ionicons } from '@expo/vector-icons';
import { useGetAllProductsQuery } from '../store/productApiSlice';
import { COLORS, commonStyles } from '../constants';
import SortingModal from '../components/SortingModal';
import { useGetUserProfileQuery } from '../store/userApiSlice';

const ProductListScreen = ({navigation, route}) => {
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("");
  const [requestRefetch, setRequestRefetch] = useState(false);
  const {data: userProfile, refetch: userRefetch} = useGetUserProfileQuery();
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
    userRefetch();
  }, [])

  useEffect(() => {
    if(requestRefetch) {
      userRefetch();
      setRequestRefetch(false);
    }
  }, [requestRefetch])
  
  return (
    <View style={styles.container}>
      <View style={[commonStyles.rowSB, {gap: 20}]}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={24} />
          <TextInput
            returnKeyLabel="search" 
            returnKeyType="search" 
            style={styles.searchInput} 
            placeholder="Search"
            onChangeText={(text)=> updateSearch(text)}
            onSubmitEditing={updateSearch}
            value={search}
          />
        </View>
        <TouchableOpacity
          onPress={()=> setOpenModal(prev=> !prev)}
          style={styles.btnContainer}
        >
          <Ionicons name="filter" size={26} color="black" />
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
          renderItem={({ item }) => <ProductCard setRequestRefetch={setRequestRefetch} userProfile={userProfile} product={item} navigation={navigation} />}
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
    width: 40,
    height: 40,
    backgroundColor: COLORS.gray,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 1
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
    width: "100%",
  }
});