import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";

import { Auth } from "./auth";
import { Guest } from "./guest";

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  const isLoggedIn = true; // jotai state
  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Stack.Navigator>
          <Stack.Screen name="Auth" component={Auth} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Guest" component={Guest} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};
