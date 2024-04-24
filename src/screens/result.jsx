import { CommonActions, useNavigation } from "@react-navigation/native";
import { onValue, remove } from "firebase/database";
import { useAtom, useSetAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { Button, Card, Paragraph, Title } from "react-native-paper";

import { ScrollView, StyleSheet } from "react-native";
import { GlobalState } from "../../App";
import { FIREBASE_AUTH, GET_DB_REF } from "../../firebaseConfig";
import { STACKS } from "../navigation";

export const ResultScreen = () => {
  const navigation = useNavigation();
  const [steps, setSteps] = useState();
  const userUID = FIREBASE_AUTH?.currentUser?.uid;
  const [{ to, from, path, word, result }, setGame] = useAtom(GlobalState.game);

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
    <ScrollView contentContainerStyle={styles.container}>
      <Title style={styles.title}>Oyun Bitti</Title>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.resultText}>
            {result === "win" ? "Tebrikler Kazandın!" : "Üzgünüm Kaybettin!"}
          </Title>
          <Paragraph style={styles.wordText}>Kelime: {word}</Paragraph>
          <Title style={styles.stepsText}>Senin denemelerin</Title>
          {steps?.you ? (
            steps?.you?.map((step, index) => (
              <Paragraph key={index} style={styles.stepText}>
                {step}
              </Paragraph>
            ))
          ) : (
            <Paragraph>Deneme yapmadınız.</Paragraph>
          )}
          <Title style={styles.stepsText}>Rakibinin Denemeleri</Title>
          {steps?.opponent ? (
            steps?.opponent?.map((step, index) => (
              <Paragraph key={index} style={styles.stepText}>
                {step}
              </Paragraph>
            ))
          ) : (
            <Paragraph>Rakibin deneme yapmadı.</Paragraph>
          )}
        </Card.Content>
      </Card>
      <Button
        loading={!isGameFinished}
        disabled={!isGameFinished}
        onPress={terminateTheGame}
        mode="contained"
      >
        Oyunu sonlandır
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    marginBottom: 20,
  },
  resultText: {
    textAlign: "center",
    marginBottom: 10,
    color: "#009688",
  },
  wordText: {
    marginBottom: 10,
  },
  stepsText: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 16,
  },
  stepText: {
    marginLeft: 10,
  },
  button: {
    marginTop: 20,
  },
});
