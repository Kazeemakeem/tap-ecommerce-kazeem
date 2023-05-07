import React, {useState, useEffect} from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { List} from '../screens/List';
import { HomeScreen} from '../screens/HomeScreen';
import  ProductsScreen from '../screens/ProductsScreen';
import  WishlistScreen from '../screens/WishlistScreen';
import { TextDemo, ButtonDemo, FormDemo, TailwindDemo } from '../screens/Demos';
import OnboardingSwipeScreen from '../screens/OnboardingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type UserStackParams = {
  Home: undefined;
  Onboarding: undefined;
  Products: undefined;
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