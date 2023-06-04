import * as SecureStore from "expo-secure-store"

type dataType = {
  token: string
}

export const setItem = async (key: string, value: string) => {
  try {
    await SecureStore.setItemAsync(key, value)
  } catch (e) {
    console.log(e)
  }
}

export const getItem = async (key: string) => {
  try {
    const value = await SecureStore.getItemAsync(key)
    if(value !== null) {
      return value
    }else{
      return false
    }
  } catch(e) {
    console.log(e)
  }
}

export const authenticate = async (data: dataType, next: () => void) => {
  await setItem('tap', data.token)
  next()
}