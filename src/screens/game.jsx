import { atom, useAtomValue } from "jotai";
import React, { useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { inputAtom, numberConfigAtom } from "../../App";
import { Word } from "../components/word";
import { letterAtom } from "./looby";

export const stepAtom = atom(0);

export const GameScreen = () => {
  const input = useAtomValue(inputAtom);
  const letter = useAtomValue(letterAtom);
  const [countDown, setCountDown] = useState(0);
  const countDownRef = useRef();

  const [step, setStep] = useState(0);
  const numberConfig = useAtomValue(numberConfigAtom);

  useEffect(() => {
    countDownRef.current = setInterval(() => {
      setCountDown((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(countDownRef.current);
    };
  }, []);

  useEffect(() => {
    if (countDown === 60) {
      clearInterval(countDownRef.current);
      Alert.alert("Kaybettin!");
    }
  }, [countDown]);

  console.log("countdown:", countDown);

  const words = Array.from({ length: numberConfig }, (_, i) => (
    <Word
      key={i}
      entered={step > i}
      disabled={step !== i}
      count={numberConfig}
    />
  ));
  const handleOnPress = () => {
    if (input.join("") === letter) {
      Alert.alert("Tebrikler");
    } else {
      setCountDown(0);
    }

    setStep((prev) => prev + 1);
  };

  return (
    <View style={styles.container}>
      {countDown > 50 && <Text style={styles.title}>{60 - countDown}</Text>}
      <Text style={styles.title}>Wordle</Text>
      {words}
      {step < numberConfig && (
        <Button onPress={handleOnPress} mode="contained">
          Onayla
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 67,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
});
