import { signInWithEmailAndPassword } from "firebase/auth";
import { useAtom } from "jotai";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput, Title } from "react-native-paper";
import { isLoggedInAtom } from "../../App";
import { FIREBASE_AUTH } from "../../firebaseConfig";

export const SignInScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);

  const auth = FIREBASE_AUTH;
  const handleSignIn = async () => {
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        username,
        password
      );
      console.log("Kullanıcı adi", username, "Sifre", password, "Giris yaptı");
      setIsLoggedIn(true); // Update isLoggedIn state upon successful sign-in
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
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

      {/* {loading ? (
        <ActivityIndicator size="large" color="0000ff" />
      ) : (
        <>
          <Button mode="contained" onPress={handleSignIn} style={styles.button}>
            Giriş Yap
          </Button>
        </>
      )} */}
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
