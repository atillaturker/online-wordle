import { NavigationContainer } from "@react-navigation/native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import { Homepage } from "../screens";
import { SCREENS } from "./config";

const Tab = createBottomTabNavigator();

export const Auth = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name={SCREENS.homepage} component={Homepage} />
        <Tab.Screen name="2.ekran" component={Homepage} />
        <Tab.Screen name="3.ekran" component={Homepage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
