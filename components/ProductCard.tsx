import { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/solid'
import { HeartIcon as HeartOutline } from 'react-native-heroicons/outline'
import { HeartIcon as HeartSolid } from 'react-native-heroicons/solid'
import { showMessage } from "react-native-flash-message"
import colors from '../constants/colors'
import { AirbnbRating } from 'react-native-ratings'
import { formatCurrency } from "react-native-format-currency"
import { ActionButton } from './Button'
import { addToWishlist, removeFromWishlist } from '../redux/slices/wishlistSlice'
import { useAppDispatch, useAppSelector } from '../redux/storeHooks'
import { addToCart } from '../redux/slices/cartSlice'
import uuid from 'react-native-uuid'
import axios from 'axios';
import { getItem } from '../actions/auth'


export type ProductCardProp = {
	_id: string;
	name: string;
	description: string;
	discount: number;
	price: number;
	rating: number;
}
const ProductCard = ({ _id, name, description, discount, price, rating }: ProductCardProp) => {
	const wishListIds = useAppSelector(state => state.wishlist.items).map(item => item._id)
	const dispatch = useAppDispatch()
	const [ wishlisted, setWishlisted ] = useState(false)
	const [ quantity, setQuantity ] = useState(0)
	const cart = useAppSelector(state => state.cart.items)
	const currentCartProducts = Array.from(Object.values(cart))

	useEffect(() => {
		wishListIds.includes(_id) ? setWishlisted(true) : setWishlisted(false)
	}, [wishListIds])

	const updatedCartData = {
		userID: uuid.v4(),
		products: currentCartProducts
	}

	const updateCloudCart = async () => {
		return axios.put('user/cart', {
			method: 'PUT',
			headers: ({
				
				'Authorization': `Bearer ${token}`,
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}),
			data: updatedCartData
		})
		.then((res) => {
			if(res.data.success.message === 'Cart Updated'){
			console.log(res.data.success.message)
			}else{
				console.log(res.data.success.message)
			}
		})
		.catch((err) => {
			console.log(err.response.message)
		})
	}

	const token = getItem('tap').then(res => res).catch(err => console.log(err))
	
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
		updateCloudCart()
	}

	const wishlistHandler = () => {
		!wishlisted && dispatch(addToWishlist({ _id, name, description, discount, price, rating }))
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