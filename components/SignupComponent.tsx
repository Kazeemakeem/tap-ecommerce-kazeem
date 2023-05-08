import React, { useEffect, useState } from 'react'
import { TouchableOpacity, View, Text, TextInput, Image, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useAppDispatch } from '../redux/storeHooks'
import { InformationCircleIcon, XMarkIcon } from 'react-native-heroicons/outline'
import { isAuth, signup } from '../actions/auth'
import { getItem } from '../actions/auth'
import {showLoading, showMessage, showError } from '../util/auth'
import { ActionButton } from './Button'
import colors from '../constants/colors'
import { StackNavigationProp } from '@react-navigation/stack/';
import { UserStackParams } from '../navigation/User'
import  DataTextInput  from './DataTextInput'
import useAxios from '../util/axios'
import axios from 'axios';


const SignUp = () => {

  const dispatch = useAppDispatch()

	const navigation = useNavigation<StackNavigationProp<UserStackParams>>()
  
  const [ values, setValues ] = useState(
    {
      name: '',
      email: '',
      password: '',
      username: '',
      error: '',
      loading: false,
      message: '',
      showForm: true,
    }
  )
    
  const {name, email, username, password, loading, error, message, showForm} = values
    
    
  useEffect(() => {
    setValues({ ...values, username: '', password: '', name: '', email: ''})
    getItem('Tap')
    .then(res => {
      res && navigation.navigate("Home")
    })
    .catch(err => console.log(err))
  }, [])
    
  const handleSubmit = () => {
     //@ts-ignore
     setValues({...values, loading: true, error: false})
     const user = { name, email, username, password } 
     axios.post('./user', {
       method: 'POST',
       headers: ({
         Accept: 'application/json',
         'Content-Type': 'application/json'
       }),
       data: user
     })
     .then((res) => {
       setValues({ ...values, name: '', email: '', username: '', password: '', error: '', loading: false, message: res.data.success.message, showForm: false })
          navigation.navigate('Signin')
       })
     .catch((err) => {
       console.log(err.response.data)
     })
   }
  
  const handleChange = name => value => {
    //@ts-ignore
    setValues({ ...values, error: false, [name]: value })
  }

  const signUpForm = () => {
    return (
      <View className="bg-white flex-row min-h-full items-center justify-center py-12 px-4">
        <View className="w-full space-y-8">
          <View className='flex items-center justify-center'>
            <View className={`w-20 h-20 rounded-full bg-[#fab005]`}>
              {/* LOGO IMAGE HERE */}
            </View>
            <Text className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign up
            </Text>
          </View>
          <View className="mt-8 space-y-6">
            <View className="">
              <DataTextInput fieldName={name} stringedName={"name"} placeholderText={"Name"} secureInput={false} handleChange={handleChange}/>
              <DataTextInput fieldName={email} stringedName={"email"} placeholderText={"Email address"} secureInput={false} handleChange={handleChange}/>
              <DataTextInput fieldName={username} stringedName={"username"} placeholderText={"username"} secureInput={false} handleChange={handleChange}/>
              <DataTextInput fieldName={password} stringedName={"password"} placeholderText={"Password"} secureInput={true} handleChange={handleChange}/>
            </View>
            <View className="flex items-center justify-between">
              <View className="text-sm flex-row space-x-1 mb-4">
                <Text className=" font-medium">
                  Already have an account? Signin
                </Text>
                  <TouchableOpacity
                  onPress={() => navigation.navigate('Signin')}>
                    <Text className="text-[#00CCBB] font-bold">here</Text>
                  </TouchableOpacity>
              </View>
            </View>
            <ActionButton text="Sign up" onPressHandler={handleSubmit} isWide={true} />
          </View>
        </View>
      </View>
    )
  }
  return (
    <View className='flex items-center relative'>
      {showLoading(loading)}
      {showMessage(values, () => navigation.navigate('Signin'))}
      {showError(values, setValues)}
      {showForm && signUpForm()}
    </View>
  )
}
export default SignUp
