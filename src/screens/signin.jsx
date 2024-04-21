import { signInWithEmailAndPassword } from "firebase/auth";
import { useSetAtom } from "jotai";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useMMKVStorage } from "react-native-mmkv-storage";
import { Button, TextInput, Title } from "react-native-paper";

import { isLoggedInAtom, storage } from "../../App";
import { FIREBASE_AUTH } from "../../firebaseConfig";

export const SignInScreen = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    loading: false,
  });
  const setIsLoggedIn = useSetAtom(isLoggedInAtom);
  const [user, setUser] = useMMKVStorage("user", storage, {
    username: "",
    password: "",
  });
  const { username, password } = {
    username: user.username || form.username,
    password: user.password || form.password,
  };

  const resetSoftLogin = () => {
    setUser({ username: "", password: "" });
  };
  const handleSignIn = async () => {
    setForm((prev) => ({ ...prev, loading: true }));

    try {
      const { user } = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        username,
        password
      );
      if (user) {
        setIsLoggedIn(true);
        setUser({ username, password });
      } else {
        resetSoftLogin();
      }
    } catch (error) {
      console.log("error", error);
      resetSoftLogin();
    } finally {
      setForm((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Giriş Yap</Title>
      {!user.username && (
        <>
          <TextInput
            label="Kullanıcı Adı"
            value={username}
            onChangeText={(text) => {
              setForm((prev) => ({ ...prev, username: text }));
            }}
            style={styles.input}
          />
          <TextInput
            label="Şifre"
            value={password}
            onChangeText={(text) => {
              setForm((prev) => ({ ...prev, password: text }));
            }}
            secureTextEntry
            style={styles.input}
          />
        </>
      )}

      <Button
        mode="contained"
        disabled={!username || !password || form.loading}
        onPress={handleSignIn}
        style={styles.button}
        loading={form.loading}
      >
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
