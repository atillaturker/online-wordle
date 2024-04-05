import { StatusBar } from "expo-status-bar";
import { atom } from "jotai";
import { StyleSheet, Text, View } from "react-native";

import { RootNavigation } from "./src";

export const isLoggedInAtom = atom(false);

export default function App() {
  console.log("deneme12312321");
  return (
    <View style={styles.container}>
      <RootNavigation />
      <Text>Hello</Text>
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
