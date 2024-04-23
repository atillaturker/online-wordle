import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button, Text, Title } from "react-native-paper";

// Replace this with your actual logo image
import logo from "../../assets/WordleLogo.png";
import { SCREENS } from "../navigation";

export const WelcomeScreen = () => {
  const { navigate } = useNavigation();
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />

      <Title
        style={styles.title}
      >{`Wordle'a hoş geldin\noyun oynamak için`}</Title>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => navigate(SCREENS.signin)}
          style={styles.button}
        >
          Giriş Yap
        </Button>
        <Text style={styles.divider}>ya da</Text>
        <Button
          mode="contained"
          onPress={() => navigate(SCREENS.register)}
          style={styles.button}
        >
          Kayıt ol
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  logo: {
    width: 350,
    height: 200,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
  },
  buttonContainer: {
    gap: 16,
    paddingTop: 32,
  },
  button: {
    width: 200,
  },
  divider: {
    textAlign: "center",
  },
});
