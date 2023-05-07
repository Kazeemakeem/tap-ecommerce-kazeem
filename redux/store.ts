import { configureStore } from '@reduxjs/toolkit'
import wishListReducer from './slices/wishlistSlice'
import routeReducer from './slices/routeSlice'
import cartReducer from './slices/cartSlice'


const store = configureStore({
	reducer: {
		wishlist: wishListReducer,
		route: routeReducer,
		cart: cartReducer,
	},

	// middleware: (getDefaultMiddleware) => getDefaultMiddleware()

})

export default store
export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch