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
  label: string;
  disabled?: boolean;
  onPress: () => void;
  labelColor?: string;
}

const AppButton = ({
  containerStyle,
  label,
  disabled,
  onPress,
  labelColor = 'white',
}: Props) => {
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle, disabled ? {opacity: 0.5} : {}]}
      disabled={disabled}
      onPress={onPress}>
      <Text style={{color: labelColor}}>{label}</Text>
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
});
