import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";

import { Lobby2Screen, LobbyScreen } from "../../screens";
import { SCREENS } from "../config";

const lobbyStack = createNativeStackNavigator();

export const LobbyNavigation = () => {
  return (
    <lobbyStack.Navigator>
      <lobbyStack.Screen name={SCREENS.lobby1} component={LobbyScreen} />
      <lobbyStack.Screen name={SCREENS.lobby2} component={Lobby2Screen} />
    </lobbyStack.Navigator>
  );
};
