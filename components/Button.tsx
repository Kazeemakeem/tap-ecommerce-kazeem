import React from 'react';
import {
  TouchableOpacity,
  Text,
} from 'react-native';
import colors from '../constants/colors'


export const ActionButton = ({text, onPressHandler, isWide}) => (
  <TouchableOpacity
  className={`bg-[#fab005] rounded-lg ${ isWide ? 'w-full h-[42px]' : 'w-28'} flex-row justify-center`}
    onPress={onPressHandler}>
    <Text className={`px-4 py-2 text-sm ${ isWide ? 'text-xl font-bold' : '' }`}>{text}</Text>
  </TouchableOpacity>
)