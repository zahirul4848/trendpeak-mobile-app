import { StyleSheet, View, FlatList, ActivityIndicator, RefreshControl } from 'react-native'
import React from 'react'
import CategoryCard from '../components/CategoryCard'
import { useGetAllCategoriesQuery } from '../store/categoryApiSlice'
import { COLORS } from '../constants'

const CategoryScreen = ({navigation}) => {
  const {data, isLoading, refetch} = useGetAllCategoriesQuery();
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
        <FlatList
          data={data || []}
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
          renderItem={({ item }) => <CategoryCard item={item} navigation={navigation} />}
        />
      )}
    </View>
  )
}

export default CategoryScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  }
});