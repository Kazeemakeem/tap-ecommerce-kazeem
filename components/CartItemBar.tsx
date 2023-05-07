
import { Button, ScrollView, Text, TouchableOpacity, View, Image } from 'react-native'
import { TrashIcon } from 'react-native-heroicons/outline'
import { useAppDispatch, useAppSelector } from '../redux/storeHooks'
import { removeFromCart, updateCartTotal } from '../redux/slices/cartSlice'
import colors from '../constants/colors'
import { formatCurrency } from "react-native-format-currency";


const CartItemBar = ({_id, price, name, quantity}) => {
	
	const dispatch = useAppDispatch()
	const [valueFormattedWithSymbol] = formatCurrency({ amount: price, code: "USD"})
	const [totalValueFormattedWithSymbol] = formatCurrency({ amount: Number(price*quantity), code: "USD"})

	const trashHandler = () => {
		dispatch(removeFromCart(_id))
		dispatch(updateCartTotal(-quantity))
	}
	return (
    <View className='flex-row items-center justify-between text-gray-500 font-bold'>
			<View className={`bg-[${colors.primary}] h-10 w-10 rounded`}>
				{/* Image goes here */}
			</View>
			<View className="">
				<Text className='text-sm text-left font-semibold'>{name}</Text>
				<Text className='text-sm text-left'>{valueFormattedWithSymbol} X {quantity} = <Text className='font-extrabold'> {totalValueFormattedWithSymbol}</Text></Text>
			</View>
			<TouchableOpacity
			onPress={trashHandler}>
				<TrashIcon size={24} color="gray"/>
			</TouchableOpacity>
		</View>
  )
}

export default CartItemBar