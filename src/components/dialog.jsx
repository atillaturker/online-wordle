import * as React from "react";
import { Button, Dialog, Portal, Text } from "react-native-paper";

export const DialogModal = ({
  isVisible,
  title,
  text,
  done,
  cancel,
  dismissable = true,
}) => {
  return (
    <Portal>
      <Dialog
        visible={isVisible}
        onDismiss={cancel ? cancel.onPress : undefined}
        dismissable={dismissable}
      >
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">{text}</Text>
        </Dialog.Content>

        {(done || cancel) && (
          <Dialog.Actions>
            {cancel && <Button onPress={cancel.onPress}>{cancel.text}</Button>}
            {done && <Button onPress={done.onPress}>{done.text}</Button>}
          </Dialog.Actions>
        )}
      </Dialog>
    </Portal>
  );
};
