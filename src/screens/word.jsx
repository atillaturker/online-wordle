import { useNavigation } from "@react-navigation/native";
import { onValue, update } from "firebase/database";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

import { GlobalState } from "../../App";
import { FIREBASE_AUTH, GET_DB_REF } from "../../firebaseConfig";
import { SCREENS } from "../navigation";

export const WordScreen = () => {
  const { navigate } = useNavigation();
  const [input, setInput] = useState("");
  const [{ length, to, from, path }, setGame] = useAtom(GlobalState.game);
  const userUID = FIREBASE_AUTH?.currentUser?.uid;
  const [isReady, setIsReady] = useState(false);

  const onPressHandleWordInput = () => {
    if (input) {
      const gameRef = GET_DB_REF(path);
      const opponentUID = to === userUID ? from : to;
      update(gameRef, {
        [`${opponentUID}`]: {
          word: input,
        },
      })
        .then(() => {
          setGame((prev) => ({ ...prev, word: input }));
          //
        })
        .catch((e) => console.log("rakip için kelime seçilirken problem:", e));
    }
  };

  const handleProceed = () => {
    const gameRef = GET_DB_REF(path);
    onValue(gameRef, (data) => {
      if (data.exists()) {
        const word = data.val()[`${userUID}`]["word"];
        const ready = Object.values(data.val()).every(
          (item) => item.word?.length == length
        );
        if (ready && word) {
          setGame((prev) => ({ ...prev, word }));
          setIsReady(true);
        }
      }
    });
  };

  useEffect(() => {
    if (isReady) {
      navigate(SCREENS.game);
    }
  }, [isReady]);

  useEffect(() => {
    handleProceed();
  }, []);

  return (
    <View style={styles.container}>
      <Text>
        {`Oyuna başlamadan önce rakibinin bilmesi için ${length} harfli bir kelime gir`}
      </Text>
      <TextInput
        mode="flat"
        keyboardType="default"
        value={input}
        maxLength={length}
        onChangeText={(t) => setInput(t.toUpperCase())}
      />
      <Button
        mode="contained"
        maxLength={length}
        disabled={input.length != length}
        onPress={onPressHandleWordInput}
      >
        Kelimeyi onayla
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 32,
    gap: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
