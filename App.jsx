import { StatusBar } from "expo-status-bar";
import { atom } from "jotai";
import { StyleSheet, View } from "react-native";
import { MMKVLoader } from "react-native-mmkv-storage";
import { PaperProvider } from "react-native-paper";

import { RootNavigation } from "./src";

export const GlobalState = {
  isLoaggedIn: atom(false),
  game: atom({}),
  users: atom([]),
  invite: atom({}),
};

export const storage = new MMKVLoader().initialize();
export default function App() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <RootNavigation />
        <StatusBar style="auto" />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
