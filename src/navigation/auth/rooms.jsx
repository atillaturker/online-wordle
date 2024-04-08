import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";

import { Rooms2Screen, RoomsScreen } from "../../screens";
import { SCREENS } from "../config";

const roomsStack = createNativeStackNavigator();

export const RoomsNavigation = () => {
  return (
    <roomsStack.Navigator>
      <roomsStack.Screen name={SCREENS.rooms1} component={RoomsScreen} />
      <roomsStack.Screen name={SCREENS.rooms2} component={Rooms2Screen} />
    </roomsStack.Navigator>
  );
};
