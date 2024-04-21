import { StatusBar } from "expo-status-bar";
import { atom } from "jotai";
import { StyleSheet, View } from "react-native";
import { MMKVLoader } from "react-native-mmkv-storage";

import { RootNavigation } from "./src";

export const isLoggedInAtom = atom(false);
export const modeConfigAtom = atom("");
export const numberConfigAtom = atom("");
export const inputAtom = atom([]);

export const storage = new MMKVLoader().initialize();
export default function App() {
  return (
    <View style={styles.container}>
      <RootNavigation />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
