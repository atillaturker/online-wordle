import { useAtom, useAtomValue } from "jotai";
import React, { useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-paper";
import { inputAtom } from "../../App";
import { letterAtom } from "../screens";

export const Word = ({ count, disabled, entered }) => {
  const letter = useAtomValue(letterAtom);
  const [input, setInput] = useAtom(inputAtom);
  const inputRefs = useRef([]);

  useEffect(() => {
    setInput(Array(count).fill(""));
  }, []);

  const handleTextChange = (text, index) => {
    text = text.toUpperCase();
    // Girilen değeri kontrol edin
    if (text.length === 1 && index < inputRefs.current.length - 1) {
      // Eğer bir karakter girildiyse ve sonuncu hücrede değilsek, bir sonraki hücreye geçin
      inputRefs.current[index + 1].focus();
    }
    setInput((prev) => {
      const newState = [...prev];
      newState[index] = text;
      return newState;
    });
  };

  const boxes = Array.from({ length: count }, (_, index) => {
    const correntInputStyle = {
      backgroundColor: input[index] === letter[index] ? "green" : "white",
    };
    return (
      <View key={index} style={styles.box}>
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
  });

  return <View style={styles.container}>{boxes}</View>;
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
