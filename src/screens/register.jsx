import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput, Title } from "react-native-paper";

import { FIREBASE_AUTH } from "../../firebaseConfig";

export const RegisterScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState("false");

  const auth = FIREBASE_AUTH;
  const handleRegister = async () => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Kullanıcı adi", username, "Sifre", password, "Giris yaptı");
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
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
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        label="Şifre"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      {/* {loading ? (
        <ActivityIndicator size="large" color="0000ff" />
      ) : (
        <>
          <Button
            mode="contained"
            onPress={handleRegister}
            style={styles.button}
          >
            Kayıt Ol
          </Button>
        </>
      )} */}
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
