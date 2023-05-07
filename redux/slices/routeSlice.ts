import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  screenName: ""
}

 const routeSlice = createSlice({
    name: 'route',
    initialState,
    reducers: {
      setScreenName: (state, action) => {
        state.screenName = action.payload
      },
    }
  })

 export default routeSlice.reducer
 export const { setScreenName } = routeSlice.actions