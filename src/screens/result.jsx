import { CommonActions, useNavigation } from "@react-navigation/native";
import { onValue, remove } from "firebase/database";
import { useAtom, useSetAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";

import { GlobalState } from "../../App";
import { FIREBASE_AUTH, GET_DB_REF } from "../../firebaseConfig";
import { STACKS } from "../navigation";

export const ResultScreen = () => {
  const navigation = useNavigation();
  const [steps, setSteps] = useState();
  const userUID = FIREBASE_AUTH?.currentUser?.uid;
  const [{ mode, length, to, from, path, word, result }, setGame] = useAtom(
    GlobalState.game
  );
  const setIsLoggedIn = useSetAtom(GlobalState.isLoggedIn);
  const setInvite = useSetAtom(GlobalState.invite);
  const [isGameFinished, setIsGameFinished] = useState(false);

  const getSteps = () => {
    const stepRef = GET_DB_REF(`${path}`);
    onValue(stepRef, (data) => {
      if (data.exists()) {
        const opponent = to === userUID ? from : to;
        setSteps({
          opponent: data.val()[opponent].input,
          you: data.val()[userUID].input,
        });
      }
    });
  };

  const countDown = () => {
    setTimeout(() => {
      setIsGameFinished(true);
    }, 5000);
  };

  const terminateTheGame = () => {
    const gameRef = GET_DB_REF(`${path}`);
    remove(gameRef)
      .catch((e) => console.log("oyun kapatılırken hata"))
      .then(() => {
        const gameRef = GET_DB_REF(path);
        remove(gameRef)
          .catch((e) => console.log("oyun kapatılırken hata"))
          .then(() => {
            setGame((prev) => ({ mode: prev.mode, length: prev.length }));
            setInvite();
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: STACKS.looby }],
              })
            );
          });
      });
  };

  useEffect(() => {
    getSteps();
    countDown();
  }, []);

  return (
    <View>
      <Text>Oyun Bitti</Text>
      <Text>{result === "win" ? "Kacandin" : "Kaybettin"}</Text>
      <Text>{`Kelime: ${word}`}</Text>
      <Text>Senin denemelerin</Text>
      {steps?.you ? (
        steps?.you?.map((step, index) => <Text key={index}>{step}</Text>)
      ) : (
        <Text>Hiç denemen yok</Text>
      )}
      <Text>Rakibinin denemeleri</Text>
      {steps?.opponent ? (
        steps?.opponent?.map((step, index) => <Text key={index}>{step}</Text>)
      ) : (
        <Text>Hiç denemesi yok</Text>
      )}

      <Button
        loading={!isGameFinished}
        disabled={!isGameFinished}
        onPress={terminateTheGame}
        mode="contained"
      >
        Oyunu sonlandır
      </Button>
    </View>
  );
};
