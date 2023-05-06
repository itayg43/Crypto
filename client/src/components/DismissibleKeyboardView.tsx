import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';

import dismissKeyboard from '../utils/dismissKeyboard';

interface Props {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

const DismissibleKeyboardView = ({style, children}: Props) => {
  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={[styles.contaienr, style]}>{children}</View>
    </TouchableWithoutFeedback>
  );
};

export default DismissibleKeyboardView;

const styles = StyleSheet.create({
  contaienr: {
    flex: 1,
  },
});
