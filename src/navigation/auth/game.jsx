import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";

import { GameScreen, ResultScreen } from "../../screens";
import { InviteScreen } from "../../screens/invite";
import { WordScreen } from "../../screens/word";
import { SCREENS } from "../config";

const GameStack = createNativeStackNavigator();

export const GameNavigation = () => {
  return (
    <GameStack.Navigator>
      <GameStack.Screen name={SCREENS.invite} component={InviteScreen} />
      <GameStack.Screen name={SCREENS.word} component={WordScreen} />
      <GameStack.Screen name={SCREENS.game} component={GameScreen} />
      <GameStack.Screen name={SCREENS.result} component={ResultScreen} />
    </GameStack.Navigator>
  );
};
