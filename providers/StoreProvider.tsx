import React from "react";
import { Provider } from "react-redux";
import store from "../redux/store";
import { createStackNavigator } from "@react-navigation/stack";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const UserStack = createStackNavigator();
  return (
    <NavigationContainer>
      {/* <UserStack.Navigator> */}
      <Provider store={store}>{children}</Provider>;
      {/* </UserStack.Navigator> */}
    </NavigationContainer>
  );
};

export default StoreProvider;
