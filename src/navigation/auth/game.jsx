import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";

import { GameScreen, ResultScreen } from "../../screens";
import { WordScreen } from "../../screens/word";
import { SCREENS } from "../config";

const GameStack = createNativeStackNavigator();

export const GameNavigation = () => {
  return (
    <GameStack.Navigator>
      <GameStack.Screen
        name={SCREENS.word}
        component={WordScreen}
        options={{ headerBackVisible: false }}
      />
      <GameStack.Screen
        name={SCREENS.game}
        component={GameScreen}
        options={{ headerBackVisible: false }}
      />
      <GameStack.Screen
        name={SCREENS.result}
        component={ResultScreen}
        options={{ headerBackVisible: false }}
      />
    </GameStack.Navigator>
  );
};
