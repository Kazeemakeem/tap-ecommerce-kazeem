import { REACT_APP_API_DEV, REACT_APP_API_PROD } from '@env'

export const API = __DEV__ ? REACT_APP_API_DEV : REACT_APP_API_PROD