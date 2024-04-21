import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";

import {
  ChannelSelectionScreen,
  GameScreen,
  LobbyScreen,
  NumberSelectionScreen,
} from "../../screens";

import { SCREENS } from "../config";

const lobbyStack = createNativeStackNavigator();

export const LobbyNavigation = () => {
  return (
    <lobbyStack.Navigator>
      <lobbyStack.Screen
        name={SCREENS.channel}
        component={ChannelSelectionScreen} // Render the ChannelSelectionScreen component
        options={{ headerShown: true }} // Optional: Hide the header for this screen
      />

      <lobbyStack.Screen
        name={SCREENS.number}
        component={NumberSelectionScreen} // Render the ChannelSelectionScreen component
        options={{ headerShown: true }} // Optional: Hide the header for this screen
      />

      <lobbyStack.Screen
        name={SCREENS.lobby}
        component={LobbyScreen} // Render the ChannelSelectionScreen component
        options={{ headerShown: true }} // Optional: Hide the header for this screen
      />

      <lobbyStack.Screen
        name={SCREENS.game}
        component={GameScreen} // Render the ChannelSelectionScreen component
        options={{ headerShown: true }} // Optional: Hide the header for this screen
      />
    </lobbyStack.Navigator>
  );
};
