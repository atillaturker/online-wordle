import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { Navigation } from "./src/navigation/index";

export default function App() {
  return (
    <View style={styles.container}>
      <Navigation />
      <Text>Deneme</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
