import React, { useState, useEffect } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import ProductCard, { ProductCardProp } from '../components/ProductCard'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet, FlatList, ScrollView, View, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack/';
import { UserStackParams } from '../navigation/User';
import useAxios from '../util/axios';
import { ActionButton } from '../components/Button';



const ProductsScreen = () => {

  const navigation = useNavigation<StackNavigationProp<UserStackParams>>()

  const { response, loading, error } = useAxios({
    method: 'get',
    url: '/product',
    headers: null,
    body: null,
});

  const [data, setData] = useState([]);
  const [getAllProducts, setGetAllProducts] = useState(false)
  
  useEffect(() => {
    if (response !== null) {
      //@ts-ignore
        setData(response.content.data);
    }
}, [response]);

    const route = useRoute<any>()
    const { params } = route
    const { _id, name } = params

    //@ts-ignore
    const categoryProducts = data.filter(item => item.categoryID === _id)
    const mapArr = getAllProducts ? data : categoryProducts

    const viewAllHandler = () =>{
      setGetAllProducts(!getAllProducts)
      navigation.setOptions({title: getAllProducts ? name : "Products"})
    }

  return (
    <SafeAreaView className='px-3'>
      <View className='flex items-end justify-center mb-4'>
        <ActionButton text={getAllProducts ? name.toUpperCase() : "VIEW ALL"} onPressHandler={viewAllHandler} isWide={false} />
      </View>
       {mapArr.length ? 
        <ScrollView>
          <View className='flex justify-between px-3 pb-24'>
            { mapArr.map(item => (
              //@ts-ignore
              <ProductCard key={item._id}
              //@ts-ignore 
              _id={item._id}
              //@ts-ignore 
              name={item.name}
              //@ts-ignore 
              description={item.description}
              //@ts-ignore
              discount={item.discount}
              //@ts-ignore
              price={item.price}
              //@ts-ignore
              rating={item.averageRating/7}
              />
            ))}
            {error && <Text className='text-xl font-bold'>{error}</Text>}
            {loading && <Text className='text-xl font-bold'>Loading...</Text>}
          </View>
        </ScrollView> : 
        <View className="flex-row items-center justify-center bg-white">
          <Text className="py-72 px-3 text-xl font-bold">No product for this category</Text>
        </View>}
    </SafeAreaView>
  )
}

export default ProductsScreen