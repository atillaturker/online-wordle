import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button, TextInput, Title } from "react-native-paper";
import uuid from "react-native-uuid";

import { FIREBASE_AUTH } from "../../firebaseConfig";
import { SCREENS } from "../navigation";

export const RegisterScreen = ({}) => {
  const { navigate } = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setLoading] = useState(false);

  const auth = FIREBASE_AUTH;
  const handleRegister = async () => {
    setLoading(true);
    const userData = {
      userId: uuid.v4(),
      name: username,
      email,
      password,
    };

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      Alert.alert("Kayıt Başarılı", "Giriş sayfasına yönlendiriliyorsunuz", [
        {
          text: "OK",
          onPress: () => navigate(SCREENS.signin),
        },
      ]);

      const db = getDatabase();
      set(ref(db, "users/" + userData.userId), userData);
    } catch (error) {
      Alert.alert("Hata", `${error} Lütfen tekrar deneyiniz. `);
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
      <Button
        loading={isLoading}
        disabled={isLoading}
        mode="contained"
        onPress={handleRegister}
        style={styles.button}
      >
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
