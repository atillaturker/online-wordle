import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button, Title } from "react-native-paper";

// Replace this with your actual logo image
import logo from "../../assets/WordleLogo.png";
import { SCREENS } from "../navigation";

export const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Title style={styles.title}>Welcome!</Title>
      <Button
        mode="contained"
        onPress={() => navigation.navigate(SCREENS.signin)}
        style={styles.button}
      >
        Sign In
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate(SCREENS.register)}
        style={styles.button}
      >
        Register
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 350,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
    width: 200,
  },
});
