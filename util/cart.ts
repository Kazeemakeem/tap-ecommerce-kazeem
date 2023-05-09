import axios from 'axios';
import uuid from 'react-native-uuid'
import { getItem } from '../actions/auth'
import { useAppDispatch, useAppSelector } from '../redux/storeHooks'


// the data from the signup endpoint does not return any userID for reference
// The userIDs created here are just to mock the functionality
const newCartData = {
  userID: uuid.v4(),
  products: []
}

export const createCloudCart = async () => {
  return axios.post('user/cart', {
    method: 'POST',
    headers: ({
      'Authorization': `Bearer ${getItem('tap')}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }),
    data: newCartData
  })
  .then((res) => {
    console.log('my res', res.data)
    if(res.data.success.message === 'Cart Created'){
      console.log('Cart has been created')
    }else {
      console.log(res.data.success.message)
    }
  })
  .catch((err) => {
    console.log(err.response.message)
  })
}