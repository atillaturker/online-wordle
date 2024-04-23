import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import { useSendInvite } from "../hooks";

export const InviteScreen = () => {
  const { from, to, mode, length } = useSendInvite();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Davet Gönderildi</Text>
      <View style={styles.vsContainer}>
        <Text style={styles.playerText}>{to}</Text>
        <Text style={styles.vsText}>VS</Text>
        <Text style={styles.playerTextReverse}>{from}</Text>
      </View>
      <Text style={styles.title}>Mod: {mode}</Text>
      <Text style={styles.title}>Harf: {length}</Text>
      <ActivityIndicator size="large" />
      <Text style={styles.title}>
        Rakibin daveti kabul ettiğinde oyun başlayacak
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  vsContainer: {
    marginVertical: 16,
    gap: 48,
    paddingHorizontal: 32,
    paddingVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  playerTextReverse: {
    textAlign: "right",
    fontSize: 16,
    fontWeight: "900",
  },
  playerText: {
    fontSize: 16,
    fontWeight: "900",
  },
  vsText: {
    fontSize: 48,
    textAlign: "center",
  },
});
