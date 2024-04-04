import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput, Title } from "react-native-paper";

export const RegisterScreen = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");

  const handleRegister = () => {
    // Kayıt işlemleri burada gerçekleştirilebilir
    console.log("Username:", username);
    console.log("Password:", password);
    console.log("Email:", email);
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Hesap Oluştur</Title>
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
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />
      <Button mode="contained" onPress={handleRegister} style={styles.button}>
        Kayıt Ol
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
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
});
