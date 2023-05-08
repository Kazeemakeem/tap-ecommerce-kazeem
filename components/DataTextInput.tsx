import React from 'react'
import {TextInput} from 'react-native'
import colors from '../constants/colors'

const DataTextInput = ({fieldName, stringedName, placeholderText, secureInput, handleChange}) => {
  return (
    <TextInput
      onChangeText={handleChange(stringedName)}
      keyboardType='default'
      className={`w-full rounded-tr-md border rounded-bl-md border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-[#fab005] focus:outline-none focus:ring-[#fab005] mb-4`}
      placeholder={placeholderText}
      value={fieldName}
      secureTextEntry={secureInput}
    />
  )
} 
export default DataTextInput