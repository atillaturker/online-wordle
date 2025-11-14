import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";

import {
  ChannelSelectionScreen,
  LobbyScreen,
  NumberSelectionScreen,
} from "../../screens";
import { SCREENS, STACKS } from "../config";
import { GameNavigation } from "./game";

const lobbyStack = createNativeStackNavigator();

export const LobbyNavigation = () => {
  return (
    <lobbyStack.Navigator initialRouteName={SCREENS.channel}>
      <lobbyStack.Screen
        name={SCREENS.channel}
        component={ChannelSelectionScreen} // Render the ChannelSelectionScreen component
        options={{ headerShown: true, title: "Mod Seçimi" }} // Optional: Hide the header for this screen
      />

      <lobbyStack.Screen
        name={SCREENS.number}
        component={NumberSelectionScreen} // Render the ChannelSelectionScreen component
        options={{ headerShown: true, title: "Harf Sayısı Seçimi" }} // Optional: Hide the header for this screen
      />

      <lobbyStack.Screen
        name={SCREENS.lobby}
        component={LobbyScreen} // Render the ChannelSelectionScreen component
        options={{ headerShown: true, title: "Lobi" }} // Optional: Hide the header for this screen
      />

      <lobbyStack.Screen
        name={STACKS.game}
        component={GameNavigation} // Render the ChannelSelectionScreen component
        options={{ headerShown: false }} // Optional: Hide the header for this screen
      />
    </lobbyStack.Navigator>
  );
};
