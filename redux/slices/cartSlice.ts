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
  items: ShoppingCartItemType[];
  openCart: Boolean;
  cartTotal: number;
  loading: 'idle' | 'pending';
  error: string;
}

const initialState : InitStateType = {
  userID: '',
  items: [],
  openCart: false,
  cartTotal: 0,
  loading: 'idle',
  error: ""
}

export const getServerCart = createAsyncThunk('cart/getServerCart', async () => {
  return axios.get('user/cart', {
    method: 'GET',
    headers: ({
      'Authorization': `Bearer ${getItem('tap')}`,
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

// export const updateServerCart = createAsyncThunk('cart/updateServerCart', async (headers, data) => {
//   return axios.put('user/cart', {
//     method: 'PUT',
//     headers,
//     data
//   })
//   .then(res => {
//     //
//   })
//   .catch(err => {
//     console.log(err.response.message)
//   })
// })

 const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
      saveUserID: (state, action) => {
        state.userID += action.payload
      },

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