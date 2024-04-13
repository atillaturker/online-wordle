import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";

import ChannelSelectionScreen from "../../components/ChannelSelectionScreen";
import { STACKS } from "../config";

const lobbyStack = createNativeStackNavigator();

export const LobbyNavigation = () => {
  return (
    <lobbyStack.Navigator>
      <lobbyStack.Screen
        name={STACKS.channel}
        component={ChannelSelectionScreen} // Render the ChannelSelectionScreen component
        options={{ headerShown: false }} // Optional: Hide the header for this screen
      />
    </lobbyStack.Navigator>
  );
};
