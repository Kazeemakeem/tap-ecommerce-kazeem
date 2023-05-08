import AsyncStorage from '@react-native-async-storage/async-storage'
import fetch from 'isomorphic-fetch'
import * as SecureStore from "expo-secure-store"
import { API } from '../constants/baseUrls'
import axios from 'axios';



export async function setItem(key, value) {
  SecureStore.setItemAsync(key, value)
    .then(res => {
      //
    })
    .catch(err => console.log(err))
}

export async function getItem(key) {
  let result = await SecureStore.getItemAsync(key);
  if(result) {
    return result;
  } 
  return false
}

export const authenticate = (data, next) => {
  setItem('Tap', data.token)
  next()
}