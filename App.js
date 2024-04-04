import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

import { Navigation } from "./src/navigation/index";

export default function App() {
  return (
    <View style={styles.container}>
      <Navigation />
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
