import React, { useEffect, useState } from 'react'
import { TouchableOpacity, View, Text, TextInput, Image, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useAppDispatch } from '../redux/storeHooks'
import { authenticate, signin } from '../actions/auth'
import { getItem } from '../actions/auth'
import {showLoading, showMessage, showError } from '../util/auth'
import { ActionButton } from './Button'
import colors from '../constants/colors'
import { StackNavigationProp } from '@react-navigation/stack/';
import { UserStackParams } from '../navigation/User'
import  DataTextInput  from './DataTextInput'
import { axiosAuth } from '../util/axios'
import axios from 'axios';

axios.defaults.baseURL = 'https://lab-ecom-api-4c56x6bkca-uc.a.run.app/api/v1';


const SignUp = () => {

  const dispatch = useAppDispatch()
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
    getItem('Tap')
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
        authenticate(res.data.content.data, () => {
        // dispatch(updateUser(data.user))
        setValues({ ...values, username: '', password: '', message: res.data.success.message, error: ''})
        navigation.navigate("Home")
        })
      })
    .catch((err) => {
      console.log(err.response.data)
    })
  }

  const handleChange = name => value => {
    //@ts-ignore
    setValues({ ...values, error: false, [name]: value })
  }

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
      {showLoading(loading)}
      {showMessage(values, null)}
      {showError(values, setValues)}
      {showForm && signInForm()}
    </View>
  )
}
export default SignUp
