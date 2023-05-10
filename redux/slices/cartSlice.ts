import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getItem } from '../../actions/auth';

type ShoppingCartItemType = {
  productID: string;
  name: string;
  quantity: number;
  basePrice: number;
  totalPrice: number;
}

type InitStateType = {
  userID: string;
  items: itemObj
  openCart: Boolean;
  cartTotal: number;
  loading: 'idle' | 'pending';
  error: string;
}

type itemObj = {
  [key: string]: ShoppingCartItemType
}

const initialState : InitStateType = {
  userID: '',
  items: {},
  openCart: false,
  cartTotal: 0,
  loading: 'idle',
  error: ""
}

const token = getItem('tap').then(res => res).catch(err => console.log(err))

export const getServerCart = createAsyncThunk('cart/getServerCart', async () => {
  return axios.get('user/cart', {
    method: 'GET',
    headers: ({
      'Authorization': `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }),
  })
  .then((res) => {
    console.log('my res', res.data)
    if(res.data.content.data){
      console.log('Cart has been synchronised')
      return res.data.content.data.products
    }else {
      console.log(res.data.success.message)
    }
  })
  .catch((err) => {
    console.log(err.response.message)
  })
})

 const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
      saveUserID: (state, action) => {
        state.userID += action.payload
      },

      addToCart: (state, action:PayloadAction<ShoppingCartItemType>) => {
        const newId = action.payload.productID
        const qty = action.payload.quantity
        if(state['items'].hasOwnProperty(newId)){
          state['items'][newId]['quantity'] = state['items'][newId]['quantity'] + qty
        }else{
          state['items'][newId] = action.payload
        }
      },

      removeFromCart: (state, action) => {
        delete state.items[action.payload]
      },

      updateCartTotal: (state, action) => {
        state.cartTotal += action.payload
      },

      toggleCart: (state, action) => {
        state.openCart = action.payload
      },

      emptyCart: (state) => {
        state.items = {}
      },
    },
    extraReducers: (builder) => {
      builder.addCase(getServerCart.pending, (state) => {
        if (state.loading === 'idle') {
          state.loading = 'pending'
        }
      })
      builder.addCase(getServerCart.fulfilled, (state, action) => {
        if (state.loading === 'pending') {
          state.items = action.payload
          state.loading = 'idle'
        }
      })
      builder.addCase(getServerCart.rejected, (state) => {
        if (state.loading === 'pending') {
          state.loading = 'idle'
          state.error = 'Error occured'
        }
      })
    },
  })

 export default cartSlice.reducer
 export const { saveUserID, addToCart, removeFromCart, updateCartTotal, toggleCart, emptyCart } = cartSlice.actions