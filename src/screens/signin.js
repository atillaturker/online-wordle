import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput, Title } from "react-native-paper";

export const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    // Burada giriş işlemini gerçekleştirin (örneğin Firebase Authentication kullanarak)
    console.log("Kullanıcı adı:", username);
    console.log("Şifre:", password);
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Giriş Yap</Title>
      <TextInput
        label="Kullanıcı Adı"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        label="Şifre"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button mode="contained" onPress={handleSignIn} style={styles.button}>
        Giriş Yap
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
});

export default SignIn;
