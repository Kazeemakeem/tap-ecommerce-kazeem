import React from 'react';
import {
  TouchableOpacity,
  Text,
} from 'react-native';
import colors from '../constants/colors';


export const ActionButton = ({text, onPressHandler}) => (
  <TouchableOpacity
  className={`bg-[${colors.primary}] rounded-lg w-28 flex-row justify-center`}
    onPress={onPressHandler}>
    <Text className='px-4 py-2 text-sm'>{text}</Text>
  </TouchableOpacity>
)