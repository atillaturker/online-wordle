import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";

import {
  LobbyNavigation,
  RoomsNavigation,
  SettingsNavigation,
} from "./auth/index";
import { STACKS } from "./config";

const Tab = createBottomTabNavigator();

export const AuthNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          options={{ title: "Lobby" }}
          name={STACKS.looby}
          component={LobbyNavigation}
        />
        <Tab.Screen
          options={{ title: "Rooms" }}
          name={STACKS.rooms}
          component={RoomsNavigation}
        />
        <Tab.Screen
          options={{ title: "Settings" }}
          name={STACKS.settings}
          component={SettingsNavigation}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
