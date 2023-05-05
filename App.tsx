import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux'
import store from './redux/store'

import { Main } from './navigation/Main';

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      
      <NavigationContainer>
        <Provider store={store}>
          <Main />
        </Provider>
      </NavigationContainer>
      <Text className='text-green-500 font-bold'>Click Me</Text>
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
