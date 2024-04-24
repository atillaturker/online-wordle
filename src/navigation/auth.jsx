import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";

import { LobbyNavigation, SettingsNavigation } from "./auth/index";
import { STACKS } from "./config";

const Tab = createBottomTabNavigator();

export const AuthNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === STACKS.looby) {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === STACKS.settings) {
              iconName = focused ? "settings" : "settings-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "gray",
          headerShown: false,
        })}
      >
        <Tab.Screen name={STACKS.looby} component={LobbyNavigation} />
        <Tab.Screen name={STACKS.settings} component={SettingsNavigation} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
