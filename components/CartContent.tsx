import React, { useState, useEffect } from 'react'
import { Button, ScrollView, Text, TouchableOpacity, View, Image } from 'react-native'
import { TrashIcon, XMarkIcon } from 'react-native-heroicons/outline'
import { useAppDispatch, useAppSelector } from '../redux/storeHooks'
import { emptyCart, removeFromCart, toggleCart, updateCartTotal } from '../redux/slices/cartSlice'
import CurrencyBar from './CurrencyBar'
import { useNavigation } from '@react-navigation/native'
import CartItemBar from './CartItemBar'



const CartContent = () => {
  
	const items = useAppSelector(state => state.cart.items)
  const cartTotal = eval(items.map(item => item['quantity']).join("+"))
  const totalCartCost = eval(items.map(item => (item['quantity']*item['totalPrice'])).join("+"))
  const cartOpen = useAppSelector(state => state.cart.openCart)
  const dispatch = useAppDispatch()
  const [orderID, setOrderID] = useState("")

  const handlePlaceOrder = () => {
    // 
  }
  return (
   <View className="w-full absolute px-3 bottom-20">
     {cartOpen && <View className="w-full shadow-lg shadow-black rounded-b-2xl pb-6 bg-white">
      <View className='border-b-2 border-t-2 border-gray-100 items-center flex-row justify-between pt-1 px-4'>
        <Text className='flex font-bold h-10 text-2xl text-gray-600 items-center'>Cart</Text>
        <XMarkIcon size={24} color="gray"
        onPress={() => dispatch(toggleCart(!cartOpen))}/>
      </View>
      <View className="max-h-[350px] min-h-[350px] items-center justify-center">
        {cartTotal && items.length ?
        <>
          <ScrollView className="flex mt-2 space-y-4 border-b-2 border-gray-200 pb-4 w-full px-6">
            {
            items.map(item => (
              <View key={item.productID} className="">
                <CartItemBar _id={item.productID} price={item.totalPrice} name={item.name} quantity={item.quantity}/>
              </View>
            ))
          }    
          </ScrollView>
          <View className="pt-2 mt-2 mx-4 w-full px-6">
            <CurrencyBar description="Subtotal" value={totalCartCost} emphasis={false} />
            <CurrencyBar description="Delivery Fee" value={1000} emphasis={false}/>
            <CurrencyBar description="Order Total" value={totalCartCost + 1000} emphasis={true}/>
          </View>
        </> : <Text className='text-gray-500 text-xl font-bold mt-4 text-center'>Your cart is empty.</Text>}
      </View>
      {cartTotal && items.length ? <View className='px-4 w-full mt-auto pt-4 rounded-2xl flex-row justify-end'>
          <TouchableOpacity 
            onPress={handlePlaceOrder}
            className="w-24 bg-[#00CCBB] rounded-lg flex items-center justify-center border-2 border-[#00CCBB]">
            <Text className="p-1 text-lg font-bold text-white">Place order</Text>
          </TouchableOpacity>
        </View> : null}
    </View>}
   </View>
  )
}

export default CartContent