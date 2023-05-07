import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type ShoppingCartItemType = {
  productID: string;
  name: string;
  quantity: number;
  basePrice: number;
  totalPrice: number;
}

type InitStateType = {
  items: ShoppingCartItemType[];
  openCart: Boolean;
  cartTotal: number;
}

const initialState : InitStateType = {
  items: [],
  openCart: false,
  cartTotal: 0,
}

 
 const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
      addToCart: (state, action:PayloadAction<ShoppingCartItemType>) => {
         state.items = state.items.concat(action.payload)
      },

      removeFromCart: (state, action) => {
        state.items = state.items.filter(item => item.productID !== action.payload)
      },

      updateCartTotal: (state, action) => {
        state.cartTotal += action.payload
      },

      toggleCart: (state, action) => {
        state.openCart = action.payload
      },

      emptyCart: (state) => {
        state.items = []
      },


    }
  })

 export default cartSlice.reducer
 export const { addToCart, removeFromCart, updateCartTotal, toggleCart, emptyCart } = cartSlice.actions