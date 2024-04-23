import { useNavigation } from "@react-navigation/native";
import { useSetAtom } from "jotai";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

import { GlobalState } from "../../App";
import { NUMBERS } from "../const";
import { SCREENS } from "../navigation";

export const NumberSelectionScreen = () => {
  const setGame = useSetAtom(GlobalState.game);
  const { navigate } = useNavigation();
  const handleHarf = (harf) => {
    setGame((prev) => ({ ...prev, length: harf }));
    navigate(SCREENS.lobby);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Harf Sayısı Seçin</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleHarf(NUMBERS[4])}
        >
          <Text style={styles.buttonText}>4 Harf</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleHarf(NUMBERS[5])}
        >
          <Text style={styles.buttonText}>5 Harf</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleHarf(NUMBERS[6])}
        >
          <Text style={styles.buttonText}>6 Harf</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleHarf(NUMBERS[7])}
        >
          <Text style={styles.buttonText}>7 Harf</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonContainer: {
    paddingTop: 48,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  button: {
    width: "45%",
    height: 160,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center",
  },
});
