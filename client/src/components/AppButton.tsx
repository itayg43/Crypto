import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<ViewStyle>;
  label: string;
  disabled?: boolean;
  onPress: () => void;
}

const AppButton = ({
  containerStyle,
  labelStyle,
  label,
  disabled,
  onPress,
}: Props) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        containerStyle,
        disabled ? {opacity: 0.5} : {opacity: 1.0},
      ]}
      disabled={disabled}
      onPress={onPress}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'black',
    borderRadius: 4,
    alignItems: 'center',
  },

  label: {
    color: 'white',
  },
});
