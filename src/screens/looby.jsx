import { useNavigation } from "@react-navigation/native";
import { onDisconnect, onValue, remove, set } from "firebase/database";
import { useAtomValue } from "jotai";
import React, { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { DataTable } from "react-native-paper";
import { modeConfigAtom, numberConfigAtom } from "../../App";
import { FIREBASE_AUTH, GET_DB_REF } from "../../firebaseConfig";

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
    <View>
      <Text>Welcome from lobby screen</Text>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Status</DataTable.Title>
          <DataTable.Title>Email</DataTable.Title>
          <DataTable.Title>Uid</DataTable.Title>
        </DataTable.Header>

        {lobby.map((item) => (
          <DataTable.Row key={item.key}>
            <DataTable.Cell>Online</DataTable.Cell>
            <DataTable.Cell>{item.email}</DataTable.Cell>
            <DataTable.Cell>{item.uid}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </View>
  );
};
