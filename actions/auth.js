import AsyncStorage from '@react-native-async-storage/async-storage'
// import fetch from 'isomorphic-fetch'
// import cookie from 'js-cookie'
import {API} from '../utils'
import * as SecureStore from "expo-secure-store"
import { useNavigation } from '@react-navigation/native'


export const signup = (user) => {
    return fetch(`https://foodoo-api.onrender.com/api/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err))
  }

  export const signin = (user) => {
  
    // const API = process.env.NEXT_PUBLIC_PRODUCTION ? process.env.NEXT_PUBLIC_API_DEVELOPMENT : process.env.NEXT_PUBLIC_API_PRODUCTION
    
    return fetch(`https://foodoo-api.onrender.com/api/signin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err))
  }


  export const editinfo = (user) => {
    return fetch(`https://foodoo-api.onrender.com/api/editinfo`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(response => {

      return response.json();
    })
    .catch(err => console.log(err))
  }

  export const editPassword = (user) => {
    return fetch(`https://foodoo-api.onrender.com/api/editpassword`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err))
  }
  
  export const signout = async () => {
  
    // const API = process.env.NEXT_PUBLIC_PRODUCTION ? process.env.NEXT_PUBLIC_API_DEVELOPMENT : process.env.NEXT_PUBLIC_API_PRODUCTION
  
    removeItem('FoodooToken')
      .then(res => console.log(res))
      .catch(err => console.log(err))
  
    return fetch(`https://foodoo-api.onrender.com/api/signout`, {
      method: 'GET'
    })
    .then(response => {
      // console.log(response.json().message)
    })
    .catch(err => console.log(err))
  }
  
  // saving user details in the local storage for persistent user login (npm i js-cookie)
  
  // set cookie
  
  // export const setCookie = ( key, value) => {
  //   if(process.browser){
  //     cookie.set(key,value, {
  //       expires: 1
  //     })
  //   }
  // }
  
  // export const removeCookie = (key) => {
  //   if(process.browser){
  //     cookie.remove(key, {
  //       expires: 1
  //     })
  //   }
  // }
  // // get cookie
  
  // export const getCookie = (key) => {
  //   if(process.browser){
  //     return cookie.get(key)
  //   }
  // }
  
  // // local storage
  
  // export const setLocalStorage = ( key, value ) => {
  //   if(process.browser){
  //     localStorage.setItem(key, JSON.stringify(value))
  //   }
  // }
  
  // export const getLocalStorage = (key) => {
  //   if(process.browser){
  //     localStorage.getItem(key)
  //   }
  // }
  
  // export const removeLocalStorage = (key) => {
  //   if(process.browser){
  //     localStorage.removeItem(key)
  //   }
  // }
  
  // authenticate user by passing data to cookies and local storage

  // export const setItem = async (key, value) => {
  //   try {
  //     const jsonValue = JSON.stringify(value)
  //     await AsyncStorage.setItem(key, jsonValue)
  //   } catch (e) {
  //     // saving error
  //   }
  // }

  // const getItem = async (key) => {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem(key)
  //     return jsonValue != null ? JSON.parse(jsonValue) : null;
  //   } catch(e) {
  //     // error reading value
  //   }
  // }

  export async function setItem(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  export async function removeItem(key) {
    await SecureStore.deleteItemAsync(key);
  }
  
  export async function getItem(key) {
    let result = await SecureStore.getItemAsync(key);
    if(result) {
      return result;
    } 
    return false
  }

  // export async function setItem(key, value) {
  //     await AsyncStorage.setItem(key, JSON.stringify(value))
  //     .then(res => {
  //       //
  //     })
  //     .catch(err => false)
  // }
  
  // export async function getItem(key) {
  //   let result = await AsyncStorage.getItem(key)
  //   .then(res => {
  //   })
  //   .catch(err => console.log(err));
  //   if(result){
  //     return result
  //   }else{
  //     return false
  //   }
  // }
  

  export const authenticate = (data, next) => {
    setItem('FoodooToken', data.token)
    // setItem('FoodooUser', data.user)
    next()
  }
  
  export const isAuth = () => {
    // const tokenChecked = getItem('FoodooToken')
    // // console.log('token', tokenChecked)
    // if(tokenChecked !== null) {
      getItem('FoodooToken')
      .then(response => {
        if(response){
          // console.log(response
          return response
        }else{
          return false
        }
      })
    }
  // }
  
  