import { useNavigation } from "@react-navigation/native";
import { useSetAtom } from "jotai";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { modeConfigAtom } from "../../App";
import { MODES } from "../const";
import { SCREENS } from "../navigation";

export const ChannelSelectionScreen = () => {
  const setModConfig = useSetAtom(modeConfigAtom);
  const { navigate } = useNavigation();

  const handleMode = (mode) => {
    setModConfig(mode);
    navigate(SCREENS.number);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bir Oyun Modu Seçin</Text>
      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={() => handleMode(MODES.rastgele)}>
          Rastgele kelime
        </Button>
        <Button mode="contained" onPress={() => handleMode(MODES.belirli)}>
          Belirli Kelime
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    gap: 8,
  },
});
