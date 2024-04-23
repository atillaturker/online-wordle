import { useIsFocused, useNavigation } from "@react-navigation/native";
import { onValue, update } from "firebase/database";
import { useAtom } from "jotai";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";

import { GlobalState } from "../../App";
import { FIREBASE_AUTH, GET_DB_REF } from "../../firebaseConfig";
import { DialogModal } from "../components/dialog";
import { Word } from "../components/word";
import { SCREENS } from "../navigation";

export const GameScreen = () => {
  const isFocused = useIsFocused();
  const { navigate } = useNavigation();
  const [{ length, to, from, path, word }, setGame] = useAtom(GlobalState.game);
  const userUID = FIREBASE_AUTH?.currentUser?.uid;
  const [countDown, setCountDown] = useState(0);
  const countDownRef = useRef();
  const [step, setStep] = useState(0);
  const [input, setInput] = useState(Array.from({ length }).fill(""));
  const [result, setResult] = useState("playing");

  const opponentUID = userUID === to ? from : to;

  const getWord = () => {
    const wordPath = GET_DB_REF(`${path}/${userUID}/word`);
    onValue(wordPath, (data) => {
      if (data.exists()) {
        setGame((prev) => ({ ...prev, word: data.val() }));
      }
    });
  };
  const handleLose = () => {
    const gameRef = GET_DB_REF(`${path}`);
    update(gameRef, {
      winner: opponentUID,
    });
  };

  const handleWin = () => {
    const gameRef = GET_DB_REF(`${path}`);
    update(gameRef, {
      winner: userUID,
    });
  };

  const checkWin = () => {
    const gameRef = GET_DB_REF(`${path}`);
    onValue(gameRef, (data) => {
      if (data.exists() && data.val()["winner"]) {
        setResult(data.val()["winner"] === userUID ? "win" : "lose");
        clearInterval(countDownRef.current);
      }
    });
  };

  const checkLost = () => {
    const gameRef = GET_DB_REF(`${path}`);
    onValue(gameRef, (data) => {
      if (data.exists() && data.val()["winner"]) {
        clearInterval(countDownRef.current);
        setResult(data.val()["winner"] === userUID ? "win" : "lose");
      }
    });
  };

  const terminateGame = () => {
    setResult("playing");
    setGame((prev) => ({
      ...prev,
      result,
    }));
    navigate(SCREENS.result);
  };

  useEffect(() => {
    if (isFocused) {
      checkWin();
      checkLost();
      getWord();
    }
  }, []);

  useEffect(() => {
    if (isFocused) {
      countDownRef.current = setInterval(() => {
        setCountDown((prev) => prev + 1);
      }, 1000);

      return () => {
        clearInterval(countDownRef.current);
      };
    }
  }, []);

  useEffect(() => {
    if (isFocused) {
      if (countDown === 60) {
        clearInterval(countDownRef.current);
        handleLose();
      }
    }
  }, [countDown]);

  const renderItem = ({ _, index }) => (
    <Word
      entered={step > index}
      disabled={step !== index}
      setInput={setInput}
      order={index}
    />
  );

  const handleOnPress = () => {
    const inputRef = GET_DB_REF(`${path}/${userUID}/input`);
    update(inputRef, {
      [step]: input.join(""),
    })
      .then(() => {
        if (word === input.join("")) {
          handleWin();
        } else if (step === length) {
          handleLose();
        } else {
          setStep((prev) => prev + 1);
        }
      })
      .catch((e) => console.log("kelime girilirken problem:", e));
  };

  return (
    <View style={styles.container}>
      {result !== "playing" && (
        <DialogModal
          isVisible={result !== "playing"}
          title={result === "win" ? "Kazandın" : "Kaybettin"}
          dismissable={false}
          text={result === "win" ? "Tebrikler" : "Üzgünüm"}
          done={{
            text: "Tamam",
            onPress: terminateGame,
          }}
        />
      )}
      {countDown > 50 && (
        <Text
        // style={styles.title}
        >{`Çabuk ol ${60 - countDown} saniye sonra kaybedeceksin`}</Text>
      )}
      <Text
      // style={styles.title}
      >{`${length - step} deneme hakkın kaldı`}</Text>
      {word ? (
        <FlatList data={Array.from({ length })} renderItem={renderItem} />
      ) : (
        <ActivityIndicator size="large" />
      )}
      {/* {step < length && input.filter(Boolean).length == length && ( */}
      <Button onPress={handleOnPress} mode="contained">
        Onayla
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    paddingTop: 32,
  },
  title: {
    fontSize: 67,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
});
