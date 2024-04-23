import { onValue } from "firebase/database";
import { useAtomValue } from "jotai";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { TextInput } from "react-native-paper";

import { GlobalState } from "../../App";
import { FIREBASE_AUTH, GET_DB_REF } from "../../firebaseConfig";

export const Word = ({ disabled, entered, setInput, order }) => {
  const { length, path, word } = useAtomValue(GlobalState.game);
  const inputRefs = useRef([]);
  const userUID = FIREBASE_AUTH?.currentUser?.uid;
  const [words, setWords] = useState([]);
  const getWords = () => {
    const wordRef = GET_DB_REF(`${path}/${userUID}/input/${order}`);
    try {
      onValue(wordRef, (data) => {
        if (data.exists()) {
          setWords(data.val());
        }
      });
    } catch (e) {
      console.log("Harfleri çekerken problem:", e);
    }
  };

  useEffect(() => {
    getWords();
  }, []);

  const handleTextChange = (text, index) => {
    text = text.toUpperCase();
    setInput((prev) => {
      const tmp = prev;
      tmp[index] = text;
      return tmp;
    });
    if (text.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const renderItem = ({ _, index }) => {
    const correntInputStyle = {
      backgroundColor: words[index] === word[index] ? "green" : "white",
    };
    return (
      <View style={styles.box}>
        <TextInput
          style={[styles.textInput, entered && correntInputStyle]}
          disabled={disabled}
          keyboardType="default"
          maxLength={1}
          onChangeText={(text) => handleTextChange(text, index)}
          ref={(ref) => (inputRefs.current[index] = ref)}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {word && (
        <FlatList
          data={Array.from({ length })}
          renderItem={renderItem}
          horizontal
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    margin: 5,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000000",
  },
  textInput: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "justify",
    width: 40,
    height: 40,
    textTransform: "uppercase",
  },
});
