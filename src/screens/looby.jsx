import { useIsFocused, useNavigation } from "@react-navigation/native";
import { onDisconnect, onValue, remove, update } from "firebase/database";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";

import { GlobalState } from "../../App";
import { FIREBASE_AUTH, GET_DB_REF } from "../../firebaseConfig";
import { DialogModal } from "../components/dialog";
import { SCREENS, STACKS } from "../navigation";

export const LobbyScreen = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const { mode, length } = useAtomValue(GlobalState.game);
  const [users, setUsers] = useAtom(GlobalState.users);
  const [receivedInvite, setReceivedInvite] = useAtom(GlobalState.invite);
  const setGame = useSetAtom(GlobalState.game);
  const rootRef = `${mode}/${length}`;
  const userUID = FIREBASE_AUTH?.currentUser?.uid;
  const [randomWord] = useState(
    {
      4: "AAAA",
      5: "AAAAA",
      6: "AAAAAA",
      7: "AAAAAAA",
    }[length]
  );

  const handleDisconnectOnBlur = () => {
    const unsub = navigation.addListener("beforeRemove", () => {
      const userRef = GET_DB_REF(`${rootRef}/users/${userUID}`);
      remove(userRef).catch((e) => console.log("lobiden çıkarken problem:", e));
    });

    return unsub;
  };

  const handleDisconnect = () => {
    const userRef = GET_DB_REF(`${rootRef}/users/${userUID}`);
    onDisconnect(userRef)
      .remove()
      .catch((e) => console.log("lobiden çıkarken problem:", e));
  };

  const addUserToUsers = () => {
    if (isFocused) {
      const lobbyRef = GET_DB_REF(`${rootRef}/users/`);
      update(lobbyRef, { [`${userUID}`]: userUID }).catch((e) =>
        console.log("Kullanıcıyı lobiye eklerken bir problem:", e)
      );
    }
  };

  const getUsers = () => {
    const lobbyRef = GET_DB_REF(`${rootRef}/users/`);
    try {
      onValue(lobbyRef, (data) => {
        if (data.exists()) {
          setUsers(Object.values(data.val()).filter((uid) => uid !== userUID));
        }
      });
    } catch (e) {
      console.log("Kullanıcıları çekerken problem:", e);
    }
  };

  const handleSendInvite = (uid) => {
    const inviteRef = GET_DB_REF(`${rootRef}/invites/`);
    update(inviteRef, {
      [uid]: {
        to: uid,
        from: userUID,
      },
    })
      .then(() => {
        setReceivedInvite({ from: userUID, to: uid });
      })
      .catch((e) => console.log("davet gönderirken problem:", e));
  };

  const checkInvites = () => {
    const inviteRef = GET_DB_REF(`${rootRef}/invites/${userUID}`);
    try {
      onValue(inviteRef, (data) => {
        if (data.exists()) {
          const tmp = data.val();
          setReceivedInvite({
            from: tmp.from,
            to: tmp.to,
          });
        }
      });
    } catch (e) {
      console.log("gelen davetleri kontrol ederken problem:", e);
    }
  };

  const acceptInvite = () => {
    if (receivedInvite?.from && receivedInvite?.to) {
      const inviteRef = GET_DB_REF(`${rootRef}/invites/${receivedInvite.to}`);
      remove(inviteRef)
        .then(() => {
          const userToRef = GET_DB_REF(
            `${rootRef}/users/${receivedInvite?.to}`
          );
          remove(userToRef)
            .then(() => {
              const userFromRef = GET_DB_REF(
                `${rootRef}/users/${receivedInvite?.from}`
              );
              remove(userFromRef)
                .then(() => {
                  const gameRef = GET_DB_REF(`${rootRef}/games/`);
                  update(gameRef, {
                    [`${receivedInvite?.to}`]: {
                      [`${receivedInvite.to}`]: {
                        word: mode === "rastgele" ? randomWord : "",
                      },
                      [`${receivedInvite.from}`]: {
                        word: mode === "rastgele" ? randomWord : "",
                      },
                    },
                  }).catch((e) =>
                    console.log("oyun başlatılırken problem:", e)
                  );
                })
                .catch((e) =>
                  console.log(
                    "Davet gönderen kullanıcıyı lobiden kaldırırken problem:",
                    e
                  )
                );
            })
            .catch((e) =>
              console.log(
                "Davet gönderilen kullanıcıyı lobiden kaldırıken problem:",
                e
              )
            );
        })
        .catch((e) => console.log("daveti kabul ederken problem:", e));
    }
  };

  const declineInvite = () => {
    if (receivedInvite?.from && receivedInvite?.to) {
      const inviteRef = GET_DB_REF(`${rootRef}/invites/${receivedInvite.to}`);
      remove(inviteRef)
        .catch((e) => console.log("gönderilen daveti reddederken problem:", e))
        .then(() => {
          setReceivedInvite();
        });
    }
  };

  const checkGames = () => {
    const gameRef = GET_DB_REF(`${rootRef}/games/${receivedInvite.to}`);
    try {
      onValue(gameRef, (data) => {
        if (data.exists()) {
          setGame({
            mode,
            length,
            to: receivedInvite.to,
            from: receivedInvite.from,
            path: `${rootRef}/games/${receivedInvite?.to}`,
            word: mode === "rastgele" ? randomWord : "",
          });
          setReceivedInvite();
          navigation.navigate(STACKS.game, {
            screen: mode === "rastgele" ? SCREENS.game : SCREENS.word,
          });
        }
      });
    } catch (e) {
      console.log("oyunları kontorl ederken problem:", e);
    }
  };

  useEffect(() => {
    addUserToUsers();
    getUsers();
    checkInvites();
    handleDisconnect();
    const unsub = handleDisconnectOnBlur();
    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    if (receivedInvite?.to) {
      checkGames();
    }
  }, [receivedInvite?.to]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {receivedInvite?.to && receivedInvite?.from && (
        <DialogModal
          isVisible={receivedInvite.to && receivedInvite.from}
          title="Oyun Daveti"
          dismissable={false}
          text={
            receivedInvite.to === userUID
              ? `${receivedInvite.from} kullanıcısı sana bir oyun daveti gönderdi`
              : `${receivedInvite.to} kullanıcısına oyun daveti gönderildi`
          }
          done={
            receivedInvite.to === userUID
              ? {
                  text: "Kabul et",
                  onPress: acceptInvite,
                }
              : undefined
          }
          cancel={{
            text: "Reddet",
            onPress: declineInvite,
          }}
        />
      )}
      <Text style={styles.title}>{`${mode} kelime\n${length} harf`}</Text>
      {!!users?.length && (
        <Text style={styles.status}>{`${users?.length} aktif kullanıcı`}</Text>
      )}
      {users?.length ? (
        <View style={styles.usersContainer}>
          {users.map((item) => (
            <View key={item} style={styles.userContainer}>
              <Text style={styles.userText} numberOfLines={1}>
                {item}
              </Text>
              <Button mode="contained" onPress={() => handleSendInvite(item)}>
                Davet Gönder
              </Button>
            </View>
          ))}
        </View>
      ) : (
        <ActivityIndicator size="large" />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  status: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  usersContainer: {
    gap: 8,
    flex: 1,
    width: "100%",
    paddingTop: 48,
  },
  userContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  userText: {
    flex: 1,
    fontSize: 24,
  },
});
