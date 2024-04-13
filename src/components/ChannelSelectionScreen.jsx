import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { FIREBASE_DATABASE } from "../../firebaseConfig";

export const ChannelSelectionScreen = () => {
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);

  useEffect(() => {
    const channelsRef = ref(FIREBASE_DATABASE, "channels");
    onValue(channelsRef, (snapshot) => {
      const data = snapshot.val();
      const formattedData = Object.keys(data).map((channelKey) => {
        const channelData = data[channelKey];
        return {
          id: channelKey,
          name: channelKey,
          games: Object.keys(channelData).map((gameKey) => {
            const gameData = channelData[gameKey];
            return {
              id: gameKey,
              players: Object.keys(gameData).length,
            };
          }),
        };
      });
      setChannels(formattedData);
    });
  }, []);

  const handleChannelSelect = (channel) => {
    setSelectedChannel(channel);
  };

  const handleGameSelect = (game) => {
    setSelectedGame(game);
  };

  const handleBack = () => {
    if (selectedGame) {
      setSelectedGame(null);
    } else if (selectedChannel) {
      setSelectedChannel(null);
    }
  };

  return (
    <View style={styles.container}>
      {!selectedChannel ? (
        <View>
          <Text style={styles.title}>Select a channel:</Text>
          {channels.map((channel) => (
            <Button
              key={channel.id}
              onPress={() => handleChannelSelect(channel)}
              title={channel.name}
            />
          ))}
        </View>
      ) : !selectedGame ? (
        <View>
          <Text style={styles.title}>Select a game:</Text>
          {selectedChannel.games.map((game) => (
            <Button
              key={game.id}
              onPress={() => handleGameSelect(game)}
              title={`Game ${game.id}`}
            />
          ))}
          <Button onPress={handleBack} title="Geri Dön" color="#841584" />
        </View>
      ) : (
        <View>
          <Text style={styles.title}>Game Details:</Text>
          <Text>Game ID: {selectedGame.id}</Text>
          <Text>Players: {selectedGame.players}/2</Text>
          <Button onPress={handleBack} title="Geri Dön" color="#841584" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
});

export default ChannelSelectionScreen;
