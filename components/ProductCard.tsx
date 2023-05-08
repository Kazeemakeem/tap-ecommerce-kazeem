import { useEffect, useState } from 'react'
import { Button, Image, Text, TouchableOpacity, View } from 'react-native'
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/solid'
import { HeartIcon as HeartOutline } from 'react-native-heroicons/outline'
import { HeartIcon as HeartSolid } from 'react-native-heroicons/solid'
import { useRoute } from '@react-navigation/native'
import FlashMessage, {showMessage, hideMessage} from "react-native-flash-message";
import colors from '../constants/colors'
import { NumericFormat } from 'react-number-format'
import { AirbnbRating } from 'react-native-ratings'
import { formatCurrency } from "react-native-format-currency";
import { ActionButton } from './Button'
import { addToWishlist, removeFromWishlist } from '../redux/slices/wishlistSlice'
import { useAppDispatch, useAppSelector } from '../redux/storeHooks'
import { addToCart } from '../redux/slices/cartSlice'


export type ProductCardProp = {
	_id: string;
	name: string;
	description: string;
	discount: number;
	price: number;
	rating: number;
}
const ProductCard = ({ _id, name, description, discount, price, rating }: ProductCardProp) => {
	// description, price, image, discount, rating
	// const wishList = useAppSelector(state => state.wishlist.items)
	const wishListIds = useAppSelector(state => state.wishlist.items).map(item => item._id)
	// const items = Array.from(Object.values(useAppSelector(state => state.cart.items)))
	const dispatch = useAppDispatch()
	// const [ isPressed, setIsPressed ] = useState(false)
	// const [ quantity, setQuantity ] = useState(0)
	const [ wishlisted, setWishlisted ] = useState(false)
	const [ quantity, setQuantity ] = useState(0)
	

	useEffect(() => {
		wishListIds.includes(_id) ? setWishlisted(true) : setWishlisted(false)
	}, [wishListIds])

	const handleAddToCart = () => {
		const newItem = {
			productID: _id,
			name,
			quantity,
			basePrice: price,
			totalPrice: price
		}
		dispatch(addToCart(newItem))
		wishlisted && dispatch(removeFromWishlist(_id))
		setQuantity(0)
		showMessage({
			message: "Success!",
			description: "Item added to cart",
			type: "success",
		});
	}

	const wishlistHandler = () => {
		// setWishlisted(!wishlisted)
		!wishlisted && dispatch(addToWishlist({ _id, name, description, discount, price, rating }))
		// console.log(wishListIds)
		wishlisted && dispatch(removeFromWishlist(_id))
	}

	const [valueFormattedWithSymbol] = formatCurrency({ amount: price, code: "USD"})
	
  return (
    <TouchableOpacity className='flex-row space-x-4 py-4 border-b-2 border-gray-300'>
			<View className='w-36 h-48 rounded-lg border-2 border-gray-200 flex items-center justify-center'>
				<View className={`w-24 h-24 bg-[#fab005] rounded-full`}>
				</View>
			</View>
			<View className='flex justify-between pb-8 pt-2'>
				<Text className='text-lg'>{name}</Text>
				<View className='bg-red-100 w-20 flex items-center rounded-sm'>
					<Text className='text-red-500 p-1'>|  {discount} % OFF  |</Text>
				</View>
				<Text className='text-lg'>{valueFormattedWithSymbol}</Text>
				<View>
					<AirbnbRating
						count={5}
						defaultRating={Math.round(rating)}
						size={16}
						selectedColor={colors.primary}
						showRating={false}
						isDisabled={true}
					/>
				</View>
				<View className="flex-row justify-between w-28 items-center mb-2">
					<TouchableOpacity onPress={() => {
						quantity && setQuantity(quantity - 1)
					}}>
						<MinusCircleIcon size={30} color="#00CCBB"/>
					</TouchableOpacity>

					<Text>{quantity}</Text>

					<TouchableOpacity onPress={() => {
						setQuantity(quantity + 1)
					}}>
						<PlusCircleIcon size={30} color="#00CCBB"/>
					</TouchableOpacity>
				</View>
				<View className='absolute bottom-0 left-0'>
					<ActionButton text={"ADD TO CART"} onPressHandler={handleAddToCart} isWide={false}/>
				</View>
			</View>
			<TouchableOpacity className="absolute -left-4 top-4 w-10 h-10 flex items-center justify-center rounded-br-xl rounded-tl-xl bg-gray-400"
				onPress={wishlistHandler}>
				{ wishlisted ? <HeartSolid size={30} color={colors.primary}/> : <HeartOutline size={30} color="white"/> }
			</TouchableOpacity>
		</TouchableOpacity>
  )
}

export default ProductCard