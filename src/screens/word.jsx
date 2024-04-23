import { useNavigation } from "@react-navigation/native";
import { update } from "firebase/database";
import { useAtomValue } from "jotai";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

import { GlobalState } from "../../App";
import { FIREBASE_AUTH, GET_DB_REF } from "../../firebaseConfig";
import { SCREENS } from "../navigation";

export const WordScreen = () => {
  const { navigate } = useNavigation();
  const [input, setInput] = useState("");
  const { length, to, from, path } = useAtomValue(GlobalState.game);
  const userUID = FIREBASE_AUTH?.currentUser?.uid;

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
          navigate(SCREENS.game);
        })
        .catch((e) => console.log("rakip için kelime seçilirken problem:", e));
    }
  };

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
