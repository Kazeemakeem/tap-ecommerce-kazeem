import * as SecureStore from "expo-secure-store"

type dataType = {
  token: string
}

export async function setItem(key: string, value: string) {
  await SecureStore.setItemAsync(key, value)
}

export async function getItem(key: string) {
  const result = await SecureStore.getItemAsync(key);
  if(result) {
    return result
  } 
  return false
}

export const authenticate = (data: dataType, next: () => void) => {
  setItem('tap', data.token)
  next()
}