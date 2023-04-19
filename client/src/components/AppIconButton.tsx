import React from 'react';
import {StyleProp, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  icon: string;
  iconColor?: string;
  iconSize?: number;
  disabled?: boolean;
  onPress: () => void;
}

const AppIconButton = ({
  containerStyle,
  icon,
  iconColor = 'white',
  iconSize = 18,
  disabled,
  onPress,
}: Props) => {
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle, disabled ? {opacity: 0.5} : {}]}
      disabled={disabled}
      onPress={onPress}>
      <MaterialCommunityIcons name={icon} size={iconSize} color={iconColor} />
    </TouchableOpacity>
  );
};

export default AppIconButton;

const styles = StyleSheet.create({
  container: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});
