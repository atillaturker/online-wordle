import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";

import { Settings2Screen, SettingsScreen } from "../../screens";
import { SCREENS } from "../config";

const settingsStack = createNativeStackNavigator();

export const SettingsNavigation = () => {
  return (
    <settingsStack.Navigator>
      <settingsStack.Screen
        name={SCREENS.settings1}
        component={SettingsScreen}
      />
      <settingsStack.Screen
        name={SCREENS.settings2}
        component={Settings2Screen}
      />
    </settingsStack.Navigator>
  );
};
