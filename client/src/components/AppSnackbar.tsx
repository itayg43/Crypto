import React from 'react';
import {Snackbar} from 'react-native-paper';

const defaultDurationInMillis = 3 * 1000;

interface Props {
  message: string;
  isVisible: boolean;
  onDismiss: () => void;
}

const AppSnackbar = ({message, isVisible, onDismiss}: Props) => {
  return (
    <Snackbar
      visible={isVisible}
      onDismiss={onDismiss}
      duration={defaultDurationInMillis}
      icon="close"
      onIconPress={onDismiss}>
      {message}
    </Snackbar>
  );
};

export default AppSnackbar;
