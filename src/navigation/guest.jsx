import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { useMMKVStorage } from "react-native-mmkv-storage";

import { storage } from "../../App";
import { RegisterScreen, SignInScreen, WelcomeScreen } from "../screens";
import { SCREENS } from "./config";

const Stack = createNativeStackNavigator();

export const GuestNavigation = () => {
  const [user, _] = useMMKVStorage("user", storage, {
    username: "",
    password: "",
  });
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={user.username ? SCREENS.signin : SCREENS.welcome}
      >
        <Stack.Screen name={SCREENS.welcome} component={WelcomeScreen} />
        <Stack.Screen name={SCREENS.register} component={RegisterScreen} />
        <Stack.Screen name={SCREENS.signin} component={SignInScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
