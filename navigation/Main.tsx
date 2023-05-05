import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { List } from '../screens/List';
import { TextDemo, ButtonDemo, FormDemo, TailwindDemo } from '../screens/Demos';

export type MainStackParams = {
  List: undefined;
  TextDemo: undefined;
  FormDemo: undefined;
  ButtonDemo: undefined;
  TailwindDemo: undefined;
};

const MainStack = createNativeStackNavigator();

export const Main = () => (
  <MainStack.Navigator>
    <MainStack.Screen name="List" component={List} />
    <MainStack.Screen
      name="TextDemo"
      component={TextDemo}
      options={{ headerTitle: 'Text Demo' }}
    />
    <MainStack.Screen
      name="FormDemo"
      component={FormDemo}
      options={{ headerTitle: 'Button Demo' }}
    />
    <MainStack.Screen
      name="ButtonDemo"
      component={ButtonDemo}
      options={{ headerTitle: 'Button Demo' }}
    />
    <MainStack.Screen
      name="TailwindDemo"
      component={TailwindDemo}
      options={{ headerTitle: 'Tailwind Demo' }}
    />
  </MainStack.Navigator>
);
