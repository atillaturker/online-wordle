import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";

import { RegisterScreen, SignInScreen, WelcomeScreen } from "../screens";
import { SCREENS } from "./config";
const Stack = createNativeStackNavigator();

export const Guest = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={SCREENS.welcome} component={WelcomeScreen} />
        <Stack.Screen name={SCREENS.register} component={RegisterScreen} />
        <Stack.Screen name={SCREENS.signin} component={SignInScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
