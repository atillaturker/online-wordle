import { useNavigation } from "@react-navigation/native";
import { useSetAtom } from "jotai";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { numberConfigAtom } from "../../App";
import { NUMBERS } from "../const";
import { SCREENS } from "../navigation";

export const NumberSelectionScreen = () => {
  const setNumberConfig = useSetAtom(numberConfigAtom);
  const { navigate } = useNavigation();
  const handleHarf = (harf) => {
    setNumberConfig(harf);
    navigate(SCREENS.lobby);
  };
  return (
    <View>
      <Button mode="contained" onPress={() => handleHarf(NUMBERS[4])}>
        4 Harf
      </Button>
      <Button mode="contained" onPress={() => handleHarf(NUMBERS[5])}>
        5 Harf
      </Button>
      <Button mode="contained" onPress={() => handleHarf(NUMBERS[6])}>
        6 Harf
      </Button>
      <Button mode="contained" onPress={() => handleHarf(NUMBERS[7])}>
        7 Harf
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({});
