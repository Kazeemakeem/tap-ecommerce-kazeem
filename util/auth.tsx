import React, { Dispatch, SetStateAction } from 'react';
import { Alert } from 'react-native';
import { TouchableOpacity, View, Text, TextInput, Image } from 'react-native'
import { InformationCircleIcon, XMarkIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'


// const navigation = useNavigation()

export const showLoading = (values) => (values.loading ? 
  <View className="w-full bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 text-2xl px-4 py-3 shadow-md">
    <View className="flex-row items-center">
      <View className="py-1 flex items-center justify-center">
        <InformationCircleIcon size={24} color="teal" className="mr-4"/>
      </View>
      <View>
        <Text className="font-bold">Loading...</Text>
      </View>
    </View>
  </View> : '')


export const showError = (values, errorCallback) => (values.error ? 
  <View className="w-full text-2xl bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
    <Text className="font-bold">Sorry! </Text>
    <Text className="">{values.error}</Text>
    <TouchableOpacity 
    onPress={() => errorCallback({...values, loading: false, error: false})}
    className="absolute top-0 bottom-0 right-0 px-4 py-3">
      <XMarkIcon size={24} color="red" className="mr-4"/>
    </TouchableOpacity>
  </View> : '')

export const showMessage = (values, messageCallback) => ( values.message ? 
  <View className="w-full text-2xl bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
    <Text className="font-bold">Success! </Text>
    <Text className="">{values.message}</Text>
    <TouchableOpacity 
      onPress={messageCallback}
    className="absolute top-0 bottom-0 right-0 px-4 py-3">
      <XMarkIcon size={24} color="green" className="mr-4"/>
    </TouchableOpacity>
  </View> : '')

// type ErrorType = {
//   email?: string;
//   password?: string;
// };

// export const useLogin = () => {
//   const [email, setEmail] = React.useState('');
//   const [password, setPassword] = React.useState('');
//   const [errors, setErrors]: [
//     ErrorType,
//     Dispatch<SetStateAction<{}>>,
//   ] = React.useState({});

//   const submit = () => {
//     const nextErrors: ErrorType = {};
//     if (email.length === 0) {
//       nextErrors.email = 'This field is required.';
//     }
//     if (password.length === 0) {
//       nextErrors.password = 'This field is required.';
//     }
//     setErrors(nextErrors);

//     if (Object.keys(nextErrors).length > 0) {
//       return null;
//     }

//     Alert.alert('Success!', `Email: ${email} \n Password: ${password}`);
//     return null;
//   };

//   return {
//     submit,
//     errors,
//     email,
//     setEmail,
//     password,
//     setPassword,
//   };
// };
