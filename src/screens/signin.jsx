import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useSetAtom } from "jotai";
import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { useMMKVStorage } from "react-native-mmkv-storage";
import { Button, TextInput, Title } from "react-native-paper";

import { GlobalState, storage } from "../../App";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { SCREENS } from "../navigation";

export const SignInScreen = () => {
  const { navigate } = useNavigation();
  const [form, setForm] = useState({
    username: "",
    password: "",
    loading: false,
  });
  const setIsLoggedIn = useSetAtom(GlobalState.isLoaggedIn);
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
      Alert.alert("Hata", error);
      resetSoftLogin();
    } finally {
      setForm((prev) => ({ ...prev, loading: false }));
    }
  };

  const handleRegister = () => navigate(SCREENS.register);

  return (
    <View style={styles.container}>
      <Title style={styles.title}>
        {!user.username
          ? `Giriş Yap`
          : `Hesabını bulduk.\nHızlıca giriş yapabilirsin`}
      </Title>
      {!user.username && (
        <>
          <TextInput
            label="E-Mail"
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
          <Button
            mode="contained"
            onPress={handleRegister}
            style={styles.button}
          >
            Hesabın yok mu? Tıkla ve kayıt ol
          </Button>
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
