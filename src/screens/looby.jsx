import { useNavigation } from "@react-navigation/native";
import { onDisconnect, onValue, remove, set } from "firebase/database";
import { atom, useAtomValue } from "jotai";
import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { ActivityIndicator, Button, DataTable } from "react-native-paper";

import { modeConfigAtom, numberConfigAtom } from "../../App";
import { FIREBASE_AUTH, GET_DB_REF } from "../../firebaseConfig";
import { SCREENS } from "../navigation";

export const letterAtom = atom("ELMA");

export const LobbyScreen = () => {
  const [lobby, setLobby] = useState([]);
  const mode = useAtomValue(modeConfigAtom);
  const number = useAtomValue(numberConfigAtom);
  const navigation = useNavigation();
  const userRef = GET_DB_REF(
    `${mode}/${number}/` + FIREBASE_AUTH.currentUser.uid
  );

  const handleDisconnect = useCallback(() => {
    onDisconnect(userRef).remove();
  }, [userRef]);

  const handleGoBack = useCallback(() => {
    remove(userRef);
  }, [userRef]);

  useEffect(() => {
    if (mode && number) {
      set(userRef, {
        uid: FIREBASE_AUTH.currentUser.uid,
        email: FIREBASE_AUTH.currentUser.email,
      });
    }
  }, [mode, number]);

  useEffect(() => {
    handleDisconnect();
  }, [userRef]);

  useEffect(() => {
    navigation.addListener("blur", () => {
      handleGoBack();
    });
  }, [handleGoBack, navigation]);

  useEffect(() => {
    const lobbyRef = GET_DB_REF(`${mode}/${number}/`);
    onValue(lobbyRef, (snapshot) => {
      setLobby(Object.values(snapshot.val()));
    });
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{`${mode} kelime\n${number} harf`}</Text>
      {!!lobby?.length && (
        <Text style={styles.status}>{`${lobby?.length} aktif kullanıcı`}</Text>
      )}
      {lobby?.length ? (
        <DataTable style={styles.tableContainer}>
          <DataTable.Header>
            <DataTable.Title>Email</DataTable.Title>
            <DataTable.Title>Davet</DataTable.Title>
          </DataTable.Header>
          {lobby.map((item) => (
            <DataTable.Row key={item.uid}>
              <DataTable.Cell>s</DataTable.Cell>
              <DataTable.Cell>{item.email}</DataTable.Cell>
              <DataTable.Cell>
                <Button
                  mode="elevated"
                  onPress={() => {
                    navigation.navigate(SCREENS.game);
                  }}
                >
                  Davet Gönder
                </Button>
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      ) : (
        <ActivityIndicator size="large" />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  status: {
    fontSize: 36,
    fontWeight: "bold",
  },
  tableContainer: {
    paddingTop: 32,
  },
});
