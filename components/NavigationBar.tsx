import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { HeartIcon, HomeIcon, UserIcon } from 'react-native-heroicons/outline'
import { ShoppingCartIcon } from 'react-native-heroicons/outline'
import { useAppDispatch, useAppSelector } from '../redux/storeHooks'
import { getServerCart, toggleCart } from '../redux/slices/cartSlice'
import { useKeyboard } from '@react-native-community/hooks'
import { StackNavigationProp } from '@react-navigation/stack/'
import { UserStackParams } from '../navigation/User'
import colors from '../constants/colors'

export type NavigationBarProps = {
  routeName: string;
}

const NavigationBar = ({routeName}: NavigationBarProps) => {

  const [ label, setLabel ] = useState("Home")

  const navigation = useNavigation<StackNavigationProp<UserStackParams>>()
  const dispatch = useAppDispatch()
  const cart = useAppSelector(state => state.cart.items)
	const items = Array.from(Object.values(cart))
  const cartTotal = eval(items.map(item => item['quantity']).join("+"))
  const cartOpen = useAppSelector(state => state.cart.openCart)
  const wishList = useAppSelector(state => state.wishlist.items)
  const keyboard = useKeyboard()
 
    if((routeName === "Onboarding") || (routeName === "Signup") || (routeName === "Signin") || keyboard.keyboardShown) return null

    const cartLoader = () => {
      dispatch(toggleCart(!cartOpen))
      // dispatch(getServerCart())
    }

    const handler = (text = "Home") => {
      setLabel(text)
      //@ts-ignore
      text !== 'Cart' ? navigation.navigate(text) : cartLoader()
    }

    const navButton = (Icon: any, text: string) => (
      <TouchableOpacity 
        onPress={() => { handler(text) }}
        className="flex justify-center items-center relative">
        <Icon size={24} color={`${label === text ? 'white' : 'black'}`}/>
        <Text className={`text-${label === text ? 'white' : 'black'} font-bold text-xs`}>{text}</Text>
      </TouchableOpacity>
    ) 

  const navButtonWithCounter = ( Icon: any, text: string, count: number) => (
    <TouchableOpacity 
      onPress={() => handler(text)}
      className="flex justify-center items-center relative">
        <Icon size={24} color={`${label === text ? 'white' : 'black'}`}/>
        <Text className={`text-${label === text ? 'white' : 'black'} font-bold text-xs`}>{text}</Text>
        <View className="flex items-center justify-center bg-white w-4 h-4 absolute bottom-6 left-6 rounded-full"><Text className="text-sm text-red-500 font-bold">{ count }</Text></View>
      </TouchableOpacity>
  )
  
  return (
    <View className={`bg-[#fab005] flex-row px-6 py-2 justify-between`}>
      {navButton(HomeIcon, 'Home')}
      {navButtonWithCounter(HeartIcon, 'Wishlist', wishList.length)}
      {navButtonWithCounter(ShoppingCartIcon, 'Cart', cartTotal ? cartTotal : 0 )}
      {navButton(UserIcon, 'Profile')}
    </View>
  )
}

export default NavigationBar
