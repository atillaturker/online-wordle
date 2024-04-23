import { useNavigation } from "@react-navigation/native";
import { useSetAtom } from "jotai";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { GlobalState } from "../../App";
import { MODES } from "../const";
import { SCREENS } from "../navigation";

export const ChannelSelectionScreen = () => {
  const setGame = useSetAtom(GlobalState.game);
  const { navigate } = useNavigation();

  const handleMode = (mode) => {
    setGame((prev) => ({ ...prev, mode }));
    navigate(SCREENS.number);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bir Oyun Modu Seçin</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleMode(MODES.rastgele)}
        >
          <Text style={styles.buttonText}>{`Rastgele\nKelimeler`}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleMode(MODES.belirli)}
        >
          <Text style={styles.buttonText}>{`Belirli\nKelimeler`}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Rastgele: Kelime oyun tarafından seçilir
        </Text>
        <Text style={styles.infoText}>
          Belirli: Kelimeleri oyuncular rakipleri için seçer
        </Text>
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
    alignItems: "center",
    justifyContent: "space-between",
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
  infoContainer: {
    paddingTop: 48,
    width: "100%",

    gap: 16,
  },
  infoText: {
    fontSize: 18,
    textDecorationLine: "underline",
  },
});
