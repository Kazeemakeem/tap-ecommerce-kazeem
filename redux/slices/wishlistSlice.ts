import { createSlice } from '@reduxjs/toolkit'

type wishListItemType = {
  _id: string; 
  name: string; 
  description: string; 
  discount: number; 
  price: number; 
  rating: number; 
}

type initStateType ={
  items: wishListItemType[]
}

const initialState: initStateType = {
  items: [],
}

 
 const wishlistSlice = createSlice({
     name: 'wishlist',
     initialState,
    reducers: {
      addToWishlist: (state, action) => {
        state.items = [ ...state.items, action.payload ]
      },

      removeFromWishlist: (state, action) => {
        state.items = state.items.filter(item => item._id !== action.payload)
      },

      // toggleWishlist: (state, action) => {
      //   state.openWishlist = action.payload
      // }
    }
  })

 export default wishlistSlice.reducer
 export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions