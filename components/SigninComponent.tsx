import React, { useEffect, useState } from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { authenticate } from '../actions/auth'
import { getItem } from '../actions/auth'
import { ActionButton } from './Button'
import { StackNavigationProp } from '@react-navigation/stack/';
import { UserStackParams } from '../navigation/User'
import  DataTextInput, { handleChangeType }  from './DataTextInput'
import axios from 'axios';
import { InformationCircleIcon, XMarkIcon } from 'react-native-heroicons/outline'

const SignUp = () => {
	const navigation = useNavigation<StackNavigationProp<UserStackParams>>()
  const [ values, setValues ] = useState(
    {
      username: '',
      password: '',
      error: '',
      loading: false,
      message: '',
      showForm: true,
    }
  )
  const {username, password, error, loading, message, showForm} = values

  useEffect(() => {
    setValues({ ...values, username: '', password: ''})
    getItem('tap')
    .then(res => {
      res && navigation.navigate("Home")
    })
    .catch(err => console.log(err))
  }, [])

  const handleSubmit = () =>{
    // @ts-ignore
    setValues({...values, loading: true, error: false})
    // useAxios hook can't be called here
    const user = { username, password }
    axios.post('./user/login', {
      method: 'POST',
      headers: ({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }),
      data: user
    })
    .then((res) => {
      if(res.data.content.data.token){
        authenticate(res.data.content.data, () => {
        setValues({ ...values, username: '', password: '', message: res.data.success.message, error: ''})
        navigation.replace("Home")
        })
      }else {
        setValues({ ...values, error: res.data.success.message, loading: false})
      }
      })
    .catch((err) => {
      setValues({ ...values, loading: false,  error: err.response.data.error.message})
    })
  }

  const handleChange : handleChangeType = name => value => {
    //@ts-ignore
    setValues({ ...values, error: false, [name]: value })
  }

  const showError = () => (error ? <View className="w-full text-2xl bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded absolute top-8 z-10">
    <Text className="font-bold">Sorry! </Text>
    <Text className="">{error}</Text>
    <TouchableOpacity 
    //@ts-ignore
    onPress={() => setValues({...values, loading: false, error: false})}
    className="absolute top-0 bottom-0 right-0 px-4 py-3">
      <XMarkIcon size={24} color="red" className="mr-4"/>
    </TouchableOpacity>
  </View> : '')

  const showMessage = () => ( message ? <View className="w-full text-2xl bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative absolute top-8 z-10">
    <Text className="font-bold">Success! </Text>
    <Text className="">{message}</Text>
    <TouchableOpacity 
    onPress={() => navigation.navigate('Signin')}
    className="absolute top-0 bottom-0 right-0 px-4 py-3">
      <XMarkIcon size={24} color="green" className="mr-4"/>
    </TouchableOpacity>
  </View> : '')

  const showLoading = () => (loading ? <View className="w-full bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 text-2xl px-4 py-3 shadow-md absolute top-8 z-10">
    <View className="flex-row items-center">
      <View className="py-1 flex items-center justify-center">
        <InformationCircleIcon size={24} color="teal" className="mr-4"/>
      </View>
      <View>
        <Text className="font-bold">Loading...</Text>
      </View>
    </View>
  </View> : '')


  const signInForm = () => {
    return (
      <View className="bg-white flex-row min-h-full items-center justify-center py-12 px-4">
        <View className="w-full space-y-8">
          <View className='flex items-center justify-center'>
            <View className={`w-20 h-20 rounded-full bg-[#fab005]`}>
              {/* LOGO IMAGE HERE */}
            </View>
            <Text className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in
            </Text>
          </View>
          <View className="mt-8 space-y-6">
            <View className="">
              <DataTextInput fieldName={username} stringedName={"username"} placeholderText={"username"} secureInput={false} handleChange={handleChange}/>
              <DataTextInput fieldName={password} stringedName={"password"} placeholderText={"Password"} secureInput={true} handleChange={handleChange}/>
            </View>
            <View className="flex items-center justify-between">
              <View className="text-sm flex-row space-x-1 mb-4">
                <Text className=" font-medium">
                  Don't have an account? Signup
                </Text>
                  <TouchableOpacity
                  onPress={() => navigation.navigate('Signup')}>
                    <Text className="text-[#00CCBB] font-bold">here</Text>
                  </TouchableOpacity>
              </View>
            </View>
            <ActionButton text="Sign in" onPressHandler={handleSubmit} isWide={true} />
          </View>
        </View>
      </View>
    )
  }
  return (
    <View className='flex items-center relative'>
      {showLoading()}
      {showMessage()}
      {showError()}
      {showForm && signInForm()}
    </View>
  )
}
export default SignUp
