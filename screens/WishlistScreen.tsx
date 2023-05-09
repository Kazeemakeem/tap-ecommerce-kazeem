import React from 'react'
import { ScrollView, View } from 'react-native'
import { useAppSelector } from '../redux/storeHooks'
import ProductCard from '../components/ProductCard'

const WishlistScreen = () => {

  const wishlist = useAppSelector(state => state.wishlist.items)

  return (
    <ScrollView>
      <View className='flex justify-between px-3 pb-24'>
        {wishlist.map(item => (
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
      </View>
   </ScrollView>
  )
}

export default WishlistScreen