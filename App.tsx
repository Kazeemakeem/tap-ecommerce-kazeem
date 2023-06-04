import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, {useState, useEffect} from 'react';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { Provider } from 'react-redux'
import store from './redux/store'
import { User } from './navigation/User';
import NavigationBar from './components/NavigationBar';
import CartContent from './components/CartContent';import FlashMessage, {showMessage, hideMessage} from "react-native-flash-message";

export default function App() {

  const navRef = useNavigationContainerRef()
  
  const [ screenName, setScreenName ] = useState('')
  
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer
        ref={navRef}
        onReady={() => {
          setScreenName(navRef.getCurrentRoute()!.name)
          // console.log(screenName)
        }}
        onStateChange={() => {
          setScreenName(navRef.getCurrentRoute()!.name)
          // console.log(screenName)

        }}>
        <Provider store={store}>
          <User />
          <CartContent />
          <NavigationBar routeName={screenName}/>
          <FlashMessage position="top" floating={true} className="mt-20"/>
        </Provider>
      </NavigationContainer>
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
