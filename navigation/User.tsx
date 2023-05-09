import React, {useState, useEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen} from '../screens/HomeScreen';
import  ProductsScreen from '../screens/ProductsScreen';
import  WishlistScreen from '../screens/WishlistScreen';
import OnboardingSwipeScreen from '../screens/OnboardingScreen';
import SignupScreen from '../screens/SignupScreen';
import SigninScreen from '../screens/SigninScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type UserStackParams = {
  Home: undefined;
  Onboarding: undefined;
  Products: undefined;
  Wishlist: undefined;
  Signup: undefined;
  Signin: undefined;
};

const UserStack = createStackNavigator();

export const User = () => {
  
  const [firstLaunch, setFirstLaunch] = useState<null|Boolean>(null);
    
  useEffect(() => {
    async function setData() {
      const appData = await AsyncStorage.getItem("appLaunched")
      if (appData == null) {
        setFirstLaunch(true);
        AsyncStorage.setItem("appLaunched", "false");
      } else {
        setFirstLaunch(false);
      }
    }
    setData();
  }, []);

  return (
    <UserStack.Navigator>
      {!firstLaunch && <UserStack.Screen 
      name="Onboarding"
        component={OnboardingSwipeScreen}
        options={{headerShown: false}} />}
      <UserStack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
      <UserStack.Screen
        name="Signin"
        component={SigninScreen}
        options={{ headerShown: false }}
      />
      <UserStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <UserStack.Screen
        name="Products"
        component={ProductsScreen}
      />
      <UserStack.Screen
        name="Wishlist"
        component={WishlistScreen}
      />
    </UserStack.Navigator>
  )
}