import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { Homepage } from "../screens";
import { SCREENS } from "./config";

const Stack = createNativeStackNavigator();

export const Auth = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={SCREENS.homepage} component={Homepage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
