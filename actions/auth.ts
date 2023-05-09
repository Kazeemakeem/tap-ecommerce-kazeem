import * as SecureStore from "expo-secure-store"
import AsyncStorage from '@react-native-async-storage/async-storage';

type dataType = {
  token: string
}

export const setItem = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (e) {
    console.log(e)
  }
}

export const getItem = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key)
    if(value !== null) {
      return value
    }else{
      return false
    }
  } catch(e) {
    console.log(e)
  }
}

export const authenticate = (data: dataType, next: () => void) => {
  setItem('tap', data.token)
  next()
}