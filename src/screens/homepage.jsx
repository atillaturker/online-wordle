import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { DataTable } from "react-native-paper";
import { FIREBASE_DATABASE } from "../../firebaseConfig";

export const Homepage = () => {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    const starCountRef = ref(FIREBASE_DATABASE);
    onValue(starCountRef, (snapshot) => {
      const { rooms } = snapshot.val();
      setRooms(rooms);
    });
  }, []);
  return (
    <View>
      <Text>Hello from homepage</Text>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>NO</DataTable.Title>
          <DataTable.Title>Ad</DataTable.Title>
          <DataTable.Title>Kullanici Sayisi</DataTable.Title>
        </DataTable.Header>

        {rooms.map((room) => (
          <DataTable.Row key={room.id}>
            <DataTable.Cell>{room.id}</DataTable.Cell>
            <DataTable.Cell>{room.name}</DataTable.Cell>
            <DataTable.Cell>{`${room.users}/2`}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </View>
  );
};
