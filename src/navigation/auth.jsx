import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";

import { LobbyNavigation, SettingsNavigation } from "./auth/index";
import { STACKS } from "./config";

const Tab = createBottomTabNavigator();

export const AuthNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          options={{ title: "Lobi" }}
          name={STACKS.looby}
          component={LobbyNavigation}
        />
        <Tab.Screen
          options={{ title: "Ayarlar" }}
          name={STACKS.settings}
          component={SettingsNavigation}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
