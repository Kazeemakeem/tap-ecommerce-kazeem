import { configureStore } from '@reduxjs/toolkit'
// import mainsReducer from '../components/main/mainContentSlice'
// import cartReducer from '../components/cart/cartSlice'
// import navbarReducer from '../components/navbar/navbarSlice'


const store = configureStore({
    reducer: {
        // mains: mainsReducer,
        // cart: cartReducer,
        // navbar: navbarReducer,
    },

    // middleware: (getDefaultMiddleware) => getDefaultMiddleware()

})

export default store
export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch